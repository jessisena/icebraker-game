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
              <div>
                <p className={styles.playerName} style={{ color: player.color }}>
                  {MEDALS[index] ?? '🏅'} {player.name}
                </p>
                <p className={styles.totalRatings}>
                  {t('leaderboard.ratings', { count: player.totalRatings })}
                </p>
              </div>
            </div>

            <div className={styles.scoreBlock}>
              <div className={styles.stars}>
                {'⭐'.repeat(Math.min(Math.round(Number(player.average)), 5))}
              </div>
              <p className={styles.score}>{player.average}</p>
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

Leaderboard.propTypes = {
  players: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}
