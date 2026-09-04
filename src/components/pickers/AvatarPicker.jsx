import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import AvatarGlyph from '../AvatarGlyph'
import styles from './AvatarPicker.module.css'

export default function AvatarPicker({ avatars, selected, onChange, accentColor }) {
  const { t } = useTranslation()
  const refs = useRef([])

  const handleKeyDown = (e, index) => {
    const count = avatars.length
    let next = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      next = (index + 1) % count
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      next = (index - 1 + count) % count
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(avatars[index].name)
      return
    } else {
      return
    }
    refs.current[next]?.focus()
    onChange(avatars[next].name)
  }

  return (
    <div className={styles.grid} role="radiogroup" aria-label={t('setup.avatarLabel')}>
      {avatars.map((avatar, i) => {
        const isSelected = selected === avatar.name
        return (
          <button
            key={avatar.name}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={t(avatar.labelKey)}
            tabIndex={isSelected ? 0 : -1}
            className={[styles.option, isSelected ? styles.selected : ''].join(' ')}
            style={isSelected ? { '--accent-color': accentColor } : undefined}
            onClick={() => onChange(avatar.name)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            <AvatarGlyph
              name={avatar.name}
              color={isSelected ? accentColor : 'var(--text-muted)'}
              size="md"
            />
            <p className={styles.label}>{t(avatar.labelKey)}</p>
          </button>
        )
      })}
    </div>
  )
}

AvatarPicker.propTypes = {
  avatars: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired, labelKey: PropTypes.string.isRequired })
  ).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  accentColor: PropTypes.string.isRequired,
}
