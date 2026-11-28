import { useEffect, useRef } from 'react'

/* Stack of "go back" callbacks; the most recently registered one is asked first */
const handlers = []

export function pushBackHandler(fn) {
  handlers.push(fn)
  return () => {
    const i = handlers.lastIndexOf(fn)
    if (i !== -1) handlers.splice(i, 1)
  }
}

/**
 * Offer a back press to each registered handler, newest first.
 *
 * @returns {boolean} True if a handler consumed the press; false means nothing is left to undo.
 */
export function handleBack() {
  for (let i = handlers.length - 1; i >= 0; i--) {
    if (handlers[i]()) return true
  }
  return false
}

/**
 * Register `onBack` for as long as the component is mounted.
 *
 * @param {() => boolean} onBack - Returns true if it handled the press.
 */
export function useBackHandler(onBack) {
  const latest = useRef(onBack)
  useEffect(() => {
    latest.current = onBack
  })
  useEffect(() => pushBackHandler(() => latest.current()), [])
}
