# 0003. Blue is for links, focus, and deliberate highlight

- **Status:** Accepted
- **Date:** 2026-09-25
- **Decided by:** Ollie (owner)
- **Principles:** P1

## Context

The April 2026 brand documents said blue was for links and interactive affordance only, and must never be used as brand expression. The tokens define a full blue interactive palette (`background.interactive`, `-hover`, `-active`, `-subtle`), used by the `emphasis` button, ProgressBar, TabBar, Badge, selected chips, and the AgentInput working ring.

## Decision

Blue (`#0265DC` and its token family) is allowed for:

- links,
- focus indication,
- deliberate highlight — for example, the `emphasis` button ([0002](0002-button-variants.md)).

This is a guideline, not an absolute. Blue must carry meaning; it is never decoration or filler.

## Consequences

- Existing blue usages are not violations by default. Judge new ones by whether the blue communicates something.
- Hard-coded blues (for example, Chip's hover values `#CAE8FF` and `#B5DEFF`) should move to tokens under P3.
- How blue relates to selected and emphasised states across Button, Chip, and TabBar is still open: [#21](https://github.com/common-origin/common-origin-design-system/issues/21).
