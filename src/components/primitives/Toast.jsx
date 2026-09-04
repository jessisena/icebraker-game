import { useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Toast.module.css'

export default function Toast({ message, onDismiss, duration = 4000 }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [message, onDismiss, duration])

  if (!message) return null

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span>{message}</span>
      <button className={styles.dismiss} onClick={onDismiss} aria-label="Cerrar">
        ×
      </button>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  duration: PropTypes.number,
}
