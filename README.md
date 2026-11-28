# Preguntados

A 2–6 player question game built with React 19 + Vite. Players take turns answering randomised questions
from themed categories; the rest of the group rates the response by consensus.

**Live:** https://jessisena.github.io/icebraker-game/

## How it works

1. **Pick a mode** — Couples (2 players), Friends, or Team
2. **Set up the roster** — 2–6 players, each with a name, avatar, and colour
3. **Take turns** — the active player picks a category, reads the question, and answers
4. **Rate** — all other players agree on a score (one tap); turn passes round-robin
5. **Leaderboard** — players ranked by total points (Good 2 / Neutral 1 / Bad 0)

## Categories

Nine themed categories including personal questions, philosophical dilemmas, creative challenges,
music trivia, and more — spanning over 245 questions and 115 songs.

## Tech stack

- React 19 · Vite 6
- CSS Modules + CSS custom properties (design-token driven)
- `react-i18next` — Spanish and English UI
- No backend — all state in `localStorage`
- Vitest + React Testing Library

## Local development

```bash
npm install
npm run dev            # Start dev server
npm run lint           # ESLint (zero warnings policy)
npm run test           # Vitest
npm run build          # Production build (target ≤120 KB gzip)
npm run preview        # Preview production build
npm run format         # Prettier
npm run format:check   # Check formatting (CI)
```

## Android app

The same build is wrapped as an Android app with [Capacitor](https://capacitorjs.com/) (`android/`).
APKs are built locally and shared by hand; there is no Play Store listing. The app works offline and
adds the hardware back button, haptics, keep-screen-on, and a launcher icon and splash.

### Prerequisites

- **Android SDK.** Install with `brew install --cask android-commandlinetools` or Android Studio,
  then set `ANDROID_HOME` (for Homebrew: `/opt/homebrew/share/android-commandlinetools`). Gradle
  downloads the missing platform and build-tools on the first build.
- **JDK 21** for Gradle: `export JAVA_HOME=$(/usr/libexec/java_home -v 21)`.

### Developing

```bash
npm run build:android   # Web build with relative paths + copy into android/
npm run android:open    # Open in Android Studio (optional)
cd android && ./gradlew installDebug   # Install a debug build on a running emulator or phone
```

Debug builds allow WebView inspection from `chrome://inspect`.

### Building the Android APK

Release APKs must always be signed with the **same key**. Android only installs an update over an
existing app if the signatures match, so a new key would force friends to uninstall, which also
deletes their saved game.

1. Create the key once and keep it outside the repo:

   ```bash
   mkdir -p ~/.android-keys
   keytool -genkeypair -storetype PKCS12 -keystore ~/.android-keys/icebraker.jks \
     -alias icebraker -keyalg RSA -keysize 4096 -validity 10000
   ```

2. Add the signing settings to `~/.gradle/gradle.properties` (never to the repo):

   ```properties
   ICEBRAKER_KEYSTORE=~/.android-keys/icebraker.jks
   ICEBRAKER_KEYSTORE_PASSWORD=...
   ICEBRAKER_KEY_ALIAS=icebraker
   ICEBRAKER_KEY_PASSWORD=...
   ```

3. **Back up** the `.jks` file and both passwords, for example in a password manager.

4. For each release, bump `versionCode` (and `versionName`) in `android/app/build.gradle`, then:

   ```bash
   npm run apk
   # → android/app/build/outputs/apk/release/app-release.apk
   ```

If the signing settings are missing, the release build stops with a message saying which ones.

### Installing on a phone

Send the `app-release.apk` file (messaging app, cloud drive or USB). Open it on the phone, allow
"Install unknown apps" for the app you opened it from when Android asks, then tap **Install**.
Installing a newer APK later updates the app and keeps the saved game.

## Project docs

| Document | Contents |
|---|---|
| `docs/redesign-plan.md` | Original full redesign specification |
| `docs/PROGRESS.md` | Phase-by-phase delivery log |
| `docs/decisions.md` | Architecture Decision Records |
| `docs/design-system.md` | Design tokens, palette, component conventions |
| `docs/implementation-plan-multiplayer.md` | Multiplayer (2–6 player) implementation plan |

## License

MIT © 2026 Jessica Sena
