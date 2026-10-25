# 0048. Emphasis leaves the colour tokens: two text levels, a strong solid fill with overlay states

- **Status:** Accepted; amended by [0049](0049-where-white-lives.md): the states mix in `text.inverse`, now `gray.100`, not white. Values are signed off in part (a) of [#190](https://github.com/common-origin/common-origin-design-system/issues/190).
- **Date:** 2026-10-23
- **Decided by:** Ollie (owner)
- **Principles:** P1, P3, P5, P7
- **Amends:** [0029](0029-accent-emphasis-audit.md) §1 (emphasis is no longer a darker text colour); [0031](0031-semantic-token-grammar.md) (in the grammar, `emphasis` names only the strong solid fill); [0040](0040-own-oklch-palette.md) §4 (alpha overlays give a strong fill its states)
- **Issue:** [#190](https://github.com/common-origin/common-origin-design-system/issues/190), question 24

## Context

[0040](0040-own-oklch-palette.md) gives each grey step one job, and the palette retune (#190) moves the semantic tokens onto those steps. The "emphasis" tokens don't map onto them, because they come from the old Bootstrap ramp. "Emphasis" names four different jobs:

| Use | Tokens | Today | Against the 12-step ramp |
|---|---|---|---|
| Text and icons darker than default | `text.emphasis`, `icon.emphasis`; Typography `color="emphasis"`, Icon `iconColor="emphasis"` | `#16191C` (17.65:1), against default `#212529` (15.43:1) | The ramp has two text steps: `1200` primary and `1100` secondary. Nothing is darker than 1200, because pure black is reserved for the logo. The old ramp had a 900 and a 1000; the new one doesn't. It also conflicts with the Enforced rule "Hierarchy comes from weight and scale, not colour." |
| A near-black solid fill | `fill.emphasis`: primary Button, Chip and Tag `emphasis`, Badge's count, ProgressBar, Slider | `#212529` | The ramp's solid-fill steps (900/1000) are mid-greys at about 3.7:1, too light to carry white text. A near-black fill uses `1200`, the primary-text step, as a fill, as Radix's high-contrast solids do. |
| That fill's hover and pressed | `fill.emphasis-hover`, `fill.emphasis-pressed` | `#343a40` (lighter), `#16191C` (darker) | Light fills step through 300, 400 and 500; solids go from 900 to 1000. No step lies between 1100 and 1200, and none is darker than 1200. |
| A light border | `border.emphasis`: separators, Dropdown, TabBar, CodeBlock, Tooltip, disabled inputs | `#dee2e6` (1.30:1) | Not emphasis at all: this is the ramp's subtle or default border (600 or 700). |

## Decision

1. **Text and icons have two levels from the ramp:** primary (`gray.1200`) and secondary (`gray.1100`). Emphasis comes from weight and scale, not colour. `text.emphasis` and `icon.emphasis` become deprecated aliases of `text.default` and `icon.default`, removed in 3.0. Typography's `color="emphasis"` and Icon's `iconColor="emphasis"` keep working, and render as default (P7).
2. **The strong solid fill is a defined job:** `gray.1200` used as a fill, with white text (15.91:1). It's for the primary Button and the strong treatments of Chip, Tag, Badge, ProgressBar and Slider.
3. **A strong fill's hover and pressed states are overlays**, not ramp steps: a translucent white layer on top of the fill. Material and Primer call this a state layer. This is what 0040's alpha twins are for: "hover fills that must work on any surface".
   - **Hover** is white at 8%: `#343434` on `gray.1200`, almost exactly today's `#343a40`. White text on it is 12.45:1.
   - **Pressed** is white at 12%: `#3d3d3d`, with white text at 10.86:1.
   - Pressed is a little *lighter* than hover, as in Material, because the ramp has nothing darker than 1200.
   - The two overlay values are new tokens, signed off in part (a) of #190 (decision 0022).
4. **`border.emphasis` becomes a deprecated alias of the border role** that part (a) gives dividers, removed in 3.0. Its meaning doesn't change.
5. **"Emphasis" now names one thing: the strong solid fill.** That's the `fill.emphasis` token and its hover and pressed states, and the component variants that use it (Chip and Tag `emphasis`). The token keeps its name (P7). In [0031](0031-semantic-token-grammar.md)'s grammar, `emphasis` no longer means a darker text, icon or border colour, so no new neutral token takes an `emphasis` key for those.

## Consequences

- **Visible changes**, listed before and after in part (a):
  - Emphasis text and icons get slightly lighter, from `#16191C` to `#222222`.
  - Strong fills move from `#212529` to `#222222`.
  - Pressed strong fills get lighter instead of darker.
- **Implementation:** components with strong fills draw the overlay above the fill (for example with a background layer), so one overlay token works on any solid. This is part (a)'s work, and it can be reused for other solid fills later.
- **The test that checks emphasis is darker than default** (`contrast.test.ts`, decision 0029) is replaced by one that checks the two text levels against their contrast floors.
- **3.0** removes the deprecated `emphasis` colour tokens ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).
