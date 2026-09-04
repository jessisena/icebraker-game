import PropTypes from 'prop-types'
import styles from './AvatarGlyph.module.css'

/* Inline SVG glyphs — all elements use currentColor so the parent's
   `color` style tints the entire glyph. viewBox 0 0 100 100. */
const GLYPHS = {
  cat: (
    <>
      {/* Head */}
      <circle
        cx="50"
        cy="54"
        r="28"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Ears */}
      <polygon
        points="22,42 28,16 42,36"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <polygon
        points="78,42 72,16 58,36"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Eyes */}
      <ellipse cx="40" cy="50" rx="4.5" ry="5.5" fill="currentColor" />
      <ellipse cx="60" cy="50" rx="4.5" ry="5.5" fill="currentColor" />
      {/* Nose */}
      <polygon points="50,58 47,62 53,62" fill="currentColor" />
      {/* Mouth */}
      <path
        d="M47,62 Q50,66 53,62"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Whiskers */}
      <line
        x1="16"
        y1="55"
        x2="40"
        y2="57"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
      <line
        x1="16"
        y1="62"
        x2="40"
        y2="61"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
      <line
        x1="84"
        y1="55"
        x2="60"
        y2="57"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
      <line
        x1="84"
        y1="62"
        x2="60"
        y2="61"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
    </>
  ),
  dog: (
    <>
      {/* Head */}
      <circle
        cx="50"
        cy="46"
        r="26"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Floppy ears */}
      <path
        d="M24,38 Q14,58 22,74 Q30,82 36,72 Q40,56 32,36 Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M76,38 Q86,58 78,74 Q70,82 64,72 Q60,56 68,36 Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Snout */}
      <ellipse
        cx="50"
        cy="60"
        rx="12"
        ry="9"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Eyes */}
      <circle cx="40" cy="42" r="4.5" fill="currentColor" />
      <circle cx="60" cy="42" r="4.5" fill="currentColor" />
      {/* Nose */}
      <ellipse cx="50" cy="56" rx="5" ry="3.5" fill="currentColor" />
      {/* Mouth */}
      <path
        d="M44,62 Q50,67 56,62"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  bird: (
    <>
      {/* Body */}
      <ellipse
        cx="50"
        cy="62"
        rx="22"
        ry="16"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Head */}
      <circle
        cx="50"
        cy="34"
        r="18"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Wing */}
      <path
        d="M30,58 Q20,50 28,42 Q36,34 42,44"
        fill="currentColor"
        fillOpacity="0.28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Beak */}
      <polygon points="64,34 80,29 80,39" fill="currentColor" fillOpacity="0.75" />
      {/* Eye */}
      <circle cx="43" cy="30" r="4.5" fill="currentColor" />
      <circle
        cx="43"
        cy="30"
        r="1.5"
        fill="currentColor"
        fillOpacity="0"
        stroke="currentColor"
        strokeOpacity="0"
      />
    </>
  ),
  fish: (
    <>
      {/* Body */}
      <ellipse
        cx="54"
        cy="50"
        rx="28"
        ry="20"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Tail */}
      <polygon
        points="22,50 8,32 8,68"
        fill="currentColor"
        fillOpacity="0.32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Top fin */}
      <path
        d="M46,32 Q52,20 60,30"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx="68" cy="44" r="5.5" fill="currentColor" />
      <circle cx="68" cy="44" r="2" fill="currentColor" fillOpacity="0.2" stroke="none" />
      {/* Scales hint */}
      <path d="M38,44 Q44,40 50,44 Q44,48 38,44 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M50,44 Q56,40 62,44 Q56,48 50,44 Z" fill="currentColor" fillOpacity="0.15" />
    </>
  ),
  fox: (
    <>
      {/* Head */}
      <circle
        cx="50"
        cy="52"
        r="26"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Pointed ears */}
      <polygon
        points="24,40 28,12 44,34"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <polygon
        points="76,40 72,12 56,34"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Muzzle */}
      <ellipse
        cx="50"
        cy="64"
        rx="13"
        ry="9"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Eyes */}
      <ellipse cx="39" cy="48" rx="4" ry="5" fill="currentColor" />
      <ellipse cx="61" cy="48" rx="4" ry="5" fill="currentColor" />
      {/* Nose */}
      <ellipse cx="50" cy="60" rx="3.5" ry="2.5" fill="currentColor" />
      {/* Mouth */}
      <path
        d="M44,64 Q50,68 56,64"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  owl: (
    <>
      {/* Head */}
      <circle
        cx="50"
        cy="48"
        r="30"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Ear tufts */}
      <polygon points="32,24 28,8 40,20" fill="currentColor" fillOpacity="0.35" />
      <polygon points="68,24 72,8 60,20" fill="currentColor" fillOpacity="0.35" />
      {/* Eye rings */}
      <circle
        cx="38"
        cy="48"
        r="12"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        cx="62"
        cy="48"
        r="12"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Bridge between eyes */}
      <path d="M46,42 Q50,40 54,42" stroke="currentColor" strokeWidth="2" fill="none" />
      {/* Pupils */}
      <circle cx="38" cy="48" r="6" fill="currentColor" />
      <circle cx="62" cy="48" r="6" fill="currentColor" />
      {/* Beak */}
      <polygon points="46,56 54,56 50,64" fill="currentColor" fillOpacity="0.7" />
    </>
  ),
}

const SIZE_MAP = { sm: 'var(--avatar-sm)', md: 'var(--avatar-md)', lg: 'var(--avatar-lg)' }

export default function AvatarGlyph({ name, color, size = 'lg', className }) {
  const glyph = GLYPHS[name] ?? GLYPHS.cat
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
  name: PropTypes.oneOf(['cat', 'dog', 'bird', 'fish', 'fox', 'owl']).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}
