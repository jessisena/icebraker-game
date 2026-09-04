import { useState, useId } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { avatars, colors } from '../../data/options'
import AvatarPicker from '../pickers/AvatarPicker'
import ColorPicker from '../pickers/ColorPicker'
import IdentityCard from './IdentityCard'
import Button from '../primitives/Button'
import styles from './PlayerStep.module.css'

export default function PlayerStep({ stepIndex, draft, otherName, onNext, onBack }) {
  const { t } = useTranslation()
  const nameId = useId()
  const errorId = useId()

  const [name, setName] = useState(draft.name)
  const [avatar, setAvatar] = useState(draft.avatar)
  const [color, setColor] = useState(draft.color)
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!name.trim()) {
      setError(t('setup.errors.nameRequired'))
      return
    }
    if (
      otherName &&
      name.trim().localeCompare(otherName.trim(), undefined, { sensitivity: 'base' }) === 0
    ) {
      setError(t('setup.errors.nameDuplicate'))
      return
    }
    setError('')
    onNext({ name: name.trim(), avatar, color })
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (error) setError('')
  }

  const title = stepIndex === 0 ? t('setup.step0Title') : t('setup.step1Title')
  const helper = stepIndex === 0 ? t('setup.step0Helper') : t('setup.step1Helper')

  return (
    <div className={styles.step}>
      <div className={styles.preview}>
        <IdentityCard name={name} avatar={avatar} color={color} />
      </div>

      <div className={styles.form}>
        <div className={styles.stepHeader}>
          <h2 className={styles.stepTitle}>{title}</h2>
          <p className={styles.stepHelper}>{helper}</p>
        </div>

        <div className={styles.field}>
          <label htmlFor={nameId} className={styles.label}>
            {t('setup.nameLabel')}
          </label>
          <input
            id={nameId}
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder={t('setup.namePlaceholder')}
            className={[styles.input, error ? styles.inputError : ''].join(' ')}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={Boolean(error)}
            autoFocus={stepIndex === 0}
            maxLength={30}
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
            selected={avatar}
            onChange={setAvatar}
            accentColor={color}
          />
        </div>

        <div className={styles.pickerSection}>
          <p className={styles.pickerLabel}>{t('setup.colorLabel')}</p>
          <ColorPicker colors={colors} selected={color} onChange={setColor} />
        </div>

        <div className={styles.actions}>
          {stepIndex > 0 && (
            <Button variant="ghost" onClick={onBack} type="button">
              {t('setup.back')}
            </Button>
          )}
          <Button onClick={handleNext} type="button" className={styles.nextBtn}>
            {t('setup.next')}
          </Button>
        </div>
      </div>
    </div>
  )
}

PlayerStep.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  draft: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  otherName: PropTypes.string,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func,
}
