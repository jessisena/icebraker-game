/* The only module that talks to Capacitor. Every export is a no-op in the browser. */
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'

const isNative = () => Capacitor.isNativePlatform()

const warnOnFailure = (action) => (e) => console.warn(`native: ${action} failed:`, e)

/**
 * Listen for the Android hardware back button.
 *
 * @param {() => void} onBack - Called on every press.
 * @returns {() => void} Removes the listener.
 */
export function onBackButton(onBack) {
  if (!isNative()) return () => {}
  const handle = App.addListener('backButton', onBack)
  return () => {
    handle.then((h) => h.remove()).catch(warnOnFailure('removing back listener'))
  }
}

export function exitApp() {
  if (isNative()) App.exitApp().catch(warnOnFailure('exiting the app'))
}

/* Light tick for taps that move the game forward */
export function tap() {
  if (isNative()) Haptics.impact({ style: ImpactStyle.Light }).catch(warnOnFailure('haptic tap'))
}

/* Stronger pulse when something needs attention, e.g. the timer running out */
export function buzz() {
  if (isNative()) {
    Haptics.notification({ type: NotificationType.Warning }).catch(warnOnFailure('haptic buzz'))
  }
}
