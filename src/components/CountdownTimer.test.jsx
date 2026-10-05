import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import CountdownTimer from './CountdownTimer'

function renderTimer(lang) {
  i18n.changeLanguage(lang)
  render(
    <I18nextProvider i18n={i18n}>
      <CountdownTimer seconds={30} onComplete={() => {}} />
    </I18nextProvider>
  )
}

describe('CountdownTimer', () => {
  it('labels the countdown in English', () => {
    renderTimer('en')
    expect(screen.getByText('Seconds')).toBeInTheDocument()
    expect(screen.queryByText('Segundos')).not.toBeInTheDocument()
  })

  it('labels the countdown in Spanish', () => {
    renderTimer('es')
    expect(screen.getByText('Segundos')).toBeInTheDocument()
  })
})
