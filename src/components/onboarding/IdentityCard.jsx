import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import AvatarGlyph from '../AvatarGlyph'
import styles from './IdentityCard.module.css'

export default function IdentityCard({ name, avatar, color, placeholder }) {
  const { t } = useTranslation()
  const displayName = name.trim() || placeholder || t('setup.namePlaceholder')
  const hasName = Boolean(name.trim())

  return (
    <div className={styles.card}>
      {/* Colour glow ring behind the avatar */}
      <div className={styles.glowRing} style={{ '--glow-color': color }} aria-hidden="true" />
      <div className={styles.avatarWrap}>
        <AvatarGlyph name={avatar} color={color} size="lg" />
      </div>
      <p className={[styles.name, hasName ? '' : styles.namePlaceholder].join(' ')}>
        {displayName}
      </p>
    </div>
  )
}

IdentityCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}
