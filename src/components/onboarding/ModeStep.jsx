import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import IdentityCard from './IdentityCard'
import Button from '../primitives/Button'
import styles from './ModeStep.module.css'

const MODES = [{ key: 'couples' }, { key: 'friends' }, { key: 'team' }]

export default function ModeStep({ players, selectedMode, onModeSelect, onBack, onStart }) {
  const { t } = useTranslation()
  const canStart = Boolean(selectedMode)

  return (
    <div className={styles.step}>
      {/* Player identity summary */}
      <div className={styles.identities}>
        <IdentityCard name={players[0].name} avatar={players[0].avatar} color={players[0].color} />
        <div className={styles.versus}>
          <span className={styles.vsText}>VS</span>
        </div>
        <IdentityCard name={players[1].name} avatar={players[1].avatar} color={players[1].color} />
      </div>

      {/* Step header */}
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('setup.step2Title')}</h2>
        <p className={styles.stepHelper}>{t('setup.step2Helper')}</p>
      </div>

      {/* Mode cards */}
      <div className={styles.modeGrid}>
        {MODES.map(({ key }) => (
          <button
            key={key}
            type="button"
            className={[styles.modeCard, selectedMode === key ? styles.active : ''].join(' ')}
            onClick={() => onModeSelect(key)}
            aria-pressed={selectedMode === key}
          >
            <span className={styles.modeLabel}>{t(`mode.${key}`)}</span>
            <span className={styles.modeDesc}>{t(`mode.${key}_desc`)}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onBack} type="button">
          {t('setup.back')}
        </Button>
        <Button onClick={onStart} type="button" disabled={!canStart} className={styles.startBtn}>
          {t('setup.startButton')}
        </Button>
      </div>
    </div>
  )
}

ModeStep.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedMode: PropTypes.string,
  onModeSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
}
