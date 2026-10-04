import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import useGame from './useGame'

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

  it('migrates legacy {player1, player2} shape to array', () => {
    const legacy = {
      player1: makePlayer('Alice'),
      player2: makePlayer('Bob', 'key', '#3fc1d4'),
    }
    localStorage.setItem('gamePlayers', JSON.stringify(legacy))
    localStorage.setItem('gameMode', JSON.stringify('couples'))

    const { result } = renderHook(() => useGame(), { wrapper })

    expect(result.current.players).toHaveLength(2)
    expect(result.current.players[0].name).toBe('Alice')
    expect(result.current.players[1].name).toBe('Bob')
  })
})

describe('useGame — sortedPlayers', () => {
  beforeEach(() => {
    clearGameStorage()
    i18n.changeLanguage('en')
  })

  it('ranks 3 players by average rating descending', () => {
    const threePlayers = [makePlayer('Alice'), makePlayer('Bob'), makePlayer('Carol')]
    const ratings = {
      Alice: [5, 4, 5], // avg 4.67
      Bob: [3, 4, 3], // avg 3.33
      Carol: [5, 5, 5], // avg 5.00
    }
    localStorage.setItem('gamePlayers', JSON.stringify(threePlayers))
    localStorage.setItem('playerRatings', JSON.stringify(ratings))
    localStorage.setItem('gameMode', JSON.stringify('friends'))

    const { result } = renderHook(() => useGame(), { wrapper })

    const sorted = result.current.sortedPlayers
    expect(sorted[0].name).toBe('Carol')
    expect(sorted[1].name).toBe('Alice')
    expect(sorted[2].name).toBe('Bob')
  })

  it('assigns average 0 to players with no ratings', () => {
    const players = [makePlayer('X'), makePlayer('Y')]
    localStorage.setItem('gamePlayers', JSON.stringify(players))
    localStorage.setItem('playerRatings', JSON.stringify({ X: [], Y: [] }))
    localStorage.setItem('gameMode', JSON.stringify('couples'))

    const { result } = renderHook(() => useGame(), { wrapper })

    result.current.sortedPlayers.forEach((p) => {
      expect(p.average).toBe(0)
      expect(p.totalRatings).toBe(0)
    })
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
