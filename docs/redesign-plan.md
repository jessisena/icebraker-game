# UI/UX Analysis & Redesign Plan — Question Randomizer

## Context

`question-randomizer` is a two-player conversation game (React 19 + Vite): players draw questions from themed categories, answer, and rate each other. It works, but the UI has grown by accretion — every screen is hand-written inline style objects with no shared design tokens and no breakpoints. It is effectively unusable on a phone, which is the device it is most likely to be played on (one handset passed between two people).

This plan covers a full analysis and a phased revamp: a token-based design system, a mobile-first responsive rebuild, a new palette, ES/EN internationalization, and a play-mode selector (couples / friends / team) that filters which categories are offered.

**Decisions already made with the user:**
- Drop MUI entirely; move to CSS custom properties + CSS Modules.
- Mobile-first.
- Full i18n: Spanish + English, including translating question content.
- Play-mode selector gating categories; I propose the mapping, user reviews.
- Stay 2-player for now, but refactor state to an array so N-player is a later drop-in.
- **Accessibility is explicitly out of scope.** No WCAG work, no ARIA additions, no contrast-driven color decisions. The palette is chosen on aesthetics alone.
- All planning and progress documentation lives in a **`docs/` folder in the repo**, updated at the completion of every phase.

**Assumptions I'm stating explicitly** (no analytics, no brand guidelines, no backend exist):
- No usage data available, so priorities are ranked by severity × reach, not measured impact.
- No brand identity to conform to — the new palette is proposed from scratch.
- localStorage remains the only persistence layer; no accounts, no sync.
- Target browsers: evergreen Safari iOS / Chrome Android / desktop Chrome-Firefox-Safari.

---

## Part 1 — Analysis

### 1.1 Findings that block real use

