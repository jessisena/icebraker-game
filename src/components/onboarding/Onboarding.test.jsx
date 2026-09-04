import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n'
import Onboarding from './Onboarding'

function renderOnboarding(onComplete = vi.fn()) {
  return render(
    <I18nextProvider i18n={i18n}>
      <Onboarding onComplete={onComplete} />
    </I18nextProvider>
  )
}

describe('Onboarding flow', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('renders step 1 of 3 initially', () => {
    renderOnboarding()
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  })

  it('blocks advancing when name is empty and shows error', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/enter a name/i)
    // Still on step 1
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()
  })

  it('clears the error as soon as the user types', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByRole('alert')
    await user.type(screen.getByLabelText(/your name/i), 'A')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('advances to step 2 after entering player 1 name', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.type(screen.getByLabelText(/your name/i), 'Alice')
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(await screen.findByText(/step 2 of 3/i)).toBeInTheDocument()
  })

  it('blocks duplicate name (case-insensitive) on step 2', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    // Step 1
    await user.type(screen.getByLabelText(/your name/i), 'Alice')
    await user.click(screen.getByRole('button', { name: /next/i }))
    // Step 2
    await screen.findByText(/step 2 of 3/i)
    await user.type(screen.getByLabelText(/your name/i), 'alice')
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/different names/i)
    expect(screen.getByText(/step 2 of 3/i)).toBeInTheDocument()
  })

  it('back from step 2 returns to step 1 preserving values', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.type(screen.getByLabelText(/your name/i), 'Alice')
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 2 of 3/i)
    await user.click(screen.getByRole('button', { name: /back/i }))
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your name/i)).toHaveValue('Alice')
  })

  it('can navigate back from step 2 via the progress rail', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.type(screen.getByLabelText(/your name/i), 'Alice')
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 2 of 3/i)
    // First segment (step 1) should be clickable now
    const segments = screen.getAllByRole('button', { name: /step 1 of 3/i })
    await user.click(segments[0])
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()
  })

  it('advances to step 3 after entering player 2 name', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.type(screen.getByLabelText(/your name/i), 'Alice')
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 2 of 3/i)
    await user.type(screen.getByLabelText(/your name/i), 'Bob')
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(await screen.findByText(/step 3 of 3/i)).toBeInTheDocument()
  })

  it('start button is disabled until a mode is selected', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.type(screen.getByLabelText(/your name/i), 'Alice')
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 2 of 3/i)
    await user.type(screen.getByLabelText(/your name/i), 'Bob')
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 3 of 3/i)
    expect(screen.getByRole('button', { name: /let's play/i })).toBeDisabled()
  })

  it('full happy path calls onComplete with trimmed names, avatar, color, mode', async () => {
    const onComplete = vi.fn()
    const user = userEvent.setup()
    render(
      <I18nextProvider i18n={i18n}>
        <Onboarding onComplete={onComplete} />
      </I18nextProvider>
    )
    // Step 1
    await user.type(screen.getByLabelText(/your name/i), '  Alice  ')
    await user.click(screen.getByRole('button', { name: /next/i }))
    // Step 2
    await screen.findByText(/step 2 of 3/i)
    await user.type(screen.getByLabelText(/your name/i), '  Bob  ')
    await user.click(screen.getByRole('button', { name: /next/i }))
    // Step 3 — pick a mode
    await screen.findByText(/step 3 of 3/i)
    await user.click(screen.getByRole('button', { name: /couple/i }))
    await user.click(screen.getByRole('button', { name: /let's play/i }))

    expect(onComplete).toHaveBeenCalledOnce()
    const arg = onComplete.mock.calls[0][0]
    expect(arg.player1.name).toBe('Alice')
    expect(arg.player2.name).toBe('Bob')
    expect(arg.player1.avatar).toBeTruthy()
    expect(arg.player1.color).toBeTruthy()
    expect(arg.mode).toBe('couples')
  })

  it('avatar picker changes active avatar on arrow key navigation', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    // Tab into the radiogroup and use arrow keys
    const nameInput = screen.getByLabelText(/your name/i)
    await user.type(nameInput, 'Alice')
    // Focus the first avatar radio
    const avatarGroup = screen.getByRole('radiogroup', { name: /avatar/i })
    const radios = within(avatarGroup).getAllByRole('radio')
    radios[0].focus()
    await user.keyboard('{ArrowRight}')
    // Second radio should now be checked
    expect(radios[1]).toHaveAttribute('aria-checked', 'true')
  })
})
