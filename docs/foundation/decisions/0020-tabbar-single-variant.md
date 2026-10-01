# 0020. TabBar has one variant: underline

- **Status:** Accepted
- **Date:** 2026-10-01
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P3, P4, P5, P7
- **Amends:** [0016](0016-accent-selection-and-chip-types.md) §2, for TabBar only

## Context

`TabBar` had three variants, each with its own selected state:

- `default`: a folder tab. The active tab was white with near-black text and joined the panel below.
- `pills`: the active tab was a solid-blue pill with white text.
- `underline`: the active tab had blue text and a blue underline.

Decision 0016 moved TabBar's active tab to the light-blue selected treatment ([#98](https://github.com/common-origin/common-origin-design-system/issues/98)). Applying that to three different shapes raised a question per variant. The owner confirmed that no product uses `default` or `pills` (P4).

## Decision

**TabBar has one look: `underline`.**

- **Selected tab:** the light-blue selected treatment from 0016: `background.interactive-subtle` fill with `text.interactive` text, plus a blue underline (`background.interactive`, `border.width.thick`). The fill has small top corners (`border.radius.sm`) and sits on the underline. On hover and press, the fill and text darken together, as in 0016's table: `interactive-subtle-hover` with `text.interactive-hover` (5.60:1), and `interactive-subtle-active` with `text.interactive-active` (6.65:1).
- **Unselected tab:** `text.subdued` with no fill. On hover the text darkens to `text.default`. It no longer turns blue, because blue now means selected.
- **Count badge:** the normal blue badge on every tab.
- **Selection doesn't rely on colour alone (P2):** the underline marks the selected tab, along with `aria-selected`.

## Consequences

**Releases (P7).**

- **Next minor (2.16): nothing breaks.** The `variant` prop and the `TabVariant` type are deprecated. `'default'` and `'pills'` still type-check, but **render as `underline`**. The prop's default changes from `'default'` to `'underline'`. This is a visual change for any product that used the other variants, and the owner has confirmed there are none.
- **Next major (3.0): breaking.** Remove the `variant` prop and the `TabVariant` type ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).

**Migration notes.** Remove `variant` from `TabBar`. Tabs that were `default` or `pills` now look like `underline`.
