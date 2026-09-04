import { useState, useEffect } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (e) {
      console.warn(`useLocalStorage: error reading key "${key}":`, e)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      if (state === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(state))
      }
    } catch (e) {
      console.warn(`useLocalStorage: error writing key "${key}":`, e)
    }
  }, [key, state])

  const remove = () => setState(null)

  return [state, setState, remove]
}
