# 0043. Data colours: one hue set, categorical colours on ramp steps, green and red for good and bad

- **Status:** Proposed
- **Date:** 2026-10-17
- **Decided by:** Ollie (owner), pending
- **Principles:** P1, P2, P4
- **Issue:** [#196](https://github.com/common-origin/common-origin-design-system/issues/196), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

[0031](0031-semantic-token-grammar.md) reserves `color.data.*` (categorical, sequential, diverging) for charts and other data display, separate from status. [0040](0040-own-oklch-palette.md) makes the palette our own, in OKLCH, with hue ramps that reuse the grey ramp's 12 lightness steps; the hues wait for this research ([#233](https://github.com/common-origin/common-origin-design-system/issues/233)). Nothing in the package draws charts yet; A2UI will (money in and out over time, spending by category).

Measured on 2026-10-17 with OKLCH, WCAG contrast, colour-vision simulation (Machado, Oliveira and Fernandes 2009, protan, deutan and tritan at full severity) and distance in OKLab. "Separation" is the smallest distance between any two colours in a set, under the worst of the four kinds of vision.

- **Today's category hues** (`color.category.*`, from Adobe Spectrum 1) sit at almost the same lightness (L 0.64–0.72). Under deuteranopia, blue and purple are 0.019 apart: the same colour. Yellow fails 3:1 on white.
- **Okabe and Ito's colour-blind-safe set**, a common reference, separates by 0.076, but three of its seven colours fail 3:1 on white, so they can't mark a line or bar (WCAG 1.4.11).
- **Status:** warning (orange.900) and danger (red.900) are 0.017 apart under deuteranopia. They're always paired with an icon, so nothing fails today, but the hue ramps should separate them by lightness.
- **Money in and out:** today's credit and debit colours (green.700, red.900) drop to 0.105 under deuteranopia. Blue against orange stays at 0.27 or more under every kind of vision.

A search for categorical sets (hues at least 35° apart, chroma at least 0.10, every colour at least 3:1 on the page), with lightness limited to the ramp steps 800, 900, 1000 and 1100 that clear 3:1:

| Colours | Separation | Lowest contrast on the page |
|---|---|---|
| 6 | 0.109 | 3.15:1 |
| **7** | **0.082** | **3.13:1** |
| 8 | 0.050 | 3.11:1 |
| 8, free lightness (a separate data palette) | 0.086 | 3.10:1 |

**Enterprise practice**, overlaid on the measurements (checked on 2026-10-18):

- **Charts separate two jobs.** Values that are good or bad (gains and losses, money in and out, above or below target) use the conventional green and red. That's SAP Fiori's semantic chart palette ("red=negative, green=positive"), Shopify Polaris Viz (green positive, red negative), and Atlassian's chart-specific `color.chart.success` and `color.chart.danger` beside its categorical set. Financial UI guidance keeps red and green because breaking the convention erodes trust, and makes the meaning accessible with a second channel instead: a sign, an arrow, parentheses or a label.
- **Values with no good or bad use a neutral diverging pair.** IBM Carbon's diverging palettes are purple–teal (performance, sales, rates of change) and red–cyan (temperature), and its red, orange, yellow and green alert colours are kept for status.
- **Categorical sets are ordered and carry no meaning**: Carbon has 14 colours in a fixed order "to maximize contrast between neighboring colors", Atlassian has 8, and SAP Fiori and Salesforce have their own qualitative palettes.
- **Accessibility comes from redundant encoding, not from swapping hues.** Material, Carbon and the financial guidance all say never colour alone.

So a blue–orange money pair would have over-indexed on colour vision at the cost of a convention every user reads. Measured on the ramp steps:

- **Green and red on the same step collapse under deuteranopia** (900 and 900: 0.031). A naive OKLCH ramp would do exactly that.
- **Splitting their lightness keeps today's separation**: green 900 with red 1100 is 0.104 (today: 0.105), both at least 3.39:1 on the page. A wider split (green 800) reaches 0.143 but drops green below 3:1.
- So the second channel does the accessibility work, and it already exists: MoneyDisplay shows a plus or minus icon with every coloured amount.

The best seven, in the order a chart should use them (each next colour is the furthest from those before it): blue (hue 261, step 1100), ochre (80, 800), magenta (343, 1100), teal (179, 900), violet (300, 800), olive (123, 1100), red (18, 1000). The first two are 0.235 apart, the first three 0.137, the first four 0.107. The exact values are set with the hue ramps in #233.

## Decision (proposed)

1. **One hue set.** The base hue ramps (#233) are designed for status, category labels and data together: red, orange, yellow (ochre), olive, green, teal, blue, violet and magenta, each on the 12-step structure. No separate data palette (P4).
2. **Categorical: seven colours plus "other".** `color.data.categorical.1`–`7` point at ramp steps in the order above; `color.data.categorical.other` is neutral (`gray.900`) for a remainder series. A chart with more than seven coloured series groups the rest into "other" or labels them directly. Every categorical colour is at least 3:1 on the page and white.
3. **Category labels keep their names.** `color.category.*` (blue, purple, pink, yellow, green, red, orange, gray) is CategoryLabel's public API, so it stays, re-pointed at the same ramps (purple to violet, pink to magenta, yellow to ochre) in the retune ([#190](https://github.com/common-origin/common-origin-design-system/issues/190)).
4. **Good and bad values use green and red**, as every enterprise system does: `color.data.positive` (green, step 900) for gains and money in, and `color.data.negative` (red, step 1100) for losses and money out. The different lightness steps are deliberate. On the same step they'd be indistinguishable under deuteranopia. They're never shown by colour alone: a sign, an arrow or a label always goes with them (MoneyDisplay already shows a plus or minus icon).
5. **Comparisons with no good or bad use a neutral diverging pair**: `color.data.diverging.balance.{1…5}`, blue through neutral to orange (0.27 or more apart under every kind of vision), for differences from an average, or change that isn't a judgement. Like Carbon's purple–teal, it avoids reading as good or bad.
6. **Sequential is one hue**: `color.data.sequential.blue.{1…5}`, five steps of the blue ramp, for magnitude (heatmaps, spend intensity).
7. **Never colour alone** (WCAG 1.4.1): charts carry direct labels or a legend, and line series also differ by marker or dash. The rule goes in `visual-language.md`.
8. **Dark values come later.** When a theme mode exists, the data tokens get dark contexts from the same ramps; nothing is built for it now.

## Consequences

- #233 designs the nine hue ramps with the categorical steps above as fixed points, keeps green and red apart in lightness at the steps positive and negative use, separates warning from danger by lightness, and gets the values signed off (0022).
- After #233: the `color.data.*` tokens are added (seven categorical plus other, positive and negative, five neutral diverging and five sequential: 20 tokens) with descriptions saying they're for data only, never status, and the order rule.
- #190 re-points `color.category.*`, the status roles and the transaction colours at the new ramps. The transaction credit and debit tokens follow `color.data.positive` and `color.data.negative`.
