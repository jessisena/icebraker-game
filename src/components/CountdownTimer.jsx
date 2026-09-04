import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './CountdownTimer.module.css'

const RING_RADIUS = 80
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function getTimerColor(remaining) {
  return remaining <= 10 ? 'var(--cat-heat)' : 'var(--accent)'
}

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function CountdownTimer({ seconds = 90, onComplete }) {
  const [timeRemaining, setTimeRemaining] = useState(seconds)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [onComplete])

  const pct = (timeRemaining / seconds) * 100
  const strokeDashoffset = RING_CIRCUMFERENCE - (pct / 100) * RING_CIRCUMFERENCE
  const color = getTimerColor(timeRemaining)
  const isPulsing = timeRemaining <= 10 && timeRemaining > 0

  return (
    <div className={[styles.container, isPulsing ? styles.pulsing : ''].join(' ')}>
      <div className={styles.svgWrapper}>
        <svg viewBox="0 0 180 180" width="100%" height="100%" className={styles.svg}>
          <circle
            cx="90"
            cy="90"
            r={RING_RADIUS}
            stroke="var(--border)"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="90"
            cy="90"
            r={RING_RADIUS}
            stroke={color}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
          />
        </svg>
        <div className={styles.timeDisplay} style={{ color }}>
          {formatTime(timeRemaining)}
        </div>
        <div className={styles.label}>Segundos</div>
      </div>
    </div>
  )
}

CountdownTimer.propTypes = {
  seconds: PropTypes.number,
  onComplete: PropTypes.func,
}
