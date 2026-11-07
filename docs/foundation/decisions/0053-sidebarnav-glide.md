# 0053. SidebarNav's hover highlight glides between rows

- **Status:** Accepted
- **Date:** 2026-11-08
- **Decided by:** Ollie (owner)
- **Principles:** P5, P6, P2
- **Amends:** [0030](0030-row-interaction-states.md), for SidebarNav only
- **Issue:** [#323](https://github.com/common-origin/common-origin-design-system/issues/323), part of [#333](https://github.com/common-origin/common-origin-design-system/issues/333)

## Context

[0030](0030-row-interaction-states.md) has every row colour its own background on hover. The sidebar navigation the system is modelled on (beautifului.dev, "Sidebar Nav") instead moves one highlight to whichever row the pointer is over. The movement shows where the pointer is going as it travels down a list, which is the kind of motion P6 allows: it responds to input and explains change.

## Decision

1. **SidebarNav only.** Every other row keeps 0030 as it is.
2. **Same colours.** The highlight is `background.surface`, the hover colour of `rowStates`, and a hovered row stays transparent underneath it. Pressed and selected rows keep their own fills from `interactiveRow`. Over the selected row the highlight steps aside, and the row shows its own selected hover colour.
3. **Keyboard focus moves it too**, so keyboard and pointer users see the same thing.
4. **Motion:** it moves over `motion.duration.fast` with `motion.easing.decelerate`, naming its properties. Under reduced motion it jumps to the new row instead of moving (0015).
5. **Forced colours:** the highlight is hidden, and rows use their `forcedColors` styles from `interactiveRow` (0038).

## Consequences

- The `visual-language.md` rows rule names SidebarNav as the exception.
- SidebarNav ([#331](https://github.com/common-origin/common-origin-design-system/issues/331)) implements the highlight; SidebarNavItem keeps `interactiveRow` for its pressed and selected states.
