import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { colors } from '../../data/options'
import PlayerStep from './PlayerStep'
import ModeStep from './ModeStep'
import styles from './Onboarding.module.css'

const TOTAL_STEPS = 3

const DEFAULT_PLAYER = (colorIndex) => ({
  name: '',
  avatar: colorIndex === 0 ? 'cat' : 'dog',
  color: colors[colorIndex]?.value ?? colors[0].value,
})

export default function Onboarding({ onComplete, prefsSlot }) {
  const { t } = useTranslation()

  const [step, setStep] = useState(0)
  const [players, setPlayers] = useState([DEFAULT_PLAYER(0), DEFAULT_PLAYER(3)])
  const [mode, setMode] = useState(null)

  const goTo = (nextStep) => {
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => setStep(nextStep))
    } else {
      setStep(nextStep)
    }
  }

  const handleP0Next = (data) => {
    setPlayers((prev) => [data, prev[1]])
    goTo(1)
  }

  const handleP1Next = (data) => {
    setPlayers((prev) => [prev[0], data])
    goTo(2)
  }

  const handleStart = () => {
    onComplete({ player1: players[0], player2: players[1], mode })
  }

  const p0Color = players[0].color
  const p1Color = players[1].color

  return (
    <div className={styles.stage}>
      {/* Ambient background blooms */}
      <div
        className={styles.bloom}
        style={{ '--bloom-color': p0Color, '--bloom-x': '20%', '--bloom-y': '30%' }}
        aria-hidden="true"
      />
      <div
        className={styles.bloom}
        style={{ '--bloom-color': p1Color, '--bloom-x': '80%', '--bloom-y': '65%' }}
        aria-hidden="true"
      />

      {/* Main onboarding card */}
      <div className={styles.card}>
        {/* Wordmark + prefs at top */}
        <div className={styles.cardTop}>
          <div className={styles.wordmark}>
            <span className={styles.wordmarkMain}>{t('setup.stageTitle')}</span>
          </div>
          {prefsSlot && <div className={styles.prefsSlot}>{prefsSlot}</div>}
        </div>

        {/* Progress rail */}
        <div
          className={styles.progressRail}
          aria-label={t('setup.step', { current: step + 1, total: TOTAL_STEPS })}
        >
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <button
              key={i}
              type="button"
              className={[
                styles.segment,
                i < step ? styles.segmentDone : '',
                i === step ? styles.segmentActive : '',
              ].join(' ')}
              onClick={() => i < step && goTo(i)}
              aria-label={`${t('setup.step', { current: i + 1, total: TOTAL_STEPS })}`}
              aria-current={i === step ? 'step' : undefined}
              disabled={i >= step}
            />
          ))}
        </div>

        <p className={styles.stepIndicator}>
          {t('setup.step', { current: step + 1, total: TOTAL_STEPS })}
        </p>

        {/* Step content */}
        <div className={styles.stepContent}>
          {step === 0 && (
            <PlayerStep stepIndex={0} draft={players[0]} otherName={null} onNext={handleP0Next} />
          )}
          {step === 1 && (
            <PlayerStep
              stepIndex={1}
              draft={players[1]}
              otherName={players[0].name}
              onNext={handleP1Next}
              onBack={() => goTo(0)}
            />
          )}
          {step === 2 && (
            <ModeStep
              players={players}
              selectedMode={mode}
              onModeSelect={setMode}
              onBack={() => goTo(1)}
              onStart={handleStart}
            />
          )}
        </div>
      </div>
    </div>
  )
}

Onboarding.propTypes = {
  onComplete: PropTypes.func.isRequired,
  prefsSlot: PropTypes.node,
}
