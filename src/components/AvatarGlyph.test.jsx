import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AvatarGlyph from './AvatarGlyph'

const IDS = ['eye', 'key', 'hand', 'wheel', 'crown', 'moon']

describe('AvatarGlyph', () => {
  it.each(IDS)('renders drawn content for %s', (name) => {
    const { container } = render(<AvatarGlyph name={name} color="#e0525e" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100')
    expect(svg).toHaveStyle({ color: '#e0525e' })
    expect(svg.querySelectorAll('path, circle').length).toBeGreaterThan(0)
  })

  it('gives each glyph a distinct drawing', () => {
    const markups = IDS.map(
      (id) => render(<AvatarGlyph name={id} color="#fff" />).container.innerHTML
    )
    expect(new Set(markups).size).toBe(IDS.length)
  })

  it('falls back to the moon for an unknown name', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const unknown = render(<AvatarGlyph name="nope" color="#fff" />).container.innerHTML
    const moon = render(<AvatarGlyph name="moon" color="#fff" />).container.innerHTML
    consoleError.mockRestore()
    expect(unknown).toBe(moon)
  })
})