| # | Issue | Impact | Recommendation |
|---|---|---|---|
| **B1** | `src/index.css` is the **untouched Vite default**: `background-color: #242424`, `color: rgba(255,255,255,.87)`, `h1 { font-size: 3.2em }`, `body { display:flex; place-items:center }`. It fights the light-blue palette in `styles.js` on every screen. | Dark page chrome under light cards; `body` flex centering breaks vertical layout; `h1` sizing is arbitrary. This is the root cause of most "looks off" symptoms. | Delete `index.css` and `App.css` wholesale. Replace with a token stylesheet + a small modern reset. |
| **B2** | `src/assets/sea.css` is **never imported** (confirmed: 0 hits in `src/`, 0 in `dist/assets/*.css`), yet every screen wraps itself in `<div className="sea-container"><div className="waves">`. Worse, if it *were* imported, `.waves` is `height:15%; opacity:.3` and would clip all page content into the bottom 15% at 30% opacity, sourcing a background image from **imgur**. | Dead markup on every screen; a latent layout bomb; an external third-party image dependency in the critical render path. | Delete `sea.css` and both wrapper divs. Any ambient background becomes a CSS gradient token, no external asset. |
| **B3** | `styles.playersRow` is `display:flex; gap:30px` with **no wrap**, inside a `maxWidth:1000px` container. Two 300px-min panels side by side. | On a 375px phone, PlayerSetup — the very first screen — is crushed to ~150px per column. The app fails at its entry point on mobile. | Single-column stack below 768px; side-by-side only at ≥768px. |
| **B4** | `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `@fontsource/roboto` are all declared in `package.json` with **zero imports anywhere**. CLAUDE.md's "Material-UI components" claim is false. | ~300KB of dependency surface, install time, and Dependabot noise for nothing. Actively misleads future contributors and LLMs. | Remove all five. Add `prop-types` explicitly — it is imported by all 9 components but only resolves as a transitive dep today (fragile). |
| **B5** | **All ~400 questions are in English; all UI chrome is Spanish.** `<html lang="en">` while the UI is Spanish. Page title is still `Vite + React`, favicon `/vite.svg`. | Incoherent product — the single most jarring thing a new player encounters. | Full i18n (Phase 4), correct `lang`, real title/favicon/meta. |
| **B6** | Native `alert()` ×4 and `window.confirm()` ×1 for validation, exhausted categories, exhausted decades, and reset confirmation (`App.jsx:87,151,220`; `PlayerSetup.jsx`). | Unstyled OS dialogs break the visual language, block the JS thread, and are hostile on mobile. On iOS Safari they can be suppressed entirely, so the user gets *nothing*. | Inline field errors for validation; a styled toast for "no questions left"; a styled modal for destructive reset. |

### 1.2 Visual design, layout, and consistency

| # | Issue | Impact | Recommendation |
|---|---|---|---|
| **V1** | **No design tokens.** Colors, radii, shadows, and spacing are re-typed literally in `styles.js` and again locally inside `QuestionCard`, `RatingPanel`, `DecadeSelector`, `CountdownTimer`. Four radii in use (10/12/16/20px), three shadow recipes, four grey text values (`#546E7A`, `#78909C`, `#90A4AE`, `#263238`). | Nothing is consistent, and nothing can be changed in one place. Any restyle means editing 9 files. | A single `tokens.css` of CSS custom properties: color, spacing (4px scale), radius (3 steps), shadow (3 steps), type scale, motion durations. |
| **V2** | Type is unsystematic: 11px, 12px, 14px, 15px, 16px, 18px, 20px, 22px, 26px, 28px, 32px, 36px, 48px — no scale, no rhythm. Only `styles.container` sets a family (`Arial`), which nothing uses. | Muddy visual hierarchy; the question — the single most important element on screen — competes with turn banners and buttons for attention. | A 7-step modular scale on `clamp()` so type is fluid across viewports. One display face for questions, one UI face for chrome. |
| **V3** | Layout widths are hardcoded per component and never agree: `setupContainer 1000px`, `categorySelectorContainer 900px`, `QuestionCard 700px`, `DecadeSelector grid 700px`, turn banner `600px`, `RatingPanel 600px`. | Content edges jump on every phase transition — visible, jarring reflow during normal play. | One `--content-max` token; a shared `<Screen>` layout wrapper used by all phases. |
| **V4** | `CategorySelector` renders 10 cards (9 categories + a synthetic "Todas") in `repeat(3, 1fr)` → a permanent orphan card alone on the last row. | Unbalanced grid on the most-visited screen in the app. | `repeat(auto-fit, minmax(150px, 1fr))` — self-balancing at every width; 1 col on phones, 2–3 above. |
| **V5** | Only **one** media query exists in the entire app (`App.css`, `max-width: 768px`, two rules, both `!important`). Inline style objects structurally cannot hold media queries — this is the hard constraint forcing the CSS Modules migration. | No responsive design is possible without the migration. It is a prerequisite, not a preference. | CSS Modules + tokens (Phase 1) unblocks everything else. |
| **V6** | Avatars carry leftover Vite template classes `className="logo"` / `"logo react"` → `.logo { height:7em; padding:1.5em }`. | ~160px avatars consuming the top third of a phone screen before any content appears. | Delete; size avatars from tokens (`--avatar-lg` 64px desktop, 48px mobile). |
| **V7** | Rating buttons render `"⭐".repeat(n)`, so button widths grow monotonically (`minWidth:70px`, but the 5-star button is ~3× wider than the 1-star). | Ragged, unaimable target row; the highest rating is physically the biggest button — a subtle scoring bias baked into the layout. | Equal-width segmented control: numeral + a single star, filled-state on selection. |
| **V8** | Leaderboard renders `{player.average} / 5.00` unconditionally, but `atlasOfMe` and `decadesTape` score 0–2 points. Medals hardcoded `index === 0 ? "🥇" : "🥈"`. | Displayed scores are simply wrong for two of nine categories. Medal logic silently breaks at 3+ players. | Normalize scores per `scoringType`, display the actual denominator, generate medals from index. |
| **V9** | `CategorySelector` receives a `categories` prop from App but **ignores it**, importing `categories` directly from `../assets/questions`. Not declared in `propTypes`. | Dead prop; the component can't be filtered from the parent — which the new mode feature requires. | Make the component consume its prop. Required for mode filtering. |
| **V10** | `styles.container` and `styles.question` are referenced by nothing. `initialQuestions` (64), `decadesTapeKO` (~35), `shadowExpansion` (20) are dead exports. A stale `dist/` build is checked in. | Dead code misleads contributors and LLMs; `dist/` in VCS causes spurious diffs. | Delete all of it; gitignore `dist/`. |
| **V11** | Two categories share the exact same accent color: `absurdista` and `decadesTape` are both `#FF6F00`, with different icons but identical chrome. | Two of nine cards are visually indistinguishable at a glance on the selection screen. | Assign `decadesTape` its own hue in the new palette. |

### 1.3 Interaction, feedback, and code health

