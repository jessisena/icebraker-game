import { render, screen } from '@testing-library/react'
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

// Helpers to navigate the 2-step flow
async function pickMode(user, modeLabel = /couple/i) {
  await user.click(screen.getByRole('button', { name: modeLabel }))
  await user.click(screen.getByRole('button', { name: /next/i }))
  await screen.findByText(/step 2 of 2/i)
}

// Fill in the currently-expanded row's name input
async function fillExpandedName(user, name) {
  const input = screen.getByLabelText(/your name/i)
  await user.clear(input)
  await user.type(input, name)
}

// Expand a row by clicking its toggle (identified by aria-label matching player placeholder)
async function expandRow(user, n) {
  await user.click(screen.getByRole('button', { name: new RegExp(`player ${n}`, 'i') }))
}

describe('Onboarding — step 1: mode selection', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('renders the mode step first (step 1 of 2)', () => {
    renderOnboarding()
    expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /couple/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /friends/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /team/i })).toBeInTheDocument()
  })

  it('shows the player count badge on each mode card', () => {
    renderOnboarding()
    expect(screen.getByText(/2 players/i)).toBeInTheDocument()
    expect(screen.getAllByText(/2–6 players/i)).toHaveLength(3)
  })

  it('Next is disabled until a mode is selected', () => {
    renderOnboarding()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

  it('Next becomes enabled after selecting a mode', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.click(screen.getByRole('button', { name: /friends/i }))
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled()
  })

  it('advances to step 2 after selecting a mode and clicking Next', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.click(screen.getByRole('button', { name: /couple/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(await screen.findByText(/step 2 of 2/i)).toBeInTheDocument()
  })

  it('back from step 2 returns to step 1 via progress rail', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await user.click(screen.getByRole('button', { name: /friends/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 2 of 2/i)
    // First segment (step 1) is clickable now
    const segments = screen.getAllByRole('button', { name: /step 1 of 2/i })
    await user.click(segments[0])
    expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument()
  })
})

describe('Onboarding — step 2: roster (Couples)', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('shows exactly 2 player rows for Couples mode', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)
    // The first row is expanded; the second is collapsed
    // Both aria-labels match "Player N" or the current name
    const rowHeaders = screen.getAllByRole('button', { name: /player [12]/i })
    expect(rowHeaders).toHaveLength(2)
  })

  it('does not show Add player button in Couples mode', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)
    expect(screen.queryByRole('button', { name: /add player/i })).not.toBeInTheDocument()
  })

  it('does not show Remove player button in Couples mode', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)
    expect(screen.queryByRole('button', { name: /remove player/i })).not.toBeInTheDocument()
  })
})

describe('Onboarding — step 2: roster (Friends)', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('starts with 2 rows and an Add player button', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /friends/i)
    expect(screen.getByRole('button', { name: /add player/i })).toBeInTheDocument()
  })

  it('adds a third player row on clicking Add player', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /friends/i)
    await user.click(screen.getByRole('button', { name: /add player/i }))
    // Now 3 rows; third expands automatically
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /player [123]/i })).toHaveLength(3)
  })

  it('hides Add player button at 6 players', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /friends/i)
    // Add 4 more to reach 6
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole('button', { name: /add player/i }))
    }
    expect(screen.queryByRole('button', { name: /add player/i })).not.toBeInTheDocument()
  })

  it('shows Remove player only from the 3rd row onward', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /friends/i)
    await user.click(screen.getByRole('button', { name: /add player/i }))
    // 3rd row is now expanded and has Remove button
    expect(screen.getByRole('button', { name: /remove player/i })).toBeInTheDocument()
  })

  it('removes a player row when Remove is clicked', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /friends/i)
    await user.click(screen.getByRole('button', { name: /add player/i }))
    const removeBtn = screen.getByRole('button', { name: /remove player/i })
    await user.click(removeBtn)
    expect(screen.queryByRole('button', { name: /player 3/i })).not.toBeInTheDocument()
  })
})

