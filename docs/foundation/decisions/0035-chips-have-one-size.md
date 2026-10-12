# 0035. Chips have one size: 24px

- **Status:** Accepted
- **Date:** 2026-10-12
- **Decided by:** Ollie (owner)
- **Principles:** P5, P4, P7, P2
- **Amends:** point 5 of [0034](0034-control-heights.md) (chips on the label scale)
- **Issue:** [#208](https://github.com/common-origin/common-origin-design-system/issues/208), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

[0034](0034-control-heights.md) put chips on the label scale: `size.label.small` (20px) and `size.label.medium` (24px) as their min-height, with no vertical padding. Implementing it for #208 showed that a small chip with a close button (InputChip, and its deprecated alias FilterChip) was 24px, not 20px: the 20px close button plus 2px of padding made it taller. Every other small chip was 20px.

So a row of small chips, some removable and some not, mixed two heights. Keeping the close button's chip at 24px only by rule (the first fix proposed on #208) made that permanent. Shrinking the close button to fit a 20px chip would make its target smaller, against WCAG 2.5.8 ([#209](https://github.com/common-origin/common-origin-design-system/issues/209)).

## Decision

1. **Every chip is one size: 24px.** Chip, BooleanChip, InputChip and FilterChip take `size.label.medium` as their min-height, today's medium font (`component.chip.sizes.medium.font`) and `spacing.component.sm` horizontal padding, and centre their content. A chip is the same height whether or not it has a close button or a checkmark.
2. **The `size` prop is deprecated** on every chip and removed in 3.0 ([P7](../principles.md#p7-stable-contracts)). Until then it's accepted and ignored: `size="small"` renders the 24px chip. That is a visible change for small chips, which grow from 20 to 24px and from a 12px to a 14px font.
3. **The label scale is unchanged** for the components that use it ([0018](0018-indicators-and-labels.md)): StatusLabel, Tag and CategoryLabel keep their sizes. Chips are interactive or sit beside interactive chips, so they don't take the label scale's 20px step.

## Consequences

- `component.chip.sizes.small.font` is no longer read and is deprecated until 3.0, alongside the small and medium chip paddings.
- The docs site drops the chips' size examples and every `size` on a chip.
- Removing the `size` prop is listed for 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).
- A single 24px chip meets the 24px target size in WCAG 2.5.8, which #209 asks about for interactive chips. The 20px close button inside it is a separate question that stays with #209.
