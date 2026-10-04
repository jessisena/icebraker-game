# Design System — Question Randomizer

> **Canonical source:** `src/styles/tokens.css`
> This document must match `tokens.css` exactly after any token change.

---

## Themes

Dark is the **primary theme** (the game is played at night). Light ships as an alternate toggle.
Theme is controlled by a `data-theme` attribute on `<html>` — `"dark"` (default) or `"light"`.

---

## Color tokens

### Palette name: "Lapis Night"

The mood: an old star atlas. Deep ink-blue ground, bone-coloured type, brass-foil details,
jewel-tone players. Dark ("Lapis Night") is primary; the light alternate is "Lapis Day".

Contrast ratios below are WCAG 2.x relative-luminance ratios. Targets: ≥4.5:1 for text,
≥3:1 for UI marks (borders of selected states, icons, rings, swatches).

**Dark theme — Lapis Night (default)**

| Token | Value | Role | vs `--bg` | vs `--surface` |
|---|---|---|---|---|
| `--bg` | `#121A2E` | Page ground — deep ink blue | | |
| `--surface` | `#1C2640` | Cards, raised panels | | |
| `--surface-raised` | `#26314F` | Hover state, nested surfaces | | |
| `--border` | `#34406A` | Hairlines, card edges (decorative) | 1.72 | 1.49 |
| `--text` | `#EEE6D6` | Primary text — bone | 13.95 | 12.08 |
| `--text-muted` | `#9AA3BD` | Secondary copy, metadata | 6.88 | 5.96 |
| `--ink` | `#0A0F1C` | Base for scrims and drop shadows (mixed with `transparent`) | | |

**Light theme — Lapis Day (alternate)**

Defined twice in `tokens.css` with identical values: under `@media (prefers-color-scheme: light)`
(when no `data-theme` is set to dark) and under `:root[data-theme='light']`.

| Token | Value | Role | vs `--bg` | vs `--surface` |
|---|---|---|---|---|
| `--bg` | `#EEF1F7` | Page ground — pale chart paper | | |
| `--surface` | `#FFFFFF` | Cards | | |
| `--surface-raised` | `#E1E6F0` | Wells, inputs | | |
| `--border` | `#C9D1E0` | Hairlines (decorative) | 1.36 | 1.54 |
| `--text` | `#121A2E` | Primary text | 15.30 | 17.31 |
| `--text-muted` | `#55607A` | Secondary copy | 5.56 | 6.29 |

`--ink` is not overridden: scrims stay dark in both themes.

**Brand**

| Token | Dark | Light | Role |
|---|---|---|---|
| `--brand` | `#6E8BF5` | `#3451C7` | Primary actions, active states — lapis blue |
| `--brand-hover` | `#8FA6F8` | `#2C46B0` | Hover |
| `--brand-soft` | `rgba(110,139,245,.12)` | `rgba(52,81,199,.12)` | Tinted fills, selected chips |
| `--on-brand` | `#121A2E` | `#FFFFFF` | Label colour on `--brand` / `--brand-hover` fills |
| `--accent` | `#C9A45C` | `#7A5C24` | Timers, medals, star marks — brass |
| `--accent-soft` | `rgba(201,164,92,.12)` | `rgba(122,92,36,.12)` | |

Glows on brand elements use `color-mix(in srgb, var(--brand) N%, transparent)` so they follow
the theme.

| Pair | Dark | Light |
|---|---|---|
| `--brand` vs `--bg` / `--surface` | 5.50 / 4.77 | 5.90 / 6.67 |
| `--accent` vs `--bg` / `--surface` | 7.38 / 6.39 | 5.49 / 6.21 |
| `--on-brand` on `--brand` | 5.50 | 6.67 |
| `--on-brand` on `--brand-hover` | 7.40 | 8.05 |

White labels on the dark-theme brand fill would be 3.15:1, which is why dark uses an ink label.

**Category accents**

Not overridden in Lapis Day. The category grid reads its colours from the `color` field in
`src/assets/questions.js`; the tokens are used by `DecadeSelector`, the "all" card, the timer
warning and error states (`--cat-heat`).

| Category | Token | Value | Dark vs `--bg` / `--surface` | Light vs `--bg` / `--surface` |
|---|---|---|---|---|
| ✨ spark | `--cat-spark` | `#4FA8E8` | 6.68 / 5.78 | 2.29 / 2.59 |
| 🌱 roots | `--cat-roots` | `#5FB37A` | 6.77 / 5.87 | 2.26 / 2.56 |
| 🪞 mirror | `--cat-mirror` | `#B15FD0` | 4.47 / 3.87 | 3.43 / 3.88 |
| 🔥 heat | `--cat-heat` | `#EE6A45` | 5.59 / 4.84 | 2.74 / 3.10 |
| 🌑 shadow | `--cat-shadow` | `#8C86B8` | 5.13 / 4.44 | 2.99 / 3.38 |
| 🎭 absurdista | `--cat-absurdista` | `#E89A3C` | 7.52 / 6.51 | 2.04 / 2.30 |
| 🎵 decadesTape | `--cat-decadesTape` | `#D96BA0` | 5.41 / 4.68 | 2.83 / 3.20 |
| 🗺️ atlasOfMe | `--cat-atlasOfMe` | `#3FA9A0` | 6.10 / 5.28 | 2.51 / 2.84 |
| ⚖️ dilemma | `--cat-dilemma` | `#A17F72` | 4.78 / 4.14 | 3.20 / 3.62 |
| 🎲 all | `--cat-all` | `#9AA3BD` | 6.88 / 5.96 | 2.22 / 2.52 |

