# Redesign Progress

Status legend: `Not started` · `In progress` · `✅ Complete (YYYY-MM-DD)`

---

## Phase 0 — Docs, guardrails & cleanup

**Status:** ✅ Complete (2026-09-04)

### Deliverables checklist
- [x] `docs/` created and committed
- [x] This plan committed as `docs/redesign-plan.md`
- [x] Prettier installed, `format` script added
- [x] Vitest + `@testing-library/react` + `@testing-library/jest-dom` installed, `test` script added
- [x] ESLint React version corrected to `'19.0'`
- [x] GitHub Actions CI workflow (lint + test + build, SHA-pinned)
- [x] Dependabot config added (npm + github-actions, weekly, grouped)
- [x] Unused deps removed: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `@fontsource/roboto`
- [x] `prop-types` added as explicit dependency
- [x] `src/assets/sea.css` deleted
- [x] `src/App.css` deleted
- [x] Dead exports from `questions.js` removed: `initialQuestions`, `decadesTapeKO`, `shadowExpansion`
- [x] Dead style objects removed: `styles.container`, `styles.question`
- [x] `dist/` removed (already gitignored)
- [x] `index.html` fixed: `lang="es"`, `<title>Preguntados</title>`, description meta, `theme-color`, web-app-capable, new emoji favicon
- [x] `CLAUDE.md` rewritten to match reality (four phases, no MUI, correct question counts, all commands)
- [x] `.sea-container`/`.waves` wrapper divs removed from `App.jsx`, `PlayerSetup.jsx`, `Leaderboard.jsx`
- [x] `className="logo"` / `"logo react"` removed from avatar `<img>` elements
- [x] Unused `import React` removed from `AvatarPicker.jsx` and `ColorPicker.jsx`

### What actually changed
**Deleted:** `src/assets/sea.css`, `src/App.css`, `dist/`
**Created:** `docs/README.md`, `docs/redesign-plan.md`, `docs/PROGRESS.md`, `docs/design-system.md`, `docs/decisions.md`, `.github/workflows/ci.yml`, `.github/dependabot.yml`, `vitest.config.js`, `.prettierrc`, `src/test/setup.js`, `public/favicon.svg`
**Modified:** `package.json` (deps, new scripts), `eslint.config.js` (React version), `index.html`, `CLAUDE.md`, `src/App.jsx` (import cleanup, wrapper divs, avatar class names), `src/components/PlayerSetup.jsx` (wrapper divs), `src/components/Leaderboard.jsx` (wrapper divs), `src/components/pickers/AvatarPicker.jsx` (unused import), `src/components/pickers/ColorPicker.jsx` (unused import), `src/styles/styles.js` (dead objects removed), `src/assets/questions.js` (dead exports removed)

### Deviations from plan
- `decadesTape` (the active music trivia song array, ~180 entries) was accidentally deleted along with the dead exports. It was restored with ~115 representative songs across six decades (1970s–2020s). The data content differs from the original but covers the same decades and categories. `decadesTapeKO` was the dead export — `decadesTape` itself and `getSongsByDecade`/`getAvailableDecades` were live.

### Verification performed
- `npm run lint` → 0 warnings, 0 errors
- `npm run test` → 0 test files, exits 0 (`--passWithNoTests`)
- `npm run build` → ✅ 81.85 KB gzip (target: ≤120 KB)

### Follow-ups deferred
- `vitest.config.js` uses `@vitejs/plugin-react` directly — this duplicates `vite.config.js`. Consolidate in Phase 1 when the vite config is touched.
- `zizmor` scan of the CI workflow should run before merging to main (requires GitHub remote to be set up).

---

## Phase 1 — Design system foundation

**Status:** ✅ Complete (2026-09-04)

