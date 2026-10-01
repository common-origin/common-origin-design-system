# 0018. Indicators and labels: Badge counts, StatusLabel, CategoryLabel, Tag

- **Status:** Accepted
- **Date:** 2026-10-01
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P4, P5, P7, P9

## Context

The system had four small label or indicator components, and three of them were called "Badge" ([#62](https://github.com/common-origin/common-origin-design-system/issues/62)):

- **Badge:** a dot or count anchored to another element.
- **StatusBadge:** a status pill (pending, processing, completed, failed, cancelled, scheduled).
- **CategoryBadge:** category colours in filled, outlined and minimal styles.
- **Tag:** a small label with status, emphasis and interactive variants.

Using "Badge" for counts, status and categories conflated three different jobs. Heights also disagreed: a medium StatusBadge was as tall as a small CategoryBadge.

Research across Atlassian, Primer, Shopify Polaris, Adobe Spectrum, Material 3, eBay, Carbon, GOV.UK and Fluent 2 (in #62) found:

- **Every system separates three jobs:** count indicators, status, and categorisation.
- **"Badge" is overloaded across the industry.** It means a count in Atlassian, Material, eBay and Primer (as CounterLabel), and a status label in Polaris, Spectrum and Fluent. No system uses one word for both.
- **Status and category colours stay apart.** Atlassian separates semantic colours ("workflow status, risk") from accent colours (no semantic intent), and Spectrum does the same with semantic and label colours.
- **Status is never conveyed by colour alone** (Carbon, GOV.UK). Status labels aren't interactive, and the set of statuses stays small.
- **Status components offer a compact size** for tables and lists (Polaris `base`, Primer small, Carbon 16px). Most text labels have two sizes.

All four components are used in products: A2UI (StatusBadge, CategoryBadge, Badge, Tag) and meal-agent (Badge, Tag).

## Decision

### 1. Badge means a count or dot, and nothing else

`Badge` stays as it is: a count or dot indicator anchored to another element, such as a button, chip, tab or icon. No other component uses "Badge" in its name once the renames below are complete.

### 2. StatusLabel conveys status

`StatusBadge` is renamed **`StatusLabel`**. It exists only to convey the status of something to the user:

- it uses **only the status tokens** (`semantic.color.status.*`);
- it **always shows an icon with its text**, never colour alone (P2), so `showIcon` goes;
- it is **not interactive**;
- it keeps the current six statuses (pending, processing, completed, failed, cancelled, scheduled). New statuses are added only when a product needs them.

### 3. CategoryLabel colour-codes a category

`CategoryBadge` is renamed **`CategoryLabel`**: a static, chip-like label that colour-codes an item's category, for example a transaction's. It keeps its eight category colours and its filled, outlined and minimal styles. Category colours carry no status meaning.

### 4. Tag and the static Chip stay for now

- `Tag` stays: a non-interactive label for categorising elements, often in dense compositions. It is visually different from CategoryLabel.
- The static `Chip` (`default` only, [0016](0016-accent-selection-and-chip-types.md)) also stays.
- Tag, CategoryLabel and the static Chip overlap in purpose, and Tag still has status, emphasis and interactive variants. Whether both Tag and CategoryLabel are needed, and which Tag variants survive, is reviewed in the accent/emphasis audit ([#100](https://github.com/common-origin/common-origin-design-system/issues/100)) before anything changes.

### 5. One size scale; each component takes the sizes it needs

| Size | Height |
|---|---|
| `small` | 20px |
| `medium` | 24px |
| `large` | 32px |

| Component | Sizes | Default |
|---|---|---|
| `StatusLabel` | small, medium | medium |
| `Tag` | small, medium | medium |
| `CategoryLabel` | medium, large | large |

- No component gains a size it doesn't need.
- **Size names move with the scale.** CategoryBadge's `small` (24px) is CategoryLabel's `medium`, and its `medium` (32px) is CategoryLabel's `large`. CategoryLabel defaults to `large`, so swapping the name doesn't change how anything looks.
- StatusBadge's sizes already match (20 and 24px).
- Tag gains a `size` prop.

### 6. Release

This follows the [0016](0016-accent-selection-and-chip-types.md) pattern.

- **Next minor: nothing breaks.** `StatusLabel` and `CategoryLabel` are added. `StatusBadge` and `CategoryBadge` are deprecated, pointing to them. Tag gets `size`.
- **3.0:** `StatusBadge` and `CategoryBadge` are removed ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).

## Consequences

**Migration notes for products using the system:**
- `StatusBadge` → `StatusLabel` (same `status`, `size`, `label`, `liveRegion`). `showIcon={false}` is no longer possible: the icon is always shown.
- `CategoryBadge` → `CategoryLabel` with `size="small"` → `"medium"` and `size="medium"` (or no size) → `"large"`. `color` and `variant` are unchanged.

**Follow-up:**
- Implement the minor step above: [#103](https://github.com/common-origin/common-origin-design-system/issues/103) (StatusLabel and CategoryLabel) and [#104](https://github.com/common-origin/common-origin-design-system/issues/104) (Tag sizes).
- Add the removals to the 3.0 issue.
- Review the Tag / CategoryLabel / static Chip overlap and Tag's variants in #100.
- Docs:
  - the docs-site pages for the renamed components, plus a short "which label do I use?" guide covering Badge, StatusLabel, CategoryLabel, Tag and Chip;
  - A2UI's component catalog (in the `common-origin-a2ui-poc` repository) names StatusBadge and CategoryBadge, so it needs updating when A2UI upgrades.