describe('Onboarding — validation', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('blocks start when a name is empty and shows inline error', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)
    // Player 1 is expanded; leave name empty
    await user.click(screen.getByRole('button', { name: /let's play/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/enter a name/i)
  })

  it('clears the error as soon as the user types', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)
    await user.click(screen.getByRole('button', { name: /let's play/i }))
    await screen.findByRole('alert')
    await user.type(screen.getByLabelText(/your name/i), 'A')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('blocks start on duplicate names (case-insensitive) and shows error', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)
    // Fill player 1
    await fillExpandedName(user, 'Alice')
    // Expand player 2
    await expandRow(user, 2)
    await fillExpandedName(user, 'alice')
    await user.click(screen.getByRole('button', { name: /let's play/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/different names/i)
  })
})

describe('Onboarding — happy path', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('calls onComplete with { players, mode } and trimmed names', async () => {
    const onComplete = vi.fn()
    const user = userEvent.setup()
    render(
      <I18nextProvider i18n={i18n}>
        <Onboarding onComplete={onComplete} />
      </I18nextProvider>
    )

    // Step 1: pick Friends mode
    await user.click(screen.getByRole('button', { name: /friends/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 2 of 2/i)

    // Step 2: fill player 1 name (expanded by default)
    await fillExpandedName(user, '  Alice  ')

    // Expand player 2
    await expandRow(user, 2)
    await fillExpandedName(user, '  Bob  ')

    await user.click(screen.getByRole('button', { name: /let's play/i }))

    expect(onComplete).toHaveBeenCalledOnce()
    const arg = onComplete.mock.calls[0][0]
    expect(arg.mode).toBe('friends')
    expect(arg.players).toHaveLength(2)
    expect(arg.players[0].name).toBe('Alice')
    expect(arg.players[1].name).toBe('Bob')
    expect(arg.players[0].avatar).toBeTruthy()
    expect(arg.players[0].color).toBeTruthy()
  })

  it('calls onComplete with 4 players in friends mode', async () => {
    const onComplete = vi.fn()
    const user = userEvent.setup()
    render(
      <I18nextProvider i18n={i18n}>
        <Onboarding onComplete={onComplete} />
      </I18nextProvider>
    )

    // Mode step
    await user.click(screen.getByRole('button', { name: /friends/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 2 of 2/i)

    const names = ['Alpha', 'Bravo', 'Charlie', 'Delta']

    // Fill player 1 (already expanded)
    await fillExpandedName(user, names[0])

    for (let i = 1; i < names.length; i++) {
      if (i >= 2) {
        // Need to add the row first
        await user.click(screen.getByRole('button', { name: /add player/i }))
      } else {
        await expandRow(user, i + 1)
      }
      await fillExpandedName(user, names[i])
    }

    await user.click(screen.getByRole('button', { name: /let's play/i }))

    expect(onComplete).toHaveBeenCalledOnce()
    const { players, mode } = onComplete.mock.calls[0][0]
    expect(mode).toBe('friends')
    expect(players).toHaveLength(4)
    expect(players.map((p) => p.name)).toEqual(names)
  })
})

describe('Onboarding — custom mode', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  async function pickCustom(user) {
    await user.click(screen.getByRole('button', { name: /custom/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 2 of 3/i)
  }

  async function fillTwoPlayers(user) {
    await fillExpandedName(user, 'Alice')
    await expandRow(user, 2)
    await fillExpandedName(user, 'Bob')
  }

  it('skips the category step for non-custom modes', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /team/i)
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  })

  it('shows all 9 categories as checkboxes after picking Custom', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickCustom(user)
    expect(screen.getAllByRole('checkbox')).toHaveLength(9)
    expect(screen.getByRole('checkbox', { name: /the heat/i })).not.toBeChecked()
  })

  it('disables Next with no categories ticked and explains why', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickCustom(user)
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
    expect(screen.getByText(/pick at least one category/i)).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: /the heat/i }))
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled()

    await user.click(screen.getByRole('checkbox', { name: /the heat/i }))
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

  it('toggles a category with the keyboard', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickCustom(user)
    const spark = screen.getByRole('checkbox', { name: /the spark/i })
    spark.focus()
    await user.keyboard(' ')
    expect(spark).toBeChecked()
  })

  it('back from roster returns to categories with the selection kept', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickCustom(user)
    await user.click(screen.getByRole('checkbox', { name: /the mirror/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 3 of 3/i)

    await user.click(screen.getByRole('button', { name: /back/i }))
    expect(await screen.findByText(/step 2 of 3/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /the mirror/i })).toBeChecked()
  })

  it('calls onComplete with the custom categories', async () => {
    const onComplete = vi.fn()
    const user = userEvent.setup()
    renderOnboarding(onComplete)
    await pickCustom(user)
    await user.click(screen.getByRole('checkbox', { name: /the heat/i }))
    await user.click(screen.getByRole('checkbox', { name: /the dilemma/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    await screen.findByText(/step 3 of 3/i)

    await fillTwoPlayers(user)
    await user.click(screen.getByRole('button', { name: /let's play/i }))

    expect(onComplete).toHaveBeenCalledOnce()
    const { mode, customCategories } = onComplete.mock.calls[0][0]
    expect(mode).toBe('custom')
    expect(customCategories).toEqual(['heat', 'dilemma'])
  })

  it('sends an empty selection when switching away from Custom', async () => {
    const onComplete = vi.fn()
    const user = userEvent.setup()
    renderOnboarding(onComplete)
    await pickCustom(user)
    await user.click(screen.getByRole('checkbox', { name: /the heat/i }))
    await user.click(screen.getByRole('button', { name: /back/i }))
    await pickMode(user, /friends/i)

    await fillTwoPlayers(user)
    await user.click(screen.getByRole('button', { name: /let's play/i }))

    const { mode, customCategories } = onComplete.mock.calls[0][0]
    expect(mode).toBe('friends')
    expect(customCategories).toEqual([])
  })
})

describe('Onboarding — identity picker (cards and colors)', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it("does not let a player pick another player's card", async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)

    const takenCard = screen.getByRole('radio', { name: 'The Key, taken by Player 2' })
    expect(takenCard).toHaveAttribute('aria-disabled', 'true')
    await user.click(takenCard)

    expect(takenCard).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'The Eye' })).toBeChecked()
  })

  it("does not let a player pick another player's color", async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)

    const takenSwatch = screen.getByRole('radio', { name: 'Turquoise, taken by Player 2' })
    expect(takenSwatch).toHaveAttribute('aria-disabled', 'true')
    await user.click(takenSwatch)

    expect(takenSwatch).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Garnet' })).toBeChecked()
  })

  it('names the owner of a taken card once they have typed a name', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)
    await expandRow(user, 2)
    await fillExpandedName(user, '  Leo ')
    await expandRow(user, 1)

    expect(screen.getByRole('radio', { name: 'The Key, taken by Leo' })).toBeInTheDocument()
  })

  it('skips taken cards when moving with the arrow keys', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)

    await user.click(screen.getByRole('radio', { name: 'The Eye' }))
    await user.keyboard('{ArrowRight}')
    const hand = screen.getByRole('radio', { name: 'The Hand' })
    expect(hand).toBeChecked()
    expect(hand).toHaveFocus()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('radio', { name: 'The Eye' })).toBeChecked()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('radio', { name: 'The Moon' })).toBeChecked()
  })

  it('skips taken colors when moving with the arrow keys', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /couple/i)

    await user.click(screen.getByRole('radio', { name: 'Jade' }))
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Amethyst' })).toBeChecked()
  })

  it('gives a newly added player the first free card and color', async () => {
    const user = userEvent.setup()
    renderOnboarding()
    await pickMode(user, /friends/i)

    await user.click(screen.getByRole('radio', { name: 'The Hand' }))
    await user.click(screen.getByRole('radio', { name: 'Saffron' }))
    await user.click(screen.getByRole('button', { name: /add player/i }))

    expect(screen.getByRole('radio', { name: 'The Eye' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Garnet' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'The Hand, taken by Player 1' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Saffron, taken by Player 1' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'The Key, taken by Player 2' })).toBeInTheDocument()
  })
})
