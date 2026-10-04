import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { avatars, colors } from '../../data/options'
import ModeStep from './ModeStep'
import CategoryStep from './CategoryStep'
import RosterStep from './RosterStep'
import styles from './Onboarding.module.css'

const BASE_STEPS = ['mode', 'roster']
const CUSTOM_STEPS = ['mode', 'categories', 'roster']

const DEFAULT_PLAYERS = [
  { name: '', avatar: avatars[0].name, color: colors[0].value },
  { name: '', avatar: avatars[1].name, color: colors[3].value },
]

export default function Onboarding({ onComplete, prefsSlot }) {
  const { t } = useTranslation()

  const [step, setStep] = useState(0)
  const [mode, setMode] = useState(null)
  const [customCategories, setCustomCategories] = useState([])
  const [players, setPlayers] = useState(DEFAULT_PLAYERS)

  const steps = mode === 'custom' ? CUSTOM_STEPS : BASE_STEPS
  const totalSteps = steps.length
  const activeStep = steps[step]

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
    onComplete({
      players: finalPlayers,
      mode,
      customCategories: mode === 'custom' ? customCategories : [],
    })
  }

  return (
    <div className={styles.stage}>
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
          aria-label={t('setup.step', { current: step + 1, total: totalSteps })}
        >
          {Array.from({ length: totalSteps }, (_, i) => (
            <button
              key={i}
              type="button"
              className={[
                styles.segment,
                i < step ? styles.segmentDone : '',
                i === step ? styles.segmentActive : '',
              ].join(' ')}
              onClick={() => i < step && goTo(i)}
              aria-label={`${t('setup.step', { current: i + 1, total: totalSteps })}`}
              aria-current={i === step ? 'step' : undefined}
              disabled={i >= step}
            />
          ))}
        </div>

        <p className={styles.stepIndicator}>
          {t('setup.step', { current: step + 1, total: totalSteps })}
        </p>

        {/* Step content */}
        <div className={styles.stepContent}>
          {activeStep === 'mode' && (
            <ModeStep selectedMode={mode} onModeSelect={setMode} onNext={handleModeNext} />
          )}
          {activeStep === 'categories' && (
            <CategoryStep
              selected={customCategories}
              onChange={setCustomCategories}
              onBack={() => goTo(step - 1)}
              onNext={() => goTo(step + 1)}
            />
          )}
          {activeStep === 'roster' && (
            <RosterStep
              mode={mode}
              players={players}
              onPlayersChange={setPlayers}
              onBack={() => goTo(step - 1)}
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
