import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import AvatarGlyph from './AvatarGlyph'
import Button from './primitives/Button'
import styles from './Leaderboard.module.css'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard({ players, onClose, onReset }) {
  const { t } = useTranslation()

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>{t('leaderboard.title')}</h1>

      <div className={styles.board}>
        {players.map((player, index) => (
          <div key={player.name} className={styles.entry}>
            <div className={styles.playerInfo}>
              <AvatarGlyph name={player.avatar} color={player.color} size="md" />
              <p className={styles.playerName} style={{ color: player.color }}>
                {MEDALS[index] ?? '🏅'} {player.name}
              </p>
            </div>

            <div className={styles.scoreBlock}>
              <p className={styles.score}>{t('vote.points', { count: player.total })}</p>
              <span className={styles.tally} role="img" aria-label={t('vote.tally', player.tally)}>
                👍 {player.tally.good} · 😐 {player.tally.neutral} · 👎 {player.tally.bad}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button onClick={onClose}>{t('leaderboard.backToGame')}</Button>
        <Button variant="ghost" onClick={onReset}>
          {t('leaderboard.changePlayers')}
        </Button>
      </div>
    </div>
  )
}

const rankedPlayerShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  tally: PropTypes.shape({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  }).isRequired,
})

Leaderboard.propTypes = {
  players: PropTypes.arrayOf(rankedPlayerShape).isRequired,
  onClose: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}
