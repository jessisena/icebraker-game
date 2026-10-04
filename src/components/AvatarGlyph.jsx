import PropTypes from 'prop-types'
import styles from './AvatarGlyph.module.css'

/* Inline SVG glyphs — all elements use currentColor so the parent's
   `color` style tints the entire glyph. viewBox 0 0 100 100.
   Design rules: min stroke-width 4, no fillOpacity below 0.25,
   2-4 shapes per glyph, distinct silhouette at 36px. */
const PLACEHOLDER = (
  <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="6" />
)

/* Phase 0 placeholders — the Arcana glyph workstream replaces these with real SVGs */
const GLYPHS = {
  eye: PLACEHOLDER,
  key: PLACEHOLDER,
  hand: PLACEHOLDER,
  wheel: PLACEHOLDER,
  crown: PLACEHOLDER,
  moon: PLACEHOLDER,
}

const SIZE_MAP = { sm: 'var(--avatar-sm)', md: 'var(--avatar-md)', lg: 'var(--avatar-lg)' }

export default function AvatarGlyph({ name, color, size = 'lg', className }) {
  const glyph = GLYPHS[name] ?? GLYPHS.moon
  const dim = SIZE_MAP[size] ?? SIZE_MAP.lg

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={dim}
      height={dim}
      style={{ color, display: 'block', flexShrink: 0 }}
      className={[styles.glyph, className].filter(Boolean).join(' ')}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {glyph}
    </svg>
  )
}

AvatarGlyph.propTypes = {
  name: PropTypes.oneOf(['eye', 'key', 'hand', 'wheel', 'crown', 'moon']).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}
