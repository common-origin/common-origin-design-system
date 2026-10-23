# Base tokens

Base tokens are the raw palette and scales. They're named by what the value is, not by what it's for, and only semantic tokens read them ([decision 0014](../foundation/decisions/0014-token-tiers.md)). A base scale is designed as a whole: its steps are evenly spaced and each step has a defined job, so semantic tokens can pick from it predictably. For how semantic tokens use these scales, see [Semantic tokens](semantic.md).

## Colour

### The theory

The palette is our own, rather than borrowed from Spectrum or Bootstrap ([decision 0040](../foundation/decisions/0040-own-oklch-palette.md)). It follows four ideas.

1. **Every ramp has 12 steps, and every step has one job,** the same in every ramp:

   | Steps | Job |
   |---|---|
   | 100–200 | Page and subtle backgrounds |
   | 300–500 | Component fill: at rest, on hover, pressed or selected |
   | 600–800 | Borders: subtle, default, strong (800 is a control's edge) |
   | 900–1000 | Solid fill and its hover |
   | 1100 | Secondary text |
   | 1200 | Primary text, and the darkest step |

   So "the hover fill" is always step 400, whatever the hue, and a semantic token picks a step by its job.

2. **Contrast is part of a step's job.** 800 is at least 3:1 against 100, 200 and white, so it can be a control's edge ([decision 0025](../foundation/decisions/0025-control-borders-meet-3-to-1.md)). 1100 is at least 4.5:1 against every background and fill step (100–500) and white, so it can be text on any of them. 1200 is the primary text. Pure black is reserved for the logo.

3. **Defined in OKLCH, matched by contrast.** Each colour is defined in OKLCH, a perceptual colour space, and stored as hex. Every hue step has the **same contrast with white as the grey step of the same number** ([decision 0044](../foundation/decisions/0044-hue-ramps.md)). This is how Carbon, Primer and USWDS line up their steps. The result: any two steps give the same contrast whatever their hues, and the floors above hold in every ramp by construction. Equal OKLCH lightness wouldn't do this, because saturated greens and yellows look brighter, and reds and magentas darker, than a grey of the same lightness.

4. **Colour by meaning.** Each hue either carries one meaning everywhere (UI, status and data) or carries none ([decision 0043](../foundation/decisions/0043-data-colours.md)). Meaning is never colour alone. On the same step, hues are close together under colour blindness, so a status always has text and a shape or symbol as well ([decision 0045](../foundation/decisions/0045-status-indication.md)).

### Grey

`base.color.gray.100`–`1200`: pure grey, with no hue tint (OKLCH chroma 0). Most of the interface is built from it ([P1](../foundation/principles.md#p1-content-first-quiet-chrome)).

| Step | Job | Contrast on white |
|---|---|---|
| 100 | Page background | 1.03:1 |
| 200 | Subtle background | 1.05:1 |
| 300 | Component fill at rest | 1.12:1 |
| 400 | Component fill on hover | 1.19:1 |
| 500 | Component fill pressed or selected | 1.27:1 |
| 600 | Subtle border | 1.37:1 |
| 700 | Default border: dividers and decorative outlines | 1.53:1 |
| 800 | Strong border: a control's edge | 3.19:1 |
| 900 | Solid fill | 3.74:1 |
| 1000 | Solid fill on hover | 4.35:1 |
| 1100 | Secondary text | 6.01:1 |
| 1200 | Primary text | 15.91:1 |

The big step from 700 to 800 is deliberate. Borders and fills below it are quiet, and everything from 800 up is strong enough to mark a boundary or carry meaning.

### Role ramps

Six ramps carry one meaning each, everywhere ([decision 0043](../foundation/decisions/0043-data-colours.md)):

| Ramp | Hue | Means |
|---|---|---|
| `accent` | blue, 255° | Links, selected and active states, the accent action, neutral information, in progress |
| `success` | green, 160° | Success, positive values, money in |
| `warning` | yellow, 80° | Attention, a regular warning |
| `serious` | orange, 47° | A serious warning, between warning and danger |
| `danger` | red, 29° | Errors, destructive actions, negative values, money out |
| `ai` | purple, 305° | AI-generated content, agent actions, working states |

Grey is the seventh, neutral, role: chrome, text, drafts and not-started states.

### Display ramps

Four ramps carry **no meaning**. They're for category labels and chart categories: `olive` (117°), `periwinkle` (277°), `rose` (4°) and `magenta` (329°). Each sits at least 20° from every role hue, so a category never looks like a status. Their fixed points stay apart under every kind of colour vision: olive and magenta at 1100, periwinkle and rose at 800, at least 0.139 apart (OKLab).

### Chroma

Steps 800–1100 use the most chroma sRGB allows at their lightness ([decision 0044](../foundation/decisions/0044-hue-ramps.md)). That makes them vivid, which is what the display colours need to stay apart, and which the role colours need to read as meaning. Steps 100–700 are tints with capped chroma, so backgrounds stay quiet. Step 1200 uses 60% of the available chroma.

### Alpha twins

Every ramp has a translucent twin (`gray-alpha`, `accent-alpha` and the rest) for overlays, hover fills that must work on any surface, and borders on tinted or image backgrounds.

- **`gray-alpha`** is `gray.1200` at the opacity that composites over white to the same step ([decision 0040](../foundation/decisions/0040-own-oklch-palette.md)).
- **Hue twins** are the smallest opacity, each with its own RGB, that composites over white to the solid step's exact hex ([decision 0044](../foundation/decisions/0044-hue-ramps.md)). Steps 800–1100 sit on the edge of sRGB, so most of their twins are opaque.

### Other colour tokens

- `base.color.transparent`.
- **The older palettes** (`neutral.*`, from Bootstrap, and `blue`, `green`, `red`, `orange`, `purple`, `pink`, `yellow`, from Spectrum 1) stay until 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)), while the semantic tier moves off them ([#190](https://github.com/common-origin/common-origin-design-system/issues/190)).
- **White** comes from `neutral.000` until 3.0, which decides where it lives.

## Dimension and size

- **`base.dimension`** is the one dimension scale, on a 4px grid. The key is the multiple of 4px: `4` is 16px (1rem) and `12` is 48px. It holds only the steps in use. Semantic spacing and sizes read it ([#188](https://github.com/common-origin/common-origin-design-system/issues/188)). Off-grid values snap to the nearest step.
- **`base.size`** holds the size keywords (`auto`, `full`, `screen`, `min`, `max`, `fit`). Its numbered steps, and those of `base.spacing`, are deprecated aliases of `base.dimension`.

## Radius and border

- **`base.border.radius`:** `1` (2px) to `7` (32px), plus `circle` for pills and circles.
- **`base.border.width`:** keyed by the width in pixels, `0` to `8`. `1` is the hairline (1px) and `2` the thick border (2px).
- **`base.border.style`:** `solid`, `dashed` and `dotted`.

## Shadow

**`base.shadow`:** `1` (subtle) to `6` (deepest), plus `none`. Shadows use pure black at low opacity, the one exception to keeping pure black for the logo. At a soft shadow's 4–25% opacity the difference from near-black can't be seen, and black is the conventional shadow colour ([decision 0012](../foundation/decisions/0012-shadows-use-black.md)).

## Layers

**`base.zIndex`:** steps `1`–`5` are 10–50, for layers within the page, and `6`–`8` are 1000 and up, for overlays. Components use the semantic `layer` names, never the numbers ([decision 0013](../foundation/decisions/0013-z-index-layers.md)).

## Opacity

**`base.opacity`:** keyed by percentage, so `50` is 0.5. Two steps exist for state layers:

- **`8`** (0.08) for hover
- **`12`** (0.12) for pressed

A strong fill mixes in its content colour at these opacities, as Material 3 does ([decision 0048](../foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)).

## Typography

- **`base.fontFamily`:** `heading` and `body` are Inter; `monospace` is a system monospace stack.
- **`base.fontSize`:** `1` (12px) to `10` (80px).
- **`base.fontWeight`:** `1` (300) to `7` (900).
- **`base.lineHeight`:** `1` (1rem) to `11` (5rem), plus `none` (1).
- **`base.letterSpacing`:** `0` (−0.125rem) to `4` (0.125rem), where `2` is normal.

Components use the semantic type styles and their named parts, not these steps.

## Breakpoints

**`base.breakpoint`:** `xs` (0) to `2xl` (1536px). Breakpoints stay plain values, not CSS variables, because media queries can't read variables ([decision 0041](../foundation/decisions/0041-components-read-css-variables.md)).

## Motion

- **`base.duration`:** `instant` (0ms) to `slowest` (1000ms). The semantic tier exposes only the durations in use: 300ms is the most any interface motion takes ([P6](../foundation/principles.md#p6-motion-responds-it-doesnt-perform), [decision 0037](../foundation/decisions/0037-motion-tokens.md)).
- **`base.easing`:** CSS timing functions, plus stronger Quart and Back curves. The semantic tier names the curves by their job.
