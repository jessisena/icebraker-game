import { useState, useId } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { avatars, colors } from '../../data/options'
import AvatarGlyph from '../AvatarGlyph'
import AvatarPicker from '../pickers/AvatarPicker'
import ColorPicker from '../pickers/ColorPicker'
import Button from '../primitives/Button'
import styles from './RosterStep.module.css'

const MIN_PLAYERS = 2
const MAX_PLAYERS = 6

export default function RosterStep({ mode, players, onPlayersChange, onBack, onStart }) {
  const { t } = useTranslation()
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [errors, setErrors] = useState({})

  const isCouples = mode === 'couples'
  const canAdd = !isCouples && players.length < MAX_PLAYERS

  const updatePlayer = (index, patch) => {
    onPlayersChange(players.map((p, i) => (i === index ? { ...p, ...patch } : p)))
    if (errors[index]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[index]
        return next
      })
    }
  }

  const addPlayer = () => {
    if (!canAdd) return
    const usedAvatars = players.map((p) => p.avatar)
    const usedColors = players.map((p) => p.color)
    const avatar = avatars.find((a) => !usedAvatars.includes(a.name))?.name ?? avatars[0].name
    const color = colors.find((c) => !usedColors.includes(c.value))?.value ?? colors[0].value
    const next = [...players, { name: '', avatar, color }]
    onPlayersChange(next)
    setExpandedIndex(next.length - 1)
  }

  const removePlayer = (index) => {
    const next = players.filter((_, i) => i !== index)
    onPlayersChange(next)
    setExpandedIndex((prev) => Math.min(prev, next.length - 1))
    setErrors((prev) => {
      const shifted = {}
      for (const [k, v] of Object.entries(prev)) {
        const ki = Number(k)
        if (ki < index) shifted[ki] = v
        else if (ki > index) shifted[ki - 1] = v
      }
      return shifted
    })
  }

  const validate = () => {
    const errs = {}
    players.forEach((p, i) => {
      if (!p.name.trim()) {
        errs[i] = t('setup.errors.nameRequired')
        return
      }
      const dupIdx = players.findIndex(
        (other, j) =>
          j !== i &&
          p.name.trim().localeCompare(other.name.trim(), undefined, { sensitivity: 'base' }) === 0
      )
      if (dupIdx !== -1) {
        errs[i] = t('setup.errors.nameDuplicate')
      }
    })
    return errs
  }

  const handleStart = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setExpandedIndex(Number(Object.keys(errs).sort((a, b) => Number(a) - Number(b))[0]))
      return
    }
    onStart(players.map((p) => ({ ...p, name: p.name.trim() })))
  }

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('setup.step1Title')}</h2>
        <p className={styles.stepHelper}>{t('setup.step1Helper')}</p>
      </div>

      <div className={styles.roster}>
        {players.map((player, index) => (
          <PlayerRow
            key={index}
            index={index}
            player={player}
            playerNumber={index + 1}
            isExpanded={expandedIndex === index}
            error={errors[index]}
            showRemove={!isCouples && index >= MIN_PLAYERS}
            onToggle={() => setExpandedIndex((prev) => (prev === index ? -1 : index))}
            onChange={(patch) => updatePlayer(index, patch)}
            onRemove={() => removePlayer(index)}
          />
        ))}
      </div>

      {canAdd && (
        <button type="button" className={styles.addBtn} onClick={addPlayer}>
          {t('setup.addPlayer')}
        </button>
      )}

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onBack} type="button">
          {t('setup.back')}
        </Button>
        <Button onClick={handleStart} type="button" className={styles.startBtn}>
          {t('setup.startButton')}
        </Button>
      </div>
    </div>
  )
}

RosterStep.propTypes = {
  mode: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onPlayersChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
}

function PlayerRow({
  player,
  playerNumber,
  isExpanded,
  error,
  showRemove,
  onToggle,
  onChange,
  onRemove,
}) {
  const { t } = useTranslation()
  const nameId = useId()
  const errorId = useId()

  return (
    <div className={[styles.row, isExpanded ? styles.rowExpanded : ''].join(' ')}>
      <button
        type="button"
        className={styles.rowHeader}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-label={player.name.trim() || t('setup.playerN', { n: playerNumber })}
      >
        <AvatarGlyph name={player.avatar} color={player.color} size="sm" />
        <span
          className={[styles.rowName, !player.name.trim() ? styles.rowNamePlaceholder : ''].join(
            ' '
          )}
          style={player.name.trim() ? { color: player.color } : undefined}
        >
          {player.name.trim() || t('setup.playerN', { n: playerNumber })}
        </span>
        {error && !isExpanded && (
          <span className={styles.rowErrorBadge} aria-hidden="true">
            !
          </span>
        )}
        <span className={styles.chevron} aria-hidden="true">
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      {isExpanded && (
        <div className={styles.rowBody}>
          <div className={styles.field}>
            <label htmlFor={nameId} className={styles.label}>
              {t('setup.nameLabel')}
            </label>
            <input
              id={nameId}
              type="text"
              value={player.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder={t('setup.namePlaceholder')}
              className={[styles.input, error ? styles.inputError : ''].join(' ')}
              aria-describedby={error ? errorId : undefined}
              aria-invalid={Boolean(error)}
              maxLength={30}
              autoFocus
            />
            {error && (
              <p id={errorId} className={styles.error} role="alert">
                {error}
              </p>
            )}
          </div>

          <div className={styles.pickerSection}>
            <p className={styles.pickerLabel}>{t('setup.avatarLabel')}</p>
            <AvatarPicker
              avatars={avatars}
              selected={player.avatar}
              onChange={(avatar) => onChange({ avatar })}
              accentColor={player.color}
            />
          </div>

          <div className={styles.pickerSection}>
            <p className={styles.pickerLabel}>{t('setup.colorLabel')}</p>
            <ColorPicker
              colors={colors}
              selected={player.color}
              onChange={(color) => onChange({ color })}
            />
          </div>

          {showRemove && (
            <button type="button" className={styles.removeBtn} onClick={onRemove}>
              {t('setup.removePlayer')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

PlayerRow.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  playerNumber: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  error: PropTypes.string,
  showRemove: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}
