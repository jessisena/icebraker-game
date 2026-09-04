# docs/

Project documentation for the Question Randomizer redesign.

| File | Contents |
|---|---|
| [redesign-plan.md](redesign-plan.md) | Full UI/UX analysis and phased implementation plan — the source of truth |
| [PROGRESS.md](PROGRESS.md) | Phase-by-phase status log; updated at every phase completion |
| [design-system.md](design-system.md) | Token reference: palette, typography, spacing, radii, shadows, motion |
| [decisions.md](decisions.md) | Running log of decisions and their rationale (ADR-lite) |

## Rules

- No phase is considered complete until `PROGRESS.md` is updated with its outcome, deviations, and verification results, committed in the same PR.
- `design-system.md` must match `src/styles/tokens.css` exactly after any token change.
- If implementation deviates from `redesign-plan.md`, amend `redesign-plan.md` in the same commit — the plan must never drift from reality.