| # | Issue | Impact | Recommendation |
|---|---|---|---|
| **I1** | Three `setTimeout` calls orchestrate the fade transition (100ms in `getRandomQuestion`, 50ms in `handleDecadeSelect`, 300ms in `submitRating`). | Timing-coupled state; a fast double-click can land the app in an inconsistent phase. Untestable. | CSS transitions keyed on element identity (`key` prop) + the View Transitions API where supported, with graceful fallback. |
| **I2** | All hover feedback is mouse-only JS — `onMouseEnter`/`onMouseLeave` driving React state in `QuestionCard`, and **direct DOM mutation** in `RatingPanel` using `e.target` rather than `e.currentTarget`, so on music-trivia buttons (which have inner `<div>`s) the style lands on the child element. | A visible rendering bug on one screen, plus a re-render on every mouse movement across a button. Hover state that CSS handles for free is costing React renders. | Delete all JS hover handling; express hover and active states in CSS. One rule, no re-renders, bug gone. |
| **I3** | `showLeaderboard` full-screen-replaces the game rather than overlaying it. Returning re-enters at `selecting-category`. | Checking the score costs you your place in the flow. | Leaderboard as a dismissible sheet (bottom sheet on mobile, dialog on desktop) preserving phase. |
| **I4** | No empty/loading/end states. When the last category empties, the player gets an `alert()`. There is no "game over" screen. | The game has no ending — it just starts erroring. | A proper end-of-game screen with final standings and a replay action. |
| **I5** | "Skip" is the only English string in an otherwise Spanish UI. `<h2>` elements are used throughout for body-weight text. | Inconsistency users notice; heading misuse muddles the visual hierarchy. | Resolved by i18n extraction + a semantic pass in Phase 2. |
| **I6** | No tests, no CI, no Prettier, no `test` script. ESLint config declares `react: { version: '18.3' }` while React is 19. | No regression safety net for a rewrite of this size. Per CLAUDE.md's "verify at every level," guardrails should land first. | Vitest + Testing Library; Prettier; a GitHub Actions workflow (SHA-pinned, `persist-credentials: false`, zizmor-scanned). Fix the React version. |
| **I7** | All game state (13 `useState` hooks) lives in `App.jsx` (483 lines) with early-return routing. | Every phase change re-renders everything; the file is at the edge of maintainability and will be pushed over by mode + i18n. | Extract a `useGame` reducer hook. Keep `players` as an **array** (not `player1`/`player2` keys) so N-player is a later drop-in — with a localStorage migration for the existing object shape. |
| **I8** | `CLAUDE.md` documents "three-phase state machine" and "Material-UI components". The app has **four** phases (`selecting-category`, `selecting-decade`, `showing-question`, `showing-rating`) and zero MUI. It also says "68 question/explanation pairs" — there are ~245 across 9 categories plus 180 songs. | Every future contributor and every LLM session starts from false premises. | Rewrite CLAUDE.md against reality as part of Phase 0. |

### 1.4 Quick wins vs. larger initiatives

**Quick wins** — hours each, no architectural dependency, immediately visible:
- Delete `sea.css` + the dead `.sea-container`/`.waves` wrappers (B2)
- Delete `index.css` / `App.css` Vite defaults (B1)
- Remove 5 unused deps; add `prop-types` (B4)
- Fix `<html lang>`, `<title>`, favicon, meta description, `theme-color` (B5)
- Remove `.logo` classes from avatars (V6)
- Fix the `e.target` → `e.currentTarget` hover bug (I2)
- Fix the leaderboard `/5.00` denominator (V8)
- `auto-fit` category grid (V4)
- Make `CategorySelector` use its prop (V9)
- Give `decadesTape` its own color (V11)
- Delete dead exports, `styles.container`, `styles.question`, gitignore `dist/` (V10)
- Correct `CLAUDE.md` (I8)

**Larger initiatives** — sequenced, each unblocking the next:
- Token system + CSS Modules migration (V1, V2, V5) — **prerequisite for everything responsive**
- Mobile-first responsive rebuild (B3, V3, V7)
- Feedback-state overhaul: replace all native dialogs (B6, I3, I4)
- i18n infrastructure + ES/EN content (B5, I5)
- Play-mode selector (new feature)
- `useGame` reducer + array-shaped players (I7)
- Test + CI guardrails (I6)

---

## Part 2 — Visual direction

