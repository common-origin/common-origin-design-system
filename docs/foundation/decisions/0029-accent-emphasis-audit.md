# 0029. Accent and emphasis audit: emphasis, selection, focus and labels

- **Status:** Accepted
- **Date:** 2026-10-10
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P5, P7
- **Follows:** [0016](0016-accent-selection-and-chip-types.md), [0018](0018-indicators-and-labels.md)

## Context

Decision 0016 defined **accent** (the blue call to action above primary), **emphasis** (strong near-black, never blue) and the light-blue **selected** treatment. Only Button and Chip had been checked against it. The audit in [#100](https://github.com/common-origin/common-origin-design-system/issues/100) checked every component, token and docs page. The findings table is on the issue.

- **Accent** is used correctly: only Button and Modal have it.
- **Emphasis** isn't used correctly everywhere: `text.emphasis` and `icon.emphasis` are *lighter* than default text, and the category palette calls its strong blue `blue-emphasis`.
- **Selection** isn't consistent: Dropdown and SearchField show focus and selection the same way.
- **Focus rings** come in two styles.
- **Labels:** Badge's blue `primary`, ProgressBar's blue fill and Tag's status and interactive variants don't fit the system's naming and colour rules.

## Decision

1. **Emphasis is stronger than default.** `text.emphasis` and `icon.emphasis` move to `base.color.neutral.1000` (#16191C) ([#166](https://github.com/common-origin/common-origin-design-system/issues/166)).
2. **"Emphasis" isn't used for category hues.** The category palette's strong step is `<hue>-strong`, and `<hue>-emphasis` is a deprecated alias until 3.0 ([#167](https://github.com/common-origin/common-origin-design-system/issues/167)).
3. **Focus is grey, selection is light blue.** A keyboard-focused or highlighted option uses `background.surface`. A selected option uses 0016's selected treatment, and Dropdown adds a checkmark ([#168](https://github.com/common-origin/common-origin-design-system/issues/168)).
4. **Badge's blue variant is `accent`.** `primary` is deprecated until 3.0 ([#169](https://github.com/common-origin/common-origin-design-system/issues/169)).
5. **ProgressBar's default fill is near-black** (`background.emphasis`), matching Slider ([#170](https://github.com/common-origin/common-origin-design-system/issues/170)).
6. **One focus ring:** `semantic.border.focus` with `border.focusOffset`, everywhere. There's no blue focus ring ([#171](https://github.com/common-origin/common-origin-design-system/issues/171)).
7. **Tag keeps `default` and `emphasis`.** Its `success`, `warning`, `error` and `interactive` variants are deprecated until 3.0, and status uses StatusLabel ([#172](https://github.com/common-origin/common-origin-design-system/issues/172)).
8. **Tag and CategoryLabel both stay.** Tag is neutral metadata, and CategoryLabel is a coloured category. A "which label do I use?" guide documents Badge, StatusLabel, CategoryLabel, Tag and Chip ([#173](https://github.com/common-origin/common-origin-design-system/issues/173)).

## Consequences

- Each decision is implemented in its own PR. The three removals (Badge `primary`, Tag's four variants and the category `-emphasis` tokens) are listed in the 3.0 issue ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).
- The audit also found two problems that need no decision from it: interactive list rows' pressed states ([#164](https://github.com/common-origin/common-origin-design-system/issues/164), which needs its own decision), and the docs site's deprecated chip variants ([#165](https://github.com/common-origin/common-origin-design-system/issues/165)).
- The rules are in `visual-language.md`, marked Target until each PR lands.
