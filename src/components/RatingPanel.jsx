import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { categories } from '../assets/questions'
import { RATING } from '../data/ratings'
import styles from './RatingPanel.module.css'

const VOTE_OPTIONS = [
  { key: 'good', value: RATING.good, emoji: '👍' },
  { key: 'neutral', value: RATING.neutral, emoji: '😐' },
  { key: 'bad', value: RATING.bad, emoji: '👎' },
]

const CRITERIA_KEYS = {
  absurdista: 'absurdista',
  atlasOfMe: 'atlasOfMe',
  dilemma: 'dilemma',
  decadesTape: 'music',
}

const HINT_KEYS = {
  atlasOfMe: 'atlas',
  decadesTape: 'music',
}

export default function RatingPanel({ playerWhoAnswered, raters, submitRating, categoryKey }) {
  const { t, i18n } = useTranslation()
  const metaKey = categories[categoryKey]?.key
  const criteria = t(`vote.criteria.${CRITERIA_KEYS[metaKey] ?? 'default'}`)
  const hintKey = HINT_KEYS[metaKey]

  const raterLabel = new Intl.ListFormat(i18n.language, { type: 'conjunction' }).format(
    raters.map((r) => r.name)
  )

  return (
    <div className={styles.container}>
      <div className={styles.handle} aria-hidden="true" />
      <h2 className={styles.title}>{t('vote.justAnswered', { name: playerWhoAnswered })}</h2>
      <p className={styles.criteria}>{t('vote.ratePrompt', { rater: raterLabel, criteria })}</p>

      <div className={styles.voteGrid}>
        {VOTE_OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            className={styles.voteButton}
            onClick={() => submitRating(option.value)}
          >
            <span className={styles.voteEmoji} aria-hidden="true">
              {option.emoji}
            </span>
            <span className={styles.voteLabel}>{t(`vote.${option.key}`)}</span>
            {hintKey && (
              <span className={styles.voteHint}>{t(`vote.hint.${hintKey}.${option.key}`)}</span>
            )}
          </button>
        ))}
      </div>
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