### 2.1 Why the current palette fails

`#42A5F5` Material Blue 400 on `#F5F9FF` reads as a Google admin console. The product is intimate conversation between two people — vulnerability, curiosity, warmth, a little mischief. Cool blue-grey is the wrong emotional register. It also has to host nine category accents (red `#EF5350`, purple `#AB47BC`, green `#66BB6A`, orange `#FF6F00`…) that clash against it rather than sitting on it.

### 2.2 Proposed palette — "Velvet Hour"

The mood: late evening, low lamplight, a bottle of wine two-thirds gone, the conversation that starts after everyone else has left. Deep aubergine ground, warm ivory paper, aged-brass accent. Chosen purely for how it feels — rich and a little theatrical without tipping into either corporate or twee.

**Dark is the primary theme.** This game is played at night; a dark ground is the honest default and it makes the category accents glow rather than shout. Light theme ships as the alternate.

**Neutrals — dark (primary)**
| Token | Value | Role |
|---|---|---|
| `--bg` | `#191320` | deep aubergine-black page ground |
| `--surface` | `#241C2E` | cards, raised panels |
| `--surface-raised` | `#2F2539` | hover, nested surfaces |
| `--border` | `#3D3049` | hairlines, card edges |
| `--text` | `#F4EDE4` | warm ivory, never pure white |
| `--text-muted` | `#A99BB4` | secondary copy, metadata |

**Neutrals — light (alternate)**
| Token | Value | Role |
|---|---|---|
| `--bg` | `#F7F1E8` | warm ivory paper |
| `--surface` | `#FFFDF9` | cards |
| `--surface-raised` | `#EFE6D9` | wells, inputs |
| `--border` | `#DFD2C0` | hairlines |
| `--text` | `#211A29` | |
| `--text-muted` | `#6B5F76` | |

Component CSS references only these token names — the theme swap changes nothing downstream.

**Brand**
| Token | Value | Role |
|---|---|---|
| `--brand` | `#8B5CF6` | electric violet — primary actions, active states |
| `--brand-hover` | `#A78BFA` | (lightens on dark, darkens to `#7C3AED` on light) |
| `--brand-soft` | `#8B5CF61F` | tinted fills, selected chips |
| `--accent` | `#E0A458` | aged brass — timers, medals, highlights, the star mark |
| `--accent-soft` | `#E0A4581F` | |

Violet and brass is the whole identity in two colors: violet carries the intimacy and the slight electric charge of a good question, brass carries the warmth and the sense of something worth keeping. They are complementary enough to be striking and far enough from all nine category hues to sit cleanly underneath them.

**Category accents** — retuned to a consistent saturation and lightness so no card visually outranks another on the selection grid, and shifted toward jewel tones that read well on the aubergine ground:

| Category | Current | Proposed | Note |
|---|---|---|---|
| ✨ spark | `#42A5F5` | `#4FA8E8` sky | |
| 🌱 roots | `#66BB6A` | `#5FB37A` moss | |
| 🪞 mirror | `#AB47BC` | `#B15FD0` orchid | |
| 🔥 heat | `#EF5350` | `#E8615C` ember | |
| 🌑 shadow | `#78909C` | `#7C8BA3` slate-blue | |
| 🎭 absurdista | `#FF6F00` | `#E89A3C` amber | |
| 🎵 decadesTape | `#FF6F00` *(duplicate)* | `#D96BA0` neon-pink | resolves the V11 collision; reads as a cassette-era hue |
| 🗺️ atlasOfMe | `#26A69A` | `#3FA9A0` teal | |
| ⚖️ dilemma | `#8D6E63` | `#A17F72` clay | |

**Player colors** — the current 8 are a mixed bag (`#FFD93D` sun and `#4DD0E1` mint sit oddly against everything else). Retune to 6 jewel tones that harmonize with the ground and with each other: `#E8615C` ember, `#E89A3C` amber, `#5FB37A` moss, `#4FA8E8` sky, `#B15FD0` orchid, `#D96BA0` rose. Six is also a better picker grid than eight — a clean 3×2 on mobile.

**Elevation & texture**
- Shadows on the dark theme are near-useless; depth comes from `--surface` steps plus a 1px `--border`. The light theme uses three soft shadow steps.
- A very low-opacity noise/grain overlay on `--bg` (inline SVG turbulence, ~2KB, no network request) gives the aubergine a papery texture instead of a flat digital field. Small detail, disproportionate effect on how considered the app feels.

