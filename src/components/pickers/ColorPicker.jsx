import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { rovingTarget, tabStopIndex } from './roving'
import styles from './ColorPicker.module.css'

function initialOf(name) {
  return Array.from(name)[0]?.toLocaleUpperCase() ?? ''
}

export default function ColorPicker({ colors, selected, takenBy = {}, onChange, label }) {
  const { t } = useTranslation()
  const refs = useRef([])

  const count = colors.length
  const isFree = (i) => !takenBy[colors[i].value]
  const selectedIndex = colors.findIndex((c) => c.value === selected)
  const tabStop = tabStopIndex(selectedIndex, count, isFree)

  const handleKeyDown = (e, index) => {
    const next = rovingTarget(e.key, index, count, isFree)
    if (next === null) return
    e.preventDefault()
    refs.current[next]?.focus()
    onChange(colors[next].value)
  }

  return (
    <div className={styles.grid} role="radiogroup" aria-label={label}>
      {colors.map((color, i) => {
        const isSelected = i === selectedIndex
        const owner = takenBy[color.value]
        const name = t(color.labelKey)
        return (
          <button
            key={color.name}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={owner ? 'true' : undefined}
            aria-label={owner ? t('identity.takenBy', { label: name, owner }) : name}
            tabIndex={i === tabStop ? 0 : -1}
            className={[
              styles.swatch,
              isSelected ? styles.selected : '',
              owner ? styles.taken : '',
            ].join(' ')}
            style={{ '--swatch-color': color.value }}
            onClick={() => !owner && onChange(color.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {isSelected && (
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
            )}
            {owner && (
              <span className={styles.initial} aria-hidden="true">
                {initialOf(owner)}
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
  takenBy: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}
