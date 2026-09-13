import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { categories } from '../assets/questions'
import styles from './RatingPanel.module.css'

const STAR_OPTIONS = [1, 2, 3, 4, 5].map((n) => ({ value: n, label: `${n} ★` }))

export default function RatingPanel({ playerWhoAnswered, raters, submitRating, categoryKey }) {
  const { t, i18n } = useTranslation()
  const categoryMeta = categories[categoryKey]
  const isMusicTrivia = categoryMeta?.specialBehavior === 'music-trivia'
  const isAtlas = categoryMeta?.key === 'atlasOfMe'
  const isPointScored = isMusicTrivia || isAtlas

  const criteriaKey =
    categoryMeta?.key === 'absurdista'
      ? 'absurdista'
      : isAtlas
        ? 'atlasOfMe'
        : categoryMeta?.key === 'dilemma'
          ? 'dilemma'
          : isMusicTrivia
            ? 'music'
            : 'default'

  const criteria = t(`rating.criteria.${criteriaKey}`)

  // Build the rater label — single name or a locale-aware conjunction list
  const raterNames = raters.map((r) => r.name)
  const raterLabel =
    raterNames.length === 1
      ? raterNames[0]
      : new Intl.ListFormat(i18n.language, { type: 'conjunction' }).format(raterNames)

  const atlasOptions = [
    { value: 0, label: t('rating.atlas.none'), emoji: '🚫', desc: t('rating.points.zero') },
    { value: 1, label: t('rating.atlas.light'), emoji: '🗺️', desc: t('rating.points.one') },
    { value: 2, label: t('rating.atlas.strong'), emoji: '📍', desc: t('rating.points.two') },
  ]

  const musicOptions = [
    { value: 0, label: t('rating.music.none'), emoji: '❌', desc: t('rating.points.zero') },
    { value: 1, label: t('rating.music.partial'), emoji: '🎯', desc: t('rating.points.one') },
    { value: 2, label: t('rating.music.perfect'), emoji: '⭐', desc: t('rating.points.two') },
  ]

  const pointOptions = isAtlas ? atlasOptions : musicOptions

  return (
    <div className={styles.container}>
      <div className={styles.handle} aria-hidden="true" />
      <h2 className={styles.title}>{t('rating.justAnswered', { name: playerWhoAnswered })}</h2>
      <p className={styles.criteria}>{t('rating.ratePrompt', { rater: raterLabel, criteria })}</p>

      {isPointScored && (
        <p className={styles.legend}>
          {t(isAtlas ? 'rating.legend.atlas' : 'rating.legend.music')}
        </p>
      )}

      {isPointScored ? (
        <div className={styles.pointGrid}>
          {pointOptions.map((option) => (
            <button
              key={option.value}
              className={styles.pointButton}
              onClick={() => submitRating(option.value)}
            >
              <span className={styles.pointEmoji}>{option.emoji}</span>
              <span className={styles.pointLabel}>{option.label}</span>
              <span className={styles.pointDesc}>{option.desc}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.starGrid}>
          {STAR_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={styles.starButton}
              onClick={() => submitRating(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

RatingPanel.propTypes = {
  playerWhoAnswered: PropTypes.string,
  raters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  submitRating: PropTypes.func.isRequired,
  categoryKey: PropTypes.string,
}
