import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// The Android WebView serves the build from its own root, so it needs relative asset paths
export default defineConfig(({ mode }) => ({
  base: mode === 'android' ? './' : '/icebraker-game/',
  plugins: [react()],
}))
