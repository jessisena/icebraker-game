import { describe, it, expect } from 'vitest'
import { questionKey, toRemainingIds, fromRemainingIds } from './pool'

const FULL = {
  spark: [{ id: 'spark-1' }, { id: 'spark-2' }, { id: 'spark-3' }],
  decadesTape: [
    [1971, 'Led Zeppelin', 'Stairway to Heaven'],
    [1985, 'a-ha', 'Take On Me'],
  ],
}

describe('questionKey', () => {
  it('uses the id for text questions', () => {
    expect(questionKey({ id: 'spark-1' })).toBe('spark-1')
  })

  it('joins year, artist and title for songs', () => {
    expect(questionKey([1985, 'a-ha', 'Take On Me'])).toBe('1985|a-ha|Take On Me')
  })
})

describe('fromRemainingIds', () => {
  it('round-trips a partly used pool', () => {
    const used = { spark: [FULL.spark[0], FULL.spark[2]], decadesTape: [FULL.decadesTape[1]] }

    expect(fromRemainingIds(FULL, toRemainingIds(used))).toEqual(used)
  })

  it('returns the full pool when nothing is saved', () => {
    expect(fromRemainingIds(FULL, null)).toEqual(FULL)
  })

  it('starts a category full when its saved entry is missing or malformed', () => {
    const restored = fromRemainingIds(FULL, { spark: 'oops' })

    expect(restored.spark).toEqual(FULL.spark)
    expect(restored.decadesTape).toEqual(FULL.decadesTape)
  })

  it('drops saved ids that no longer exist', () => {
    const restored = fromRemainingIds(FULL, { spark: ['spark-2', 'spark-99'], decadesTape: [] })

    expect(restored.spark).toEqual([{ id: 'spark-2' }])
    expect(restored.decadesTape).toEqual([])
  })

  it('keeps an exhausted category empty', () => {
    expect(fromRemainingIds(FULL, { spark: [] }).spark).toEqual([])
  })

  it('does not share arrays with the full pool', () => {
    const restored = fromRemainingIds(FULL, null)

    expect(restored.spark).not.toBe(FULL.spark)
  })
})
