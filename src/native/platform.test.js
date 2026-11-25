import { describe, it, expect, vi, beforeEach } from 'vitest'

const native = { value: true }
const removeListener = vi.fn()

vi.mock('@capacitor/core', () => ({
  Capacitor: { isNativePlatform: () => native.value },
}))
vi.mock('@capacitor/app', () => ({
  App: {
    addListener: vi.fn(() => Promise.resolve({ remove: removeListener })),
    exitApp: vi.fn(() => Promise.resolve()),
  },
}))
vi.mock('@capacitor/haptics', () => ({
  Haptics: {
    impact: vi.fn(() => Promise.resolve()),
    notification: vi.fn(() => Promise.resolve()),
  },
  ImpactStyle: { Light: 'LIGHT' },
  NotificationType: { Warning: 'WARNING' },
}))

const { App } = await import('@capacitor/app')
const { Haptics } = await import('@capacitor/haptics')
const { onBackButton, exitApp, tap, buzz } = await import('./platform')

describe('native platform', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    native.value = true
  })

  it('forwards back presses and removes the listener on cleanup', async () => {
    const onBack = vi.fn()
    const cleanup = onBackButton(onBack)

    const [event, handler] = App.addListener.mock.calls[0]
    expect(event).toBe('backButton')
    handler()
    expect(onBack).toHaveBeenCalledOnce()

    cleanup()
    await vi.waitFor(() => expect(removeListener).toHaveBeenCalledOnce())
  })

  it('exits and fires haptics on a device', () => {
    exitApp()
    tap()
    buzz()

    expect(App.exitApp).toHaveBeenCalledOnce()
    expect(Haptics.impact).toHaveBeenCalledWith({ style: 'LIGHT' })
    expect(Haptics.notification).toHaveBeenCalledWith({ type: 'WARNING' })
  })

  it('does nothing in the browser', () => {
    native.value = false

    onBackButton(vi.fn())()
    exitApp()
    tap()
    buzz()

    expect(App.addListener).not.toHaveBeenCalled()
    expect(App.exitApp).not.toHaveBeenCalled()
    expect(Haptics.impact).not.toHaveBeenCalled()
    expect(Haptics.notification).not.toHaveBeenCalled()
  })

  it('warns instead of throwing when a native call fails', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    Haptics.impact.mockRejectedValueOnce(new Error('no vibrator'))

    tap()

    await vi.waitFor(() =>
      expect(warn).toHaveBeenCalledWith('native: haptic tap failed:', expect.any(Error))
    )
    warn.mockRestore()
  })
})
