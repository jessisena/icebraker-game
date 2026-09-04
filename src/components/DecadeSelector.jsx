import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from './DecadeSelector.module.css'

const DECADES = [
  { value: 1970, label: '1970s', icon: '🕺', color: 'var(--cat-absurdista)' },
  { value: 1980, label: '1980s', icon: '🎸', color: 'var(--cat-mirror)' },
  { value: 1990, label: '1990s', icon: '💿', color: 'var(--cat-heat)' },
  { value: 2000, label: '2000s', icon: '🎧', color: 'var(--cat-spark)' },
  { value: 2010, label: '2010s', icon: '📱', color: 'var(--cat-atlasOfMe)' },
  { value: 2020, label: '2020s', icon: '🎵', color: 'var(--cat-roots)' },
]

export default function DecadeSelector({ opponentData, onDecadeSelect, availableSongsByDecade }) {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <span style={{ color: opponentData.color }}>{opponentData.name}</span>
        {t('decade.headingAction')}
      </h2>
      <p className={styles.subheading}>{t('decade.subheading')}</p>

      <div className={styles.grid}>
        {DECADES.map((decade) => {
          const count = availableSongsByDecade[decade.value] || 0
          const isEmpty = count === 0

          return (
            <div
              key={decade.value}
              className={[styles.card, isEmpty ? styles.empty : ''].join(' ')}
              onClick={() => !isEmpty && onDecadeSelect(decade.value)}
              role="button"
              tabIndex={isEmpty ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isEmpty) onDecadeSelect(decade.value)
              }}
              aria-label={`${decade.label}`}
            >
              <div className={styles.cardIcon}>{decade.icon}</div>
              <h3
                className={styles.cardLabel}
                style={{ color: isEmpty ? 'var(--text-muted)' : decade.color }}
              >
                {decade.label}
              </h3>
              <div
                className={styles.countBadge}
                style={{
                  backgroundColor: isEmpty ? 'var(--surface-raised)' : `${decade.color}22`,
                  color: isEmpty ? 'var(--text-muted)' : decade.color,
                }}
              >
                {t('decade.songs', { count })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

DecadeSelector.propTypes = {
  opponentData: PropTypes.object.isRequired,
  onDecadeSelect: PropTypes.func.isRequired,
  availableSongsByDecade: PropTypes.object.isRequired,
}
