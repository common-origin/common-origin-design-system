# 0012. Shadows may use pure black

- **Status:** Accepted
- **Date:** 2026-09-26
- **Decided by:** Ollie (owner)
- **Principles:** P1, P3

## Context

The visual language reserves pure black `#000000` for the logo; UI uses `#212529` or darker tokens. When the component overlays moved to the near-black overlay tokens ([#57](https://github.com/common-origin/common-origin-design-system/pull/57), part of [#34](https://github.com/common-origin/common-origin-design-system/issues/34)), the shadow tokens were the only remaining pure black: `base.shadow.1`–`6` and `semantic.elevation.*` (for example `0 1px 3px 0 rgba(0, 0, 0, 0.1)`). Two options were considered: exempt shadows, or move them to near-black (`rgba(33, 37, 41, …)`).

## Decision

Shadows are an **exception** to the pure-black rule. The shadow tokens keep `rgba(0, 0, 0, …)`. The rule is about pure black used as a colour in UI chrome; at the 4–25% opacity of a soft shadow, the difference from near-black isn't perceptible, and pure-black alpha is the conventional shadow colour.

The exception covers shadows only (`box-shadow` values from `base.shadow.*` and `semantic.elevation.*`). Backgrounds, overlays, borders and text still use near-black tokens.

## Consequences

- `visual-language.md` lists shadows as an Exception to the pure-black rule, linking here.
- Components must still take shadows from the elevation tokens, never hard-code them (P3).
- Revisiting this means a new decision that supersedes this one, plus a token-value change to every shadow.
