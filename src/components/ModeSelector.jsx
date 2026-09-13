import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from './ModeSelector.module.css'

const MODES = [{ key: 'couples' }, { key: 'friends' }, { key: 'team' }]

export default function ModeSelector({ currentMode, onModeSelect, playerCount = 2 }) {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{t('mode.heading')}</h2>
      <p className={styles.subheading}>{t('mode.subheading')}</p>

      <div className={styles.grid}>
        {MODES.map(({ key }) => {
          const isDisabled = key === 'couples' && playerCount > 2
          return (
            <button
              key={key}
              className={[
                styles.card,
                currentMode === key ? styles.active : '',
                isDisabled ? styles.disabled : '',
              ].join(' ')}
              onClick={() => !isDisabled && onModeSelect(key)}
              disabled={isDisabled}
            >
              <span className={styles.label}>{t(`mode.${key}`)}</span>
              <span className={styles.desc}>{t(`mode.${key}_desc`)}</span>
              {isDisabled && (
                <span className={styles.disabledHint}>{t('mode.couplesDisabled')}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

ModeSelector.propTypes = {
  currentMode: PropTypes.string,
  onModeSelect: PropTypes.func.isRequired,
  playerCount: PropTypes.number,
}
