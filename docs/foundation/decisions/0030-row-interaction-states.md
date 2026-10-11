# 0030. Rows and items share one interaction pattern

- **Status:** Accepted
- **Date:** 2026-10-11
- **Decided by:** Ollie (owner)
- **Principles:** P5, P2, P3
- **Follows:** [0016](0016-accent-selection-and-chip-types.md), [0029](0029-accent-emphasis-audit.md)

## Context

A survey of every interactive component that isn't a Button ([#164](https://github.com/common-origin/common-origin-design-system/issues/164)) found five families: rows and items, chips, cards, tabs and links. The rows didn't agree with each other:

- **ListItem** (the base for ActionSheet actions and SearchField suggestions) hovered at Button secondary's #dee2e6, got lighter when pressed (transparent), and lost its selected blue on hover. It read Button's component tokens for a list row.
- **TransactionListItem** hovered at white, which is invisible on a white surface. When pressed it turned #004491 behind #212529 text, which is 1.64:1.
- **Dropdown options** and the **docs sidebar** already followed the naked Button's ladder.

## Decision

1. **Rows and items share one interaction pattern.** That covers ListItem (and so ActionSheet actions and SearchField suggestions), TransactionListItem, Dropdown and listbox options, menu items and sidebars. Chips, cards, tabs and links stay separate families.
2. **An unselected row** goes from transparent at rest, to `background.surface` (#e9ecef) on hover or keyboard focus, to `background.neutral` (#dee2e6) when pressed. That's the naked Button's ladder. The component keeps its own text colour, so, for example, a destructive row stays red.
3. **A selected row** follows 0016's selected ladder: `interactive-subtle` at rest, `-hover` on hover, `-active` when pressed, with `text.interactive`, `-hover` and `-active` text.
4. **One implementation.** `interactiveRow` and `rowStates` in `src/lib/styleUtils.ts` read the existing semantic tokens, so there are no new tokens. Every row component uses them, and `src/components/rowStates.test.tsx` checks that they do.
5. **Cards** are decided separately ([#185](https://github.com/common-origin/common-origin-design-system/issues/185)). **TabBar** keeps its quiet text-only treatment for unselected tabs.

## Consequences

- ListItem rows get a real pressed state and keep their blue when selected and hovered. Its selected text turns blue, and the row colours the Typography through a selector. ActionSheet and SearchField inherit all of this.
- A clickable TransactionListItem is transparent at rest, #e9ecef on hover and #dee2e6 when pressed. The 1.64:1 pressed state is gone.
- Dropdown and the docs sidebar look the same as before, but now read the shared helper.
- A new row component uses `interactiveRow`, not its own colours.
