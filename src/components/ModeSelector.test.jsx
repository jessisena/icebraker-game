import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import ModeSelector from './ModeSelector'

function renderSelector(props) {
  const onModeSelect = vi.fn()
  render(
    <I18nextProvider i18n={i18n}>
      <ModeSelector onModeSelect={onModeSelect} {...props} />
    </I18nextProvider>
  )
  return onModeSelect
}

describe('ModeSelector', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('disables Couples for more than 2 players but keeps Custom enabled', () => {
    renderSelector({ currentMode: 'friends', playerCount: 4 })
    expect(screen.getByRole('button', { name: /couple/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /custom/i })).not.toBeDisabled()
  })

  it('enables Couples for exactly 2 players', () => {
    renderSelector({ currentMode: 'friends', playerCount: 2 })
    expect(screen.getByRole('button', { name: /couple/i })).not.toBeDisabled()
  })

  it('reports Custom when its card is picked', async () => {
    const user = userEvent.setup()
    const onModeSelect = renderSelector({ currentMode: 'team', playerCount: 6 })
    await user.click(screen.getByRole('button', { name: /custom/i }))
    expect(onModeSelect).toHaveBeenCalledWith('custom')
  })

  it('marks the current mode as pressed', () => {
    renderSelector({ currentMode: 'custom', playerCount: 3 })
    expect(screen.getByRole('button', { name: /custom/i })).toHaveAttribute('aria-pressed', 'true')
  })
})
