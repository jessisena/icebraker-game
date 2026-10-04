import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import AvatarGlyph from '../AvatarGlyph'
import { rovingTarget, tabStopIndex } from './roving'
import styles from './CardDeck.module.css'

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/* Scrolls only the deck horizontally so expanding a row never jumps the page */
function centerInDeck(deck, card) {
  if (!deck || !card || typeof deck.scrollTo !== 'function') return
  deck.scrollTo({
    left: card.offsetLeft - (deck.clientWidth - card.offsetWidth) / 2,
    behavior: prefersReducedMotion() ? 'instant' : 'smooth',
  })
}

export default function CardDeck({
  avatars,
  selected,
  takenBy = {},
  onChange,
  accentColor,
  label,
}) {
  const { t } = useTranslation()
  const deckRef = useRef(null)
  const refs = useRef([])

  const count = avatars.length
  const isFree = (i) => !takenBy[avatars[i].name]
  const selectedIndex = avatars.findIndex((a) => a.name === selected)
  const tabStop = tabStopIndex(selectedIndex, count, isFree)

  useEffect(() => {
    centerInDeck(deckRef.current, refs.current[selectedIndex])
  }, [selectedIndex])

  const handleKeyDown = (e, index) => {
    const next = rovingTarget(e.key, index, count, isFree)
    if (next === null) return
    e.preventDefault()
    refs.current[next]?.focus()
    onChange(avatars[next].name)
  }

  return (
    <div ref={deckRef} className={styles.deck} role="radiogroup" aria-label={label}>
      {avatars.map((avatar, i) => {
        const isSelected = i === selectedIndex
        const owner = takenBy[avatar.name]
        const title = t(avatar.labelKey)
        return (
          <button
            key={avatar.name}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={owner ? 'true' : undefined}
            aria-label={owner ? t('identity.takenBy', { label: title, owner }) : title}
            tabIndex={i === tabStop ? 0 : -1}
            className={[
              styles.card,
              isSelected ? styles.selected : '',
              owner ? styles.taken : '',
            ].join(' ')}
            style={{ '--card-color': accentColor }}
            onClick={() => !owner && onChange(avatar.name)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            <span className={styles.glyph}>
              <AvatarGlyph
                name={avatar.name}
                color={isSelected ? 'var(--bg)' : 'var(--text-muted)'}
                size="lg"
              />
            </span>
            <span className={styles.foot}>
              <span className={styles.title}>{title}</span>
              {owner && <span className={styles.owner}>{owner}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

CardDeck.propTypes = {
  avatars: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired, labelKey: PropTypes.string.isRequired })
  ).isRequired,
  selected: PropTypes.string,
  takenBy: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  accentColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}
