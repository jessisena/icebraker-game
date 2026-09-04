import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Button from './primitives/Button'

export default function PrefsToggles({ onLangToggle, themeMode, onThemeToggle }) {
  const { t } = useTranslation()

  return (
    <>
      <Button variant="ghost" onClick={onLangToggle} type="button">
        {t('game.langSwitch')}
      </Button>
      <Button
        variant="ghost"
        onClick={onThemeToggle}
        type="button"
        title={themeMode === 'dark' ? t('game.themeLight') : t('game.themeDark')}
      >
        {themeMode === 'dark' ? '☀' : '🌙'}
      </Button>
    </>
  )
}

PrefsToggles.propTypes = {
  onLangToggle: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
  onThemeToggle: PropTypes.func.isRequired,
}
