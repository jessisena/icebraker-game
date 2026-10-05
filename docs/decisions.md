# Architecture Decision Record

A running log of decisions and their rationale, newest-first.

---

## 2026-10-04 — Custom mode, Good/Neutral/Bad votes, Lapis Night identity

**Decision:**
- Add a fourth mode, **Custom**, for 2–6 players. The group picks any subset of the 9 categories (at least 1), including `heat`. Choosing Custom from "Change mode" mid-game reopens the picker with the current selection ticked.
- Replace 1–5 stars and the 0/1/2 point buttons with one vote everywhere: **Good = 2, Neutral = 1, Bad = 0**. The leaderboard ranks by total points, then fewer turns, and shows a 👍/😐/👎 tally.
- Redesign player identity as a **card deck** of six **Arcana emblems** (eye, key, hand, wheel, crown, moon). Glyphs and colors are unique per player.
- Re-theme the app from Velvet Hour to **Lapis Night** (ink-blue ground, bone text, brass accent). Player colors are stored as `var(--player-*)` tokens so the light theme can use darker shades that pass 4.5:1.
- `STORAGE_VERSION` in `src/data/ratings.js` gates saved data. On a mismatch, ratings are cleared and saved avatars/colors are remapped by index; players and mode are kept.

**Why:**
- Custom mode lets groups play only the categories that suit them, without a fourth hard-coded `modes` list.
- Three choices are quicker to agree on aloud than five stars. One scale for every category removes the special point UI. 2/1/0 matches the scale music trivia and Atlas already used.
- Turns differ by at most one under round-robin, so ranking by total points is fair and easier to read than a 0–2 average.
- Fixed hex player colors failed contrast on the light theme (saffron 1.69:1). Tokens let each theme supply a readable shade with no per-theme logic in components.

**Alternatives rejected:**
- +1/0/−1 net score: negative totals feel punishing in a party game.
- Keep 0/1/2 point buttons for music and Atlas: two scoring systems for one leaderboard.
- Adding `'custom'` to every category's `modes`: Custom is a per-game selection, not a property of a category.
- Converting old 1–5 star ratings to the new scale: migration code for a game in progress isn't worth keeping around.

---

## 2026-09-13 — 2–6 players for Friends & Team; Couples stays at 2

**Decision:** Implement N-player support (2–6) for Friends and Team modes. Couples stays locked at exactly 2. Mode selection moves to the first onboarding step (before players are configured) so the mode can gate the roster size. Group consensus rating: all non-answering players agree on one score, entered with a single tap. Turn rotation is round-robin `(currentPlayer + 1) % players.length`.

**Supersedes:** "2026-09-04 — Stay 2-player, array-shape state for future."

**Why:**
- The array-based `players` state from Phase 5 made the logic changes minimal — session restore, rating seeding, and leaderboard ranking were already N-generic or close to it.
- Mode-first onboarding is the natural place to gate player count: the mode determines which count is valid, so it must be known before the roster is built.
- Single-screen roster (accordion rows, add/remove) is simpler than a separate wizard step per player — it scales from 2 to 6 without multiplying step count.
- Consensus-one-tap rating keeps the same UX flow regardless of group size. Per-player individual scoring would require N-1 additional taps per turn.

**Alternatives rejected:**
- Separate wizard step per player (up to 6 steps for Friends/Team): rejected for UX complexity and test surface area.
- Each player rates individually and the average is stored: adds N-1 taps per turn; consensus aloud is idiomatic for a party game.
- All three modes allow 2–6: Couples is explicitly intimate; allowing 3-player "Couples" is semantically wrong.

---

## 2026-09-04 — Drop MUI, adopt CSS Modules + custom properties

**Decision:** Remove `@mui/material` and all related packages. Style with CSS custom properties (tokens) and colocated CSS Modules per component.

**Why:** MUI was installed but never imported — zero usage confirmed by `rg`. The entire UI was hand-written inline style objects. Inline styles cannot hold media queries, `:hover`, `:focus-visible`, or `prefers-reduced-motion` — the hard structural constraint on any responsive redesign. CSS Modules + tokens provide real cascade, real media queries, and a single source of truth for design values.

**Alternatives rejected:**
- Stay on inline styles: structurally impossible to go responsive.
- Actually adopt MUI: large rewrite, large bundle, no current advantage over a well-structured CSS system for this scale.

---

## 2026-09-04 — Dark-primary theme ("Velvet Hour" palette)

**Decision:** Dark theme is the default. Light is an alternate toggle. Palette: aubergine ground, warm ivory text, electric violet brand, aged-brass accent.

**Why:** The game is played at night, two people sharing a single phone. A dark ground is contextually correct and makes the nine category jewel-tone accents glow rather than shout. The current blue-grey palette reads as a productivity tool. Violet + brass is intimate without being saccharine.

**Note:** Palette was chosen purely on aesthetics — no contrast compliance requirements for this project.

---

## 2026-09-04 — Stay 2-player, array-shape state for future

**Decision:** Keep the 2-player experience. Refactor the `players` state shape from `{player1, player2}` to an array so N-player is a later drop-in.

**Why:** Building N-player UI now would expand scope beyond what's needed and introduce complexity before the responsive rebuild is stable. The array shape costs nothing and removes the refactor from the future critical path.

---

## 2026-09-04 — Full i18n from the start (react-i18next)

**Decision:** Ship Spanish + English in Phase 4. UI strings extracted to `src/locales/{es,en}/ui.json`. All ~245 text questions translated to Spanish. `react-i18next` as the i18n library.

**Why:** The current state — Spanish UI chrome + English question content — is the single most jarring first-time experience. `react-i18next` is the only mature option with pluralization, interpolation, language detection, and namespace support; alternatives are hand-rolled and worse.

---

## 2026-09-04 — Play modes as category metadata, not separate question sets

**Decision:** Add a `modes: ['couples','friends','team']` array to each category's metadata object in `questions.js`. `CategorySelector` filters on it. Mode stored in localStorage.

**Why:** Data-driven — retuning the mapping is a one-line edit per category. No duplicate question sets, no extra files, no runtime branching beyond the filter. The mode selector becomes a step before category selection.