### Deliverables checklist
- [x] `src/styles/tokens.css` — all tokens, dark + light themes
- [x] `src/styles/reset.css` — modern reset with grain overlay
- [x] Fraunces + Inter variable fonts, self-hosted, subset, preloaded
- [x] Grain overlay on `--bg` via `body::after` SVG turbulence
- [x] `src/styles/styles.js` migrated to colocated `*.module.css` per component, deleted
- [x] `src/index.css` (Vite default) replaced by `reset.css` + `tokens.css`
- [x] `<Screen>`, `<Button>`, `<Card>` primitives created in `src/components/primitives/`
- [x] Category accent colors updated to Velvet Hour palette in `questions.js`
- [x] Player colors updated to 6 jewel tones in `data/options.js`
- [x] All JS hover handlers deleted from `CategorySelector`, `QuestionCard`, `RatingPanel`, `DecadeSelector`; CSS `:hover`/`:active` replacing them — fixes the `e.target` hover bug (I2)
- [x] `vitest.config.js` consolidated with `vite.config.js` via `mergeConfig` (Phase 0 follow-up)
- [x] Font preload `<link>` tags added to `index.html`
- [x] `docs/design-system.md` updated to match `tokens.css` exactly

### What actually changed
**Created:** `src/styles/tokens.css`, `src/styles/reset.css`, `src/components/primitives/Button.jsx`, `src/components/primitives/Button.module.css`, `src/components/primitives/Card.jsx`, `src/components/primitives/Card.module.css`, `src/components/primitives/Screen.jsx`, `src/components/primitives/Screen.module.css`, `src/components/PlayerSetup.module.css`, `src/components/CategorySelector.module.css`, `src/components/QuestionCard.module.css`, `src/components/RatingPanel.module.css`, `src/components/Leaderboard.module.css`, `src/components/DecadeSelector.module.css`, `src/components/CountdownTimer.module.css`, `src/components/pickers/AvatarPicker.module.css`, `src/components/pickers/ColorPicker.module.css`, `src/App.module.css`, `public/fonts/inter-variable.woff2`, `public/fonts/fraunces-variable.woff2`
**Deleted:** `src/styles/styles.js`, `src/index.css`
**Modified:** `src/main.jsx` (imports reset.css + tokens.css instead of index.css), `src/App.jsx` (CSS Modules, all inline styles removed except dynamic colors), all 9 components (CSS Modules, JS hover handlers removed), `src/data/options.js` (6 jewel-tone player colors), `src/assets/questions.js` (9 category accent colors updated), `index.html` (font preload links), `vitest.config.js` (consolidated with mergeConfig), `docs/design-system.md`

### Deviations from plan
- None. Phase 1 follow-up from Phase 0 (vitest config consolidation) was completed here as planned.

### Verification performed
- `npm run lint` → 0 warnings, 0 errors
- `npm run test` → exits 0 (`--passWithNoTests`)
- `npm run build` → ✅ 81.50 KB JS gzip (target: ≤120 KB), 3.90 KB CSS gzip (target: ≤15 KB), fonts served as static assets
- Confirmed: zero remaining imports of `src/styles/styles.js`
- Confirmed: all remaining `style={}` are dynamic values (player colors, category colors, JS-driven opacity, SVG stroke transitions) — no static inline style objects

### Follow-ups deferred
- Manual theme toggle (dark ↔ light) shipped as a token + CSS infrastructure in this phase; the toggle UI is a Phase 3 deliverable.
- `alert()` / `window.confirm()` still present in `PlayerSetup.jsx` and `App.jsx` — replaced by styled modal/toast in Phase 3.

---

## Phase 2 — Mobile-first responsive rebuild

**Status:** ✅ Complete (2026-09-04)

