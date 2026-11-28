import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import useGame from './useGame'
import { avatars, colors } from '../data/options'
import { RATING, STORAGE_VERSION } from '../data/ratings'

const wrapper = ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>

const makePlayer = (name, avatar = 'eye', color = '#e0525e') => ({ name, avatar, color })

const FOUR_PLAYERS = [
  makePlayer('Alice', 'eye', '#e0525e'),
  makePlayer('Bob', 'key', '#3fc1d4'),
  makePlayer('Carol', 'hand', '#42b48f'),
  makePlayer('Dan', 'wheel', '#edb140'),
]

// Provide a real in-memory localStorage if the test env's one is limited
let _store = {}
const localStorageMock = {
  getItem: (key) => _store[key] ?? null,
  setItem: (key, value) => {
    _store[key] = String(value)
  },
  removeItem: (key) => {
    delete _store[key]
  },
  clear: () => {
    _store = {}
  },
  get length() {
    return Object.keys(_store).length
  },
  key: (i) => Object.keys(_store)[i] ?? null,
}

beforeAll(() => {
  vi.stubGlobal('localStorage', localStorageMock)
})

// useGame persists to these keys; clear them between tests
const clearGameStorage = () => localStorageMock.clear()

describe('useGame — startGame', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
  })

  it('seeds ratings for all N players', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' })
    })

    expect(Object.keys(result.current.ratings)).toEqual(['Alice', 'Bob', 'Carol', 'Dan'])
    for (const r of Object.values(result.current.ratings)) {
      expect(r).toEqual([])
    }
  })

  it('stores all players in the players array', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({ players: FOUR_PLAYERS, mode: 'team' })
    })

    expect(result.current.players).toHaveLength(4)
    expect(result.current.players[0].name).toBe('Alice')
    expect(result.current.players[3].name).toBe('Dan')
  })

  it('sets currentPlayer to 0 and phase to selecting-category', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' })
    })

    expect(result.current.currentPlayer).toBe(0)
    expect(result.current.phase).toBe('selecting-category')
  })
})

describe('useGame — session restore', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
    localStorage.setItem('storageVersion', String(STORAGE_VERSION))
  })

  it('restores a 5-player session from localStorage', () => {
    const fivePlayers = [
      makePlayer('A'),
      makePlayer('B'),
      makePlayer('C'),
      makePlayer('D'),
      makePlayer('E'),
    ]
    localStorage.setItem('gamePlayers', JSON.stringify(fivePlayers))
    localStorage.setItem('gameMode', JSON.stringify('friends'))

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.gameStarted).toBe(true)
    expect(result.current.players).toHaveLength(5)
  })

  it('keeps saved ratings when the storage version matches', () => {
    const players = [makePlayer('Alice'), makePlayer('Bob', 'key', '#3fc1d4')]
    localStorage.setItem('gamePlayers', JSON.stringify(players))
    localStorage.setItem('playerRatings', JSON.stringify({ Alice: [2, 1], Bob: [0] }))
    localStorage.setItem('gameMode', JSON.stringify('couples'))

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.ratings).toEqual({ Alice: [2, 1], Bob: [0] })
    expect(result.current.players).toEqual(players)
  })

  it('does not restore a session with fewer than 2 players', () => {
    localStorage.setItem('gamePlayers', JSON.stringify([makePlayer('A')]))
    localStorage.setItem('gameMode', JSON.stringify('friends'))

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.gameStarted).toBe(false)
  })

  it('does not restore a session with more than 6 players', () => {
    const sevenPlayers = Array.from({ length: 7 }, (_, i) => makePlayer(`P${i + 1}`))
    localStorage.setItem('gamePlayers', JSON.stringify(sevenPlayers))
    localStorage.setItem('gameMode', JSON.stringify('friends'))

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.gameStarted).toBe(false)
  })
})

