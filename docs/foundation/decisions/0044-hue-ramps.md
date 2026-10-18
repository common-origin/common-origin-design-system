# 0044. Hue ramps: steps match the grey ramp's contrast, at full chroma, named by role

- **Status:** Accepted
- **Date:** 2026-10-18
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P3, P7
- **Amends:** [0040](0040-own-oklch-palette.md) point 5 (a step is fixed by its contrast, not by its OKLCH lightness)
- **Issue:** [#233](https://github.com/common-origin/common-origin-design-system/issues/233), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

[0040](0040-own-oklch-palette.md) gives the palette a 12-step structure where every step has one job and contrast is part of that job (point 3), and says the hue ramps reuse the grey ramp's OKLCH lightness (point 5). [0043](0043-data-colours.md) sets the hues: six role ramps (accent, success, warning, serious, danger, AI) and four display ramps (olive, periwinkle, rose, magenta), with fixed points from #196 (olive and magenta at 1100, periwinkle and rose at 800, at least 0.140 apart under every kind of colour vision).

**The two parts of 0040 conflict for hues.** At the same OKLCH lightness, a saturated colour doesn't have grey's contrast: green and yellow come out brighter and red and magenta darker. A first draft at grey's lightness missed the floors on success 800 (2.83:1, against 3:1) and 1100 (4.47:1), and on olive 800.

**How other systems line up their steps** (measured from each package: the spread of contrast on white across the hues at one step):

| System | Rule | Spread per step |
|---|---|---|
| Carbon | Same contrast per grade in every hue | 1.01–1.05× |
| Primer | One HSLuv lightness curve shared by every scale, WCAG-checked | 1.06–1.11× |
| Polaris | Shared HSLuv lightness, drifting on saturated steps | 1.00–1.43× |
| USWDS, Material 3 | Grades and tones are luminance, so a fixed gap guarantees 4.5:1 | by definition |
| Radix | Aligned on 1–8; bright hues break 9–10 for dark text | 1.01–1.17×, 9–10 up to 4.5× |
| Tailwind 4 | OKLCH, tuned per hue | 1.08–2.68× |

The systems that put contrast first line their steps up by luminance. Primer also ships colour-blind themes (success becomes blue, danger orange), a possible later mode under [0032](0032-token-modes.md).

## Decision

1. **Each step matches the grey step's contrast with white** in every hue, and is defined in OKLCH at that luminance. Every `800` is 3.18–3.21:1 on white and every `1100` 5.99–6.03:1, so 0040's floors hold in every ramp by construction, and two steps give the same contrast whatever their hues. OKLCH lightness varies by up to 0.04 per step.
2. **Steps 800–1100 use full chroma**, the most sRGB allows at that luminance. That's what the #196 fixed points need: the display colours are 0.139 apart (periwinkle and magenta, under deuteranopia), accepted against #196's 0.140. Steps 100–700 are tints with capped chroma (from 0.012 at `100` to 0.13 at `700`), and `1200` uses 60% of the chroma available.
3. **Hues:** accent 255°, success 160°, warning 80°, serious 47°, danger 29°, AI 305°; olive 117°, periwinkle 277°, rose 4°, magenta 329°. These are today's hues, with blue moved from 258° so periwinkle stays at least 20° from it.
4. **Role ramps are named by role**, display ramps by hue: `accent`, `success`, `warning`, `serious`, `danger`, `ai`, `olive`, `periwinkle`, `rose`, `magenta`, each `100`–`1200`. They don't collide with today's `blue`, `green` and others, which 3.0 removes ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)). If a role's hue changes later, that's a value change, not a rename (P7).
5. **Alpha twins are per step** (`danger-alpha.100`–`1200`): the smallest opacity, with its own RGB, that composites over white to the solid step's exact hex. Steps 100–700 come out between 1.2% and 55% opacity. Most of 800–1100 are opaque or nearly so, because full-chroma colours sit on the edge of sRGB.
6. **Values are hex**, like the grey ramp, each rounded to the 8-bit hex nearest its intended hue at its target contrast. Each step's description gives its job, its OKLCH value and its contrast on white. Steps 100 and 200 carry so little chroma (about 0.003) that hex can't hold their hue exactly.

## Consequences

- The ramps are additive in 2.x, with no visual change. [#190](https://github.com/common-origin/common-origin-design-system/issues/190) points the semantic tokens at them.
- **On the same step, hues stay close under colour blindness** (warning and serious 0.020, accent and AI 0.027), because only hue differs between them. Where colour alone must tell two roles apart, the semantic tier uses different steps: for positive and negative, success 900 with danger 900 is 0.118, and warning 800 with success 1100 is 0.134. Everywhere else the icon and text carry the meaning (0043, point 2).
- **White text on `900` is 3.73–3.76:1**, below 4.5:1, as on the grey ramp. A solid fill that carries text, such as a filled button, uses `1100` (about 6:1). #190 makes that choice.
- Dark values come later from the same rule, matched to a dark grey ramp (0043, point 7). A P3 set, as Radix and Geist publish, would be an addition.