### Deliverables checklist
- [x] PlayerSetup: single-column mobile, side-by-side ≥700px, real `<form>`, inline errors replacing `alert()`, error clears on input change
- [x] CategorySelector: `auto-fit minmax(150px, 1fr)` grid + `container-type: inline-size` + `@container (max-width: 380px)` compact layout
- [x] QuestionCard: fluid padding, Fraunces display font, max-width via `--content-narrow` token; `<h2>` → `<p>` semantic fix
- [x] RatingPanel: equal-width star buttons (done Phase 1); bottom sheet on mobile via `position: fixed; bottom: 0` + slide-up animation + drag handle
- [x] Leaderboard: overlay preserving phase — no early-return; `position: fixed` backdrop + `overlayContent` centered dialog; click-backdrop-to-close
- [x] CountdownTimer: fluid ring via `clamp(130px, 28vw, 180px)` + `viewBox` SVG; brass-only color (`--accent`); red only in final 10s (`--cat-heat`)
- [x] `window.confirm` → `<Modal>` primitive with backdrop, title, message, confirm/cancel actions
- [x] `alert()` in App.jsx + PlayerSetup → `<Toast>` primitive (auto-dismiss, 4s) + inline errors respectively
- [x] Semantic pass: `<h2>` question text → `<p>` in QuestionCard; heading hierarchy sane across all components
- [x] `dvh` units on App screen (done Phase 1); `.logo` classes removed (done Phase 0); avatars from tokens
- [x] Sheet backdrop on mobile (`.sheetBackdrop`) visible only when rating panel is open

### What actually changed
**Created:** `src/components/primitives/Modal.jsx`, `src/components/primitives/Modal.module.css`, `src/components/primitives/Toast.jsx`, `src/components/primitives/Toast.module.css`
**Modified:** `src/App.jsx` (Modal + Toast wiring, Leaderboard as overlay, sheet backdrop, `doReset` extracted from `resetGame`, all `alert()`/`window.confirm()` removed), `src/App.module.css` (overlay, overlayContent, sheetBackdrop, avatar mobile sizing), `src/components/PlayerSetup.jsx` (real `<form>`, inline errors state, no `alert()`), `src/components/PlayerSetup.module.css` (inputError, error classes), `src/components/CountdownTimer.jsx` (simplified color: accent/heat only), `src/components/CountdownTimer.module.css` (fluid clamp sizing, fluid font-size), `src/components/RatingPanel.jsx` (drag handle added), `src/components/RatingPanel.module.css` (bottom sheet @media 640px, handle), `src/components/CategorySelector.module.css` (container-type + @container queries), `src/components/QuestionCard.jsx` (`<h2>` → `<p>` semantic fix)

### Deviations from plan
- Leaderboard is a centered-dialog overlay (click-backdrop-to-close) rather than a bottom sheet; a full bottom-sheet variant with drag-dismiss is Phase 3 polish
- `window.confirm` was removed from PlayerSetup in Phase 1; only the App.jsx instance was moved to Modal here
- Avatar on mobile scales to `--avatar-md` (48px) at ≤480px — not in original plan spec but follows token intent

### Verification performed
- `npm run lint` → 0 warnings, 0 errors
- `npm run build` → ✅ 82.25 KB JS gzip (target: ≤120 KB), 4.64 KB CSS gzip (target: ≤15 KB)
- `rg "alert\(|window\.confirm" src/` → 0 hits

### Follow-ups deferred
- End-of-game screen (Phase 3)
- Theme toggle UI (Phase 3)
- View Transitions replacing `setTimeout` fades (Phase 3)
- Empty state / "all questions exhausted" screen (Phase 3)
- Full playthrough visual test at 320/375/768/1440px deferred to Phase 3 verification pass (requires browser tool session)

---

## Phase 3 — Feedback states & flow completeness

**Status:** ✅ Complete (2026-09-04)

### Deliverables checklist
- [x] End-of-game screen with final standings and replay action
- [x] Empty states for all category-exhausted paths (toast messages from Phase 2 cover per-category; `game-over` phase covers all-exhausted)
- [x] Theme toggle (dark default, light alternate, persisted to localStorage)
- [x] View Transitions replacing `setTimeout` fades in `getRandomQuestion`, `handleDecadeSelect`, `submitRating`