### 2.3 Typography

- **Display / questions:** **Fraunces** (variable, self-hosted, subset, `font-display: swap`) — a warm high-contrast serif with an optical-size axis. Set questions large, with `opsz` cranked up, so the question reads like something printed on a card rather than rendered in a form.
- **UI:** **Inter** variable, self-hosted, for buttons, labels, names, and counts.
- Scale on `clamp()`, 7 steps from `--text-xs` .75rem to `--text-4xl` `clamp(2rem, 6vw, 3rem)` — fluid, no per-breakpoint overrides.
- Tight `letter-spacing` on display sizes (`-0.02em`), generous `line-height` on questions (1.3) and body (1.6).

### 2.4 Applied trends, chosen for substance not novelty

Each earns its place; none is applied for its own sake:
- **Bottom-sheet patterns** on mobile for leaderboard and rating — thumb-reachable, native-feeling.
- **Container queries** for category cards so they adapt to their slot, not the viewport.
- **View Transitions API** for phase changes — replaces the three `setTimeout` hacks with something declarative; progressively enhanced.
- **`dvh` units** so mobile Safari's collapsing toolbar doesn't clip the layout.
- **`light-dark()` / `color-scheme`** for theming with a manual override.
- **Fluid type + space** via `clamp()` — fewer breakpoints, better intermediate widths.
- Explicitly **rejected**: glassmorphism (muddies the category accents against the dark ground), heavy parallax (motion + performance cost for no gain here), skeuomorphic depth (fights the flat jewel-tone accents).

---

## Part 3 — New feature: play modes

Add a mode step before category selection. Mode is persisted and changeable from the game screen.

**Proposed mapping (for user review):**

| Category | 💞 Pareja | 🎉 Amigos | 💼 Equipo |
|---|---|---|---|
| ✨ La Chispa | ✅ | ✅ | ✅ |
| 🌱 Las Raíces | ✅ | ✅ | ✅ |
| 🪞 El Espejo | ✅ | ✅ | — |
| 🔥 El Fuego | ✅ | — | — |
| 🌑 La Sombra | ✅ | ✅ | — |
| 🎭 El Absurdista | ✅ | ✅ | ✅ |
| 🎵 La Cinta de las Décadas | ✅ | ✅ | ✅ |
| 🗺️ Atlas de Mí | ✅ | ✅ | ✅ |
| ⚖️ El Dilema | ✅ | ✅ | ✅ |

Implemented as a `modes: ['couples','friends','team']` array on each entry in the `categories` metadata object in `src/assets/questions.js` — data-driven, so retuning the mapping is a one-line edit. `CategorySelector` filters on it (requires fixing V9 first).

---

## Part 4 — Documentation & progress tracking

A **`docs/` folder is created in the repo at the start of Phase 0** and is a first-class deliverable, not an afterthought.

```
docs/
├── README.md            # index — what each doc is, how to navigate
├── redesign-plan.md     # this plan, committed as the source of truth
├── PROGRESS.md          # phase-by-phase status log — updated at every phase completion
├── design-system.md     # tokens reference: palette, type scale, spacing, radii, motion
└── decisions.md         # running log of decisions and their rationale (ADR-lite)
```

**`docs/PROGRESS.md` structure** — one section per phase, each carrying:
- Status: `Not started` / `In progress` / `✅ Complete (YYYY-MM-DD)`
- Checklist of that phase's deliverables, ticked as they land
- **What actually changed** — files added/modified/deleted
- **Deviations from plan** — anything done differently, and why
- **Verification performed** — commands run, screenshots captured, results
- **Follow-ups deferred** — anything punted and where it went

**This is a hard rule for the implementation:** no phase is considered done until `docs/PROGRESS.md` is updated with that phase's outcome and `docs/design-system.md` reflects any token changes. Each phase's final commit includes the docs update. If a phase deviates from this plan, `docs/redesign-plan.md` is amended in the same commit so the plan never drifts from reality — the failure mode this repo already demonstrates with `CLAUDE.md` (I8).

---

## Part 5 — Implementation phases

### Phase 0 — Docs, guardrails & cleanup (~0.5 day)
Per CLAUDE.md, verification infrastructure lands first.

