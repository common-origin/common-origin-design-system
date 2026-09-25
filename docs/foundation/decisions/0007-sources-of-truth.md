# 0007. Which source answers which question

- **Status:** Accepted
- **Date:** 2026-09-25
- **Decided by:** Ollie (owner)
- **Principles:** P3, P7

## Context

The April 2026 guidance told agents to treat "the live Common Origin site" as ground truth for visual decisions, without saying which site or giving a URL. Products built on the system can make their own choices (for example, heavier headings, per [0004](0004-heading-weights.md)), so a product can't be the authority for system values.

## Decision

| Question | Authority |
|---|---|
| Why we do something | `docs/foundation/` — principles and decisions |
| Exact values | Design tokens (`src/tokens/`, compiled to `src/styles/tokens.json`) |
| Component behaviour and API | Component source (`src/components/`) |
| Look and feel | The docs site, https://common-origin-design-system.vercel.app/. Screenshots of it may be used as visual reference. |

When these disagree, the foundation says which is intended. If it doesn't, raise an open question for the owner rather than picking one.

## Consequences

- Guidance that pointed at "the live site" now points here.
- A difference between a product and the system isn't a bug unless the foundation says the product should match.