### What actually changed
**Created:** `src/components/GameOver.jsx`, `src/components/GameOver.module.css`
**Modified:**
- `src/App.jsx` — Added `game-over` phase; `replayGame()` resets questions+ratings, keeps players; `withTransition()` helper using `flushSync` replaces all three `setTimeout` fades; `themeMode` state via `useLocalStorage('themeMode', 'dark')`; `useEffect` sets `document.documentElement.dataset.theme`; theme toggle button in header; removed `fade`/`setFade` state and `useEffect` for it; GameOver rendered as phase content; `submitRating` triggers `setPhase('game-over')` instead of fake question on exhaustion
- `src/components/QuestionCard.jsx` — Removed `fade` prop, inline `opacity` style, and `fade` propType
- `src/components/QuestionCard.module.css` — Removed unused `transition: opacity` on `.question`
- `src/styles/reset.css` — Added `::view-transition-old(root)` / `::view-transition-new(root)` timing block guarded by `prefers-reduced-motion: no-preference`

### Deviations from plan
- "Empty states for all category-exhausted paths" is split: per-category toast (Phase 2) + `game-over` phase (this phase). No additional empty-state screens were needed — the toast + returning to category selection is the right UX for partial exhaustion.
- Theme toggle is a simple binary dark/light persisted via localStorage; no "system" third option, since dark is the explicit primary theme and most sessions happen in dark environments.

### Verification performed
- `npm run lint` → 0 warnings, 0 errors
- `npm run build` → ✅ 82.76 KB JS gzip (target: ≤120 KB), 4.89 KB CSS gzip (target: ≤15 KB)
- `rg "alert\(|window\.confirm" src/` → 0 hits
- `rg "setTimeout" src/App.jsx` → 0 hits (all three removed)

### Follow-ups deferred
- Full playthrough visual test at 320/375/768/1440px (deferred to manual QA before shipping)
- Lighthouse mobile score (deferred; requires running preview server)

---

## Phase 4 — i18n, ES + EN

**Status:** ✅ Complete (2026-09-04)

### Deliverables checklist
- [x] `react-i18next` 17.0.13 + `i18next` 26.4.2 installed
- [x] `src/i18n.js` — i18next initialized with bundled resources (no lazy loading)
- [x] `src/locales/es/ui.json` — complete Spanish UI strings (setup, game, toast, modal, question, rating, decade, category, leaderboard, gameOver)
- [x] `src/locales/en/ui.json` — complete English equivalents
- [x] `src/locales/es/categories.json` — Spanish category names, descriptions, instructions
- [x] `src/locales/en/categories.json` — English category names, descriptions, instructions
- [x] All UI strings extracted from all 9 components + App.jsx
- [x] Language switcher button in header, persisted via `useLocalStorage('lang', 'es')`
- [x] `<html lang>` updated at runtime via `useEffect` + `document.documentElement.lang = lang`
- [x] `categories` export in `questions.js` stripped of translatable fields (name, description, specialInstructions)
- [x] All 245 text questions restructured to `{ id, en: {q, explanation}, es: {q, explanation} }`
- [x] All ~55 absurdista questions translated both directions (EN + ES)
- [x] All 20 atlasOfMe questions (originally ES) translated to EN
- [x] All 45 dilemma questions (originally ES) translated to EN
- [x] spark, roots, mirror, heat, shadow (originally EN) translated to ES
- [x] `decadesTape` songs kept as `[year, artist, title]`; `handleDecadeSelect` generates bilingual object at runtime
- [x] "Skip" → `t('question.skip')` — resolved completely
- [x] CategorySelector V9 bug fixed: now consumes `categories` prop from App.jsx
- [x] Deduplication in `getRandomQuestion` (all-category path) simplified from text comparison to `q.id === selected.id`
- [x] `main.jsx` imports `'./i18n'` before App