- **Create `docs/`** with all five files; commit this plan as `docs/redesign-plan.md` and scaffold `PROGRESS.md` with all six phases marked `Not started`.
- Add Prettier, Vitest + `@testing-library/react`; `test` and `format` scripts.
- Fix ESLint's stale `react: { version: '18.3' }` → `'19.0'`.
- GitHub Actions: lint + test + build, actions SHA-pinned with version comments, `persist-credentials: false`, zizmor-clean. Dependabot with 7-day cooldowns and grouped updates.
- Remove `@mui/*`, `@emotion/*`, `@fontsource/roboto`; add `prop-types` explicitly.
- Delete `src/assets/sea.css`, `src/App.css`, dead exports (`initialQuestions`, `decadesTapeKO`, `shadowExpansion`), `styles.container`, `styles.question`; gitignore and remove `dist/`.
- Fix `index.html`: `lang="es"`, real `<title>`, `<meta name="description">`, `theme-color`, replace the `vite.svg` favicon, add web-app-capable meta.
- Rewrite `CLAUDE.md` against reality (four phases, no MUI, correct question counts). (I8)

**Deliverable:** green CI on a clean tree, ~300KB of dependencies gone, `docs/` live.

### Phase 1 — Design system foundation (~1.5 days)
The unblocking phase — nothing responsive is possible before it.

- `src/styles/tokens.css` — every color, space, radius, shadow, type-scale, and motion value as a custom property; dark (primary) + light blocks.
- `src/styles/reset.css` — modern reset replacing Vite's `index.css`.
- Self-hosted Fraunces + Inter variable fonts, subset, preloaded.
- Grain overlay on `--bg` (inline SVG, no network request).
- Migrate `src/styles/styles.js` → colocated `*.module.css` per component. **Delete `styles.js`.**
- Shared primitives: `<Screen>` (one `--content-max`), `<Button>` (variants, token-driven `:hover`/`:active`), `<Card>`.
- **Write `docs/design-system.md`** documenting every token and its intended use.

**Deliverable:** the app on the new "Velvet Hour" palette and type, zero inline style objects, one place to change any visual value.

### Phase 2 — Mobile-first responsive rebuild (~2 days)
- **PlayerSetup:** single-column stack; side-by-side at ≥768px. Real `<form>`, visible labels, inline errors replacing both `alert()`s, Enter-to-submit. (B3, B6)
- **CategorySelector:** `auto-fit minmax(150px, 1fr)` grid + container queries; compact card variant on phones. (V4)
- **QuestionCard:** fluid padding and type; no fixed 700px; the question set in Fraunces at display size. (V3)
- **RatingPanel:** equal-width segmented control, numeral + single star, ≥44×44px targets; bottom sheet on mobile. (V7)
- **Leaderboard:** dismissible sheet/dialog preserving phase, per-`scoringType` score normalization, generated medals. (I3, V8)
- **CountdownTimer:** fluid ring sizing; recolor to `--accent` brass with `heat` red only in the final 10s.
- Delete all JS hover handling; hover/active in CSS. Fixes the `e.target` bug. (I2)
- Replace `window.confirm` with a styled modal; a styled toast for exhausted categories. (B6)
- Semantic pass: `<h2>`-as-body-text removed, heading levels sane. (I5)
- `dvh` units; avatar sizing from tokens; `.logo` classes gone. (V6)

**Deliverable:** every screen usable and correct from 320px to 1920px, in both themes.

### Phase 3 — Feedback states & flow completeness (~0.5 day)
- End-of-game screen with final standings and a replay action. (I4)
- Empty states for every category-exhausted path (no `alert()` remains anywhere).
- Theme toggle (dark default, light alternate, persisted).
- View Transitions replacing the three `setTimeout` fades, with fallback. (I1)

**Deliverable:** no dead ends; `rg "alert\(|confirm\(" src/` returns nothing.

