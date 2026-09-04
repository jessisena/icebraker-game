import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from './ModeSelector.module.css'

const MODES = [
  { key: 'couples', categories: 9 },
  { key: 'friends', categories: 7 },
  { key: 'team', categories: 6 },
]

export default function ModeSelector({ currentMode, onModeSelect }) {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{t('mode.heading')}</h2>
      <p className={styles.subheading}>{t('mode.subheading')}</p>

      <div className={styles.grid}>
        {MODES.map(({ key }) => (
          <button
            key={key}
            className={[styles.card, currentMode === key ? styles.active : ''].join(' ')}
            onClick={() => onModeSelect(key)}
          >
            <span className={styles.label}>{t(`mode.${key}`)}</span>
            <span className={styles.desc}>{t(`mode.${key}_desc`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

ModeSelector.propTypes = {
  currentMode: PropTypes.string,
  onModeSelect: PropTypes.func.isRequired,
}
