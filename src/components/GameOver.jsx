import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import AvatarGlyph from './AvatarGlyph'
import Button from './primitives/Button'
import styles from './GameOver.module.css'

const MEDALS = ['🥇', '🥈', '🥉']

export default function GameOver({ players, onReplay, onReset }) {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('gameOver.title')}</h1>
      <p className={styles.subtitle}>{t('gameOver.subtitle')}</p>

      <ol className={styles.standings}>
        {players.map((player, i) => (
          <li key={player.name} className={styles.row}>
            <span className={styles.medal}>{MEDALS[i] ?? `${i + 1}.`}</span>
            <AvatarGlyph name={player.avatar} color={player.color} size="md" />
            <div className={styles.info}>
              <span className={styles.name} style={{ color: player.color }}>
                {player.name}
              </span>
              <span className={styles.score}>
                {player.average} · {t('gameOver.answers', { count: player.totalRatings })}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.actions}>
        <Button onClick={onReplay}>{t('gameOver.replay')}</Button>
        <Button variant="ghost" onClick={onReset}>
          {t('gameOver.changePlayers')}
        </Button>
      </div>
    </div>
  )
}

GameOver.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  onReplay: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}
