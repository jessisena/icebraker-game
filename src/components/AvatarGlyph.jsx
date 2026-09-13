import PropTypes from 'prop-types'
import styles from './AvatarGlyph.module.css'

/* Inline SVG glyphs — all elements use currentColor so the parent's
   `color` style tints the entire glyph. viewBox 0 0 100 100.
   Design rules: min stroke-width 4, no fillOpacity below 0.25,
   2-4 shapes per glyph, distinct silhouette at 36px. */
const GLYPHS = {
  moon: (
    <>
      {/*
        Crescent: outer circle center(50,50) r=38 minus inner circle center(36,50) r=34.
        Intersection points ≈ (32.7, 16.2) and (32.7, 83.8).
        First arc: CW large-arc sweeps the right half of the outer circle.
        Second arc: CCW short arc traces the concave inner edge.
      */}
      <path d="M 32.7 16.2 A 38 38 0 1 1 32.7 83.8 A 34 34 0 0 0 32.7 16.2 Z" fill="currentColor" />
    </>
  ),
  sun: (
    <>
      {/* Disc */}
      <circle cx="50" cy="50" r="21" fill="currentColor" />
      {/* 8 rays from r=27 to r=38, starting at 12 o'clock */}
      <line
        x1="50.0"
        y1="23.0"
        x2="50.0"
        y2="12.0"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="69.1"
        y1="30.9"
        x2="76.9"
        y2="23.1"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="77.0"
        y1="50.0"
        x2="88.0"
        y2="50.0"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="69.1"
        y1="69.1"
        x2="76.9"
        y2="76.9"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="50.0"
        y1="77.0"
        x2="50.0"
        y2="88.0"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="30.9"
        y1="69.1"
        x2="23.1"
        y2="76.9"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="23.0"
        y1="50.0"
        x2="12.0"
        y2="50.0"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="30.9"
        y1="30.9"
        x2="23.1"
        y2="23.1"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </>
  ),
  star: (
    <>
      {/*
        5-point star: outer r=40, inner r=16, first point at 12 o'clock.
        Points alternate outer/inner at 36° increments starting at -90°.
      */}
      <polygon
        points="50.0,10.0 59.4,37.1 88.0,37.6 65.2,54.9 73.5,82.4 50.0,66.0 26.5,82.4 34.8,54.9 12.0,37.6 40.6,37.1"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </>
  ),
  comet: (
    <>
      {/* Tapering trail sweeping toward lower-left */}
      <path d="M 54 50 Q 30 63 11 83 Q 20 72 45 54 Z" fill="currentColor" fillOpacity="0.38" />
      {/* Head */}
      <circle cx="66" cy="34" r="15" fill="currentColor" />
    </>
  ),
  planet: (
    <>
      {/*
        Ring back half (dim) + disc + ring front half (full).
        Ellipse cx=50 cy=50 rx=43 ry=13 rotated -22°.
        Major axis endpoints after rotation: (89.9, 33.9) and (10.1, 66.1).
        sweep=0 → through top of ellipse (back); sweep=1 → through bottom (front).
      */}
      <path
        d="M 89.9 33.9 A 43 13 -22 0 0 10.1 66.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeOpacity="0.25"
      />
      <circle cx="50" cy="50" r="25" fill="currentColor" />
      <path
        d="M 89.9 33.9 A 43 13 -22 0 1 10.1 66.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
    </>
  ),
  constellation: (
    <>
      {/* Connector lines drawn first (behind dots) */}
      <line
        x1="50"
        y1="16"
        x2="20"
        y2="50"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="16"
        x2="80"
        y2="50"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="50"
        x2="32"
        y2="80"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="50"
        x2="68"
        y2="80"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="80"
        x2="68"
        y2="80"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      {/* Stars — anchor at top is larger */}
      <circle cx="50" cy="16" r="7" fill="currentColor" />
      <circle cx="20" cy="50" r="5" fill="currentColor" />
      <circle cx="80" cy="50" r="5" fill="currentColor" />
      <circle cx="32" cy="80" r="5" fill="currentColor" />
      <circle cx="68" cy="80" r="5" fill="currentColor" />
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
      {glyph}
    </svg>
  )
}

AvatarGlyph.propTypes = {
  name: PropTypes.oneOf(['moon', 'sun', 'star', 'comet', 'planet', 'constellation']).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}
