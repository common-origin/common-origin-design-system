# 0010. AgentInput's working ring is a temporary exception

- **Status:** Accepted (temporary — to be revisited in #22)
- **Date:** 2026-09-25
- **Decided by:** Ollie (owner)
- **Principles:** P1, P6

## Context

`AgentInput` shows an animated ring while it's working: a rotating blue conic gradient built from the `background.interactive` token family. The visual language says there are no decorative gradients in UI chrome. The agentic components need more work overall, because the system serves two primary users, humans and agents ([users](../users.md)).

## Decision

The working ring stays as it is, as an **exception** to the no-decorative-gradients rule, until the agentic component work in [#22](https://github.com/common-origin/common-origin-design-system/issues/22) decides whether it becomes a system pattern (tokenised, reduced-motion aware) or is replaced.

## Consequences

- Agents and contributors should not remove or restyle the ring outside #22.
- Any change to it should respect `prefers-reduced-motion` ([0005](0005-motion.md)); the component already has a reduced-motion path.
- When #22 settles it, a new decision supersedes this one.
