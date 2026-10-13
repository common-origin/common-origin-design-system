# 0039. Pointer targets are at least 24 × 24px; small controls extend their hit area

- **Status:** Accepted
- **Date:** 2026-10-13
- **Decided by:** Ollie (owner)
- **Principles:** P2, P1, P5
- **Issue:** [#209](https://github.com/common-origin/common-origin-design-system/issues/209)

## Context

WCAG 2.2 AA 2.5.8 (Target size, minimum) needs pointer targets of at least 24 × 24px, unless a 24px circle centred on each target doesn't overlap another target (the spacing exception), or another exception applies.

[0035](0035-chips-have-one-size.md) made every chip 24px tall, so the BooleanChip and the deprecated clickable Chip pass. InputChip's close button stayed 20 × 20px, centred in its chip. It passed only through the spacing exception: 8px of chip padding beside it, and an 8px gap between chips. Packed tightly, it would only just pass.

## Decision

1. **Every pointer target is at least 24 × 24px**, without relying on the spacing exception.
2. **A control that is smaller to look at keeps its visible size and extends its hit area** with an invisible pseudo-element, centred and at least 24 × 24px, that stays clear of other targets. The chip close button keeps its 20px button. Its `::before` hit area is as tall as the chip (`size.label.medium`), so it can't overlap another target.
3. **Static chips and labels aren't targets**, so the rule doesn't apply to them.
4. **Tested in a browser**: `e2e/target-size.spec.ts` checks that every point just inside the 24px square around the close button lands on it, and that the button still measures 20px.

## Consequences

- A new control under 24px gets a hit area, and a case in the target-size spec.
- The Slider thumb, at 20 × 20px, is the remaining small target found while doing this ([#231](https://github.com/common-origin/common-origin-design-system/issues/231)).
