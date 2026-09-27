# 0015. Every motion respects reduced motion; overlays and dismissed alerts animate out

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decided by:** Ollie (owner)
- **Principles:** P2, P5, P6
- **Supersedes:** the proposed reduced-motion clause of [0005](0005-motion.md)

## Context

[0005](0005-motion.md) made motion part of the system and proposed, without accepting, that motion should respect `prefers-reduced-motion`. At the time only IconButton and AgentInput did. The motion audit in [#35](https://github.com/common-origin/common-origin-design-system/issues/35) found three problems:
- hard-coded durations and easings in 15 components
- no reduced-motion fallback for most movement
- overlays and dismissed Alerts that vanished without an exit, because they unmounted immediately

## Decision

- When the user has `prefers-reduced-motion` set, movement (transform, slide, scale, and changes of height or size) becomes a simple fade or an instant change. Colour and opacity transitions are already the reduced form and stay.
- Every component that moves has a reduced-motion fallback. Components use `reducedMotion` from `src/lib/styleUtils.ts`.
- Overlays (Modal, Sheet, ActionSheet) fade out when they close, over `semantic.motion.duration.fast`, instead of unmounting immediately (`usePresence` and `exitAnimation`). While they fade:
  - the panel is inert and hidden from assistive technology
  - the backdrop still catches clicks, so nothing reaches the page behind it
- A dismissed Alert fades out and then collapses its space: `duration.fast` each, 300ms in total, with a fade only under reduced motion. Its `onDismiss` callback fires after it has been removed.

## Consequences

- `src/tokens/motion.test.ts` enforces the rules: token durations of 300ms or less, no linear easing, no literal timings in components, and a reduced-motion fallback in every component that moves.
- The motion rows in [visual-language.md](../visual-language.md) are Enforced. The one exception is AgentInput's working ring ([0010](0010-agentinput-working-ring.md)).
- New motion must include its reduced-motion fallback in the same change.
- `onDismiss` on Alert fires about 300ms after the click (150ms under reduced motion), not on the click.
