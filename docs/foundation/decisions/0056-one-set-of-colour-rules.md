# 0056. One set of colour rules for every theme: themes supply inputs, rules derive the roles

- **Status:** Accepted
- **Date:** 2026-11-08
- **Decided by:** Ollie (owner)
- **Principles:** P2, P1, P3, P5, P7, P9
- **Amends:** [0054](0054-dark-mode-theme-mode.md) rule 3 (no semantic overrides: the dark theme is base values only), [0049](0049-where-white-lives.md) (text on coloured fills uses `text.on-fill`, and surfaces read `base.color.surface`) and [0048](0048-emphasis-leaves-the-colour-tokens.md) (the coloured fills' states mix in `text.on-fill`)
- **Issues:** [#354](https://github.com/common-origin/common-origin-design-system/issues/354), [#355](https://github.com/common-origin/common-origin-design-system/issues/355), [#356](https://github.com/common-origin/common-origin-design-system/issues/356), part of [#352](https://github.com/common-origin/common-origin-design-system/issues/352)

## Context

[0054](0054-dark-mode-theme-mode.md) made dark mode a theme in which each ramp step keeps its job, and allowed a few hand-written semantic exceptions. The first pass at those exceptions (#354–#356) needed one dark-only rule after another:
- coloured fills on a different step;
- hover and pressed going the other way;
- a raised and an overlay surface on chosen steps;
- a scrim on a different ramp.

Then a review found a new problem: in dark, the overlay surface and a secondary Button's fill were the same grey, so the button disappeared inside dialogs and menus. Every exception had made the next one more likely.

The owner asked for one approach for both themes, with as few theme-specific changes as possible.

## Decision

1. **Themes supply inputs, and rules derive the roles.** A theme is its neutral ramp's lightness, the scrim opacity and the shadow strength, all in `scripts/palette/params.mjs`. Everything else comes from the same rules in every theme. The rules live in `scripts/generate-palette.mjs`. They check the signed-off light tokens and generate the dark ones. **Semantic and component tokens reference the same paths in both themes**, and the dark theme file holds base values only.

2. **Solid fills sit where their label reads at secondary-text contrast.** `base.color.{accent, success, warning, serious, danger}.solid` has full chroma, at the luminance where the light ink reads at the contrast `gray.1100` has with the page in light (5.86:1). In light, that's exactly step 1100, so nothing changes. In dark, it's a vivid mid-tone (accent `#0058ae`). The `fill.*` role tokens read `solid`. Hover and pressed mix the label in at 8% and 12% (0048), so they lighten in both themes and every state stays above 4.5:1.

3. **Every fill that sits on a surface is translucent.** The neutral fills (`fill.default` and its states, `fill.muted`, `fill.disabled`), the muted coloured fills and the category tints read the alpha twins (`gray-alpha.300`, `accent-alpha.300` and the rest). So a fill is always one step from whatever it sits on, whether that's the page, a card or an overlay, in every theme. Over white each one equals its solid step, so on cards light doesn't change. On the page they're a shade darker (`#efefef` rather than `#f2f2f2`).

4. **Surfaces: higher is lighter.** `base.color.surface.{page, raised, overlay}` are the page and the next neutrals lighter than it, in order. When the scale runs out, they share the lightest. In light that gives `gray.100`, white, white (shadows separate raised from overlay, as before). In dark it gives `gray.100`, `gray.200`, `gray.300`. Floating layers (Menu, the Dropdown and SearchField lists, ActionSheet, Modal, Sheet) use `surface.overlay`.

5. **Inks are the ends of the neutral ramp.** `base.color.ink.light` and `ink.dark` are `gray.100` and `gray.1200` in light, and the other way round in dark. Labels on solid fills (`text.on-fill`, `icon.on-fill`) use the light ink in every theme. `text.inverse` is the opposite end of the ramp from `text.default`, for the emphasis and inverse fills. Filled CategoryLabels keep `text.inverse`, because their fill is a text step.

6. **The scrim and shadows are theme parameters on fixed rules.** The scrim is the dark ink at `base.opacity.scrim` (0.5 in light, 0.7 in dark). Shadows stay black (0012). The dark theme multiplies the light opacities by the shadow strength (×2), and `elevation.inset` reads the new `base.shadow.inset` so it scales with the others.

7. **Literal values became references** (#354). `fill.none-hover` and `fill.none-pressed` read `gray-alpha.400` and `600`. `fill.inverse-none-hover` reads `gray-alpha-inverse.700`, the alpha ramp of `gray.100`, named by role like `text.inverse`.

8. **Tests hold the rules.** `modes.test.ts` fails if the theme overrides anything but base colour, shadow and the scrim opacity. In dark, it checks on-fill text at 4.5:1 or more on every solid fill and its states, inverse text on the emphasis fill, and surfaces layered page, raised, overlay. The palette check fails if a light role token stops matching its rule.

## Consequences

- **New tokens,** all signed off under [0022](0022-no-component-spacing-tokens.md). They're additive, so a minor release (P7):
  - base: `*.solid` (5), `surface.*` (3), `ink.*` (2), `opacity.scrim`, `shadow.inset`, `gray-alpha-inverse.*`;
  - semantic: `text.on-fill`, `icon.on-fill`, `surface.overlay`.
- **Visible changes in light:**
  - neutral and muted fills on the page are a shade darker (on cards, unchanged);
  - the transparent hover and pressed fills (0.10 to 0.09, 0.15 to 0.158);
  - the white hover (`#ffffff` at 0.2 to `#fcfcfc` at 0.208);
  - Sheet's panel (`#fcfcfc` to white).
- **Translucent fills stack:** a muted fill on another fill is darker than either. Contrast tests composite translucent colours over white, where they're defined.
- **A new theme** (a colour-blind palette, a high-contrast theme) is a new set of inputs, not a new set of exceptions.
