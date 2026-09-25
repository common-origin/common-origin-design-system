# 0004. System headings are weight 700; products may go heavier

- **Status:** Superseded by [0011](0011-heading-weights-follow-tokens.md)
- **Date:** 2026-09-25

> **Superseded.** This record's premise was wrong: `h5` and `h6` are weight 500, not 700. The owner's ruling was to follow what's live, so [0011](0011-heading-weights-follow-tokens.md) records the actual token values. This record is kept unchanged as history.
- **Decided by:** Ollie (owner)
- **Principles:** P5

## Context

The April 2026 brand documents stated that page titles use weight 800–900 and that any medium-weight heading is a brand violation. The typography tokens set every heading (`display`, `h1`–`h6`) to 700, and the docs site renders them at 700. The personal site may use heavier weights.

## Decision

- The system's heading tokens stay at **700**. Body text stays at 400. The heavy-heading / regular-body contrast remains the typographic signature.
- A product may use heavier heading weights as a **site-specific choice**. That is an exception for the product, not a system rule, and it doesn't make the system's tokens wrong.

## Consequences

- The "800–900" and "medium weight is a brand violation" claims have been removed from the `.github/` guidance.
- Products that go heavier need to load the matching Inter weights themselves (see [usage](../usage.md#fonts)).