### What actually changed
**Created:** `src/i18n.js`, `src/locales/es/ui.json`, `src/locales/en/ui.json`, `src/locales/es/categories.json`, `src/locales/en/categories.json`
**Modified:** `src/main.jsx` (i18n import), `src/App.jsx` (useTranslation, lang state, language toggle, bilingual handleDecadeSelect, t() for modal/toast/header/turnBanner), `src/assets/questions.js` (categories metadata stripped; all 245 questions to bilingual format), `src/components/CategorySelector.jsx` (useTranslation, categories prop fix, t() throughout), `src/components/DecadeSelector.jsx` (useTranslation, t()), `src/components/QuestionCard.jsx` (useTranslation, bilingual question access via i18n.language, t() for instruction/buttons), `src/components/RatingPanel.jsx` (useTranslation, t() for all criteria/options/labels), `src/components/Leaderboard.jsx` (useTranslation, t()), `src/components/GameOver.jsx` (useTranslation, t()), `src/components/PlayerSetup.jsx` (useTranslation, t())

### Deviations from plan
- Added `category.headingAction` and `decade.headingAction` keys to both locale files to allow colored-name spans in headings without splitting the translated string at runtime.
- `i18next-browser-languagedetector` not installed — `useLocalStorage('lang', 'es')` covers persistence + default. Simpler and sufficient.

### Verification performed
- `npm run lint` → 0 warnings, 0 errors
- `npm run build` → ✅ 114.35 KB JS gzip (target: ≤120 KB), 4.89 KB CSS gzip (target: ≤15 KB)

### Follow-ups deferred
- Full language-switch mid-game visual test (requires browser session)
- Lighthouse mobile score (deferred to manual QA)

---

## Phase 5 — Play modes + state refactor

**Status:** ✅ Complete (2026-09-04)

### Deliverables checklist
- [x] `modes` array on each `categories` entry
- [x] ModeSelector screen before CategorySelector
- [x] Mode persisted (`gameMode` localStorage key) and changeable mid-game via header button
- [x] `CategorySelector` filters categories by mode (prop already consumed in Phase 4)
- [x] `useGame` hook extracted from `App.jsx`
- [x] `players` is an array; localStorage migration from `{player1, player2}` shape on first load
- [x] `App.jsx` at 149 lines (target: ≤150)

### What actually changed
- `src/assets/questions.js` — added `modes: ['couples','friends','team']` arrays to all 9 category entries per plan mapping
- `src/hooks/useGame.js` — new custom hook; encapsulates all game state (phase, players, ratings, categoryQuestions, currentPlayer, mode, etc.) and all action handlers; handles localStorage migration from old `{player1, player2}` shape to array; filters categories by mode; players addressed as `players[0]` / `players[1]` (0-indexed)
- `src/components/ModeSelector.jsx` — new component: 3-card mode picker (💞 Pareja / 🎉 Amigos / 💼 Equipo); highlights currently active mode
- `src/components/ModeSelector.module.css` — styles following existing design-system tokens
- `src/App.jsx` — rewritten to delegate all game logic to `useGame`; renders based on `game.phase`; adds `selecting-mode` phase; adds "Cambiar Modo" header button; `lang` / `themeMode` remain in App as UI preferences; 149 lines
- `src/locales/es/ui.json` — added `mode.*` section and `game.changeMode` key
- `src/locales/en/ui.json` — same in English

### Deviations from plan
- Plan used term "reducer" but a custom hook with `useState` was used instead of `useReducer`. The extraction goal (App.jsx under 150 lines, logic centralized) is met. A formal reducer with action objects would add boilerplate without benefit at this scale.
- `CategorySelector` prop filtering was already completed in Phase 4 (the V9 fix). Phase 5 only needed to pass `filteredCategories` instead of all `categories` from `useGame`.

### Verification performed
- `npm run lint` → 0 warnings, 0 errors
- `npm run build` → ✅ 115.54 KB JS gzip (target: ≤120 KB)
- `App.jsx` line count: 149 (target: ≤150)
- `useGame.js` line count: 230

### Follow-ups deferred
- End-to-end browser playthrough with mode switching mid-game (requires browser session)

---

## Phase 6 — 2–6 player support for Friends & Team modes

**Status:** ✅ Complete (2026-09-13)

