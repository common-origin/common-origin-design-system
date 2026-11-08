# 0056. The dark theme's exceptions: text on coloured fills, an overlay surface, a dark scrim and stronger shadows

- **Status:** Accepted
- **Date:** 2026-11-08
- **Decided by:** Ollie (owner), except rule 3's dark hover direction, which follows P2
- **Principles:** P2, P1, P3, P5, P7
- **Amends:** [0049](0049-where-white-lives.md) (text on coloured fills uses `text.on-fill`, not `text.inverse`) and [0048](0048-emphasis-leaves-the-colour-tokens.md) (the accent and danger states mix in `text.on-fill` in light, and `text.inverse` in dark)
- **Issues:** [#354](https://github.com/common-origin/common-origin-design-system/issues/354), [#355](https://github.com/common-origin/common-origin-design-system/issues/355), [#356](https://github.com/common-origin/common-origin-design-system/issues/356), part of [#352](https://github.com/common-origin/common-origin-design-system/issues/352)

## Context

[0054](0054-dark-mode-theme-mode.md) makes dark mode a theme in which each ramp step keeps its job, so the dark context mostly swaps base values. It left the exceptions to their own issues: tokens that held literal values, text on coloured fills, and surfaces and shadows. The owner answered each one on 2026-11-08, in the issues' comments.

## Decision

1. **Literal values become references** (#354). `fill.none-hover` and `fill.none-pressed` snap to `gray-alpha.400` and `600`. A new ramp, `base.color.gray-alpha-inverse.*`, is the inverse end of the grey ramp (`gray.100`) at `gray-alpha`'s opacity for each step. It's named by role, like `text.inverse`, so it's light-based in light and dark-based in dark. `fill.inverse-none-hover` uses its step 700. `surface.scrim` uses `gray-alpha.800` in light. In dark it uses `gray-alpha-inverse.1100`: still dark, and stronger, so the page recedes.
2. **Text on coloured fills is `text.on-fill`** (#355), with `icon.on-fill` to match. Both are light in both themes. `text.inverse` is for the emphasis and inverse fills only, and turns dark in dark. The accent and danger Buttons, the accent Badge and TabBar's count use `on-fill`. Filled CategoryLabels stay on `inverse`, because their fill is a text step (1100) that turns light in dark.
3. **Coloured fills use step 800 in dark.** That's the most saturated step where `on-fill` text meets 4.5:1 (the generator records it as `fillStep`). Hover and pressed mix in `on-fill` in light, as before. In dark, mixing in a light colour would take the label from 4.6:1 to 3.8:1, so the states mix in `text.inverse`, which is dark there, and the fill darkens. This departs from the owner's "lighten in both themes", because P2 wins.
4. **Floating layers sit on `surface.overlay`** (#356): Menu, the Dropdown and SearchField lists, ActionSheet, Modal and Sheet. It's white in light, the same as raised, so the only visible change in light is Sheet's panel, which moves from `surface.base` to white. In dark, the page is `gray.100`, raised surfaces `gray.200` and overlays `gray.300`.
5. **Shadows stay black and double their opacity in dark** (#356), because shadows barely show on a near-black page. [0012](0012-shadows-use-black.md) still holds.
6. **The exceptions live in `src/tokens/modes/theme/dark-semantic.json`**, beside the generated `dark.json`. `modes.test.ts` checks that the theme changes only colour and shadow, that `on-fill` and `inverse` text meet 4.5:1 on every fill state in dark, and that the surfaces layer page, raised, overlay.

## Consequences

- Three new semantic tokens (`text.on-fill`, `icon.on-fill`, `surface.overlay`) and one new base ramp, all signed off under [0022](0022-no-component-spacing-tokens.md). Additive, so a minor release (P7).
- Visible changes in light are tiny: the transparent hover and pressed fills (0.10 to 0.09, 0.15 to 0.158), the white hover (`#ffffff` at 0.2 to `#fcfcfc` at 0.208), the scrim (0.5 to 0.502), and Sheet's panel (`#fcfcfc` to `#ffffff`).
- A component that puts text on a new coloured fill uses `on-fill`, and a new floating layer uses `surface.overlay`.
