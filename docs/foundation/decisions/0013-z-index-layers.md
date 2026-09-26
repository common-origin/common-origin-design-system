# 0013. Z-index uses semantic layers paired with elevation

- **Status:** Accepted
- **Date:** 2026-09-26
- **Decided by:** Ollie (owner)
- **Principles:** P3, P5, P7

## Context

Components hard-coded z-index values that didn't sit on one scale: DateGroup's sticky header 10, Dropdown's menu 30 (via `base.zIndex.3`), SearchField's suggestions 1000, Sheet 1000/1001, Modal and ActionSheet 9999/10000. Two floating menus sat at different heights. There was no semantic z-index layer. `base.zIndex` is keyed by position (`0`–`8` → 0, 10, 20, 30, 40, 50, 1000, 1010, 1020), so a key says nothing about its value. Those base token names are published.

Other systems (reviewed on [#34](https://github.com/common-origin/common-origin-design-system/issues/34)) agree on role-named layers in a fixed order: sticky < dropdown < overlay/drawer < modal < popover/tooltip. Examples are Primer (base 0–600 plus functional layers, each paired with a shadow), Atlassian (elevation paired with a distinct layer per role), Chakra, Bootstrap and MUI. The DTCG format has no z-index type; z-index values are `number`.

## Decision

1. **Semantic layers.** `semantic.zIndex` defines one layer per role, named for the role and not the component. Each layer pairs with an elevation (shadow) token:

   | Layer | Value | For | Pairs with |
   |---|---|---|---|
   | `sticky` | 10 (`base.zIndex.1`) | sticky and fixed chrome: sticky headers, navigation bars | `elevation.sticky` |
   | `dropdown` | 1000 (`base.zIndex.6`) | floating menus: Dropdown, SearchField suggestions | `elevation.floating` |
   | `overlay` | 1010 (`base.zIndex.7`) | panels over the page: Sheet | `elevation.overlay` |
   | `modal` | 1020 (`base.zIndex.8`) | blocking dialogs: Modal, ActionSheet | `elevation.overlay` |

2. **Backdrops share their layer.** A backdrop uses the same z-index as its surface and comes before it in the DOM, so the surface paints on top.
3. **Components use the semantic layers only**, never base z-index tokens or literals. The one **exception** is stacking *inside* a single component: `-1`, `0` or `1` to order a component's own parts (AgentInput's working ring, TabBar's focused tab).
4. **No speculative layers** (P4). Popover, tooltip, toast and skip-link layers are added when a component needs them. The base scale has room above 1020.
5. **The base scale stays as it is for now.** Renaming `base.zIndex` keys is a breaking change (P7). A value-named base scale (for example `0`–`600`, typed `number`) is deferred to the DTCG / Style Dictionary 5 migration ([#24](https://github.com/common-origin/common-origin-design-system/issues/24)), where the old keys can be deprecated.

## Consequences

- **Modal and ActionSheet drop from 9999/10000 to 1020.** Within the system the order is unchanged. In a consuming product, anything with a z-index between 1021 and 9999 now renders above modals. Release notes must say so.
- **Dropdown's menu rises from 30 to 1000**, level with SearchField's suggestions, so it now appears above sticky content.
- Sheet's panel moves from 1001 to 1010, and its backdrop from 1000 to 1010, still below modals.
- **Components take the shadow paired with their layer** from `semantic.elevation`, not `base.shadow`. Four shadows get one step deeper:
  - DateGroup header: `base.shadow.2` → `elevation.sticky` (`base.shadow.3`)
  - Dropdown and SearchField menus: `base.shadow.3` → `elevation.floating` (`base.shadow.4`)
  - Sheet panel: `base.shadow.4` → `elevation.overlay` (`base.shadow.5`)
  
  Modal and ActionSheet already used `elevation.overlay`.
- Tests pin each overlay component's layer, and a token test pins the layer order.
- The docs site's own layers (Navigation, DataViewPattern, sticky page bars) move onto the semantic layers in a follow-up.