describe('useGame — resuming an in-progress game', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
    localStorage.setItem('storageVersion', String(STORAGE_VERSION))
  })

  const playOneTurn = (result, category = 'spark') => {
    act(() => result.current.handleCategorySelect(category))
    act(() => result.current.proceedToRating())
    act(() => result.current.submitRating(RATING.good))
  }

  it('resumes on the same turn without returning used questions', () => {
    const first = renderHook(() => useGame(), { wrapper })
    act(() => first.result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' }))
    playOneTurn(first.result)
    playOneTurn(first.result)
    const remaining = first.result.current.categoryQuestions.spark
    first.unmount()

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.gameStarted).toBe(true)
    expect(result.current.phase).toBe('selecting-category')
    expect(result.current.currentPlayer).toBe(2)
    expect(result.current.categoryQuestions.spark).toEqual(remaining)
    expect(result.current.ratings).toMatchObject({ Alice: [2], Bob: [2], Carol: [] })
  })

  it('keeps the turn when the app is closed mid-question', () => {
    const first = renderHook(() => useGame(), { wrapper })
    act(() => first.result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' }))
    playOneTurn(first.result)
    act(() => first.result.current.handleCategorySelect('spark'))
    first.unmount()

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.phase).toBe('selecting-category')
    expect(result.current.currentPlayer).toBe(1)
  })

  it('resumes at game over when every pool in the mode is empty', () => {
    localStorage.setItem('gamePlayers', JSON.stringify(FOUR_PLAYERS))
    localStorage.setItem('gameMode', JSON.stringify('custom'))
    localStorage.setItem('gameCustomCategories', JSON.stringify(['dilemma']))
    localStorage.setItem('gameRemaining', JSON.stringify({ dilemma: [] }))

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.phase).toBe('game-over')
  })

  it('falls back to the first player when the saved index is out of range', () => {
    localStorage.setItem('gamePlayers', JSON.stringify(FOUR_PLAYERS.slice(0, 2)))
    localStorage.setItem('gameMode', JSON.stringify('friends'))
    localStorage.setItem('gameCurrentPlayer', '5')

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.currentPlayer).toBe(0)
  })

  it('drops saved question ids that no longer exist', () => {
    localStorage.setItem('gamePlayers', JSON.stringify(FOUR_PLAYERS))
    localStorage.setItem('gameMode', JSON.stringify('friends'))
    localStorage.setItem('gameRemaining', JSON.stringify({ spark: ['spark-1', 'spark-deleted'] }))

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.categoryQuestions.spark.map((q) => q.id)).toEqual(['spark-1'])
  })

  it('replayGame restores the full pool and the first player in storage', () => {
    const { result } = renderHook(() => useGame(), { wrapper })
    act(() => result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' }))
    playOneTurn(result)

    act(() => result.current.replayGame())

    expect(localStorage.getItem('gameCurrentPlayer')).toBe('0')
    const saved = JSON.parse(localStorage.getItem('gameRemaining'))
    expect(saved.spark).toHaveLength(result.current.categoryQuestions.spark.length)
    expect(result.current.categoryQuestions.spark.length).toBeGreaterThan(0)
    expect(saved.spark).toContain(result.current.categoryQuestions.spark[0].id)
  })

  it('resetGame clears the saved turn and pool', () => {
    const { result } = renderHook(() => useGame(), { wrapper })
    act(() => result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' }))
    playOneTurn(result)

    act(() => result.current.resetGame())
    act(() => result.current.confirmModal.onConfirm())

    expect(localStorage.getItem('gameCurrentPlayer')).toBeNull()
    expect(localStorage.getItem('gameRemaining')).toBeNull()
  })

  it('does not save a pool before a game starts', () => {
    renderHook(() => useGame(), { wrapper })

    expect(localStorage.getItem('gameRemaining')).toBeNull()
  })
})

