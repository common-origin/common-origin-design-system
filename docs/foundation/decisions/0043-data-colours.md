# 0043. Colour by meaning: role ramps, display ramps, and how data uses each

- **Status:** Accepted
- **Date:** 2026-10-18
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P4, P5
- **Amends:** [0003](0003-use-of-blue.md) (blue also means information); [0010](0010-agentinput-working-ring.md) (AgentInput's working ring moves to the AI role)
- **Issue:** [#196](https://github.com/common-origin/common-origin-design-system/issues/196), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

[0040](0040-own-oklch-palette.md) makes the palette our own, in OKLCH, with a 12-step structure where every step has one job; the hue ramps wait for this decision ([#233](https://github.com/common-origin/common-origin-design-system/issues/233)). [0031](0031-semantic-token-grammar.md) reserves `color.data.*` for charts and other data display. Nothing in the package draws charts yet; A2UI will.

The owner's direction (2026-10-18): **colour starts from meaning, not from the palette we have.** Every hue means one thing everywhere, and every step does the same job in every ramp. Today's hues are free to change. Status is never colour alone: it's colour with text and a shape or symbol, a pattern researched in [#257](https://github.com/common-origin/common-origin-design-system/issues/257) after IBM Carbon's status indicators.

**How other systems do it:**

- **GitHub's Primer gives each role one hue**: accent is blue (links, selected, focus, neutral information), success is green, attention is yellow, danger is red, done is purple. Labels and charts use a separate display palette with no meaning.
- **Vercel's Geist gives every step the same job on every scale**: backgrounds, borders, solid fills, text.
- **IBM Carbon's status set** is red (error), orange (serious warning), yellow (warning), green (success), blue (information, progress), grey (draft), purple (outlier). Every indicator carries at least three of symbol, shape, colour and text.
- **Charts follow meaning**: SAP Fiori, Polaris Viz and Atlassian (`color.chart.success`, `color.chart.danger`) use green for good values and red for bad ones; Carbon uses neutral pairs where values aren't good or bad.
- **Purple's emerging meaning is AI.** Shape of AI's survey finds purple "present in a majority of" AI products (Figma, Canva, Notion, Grammarly, Intercom); Shopify developers ask for an "AI purple" to match Sidekick. GitHub uses it for merged/done, Carbon for outliers; it has no settled status meaning elsewhere.

**Measured** (OKLCH; WCAG contrast; colour-vision simulation per Machado, Oliveira and Fernandes 2009, protan, deutan and tritan at full severity; "separation" is the smallest OKLab distance between any two colours under the worst of the four kinds of vision; display candidates use the ramp steps 800–1100, which clear 3:1 on the page, and sit at least 20° from every role hue):

- Today's category labels use the same red, green, yellow and orange as status, so a "red" category reads as an error. Blue and purple categories are 0.019 apart under deuteranopia; warning and danger 0.017.
- The more hues carry meaning, the fewer meaningless display colours fit: four role hues leave six display colours (0.089); five leave five (0.105); **six leave four (0.140)**, and a fifth drops to 0.040. For reference, Okabe and Ito's colour-blind-safe set is 0.076, with three colours under 3:1.
- Role pairs need lightness splits: green and red on the same step are 0.031 apart under deuteranopia (green 900 with red 1100: 0.104); yellow and green 0.038 under protanopia.

## Decision

1. **Two kinds of hue ramp**, both on 0040's 12-step structure, with each step doing the same job in every ramp.
   - **Role ramps carry one meaning, everywhere:** UI, status and data.

     | Role | Hue | Means |
     |---|---|---|
     | accent | blue | Links, selected and active states, the accent action, neutral information, in progress |
     | success | green | Success, positive values, money in |
     | warning | yellow | Attention, a regular warning |
     | serious | orange | A serious warning, between warning and danger |
     | danger | red | Errors, destructive actions, negative values, money out |
     | AI | purple | AI-generated content, agent actions, "working" states |
     | neutral | grey | Chrome, text, drafts and not-started states |

   - **Display ramps carry no meaning**, for category labels and categorical data: olive (hue 117), periwinkle (277), rose (4) and magenta (329), at least 20° from every role hue.
2. **Meaning is never colour alone.** Status shows text and a shape or symbol with its colour (#257); good and bad values show a sign or arrow; AI shows its icon and a label; charts carry direct labels or a legend (WCAG 1.4.1).
3. **Data uses the ramp that matches its meaning.**
   - Good and bad values: `color.data.positive` (success) and `color.data.negative` (danger), on lightness steps chosen so they stay apart under colour blindness.
   - Categories: `color.data.categorical.1`–`4` (display ramps, in the order above as tuned in #233) and `color.data.categorical.other` (neutral). More than four coloured series are grouped into "other" or labelled directly.
   - Comparisons with no good or bad: `color.data.diverging.balance.{1…5}`, between two display hues, through neutral.
   - Magnitude: `color.data.sequential.{display hue}.{1…5}`, one display hue.
4. **Category labels move to the display colours.** CategoryLabel's names become olive, periwinkle, rose, magenta and gray in 2.x; the old names (blue, purple, pink, yellow, green, red, orange) become deprecated aliases of the nearest display colour, removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)). Beyond five categories, the icon and text tell them apart.
5. **Blue also means information** (amends 0003), as Primer's accent role does; in-progress status is blue with its own symbol and label.
6. **AgentInput's working ring moves to the AI role** (amends 0010) when the role ramps land.
7. **Dark values come later**, from the same ramps, when a theme mode exists.

## Consequences

- #233 designs six role ramps and four display ramps. It splits success from danger and warning from success by lightness, checks rose against danger and periwinkle against accent and AI side by side, and gets the values signed off (0022).
- After #233: 17 `color.data.*` tokens (four categorical plus other, positive and negative, five diverging, five sequential), the serious and AI role tokens, and the CategoryLabel display names are added.
- #257 settles the status set, shapes and symbols, on these role hues.
- #190 re-points the status roles, the transaction colours (credit to positive, debit to negative), `color.category.*` and AgentInput's ring at the new ramps.
- 3.0 removes the old category names with the old base palette.
