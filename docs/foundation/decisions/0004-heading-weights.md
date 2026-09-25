# 0004. System headings follow the typography tokens; products may go heavier

- **Status:** Accepted
- **Date:** 2026-09-25 (corrected the same day — see below)
- **Decided by:** Ollie (owner)
- **Principles:** P5

## Context

The April 2026 brand documents stated that page titles use weight 800–900 and that any medium-weight heading is a brand violation. The live typography tokens are:

| Tokens | Weight |
|---|---|
| `display`, `h1`, `h2`, `h3`, `h4` | 700 |
| `h5`, `h6` | 500 |
| `body` | 400 |

The docs site renders these values. The personal site may use heavier weights.

## Decision

- **What's live is the rule.** The system's heading weights are the typography tokens as they are today: `display` to `h4` at 700, `h5` and `h6` at 500. Body stays at 400. The contrast between heavy display-level headings and regular body text is the typographic signature.
- A product may use heavier heading weights as a **site-specific choice**. That is an exception for the product, not a system rule, and it doesn't make the system's tokens wrong.
- Moving `h5`/`h6` to 700 (or any other weight change) would be a new decision by the owner.

## Consequences

- The "800–900" and "medium weight is a brand violation" claims have been removed from the `.github/` guidance.
- Products that go heavier need to load the matching Inter weights themselves (see [usage](../usage.md#fonts)).

## Correction

The first version of this record said every heading token, including `h5` and `h6`, was 700. That was wrong: only `display` to `h4` are. Copilot flagged it on PR #23. The owner's ruling was "follow what's live", so the record now states the live values.
