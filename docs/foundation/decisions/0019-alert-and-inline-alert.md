# 0019. Alert and InlineAlert

- **Status:** Accepted
- **Date:** 2026-10-01
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P3, P4, P5, P7

## Context

`Alert` always drew a 1px border in its severity colour ([#70](https://github.com/common-origin/common-origin-design-system/issues/70)). That suits an alert at the top of a page, but adds noise inside content. Alert also had an `inline` prop ("compact inline variant with reduced padding") covering a different job: a short, local message between paragraphs or next to a field.

Separately, the dismiss button sat 8px from the top-right corner. In a single-line alert that left it off-centre: 9px above, 13px below ([#69](https://github.com/common-origin/common-origin-design-system/issues/69)).

Other systems split the two jobs:

| System | Block alert | Inline message |
|---|---|---|
| Primer | Banner | InlineMessage ("below an input field, next to a button, or within a table") |
| Atlassian | Banner, Section message | Inline message |
| Spectrum | Alert banner | InlineAlert |
| Carbon | Actionable notification | Inline notification (max two lines) |
| GOV.UK | Notification banner | Warning text |

The inline form is short, sits next to what it's about, and has no title or actions.

Alert's tinted backgrounds are about 1.1:1 against the page, so a borderless alert is told apart by its icon and text colour, not its background.

## Decision

### 1. Alert is the block alert

`Alert` is for messages at the top or bottom of a page, or inside content, that may need a title, longer copy, an action or a dismiss button.

**Appearance.** A new prop, `appearance?: 'outlined' | 'borderless'`, defaults to `outlined`, so existing alerts don't change. `variant` keeps meaning severity (error, warning, info, success).

| `appearance` | Look | Use for |
|---|---|---|
| `outlined` | Severity tint, 1px severity border | Page-level alerts at the top or bottom of a page, where the border calls out severity |
| `borderless` | Severity tint only, no border and no accent bar | Inside content, where a border would compete with it. Severity is carried by the icon and title colour |

The severity × appearance combinations come from Alert's component tokens (`component.alert.*`, [0014](0014-token-tiers.md)), not conditionals with literal values. Until `inline` is removed in 3.0, `appearance` and the deprecated `inline` prop are independent: any combination renders, and `inline` only changes spacing as it does today.

**Dismiss button.** The button's centre lines up with the **first line of content**: the title, or the message when there's no title. This works the same for single-line and multi-line alerts and for both appearances. Offsets come from spacing and size tokens ([0014](0014-token-tiers.md)).

### 2. InlineAlert is the small, local message

A new component, **`InlineAlert`**, replaces Alert's `inline` prop. It sits next to what it's about: between paragraphs, below a field, or in a table cell.

- **Content:** a severity icon and short text only. No title, no action, no dismiss button.
- **Look:** the icon and text in the severity colour (`text.error`, `text.warning`, `text.success`, `text.interactive` for info), with **no background or border**. On the page, white and grey surfaces each colour is at least 4.5:1 (5.1:1 on the page, 5.4:1 on white, 4.54:1 on the grey surface). On other backgrounds, check contrast before use.
- **Sizes:** `small` and `medium` (default `medium`), from the label size scale ([0018](0018-indicators-and-labels.md)), for dense places like forms and tables.
- **Severity:** the same four as Alert (error, warning, info, success).
- **Announcing:** it keeps the live-region behaviour of today's inline alerts, so screen readers announce new messages.
- **Describing a field:** when an InlineAlert gives feedback about a control (below a field, for example), it takes an `id` and the control references it with `aria-describedby`. This is the same relationship TextField, NumberInput, Checkbox and Dropdown use for helper and error text, so users who return to the control still hear the message.

### 3. Release

This follows the [0016](0016-accent-selection-and-chip-types.md) pattern.

- **Next minor: nothing breaks.**
  - `appearance` is added to Alert.
  - The dismiss button is realigned. This is a small visual change, not an API change.
  - `InlineAlert` is added.
  - Alert's `inline` prop is deprecated, pointing to `InlineAlert`.
- **3.0:** `inline` is removed from Alert ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).

## Consequences

- **Migration:** `<Alert inline>` becomes `<InlineAlert>` with the same `variant` and text. A title, action or dismiss button on an inline alert has no equivalent: keep those uses as a block `Alert`, either appearance.
- `visual-language.md` records the Alert appearances, the dismiss alignment and InlineAlert's look.
- The docs explain when to use Alert (outlined or borderless) versus InlineAlert, with examples.
- Implementation: [#70](https://github.com/common-origin/common-origin-design-system/issues/70) (`appearance`), [#69](https://github.com/common-origin/common-origin-design-system/issues/69) (dismiss alignment), [#106](https://github.com/common-origin/common-origin-design-system/issues/106) (InlineAlert); removal of `inline` in [#99](https://github.com/common-origin/common-origin-design-system/issues/99).
