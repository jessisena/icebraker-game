import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Button from '../primitives/Button'
import styles from './ModeStep.module.css'

const MODES = [{ key: 'couples' }, { key: 'friends' }, { key: 'team' }]

export default function ModeStep({ selectedMode, onModeSelect, onNext }) {
  const { t } = useTranslation()
  const canNext = Boolean(selectedMode)

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('setup.step0Title')}</h2>
        <p className={styles.stepHelper}>{t('setup.step0Helper')}</p>
      </div>

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
            <span className={styles.modeCount}>{t(`mode.${key}_players`)}</span>
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <Button onClick={onNext} type="button" disabled={!canNext} className={styles.nextBtn}>
          {t('setup.next')}
        </Button>
      </div>
    </div>
  )
}

ModeStep.propTypes = {
  selectedMode: PropTypes.string,
  onModeSelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}
