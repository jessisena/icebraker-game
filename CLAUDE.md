# CLAUDE.md

2–6 player question game (React 19 + Vite). Players take turns answering randomized questions from themed categories, then the rest of the group rates the response by consensus.

See `docs/` for the full redesign plan and design system reference.

## Project map

- `src/App.jsx` — Shell: renders onboarding or the active game phase; all game logic is in `useGame`
- `src/hooks/useGame.js` — All game state and actions (phase, players array, ratings, categoryQuestions, currentPlayer, mode, customCategories)
- `src/game/scoring.js` — `rankPlayers(players, ratings)`: total points, 👍/😐/👎 tally, turns; sorted for the leaderboard
- `src/components/` — Game UI
  - `onboarding/Onboarding.jsx` — Wizard: mode → categories (Custom only) → roster
  - `onboarding/ModeStep.jsx` — Mode picker (Couples/Friends/Team/Custom)
  - `onboarding/CategoryStep.jsx` — Wraps `CustomCategoryPicker` for the Custom onboarding step
  - `onboarding/RosterStep.jsx` — Accordion player list (2–6 players); validates names; add/remove rows; glyphs and colors are unique per player
  - `CategorySelector.jsx` — Category grid; current player picks a category each turn
  - `CustomCategoryPicker.jsx` — Checklist of all 9 categories (min 1); used in onboarding and mid-game
  - `DecadeSelector.jsx` — Decade picker for music-trivia category
  - `QuestionCard.jsx` — Question display, proceed/skip buttons, optional countdown timer
  - `RatingPanel.jsx` — Group consensus vote: Good / Neutral / Bad (2/1/0) in every category; music-trivia and atlasOfMe show per-button hints; rater label lists all non-answering players via `Intl.ListFormat`
  - `CountdownTimer.jsx` — SVG ring timer, used for absurdista (90s) and atlasOfMe (30s)
  - `ModeSelector.jsx` — Mid-game mode picker; Couples disabled when group > 2; Custom opens the category picker
  - `Leaderboard.jsx` / `GameOver.jsx` — Ranked by total points with a 👍/😐/👎 tally
  - `AvatarGlyph.jsx` — Six Arcana emblem SVGs (eye, key, hand, wheel, crown, moon); brass details use `--accent`
  - `pickers/CardDeck.jsx` — Scroll-snap deck of 2:3 glyph cards; taken cards show their owner
  - `pickers/ColorPicker.jsx` — Player color swatches; taken colors show the owner's initial
  - `pickers/roving.js` — Arrow-key navigation that skips taken options
- `src/hooks/useLocalStorage.js` — Custom hook returning `[state, setState, remove]`, auto-syncs with localStorage
- `src/assets/questions.js` — Question data: ~245 text questions + ~180 songs across 9 categories
- `src/data/options.js` — 6 avatars and 6 colors (one of each per player at 6-player max); color values are `var(--player-*)` tokens so each theme supplies its own shade
- `src/data/ratings.js` — `RATING` vote values and `STORAGE_VERSION` (bump when the persisted shape changes; stale ratings are cleared on load)
- `src/styles/tokens.css` — Design tokens (colors, spacing, typography)

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

Phase state machine controlled by `phase`:

1. **selecting-mode** — Shown mid-game when "Cambiar Modo" is tapped; `ModeSelector` renders
   - **selecting-custom-categories** — Custom picked mid-game; `CustomCategoryPicker` renders with the current selection ticked
2. **selecting-category** — Current player picks a category card
3. **selecting-decade** — Only for `decadesTape` (music trivia): current player picks a decade
4. **showing-question** — Question displayed; current player answers; optional countdown timer
5. **showing-rating** — All other players vote by consensus (one tap): Good / Neutral / Bad
6. **game-over** — Reached when every pool in the active `filteredCategories` is empty

After rating, `currentPlayer` advances round-robin `(currentPlayer + 1) % players.length` and returns to `selecting-category`.

Game state lives in `src/hooks/useGame.js`:
- `players` — Array of `{name, avatar, color}` objects, 2–6 entries (persisted via `gamePlayers` key)
- `ratings` — Object mapping player names to arrays of vote values 2/1/0 (persisted via `playerRatings` key)
- `categoryQuestions` — Object mapping category keys to remaining question arrays (shrinks as used; reset on `startGame`)
- `currentPlayer` — Index into the `players` array (0-based)
- `phase` — Controls the state machine
- `playerWhoAnswered` — Name of the player who just answered (for the rating panel)
- `selectedCategory` — Key of the current category
- `selectedDecade` — Decade number (for music trivia only)
- `timerActive` — Whether the countdown is running
- `mode` — `'couples' | 'friends' | 'team' | 'custom'` (persisted via `gameMode` key)
- `customCategories` — Category keys chosen for Custom mode (persisted via `gameCustomCategories` key)

Key actions: `startGame({players, mode, customCategories})`, `selectMode(mode)`, `confirmCustomCategories(keys)`, `showModeSelector()`, `submitRating(value)`, `replayGame()`, `resetGame()`.

`onComplete` payload from `Onboarding` is `{ players: [{name, avatar, color}, ...], mode, customCategories }`.

</important>

<important if="you are adding or modifying questions">

Questions in `src/assets/questions.js` are organized into 9 named category arrays.

Standard question shape: `[["Question text"], ["Explanation / instruction"]]`
Music trivia shape: `[year, artist, title]` (reformatted at runtime in `handleDecadeSelect`)

Category metadata is in the `categories` export at the top of the file. Each entry has:
- `key`, `name`, `description`, `icon`, `color`
- `modes: ['couples','friends','team']` — which modes include this category (Custom ignores this and uses the player's selection)
- Optional: `timerSeconds` — activates the countdown timer
- Optional: `specialBehavior: 'music-trivia'` — routes to decade picker
- Optional: `specialInstructions` — shown on the question card

When selected, a question is removed from the pool to avoid repetition.

</important>

<important if="you are adding or modifying styles or CSS">

The app uses CSS Modules + CSS custom properties. Every component has a colocated `*.module.css`.
- Design tokens: `src/styles/tokens.css`
- Design system documented in `docs/design-system.md`
- Player colors are applied dynamically via inline `style={{ color: p.color }}` — the one legitimate use case for inline styles

No MUI — the packages are installed but never imported.

</important>

<important if="you are adding or modifying text, labels, or UI copy">

Both Spanish and English are supported via `react-i18next`. Locale files: `src/locales/{es,en}/ui.json` and `src/locales/{es,en}/categories.json`. Language is toggled mid-game. Always update both files.

</important>

<important if="you are working with avatars, player configuration, or the player setup screen">

Avatar ids and colors are defined in `src/data/options.js` (6 avatars, 6 colors); glyph SVGs live in `AvatarGlyph.jsx`. Each player gets a distinct avatar and color — taken options are disabled in the card deck and color picker. Name validation is inline in `RosterStep.jsx` — no `alert()`. Players must have unique non-empty names.

</important>

<important if="you are looking for a backend or database">

No backend — all state persists in browser localStorage only. No accounts, no sync.

</important>
