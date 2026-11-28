/* Persist the question pool as ids so saved games survive question-text edits */

const songKey = ([year, artist, title]) => `${year}|${artist}|${title}`

export const questionKey = (q) => (Array.isArray(q) ? songKey(q) : q.id)

export function toRemainingIds(pool) {
  return Object.fromEntries(
    Object.entries(pool).map(([cat, questions]) => [cat, questions.map(questionKey)])
  )
}

/**
 * Rebuild a pool from saved ids, keeping the order of `fullPool`.
 *
 * Categories missing from `savedIds` start full; ids that no longer exist are dropped.
 *
 * @param {Object<string, Array>} fullPool - Every question, keyed by category.
 * @param {Object<string, string[]>|null} savedIds - Output of `toRemainingIds`, or null.
 * @returns {Object<string, Array>} The remaining questions, keyed by category.
 */
export function fromRemainingIds(fullPool, savedIds) {
  return Object.fromEntries(
    Object.entries(fullPool).map(([cat, questions]) => {
      const ids = savedIds?.[cat]
      if (!Array.isArray(ids)) return [cat, [...questions]]
      const keep = new Set(ids)
      return [cat, questions.filter((q) => keep.has(questionKey(q)))]
    })
  )
}
