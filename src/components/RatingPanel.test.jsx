import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import RatingPanel from './RatingPanel'

const RATERS = [
  { name: 'Bob', color: '#3fc1d4' },
  { name: 'Carol', color: '#42b48f' },
]

function renderPanel({ categoryKey = 'spark', submitRating = vi.fn(), raters = RATERS } = {}) {
  render(
    <I18nextProvider i18n={i18n}>
      <RatingPanel
        playerWhoAnswered="Alice"
        raters={raters}
        submitRating={submitRating}
        categoryKey={categoryKey}
      />
    </I18nextProvider>
  )
  return submitRating
}

describe('RatingPanel', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('renders exactly three vote buttons', () => {
    renderPanel()

    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it.each([
    ['good', /^good/i, 2],
    ['neutral', /^neutral/i, 1],
    ['bad', /^bad/i, 0],
  ])('submits %s as the vote value', async (_, name, value) => {
    const user = userEvent.setup()
    const submitRating = renderPanel()

    await user.click(screen.getByRole('button', { name }))

    expect(submitRating).toHaveBeenCalledOnce()
    expect(submitRating).toHaveBeenCalledWith(value)
  })

  it('shows music trivia hints on each button', () => {
    renderPanel({ categoryKey: 'decadesTape' })

    expect(screen.getByRole('button', { name: /good.*artist and title/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /neutral.*only one of them/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /bad.*neither/i })).toBeInTheDocument()
  })

  it('shows connection hints for atlas of me', () => {
    renderPanel({ categoryKey: 'atlasOfMe' })

    expect(screen.getByRole('button', { name: /good.*strong connection/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /neutral.*light connection/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /bad.*no connection/i })).toBeInTheDocument()
  })

  it('shows no hints for standard categories', () => {
    renderPanel({ categoryKey: 'spark' })

    expect(screen.getByRole('button', { name: 'Good' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Neutral' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bad' })).toBeInTheDocument()
  })

  it('addresses all raters with the category criteria', () => {
    renderPanel({ categoryKey: 'atlasOfMe' })

    expect(screen.getByText(/^Bob and Carol, rate how strong the connection/)).toBeInTheDocument()
  })

  it('uses Spanish labels when the language is Spanish', async () => {
    await i18n.changeLanguage('es')
    renderPanel({ raters: [{ name: 'Bob', color: '#3fc1d4' }] })

    expect(screen.getByRole('button', { name: 'Buena' })).toBeInTheDocument()
    expect(screen.getByText(/^Bob, ¿cómo calificarías/)).toBeInTheDocument()
  })
})
