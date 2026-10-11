# 0031. Semantic tokens follow one naming grammar

- **Status:** Accepted
- **Date:** 2026-10-11
- **Decided by:** Ollie (owner)
- **Principles:** P3, P5, P7
- **Amends:** [0014](0014-token-tiers.md): the tiers and reference rules stay; this decision sets how semantic tokens are named
- **Issue:** [#192](https://github.com/common-origin/common-origin-design-system/issues/192), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

A review of seven design systems (Primer, Spectrum, Atlassian, Carbon, Material, Polaris and Radix; summarised in #187) found that our three tiers match common practice but our semantic names don't. Every system names colour by property, then role, then emphasis, then state, from small closed vocabularies (Atlassian's `color.background.danger.bold.hovered`, Primer's `bgColor-danger-emphasis`). They order surfaces separately from colour roles, name spacing on a numeric scale, and name motion easing by purpose.

Our semantic tier grew one decision at a time:

- **Colour words are inconsistent.** `background.default` is the page's off-white while `background.subtle` is white; `border.subtle` is darker than `border.default`; states are bolted on (`interactive-subtle-active`); `subdued`, `subtle` and `emphasis` mix two scales.
- **Surfaces and fills share `color.background`**, so nothing says which is the page, which sits on it, and which fills a control.
- **`spacing.layout` re-labels the base scale** with 17 t-shirt sizes (`xs` … `11xl`), and is the most-used semantic group (364 references in components).
- **Domain and component decisions sit in the system tier:** `color.status.*` (transaction statuses), `color.financial.*`, `background.progressTrack`, `typography.button1–3`, `typography.breadcrumb`, `border.tooltip`.

The package is published, so names are a contract (P7). The migration must be able to add every new name **beside** the old one in 2.x, with no value changes, and remove the old names in 3.0. That rules out reusing an existing name with a new value, which would change consumers' styles silently, and it rules out a new name that would turn an existing token into a group. The review's draft vocabulary (`subtle · default · strong`) failed that test: `border.subtle`, `border.default`, `border.strong`, `background.subtle` and `background.default` would all have changed value. The vocabulary below passes it, checked against every current token.

## Decision

### 1. Grammar

A semantic token is `{category}.{property}.{key}`.

| Category | Holds |
|---|---|
| `color` | Colour, by property: `text`, `icon`, `border`, `fill` |
| `surface` | Ordered backgrounds that content sits on: `sunken` · `base` · `raised` · `overlay`, plus `scrim` |
| `space` | Spacing (section 3) |
| `size` | Sizes: the numeric scale and named roles (`touchTarget`, `icon`, `avatar`, `control`…) |
| `radius` | Corner radii: `none`, `xs` … `3xl`, `full` |
| `border` | Border widths and composite borders |
| `elevation` | Shadows, paired with surfaces |
| `layer` | Stacking order (z-index): `sticky` < `dropdown` < `overlay` < `modal` ([0013](0013-z-index-layers.md)) |
| `typography`, `fontFamily`, `fontSize`, `lineHeight`, `letterSpacing`, `fontWeight` | Text styles and their parts |
| `motion` | Durations, easing, transitions and distances (section 4) |
| `opacity`, `breakpoint` | As today |

**Colour keys** are built from closed vocabularies, joined with hyphens in one key:

| Slot | Vocabulary | Omitted when |
|---|---|---|
| role | `accent`, `danger`, `warning`, `success`, `inverse`, and `input` for control borders ([0025](0025-control-borders-meet-3-to-1.md)); neutral has no word | neutral |
| emphasis | `muted`, `default`, `emphasis` | `default`, if a role is written |
| state | `hover`, `pressed`, `selected`, `focus` | at rest |

Neutral keys always name their emphasis: `default`, `default-hover`, `muted`, `emphasis-pressed`. Role keys drop `default`: `accent`, `accent-hover`, `accent-muted`, `accent-muted-pressed`. Three words stand alone because they replace emphasis: `disabled`, `focus` (`color.border.focus`, the one focus ring) and `none` (transparent, as in `color.fill.none-hover` for a naked control). CSS variables read the same as the path: `--co-semantic-color-fill-accent-muted-hover`.

The emphasis words are Primer's (`muted`, `emphasis`) rather than the draft's (`subtle`, `strong`), because ours already exist with other values. Keys are hyphen-joined rather than nested because Style Dictionary 5 can't yet make a group that is also a token (DTCG `$root`), and nesting would turn `color.text.success` into a group.

`fill` is the property for coloured backgrounds of controls and indicators (Polaris's split between surfaces and fills). `color.background.*` is retired: surfaces move to `surface.*` and fills to `color.fill.*`.

### 2. Surfaces

`surface.base` is the page (the off-white of [0006](0006-page-background.md)); `surface.raised` is white content on it (cards, inputs, sheets); `surface.overlay` is menus and dialogs; `surface.sunken` is wells and insets; `surface.scrim` is the backdrop behind a modal. Each surface pairs with an `elevation.*` token. Only surfaces in use get tokens (P4): today that's `base`, `raised` and `scrim`.

### 3. Spacing

- **`space.{n}`**: a numeric scale where the number is the multiple of the 4px grid unit × 100: `space.0`, `space.050` (2px), `space.100` (4px), `space.200` (8px), `space.300` (12px), `space.400` (16px), `space.600` (24px), `space.800` (32px), and so on. Polaris uses the same scheme. A step can be inserted later (`space.150` = 6px) without renaming. It replaces `spacing.layout` and `spacing.separator`, and only holds steps in use.
- **`space.inset.*`, `space.stack.*`, `space.inline.*`**: role groups for padding inside a component, vertical gaps and horizontal gaps. These are what density changes ([0032](0032-token-modes.md)). `spacing.component` becomes `space.inset`; components move to the right role family by family, and `stack` and `inline` values are signed off as they are added ([0022](0022-no-component-spacing-tokens.md)).
- `base.spacing` and `base.size` merge into one base dimension scale with the same keys as `space` and `size`.

### 4. Motion

- `motion.duration.{instant, fast, moderate, slow}`: 0, 150, 200 and 300ms (`normal` becomes `moderate`). 300ms stays the maximum ([0005](0005-motion.md)).
- `motion.easing.{standard, decelerate, accelerate}`, named by the curve's job as Material and Fluent do: `standard` for change on screen, `decelerate` for things arriving or responding (entering, hover), `accelerate` for things leaving. Never linear ([0015](0015-reduced-motion.md)). The names describe the curve, not one use, because today's `easeOut` serves entrances, hover feedback and some exits; whether those exits should accelerate is a visual question for #195.
- `motion.transition.{feedback, focus, press, enter, exit}`: composites that name their properties. The `transition: all` composites (`motion.transition.fast/normal/slow`) are removed in 3.0.
- `motion.distance.*`: how far an element travels when it enters or exits, so reduced motion can set it to zero ([0032](0032-token-modes.md)).

Details and values are settled in [#195](https://github.com/common-origin/common-origin-design-system/issues/195).

### 5. Reserved: data colours

`color.data.*` is reserved for charts and other data display: `color.data.categorical.{1…n}`, `color.data.sequential.{name}.{step}`, `color.data.diverging.{name}.{step}`. Data colours never carry status meaning; a chart that shows status uses status colours on purpose. Nothing is built until [#196](https://github.com/common-origin/common-origin-design-system/issues/196) decides the palette.

### 6. Domain and component tokens leave the semantic tier

`color.status.*`, `color.financial.*`, `background.progressTrack`, `typography.button1–3`, `typography.breadcrumb` and `border.tooltip` move to component tokens: `component.status.*` (the status indicators), `component.transaction.*` (amounts), `component.track.background` (ProgressBar and Slider, [0026](0026-slider-track-stays-light.md)), Button's existing `font` tokens, `component.breadcrumbs.font` and `component.tooltip.border`. They are moves, not new decisions, so they keep their values.

`color.category.*` keeps its own `{hue}-{emphasis}` shape for now (`blue`, `blue-muted`, `blue-emphasis`, `blue-text`); whether it joins `color.data` is a question for #196.

### 7. Migration

- **2.x:** every new name is added beside the old one, resolving to the same value. The golden file shows only added paths. Old names get `Deprecated:` descriptions and a test that fails if components use them. Components migrate family by family ([#189](https://github.com/common-origin/common-origin-design-system/issues/189)).
- **3.0:** old names are removed ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)), with the table below in the release notes.

## Consequences

- No current token changes value in this migration; every rename is additive until 3.0. A script that checks this (no new name equals an old name with another value, or turns a token into a group) runs in the first implementation PR.
- New tokens with no current equivalent (`surface.sunken` and `surface.overlay` when used, `space.stack.*`, `space.inline.*`, `size.control.*`, `motion.distance.*`, `motion.easing.accelerate`, `motion.transition.enter/exit`) still need the owner's sign-off with values ([0022](0022-no-component-spacing-tokens.md)).
- `motion.transition.*` gains new keys beside the old ones; the old `fast`, `normal` and `slow` are removed in 3.0.
- Agents and people can derive a token name from intent ("accent fill, pressed" → `color.fill.accent-pressed`) instead of looking it up.

## Appendix: every semantic token, today → new

Generated from `src/tokens/semantic/index.json` on 2026-10-11 (265 tokens).

Unchanged: `elevation.*`, `breakpoint.*`, `opacity.*`, `fontFamily.*`, `fontSize.*`, `lineHeight.*`, `letterSpacing.*`, `fontWeight.*`.

**`zIndex`**

| Today | New |
|---|---|
| `zIndex.sticky` | `layer.sticky` |
| `zIndex.dropdown` | `layer.dropdown` |
| `zIndex.overlay` | `layer.overlay` |
| `zIndex.modal` | `layer.modal` |

**`border`** (unchanged: `default`, `focus`, `thin`, `thick`, `focusOffset`)

| Today | New |
|---|---|
| `border.subtle` | `border.emphasis` |
| `border.strong` | `border.input-hover` (control borders on hover) |
| `border.tooltip` | component tier: `component.tooltip.border` |
| `border.radius.none` | `radius.none` |
| `border.radius.xs` | `radius.xs` |
| `border.radius.sm` | `radius.sm` |
| `border.radius.md` | `radius.md` <!-- verify-docs-ignore: token names, not files --> |
| `border.radius.lg` | `radius.lg` |
| `border.radius.xl` | `radius.xl` |
| `border.radius.2xl` | `radius.2xl` |
| `border.radius.3xl` | `radius.3xl` |
| `border.radius.circle` | `radius.full` |

**`size`** (unchanged: `touchTarget`, `sm`, `md`, `lg`, `small`, `medium`, `large`, `maxHeight`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `xs`, `sm`, `md`, `lg`, `xl`)

| Today | New |
|---|---|
| `size.dimension.1` | `size.100` |
| `size.dimension.2` | `size.200` |
| `size.dimension.4` | `size.400` |
| `size.dimension.5` | `size.500` |
| `size.dimension.6` | `size.600` |
| `size.dimension.8` | `size.800` |
| `size.dimension.12` | `size.1200` |
| `size.dimension.15` | `size.1500` |
| `size.dimension.18` | `size.1800` |
| `size.dimension.20` | `size.2000` |
| `size.dimension.30` | `size.3000` |
| `size.dimension.45` | `size.4500` |
| `size.dimension.50` | `size.5000` |
| `size.dimension.75` | `size.7500` |
| `size.dimension.90` | `size.9000` |
| `size.dimension.100` | `size.10000` |
| `size.dimension.192` | `size.19200` |

**`spacing`**

| Today | New |
|---|---|
| `spacing.separator.sm` | `space.400` |
| `spacing.separator.md` | `space.600` <!-- verify-docs-ignore: token names, not files --> |
| `spacing.separator.lg` | `space.800` |
| `spacing.separator.xl` | `space.1200` |
| `spacing.component.xs` | `space.inset.xs` |
| `spacing.component.sm` | `space.inset.sm` |
| `spacing.component.md` | `space.inset.md` <!-- verify-docs-ignore: token names, not files --> |
| `spacing.component.lg` | `space.inset.lg` |
| `spacing.component.xl` | `space.inset.xl` |
| `spacing.component.2xl` | `space.inset.2xl` |
| `spacing.layout.none` | `space.0` |
| `spacing.layout.xs` | `space.100` |
| `spacing.layout.sm` | `space.200` |
| `spacing.layout.md` | `space.300` <!-- verify-docs-ignore: token names, not files --> |
| `spacing.layout.lg` | `space.400` |
| `spacing.layout.xl` | `space.500` |
| `spacing.layout.2xl` | `space.600` |
| `spacing.layout.3xl` | `space.700` |
| `spacing.layout.4xl` | `space.800` |
| `spacing.layout.5xl` | `space.900` |
| `spacing.layout.6xl` | `space.1000` |
| `spacing.layout.7xl` | `space.1200` |
| `spacing.layout.8xl` | `space.1400` |
| `spacing.layout.9xl` | `space.1600` |
| `spacing.layout.10xl` | `space.2000` |
| `spacing.layout.11xl` | `space.2400` |
| `spacing.layout.auto` | stays until the keyword question in `docs/tokens/pipeline.md` §4 is settled <!-- verify-docs-ignore: token names, not files --> |

**`color.text`** (unchanged: `default`, `emphasis`, `inverse`, `disabled`, `success`, `warning`)

| Today | New |
|---|---|
| `color.text.subdued` | `color.text.muted` |
| `color.text.interactive` | `color.text.accent` |
| `color.text.interactive-hover` | `color.text.accent-hover` |
| `color.text.interactive-active` | `color.text.accent-pressed` |
| `color.text.error` | `color.text.danger` |

**`color.background`**

| Today | New |
|---|---|
| `color.background.default` | `surface.base` |
| `color.background.subtle` | split by use: `surface.raised` for surfaces (cards, inputs, sheets, dialogs, code blocks, TabBar); component tier: `component.slider.thumb.background` (same value) for Slider's thumb, a control rather than a surface |
| `color.background.emphasis` | `color.fill.emphasis` |
| `color.background.emphasis-hover` | `color.fill.emphasis-hover` |
| `color.background.emphasis-active` | `color.fill.emphasis-pressed` |
| `color.background.surface` | `color.fill.muted` |
| `color.background.inverse` | `color.fill.inverse` |
| `color.background.interactive` | `color.fill.accent` |
| `color.background.interactive-subtle` | `color.fill.accent-muted` |
| `color.background.interactive-subtle-hover` | `color.fill.accent-muted-hover` |
| `color.background.interactive-subtle-active` | `color.fill.accent-muted-pressed` |
| `color.background.interactive-hover` | `color.fill.accent-hover` |
| `color.background.interactive-active` | `color.fill.accent-pressed` |
| `color.background.error` | `color.fill.danger` |
| `color.background.error-hover` | `color.fill.danger-hover` |
| `color.background.error-active` | `color.fill.danger-pressed` |
| `color.background.error-subtle` | `color.fill.danger-muted` |
| `color.background.success` | `color.fill.success` |
| `color.background.success-subtle` | `color.fill.success-muted` |
| `color.background.warning` | `color.fill.warning` |
| `color.background.warning-subtle` | `color.fill.warning-muted` |
| `color.background.disabled` | `color.fill.disabled` |
| `color.background.neutral` | `color.fill.default` |
| `color.background.neutral-hover` | `color.fill.default-hover` |
| `color.background.neutral-active` | `color.fill.default-pressed` |
| `color.background.transparent` | `color.fill.none` |
| `color.background.progressTrack` | component tier: `component.track.background` |
| `color.background.page` | `surface.base` |
| `color.background.overlay` | `surface.scrim` |
| `color.background.hover-overlay` | `color.fill.none-hover` |
| `color.background.active-overlay` | `color.fill.none-pressed` |
| `color.background.inverse-overlay` | `color.fill.inverse-none-hover` |

**`color.border`** (unchanged: `default`, `success`, `warning`, `none`)

| Today | New |
|---|---|
| `color.border.subtle` | `color.border.emphasis` |
| `color.border.control` | `color.border.input` |
| `color.border.strong` | split by use: `color.border.input-hover` for control hover; `color.border.focus` for the focus ring ([0029](0029-accent-emphasis-audit.md)) and CardSmall's ring; `color.fill.inverse` (same value) for the Modal and Sheet drag handles |
| `color.border.interactive` | `color.border.accent` |
| `color.border.error` | `color.border.danger` |

**`color.icon`** (unchanged: `default`, `emphasis`, `disabled`, `inverse`, `success`, `warning`)

| Today | New |
|---|---|
| `color.icon.subdued` | `color.icon.muted` |
| `color.icon.interactive` | `color.icon.accent` |
| `color.icon.interactive-hover` | `color.icon.accent-hover` |
| `color.icon.interactive-active` | `color.icon.accent-pressed` |
| `color.icon.error` | `color.icon.danger` |

**`color.financial`**

| Today | New |
|---|---|
| `color.financial.credit` | component tier: `component.transaction.credit` |
| `color.financial.credit-hover` | component tier: `component.transaction.credit-hover` |
| `color.financial.debit` | component tier: `component.transaction.debit` |
| `color.financial.debit-hover` | component tier: `component.transaction.debit-hover` |
| `color.financial.pending` | component tier: `component.transaction.pending` |
| `color.financial.neutral` | component tier: `component.transaction.neutral` |

**`color.category`** (unchanged: `blue`, `blue-emphasis`, `purple`, `purple-emphasis`, `pink`, `pink-emphasis`, `yellow`, `yellow-emphasis`, `green`, `green-emphasis`, `red`, `red-emphasis`, `orange`, `orange-emphasis`, `gray`, `gray-emphasis`, `blue-text`, `purple-text`, `pink-text`, `yellow-text`, `green-text`, `red-text`, `orange-text`, `gray-text`)

| Today | New |
|---|---|
| `color.category.blue-strong` | `color.category.blue-emphasis` |
| `color.category.blue-subtle` | `color.category.blue-muted` |
| `color.category.purple-strong` | `color.category.purple-emphasis` |
| `color.category.purple-subtle` | `color.category.purple-muted` |
| `color.category.pink-strong` | `color.category.pink-emphasis` |
| `color.category.pink-subtle` | `color.category.pink-muted` |
| `color.category.yellow-strong` | `color.category.yellow-emphasis` |
| `color.category.yellow-subtle` | `color.category.yellow-muted` |
| `color.category.green-strong` | `color.category.green-emphasis` |
| `color.category.green-subtle` | `color.category.green-muted` |
| `color.category.red-strong` | `color.category.red-emphasis` |
| `color.category.red-subtle` | `color.category.red-muted` |
| `color.category.orange-strong` | `color.category.orange-emphasis` |
| `color.category.orange-subtle` | `color.category.orange-muted` |
| `color.category.gray-strong` | `color.category.gray-emphasis` |
| `color.category.gray-subtle` | `color.category.gray-muted` |

**`color.status`**

| Today | New |
|---|---|
| `color.status.pending` | component tier: `component.status.pending.text` |
| `color.status.pending-bg` | component tier: `component.status.pending.background` |
| `color.status.completed` | component tier: `component.status.completed.text` |
| `color.status.completed-bg` | component tier: `component.status.completed.background` |
| `color.status.failed` | component tier: `component.status.failed.text` |
| `color.status.failed-bg` | component tier: `component.status.failed.background` |
| `color.status.cancelled` | component tier: `component.status.cancelled.text` |
| `color.status.cancelled-bg` | component tier: `component.status.cancelled.background` |
| `color.status.processing` | component tier: `component.status.processing.text` |
| `color.status.processing-bg` | component tier: `component.status.processing.background` |
| `color.status.scheduled` | component tier: `component.status.scheduled.text` |
| `color.status.scheduled-bg` | component tier: `component.status.scheduled.background` |

**`typography`** (unchanged: `display`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `subtitle`, `body`, `small`, `overline`, `caption`, `label`)

| Today | New |
|---|---|
| `typography.button1` | component tier: `component.button.sizes.large.font` |
| `typography.button2` | component tier: `component.button.sizes.medium.font` |
| `typography.button3` | component tier: `component.button.sizes.small.font` |
| `typography.breadcrumb` | component tier: `component.breadcrumbs.font` |

**`motion`** (unchanged: `fast`, `slow`)

| Today | New |
|---|---|
| `motion.duration.normal` | `motion.duration.moderate` |
| `motion.easing.easeInOut` | `motion.easing.standard` |
| `motion.easing.easeOut` | `motion.easing.decelerate` |
| `motion.transition.fast` | removed in 3.0 (it is `transition: all`); use a property-named composite |
| `motion.transition.normal` | removed in 3.0 (it is `transition: all`); use a property-named composite |
| `motion.transition.slow` | removed in 3.0 (it is `transition: all`); use a property-named composite |
| `motion.hover` | `motion.transition.feedback` |
| `motion.focus` | `motion.transition.focus` |
| `motion.interactive` | `motion.transition.press` |