All category accents pass 3:1 on the dark ground. In Lapis Day most fall below 3:1; they are
shown on tinted chips next to text, so they are decorative there, but they should not carry
meaning alone in the light theme.

**Player colors** (6 jewel tones). `src/data/options.js` stores each player colour as its token,
e.g. `var(--player-jade)`, and components apply it inline, so every theme supplies its own shade.

| Name | Token | Dark value | Dark vs `--bg` / `--surface` | Light value | Light vs `--bg` / `--surface` |
|---|---|---|---|---|---|
| Garnet | `--player-garnet` | `#E0525E` | 4.57 / 3.95 | `#C03442` | 4.87 / 5.51 |
| Saffron | `--player-saffron` | `#EDB140` | 9.04 / 7.83 | `#8A6006` | 4.94 / 5.59 |
| Jade | `--player-jade` | `#42B48F` | 6.72 / 5.82 | `#1B7558` | 4.97 / 5.63 |
| Turquoise | `--player-turquoise` | `#3FC1D4` | 8.07 / 6.99 | `#0E7280` | 4.97 / 5.62 |
| Amethyst | `--player-amethyst` | `#A97BF0` | 5.59 / 4.84 | `#7A4FD0` | 4.81 / 5.45 |
| Rose | `--player-rose` | `#EE8FB8` | 7.63 / 6.61 | `#B23F73` | 4.82 / 5.45 |

Dark theme: every player colour passes 3:1 for UI and 4.5:1 as text on `--bg`; on `--surface`,
Garnet (3.95) is below 4.5:1, so Garnet player names on cards meet only the large-text threshold.

Light theme: the darker shades pass 4.5:1 as text on both `--bg` and `--surface`.
On a selected card (filled with the player colour) the glyph and title use `--bg`, which flips with
the theme, so they stay readable on both the light jewel fills and the dark ones.

---

## Typography

*(Populated in Phase 1)*

**Typefaces**
- **Display (questions):** Fraunces — variable, self-hosted, subset, `font-display: swap`
- **UI:** Inter — variable, self-hosted, `font-display: swap`

**Scale (7 steps, fluid via `clamp()`)**

| Token | Value | Use |
|---|---|---|
| `--text-xs` | `0.75rem` | Badges, chips |
| `--text-sm` | `0.875rem` | Secondary labels |
| `--text-base` | `1rem` | Body |
| `--text-lg` | `1.125rem` | Emphasis body |
| `--text-xl` | `1.25rem` | Section titles |
| `--text-2xl` | `clamp(1.375rem, 3vw, 1.5rem)` | Headings |
| `--text-3xl` | `clamp(1.75rem, 4vw, 2rem)` | Section titles, player names |
| `--text-4xl` | `clamp(2rem, 6vw, 3rem)` | Questions (Fraunces) |

---

## Spacing

*(Populated in Phase 1)*

4px base scale:

| Token | Value |
|---|---|
| `--space-1` | `0.25rem` (4px) |
| `--space-2` | `0.5rem` (8px) |
| `--space-3` | `0.75rem` (12px) |
| `--space-4` | `1rem` (16px) |
| `--space-5` | `1.25rem` (20px) |
| `--space-6` | `1.5rem` (24px) |
| `--space-8` | `2rem` (32px) |
| `--space-10` | `2.5rem` (40px) |
| `--space-12` | `3rem` (48px) |
| `--space-16` | `4rem` (64px) |

---

## Radii

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `6px` | Chips, small elements |
| `--radius-md` | `10px` | Buttons, inputs |
| `--radius-lg` | `14px` | Cards |
| `--radius-xl` | `18px` | Outer containers |
| `--radius-full` | `9999px` | Pills, round swatches |

---

## Shadows

*(Dark theme — depth via surface steps + border; shadows minimal)*
*(Light theme — three steps)*

| Token | Light value | Dark value |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(18,26,46,.08)` | none |
| `--shadow-md` | `0 4px 12px rgba(18,26,46,.12)` | none |
| `--shadow-lg` | `0 8px 24px rgba(18,26,46,.15)` | none |

---

## Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `120ms` | Micro-interactions |
| `--duration-base` | `220ms` | Hover, toggle |
| `--duration-slow` | `380ms` | Phase transitions |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | All transitions |

---

## Layout

| Token | Value | Use |
|---|---|---|
| `--content-max` | `900px` | All screen phases share this max-width |
| `--content-narrow` | `640px` | Question card, rating panel |
| `--avatar-sm` | `36px` | Compact display |
| `--avatar-md` | `48px` | Mobile player headers |
| `--avatar-lg` | `64px` | Desktop player headers |

---

## Primitives

`src/components/primitives/` contains three base components:

| Component | Module | Purpose |
|---|---|---|
| `<Screen>` | `Screen.module.css` | Full-page layout wrapper, `max-width: --content-max`, centers content |
| `<Button variant="primary\|ghost" size="lg?">` | `Button.module.css` | Token-driven button — no JS hover state |
| `<Card>` | `Card.module.css` | Surface card — `--surface` bg, `--border` edge, `--radius-lg` corners |

## CSS Module conventions

Each component owns a colocated `*.module.css`. Token references only — no hard-coded color or spacing values. Dynamic values (player colors, category accents, JS-driven opacity) remain as inline `style={}`.

## Fonts

Self-hosted variable fonts in `public/fonts/`:
- `inter-variable.woff2` — Inter (Latin subset, 48 KB)
- `fraunces-variable.woff2` — Fraunces (Latin subset, 37 KB)

Preloaded in `index.html` via `<link rel="preload" as="font">`. `font-display: swap` prevents invisible text.
