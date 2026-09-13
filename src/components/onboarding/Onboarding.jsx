import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { avatars, colors } from '../../data/options'
import ModeStep from './ModeStep'
import RosterStep from './RosterStep'
import styles from './Onboarding.module.css'

const TOTAL_STEPS = 2

const DEFAULT_PLAYERS = [
  { name: '', avatar: avatars[0].name, color: colors[0].value },
  { name: '', avatar: avatars[1].name, color: colors[3].value },
]

export default function Onboarding({ onComplete, prefsSlot }) {
  const { t } = useTranslation()

  const [step, setStep] = useState(0)
  const [mode, setMode] = useState(null)
  const [players, setPlayers] = useState(DEFAULT_PLAYERS)

  const goTo = (nextStep) => {
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => setStep(nextStep))
    } else {
      setStep(nextStep)
    }
  }

  const handleModeNext = () => {
    // Clamp roster to 2 when switching to couples (user may have gone back after adding players)
    if (mode === 'couples' && players.length > 2) {
      setPlayers((prev) => prev.slice(0, 2))
    }
    goTo(1)
  }

  const handleStart = (finalPlayers) => {
    onComplete({ players: finalPlayers, mode })
  }

  // Bloom colors: first and last player for ambient background
  const bloom0Color = players[0].color
  const bloom1Color = players[players.length - 1].color

  return (
    <div className={styles.stage}>
      {/* Ambient background blooms */}
      <div
        className={styles.bloom}
        style={{ '--bloom-color': bloom0Color, '--bloom-x': '20%', '--bloom-y': '30%' }}
        aria-hidden="true"
      />
      <div
        className={styles.bloom}
        style={{ '--bloom-color': bloom1Color, '--bloom-x': '80%', '--bloom-y': '65%' }}
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
            <ModeStep selectedMode={mode} onModeSelect={setMode} onNext={handleModeNext} />
          )}
          {step === 1 && (
            <RosterStep
              mode={mode}
              players={players}
              onPlayersChange={setPlayers}
              onBack={() => goTo(0)}
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