describe('useGame — goBack', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
    localStorage.setItem('storageVersion', String(STORAGE_VERSION))
  })

  const startFriends = () => {
    const hook = renderHook(() => useGame(), { wrapper })
    act(() => hook.result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' }))
    return hook
  }

  const goBack = (result) => {
    let handled
    act(() => {
      handled = result.current.goBack()
    })
    return handled
  }

  it('does nothing before a game starts', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    expect(goBack(result)).toBe(false)
  })

  it('closes the confirm modal before anything else', () => {
    const { result } = startFriends()
    act(() => result.current.setShowLeaderboard(true))
    act(() => result.current.resetGame())

    expect(goBack(result)).toBe(true)
    expect(result.current.confirmModal).toBeNull()
    expect(result.current.showLeaderboard).toBe(true)
  })

  it('closes the leaderboard and stays on the same screen', () => {
    const { result } = startFriends()
    act(() => result.current.setShowLeaderboard(true))

    expect(goBack(result)).toBe(true)
    expect(result.current.showLeaderboard).toBe(false)
    expect(result.current.phase).toBe('selecting-category')
  })

  it('leaves a question, returns it to its pool and keeps the turn', () => {
    const { result } = startFriends()
    const poolSize = result.current.categoryQuestions.spark.length
    act(() => result.current.handleCategorySelect('spark'))
    const shown = result.current.currentQuestion

    expect(goBack(result)).toBe(true)
    expect(result.current.phase).toBe('selecting-category')
    expect(result.current.currentPlayer).toBe(0)
    expect(result.current.categoryQuestions.spark).toHaveLength(poolSize)
    expect(result.current.categoryQuestions.spark).toContain(shown)
  })

  it('returns a question drawn from "all" to the category it came from', () => {
    const { result } = startFriends()
    const before = result.current.calculateAvailableCounts()
    act(() => result.current.handleCategorySelect('all'))
    const shown = result.current.currentQuestion

    goBack(result)

    expect(result.current.calculateAvailableCounts()).toEqual(before)
    const owner = Object.values(result.current.categoryQuestions).find((pool) =>
      pool.includes(shown)
    )
    expect(owner).toBeDefined()
  })

  it('returns a song to the music pool', () => {
    const { result } = startFriends()
    act(() => result.current.handleCategorySelect('decadesTape'))
    const [decade] = Object.keys(result.current.calculateSongsByDecade())
    const songs = result.current.categoryQuestions.decadesTape.length
    act(() => result.current.handleDecadeSelect(Number(decade)))

    goBack(result)

    expect(result.current.categoryQuestions.decadesTape).toHaveLength(songs)
    expect(result.current.selectedDecade).toBeNull()
  })

  it('steps back from the decade picker to the category pick', () => {
    const { result } = startFriends()
    act(() => result.current.handleCategorySelect('decadesTape'))

    expect(goBack(result)).toBe(true)
    expect(result.current.phase).toBe('selecting-category')
  })

  it('steps back from the custom picker to the mode picker, then to the category pick', () => {
    const { result } = startFriends()
    act(() => result.current.showModeSelector())
    act(() => result.current.selectMode('custom'))

    goBack(result)
    expect(result.current.phase).toBe('selecting-mode')
    goBack(result)
    expect(result.current.phase).toBe('selecting-category')
  })

  it('stays on the mode picker when no mode has been chosen yet', () => {
    localStorage.setItem('gamePlayers', JSON.stringify(FOUR_PLAYERS))
    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.phase).toBe('selecting-mode')
    expect(goBack(result)).toBe(false)
  })

  it.each([
    ['the category pick', () => {}],
    [
      'the rating panel',
      (result) => {
        act(() => result.current.handleCategorySelect('spark'))
        act(() => result.current.proceedToRating())
      },
    ],
  ])('has nothing to step back to on %s', (_, reach) => {
    const { result } = startFriends()
    reach(result)
    const phase = result.current.phase

    expect(goBack(result)).toBe(false)
    expect(result.current.phase).toBe(phase)
  })
})

describe('useGame — storage version migration', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
  })

  const legacyPlayers = [
    makePlayer('Alice', 'sun', '#e8615c'),
    makePlayer('Bob', 'moon', '#4fa8e8'),
    makePlayer('Carol', 'star', '#5fb37a'),
  ]

  const seedLegacySession = () => {
    localStorage.setItem('gamePlayers', JSON.stringify(legacyPlayers))
    localStorage.setItem('playerRatings', JSON.stringify({ Alice: [5, 4], Bob: [3], Carol: [] }))
    localStorage.setItem('gameMode', JSON.stringify('friends'))
  }

  it('clears saved ratings when the storage version is missing', () => {
    seedLegacySession()

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.ratings).toEqual({ Alice: [], Bob: [], Carol: [] })
    expect(JSON.parse(localStorage.getItem('playerRatings'))).toEqual({
      Alice: [],
      Bob: [],
      Carol: [],
    })
  })

  it('remaps avatars and colors by index and keeps names and mode', () => {
    seedLegacySession()

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.players).toEqual(
      legacyPlayers.map((p, i) => ({
        name: p.name,
        avatar: avatars[i].name,
        color: colors[i].value,
      }))
    )
    expect(result.current.mode).toBe('friends')
    expect(result.current.gameStarted).toBe(true)
    expect(result.current.phase).toBe('selecting-category')
  })

  it('treats an outdated storage version like a missing one', () => {
    seedLegacySession()
    localStorage.setItem('storageVersion', String(STORAGE_VERSION - 1))

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.ratings.Alice).toEqual([])
    expect(result.current.players[0].avatar).toBe(avatars[0].name)
  })

  it('writes the current storage version', () => {
    seedLegacySession()

    renderHook(() => useGame(), { wrapper })

    expect(localStorage.getItem('storageVersion')).toBe(String(STORAGE_VERSION))
  })

  it('writes the version on a fresh install without touching other keys', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    expect(localStorage.getItem('storageVersion')).toBe(String(STORAGE_VERSION))
    expect(localStorage.getItem('gamePlayers')).toBeNull()
    expect(result.current.gameStarted).toBe(false)
  })
})

