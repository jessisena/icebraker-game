const STEP_BY_KEY = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

/**
 * Finds the next selectable option in a radiogroup, wrapping around and skipping
 * options that are not free.
 *
 * Args:
 *   from: Index to start from.
 *   step: 1 to move forward, -1 to move backward.
 *   count: Number of options.
 *   isFree: Predicate telling whether the option at an index can be selected.
 *
 * Returns:
 *   The next free index, or `from` when no other option is free.
 */
function nextFreeIndex(from, step, count, isFree) {
  for (let k = 1; k < count; k++) {
    const i = (((from + step * k) % count) + count) % count
    if (isFree(i)) return i
  }
  return from
}

/**
 * Resolves a keydown in a roving-tabindex radiogroup to the option to focus and select.
 *
 * Returns:
 *   The index to select, or null when the key is not handled.
 */
export function rovingTarget(key, index, count, isFree) {
  if (key in STEP_BY_KEY) return nextFreeIndex(index, STEP_BY_KEY[key], count, isFree)
  if (key === 'Enter' || key === ' ') return isFree(index) ? index : null
  return null
}

/** Index that receives tabIndex 0: the selected option, else the first free one. */
export function tabStopIndex(selectedIndex, count, isFree) {
  if (selectedIndex !== -1 && isFree(selectedIndex)) return selectedIndex
  for (let i = 0; i < count; i++) {
    if (isFree(i)) return i
  }
  return 0
}
