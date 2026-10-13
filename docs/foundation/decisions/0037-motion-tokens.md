# 0037. Motion tokens: purpose-named easing, exits accelerate, property-named transitions

- **Status:** Accepted
- **Date:** 2026-10-13
- **Decided by:** Ollie (owner)
- **Principles:** P6, P3, P4, P7
- **Settles:** the motion details that [0031](0031-semantic-token-grammar.md) §4 left to #195, including its open question on exits
- **Issue:** [#195](https://github.com/common-origin/common-origin-design-system/issues/195), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

0031 named motion tokens by job: `duration.{instant, fast, moderate, slow}`, `easing.{standard, decelerate, accelerate}`, `transition.{feedback, focus, press, enter, exit}` and `motion.distance.*`. It left the values, the new tokens and one visual question to #195: today every exit eases out, so should exits accelerate?

A survey of the components, before this change:
- Durations already match the scale except `instant` (`fast` 150, `normal` 200, `slow` 300ms).
- Entrances are keyframe animations, and every exit uses one shared fade at `fast` with `easeOut`.
- Only Dropdown's menu travels a fixed distance (`space.200`).
- About ten places use `transition: all`.

## Decision

1. **Only the tokens something uses** (P4), signed off with their values:
   - `motion.duration.instant` (0ms), for reduced motion;
   - `motion.easing.accelerate` (`ease-in`), beside `standard` (`ease-in-out`) and `decelerate` (`ease-out`);
   - `motion.distance.sm` (0.5rem), Dropdown's offset.

   There's no medium distance and no `transition.enter` or `exit` composite: entrances and exits are keyframe animations, so nothing would read them.
2. **Renames at equal values** (0031): `duration.normal` → `duration.moderate`, `easing.easeInOut` → `easing.standard`, `easing.easeOut` → `easing.decelerate`, `motion.hover` → `motion.transition.feedback`, `motion.focus` → `motion.transition.focus` and `motion.interactive` → `motion.transition.press`. The old names are deprecated and removed in 3.0.
3. **Exits accelerate.** The shared exit fade uses `easing.accelerate`, so things leaving speed up as they go. This is a visible change to the exits of Modal, Sheet, ActionSheet and Alert. Entrances and responses to input still decelerate.
4. **No `transition: all`.** Components list the properties they animate, using the duration and easing tokens, so nothing else changes visually. The `transition: all` composites (`motion.transition.fast`, `normal` and `slow`) are deprecated, with no single replacement, and removed in 3.0. A test fails if a component uses `transition: all`.
5. **The reduced-motion mode is its own issue** ([#226](https://github.com/common-origin/common-origin-design-system/issues/226)), blocked by #41. Components keep their `reducedMotion` fallbacks until it lands.

## Consequences

- This is a deliberately minimal pass. The owner plans a dedicated motion-system piece for the design system and the token library ([#227](https://github.com/common-origin/common-origin-design-system/issues/227)). New motion vocabulary (more distances, enter and exit composites, expressive curves, choreography) belongs there, not in passing.
- Decision 0005's rule that motion explains change is unchanged. Exits now also say "leaving" through their easing.
