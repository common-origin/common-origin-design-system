# 0051. Rows follow density, and dense targets may be 24px on every pointer

- **Status:** Accepted
- **Date:** 2026-11-07
- **Decided by:** Ollie (owner)
- **Principles:** P2, P5, P9
- **Amends:** [0032](0032-token-modes.md) (rule 6: `size.touchTarget` is no longer a row or control height) and [P9](../principles.md#p9-serve-the-full-range)
- **Issue:** [#248](https://github.com/common-origin/common-origin-design-system/issues/248); rolled out system-wide in [#334](https://github.com/common-origin/common-origin-design-system/issues/334)

## Context

[0032](0032-token-modes.md) made density a token mode, and [#191](https://github.com/common-origin/common-origin-design-system/issues/191) built it for controls only. Rows didn't respond: ListItem's minimum height was `size.touchTarget` (44px), and TransactionListItem had its own `component.transactionListItem.minHeight` (72px). A dense product (A2UI) couldn't get shorter rows, and the SidebarNav planned in [#333](https://github.com/common-origin/common-origin-design-system/issues/333) needs 32px rows at default and less in compact.

Holding rows at 44px on touch screens was an option. But WCAG 2.2 AA asks for 24 × 24px pointer targets (2.5.8); 44px is the AAA level (2.5.5). P2's floor is AA. Compact controls already reach 24px on every pointer type, so a 44px row floor would have made rows the one family that couldn't be dense.

## Decision

1. **Dense targets may be 24 × 24px on every pointer type, touch included.** Density can take any row or control down to `size.pointerTarget` (24px) and no further ([0039](0039-target-size.md)). `size.touchTarget` (44px) keeps its value but is no longer a row or control height. It remains for invisible hit areas that take no layout space, such as the Slider thumb's on a touch screen.
2. **Rows have a height scale, `size.row`, that density shifts, and their padding moves with it.** A row's padding comes from `space.inset`, which density already shifts, and its minimum height from `size.row`. `default` keeps today's heights:

   | `size.row` step | compact | default | comfortable | For |
   |---|---|---|---|---|
   | `sm` | 24 | 32 | 40 | dense single-line rows: navigation items, menu items, dense table rows |
   | `md` | 40 | 48 | 56 | single-line list rows: ListItem, ActionSheet actions, SearchField suggestions |
   | `lg` | 64 | 72 | 80 | two-line rows: TransactionListItem |

   Steps move 8px per context. `md` is 48px at default because that's what ListItem measures today: its padding, not its old 44px minimum, set its height. Padding without inset tokens would have stopped rows shrinking at all.
3. **Inputs aren't rows.** Every input, including Checkbox and radio rows, has the same height as the other inputs at each density. Checkbox and radio rows keep their own token and follow the inputs, not `size.row` ([#334](https://github.com/common-origin/common-origin-design-system/issues/334)).
4. **Touch-first screens should stay at `default` or `comfortable`.** This is a guideline: compact rows work on touch screens, but they're slower to tap.

## Consequences

- `size.row.sm`, `md` and `lg` are semantic tokens in both density contexts, and `src/tokens/modes.test.ts` allows density to change them.
- ListItem reads the `md` row height and TransactionListItem the `lg` one (`size.row`), and both take their padding from `space.inset`, so in compact and comfortable their side padding moves one step too. `component.transactionListItem.minHeight` is deprecated, replaced by `size.row.lg`, and removed in 4.0.
- List's and ListItem's `spacing` prop is deprecated and removed in 4.0: it set density on one component, which P9 rules out now that rows follow the region's density. Until then it still sets the padding but not the height, so a `spacing="compact"` row is 48px at default, like every list row (it was 44px, held up by the old touch floor). SearchField and ActionSheet use it internally, and move to the default padding when it's removed.
- `e2e/density.spec.ts` checks row heights in each context.
- The remaining components that hold a 44px or 48px floor for touch, and the inputs, move to density in [#334](https://github.com/common-origin/common-origin-design-system/issues/334).
