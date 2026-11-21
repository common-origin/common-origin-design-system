# 0059. SidebarNav's rows use the medium control height

- **Status:** Accepted
- **Date:** 2026-11-21
- **Decided by:** Ollie (owner)
- **Principles:** P5, P9, P3
- **Amends:** [0051](0051-row-heights-and-dense-targets.md), for SidebarNav's items only
- **Issue:** [#395](https://github.com/common-origin/common-origin-design-system/issues/395); density-specific text and spacing follow in [#396](https://github.com/common-origin/common-origin-design-system/issues/396)

## Context

[0051](0051-row-heights-and-dense-targets.md) put navigation items on `size.row.sm`: 24, 32 and 40px in compact, default and comfortable. Reviewing SidebarNav on the fixture page with all three densities side by side, the owner found the rows too tight. Today's default (32px) should be the compact height, with default and comfortable a step taller: 32, 40 and 48px.

No `size.row` step has those values. `semantic.size.control.md` does: 32, 40 and 48px, shifting one 8px step per density ([0034](0034-control-heights.md)). The alternatives were changing `size.row.sm`, which would also resize Menu items, or adding a new row step, a new token for one component.

At the same review the row's icon moved from `semantic.size.icon.md` (20px) to `semantic.size.icon.sm` (16px), to sit with the row's 14px text.

## Decision

1. **SidebarNavItem's minimum height is `semantic.size.control.md`**: 32px in compact, 40px in default and 48px in comfortable. Its content stays centred with no vertical padding.
2. **Its icon is `size.icon.sm` (16px)** in every density. The row's left inset is worked out from that size, so the icon stays centred in the rail.
3. **WorkspaceSwitcher's trigger matches the rows beneath it**: the same height, left inset and right padding. Its 24px Avatar overhangs the 16px icon's place equally on each side, so it centres on the icons and the name starts where the labels do. The collapse and expand toggles beside it are square at the same height, small IconButtons made that size so their icon stays 16px like the rows' icons.
4. **Every other dense row keeps `size.row.sm`**, Menu items among them. SidebarNavSection's header keeps its height; [0060](0060-sidebarnav-density-interim.md) lines it up with the items.

## Consequences

- SidebarNav is the one row that reads a control height. `docs/tokens/semantic.md` and `visual-language.md` name it as the exception, and `size.row.sm`'s description no longer lists navigation items.
- Every density keeps nav rows above the 24px minimum target ([0039](0039-target-size.md)), so compact nav rows are now 8px taller than other compact rows.
- `e2e/sidebar-nav.spec.ts` checks the three heights, and `SidebarNavItem.test.tsx` checks the token.
- Default SidebarNav rows grow from 32px to 40px: a visual change in a minor release, with no API change (P7).
