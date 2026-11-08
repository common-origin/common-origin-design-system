# 0055. Controls have 8px corners, and containers nest around them

- **Status:** Accepted
- **Date:** 2026-11-08
- **Decided by:** Ollie (owner)
- **Principles:** P5, P3, P1
- **Amends:** [0002](0002-button-variants.md) (Button's radius), [0016](0016-accent-selection-and-chip-types.md) (chip radius), [0020](0020-tabbar-single-variant.md) (the selected tab's corners)
- **Issue:** [#362](https://github.com/common-origin/common-origin-design-system/issues/362)

## Context

Buttons, IconButtons and text inputs used `radius.sm` (4px), which read too sharp. Moving them to 8px also changes how they sit inside the things that hold them. A container whose corner is tighter than the curve of the control in its corner looks wrong. So does a row with a different corner from the button beside it.

The corners line up when the outer radius is the inner radius plus the padding between them. With 8px controls, that gives 20px for an Alert (12px padding), 24px for a Modal or ActionSheet (16px), and 32px for a drawer or a card with 24px padding. The owner chose each container's value from a side-by-side mockup.

## Decision

1. **Controls use `radius.md` (8px).** Button, IconButton and the input family (TextField, Dropdown's trigger and panel, SearchField, NumberInput) read their component tokens, which now reference `radius.md`. Button-like triggers that set their own radius follow: WorkspaceSwitcher's trigger and ActionSheet's close button. <!-- verify-docs-ignore: token names, not files -->
2. **The base scale and the semantic step values don't change.** Controls move by pointing at a different step. Changing `radius.sm` itself would have rounded every small element and made `sm` the same as `md`.
3. **Rows and tabs follow controls at 8px:** ListItem, SidebarNavItem, SidebarNavSection, SidebarNav's highlight, and the top corners of TabBar's selected tab. Menu and Dropdown options stay square, because they run edge to edge inside their panel.
4. **Small elements that aren't controls stay at 4px (`radius.sm`):** Tag, Tooltip, CodeBlock and the Checkbox box. Checkbox gets its own `component.checkbox.box.borderRadius` so it no longer follows the input radius: at 8px the 20px box reads as a Radio.
5. **Containers nest around the control radius:**

   | Container | Padding to the control | Nesting value | Chosen |
   |---|---|---|---|
   | Alert | 12px | 20px | `radius.lg` (12px) |
   | Modal | 16px | 24px | `radius.2xl` (24px) |
   | ActionSheet (top corners) | 16px | 24px | `radius.2xl` (24px) |
   | Sheet, drawer variant | 24px | 32px | `radius.2xl` (24px) |
   | Menu, Dropdown panel, SearchField suggestions | rows run edge to edge | none | `radius.md` (8px) | <!-- verify-docs-ignore: token names, not files -->

   Modal, ActionSheet and the drawer share one overlay shape. Where the nesting value is larger than a container can carry without looking soft, it is a ceiling, not a target: a container is never sharper than the controls inside it, and needn't reach the full nesting value.
6. **Chips are fully round** (`component.chip.default.borderRadius` is `radius.full`), with a round close button. Chips are 24px tall, so 12px already drew a pill. `full` keeps them a pill at any height, which keeps 0016's point that a chip never shares Button's shape.

## Consequences

- `visual-language.md`: Button's radius rule says `md` (8px); the chip rule says fully round against 8px; a new Guideline records the nesting rule; a new rule records the overlay radius.
- The semantic radius descriptions say what each step is for now: `sm` small non-control elements, `md` controls and rows, `lg` containers that hold controls, `2xl` overlays and large image cards.
- Image containers (CardSmall, Picture) stay at 4px. The visual-language target of `lg`–`xl` for image containers is separate work.
- Products that set a Box radius around controls should follow the nesting rule: for example, `lg` or `xl` for a card holding 8px inputs.
- No token is renamed or removed, so this is not a breaking change (P7), but every consumer sees rounder controls and overlays.
