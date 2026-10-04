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
