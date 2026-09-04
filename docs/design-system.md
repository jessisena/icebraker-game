# Design System — Question Randomizer

> **Canonical source:** `src/styles/tokens.css`
> This document must match `tokens.css` exactly after any token change.

---

## Themes

Dark is the **primary theme** (the game is played at night). Light ships as an alternate toggle.
Theme is controlled by a `data-theme` attribute on `<html>` — `"dark"` (default) or `"light"`.

---

## Color tokens

*(Populated in Phase 1)*

### Palette name: "Velvet Hour"

The mood: late evening, low lamplight. Deep aubergine ground, warm ivory type, electric violet action color, aged-brass accent.

**Dark theme (default)**

| Token | Value | Role |
|---|---|---|
| `--bg` | `#191320` | Page ground — deep aubergine-black |
| `--surface` | `#241C2E` | Cards, raised panels |
| `--surface-raised` | `#2F2539` | Hover state, nested surfaces |
| `--border` | `#3D3049` | Hairlines, card edges |
| `--text` | `#F4EDE4` | Primary text — warm ivory |
| `--text-muted` | `#A99BB4` | Secondary copy, metadata |

**Light theme (alternate)**

| Token | Value | Role |
|---|---|---|
| `--bg` | `#F7F1E8` | Page ground — warm ivory paper |
| `--surface` | `#FFFDF9` | Cards |
| `--surface-raised` | `#EFE6D9` | Wells, inputs |
| `--border` | `#DFD2C0` | Hairlines |
| `--text` | `#211A29` | Primary text |
| `--text-muted` | `#6B5F76` | Secondary copy |

**Brand**

| Token | Value | Role |
|---|---|---|
| `--brand` | `#8B5CF6` | Primary actions, active states — electric violet |
| `--brand-hover` | `#A78BFA` (dark) / `#7C3AED` (light) | Hover |
| `--brand-soft` | `#8B5CF61F` | Tinted fills, selected chips |
| `--accent` | `#E0A458` | Timers, medals, star marks — aged brass |
| `--accent-soft` | `#E0A4581F` | |

**Category accents**

| Category | Token suffix | Value |
|---|---|---|
| ✨ spark | `--cat-spark` | `#4FA8E8` |
| 🌱 roots | `--cat-roots` | `#5FB37A` |
| 🪞 mirror | `--cat-mirror` | `#B15FD0` |
| 🔥 heat | `--cat-heat` | `#E8615C` |
| 🌑 shadow | `--cat-shadow` | `#7C8BA3` |
| 🎭 absurdista | `--cat-absurdista` | `#E89A3C` |
| 🎵 decadesTape | `--cat-decadesTape` | `#D96BA0` |
| 🗺️ atlasOfMe | `--cat-atlasOfMe` | `#3FA9A0` |
| ⚖️ dilemma | `--cat-dilemma` | `#A17F72` |

**Player colors** (6 hues, 3×2 picker grid)

| Name | Value |
|---|---|
| Ember | `#E8615C` |
| Amber | `#E89A3C` |
| Moss | `#5FB37A` |
| Sky | `#4FA8E8` |
| Orchid | `#B15FD0` |
| Rose | `#D96BA0` |

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
| `--shadow-sm` | `0 1px 3px rgba(33,26,41,.08)` | none |
| `--shadow-md` | `0 4px 12px rgba(33,26,41,.12)` | none |
| `--shadow-lg` | `0 8px 24px rgba(33,26,41,.15)` | none |

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
