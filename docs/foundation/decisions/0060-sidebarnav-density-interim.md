# 0060. SidebarNav's text, gap and rail follow density (interim)

- **Status:** Accepted (interim, until [#401](https://github.com/common-origin/common-origin-design-system/issues/401), [#402](https://github.com/common-origin/common-origin-design-system/issues/402) and [#403](https://github.com/common-origin/common-origin-design-system/issues/403) settle the system-wide questions)
- **Date:** 2026-11-22
- **Decided by:** Ollie (owner)
- **Principles:** P9, P5, P3, P7
- **Amends:** [0032](0032-token-modes.md) (density may change text, and three component tokens, for SidebarNav only) and [0022](0022-no-component-spacing-tokens.md) rule 1 (one interim component spacing token)
- **Issue:** [#396](https://github.com/common-origin/common-origin-design-system/issues/396)

## Context

[0059](0059-sidebarnav-rows-use-control-height.md) made SidebarNav's rows 32, 40 and 48px across compact, default and comfortable, with 14px text and 16px icons in every density. Reviewing the three side by side on the fixture page, the owner wanted the text, the gap between icon and label, the padding and the rail to grow with the rows too:

| | Compact | Default | Comfortable |
|---|---|---|---|
| Item label | 14/20 | 16/24 | 16/24 |
| WorkspaceSwitcher name (semibold) | 14/20 | 16/24 | 16/24 |
| Icon-to-label gap | 8px | 8px | 12px |
| Right padding | 8px | 12px | 16px |
| Rail | 48px | 56px | 64px |

The system can't express most of this yet:

- Density can't change text. Text styles are CSS `font` shorthands, and 0032 leaves text alone until typography is built from part tokens.
- No spacing token is 8, 8 and 12px across the densities, and 0022 rules out component spacing tokens.
- Density changes semantic tokens only (0032, enforced by `src/tokens/modes.test.ts`). A component token that references a density-aware semantic token doesn't follow density either: CSS substitutes the reference where the variable is declared, at `:root`.

The owner chose to fix it for SidebarNav now, localised in component tokens and recorded as interim, and to settle each system-wide question in its own issue.

## Decision

1. **Three interim component tokens, overridden by density directly** in `src/tokens/modes/density/compact.json` and `comfortable.json`:
   - `component.sidebarNav.item.typography`: `typography.small` in compact, `typography.body` otherwise. SidebarNavItem's label reads it.
   - `component.sidebarNav.switcher.typography`: `typography.label` in compact, semibold at body size otherwise (built from `fontWeight.semibold`, `semantic.fontSize.md`, `lineHeight.normal` and `fontFamily.body`). WorkspaceSwitcher's name reads it inside a SidebarNav.
   - `component.sidebarNav.item.gap`: `space.200`, and `space.300` in comfortable. The gap between an item's icon and label, and between the switcher's Avatar and name. **The one exception to 0022 rule 1**, while [#402](https://github.com/common-origin/common-origin-design-system/issues/402) is open.

   Each token's description starts "Interim (issue 396)" and names the issue that replaces it. `modes.test.ts` allows exactly these three paths, by name.
2. **The rows' right padding is `semantic.space.inset.md`** (8, 12 and 16px), for items and the switcher in a SidebarNav. No new token.
3. **The rail is worked out from the row**: `semantic.size.control.md` plus the nav's padding on each side, so each rail row is square. The rows' left inset is half the difference between the row and the 16px icon (8, 12 and 16px), the same expanded and in the rail, so icons never move. Compact's left inset drops from 12px to 8px. `component.sidebarNav.width.rail` (always 56px) no longer describes the rail, so it's deprecated, keeping its value, and removed in 4.0.
4. **SidebarNavSection's header lines up with the items** in every density: the same left inset and right padding, and the items' gap, so its 16px caret sits on their icon column and its label starts where theirs do. It keeps its height (`size.row.sm`) and caption text. Decided in the review of [#404](https://github.com/common-origin/common-origin-design-system/pull/404).
5. **Outside a SidebarNav, WorkspaceSwitcher is unchanged**: `typography.label`, `space.200` and even `space.inset.sm` padding.

## Consequences

- The interim tokens are published, so they're contracts (P7). When #401 and #402 land, they're deprecated and removed in the next major release, like any retired token.
- [#401](https://github.com/common-origin/common-origin-design-system/issues/401) decides text that follows density, system-wide; [#402](https://github.com/common-origin/common-origin-design-system/issues/402) a semantic icon-to-label gap that follows density; [#403](https://github.com/common-origin/common-origin-design-system/issues/403) whether density may ever change component tokens.
- `e2e/sidebar-nav.spec.ts` checks each value above in each density, and that icons stay centred in the rail.