describe('useGame — sortedPlayers', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
    localStorage.setItem('storageVersion', String(STORAGE_VERSION))
  })

  it('ranks 3 players by total points descending', () => {
    const threePlayers = [makePlayer('Alice'), makePlayer('Bob'), makePlayer('Carol')]
    const ratings = {
      Alice: [2, 1, 2],
      Bob: [1, 0, 1],
      Carol: [2, 2, 2],
    }
    localStorage.setItem('gamePlayers', JSON.stringify(threePlayers))
    localStorage.setItem('playerRatings', JSON.stringify(ratings))
    localStorage.setItem('gameMode', JSON.stringify('friends'))

    const { result } = renderHook(() => useGame(), { wrapper })

    const sorted = result.current.sortedPlayers
    expect(sorted.map((p) => p.name)).toEqual(['Carol', 'Alice', 'Bob'])
    expect(sorted.map((p) => p.total)).toEqual([6, 5, 2])
  })

  it('reflects a submitted vote in the ranking', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' })
    })
    act(() => {
      result.current.handleCategorySelect('spark')
    })
    act(() => {
      result.current.submitRating(RATING.good)
    })

    const [leader] = result.current.sortedPlayers
    expect(leader).toMatchObject({ name: 'Alice', total: 2, turns: 1 })
    expect(leader.tally).toEqual({ good: 1, neutral: 0, bad: 0 })
  })
})

describe('useGame — replayGame', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
  })

  it('resets all ratings for N players and returns to selecting-category', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' })
    })

    act(() => {
      result.current.replayGame()
    })

    expect(result.current.phase).toBe('selecting-category')
    expect(result.current.currentPlayer).toBe(0)
    for (const name of ['Alice', 'Bob', 'Carol', 'Dan']) {
      expect(result.current.ratings[name]).toEqual([])
    }
  })
})

describe('useGame — custom mode', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
  })

  it('limits filteredCategories to the custom selection', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({
        players: FOUR_PLAYERS,
        mode: 'custom',
        customCategories: ['heat'],
      })
    })

    expect(Object.keys(result.current.filteredCategories)).toEqual(['heat'])
    expect(JSON.parse(localStorage.getItem('gameCustomCategories'))).toEqual(['heat'])
  })

  it('ignores customCategories for non-custom modes', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({ players: FOUR_PLAYERS, mode: 'team', customCategories: ['heat'] })
    })

    expect(result.current.customCategories).toEqual([])
    expect(result.current.filteredCategories.heat).toBeUndefined()
  })

  it('routes mid-game Custom to the category picker and keeps the previous selection', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({
        players: FOUR_PLAYERS,
        mode: 'custom',
        customCategories: ['spark', 'roots'],
      })
    })
    act(() => result.current.showModeSelector())
    act(() => result.current.selectMode('custom'))

    expect(result.current.phase).toBe('selecting-custom-categories')
    expect(result.current.customCategories).toEqual(['spark', 'roots'])
  })

  it('confirming a new selection switches to custom mode', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({ players: FOUR_PLAYERS, mode: 'friends' })
    })
    act(() => result.current.selectMode('custom'))
    act(() => result.current.confirmCustomCategories(['dilemma', 'heat']))

    expect(result.current.mode).toBe('custom')
    expect(result.current.phase).toBe('selecting-category')
    expect(Object.keys(result.current.filteredCategories).sort()).toEqual(['dilemma', 'heat'])
  })

  it('ends the game once the custom pools are exhausted', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({
        players: FOUR_PLAYERS,
        mode: 'custom',
        customCategories: ['dilemma'],
      })
    })

    const poolSize = result.current.categoryQuestions.dilemma.length
    for (let i = 0; i < poolSize; i++) {
      expect(result.current.phase).toBe('selecting-category')
      act(() => result.current.handleCategorySelect('dilemma'))
      act(() => result.current.proceedToRating())
      act(() => result.current.submitRating(1))
    }

    expect(result.current.categoryQuestions.dilemma).toHaveLength(0)
    expect(result.current.phase).toBe('game-over')
  })

  it('resetGame clears the custom selection', () => {
    const { result } = renderHook(() => useGame(), { wrapper })

    act(() => {
      result.current.startGame({
        players: FOUR_PLAYERS,
        mode: 'custom',
        customCategories: ['spark'],
      })
    })
    act(() => result.current.resetGame())
    act(() => result.current.confirmModal.onConfirm())

    expect(result.current.customCategories).toEqual([])
    expect(localStorage.getItem('gameCustomCategories')).toBeNull()
  })
})

describe('useGame — blocked storage', () => {
  it('still renders when localStorage throws on access', () => {
    const blocked = () => {
      throw new DOMException('blocked', 'SecurityError')
    }
    vi.stubGlobal('localStorage', { getItem: blocked, setItem: blocked, removeItem: blocked })
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { result } = renderHook(() => useGame(), { wrapper })
    expect(result.current.gameStarted).toBe(false)

    vi.unstubAllGlobals()
    warnSpy.mockRestore()
  })
})
