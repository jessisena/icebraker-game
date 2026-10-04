/* Group consensus vote values — stored as numbers in the playerRatings arrays */
export const RATING = { good: 2, neutral: 1, bad: 0 }

/* Bump when the persisted localStorage shape changes; useGame clears stale ratings */
export const STORAGE_VERSION = 2
