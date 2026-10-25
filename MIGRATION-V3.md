# Migration guide: 2.x to 3.0

3.0 removes what 2.x deprecated. Almost every change is a rename to something that already exists in 2.23, so you can make most of these changes while still on 2.x, then upgrade. The full scope is in [#99](https://github.com/common-origin/common-origin-design-system/issues/99).

## Before you upgrade

1. **Upgrade to 2.23 first.** It has every replacement in this guide, including Box's token-path backgrounds (`bg="surface.raised"`) and `base.color.white`.
2. **Fix what TypeScript strikes through.** Each deprecated prop value, type and token in 2.23 is marked `@deprecated` with its replacement, so your editor shows it.
3. **Do the chip renames in order** (see [Chips](#chips)). Plain JavaScript projects get no error if they're done the other way round.
4. **Search for removed CSS variables** if you use `tokens.css` directly (see [Tokens](#tokens)).
5. Upgrade to 3.0 and run your type check: anything left is a type error, apart from plain JavaScript and CSS.

In plain JavaScript, a removed prop value doesn't crash. It falls back to the default look: Button `primary`, Badge `default`, CategoryLabel `periwinkle`, a block Alert, no Box background. So check what renders, not just what compiles.

## Components

| Removed | Use instead |
|---|---|
| `PageTitle` | `Typography variant="h1"` in a `Stack` |
| `StatusBadge` (and `StatusBadgeProps`) | `StatusLabel`, with the same `status`, `size`, `label` and `liveRegion`. `showIcon` is gone: the icon is always shown |
| `CategoryBadge` (and `CategoryBadgeProps`, `CategorySize`) | `CategoryLabel`, with `size="small"` → `"medium"` and `size="medium"` (or no size) → `"large"` |

## Chips

The chips are named by job ([decision 0016](docs/foundation/decisions/0016-accent-selection-and-chip-types.md)). The name `FilterChip` moved from the removable chip to the toggle chip, so **rename in this order**:

1. `FilterChip` → `InputChip` (the removable value; same props). Do this on 2.x.
2. Then `BooleanChip` → `FilterChip` (the toggle; same props), and `BooleanChipProps` → `FilterChipProps`.

If you skip step 1 in plain JavaScript, your old removable chips render as toggles that do nothing when clicked.

Also removed:

| Removed | Use instead |
|---|---|
| `Chip variant="emphasis" \| "subtle" \| "interactive" \| "light" \| "dark"` | Drop the variant: the static chip has one look |
| `Chip onClick` | A `Button` for an action, `FilterChip` for a toggle |
| `LegacyChip`, `LegacyVariant` | `Chip` |
| `size` on every chip | Drop it: chips have one size, 24px ([decision 0035](docs/foundation/decisions/0035-chips-have-one-size.md)) |
| `ChipGroup variant` | Drop it (`"dark"` rendered the removed emphasis chip) |

## Props and variants

| Component | Removed | Use instead |
|---|---|---|
| Button, Modal actions | `variant="emphasis"` | `variant="accent"` (same look) |
| Badge | `variant="primary" \| "error" \| "warning" \| "success"`, `DeprecatedBadgeVariant` | `variant="accent"` (same look). For a count of items with a status, use StatusLabel ("3 failed") |
| Tag | `variant="success" \| "warning" \| "error"` | `StatusLabel` |
| Tag | `variant="interactive"` | `variant="default"` |
| CategoryLabel | `color="blue" \| "purple" \| "pink" \| "yellow" \| "green" \| "red" \| "orange"`, `DeprecatedCategoryColor` | The display colour it already rendered as: blue → `periwinkle`, purple → `magenta`, pink, red and orange → `rose`, yellow and green → `olive` |
| DateFormatter `mode`, DateGroup `format` | `"relative"` | `"smart"` (same output) |
| Alert | `inline` | `<InlineAlert>` with the same `variant` and text. A message that needs a title, action or dismiss button stays an `Alert` (use `appearance="borderless"` inside content) |
| TabBar | `variant`, `TabVariant` | Drop it: every value has rendered as `underline` since 2.16 |
| Box | the old `bg` keys, `DeprecatedBoxBackground` | Token paths, below |
| Box | `color="subdued" \| "emphasis" \| "interactive" \| "error"…` | `muted`, `default`, `accent`, `danger` (the text colour table below) |
| Box | `border="subtle" \| "strong" \| "control" \| "interactive" \| "error" \| "emphasis"` | `default`, `input-hover`, `input`, `accent`, `danger`, `default` |

**Box `bg`:**

| Old | New |
|---|---|
| `default`, `page` | `surface.base` |
| `subtle` | `surface.raised` |
| `overlay` | `surface.scrim` |
| `surface` | `color.fill.muted` |
| `emphasis`, `inverse`, `disabled`, `success`, `warning` | `color.fill.<same name>` |
| `interactive`, `interactive-hover`, `interactive-active` | `color.fill.accent`, `color.fill.accent-hover`, `color.fill.accent-pressed` |
| `interactive-subtle` (and `-hover`, `-active`) | `color.fill.accent-muted` (and `-hover`, `-pressed`) |
| `error` (and `-hover`, `-active`, `-subtle`) | `color.fill.danger` (and `-hover`, `-pressed`, `-muted`) |
| `success-subtle`, `warning-subtle` | `color.fill.success-muted`, `color.fill.warning-muted` |
| `neutral` (and `-hover`, `-active`) | `color.fill.default` (and `-hover`, `-pressed`) |
| `transparent`, `hover-overlay`, `active-overlay`, `inverse-overlay` | `color.fill.none`, `color.fill.none-hover`, `color.fill.none-pressed`, `color.fill.inverse-none-hover` |
| `progressTrack` | `color.fill.default` |
| `emphasis-hover`, `emphasis-active` | None: hover and pressed states belong to the control that has them ([decision 0048](docs/foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)) |

**Box's spacing and radius props don't change.** `p="md"`, `gap="lg"`, `borderRadius="circle"` and the rest keep their names, now as Box's own `BoxSpace` and `BoxRadius` types, although the `semantic.spacing.layout` and `semantic.border.radius` tokens behind them are removed.

## Behaviour and types

- **AgentInput's `enableVoice` defaults to `false`.** Pass `enableVoice` to keep the mic.
- **GridSystem and ResponsiveGrid `gap*`** take `base.dimension` keys or `"auto"` instead of `base.spacing` keys. The keys you used have the same values, and steps such as `11` now work too.
- **`CategoryColor`** now means the display colours only.

## Tokens

433 tokens are removed, with their `tokens.css` variables (`--co-` plus the path with dots as hyphens). No token that remains changes value.

- **TypeScript and `tokens`/`tokens.json`:** a removed path is a type error. Use the replacement in the tables below.
- **CSS:** a removed variable is silently unset. Search your styles for the variable names below.
- **Values:** "(same value)" means the replacement had exactly the same value in 2.23, and "(same size)" means the same length in other units. Anything else shows both values.

### Base tier

| Removed | CSS variables | Use instead |
|---|---|---|
| `base.color.neutral.000` | `--co-base-color-neutral-000` | `base.color.white` (same value) |
| `base.color.neutral.100`–`1000` | `--co-base-color-neutral-*` | The `base.color.gray` ramp, whose steps have different values and jobs ([decision 0040](docs/foundation/decisions/0040-own-oklch-palette.md)). Prefer a semantic token: `surface.*`, `color.text.*`, `color.fill.*`, `color.border.*` |
| `base.color.blue`, `green`, `red`, `orange`, `purple`, `pink`, `yellow` (100–1300) | `--co-base-color-blue-*` and so on | The role ramps (`accent`, `success`, `warning`, `serious`, `danger`, `ai`) and display ramps (`olive`, `periwinkle`, `rose`, `magenta`), with different values (decisions 0040, 0043, 0044). Prefer a semantic token |
| `base.size.N` (the numbered steps) | `--co-base-size-N` | `base.dimension.N` (same value). The keywords `auto`, `full`, `screen`, `min`, `max` and `fit` stay |
| `base.spacing.N` | `--co-base-spacing-N` | `base.dimension.N` (same value). `base.spacing.auto` stays |

### Semantic and component tiers

These are the semantic grammar's renames ([decision 0031](docs/foundation/decisions/0031-semantic-token-grammar.md), with its appendix), the domain tokens that moved to the component tier (0036), the retired component spacing tokens (0022), and the chip tokens that only served the removed variants.

#### `semantic.border`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.border.subtle` | `--co-semantic-border-subtle` | `semantic.border.default` (same value) |
| `semantic.border.strong` | `--co-semantic-border-strong` | `semantic.border.input-hover` (same value) |
| `semantic.border.tooltip` | `--co-semantic-border-tooltip` | `semantic.border.default` (same value) |
| `semantic.border.radius.none` | `--co-semantic-border-radius-none` | `semantic.radius.none` (same value) |
| `semantic.border.radius.xs` | `--co-semantic-border-radius-xs` | `semantic.radius.xs` (same value) |
| `semantic.border.radius.sm` | `--co-semantic-border-radius-sm` | `semantic.radius.sm` (same value) |
| `semantic.border.radius.md` | `--co-semantic-border-radius-md` | `semantic.radius.md` (same value) |
| `semantic.border.radius.lg` | `--co-semantic-border-radius-lg` | `semantic.radius.lg` (same value) |
| `semantic.border.radius.xl` | `--co-semantic-border-radius-xl` | `semantic.radius.xl` (same value) |
| `semantic.border.radius.2xl` | `--co-semantic-border-radius-2xl` | `semantic.radius.2xl` (same value) |
| `semantic.border.radius.3xl` | `--co-semantic-border-radius-3xl` | `semantic.radius.3xl` (same value) |
| `semantic.border.radius.circle` | `--co-semantic-border-radius-circle` | `semantic.radius.full` (same value) |
| `semantic.border.emphasis` | `--co-semantic-border-emphasis` | `semantic.border.default` (same value) |

#### `semantic.color.background`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.color.background.default` | `--co-semantic-color-background-default` | `semantic.surface.base` (same value) |
| `semantic.color.background.subtle` | `--co-semantic-color-background-subtle` | `semantic.surface.raised` for cards, inputs and sheets (`component.slider.thumb.background` for a slider thumb) |
| `semantic.color.background.emphasis` | `--co-semantic-color-background-emphasis` | `semantic.color.fill.emphasis` (same value) |
| `semantic.color.background.emphasis-hover` | `--co-semantic-color-background-emphasis-hover` | No token: a strong fill's hover mixes `color.text.inverse` into `color.fill.emphasis` at `opacity.state.hover` ([decision 0048](docs/foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)) |
| `semantic.color.background.emphasis-active` | `--co-semantic-color-background-emphasis-active` | No token: a strong fill's pressed state mixes `color.text.inverse` into `color.fill.emphasis` at `opacity.state.pressed` ([decision 0048](docs/foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)) |
| `semantic.color.background.surface` | `--co-semantic-color-background-surface` | `semantic.color.fill.muted` (same value) |
| `semantic.color.background.inverse` | `--co-semantic-color-background-inverse` | `semantic.color.fill.inverse` (same value) |
| `semantic.color.background.interactive` | `--co-semantic-color-background-interactive` | `semantic.color.fill.accent` (same value) |
| `semantic.color.background.interactive-subtle` | `--co-semantic-color-background-interactive-subtle` | `semantic.color.fill.accent-muted` (same value) |
| `semantic.color.background.interactive-subtle-hover` | `--co-semantic-color-background-interactive-subtle-hover` | `semantic.color.fill.accent-muted-hover` (same value) |
| `semantic.color.background.interactive-subtle-active` | `--co-semantic-color-background-interactive-subtle-active` | `semantic.color.fill.accent-muted-pressed` (same value) |
| `semantic.color.background.interactive-hover` | `--co-semantic-color-background-interactive-hover` | `semantic.color.fill.accent-hover` (same value) |
| `semantic.color.background.interactive-active` | `--co-semantic-color-background-interactive-active` | `semantic.color.fill.accent-pressed` (same value) |
| `semantic.color.background.error` | `--co-semantic-color-background-error` | `semantic.color.fill.danger` (same value) |
| `semantic.color.background.error-hover` | `--co-semantic-color-background-error-hover` | `semantic.color.fill.danger-hover` (same value) |
| `semantic.color.background.error-active` | `--co-semantic-color-background-error-active` | `semantic.color.fill.danger-pressed` (same value) |
| `semantic.color.background.error-subtle` | `--co-semantic-color-background-error-subtle` | `semantic.color.fill.danger-muted` (same value) |
| `semantic.color.background.success` | `--co-semantic-color-background-success` | `semantic.color.fill.success` (same value) |
| `semantic.color.background.success-subtle` | `--co-semantic-color-background-success-subtle` | `semantic.color.fill.success-muted` (same value) |
| `semantic.color.background.warning` | `--co-semantic-color-background-warning` | `semantic.color.fill.warning` (same value) |
| `semantic.color.background.warning-subtle` | `--co-semantic-color-background-warning-subtle` | `semantic.color.fill.warning-muted` (same value) |
| `semantic.color.background.disabled` | `--co-semantic-color-background-disabled` | `semantic.color.fill.disabled` (same value) |
| `semantic.color.background.neutral` | `--co-semantic-color-background-neutral` | `semantic.color.fill.default` (same value) |
| `semantic.color.background.neutral-hover` | `--co-semantic-color-background-neutral-hover` | `semantic.color.fill.default-hover` (same value) |
| `semantic.color.background.neutral-active` | `--co-semantic-color-background-neutral-active` | `semantic.color.fill.default-pressed` (same value) |
| `semantic.color.background.transparent` | `--co-semantic-color-background-transparent` | `semantic.color.fill.none` (same value) |
| `semantic.color.background.progressTrack` | `--co-semantic-color-background-progressTrack` | `component.track.background` (same value) |
| `semantic.color.background.page` | `--co-semantic-color-background-page` | `semantic.surface.base` (same value) |
| `semantic.color.background.overlay` | `--co-semantic-color-background-overlay` | `semantic.surface.scrim` (same value) |
| `semantic.color.background.hover-overlay` | `--co-semantic-color-background-hover-overlay` | `semantic.color.fill.none-hover` (same value) |
| `semantic.color.background.active-overlay` | `--co-semantic-color-background-active-overlay` | `semantic.color.fill.none-pressed` (same value) |
| `semantic.color.background.inverse-overlay` | `--co-semantic-color-background-inverse-overlay` | `semantic.color.fill.inverse-none-hover` (same value) |

#### `semantic.color.border`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.color.border.subtle` | `--co-semantic-color-border-subtle` | `semantic.color.border.default` (same value) |
| `semantic.color.border.control` | `--co-semantic-color-border-control` | `semantic.color.border.input` (same value) |
| `semantic.color.border.strong` | `--co-semantic-color-border-strong` | `semantic.color.border.input-hover` for a hovered control, `semantic.color.border.focus` for a focus ring, `semantic.color.fill.inverse` for a drag handle |
| `semantic.color.border.interactive` | `--co-semantic-color-border-interactive` | `semantic.color.border.accent` (same value) |
| `semantic.color.border.error` | `--co-semantic-color-border-error` | `semantic.color.border.danger` (same value) |
| `semantic.color.border.emphasis` | `--co-semantic-color-border-emphasis` | `semantic.color.border.default` (same value) |

#### `semantic.color.category`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.color.category.blue` | `--co-semantic-color-category-blue` | `semantic.color.category.periwinkle` (same value) |
| `semantic.color.category.blue-strong` | `--co-semantic-color-category-blue-strong` | `semantic.color.category.periwinkle-strong` (same value) |
| `semantic.color.category.blue-emphasis` | `--co-semantic-color-category-blue-emphasis` | `semantic.color.category.periwinkle-strong` (same value) |
| `semantic.color.category.blue-subtle` | `--co-semantic-color-category-blue-subtle` | `semantic.color.category.periwinkle-muted` (same value) |
| `semantic.color.category.purple` | `--co-semantic-color-category-purple` | `semantic.color.category.magenta` (same value) |
| `semantic.color.category.purple-strong` | `--co-semantic-color-category-purple-strong` | `semantic.color.category.magenta-strong` (same value) |
| `semantic.color.category.purple-emphasis` | `--co-semantic-color-category-purple-emphasis` | `semantic.color.category.magenta-strong` (same value) |
| `semantic.color.category.purple-subtle` | `--co-semantic-color-category-purple-subtle` | `semantic.color.category.magenta-muted` (same value) |
| `semantic.color.category.pink` | `--co-semantic-color-category-pink` | `semantic.color.category.rose` (same value) |
| `semantic.color.category.pink-strong` | `--co-semantic-color-category-pink-strong` | `semantic.color.category.rose-strong` (same value) |
| `semantic.color.category.pink-emphasis` | `--co-semantic-color-category-pink-emphasis` | `semantic.color.category.rose-strong` (same value) |
| `semantic.color.category.pink-subtle` | `--co-semantic-color-category-pink-subtle` | `semantic.color.category.rose-muted` (same value) |
| `semantic.color.category.yellow` | `--co-semantic-color-category-yellow` | `semantic.color.category.olive` (same value) |
| `semantic.color.category.yellow-strong` | `--co-semantic-color-category-yellow-strong` | `semantic.color.category.olive-strong` (same value) |
| `semantic.color.category.yellow-emphasis` | `--co-semantic-color-category-yellow-emphasis` | `semantic.color.category.olive-strong` (same value) |
| `semantic.color.category.yellow-subtle` | `--co-semantic-color-category-yellow-subtle` | `semantic.color.category.olive-muted` (same value) |
| `semantic.color.category.green` | `--co-semantic-color-category-green` | `semantic.color.category.olive` (same value) |
| `semantic.color.category.green-strong` | `--co-semantic-color-category-green-strong` | `semantic.color.category.olive-strong` (same value) |
| `semantic.color.category.green-emphasis` | `--co-semantic-color-category-green-emphasis` | `semantic.color.category.olive-strong` (same value) |
| `semantic.color.category.green-subtle` | `--co-semantic-color-category-green-subtle` | `semantic.color.category.olive-muted` (same value) |
| `semantic.color.category.red` | `--co-semantic-color-category-red` | `semantic.color.category.rose` (same value) |
| `semantic.color.category.red-strong` | `--co-semantic-color-category-red-strong` | `semantic.color.category.rose-strong` (same value) |
| `semantic.color.category.red-emphasis` | `--co-semantic-color-category-red-emphasis` | `semantic.color.category.rose-strong` (same value) |
| `semantic.color.category.red-subtle` | `--co-semantic-color-category-red-subtle` | `semantic.color.category.rose-muted` (same value) |
| `semantic.color.category.orange` | `--co-semantic-color-category-orange` | `semantic.color.category.rose` (same value) |
| `semantic.color.category.orange-strong` | `--co-semantic-color-category-orange-strong` | `semantic.color.category.rose-strong` (same value) |
| `semantic.color.category.orange-emphasis` | `--co-semantic-color-category-orange-emphasis` | `semantic.color.category.rose-strong` (same value) |
| `semantic.color.category.orange-subtle` | `--co-semantic-color-category-orange-subtle` | `semantic.color.category.rose-muted` (same value) |
| `semantic.color.category.gray-emphasis` | `--co-semantic-color-category-gray-emphasis` | `semantic.color.category.gray-strong` (same value) |
| `semantic.color.category.gray-subtle` | `--co-semantic-color-category-gray-subtle` | `semantic.color.category.gray-muted` (same value) |
| `semantic.color.category.blue-text` | `--co-semantic-color-category-blue-text` | `semantic.color.category.periwinkle-text` (same value) |
| `semantic.color.category.purple-text` | `--co-semantic-color-category-purple-text` | `semantic.color.category.magenta-text` (same value) |
| `semantic.color.category.pink-text` | `--co-semantic-color-category-pink-text` | `semantic.color.category.rose-text` (same value) |
| `semantic.color.category.yellow-text` | `--co-semantic-color-category-yellow-text` | `semantic.color.category.olive-text` (same value) |
| `semantic.color.category.green-text` | `--co-semantic-color-category-green-text` | `semantic.color.category.olive-text` (same value) |
| `semantic.color.category.red-text` | `--co-semantic-color-category-red-text` | `semantic.color.category.rose-text` (same value) |
| `semantic.color.category.orange-text` | `--co-semantic-color-category-orange-text` | `semantic.color.category.rose-text` (same value) |
| `semantic.color.category.blue-muted` | `--co-semantic-color-category-blue-muted` | `semantic.color.category.periwinkle-muted` (same value) |
| `semantic.color.category.purple-muted` | `--co-semantic-color-category-purple-muted` | `semantic.color.category.magenta-muted` (same value) |
| `semantic.color.category.pink-muted` | `--co-semantic-color-category-pink-muted` | `semantic.color.category.rose-muted` (same value) |
| `semantic.color.category.yellow-muted` | `--co-semantic-color-category-yellow-muted` | `semantic.color.category.olive-muted` (same value) |
| `semantic.color.category.green-muted` | `--co-semantic-color-category-green-muted` | `semantic.color.category.olive-muted` (same value) |
| `semantic.color.category.red-muted` | `--co-semantic-color-category-red-muted` | `semantic.color.category.rose-muted` (same value) |
| `semantic.color.category.orange-muted` | `--co-semantic-color-category-orange-muted` | `semantic.color.category.rose-muted` (same value) |

#### `semantic.color.fill`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.color.fill.emphasis-hover` | `--co-semantic-color-fill-emphasis-hover` | No token: mix `color.text.inverse` into `color.fill.emphasis` at `opacity.state.hover` ([decision 0048](docs/foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)) |
| `semantic.color.fill.emphasis-pressed` | `--co-semantic-color-fill-emphasis-pressed` | No token: mix `color.text.inverse` into `color.fill.emphasis` at `opacity.state.pressed` ([decision 0048](docs/foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)) |

#### `semantic.color.financial`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.color.financial.credit` | `--co-semantic-color-financial-credit` | `semantic.color.data.positive` (same value) |
| `semantic.color.financial.credit-hover` | `--co-semantic-color-financial-credit-hover` | `semantic.color.data.positive` (same value) |
| `semantic.color.financial.debit` | `--co-semantic-color-financial-debit` | `semantic.color.data.negative` (same value) |
| `semantic.color.financial.debit-hover` | `--co-semantic-color-financial-debit-hover` | `semantic.color.data.negative` (same value) |
| `semantic.color.financial.pending` | `--co-semantic-color-financial-pending` | `semantic.color.text.muted` (same value) |
| `semantic.color.financial.neutral` | `--co-semantic-color-financial-neutral` | `semantic.color.text.muted` (same value) |

#### `semantic.color.icon`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.color.icon.emphasis` | `--co-semantic-color-icon-emphasis` | `semantic.color.icon.default` (same value) |
| `semantic.color.icon.subdued` | `--co-semantic-color-icon-subdued` | `semantic.color.icon.muted` (same value) |
| `semantic.color.icon.interactive` | `--co-semantic-color-icon-interactive` | `semantic.color.icon.accent` (same value) |
| `semantic.color.icon.interactive-hover` | `--co-semantic-color-icon-interactive-hover` | `semantic.color.icon.accent` (same value) |
| `semantic.color.icon.interactive-active` | `--co-semantic-color-icon-interactive-active` | `semantic.color.icon.accent` (same value) |
| `semantic.color.icon.error` | `--co-semantic-color-icon-error` | `semantic.color.icon.danger` (same value) |
| `semantic.color.icon.accent-hover` | `--co-semantic-color-icon-accent-hover` | `semantic.color.icon.accent` (same value) |
| `semantic.color.icon.accent-pressed` | `--co-semantic-color-icon-accent-pressed` | `semantic.color.icon.accent` (same value) |

#### `semantic.color.status`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.color.status.pending` | `--co-semantic-color-status-pending` | `component.status.pending.text` (same value) |
| `semantic.color.status.pending-bg` | `--co-semantic-color-status-pending-bg` | `component.status.pending.background` (same value) |
| `semantic.color.status.completed` | `--co-semantic-color-status-completed` | `component.status.completed.text` (same value) |
| `semantic.color.status.completed-bg` | `--co-semantic-color-status-completed-bg` | `component.status.completed.background` (same value) |
| `semantic.color.status.failed` | `--co-semantic-color-status-failed` | `component.status.failed.text` (same value) |
| `semantic.color.status.failed-bg` | `--co-semantic-color-status-failed-bg` | `component.status.failed.background` (same value) |
| `semantic.color.status.cancelled` | `--co-semantic-color-status-cancelled` | `component.status.cancelled.text` (same value) |
| `semantic.color.status.cancelled-bg` | `--co-semantic-color-status-cancelled-bg` | `component.status.cancelled.background` (same value) |
| `semantic.color.status.processing` | `--co-semantic-color-status-processing` | `component.status.processing.text` (same value) |
| `semantic.color.status.processing-bg` | `--co-semantic-color-status-processing-bg` | `component.status.processing.background` (same value) |
| `semantic.color.status.scheduled` | `--co-semantic-color-status-scheduled` | `component.status.scheduled.text` (same value) |
| `semantic.color.status.scheduled-bg` | `--co-semantic-color-status-scheduled-bg` | `component.status.scheduled.background` (same value) |

#### `semantic.color.text`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.color.text.emphasis` | `--co-semantic-color-text-emphasis` | `semantic.color.text.default` (same value) |
| `semantic.color.text.subdued` | `--co-semantic-color-text-subdued` | `semantic.color.text.muted` (same value) |
| `semantic.color.text.interactive` | `--co-semantic-color-text-interactive` | `semantic.color.text.accent` (same value) |
| `semantic.color.text.interactive-hover` | `--co-semantic-color-text-interactive-hover` | `semantic.color.text.accent` (same value) |
| `semantic.color.text.interactive-active` | `--co-semantic-color-text-interactive-active` | `semantic.color.text.accent` (same value) |
| `semantic.color.text.error` | `--co-semantic-color-text-error` | `semantic.color.text.danger` (same value) |
| `semantic.color.text.accent-hover` | `--co-semantic-color-text-accent-hover` | `semantic.color.text.accent` (same value) |
| `semantic.color.text.accent-pressed` | `--co-semantic-color-text-accent-pressed` | `semantic.color.text.accent` (same value) |

#### `semantic.motion`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.motion.duration.normal` | `--co-semantic-motion-duration-normal` | `semantic.motion.duration.moderate` (same value) |
| `semantic.motion.easing.easeInOut` | `--co-semantic-motion-easing-easeInOut` | `semantic.motion.easing.standard` (same value) |
| `semantic.motion.easing.easeOut` | `--co-semantic-motion-easing-easeOut` | `semantic.motion.easing.decelerate` (same value) |
| `semantic.motion.transition.fast` | `--co-semantic-motion-transition-fast` | List the properties with `motion.duration` and `motion.easing`, or use a `motion.transition.*` composite ([decision 0037](docs/foundation/decisions/0037-motion-tokens.md)) |
| `semantic.motion.transition.normal` | `--co-semantic-motion-transition-normal` | As above |
| `semantic.motion.transition.slow` | `--co-semantic-motion-transition-slow` | As above |
| `semantic.motion.hover` | `--co-semantic-motion-hover` | `semantic.motion.transition.feedback` (same value) |
| `semantic.motion.focus` | `--co-semantic-motion-focus` | `semantic.motion.transition.focus` (same value) |
| `semantic.motion.interactive` | `--co-semantic-motion-interactive` | `semantic.motion.transition.press` (same value) |

#### `semantic.size`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.size.dimension.1` | `--co-semantic-size-dimension-1` | `semantic.size.100` (same value) |
| `semantic.size.dimension.2` | `--co-semantic-size-dimension-2` | `semantic.size.200` (same value) |
| `semantic.size.dimension.4` | `--co-semantic-size-dimension-4` | `semantic.size.400` (same value) |
| `semantic.size.dimension.5` | `--co-semantic-size-dimension-5` | `semantic.size.500` (same value) |
| `semantic.size.dimension.6` | `--co-semantic-size-dimension-6` | `semantic.size.600` (same value) |
| `semantic.size.dimension.8` | `--co-semantic-size-dimension-8` | `semantic.size.800` (same value) |
| `semantic.size.dimension.12` | `--co-semantic-size-dimension-12` | `semantic.size.1200` (same value) |
| `semantic.size.dimension.15` | `--co-semantic-size-dimension-15` | `semantic.size.1500` (same value) |
| `semantic.size.dimension.18` | `--co-semantic-size-dimension-18` | `semantic.size.1800` (same value) |
| `semantic.size.dimension.20` | `--co-semantic-size-dimension-20` | `semantic.size.2000` (same value) |
| `semantic.size.dimension.30` | `--co-semantic-size-dimension-30` | `semantic.size.3000` (same value) |
| `semantic.size.dimension.45` | `--co-semantic-size-dimension-45` | `semantic.size.4500` (same value) |
| `semantic.size.dimension.50` | `--co-semantic-size-dimension-50` | `semantic.size.5000` (same value) |
| `semantic.size.dimension.75` | `--co-semantic-size-dimension-75` | `semantic.size.7500` (same value) |
| `semantic.size.dimension.90` | `--co-semantic-size-dimension-90` | `semantic.size.9000` (same value) |
| `semantic.size.dimension.100` | `--co-semantic-size-dimension-100` | `semantic.size.10000` (same value) |
| `semantic.size.dimension.192` | `--co-semantic-size-dimension-192` | `semantic.size.19200` (same value) |

#### `semantic.spacing`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.spacing.separator.sm` | `--co-semantic-spacing-separator-sm` | `semantic.space.400` (same value) |
| `semantic.spacing.separator.md` | `--co-semantic-spacing-separator-md` | `semantic.space.600` (same value) |
| `semantic.spacing.separator.lg` | `--co-semantic-spacing-separator-lg` | `semantic.space.800` (same value) |
| `semantic.spacing.separator.xl` | `--co-semantic-spacing-separator-xl` | `semantic.space.1200` (same value) |
| `semantic.spacing.component.xs` | `--co-semantic-spacing-component-xs` | `semantic.space.inset.xs` (same value) |
| `semantic.spacing.component.sm` | `--co-semantic-spacing-component-sm` | `semantic.space.inset.sm` (same value) |
| `semantic.spacing.component.md` | `--co-semantic-spacing-component-md` | `semantic.space.inset.md` (same value) |
| `semantic.spacing.component.lg` | `--co-semantic-spacing-component-lg` | `semantic.space.inset.lg` (same value) |
| `semantic.spacing.component.xl` | `--co-semantic-spacing-component-xl` | `semantic.space.inset.xl` (same value) |
| `semantic.spacing.component.2xl` | `--co-semantic-spacing-component-2xl` | `semantic.space.inset.2xl` (same value) |
| `semantic.spacing.layout.none` | `--co-semantic-spacing-layout-none` | `semantic.space.0` (same value) |
| `semantic.spacing.layout.xs` | `--co-semantic-spacing-layout-xs` | `semantic.space.100` (same value) |
| `semantic.spacing.layout.sm` | `--co-semantic-spacing-layout-sm` | `semantic.space.200` (same value) |
| `semantic.spacing.layout.md` | `--co-semantic-spacing-layout-md` | `semantic.space.300` (same value) |
| `semantic.spacing.layout.lg` | `--co-semantic-spacing-layout-lg` | `semantic.space.400` (same value) |
| `semantic.spacing.layout.xl` | `--co-semantic-spacing-layout-xl` | `semantic.space.500` (same value) |
| `semantic.spacing.layout.2xl` | `--co-semantic-spacing-layout-2xl` | `semantic.space.600` (same value) |
| `semantic.spacing.layout.3xl` | `--co-semantic-spacing-layout-3xl` | `semantic.space.700` (same value) |
| `semantic.spacing.layout.4xl` | `--co-semantic-spacing-layout-4xl` | `semantic.space.800` (same value) |
| `semantic.spacing.layout.5xl` | `--co-semantic-spacing-layout-5xl` | `semantic.space.900` (same value) |
| `semantic.spacing.layout.6xl` | `--co-semantic-spacing-layout-6xl` | `semantic.space.1000` (same value) |
| `semantic.spacing.layout.7xl` | `--co-semantic-spacing-layout-7xl` | `semantic.space.1200` (same value) |
| `semantic.spacing.layout.8xl` | `--co-semantic-spacing-layout-8xl` | `semantic.space.1400` (same value) |
| `semantic.spacing.layout.9xl` | `--co-semantic-spacing-layout-9xl` | `semantic.space.1600` (same value) |
| `semantic.spacing.layout.10xl` | `--co-semantic-spacing-layout-10xl` | `semantic.space.2000` (same value) |
| `semantic.spacing.layout.11xl` | `--co-semantic-spacing-layout-11xl` | `semantic.space.2400` (same value) |

#### `semantic.typography`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.typography.button1` | `--co-semantic-typography-button1` | `component.button.sizes.large.font` (same value) |
| `semantic.typography.button2` | `--co-semantic-typography-button2` | `component.button.sizes.medium.font` (same value) |
| `semantic.typography.button3` | `--co-semantic-typography-button3` | `component.button.sizes.small.font` (same value) |
| `semantic.typography.breadcrumb` | `--co-semantic-typography-breadcrumb` | `semantic.typography.caption` (same value) |

#### `semantic.zIndex`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `semantic.zIndex.sticky` | `--co-semantic-zIndex-sticky` | `semantic.layer.sticky` (same value) |
| `semantic.zIndex.dropdown` | `--co-semantic-zIndex-dropdown` | `semantic.layer.dropdown` (same value) |
| `semantic.zIndex.overlay` | `--co-semantic-zIndex-overlay` | `semantic.layer.overlay` (same value) |
| `semantic.zIndex.modal` | `--co-semantic-zIndex-modal` | `semantic.layer.modal` (same value) |

#### `component.badge`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.badge.count.paddingX` | `--co-component-badge-count-paddingX` | `semantic.space.inset.xs` (same value) |

#### `component.breadcrumbs`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.breadcrumbs.font` | `--co-component-breadcrumbs-font` | `semantic.typography.caption` (same value) |

#### `component.button`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.button.primary.padding` | `--co-component-button-primary-padding` | None: component spacing comes from `semantic.space.inset.*` ([decision 0022](docs/foundation/decisions/0022-no-component-spacing-tokens.md)) |
| `component.button.focus.outlineOffset` | `--co-component-button-focus-outlineOffset` | `semantic.border.focusOffset` (same size) |
| `component.button.variants.emphasis.backgroundColor` | `--co-component-button-variants-emphasis-backgroundColor` | `component.button.variants.accent.backgroundColor` (same value) |
| `component.button.variants.emphasis.textColor` | `--co-component-button-variants-emphasis-textColor` | `component.button.variants.accent.textColor` (same value) |
| `component.button.variants.emphasis.hover.backgroundColor` | `--co-component-button-variants-emphasis-hover-backgroundColor` | `component.button.variants.accent.hover.backgroundColor` (same value) |
| `component.button.variants.emphasis.active.backgroundColor` | `--co-component-button-variants-emphasis-active-backgroundColor` | `component.button.variants.accent.active.backgroundColor` (same value) |
| `component.button.variants.emphasis.disabled.backgroundColor` | `--co-component-button-variants-emphasis-disabled-backgroundColor` | `component.button.variants.accent.disabled.backgroundColor` (same value) |
| `component.button.variants.emphasis.disabled.textColor` | `--co-component-button-variants-emphasis-disabled-textColor` | `component.button.variants.accent.disabled.textColor` (same value) |
| `component.button.sizes.small.padding` | `--co-component-button-sizes-small-padding` | As above |
| `component.button.sizes.medium.padding` | `--co-component-button-sizes-medium-padding` | As above |
| `component.button.sizes.large.padding` | `--co-component-button-sizes-large-padding` | As above |

#### `component.chip`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.chip.default.padding` | `--co-component-chip-default-padding` | As above |
| `component.chip.focus.outlineOffset` | `--co-component-chip-focus-outlineOffset` | `semantic.border.focusOffset` (same size) |
| `component.chip.sizes.small.padding` | `--co-component-chip-sizes-small-padding` | None: chips are 24px high (`semantic.size.label.medium`) with `semantic.space.inset.sm` horizontal padding |
| `component.chip.sizes.small.font` | `--co-component-chip-sizes-small-font` | `component.chip.sizes.medium.font` (was `400 0.75rem/1rem 'Inter', sans-serif`, now `400 0.875rem/1.25rem 'Inter', sans-serif`) |
| `component.chip.sizes.medium.padding` | `--co-component-chip-sizes-medium-padding` | As above |
| `component.chip.sizes.large.padding` | `--co-component-chip-sizes-large-padding` | As above |
| `component.chip.sizes.large.font` | `--co-component-chip-sizes-large-font` | `component.chip.sizes.medium.font` (was `400 1rem/1.5rem 'Inter', sans-serif`, now `400 0.875rem/1.25rem 'Inter', sans-serif`) |
| `component.chip.variants.emphasis.*` | `--co-component-chip-variants-emphasis`… | The static chip has one look ([decision 0016](docs/foundation/decisions/0016-accent-selection-and-chip-types.md)). For the same colours: `semantic.color.fill.emphasis` and `semantic.color.text.inverse` |
| `component.chip.variants.interactive.*` | `--co-component-chip-variants-interactive`… | As above: `semantic.color.fill.accent` and `semantic.color.text.inverse` |
| `component.chip.hover.backgroundColor` | `--co-component-chip-hover-backgroundColor` | `semantic.color.fill.default-hover` (same value) |
| `component.chip.active.backgroundColor` | `--co-component-chip-active-backgroundColor` | `semantic.color.fill.default-pressed` (same value) |

#### `component.field`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.field.gap` | `--co-component-field-gap` | `semantic.space.200` (same value) |
| `component.field.label.gap` | `--co-component-field-label-gap` | `semantic.space.100` (same value) |

#### `component.iconButton`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.iconButton.primary.backgroundColor` | `--co-component-iconButton-primary-backgroundColor` | `component.button.primary.backgroundColor` (same value) |
| `component.iconButton.primary.minWidth` | `--co-component-iconButton-primary-minWidth` | `semantic.size.control.md` (same size) |
| `component.iconButton.primary.minHeight` | `--co-component-iconButton-primary-minHeight` | `semantic.size.control.md` (same size) |
| `component.iconButton.primary.display` | `--co-component-iconButton-primary-display` | None: layout mechanics live in component code ([decision 0014](docs/foundation/decisions/0014-token-tiers.md)) |
| `component.iconButton.primary.alignItems` | `--co-component-iconButton-primary-alignItems` | As above |
| `component.iconButton.primary.justifyContent` | `--co-component-iconButton-primary-justifyContent` | As above |
| `component.iconButton.hover.backgroundColor` | `--co-component-iconButton-hover-backgroundColor` | `component.button.hover.backgroundColor` (same value) |
| `component.iconButton.active.backgroundColor` | `--co-component-iconButton-active-backgroundColor` | `component.button.active.backgroundColor` (same value) |
| `component.iconButton.focus.outlineOffset` | `--co-component-iconButton-focus-outlineOffset` | `semantic.border.focusOffset` (same size) |
| `component.iconButton.disabled.backgroundColor` | `--co-component-iconButton-disabled-backgroundColor` | `component.button.disabled.backgroundColor` (same value) |
| `component.iconButton.variants.secondary.backgroundColor` | `--co-component-iconButton-variants-secondary-backgroundColor` | `component.button.variants.secondary.backgroundColor` (same value) |
| `component.iconButton.variants.secondary.hover.backgroundColor` | `--co-component-iconButton-variants-secondary-hover-backgroundColor` | `component.button.variants.secondary.hover.backgroundColor` (was `#f2f2f2`, now `#ebebeb`) |
| `component.iconButton.variants.secondary.active.backgroundColor` | `--co-component-iconButton-variants-secondary-active-backgroundColor` | `component.button.variants.secondary.active.backgroundColor` (was `#fcfcfc`, now `#e4e4e4`) |
| `component.iconButton.variants.secondary.disabled.backgroundColor` | `--co-component-iconButton-variants-secondary-disabled-backgroundColor` | `component.button.variants.secondary.disabled.backgroundColor` (same value) |
| `component.iconButton.variants.naked.backgroundColor` | `--co-component-iconButton-variants-naked-backgroundColor` | `component.button.variants.naked.backgroundColor` (same value) |
| `component.iconButton.variants.naked.hover.backgroundColor` | `--co-component-iconButton-variants-naked-hover-backgroundColor` | `component.button.variants.naked.hover.backgroundColor` (same value) |
| `component.iconButton.variants.naked.active.backgroundColor` | `--co-component-iconButton-variants-naked-active-backgroundColor` | `component.button.variants.naked.active.backgroundColor` (was `#f2f2f2`, now `#ebebeb`) |
| `component.iconButton.variants.naked.disabled.backgroundColor` | `--co-component-iconButton-variants-naked-disabled-backgroundColor` | `component.button.variants.naked.disabled.backgroundColor` (same value) |
| `component.iconButton.sizes.small.minWidth` | `--co-component-iconButton-sizes-small-minWidth` | `semantic.size.control.sm` (same size) |
| `component.iconButton.sizes.small.minHeight` | `--co-component-iconButton-sizes-small-minHeight` | `semantic.size.control.sm` (same size) |
| `component.iconButton.sizes.small.padding` | `--co-component-iconButton-sizes-small-padding` | `semantic.space.inset.xs` (same value) |
| `component.iconButton.sizes.medium.minWidth` | `--co-component-iconButton-sizes-medium-minWidth` | `semantic.size.control.md` (same size) |
| `component.iconButton.sizes.medium.minHeight` | `--co-component-iconButton-sizes-medium-minHeight` | `semantic.size.control.md` (same size) |
| `component.iconButton.sizes.medium.padding` | `--co-component-iconButton-sizes-medium-padding` | `semantic.space.inset.sm` (same value) |
| `component.iconButton.sizes.large.minWidth` | `--co-component-iconButton-sizes-large-minWidth` | `semantic.size.control.lg` (same size) |
| `component.iconButton.sizes.large.minHeight` | `--co-component-iconButton-sizes-large-minHeight` | `semantic.size.control.lg` (same size) |
| `component.iconButton.sizes.large.padding` | `--co-component-iconButton-sizes-large-padding` | `semantic.space.inset.md` (same value) |

#### `component.input`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.input.default.paddingY` | `--co-component-input-default-paddingY` | None: fields take their height from `semantic.size.control.lg` ([decision 0034](docs/foundation/decisions/0034-control-heights.md)) |
| `component.input.default.paddingX` | `--co-component-input-default-paddingX` | `semantic.space.inset.lg` (same value) |
| `component.input.focus.outlineOffset` | `--co-component-input-focus-outlineOffset` | `semantic.border.focusOffset` (same size) |
| `component.input.error.focus.outlineOffset` | `--co-component-input-error-focus-outlineOffset` | `semantic.border.focusOffset` (same size) |
| `component.input.disabled.cursor` | `--co-component-input-disabled-cursor` | None: behaviour lives in component code ([decision 0014](docs/foundation/decisions/0014-token-tiers.md)) |

#### `component.progressBar`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.progressBar.borderRadius` | `--co-component-progressBar-borderRadius` | `semantic.radius.xs` (was `0.25rem`, now `0.125rem`) |

#### `component.separator`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.separator.margin` | `--co-component-separator-margin` | `semantic.space.800` (was `2rem 0`, now `2rem`) |
| `component.separator.variants.default.margin` | `--co-component-separator-variants-default-margin` | `semantic.space.800` (was `2rem 0`, now `2rem`) |
| `component.separator.variants.strong.margin` | `--co-component-separator-variants-strong-margin` | `semantic.space.800` (was `2rem 0`, now `2rem`) |
| `component.separator.variants.minimal.margin` | `--co-component-separator-variants-minimal-margin` | `semantic.space.600` (was `1.5rem 0`, now `1.5rem`) |
| `component.separator.sizes.small.margin` | `--co-component-separator-sizes-small-margin` | `semantic.space.400` (was `1rem 0`, now `1rem`) |
| `component.separator.sizes.medium.margin` | `--co-component-separator-sizes-medium-margin` | `semantic.space.600` (was `1.5rem 0`, now `1.5rem`) |
| `component.separator.sizes.large.margin` | `--co-component-separator-sizes-large-margin` | `semantic.space.800` (was `2rem 0`, now `2rem`) |
| `component.separator.sizes.xlarge.margin` | `--co-component-separator-sizes-xlarge-margin` | `semantic.space.1200` (was `3rem 0`, now `3rem`) |

#### `component.tooltip`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.tooltip.border` | `--co-component-tooltip-border` | `semantic.border.default` (same value) |

#### `component.transaction`

| Removed token | CSS variable | Use instead |
|---|---|---|
| `component.transaction.credit` | `--co-component-transaction-credit` | `semantic.color.data.positive` (same value) |
| `component.transaction.credit-hover` | `--co-component-transaction-credit-hover` | `semantic.color.data.positive` (same value) |
| `component.transaction.debit` | `--co-component-transaction-debit` | `semantic.color.data.negative` (same value) |
| `component.transaction.debit-hover` | `--co-component-transaction-debit-hover` | `semantic.color.data.negative` (same value) |
| `component.transaction.pending` | `--co-component-transaction-pending` | `semantic.color.text.muted` (same value) |
| `component.transaction.neutral` | `--co-component-transaction-neutral` | `semantic.color.text.muted` (same value) |
