# 0034. Controls take their height from `size.control`, as a minimum

- **Status:** Accepted
- **Date:** 2026-10-11
- **Decided by:** Ollie (owner)
- **Principles:** P2, P3, P5, P9
- **Settles:** the off-grid paddings that [0022](0022-no-component-spacing-tokens.md) left waiting for #129, and the `default` control scale that [0032](0032-token-modes.md) waited on
- **Issue:** [#129](https://github.com/common-origin/common-origin-design-system/issues/129), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

No token says how tall a control is. Every height is padding plus line height plus border, so nothing holds controls on the grid. Measured in the docs site on 2026-10-11:

| Control | Height | How |
|---|---|---|
| Button | 32 / 40 / 48 (default 48) | Padding tokens + line height |
| IconButton | 32 / 40 / 48 (default 40) | Raw `32px` / `40px` / `48px` in component tokens |
| TextField, PasswordField, NumberInput, AgentInput, Dropdown trigger | 48 | The off-grid `11px` padding + 24px line + borders |
| SearchField | 44 | Padding around a 26px input |
| Dropdown options | 46–47 | The `11px` padding without borders |
| Chip, InputChip, FilterChip | 20 / 24 | The off-grid `2px` padding + line height |

Under the spacing rule, Input's `11px` and Chip's `2px` should snap to the grid, but snapping Input to 12px would make it 50px tall. [0022](0022-no-component-spacing-tokens.md) left both waiting for this decision.

Primer, Spectrum, Carbon and Radix all make control height a token, mostly on 32 / 40 / 48px. None derives height from padding; Primer derives vertical padding from height (6 / 10 / 14px), so text sits centred.

## Decision

1. **Three semantic tokens:** `size.control.sm` = 2rem (32px), `size.control.md` = 2.5rem (40px) and `size.control.lg` = 3rem (48px), referencing `base.size.8`, `base.size.10` and `base.size.12`. They're semantic because the whole control family shares them ([0014](0014-token-tiers.md)). No new base or component tokens. Signed off under [0022](0022-no-component-spacing-tokens.md). <!-- verify-docs-ignore: token name, not a file -->
2. **Controls set `min-height` from the scale and centre their content.** Vertical padding is no longer a token; horizontal padding comes from the semantic spacing scale. A `min-height` rather than a fixed `height` means a wrapped label, a WCAG 1.4.12 text-spacing override or a larger text size grows the control instead of clipping it. TextArea uses the control height as its minimum.
3. **Who uses which size:**

   | Control | Sizes |
   |---|---|
   | Button | `sm` / `md` / `lg` (default `lg`) |
   | IconButton | `sm` / `md` / `lg` (default `md`) |
   | TextField, PasswordField, NumberInput, AgentInput, SearchField, Dropdown trigger and options | `lg` only |

   Sizes line up by name: a `lg` Button sits level with a field. Fields stay one size until a product needs another (P4); density is how a dense product gets shorter fields.
4. **Two visible changes:** SearchField goes from 44 to 48px, matching the other fields, and Dropdown options from 46–47 to 48px. Every other control renders at the height it has today.
5. **Chips stay on the label scale** ([0018](0018-indicators-and-labels.md)): `size.label.small` (20px) and `size.label.medium` (24px) as their min-height. Whether interactive 20px chips meet WCAG 2.5.8 is a separate question ([#209](https://github.com/common-origin/common-origin-design-system/issues/209)).
6. **Density shifts the whole scale by one 8px step** ([0032](0032-token-modes.md)): `compact` 24 / 32 / 40, `default` 32 / 40 / 48, `comfortable` 40 / 48 / 56. `compact` never goes below 24px (WCAG 2.5.8).

## Consequences

- Input's `11px` and Chip's `2px` stop being read without an off-grid token; their deprecated tokens are removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)), and they leave the deprecated-in-use exception list in [0033](0033-token-descriptions.md)'s test.
- IconButton's raw px sizes stop being read.
- Implementation, each with before and after measurements: the tokens and the field family ([#206](https://github.com/common-origin/common-origin-design-system/issues/206)), Button and IconButton ([#207](https://github.com/common-origin/common-origin-design-system/issues/207)), chips ([#208](https://github.com/common-origin/common-origin-design-system/issues/208)).
- List rows (48 / 72px) aren't controls; a row size belongs with the density work ([#191](https://github.com/common-origin/common-origin-design-system/issues/191)).