### Phase 4 — i18n, ES + EN (~2 days, content-bound)
- `react-i18next` (justified: the only mature option for pluralization, interpolation, and language detection; hand-rolling is strictly worse).
- `src/locales/{es,en}/{ui,categories}.json`; extract every UI string.
- Language switcher in the header; persisted to localStorage; `<html lang>` updated at runtime.
- **Question content:** restructure entries from `[["Question"],["Explanation"]]` to `{ id, es: {q, explanation}, en: {q, explanation} }`. Translate all ~245 text questions to Spanish (`decadesTape`'s 180 song entries are `[year, artist, title]` and need no translation — only their generated chrome).
- Resolves the "Skip" string and the content/UI mismatch. (B5, I5)

**Deliverable:** fully coherent play in either language, switchable mid-game.

### Phase 5 — Play modes + state refactor (~1 day)
- `modes` array on each `categories` entry; a mode-selection screen before category selection; mode persisted and changeable mid-game.
- `CategorySelector` consumes its `categories` prop and filters on mode. (V9)
- Extract `useGame` reducer from `App.jsx`; `players` becomes an **array** with a localStorage migration from the current `{player1, player2}` shape. Leaderboard and turn logic generalize to N while the UI stays at 2. (I7)

**Deliverable:** three play modes; N-player-ready state; `App.jsx` under 150 lines.

---

## Part 6 — Priorities

| Priority | Items | Rationale |
|---|---|---|
| **P0** | Phase 0 + Phase 1 | Nothing else can be built correctly first. Removes dead weight, the latent `sea.css` bomb, and establishes the docs discipline. |
| **P1** | Phase 2 | The app is currently broken on its most likely device. |
| **P2** | Phase 3 | Small, high-visibility; removes the last native dialogs and the missing ending. |
| **P3** | Phase 4 | Highest user-visible value once the app is usable, but content-bound and independently shippable. |
| **P4** | Phase 5 | New capability; depends on the refactors above. |

---

## Part 7 — Success metrics

**Automated, enforced in CI:**
- Lighthouse mobile (throttled, emulated Moto G): Performance **≥95**, Best Practices **≥95**.
- Bundle: JS **≤120KB gzipped** (from a baseline measured at Phase 0 after MUI removal); CSS ≤15KB gzipped; fonts ≤60KB subset.
- Zero ESLint warnings — CLAUDE.md's zero-warnings policy.
- Test coverage ≥70% on `useGame` and all components; every error path exercised.
- Zero inline `style={{...}}` objects remaining outside dynamic per-player color values (`rg` assertion).
- Zero `alert()` / `confirm()` remaining (`rg "alert\(|confirm\(" src/` returns nothing).

**Manual acceptance:**
- Full playthrough at 320px, 375px, 768px, 1440px with no horizontal scroll and no clipped content.
- Full playthrough in both dark and light themes; no unstyled or off-palette element.
- Language switch mid-game preserves all state.
- Every one of the 9 categories playable to exhaustion without an unhandled state.
- Content edges do not shift between phase transitions (V3 regression check).

**Documentation (hard gate):**
- `docs/PROGRESS.md` updated with outcome, deviations, and verification for every completed phase.
- `docs/design-system.md` matches `tokens.css` exactly.
- `CLAUDE.md` accurate as of the last commit.

**Product signals (no analytics today — instrument in Phase 5 if wanted):**
- Setup completion rate; questions per session; leaderboard opens per session; mode distribution.

---

## Files touched

**Created:** `docs/{README,redesign-plan,PROGRESS,design-system,decisions}.md`, `src/styles/{tokens,reset,themes}.css`, `src/components/**/*.module.css`, `src/components/primitives/{Screen,Button,Card,Modal,Toast,Sheet}.jsx`, `src/hooks/useGame.js`, `src/locales/{es,en}/*.json`, `src/i18n.js`, `src/components/{ModeSelector,GameOver}.jsx`, `.github/workflows/ci.yml`, `.github/dependabot.yml`, `vitest.config.js`, `.prettierrc`
**Deleted:** `src/assets/sea.css`, `src/App.css`, `src/index.css`, `src/styles/styles.js`, `dist/`
**Modified:** `index.html`, `src/main.jsx`, `src/App.jsx` (heavily reduced), all 9 components, `src/data/options.js`, `src/assets/questions.js` (metadata + content restructure), `package.json`, `eslint.config.js`, `CLAUDE.md`

---

## Verification

After each phase:
1. `npm run lint` — zero warnings.
2. `npm run test`.
3. `npm run dev`, then drive the running app in Chrome (via the browser tools) at 375×667 and 1440×900: complete a full game — setup → mode → category → question → rating → leaderboard → game over — capturing screenshots at each phase in both themes.
4. `npm run build && npm run preview`; Lighthouse mobile against the preview server; assert the metric thresholds above.
5. **Update `docs/PROGRESS.md`** with status, changed files, deviations, and the verification output above. Commit docs with the phase.

**Total estimate: ~7.5 days**, of which Phase 4's question translation is the largest single content block and the most parallelizable.
