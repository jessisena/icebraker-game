import { useId, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { categories } from '../assets/questions'
import Button from './primitives/Button'
import styles from './CustomCategoryPicker.module.css'

const CATEGORY_LIST = Object.values(categories)

function CategoryOption({ category, checked, count, onToggle }) {
  const { t } = useTranslation(['ui', 'categories'])
  const isMusic = category.specialBehavior === 'music-trivia'
  const countLabel = isMusic ? t('decade.songs', { count }) : t('category.questions', { count })

  return (
    <label
      className={[styles.option, checked ? styles.checked : ''].join(' ')}
      style={{ '--cat-color': `var(--cat-${category.key})` }}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={() => onToggle(category.key)}
      />
      <span className={styles.tick} aria-hidden="true" />
      <span className={styles.icon} aria-hidden="true">
        {category.icon}
      </span>
      <span className={styles.name}>{t(`categories:${category.key}.name`)}</span>
      <span className={styles.desc}>{t(`categories:${category.key}.description`)}</span>
      <span className={styles.meta}>
        <span className={styles.count}>{countLabel}</span>
        {category.timerSeconds && (
          <span className={styles.badge}>
            {t('customMode.timer', { seconds: category.timerSeconds })}
          </span>
        )}
        {isMusic && <span className={styles.badge}>{t('customMode.musicHint')}</span>}
      </span>
    </label>
  )
}

CategoryOption.propTypes = {
  category: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default function CustomCategoryPicker({
  defaultSelected,
  onChange,
  onConfirm,
  confirmLabel,
  counts,
  onBack,
  framed = false,
}) {
  const { t } = useTranslation()
  const helperId = useId()
  const [selected, setSelected] = useState(defaultSelected)
  const isEmpty = selected.length === 0
  const hasNoQuestions = !isEmpty && selected.every((key) => (counts[key] ?? 0) === 0)
  const statusText = isEmpty
    ? t('customMode.minHelper')
    : hasNoQuestions
      ? t('customMode.noQuestionsHelper')
      : t('customMode.selected', { count: selected.length })

  const toggle = (key) => {
    const next = selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key]
    setSelected(next)
    onChange?.(next)
  }

  return (
    <div className={[styles.picker, framed ? styles.framed : ''].join(' ')}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.heading}>{t('customMode.heading')}</span>
          <span className={styles.helper}>{t('customMode.helper')}</span>
        </legend>
        <div className={styles.grid}>
          {CATEGORY_LIST.map((category) => (
            <CategoryOption
              key={category.key}
              category={category}
              checked={selected.includes(category.key)}
              count={counts[category.key] ?? 0}
              onToggle={toggle}
            />
          ))}
        </div>
      </fieldset>

      <p id={helperId} className={styles.status} aria-live="polite">
        {statusText}
      </p>

      <div className={styles.actions}>
        {onBack && (
          <Button variant="ghost" onClick={onBack} type="button">
            {t('setup.back')}
          </Button>
        )}
        <Button
          type="button"
          onClick={() => onConfirm(selected)}
          disabled={isEmpty || hasNoQuestions}
          aria-describedby={helperId}
          className={styles.confirmBtn}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  )
}

CustomCategoryPicker.propTypes = {
  defaultSelected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
  onBack: PropTypes.func,
  framed: PropTypes.bool,
}
