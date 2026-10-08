# 0027. IconButton looks and behaves like Button

- **Status:** Accepted
- **Date:** 2026-10-08
- **Decided by:** Ollie (owner)
- **Principles:** P5, P2, P6, P4, P7

## Context

IconButton had its own colour tokens, and they had drifted from Button's ([#130](https://github.com/common-origin/common-origin-design-system/issues/130)):

| Variant | State | Button | IconButton (rendered) |
|---|---|---|---|
| secondary | rest | #dee2e6 | #e9ecef |
| secondary | hover | #ced4da | #dee2e6 |
| secondary | pressed | #adb5bd | #16191C |
| naked | pressed | #dee2e6 | #16191C |
| naked | disabled | transparent | #dee2e6 |

The pressed and disabled rows were bugs. `IconButton.tsx` used primary's tokens for every variant in those states, so a pressed secondary or naked IconButton turned near-black while its icon stayed #212529, about 1.2:1. Secondary's own pressed token (#f8f9fa) was lighter than its hover colour.

The two components differed in other ways as well:
- **Motion:** Button transitioned background and colour over 150ms (`motion.hover`). IconButton transitioned everything over 200ms.
- **Reduced motion:** IconButton turned its transition off, although decision [0015](0015-reduced-motion.md) keeps colour transitions.
- **High contrast:** IconButton had a `prefers-contrast: high` rule. `high` isn't a valid value, so browsers never matched it.
- **Links:** with `url`, Button can render a real link, but IconButton navigated in JavaScript.

## Decision

1. **IconButton's variants use Button's colours in every state.** IconButton reads `component.button.*`, the same tokens Button reads. Secondary becomes #dee2e6, then #ced4da on hover, then #adb5bd pressed. Naked stays transparent when disabled.
2. **IconButton's own colour tokens are deprecated.** These are `component.iconButton.{primary,hover,active,disabled}.backgroundColor` and `component.iconButton.variants.{secondary,naked}.*`. They keep their values until they're removed in 3.0 (P7, [#99](https://github.com/common-origin/common-origin-design-system/issues/99)).
3. **IconButton uses Button's transition, `motion.hover`.** It's colour-only, so under 0015 it needs no reduced-motion rule, and IconButton's rule is removed.
4. **IconButton's `prefers-contrast: high` rule is removed.** It never ran. Forced-colours support for every control is decided in [#155](https://github.com/common-origin/common-origin-design-system/issues/155).
5. **IconButton's `url` will render a real link, as Button's does.** That's [#154](https://github.com/common-origin/common-origin-design-system/issues/154).
6. **No `accent` or `danger` IconButton** until a product needs one (P4).
7. **IconButton's icon stays one step larger** than a Button's at the same size. This is an Exception: an icon-only button needs a larger glyph to fill the same square.

Size, radius and the focus ring keep their IconButton tokens. Their values already match Button's.

## Consequences

- Every secondary IconButton is one step darker at rest and on hover. Pressed secondary and naked IconButtons no longer turn near-black, and a disabled naked IconButton has no fill.
- `IconButton.test.tsx` compares IconButton's rules with Button's for each variant and state, so the two can't drift apart again.
- Twelve IconButton colour tokens are deprecated, and `componentTier.test.ts` fails if anything reads them.
