# Preguntados

A 2–6 player question game built with React 19 + Vite. Players take turns answering randomised questions
from themed categories; the rest of the group rates the response by consensus.

**Live:** https://jessisena.github.io/icebraker-game/

## How it works

1. **Pick a mode** — Couples (2 players), Friends, or Team
2. **Set up the roster** — 2–6 players, each with a name, avatar, and colour
3. **Take turns** — the active player picks a category, reads the question, and answers
4. **Rate** — all other players agree on a score (one tap); turn passes round-robin
5. **Leaderboard** — players ranked by average rating at game over

## Categories

Nine themed categories including personal questions, philosophical dilemmas, creative challenges,
music trivia, and more — spanning over 245 questions and 180 songs.

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
