# Implementation Plan — Multiplayer (2–6 Players)

**Status:** ✅ Complete (2026-09-13)  
**Commit:** `9ee207a`

---

## Context

The game was 2-player only. `docs/decisions.md` records the deliberate choice to ship 2 players while
refactoring `players` into an array so N-player would be a drop-in later; `docs/PROGRESS.md` listed
"N-player generalization" as the open follow-up. This plan was that follow-up.

## What changed for the player

- **Mode is chosen first**, before any player is configured — the mode now decides how many players are allowed.
- **Couples** stays at exactly 2 players. **Friends** and **Team** allow **2–6**.
- Players are built on **one roster screen** with add/remove, instead of one full-screen step per player.
- With 3+ players, the answer is scored by **group consensus**: the rating panel addresses every other
  player by name and the group agrees on a single score, entered with one tap. Turn order rotates
  `(current + 1) % n`.

Onboarding goes from 3 steps (player → player → mode) to 2 steps (mode → roster).

## Design decisions

| Question | Decision |
|---|---|
| Rating with 3+ players | One shared consensus rating, one tap. Panel lists every other player as the rater. |
| Group size UI | Single roster screen; rows added/removed inline. |
| Couples player count | Locked at 2 — roster renders 2 rows with no add/remove controls. |
| Turn rotation | Round-robin `(currentPlayer + 1) % players.length`. |
| Who picks the decade (music trivia) | The next player, as today — "opponent" label updated to "next player". |

## Files changed

### `src/components/onboarding/Onboarding.jsx`
- `TOTAL_STEPS = 2`. Step 0 = `ModeStep`, step 1 = new `RosterStep`.
- State: `mode` (chosen first) and `players` (array of 2–6 drafts).
- On mode change to `couples`, roster is clamped to first 2 players.
- `onComplete` payload changes from `{ player1, player2, mode }` to `{ players: [...], mode }`.

### `src/components/onboarding/ModeStep.jsx`
- Removed `players` / `IdentityCard` / VS summary — no players exist yet at this point.
- Each mode card gains a player-count badge (`mode.{key}_players` i18n key).
- `onStart` → `onNext`; Next disabled until a mode is picked.

### `src/components/onboarding/RosterStep.jsx` + `.module.css` (new)
- Accordion player list: one row expanded at a time.
- `+ Add player` button, hidden at 6 players and for `couples`.
- Remove button on rows 3+, hidden for `couples`.
- Validation on Start: all names non-empty, pairwise distinct (accent/case-insensitive).

### `src/components/onboarding/PlayerStep.jsx` + `.module.css` (deleted)
- Replaced entirely by `RosterStep`.

### `src/hooks/useGame.js`
- `startGame(config)` takes `config.players` (array); seeds `ratings` for every name.
- Session-restore guard `players.length !== 2` → `length < 2 || length > 6`.
- `submitRating`: `1 - currentPlayer` → `(currentPlayer + 1) % players.length`.
- `replayGame`: reseeds ratings for every player.
- New action `showModeSelector()`: sets phase to `selecting-mode` without clearing mode (fixes dead mid-game mode picker).

### `src/App.jsx`
- `nextPlayerData` / `raterData` → `players[(currentPlayer + 1) % players.length]` and `players.filter((_, i) => i !== currentPlayer)`.
- Header "Cambiar Modo" button → `game.showModeSelector()` (was `game.selectMode(null)`).
- `ModeSelector` receives `playerCount`; `RatingPanel` receives `raters` (array).

### `src/components/RatingPanel.jsx`
- `raterData` (object) → `raters` (array of player objects).
- Names joined with `Intl.ListFormat` for locale-aware conjunction.

### `src/components/ModeSelector.jsx`
- `playerCount` prop added; Couples card disabled when `playerCount > 2`.
- Removed dead `categories: N` field from MODES data.

### `src/locales/{es,en}/ui.json`
- Step keys renumbered: step 0 = mode, step 1 = roster.
- Added: `setup.addPlayer`, `setup.removePlayer`, `setup.playerN`, `setup.errors.maxPlayers`.
- Added: `mode.couples_players`, `mode.friends_players`, `mode.team_players`, `mode.couplesDisabled`.

### `src/components/onboarding/Onboarding.test.jsx` (rewritten)
- 29 tests covering: mode step, roster (Couples/Friends), validation, 2-player and 4-player happy paths.

### `src/hooks/useGame.test.jsx` (new)
- 10 tests covering: startGame with N players, session restore (5-player ✓, <2 ✗, >6 ✗), legacy migration, sortedPlayers, replayGame.

## Verification

- `npm run lint` → 0 warnings, 0 errors
- `npm run format:check` → all files conform
- `npm test` → 29 tests passing (2 test files)
- `npm run build` → 119.31 KB gzip (target ≤120 KB) ✓

## Manual QA checklist (deferred)

- Friends, 4 players — add two, confirm distinct defaults, play 4 turns, check A→B→C→D rotation + rating panel naming all 3
- Couples — exactly 2 rows, no add/remove, existing flow unchanged
- Team, 6 players — add button disappears at 6; header fits at 375px
- Reload mid-game with 5 players → session restores
- Mid-game "Cambiar Modo" → ModeSelector opens; Couples greyed out with 3+ players
