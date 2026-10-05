# 0021. Alert's action follows the content

- **Status:** Accepted
- **Date:** 2026-10-03
- **Decided by:** Ollie (owner). The placement on 2026-10-03; the 12px spacing and the inline layout, proposed by Claude, confirmed the same day ([#122](https://github.com/common-origin/common-origin-design-system/issues/122#issuecomment-5967486940))
- **Principles:** P5, P9
- **Amends:** [0019](0019-alert-and-inline-alert.md) §1, the layout of Alert's action

## Context

Alert's `action` sat in the row to the right of the content, with the dismiss button beside it. Once the dismiss button was centred on the first line of content ([#69](https://github.com/common-origin/common-origin-design-system/issues/69)), the two disagreed: a 32px action button was top-aligned, so with both present their centres were 6px apart. Placing them side by side also put two unrelated controls next to each other: one acts on the message, the other closes it.

## Decision

**The action follows the content, left-aligned with it.**

- The action sits at the end of the content column: after the title and the message, on the same left edge.
- With the content's `xs` gap, the space above the action is the `md` spacing token (12px), so it reads as a separate step. Several actions sit side by side, `sm` apart, and wrap.
- The dismiss button doesn't move: top right, centred on the first line of content (0019). The action and the dismiss button never share a row.
- The icon, content and dismiss button all start at the top of the alert, so the icon and dismiss button line up with the first line. This includes the deprecated `inline` alert.

People read the message and then reach the action, in that order, and the dismiss button stays out of the way.

## Consequences

- **Release (P7):** a visual change with no API change, in the next minor. An alert with an action is taller by the action's height plus 12px, and its message gets the full width.
- **Inline alerts:** the deprecated `inline` alert follows the same layout. A one-line inline alert without an action doesn't change. One with a title, a wrapped message or an action now has its icon level with the first line instead of centred, matching the block alert. `inline` is still removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).
- `visual-language.md` records the rule. Implementation: [#122](https://github.com/common-origin/common-origin-design-system/issues/122).
