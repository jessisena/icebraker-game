import PropTypes from 'prop-types'
import styles from './AvatarGlyph.module.css'

/* Arcana emblems drawn in an engraved line style. viewBox 0 0 100 100.
   Design rules: primary shapes are strokes in currentColor (the player's
   color) at one weight — 5 units, round caps and joins — set once on the
   wrapping <g>. Brass details use the .detail (3-unit line) and .jewel
   (fill) classes, which read var(--accent). Keep details sparse and keep
   every stroke inside a 6-unit margin so each silhouette stays legible
   and distinct at 36px. */
const GLYPHS = {
  eye: (
    <>
      <path d="M 8 58 Q 50 20 92 58 Q 50 96 8 58 Z" />
      <circle cx="50" cy="58" r="12" />
      <circle cx="50" cy="58" r="5" fill="currentColor" stroke="none" />
      <path className={styles.detail} d="M 50 32 V 20 M 27 37 L 22 28 M 73 37 L 78 28" />
    </>
  ),
  key: (
    <g transform="rotate(-45 50 50)">
      <circle cx="50" cy="22" r="13" />
      <path d="M 50 35 V 88 H 64 V 78 M 50 74 H 60 M 43 42 H 57" />
      <circle className={styles.jewel} cx="50" cy="22" r="4" />
    </g>
  ),
  hand: (
    <>
      <path
        d="M 40 88 L 35 66 L 20 52 A 5.5 5.5 0 0 1 28 45 L 35 52 V 26 A 6 6 0 0 1 47 26
           V 44 V 18 A 6 6 0 0 1 59 18 V 44 V 22 A 6 6 0 0 1 71 22
           V 46 V 33 A 5.5 5.5 0 0 1 82 33 V 62 L 77 88"
      />
      <path className={styles.detail} d="M 49 66 Q 58 59 67 66 Q 58 73 49 66 Z" />
      <circle className={styles.jewel} cx="58" cy="66" r="2.5" />
    </>
  ),
  wheel: (
    <>
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="8" />
      <path
        d="M 50 42 V 16 M 50 58 V 84 M 42 50 H 16 M 58 50 H 84
           M 55.66 44.34 L 74.04 25.96 M 44.34 55.66 L 25.96 74.04
           M 55.66 55.66 L 74.04 74.04 M 44.34 44.34 L 25.96 25.96"
      />
      <path
        className={styles.detail}
        d="M 64.93 13.97 L 66.84 9.35 M 86.03 35.07 L 90.65 33.16
           M 86.03 64.93 L 90.65 66.84 M 64.93 86.03 L 66.84 90.65
           M 35.07 86.03 L 33.16 90.65 M 13.97 64.93 L 9.35 66.84
           M 13.97 35.07 L 9.35 33.16 M 35.07 13.97 L 33.16 9.35"
      />
      <circle className={styles.jewel} cx="50" cy="50" r="3" />
    </>
  ),
  crown: (
    <>
      <path d="M 20 78 L 14 34 L 34 54 L 50 24 L 66 54 L 86 34 L 80 78 Z M 18.4 66 H 81.6" />
      <circle className={styles.jewel} cx="14" cy="27" r="4" />
      <circle className={styles.jewel} cx="50" cy="17" r="4" />
      <circle className={styles.jewel} cx="86" cy="27" r="4" />
      <circle className={styles.jewel} cx="35" cy="72" r="3" />
      <circle className={styles.jewel} cx="50" cy="72" r="3" />
      <circle className={styles.jewel} cx="65" cy="72" r="3" />
    </>
  ),
  moon: (
    <>
      {/* Outer circle c(50,50) r36 minus inner circle c(66,50) r30;
          they intersect at (70.38, 20.32) and (70.38, 79.68). */}
      <path d="M 70.38 20.32 A 36 36 0 1 0 70.38 79.68 A 30 30 0 1 1 70.38 20.32 Z" />
      <path
        className={styles.jewel}
        d="M 68 40 L 71 47 L 78 50 L 71 53 L 68 60 L 65 53 L 58 50 L 65 47 Z"
      />
      <circle className={styles.jewel} cx="84" cy="36" r="2.5" />
      <circle className={styles.jewel} cx="82" cy="66" r="2" />
    </>
  ),
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
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyph}
      </g>
    </svg>
  )
}

AvatarGlyph.propTypes = {
  name: PropTypes.oneOf(['eye', 'key', 'hand', 'wheel', 'crown', 'moon']).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}
