import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from './CategorySelector.module.css'

const ALL_CATEGORY = { key: 'all', icon: '🎲', color: 'var(--cat-all)' }

export default function CategorySelector({
  currentPlayerData,
  onCategorySelect,
  availableCounts,
  categories,
}) {
  const { t } = useTranslation(['ui', 'categories'])

  const allCategories = [...Object.values(categories), ALL_CATEGORY]

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <span style={{ color: currentPlayerData.color }}>{currentPlayerData.name}</span>
        {t('category.headingAction')}
      </h2>
      <p className={styles.subheading}>{t('category.subheading')}</p>

      <div className={styles.grid}>
        {allCategories.map((category) => {
          const count = availableCounts[category.key] || 0
          const isEmpty = count === 0
          const name = t(`categories:${category.key}.name`)
          const description = t(`categories:${category.key}.description`)

          return (
            <div
              key={category.key}
              className={[styles.card, isEmpty ? styles.empty : ''].join(' ')}
              onClick={() => !isEmpty && onCategorySelect(category.key)}
              role="button"
              tabIndex={isEmpty ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isEmpty) onCategorySelect(category.key)
              }}
              aria-label={name}
            >
              <div className={styles.cardIcon}>{category.icon}</div>
              <h3
                className={styles.cardName}
                style={{ color: isEmpty ? 'var(--text-muted)' : category.color }}
              >
                {name}
              </h3>
              <p className={styles.cardDescription}>{description}</p>
              {category.timerSeconds && (
                <div className={styles.timerBadge}>⏱ {category.timerSeconds}s</div>
              )}
              <div
                className={styles.countBadge}
                style={{
                  backgroundColor: isEmpty ? 'var(--surface-raised)' : `${category.color}22`,
                  color: isEmpty ? 'var(--text-muted)' : category.color,
                }}
              >
                {t('category.questions', { count })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

CategorySelector.propTypes = {
  currentPlayerData: PropTypes.object.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  availableCounts: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
}
