# CLAUDE.md

Two-player question game (React 19 + Vite). Players take turns answering randomized questions from themed categories, then rate each other's responses.

See `docs/` for the full redesign plan and design system reference.

## Project map

- `src/App.jsx` — Game state machine (phase, players, ratings, categoryQuestions, currentPlayer)
- `src/components/` — Game UI
  - `PlayerSetup.jsx` — Initial player config (name, avatar, color)
  - `CategorySelector.jsx` — Category grid; player picks a category each turn
  - `DecadeSelector.jsx` — Decade picker for music-trivia category
  - `QuestionCard.jsx` — Question display, proceed/skip buttons, optional countdown timer
  - `RatingPanel.jsx` — Rating interface: 1–5 stars for standard categories, 0–2 points for music-trivia and atlasOfMe
  - `CountdownTimer.jsx` — SVG ring timer, used for absurdista (90s) and atlasOfMe (30s)
  - `Leaderboard.jsx` — Sorted by average rating
  - `pickers/` — Avatar and color selection components
- `src/hooks/useLocalStorage.js` — Custom hook returning `[state, setState, remove]`, auto-syncs with localStorage
- `src/assets/questions.js` — Question data: ~245 text questions + ~180 songs across 9 categories
- `src/data/options.js` — Avatar and color config
- `src/styles/styles.js` — Shared inline style objects (being migrated to CSS Modules in Phase 1)

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint (zero warnings policy) |
| `npm run preview` | Preview production build |
| `npm run test` | Run Vitest tests |
| `npm run test:watch` | Vitest in watch mode |
| `npm run format` | Format src with Prettier |
| `npm run format:check` | Check formatting (CI) |

<important if="you are modifying App.jsx or working with game flow">

Four-phase state machine controlled by `phase`:

1. **selecting-category** — Player picks a category card
2. **selecting-decade** — Only for `decadesTape` (music trivia): player picks a decade
3. **showing-question** — Question is displayed; current player answers; optional countdown timer
4. **showing-rating** — The other player rates 1–5 (or 0–2 for point-scored categories)

After rating, switches currentPlayer and returns to `selecting-category`.

Game state lives in App.jsx:
- `players` — Object `{ player1: {name, avatar, color}, player2: {name, avatar, color} }` (persisted via `gamePlayers` key)
- `ratings` — Object mapping player names to arrays of ratings (persisted via `playerRatings` key)
- `categoryQuestions` — Object mapping category keys to their remaining question arrays (shrinks as used; reset on `startGame`)
- `currentPlayer` — Integer 1 or 2
- `phase` — Controls the state machine
- `playerWhoAnswered` — Name of the player who answered (for the rating panel)
- `selectedCategory` — Key of the current category
- `selectedDecade` — Decade number (for music trivia only)
- `timerActive` — Whether the countdown is running

</important>

<important if="you are adding or modifying questions">

Questions in `src/assets/questions.js` are organized into 9 named category arrays.

Standard question shape: `[["Question text"], ["Explanation / instruction"]]`
Music trivia shape: `[year, artist, title]` (reformatted at runtime in `handleDecadeSelect`)

Category metadata is in the `categories` export at the top of the file. Each entry has:
- `key`, `name`, `description`, `icon`, `color`
- Optional: `timerSeconds` — activates the countdown timer
- Optional: `specialBehavior: 'music-trivia'` — routes to decade picker
- Optional: `scoringType: 'points'` — uses 0/1/2 scoring in RatingPanel instead of 1–5 stars
- Optional: `specialInstructions` — shown on the question card

When selected, a question is removed from the pool to avoid repetition.

</important>

<important if="you are adding or modifying styles or CSS">

The app is being migrated from inline style objects to CSS Modules + CSS custom properties.
- Current shared styles: `src/styles/styles.js` (will be deleted in Phase 1)
- Target: colocated `*.module.css` per component, tokens in `src/styles/tokens.css`
- Design tokens and palette documented in `docs/design-system.md`
- Player colors are applied dynamically via inline style — the one legitimate use case for inline styles after the migration

No MUI — the packages are installed but have never been imported and will be removed in Phase 0.

</important>

<important if="you are adding or modifying text, labels, or UI copy">

UI chrome is in Spanish. Questions are in English (full i18n with Spanish translation planned for Phase 4).
After Phase 4: Spanish and English, switchable mid-game via a language toggle.

</important>

<important if="you are working with avatars, player configuration, or the player setup screen">

Avatar sources must be imported and mapped in `src/data/options.js`. Players must have different names to start the game. Validation currently uses `alert()` — will be replaced with inline errors in Phase 2.

</important>

<important if="you are looking for a backend or database">

No backend — all state persists in browser localStorage only. No accounts, no sync.

</important>
