# 0043. Colour by meaning: role ramps, display ramps, and how data uses each

- **Status:** Proposed
- **Date:** 2026-10-18
- **Decided by:** Ollie (owner), pending
- **Principles:** P1, P2, P4, P5
- **Issue:** [#196](https://github.com/common-origin/common-origin-design-system/issues/196), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

[0040](0040-own-oklch-palette.md) makes the palette our own, in OKLCH, with a 12-step structure where every step has one job; the hue ramps wait for this research ([#233](https://github.com/common-origin/common-origin-design-system/issues/233)). [0031](0031-semantic-token-grammar.md) reserves `color.data.*` for charts and other data display. Nothing in the package draws charts yet; A2UI will (money in and out, spending by category).

The owner's direction (2026-10-18): **colour starts from meaning, not from the palette we have.** Every hue means one thing everywhere, and every step does the same job in every ramp. Today's hues are free to change.

**How the systems we compared do it:**

- **GitHub's Primer gives each role one hue, one to one**: accent is blue (links, selected, focus, neutral information), success is green, attention is yellow, danger is red, done is purple, sponsors is magenta. Labels and charts use a separate display palette that carries no meaning.
- **Vercel's Geist gives every step the same job on every scale**: 100–300 component backgrounds, 400–600 borders, 700–800 solid fills, 900–1000 text.
- **Charts follow the roles.** SAP Fiori's chart palette uses green for good and red for bad, Shopify Polaris Viz uses green for positive and red for negative, and Atlassian has `color.chart.success` and `color.chart.danger` beside its categorical set. IBM Carbon keeps its alert colours for status and uses neutral pairs (purple–teal, red–cyan for temperature) where values aren't good or bad.
- **Accessibility comes from a second channel** (an icon, a sign, a label), not from giving up meaning: Material, Carbon and financial UI guidance agree.

**Measured** (OKLCH; WCAG contrast; colour-vision simulation per Machado, Oliveira and Fernandes 2009, protan, deutan and tritan at full severity; "separation" is the smallest OKLab distance between any two colours, under the worst of the four kinds of vision; candidates use the ramp steps 800–1100, the ones that clear 3:1 on the page):

- **Today's colours don't carry meaning cleanly.** Category labels use the same red, green, yellow and orange as status, so a "red" category reads as an error. Blue and purple categories are 0.019 apart under deuteranopia, and warning and danger 0.017.
- **Display colours, kept at least 20° from the role hues** (danger 25°, warning 90°, success 150°, accent 255°):

  | Display colours | Separation | Lowest contrast on the page |
  |---|---|---|
  | 5 | 0.114 | 3.37:1 |
  | **6** | **0.089** | **3.41:1** |
  | 7 | no set fits | |

  For reference, Okabe and Ito's colour-blind-safe set separates by 0.076, with three colours under 3:1. With warning at amber (75°) instead of yellow, the sixth display colour is an orange that sits between danger and warning. With a 25° margin, six don't fit and five drop to 0.051.
- The six, in chart order: orchid (hue 322, step 800), rose (357, 1100), lime (122, 900), indigo (282, 1100), teal (180, 900), umber (61, 1100).
- **Role pairs:** danger against warning goes from 0.017 today to 0.152 or more. Warning against success (yellow and green) is 0.038 under protanopia at equal-ish steps, and success against danger drops to 0.031 on the *same* step. Both pairs need deliberate lightness splits in #233; green 900 with red 1100 gives 0.104.

## Decision (proposed)

1. **Two kinds of hue ramp, both on 0040's 12-step structure, where each step has the same job in every ramp.**
   - **Role ramps carry meaning, and the same meaning everywhere:** UI, status and data.
     - accent: blue (links, focus, selected, information, the accent action; [0003](0003-use-of-blue.md), [0016](0016-accent-selection-and-chip-types.md))
     - success: green (success, positive values, money in)
     - warning: yellow (attention, in progress)
     - danger: red (errors, destructive actions, negative values, money out)
     - neutral: grey
   - **Display ramps carry no meaning**, and are for categories and categorical data only: orchid, rose, lime, indigo, teal and umber. Each sits at least 20° from every role hue, so a category never reads as a status.
2. **Data uses the ramp that matches its meaning.**
   - Good and bad values (gains and losses, money in and out, on or off target) use the role ramps: `color.data.positive` (success) and `color.data.negative` (danger), on lightness steps chosen so they stay apart under colour blindness. They always come with a second channel, such as a sign, an arrow or a label (MoneyDisplay already shows a plus or minus icon).
   - Categories use the display ramps: `color.data.categorical.1`–`6` in the order above, plus `color.data.categorical.other` (neutral). More than six coloured series are grouped into "other" or labelled directly.
   - Comparisons with no good or bad use two display hues: `color.data.diverging.balance.{1…5}`, indigo through neutral to umber.
   - Magnitude uses one display hue: `color.data.sequential.indigo.{1…5}`.
3. **Category labels move onto the display ramps.** CategoryLabel's colour names (blue, purple, pink, yellow, green, red, orange) are role or near-role hues today. In 2.x the new display names are added and the old ones become deprecated aliases. The old names are removed in 3.0, with the palette ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).
4. **Never colour alone** (WCAG 1.4.1): status carries an icon, good and bad values a sign or arrow, and charts direct labels or a legend.
5. **Dark values come later**, from the same ramps, when a theme mode exists.

## Consequences

- #233 designs four role ramps and six display ramps. It splits success from danger and warning from success by lightness, and gets the values signed off (0022).
- After #233: 15 `color.data.*` tokens (six categorical plus other, positive and negative, five diverging, five sequential) and the CategoryLabel display names are added.
- #190 re-points the status roles, the transaction colours (credit to positive, debit to negative) and `color.category.*` at the new ramps.
- 3.0 removes the old category names with the old base palette.
