# Semantic tokens

Semantic tokens say what a value is **for**: primary text, the resting edge of a control, padding inside a component. Components read them by default ([decision 0014](../foundation/decisions/0014-token-tiers.md)). Names follow one grammar, `{category}.{property}.{key}`; see the [overview](README.md#naming-grammar). Each token's `$description` gives its job and, for colours, its contrast. This page explains each category: what it's for, how to choose within it, and the decisions behind it. For the scales underneath, see [Base tokens](base.md).

A category marked **moving** is changing in the palette retune ([#190](https://github.com/common-origin/common-origin-design-system/issues/190)).

## Colour

Colour is split by **property**: what the colour is painted on.

| Property | Painted on | Neutral tokens | Role tokens |
|---|---|---|---|
| `color.text` | Text | `default`, `muted`, `disabled`, `inverse` | `accent`, `danger`, `serious`, `warning`, `success`, `ai` |
| `color.icon` | Icons and other foreground marks | the same as text | the same as text |
| `color.border` | Edges and outlines | `default` (dividers), `input` and `input-hover` (control edges), `focus`, `none` | `accent`, `danger`, `serious`, `warning`, `success`, `ai` |
| `color.fill` | The backgrounds of controls and indicators | `default`, `muted`, `emphasis`, `inverse`, `disabled`, `none` | `accent`, `danger`, `serious`, `warning`, `success`, each with `-muted`, and `ai-muted` |

**How to choose:**

- **Pick the property first, then the role, then the emphasis and state.** A selected tab's background is `fill.accent-muted`, and the same tab hovered is `fill.accent-muted-hover`.
- **Text and icons have two levels: primary (`default`) and secondary (`muted`).** Emphasis comes from weight and scale, never a darker colour ([decision 0048](../foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)).
- **Neutral controls step along the fill ladder:** `fill.default`, `fill.default-hover`, `fill.default-pressed`. Every state has a different value.
- **A control with no fill at rest** uses `none`. On the page or a raised surface, it steps onto the ladder: `default` on hover and `default-hover` on press, as the naked Button does. Over a tinted or image background, it uses the translucent `none-hover` and `none-pressed` instead, so the tint works on any surface (for example a chip's close button).
- **Solid fills that carry text** (`fill.emphasis`, `fill.accent`, `fill.danger` and the other role fills) sit on step 1200 or 1100, so white text reads at 4.5:1 or more. They have no darker steps to move to, so hover and pressed mix `text.inverse` into the fill at `opacity.state.hover` and `opacity.state.pressed` (8% and 12%), as Material 3's state layers do ([decision 0048](../foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)). They get slightly lighter.
- **Role text and icons are step 1100 of their ramp** (about 6:1), and keep one colour in every state: a selected item's fill shows hover and pressed. Role borders are step 800 (3:1 or more). Role tints (`-muted`) follow the fill ladder from 300, so they're quiet: alerts and selected items read by their border, icon and text.
- **A control's edge is `border.input`** (at least 3:1). `border.default` is for dividers and decorative outlines only, and never marks a control ([decision 0025](../foundation/decisions/0025-control-borders-meet-3-to-1.md)).
- **There is one focus ring,** `border.focus`. It's near-black, never blue ([decision 0029](../foundation/decisions/0029-accent-emphasis-audit.md)).
- **Roles mean the same thing everywhere** ([decision 0043](../foundation/decisions/0043-data-colours.md)):
  - **Accent** is links, selection and neutral information, never decoration ([decision 0003](../foundation/decisions/0003-use-of-blue.md)). A selected item uses the light accent-muted fill ([decision 0016](../foundation/decisions/0016-accent-selection-and-chip-types.md)).
  - **AI** always comes with the AI icon and a label.
  - **Status** follows the status indication pattern: text and a shape or symbol as well as colour ([decision 0045](../foundation/decisions/0045-status-indication.md)).

**Category colours.** `color.category.*` serves CategoryLabel. It uses the four display hues (`olive`, `periwinkle`, `rose`, `magenta`), which carry no meaning, plus `gray` for uncategorised or "other" ([decision 0043](../foundation/decisions/0043-data-colours.md)). Each colour has the same four jobs:
- the plain key is the outline (step 800)
- `-strong` is the filled background, with white text (1100)
- `-text` is the outlined and minimal text (1100)
- `-muted` is the minimal fill (300)

A category never uses a role colour, and a role is never shown with a category colour. A trend, for example, is a differential indicator in the success or danger role, not a green or red label ([decision 0045](../foundation/decisions/0045-status-indication.md)). Beyond five categories, the icon and text tell them apart. The old hue names are deprecated aliases of the nearest display hue until 3.0.

**Data colours.** `color.data.*` is for charts and other data display. Each chart type has its own set, and a chart never mixes sets ([decision 0043](../foundation/decisions/0043-data-colours.md)):

| Set | Tokens | Use for |
|---|---|---|
| Good and bad | `data.positive` (success 900), `data.negative` (danger 900) | gains and losses, money in and out. Equal steps give equal weight, and every value carries a sign or arrow |
| Categories | `data.categorical.1`–`4` (olive, periwinkle, rose, magenta), `data.categorical.other` (grey) | series with no meaning, in order. More than four coloured series are grouped into "other" or labelled directly |
| Comparison | `data.diverging.balance.1`–`5` (olive through neutral grey to magenta) | differences from a midpoint with no good or bad |
| Magnitude | `data.sequential.periwinkle.1`–`5` (light to dark) | how much, as in heatmaps and maps |

Every series also has a legend or a direct label. Positive green and categorical olive are close under colour blindness, which is one more reason a chart doesn't mix sets.

## Surface

`surface.*` holds the ordered backgrounds that content sits on ([decision 0031](../foundation/decisions/0031-semantic-token-grammar.md)):

- `surface.base` is the page, the off-white everything sits on ([decision 0006](../foundation/decisions/0006-page-background.md)).
- `surface.raised` is white content on the page: cards, inputs, sheets and dialogs.
- `surface.scrim` is the backdrop behind a modal.

A surface pairs with an `elevation` token. `sunken` and `overlay` surfaces join only when something needs them ([P4](../foundation/principles.md#p4-earn-its-place)). Surfaces are for areas; the backgrounds of controls are `color.fill`.

## Space

- **`space.{n}`** is the spacing scale, where `n` is the multiple of 4px × 100: `space.100` is 4px, `space.400` 16px and `space.800` 32px. Use it for gaps between elements, groups, blocks and sections. Smaller steps sit inside groups, and larger ones separate sections. Each token's description says which kind of gap it's for.
- **`space.inset.{xs…2xl}`** is padding inside a component. It's what density changes: compact makes it one step tighter, and comfortable one step roomier ([decision 0032](../foundation/decisions/0032-token-modes.md)).
- **Components have no spacing tokens of their own** ([decision 0022](../foundation/decisions/0022-no-component-spacing-tokens.md)). Their spacing comes from these scales, so a density mode reaches every component.

## Size

- **`size.{n}`** is the size scale, keyed like `space` and holding only the steps in use. Its descriptions name the parts each step sizes.
- **`size.control.{sm, md, lg}`** is the minimum height of controls: 32, 40 and 48px ([decision 0034](../foundation/decisions/0034-control-heights.md)). Content centres within it. Density shifts the scale by 8px.
- **`size.label.{small, medium, large}`** is the label heights: 20, 24 and 32px. Every chip is the medium height ([decision 0018](../foundation/decisions/0018-indicators-and-labels.md), [decision 0035](../foundation/decisions/0035-chips-have-one-size.md)).
- **`size.pointerTarget`** (24px) is the minimum hit area for a control that's smaller to look at, extended with an invisible pseudo-element ([decision 0039](../foundation/decisions/0039-target-size.md)). On touch screens, `size.touchTarget` (44px) applies.
- **Named roles** shared by several components: `size.icon.*`, `size.avatar.*`, `size.overlay.*` (Modal and Sheet widths) and `size.menu.maxHeight`. A size unique to one component is a component token that references `size.{n}`.

## Radius

`radius.none` to `radius.3xl`, plus `radius.full` for pills, circles and chips. The descriptions match radius to object size: small controls get `sm`, cards `md`, and modals and sheets `lg`. Use the step for the kind of object, so corners stay consistent across the system.

## Border

- `border.width.thin` is a hairline, for dividers, control edges and rings. `border.width.thick` is for focus rings and selected states.
- `border.focusOffset` is the gap between an element and its focus ring.
- Composite borders combine width, style and colour: `border.default` (a divider), `border.focus` (the focus ring) and `border.input-hover` (a firm hairline).

## Elevation and layer

- **`elevation.*`** is shadows by purpose: `none`, `inset` (wells and pressed states), `raised` (cards), `floating` (menus and popovers), `overlay` (dialogs) and `sticky` (fixed bars). Each pairs with the surface it lifts.
- **`layer.*`** is stacking order, by name: `sticky` < `dropdown` < `overlay` < `modal` ([decision 0013](../foundation/decisions/0013-z-index-layers.md)). Use the name for what the element is, never a number.

## Typography

- **`typography.*`** is complete text styles: `display`, `h1`–`h6`, `subtitle`, `body`, `small`, `overline`, `caption` and `label`. Use a style wherever one fits. Heading levels follow the page outline, not the size wanted.
- **The parts** (`fontFamily`, `fontSize`, `lineHeight`, `letterSpacing` and `fontWeight`) are small named scales holding only the steps components use. They're for a component that departs from a style, such as Alert's semibold title, which combines `h6` with `fontWeight.semibold` through component tokens ([decision 0014](../foundation/decisions/0014-token-tiers.md)).
- Hierarchy comes from weight and scale, not colour.

## Motion

Motion explains change: it's quick, eased and never decorative ([P6](../foundation/principles.md#p6-motion-responds-it-doesnt-perform), [decision 0005](../foundation/decisions/0005-motion.md), [decision 0037](../foundation/decisions/0037-motion-tokens.md)).

- **`motion.duration`:**
  - `instant` (0ms) is for changes that should happen at once, including movement under reduced motion.
  - `fast` (150ms) is for responses to input.
  - `moderate` (200ms) is the default for state changes and short movements.
  - `slow` (300ms) is the longest, for larger movements.
- **`motion.easing`** is named by the curve's job:
  - `standard` for change in place
  - `decelerate` for things arriving or responding
  - `accelerate` for things leaving
- **`motion.transition.{feedback, focus, press}`** are composites that name their properties. Never use `transition: all`.
- **`motion.distance.sm`** is how far a small element travels as it enters. Reduced motion can set it to zero.

## Opacity

- `opacity.disabled` (0.5) and `opacity.full` are for disabled and enabled content.
- `opacity.hover` (0.8) and `opacity.pressed` (0.7) are for content that fades in response to input, such as a clickable card's image.
- `opacity.state.hover` (0.08) and `opacity.state.pressed` (0.12) are the state layers for solid fills, described under Colour.

## Breakpoint

`breakpoint.xs`–`2xl` are where layouts change, mobile first. They stay plain values, not CSS variables, because media queries can't read variables ([decision 0041](../foundation/decisions/0041-components-read-css-variables.md)).

## Component tokens

Component tokens sit above this tier, only where a component departs from it, a family shares a decision, or a variant-and-state matrix needs its own values. Examples are `component.button`, `component.input` and `component.badge`. They reference semantic tokens, and each has its own description. See [the tiers](README.md#three-tiers).
