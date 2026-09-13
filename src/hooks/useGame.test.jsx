import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import useGame from './useGame'

const wrapper = ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>

const makePlayer = (name, avatar = 'moon', color = '#e8615c') => ({ name, avatar, color })

const FOUR_PLAYERS = [
  makePlayer('Alice', 'moon', '#e8615c'),
  makePlayer('Bob', 'sun', '#4fa8e8'),
  makePlayer('Carol', 'star', '#5fb37a'),
  makePlayer('Dan', 'comet', '#e89a3c'),
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
      player2: makePlayer('Bob', 'sun', '#4fa8e8'),
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
