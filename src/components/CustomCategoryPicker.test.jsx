import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import CustomCategoryPicker from './CustomCategoryPicker'

const COUNTS = { spark: 3, decadesTape: 1, absurdista: 0 }

function renderPicker(props = {}) {
  const onConfirm = vi.fn()
  render(
    <I18nextProvider i18n={i18n}>
      <CustomCategoryPicker
        defaultSelected={[]}
        onConfirm={onConfirm}
        confirmLabel="Save categories"
        counts={COUNTS}
        {...props}
      />
    </I18nextProvider>
  )
  return onConfirm
}

describe('CustomCategoryPicker', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('pre-ticks the previous selection', () => {
    renderPicker({ defaultSelected: ['spark', 'heat'] })
    expect(screen.getByRole('checkbox', { name: /the spark/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /the heat/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /the roots/i })).not.toBeChecked()
    expect(screen.getByText(/2 categories selected/i)).toBeInTheDocument()
  })

  it('disables confirm with nothing ticked and shows the reason', () => {
    renderPicker()
    const confirm = screen.getByRole('button', { name: /save categories/i })
    expect(confirm).toBeDisabled()
    expect(confirm).toHaveAccessibleDescription(/pick at least one category/i)
  })

  it('confirms with the edited selection', async () => {
    const user = userEvent.setup()
    const onConfirm = renderPicker({ defaultSelected: ['spark'] })
    await user.click(screen.getByRole('checkbox', { name: /the spark/i }))
    await user.click(screen.getByRole('checkbox', { name: /decades tape/i }))
    await user.click(screen.getByRole('button', { name: /save categories/i }))
    expect(onConfirm).toHaveBeenCalledWith(['decadesTape'])
  })

  it('shows counts, the timer badge and the music hint', () => {
    renderPicker()
    expect(screen.getByRole('checkbox', { name: /the spark.*3 questions/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /decades tape.*1 song.*by decade/i })).toBeVisible()
    expect(screen.getByRole('checkbox', { name: /absurdist.*90 s/i })).toBeInTheDocument()
  })

  it('renders a back button only when onBack is given', async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    renderPicker({ onBack })
    await user.click(screen.getByRole('button', { name: /back/i }))
    expect(onBack).toHaveBeenCalledOnce()
  })
})

describe('CustomCategoryPicker — exhausted categories', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('blocks saving when every ticked category has no questions left', async () => {
    const user = userEvent.setup()
    renderPicker({ defaultSelected: ['absurdista'] })

    expect(screen.getByRole('button', { name: 'Save categories' })).toBeDisabled()
    expect(screen.getByText(/no questions left/i)).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: /spark/i }))
    expect(screen.getByRole('button', { name: 'Save categories' })).toBeEnabled()
  })
})