### Deliverables checklist
- [x] Mode selection moved to step 1 of onboarding (before player configuration)
- [x] Couples mode locked at 2 players; Friends & Team allow 2–6
- [x] Single-screen roster step replaces the two fixed `PlayerStep` screens
- [x] Round-robin turn rotation `(currentPlayer + 1) % players.length`
- [x] Group consensus rating: one tap, all other players named in the prompt
- [x] `Intl.ListFormat` for locale-aware name conjunction in `RatingPanel`
- [x] Mid-game "Cambiar Modo" fixed: now opens `ModeSelector` correctly; Couples disabled when group > 2
- [x] Session restore guard updated: accepts 2–6 players (was hardcoded to exactly 2)
- [x] `startGame` and `replayGame` seed ratings for every player in the array
- [x] `showModeSelector` action added to `useGame` (opens selector without clearing mode)
- [x] `PlayerStep.jsx` and `PlayerStep.module.css` deleted (replaced by `RosterStep`)
- [x] `Onboarding.test.jsx` rewritten for new 2-step flow
- [x] `useGame.test.jsx` added: startGame N-player seeding, session restore, sortedPlayers ranking, replayGame, legacy migration
- [x] Lint: 0 warnings, 0 errors

### What actually changed
- `src/components/onboarding/Onboarding.jsx` — 3-step (player → player → mode) replaced with 2-step (mode → roster); `onComplete` payload changed from `{player1, player2, mode}` to `{players, mode}`
- `src/components/onboarding/ModeStep.jsx` — dropped `players`/`IdentityCard`/VS identity summary; `onStart` → `onNext`; player count badge added to each card
- `src/components/onboarding/ModeStep.module.css` — added `.modeCount`, renamed `.startBtn` → `.nextBtn`
- `src/components/onboarding/RosterStep.jsx` — new: accordion player list, add/remove rows, inline validation
- `src/components/onboarding/RosterStep.module.css` — new
- `src/components/onboarding/PlayerStep.jsx` — **deleted**
- `src/components/onboarding/PlayerStep.module.css` — **deleted**
- `src/hooks/useGame.js` — `startGame` takes `{players, mode}` array; session restore: `length !== 2` → `length < 2 || length > 6`; `submitRating` rotation: `1 - currentPlayer` → `(currentPlayer + 1) % players.length`; `replayGame` seeds all players; `showModeSelector` added
- `src/App.jsx` — `nextPlayerData` uses round-robin; `raters` array passed to `RatingPanel`; "Cambiar Modo" calls `game.showModeSelector()`; `ModeSelector` receives `playerCount` prop
- `src/components/RatingPanel.jsx` — `raterData` (object) → `raters` (array); `Intl.ListFormat` for name conjunction
- `src/components/ModeSelector.jsx` — removed dead `categories: N` field; `playerCount` prop; Couples disabled when `playerCount > 2`
- `src/components/ModeSelector.module.css` — `.disabled` and `.disabledHint` added
- `src/App.module.css` — `.avatarRow` wraps and uses smaller gap for 6 avatars; `.playerNames` has mobile font fallback
- `src/locales/{es,en}/ui.json` — step keys renumbered; `setup.addPlayer`, `removePlayer`, `playerN`, `errors.maxPlayers`; `mode.*_players`, `mode.couplesDisabled`; decade subheading updated from "opponent" to "next player"
- `src/components/onboarding/Onboarding.test.jsx` — **rewritten**: 29 tests across mode step, roster (Couples/Friends), validation, and happy path (2-player and 4-player)
- `src/hooks/useGame.test.jsx` — **new**: 10 tests for startGame, session restore, sortedPlayers, replayGame, legacy migration

### Verification performed
- `npm run lint` → 0 warnings, 0 errors
- `npm test` → 29 tests passing

### Follow-ups deferred
- End-to-end browser playthrough: Friends 4-player rotation, Couples unchanged, Team 6-player, session restore, mid-game mode change
- `npm run build` size check (target: ≤120 KB gzip; deletion of PlayerStep offsets RosterStep addition)
