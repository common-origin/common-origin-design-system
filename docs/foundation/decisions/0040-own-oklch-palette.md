# 0040. Our own palette: a 12-step pure-grey ramp with alpha twins, defined in OKLCH

- **Status:** Accepted; amended by [0044](0044-hue-ramps.md): a hue step matches the grey step's contrast with white (its luminance), not its OKLCH lightness; amended by [0048](0048-emphasis-leaves-the-colour-tokens.md): a strong fill (`gray.1200`) takes its hover and pressed states from translucent white overlays
- **Date:** 2026-10-14
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P3, P9
- **Issue:** [#194](https://github.com/common-origin/common-origin-design-system/issues/194)

## Context

The base palette came from two outside systems. The hues (`blue`, `green`, `red`, `orange`, `purple`, `pink`, `yellow`, 100–1300) are Adobe Spectrum 1's light-theme values, and Spectrum 2 has since changed them. The greys (`neutral.000`–`1000`) are Bootstrap's, with only three steps between white and `#dee2e6`. A monotone UI does most of its work in that range: surfaces, hover fills and hairlines ([P1](../principles.md#p1-content-first-quiet-chrome)). The steps also have no defined jobs, so the semantic tier picks them ad hoc (for example, `border.subtle` is darker than `border.default`).

The token architecture review ([#187](https://github.com/common-origin/common-origin-design-system/issues/187)) compared Spectrum 2, Radix, Geist and Primer. Radix and Geist give every step of a scale a job and pair each step with a translucent twin.

## Decision

1. **The palette is our own.** Spectrum and Bootstrap are no longer sources, and we don't track an outside palette.
2. **The grey ramp is pure grey** (OKLCH chroma 0, no hue tint), **12 steps named `gray.100`–`1200`** on the 100-based scale of [0031](0031-semantic-token-grammar.md). Every step has one job:

   | Steps | Job |
   |---|---|
   | 100–200 | Page and subtle backgrounds |
   | 300–500 | Component fill: rest, hover, pressed or selected |
   | 600–800 | Borders: subtle, default, strong |
   | 900–1000 | Solid fill and its hover |
   | 1100–1200 | Secondary and primary text |

3. **Contrast is part of a step's job**, so the steps are set by contrast first and Radix's values second:
   - `800` (strong border) is at least 3:1 against `100`, `200` and white, so a control's edge can use it ([0025](0025-control-borders-meet-3-to-1.md)). This is a deliberate departure from Radix, whose border steps are lighter.
   - `1100` is at least 4.5:1 against every background and fill step (`100`–`500`) and white.
   - `1200` is the primary text and the darkest step. Pure black stays reserved for the logo.
4. **Every step has an alpha twin**, `gray-alpha.100`–`1200`. It's `gray.1200` at the opacity that composites over white to the solid step, so `gray-alpha.1200` is opaque. Alpha twins are for overlays, hover fills that must work on any surface, and borders on tinted or image backgrounds. The scrim and overlay tokens (today's literal `rgba(33, 37, 41, …)` values) keep their own opacities, which aren't ramp steps, but take their colour from `gray.1200`. That changes their colour slightly, so it happens in the palette retune, not as a zero-change alias. Shadows keep their pure-black alpha ([0012](0012-shadows-use-black.md)).
5. **Values are defined in OKLCH.** Each step is a fixed OKLCH lightness. The hue ramps reuse the grey ramp's lightness steps (amended by [0044](0044-hue-ramps.md): each hue step matches the grey step's contrast with white instead), and the dark-mode values and data-visualisation colours are generated the same way, so all of them follow from one structure.
6. **The new ramps are additive in 2.x.** `gray.*` and `gray-alpha.*` sit beside `neutral.*` with no visual change ([#188](https://github.com/common-origin/common-origin-design-system/issues/188)). The hue ramps move onto the 12-step OKLCH structure in their own step ([#233](https://github.com/common-origin/common-origin-design-system/issues/233)), after the data-visualisation research ([#196](https://github.com/common-origin/common-origin-design-system/issues/196)). The semantic tokens move onto the new ramps in the palette retune ([#190](https://github.com/common-origin/common-origin-design-system/issues/190)), the one visible step. `neutral.*` and the old hue values are removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).

## Consequences

- The exact values are base tokens ([0007](0007-sources-of-truth.md)). Each one is signed off by the owner when it's added, and its description gives its contrast.
- Moving to pure grey removes the slight blue tint of today's text and borders (`#212529` becomes a neutral near-black). That visible change belongs to #190, which cites this decision and lists before and after values.
- Dark mode becomes a set of values under the same names, applied as a mode ([0032](0032-token-modes.md)). Nothing in the components changes for it.
- Hue names must not collide with today's `blue.100`–`1300` until 3.0. #233 settles them.
