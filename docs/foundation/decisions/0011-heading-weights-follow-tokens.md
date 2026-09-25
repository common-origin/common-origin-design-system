# 0011. System headings follow the typography tokens; products may go heavier

- **Status:** Accepted
- **Date:** 2026-09-25
- **Decided by:** Ollie (owner)
- **Principles:** P5
- **Supersedes:** [0004](0004-heading-weights.md)

## Context

[0004](0004-heading-weights.md) said every heading token, `display` through `h6`, is weight 700. That was wrong. Copilot flagged it on PR #23. The live typography tokens are:

| Tokens | Weight |
|---|---|
| `display`, `h1`, `h2`, `h3`, `h4` | 700 |
| `h5`, `h6` | 500 |
| `body` | 400 |

The owner's ruling on headings was "go with what's live". The April 2026 brand documents' "800–900" and "medium weight is a brand violation" claims were already discarded by 0004.

## Decision

- **What's live is the rule.** System heading weights are the typography tokens as they are: `display` to `h4` at 700, `h5` and `h6` at 500, body at 400. The contrast between heavy display-level headings and regular body text is the typographic signature.
- A product may use heavier heading weights as a **site-specific choice**. That is an exception for the product, not a system rule, and it doesn't make the system's tokens wrong.
- Changing any heading weight (for example, moving `h5`/`h6` to 700) is a new decision for the owner.

## Consequences

- Guidance that cited 0004 for heading weights now cites this record.
- Products that go heavier need to load the matching Inter weights themselves (see [usage](../usage.md#fonts)).
