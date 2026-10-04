import { describe, it, expect } from 'vitest'
import { RATING } from '../data/ratings'
import { rankPlayers } from './scoring'

const { good, neutral, bad } = RATING

const makePlayer = (name) => ({ name, avatar: 'eye', color: '#e0525e' })
const names = (ranked) => ranked.map((p) => p.name)

describe('rankPlayers', () => {
  it('sorts players by total points descending', () => {
    const players = [makePlayer('Ana'), makePlayer('Ben'), makePlayer('Cleo')]
    const ratings = { Ana: [neutral, bad], Ben: [good, good], Cleo: [good, neutral] }

    const ranked = rankPlayers(players, ratings)

    expect(names(ranked)).toEqual(['Ben', 'Cleo', 'Ana'])
    expect(ranked.map((p) => p.total)).toEqual([4, 3, 1])
  })

  it('counts good, neutral and bad votes in the tally', () => {
    const ratings = { Ana: [good, neutral, bad, good, bad, bad] }

    const [ana] = rankPlayers([makePlayer('Ana')], ratings)

    expect(ana.tally).toEqual({ good: 2, neutral: 1, bad: 3 })
    expect(ana.turns).toBe(6)
    expect(ana.total).toBe(5)
  })

  it('gives zero totals and an empty tally to players without ratings', () => {
    const players = [makePlayer('Ana'), makePlayer('Ben')]

    const ranked = rankPlayers(players, { Ana: [] })

    for (const p of ranked) {
      expect(p.total).toBe(0)
      expect(p.turns).toBe(0)
      expect(p.tally).toEqual({ good: 0, neutral: 0, bad: 0 })
    }
    expect(names(ranked)).toEqual(['Ana', 'Ben'])
  })

  it('breaks ties in total by fewer turns', () => {
    const players = [makePlayer('Ana'), makePlayer('Ben')]
    const ratings = { Ana: [neutral, neutral], Ben: [good] }

    expect(names(rankPlayers(players, ratings))).toEqual(['Ben', 'Ana'])
  })

  it('breaks full ties by original roster order', () => {
    const players = [makePlayer('Ana'), makePlayer('Ben'), makePlayer('Cleo')]
    const ratings = { Ana: [good, bad], Ben: [good, bad], Cleo: [neutral, neutral] }

    expect(names(rankPlayers(players, ratings))).toEqual(['Ana', 'Ben', 'Cleo'])
  })

  it('keeps player fields and does not mutate the inputs', () => {
    const players = [makePlayer('Ana'), makePlayer('Ben')]
    const ratings = { Ana: [bad], Ben: [good] }

    const ranked = rankPlayers(players, ratings)

    expect(ranked[0]).toMatchObject({ name: 'Ben', avatar: 'eye', color: '#e0525e' })
    expect(names(players)).toEqual(['Ana', 'Ben'])
    expect(players[0]).not.toHaveProperty('total')
  })
})
