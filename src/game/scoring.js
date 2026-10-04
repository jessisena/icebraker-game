import { RATING } from '../data/ratings'

function tallyVotes(votes) {
  return {
    good: votes.filter((v) => v === RATING.good).length,
    neutral: votes.filter((v) => v === RATING.neutral).length,
    bad: votes.filter((v) => v === RATING.bad).length,
  }
}

/**
 * Ranks players by total points earned from group votes.
 *
 * Args:
 *   players: Roster array of `{ name, avatar, color }` objects, in turn order.
 *   ratings: Object mapping player names to arrays of vote values (`RATING.*`).
 *     Missing entries are treated as no votes.
 *
 * Returns:
 *   A new array of `{ ...player, total, tally: { good, neutral, bad }, turns }`
 *   sorted by `total` descending. Ties go to the player with fewer turns, then
 *   to the player earlier in the roster (Array.prototype.sort is stable).
 */
export function rankPlayers(players, ratings) {
  return players
    .map((player) => {
      const votes = ratings?.[player.name] ?? []
      return {
        ...player,
        total: votes.reduce((sum, v) => sum + v, 0),
        tally: tallyVotes(votes),
        turns: votes.length,
      }
    })
    .sort((a, b) => b.total - a.total || a.turns - b.turns)
}
