import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from './ColorPicker.module.css'

export default function ColorPicker({ colors, selected, onChange }) {
  const { t } = useTranslation()
  const refs = useRef([])

  const handleKeyDown = (e, index) => {
    const count = colors.length
    let next = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      next = (index + 1) % count
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      next = (index - 1 + count) % count
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(colors[index].value)
      return
    } else {
      return
    }
    refs.current[next]?.focus()
    onChange(colors[next].value)
  }

  return (
    <div className={styles.grid} role="radiogroup" aria-label={t('setup.colorLabel')}>
      {colors.map((color, i) => {
        const isSelected = selected === color.value
        return (
          <button
            key={color.name}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={t(color.labelKey)}
            tabIndex={isSelected ? 0 : -1}
            className={[styles.swatch, isSelected ? styles.selected : ''].join(' ')}
            style={{ '--swatch-color': color.value }}
            onClick={() => onChange(color.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {isSelected && (
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      labelKey: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
