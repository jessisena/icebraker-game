import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { pushBackHandler, handleBack, useBackHandler } from './backHandler'

describe('handleBack', () => {
  it('returns false when nothing is registered', () => {
    expect(handleBack()).toBe(false)
  })

  it('asks the newest handler first and stops at the first that handles it', () => {
    const older = vi.fn(() => true)
    const newer = vi.fn(() => true)
    const offOlder = pushBackHandler(older)
    const offNewer = pushBackHandler(newer)

    expect(handleBack()).toBe(true)
    expect(newer).toHaveBeenCalledOnce()
    expect(older).not.toHaveBeenCalled()

    offNewer()
    offOlder()
  })

  it('falls through to older handlers that can still go back', () => {
    const older = vi.fn(() => true)
    const offOlder = pushBackHandler(older)
    const offNewer = pushBackHandler(() => false)

    expect(handleBack()).toBe(true)
    expect(older).toHaveBeenCalledOnce()

    offNewer()
    offOlder()
  })

  it('stops calling a handler once it is unregistered', () => {
    const fn = vi.fn(() => true)
    const off = pushBackHandler(fn)
    off()

    expect(handleBack()).toBe(false)
    expect(fn).not.toHaveBeenCalled()
  })
})

describe('useBackHandler', () => {
  it('uses the latest callback without re-registering, and unregisters on unmount', () => {
    const { rerender, unmount } = renderHook(({ fn }) => useBackHandler(fn), {
      initialProps: { fn: () => false },
    })
    const latest = vi.fn(() => true)
    rerender({ fn: latest })

    expect(handleBack()).toBe(true)
    expect(latest).toHaveBeenCalledOnce()

    unmount()
    expect(handleBack()).toBe(false)
  })
})
