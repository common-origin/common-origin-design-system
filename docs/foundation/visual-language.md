# Visual language

Concrete rules that apply the [principles](principles.md). Exact values live in the tokens (`src/tokens/`); this document says how to use them. Each rule has a status — see the [README](README.md#rule-status).

## Colour

**Core idea:** colour belongs to content; the UI chrome is near-monochrome ([P1](principles.md#p1-content-first-quiet-chrome)).

| Rule | Status |
|---|---|
| Page background uses `semantic.color.background.default` (`#f8f9fa`). Never hard-code a background. ([0006](decisions/0006-page-background.md)) | Enforced |
| Text uses `semantic.color.text.*`: `default` `#212529`, `subdued` `#495057`, `disabled` `#adb5bd`, `inverse` `#ffffff`. | Enforced |
| Pure black `#000000` is reserved for the logo. UI uses `#212529` or darker tokens; overlays use `background.overlay`, `hover-overlay` and `active-overlay`, and light overlays on strong backgrounds use `inverse-overlay`. | Enforced |
| Shadows (`base.shadow.*`, `semantic.elevation.*`) may use pure-black alpha. | Exception ([0012](decisions/0012-shadows-use-black.md)) |
| Components take every colour from tokens. ESLint fails on hex, `rgb(a)` and `hsl(a)` literals in `src/components` ([P3](principles.md#p3-tokens-not-values)). | Enforced |
| The colour literal that stays, behind a commented `eslint-disable`: CSS mask stops, which set alpha only and are never seen (AgentInput's ring). | Exception |
| Status colours (`success`, `error`, `warning`, info) communicate status only. | Enforced |
| A control whose edge shows where it is (text inputs, Dropdown, the Checkbox box) has a resting border of at least 3:1, from `color.border.control`. `border.default` and `border.subtle` are for dividers and decorative outlines, and for disabled controls. ([0025](decisions/0025-control-borders-meet-3-to-1.md)) | Enforced — `contrast.test.ts` checks the input border |
| Slider's unfilled track is light (`background.progressTrack`, 1.30:1), like ProgressBar's: the thumb and the filled part (both 15.43:1) show the control and its value. A disabled slider shows its value in `icon.disabled`. ([0026](decisions/0026-slider-track-stays-light.md)) | Exception ([0026](decisions/0026-slider-track-stays-light.md)) |
| Blue (`#0265DC` family) is for links, focus, and deliberate highlight such as the `accent` button. It isn't decoration or filler. ([0003](decisions/0003-use-of-blue.md)) | Guideline ([0003](decisions/0003-use-of-blue.md)) |
| No decorative gradients in UI chrome. CodeBlock's collapse fade is functional. | Enforced |
| AgentInput's animated blue "working" ring uses a conic gradient. | Exception ([0010](decisions/0010-agentinput-working-ring.md)) — temporary, pending [#22](https://github.com/common-origin/common-origin-design-system/issues/22) |
| Hierarchy comes from weight and scale, not colour. | Enforced |

## Typography

| Rule | Status |
|---|---|
| Inter for all UI text; monospace stack for code. | Enforced in tokens. The package doesn't load fonts — consumers must ([usage](usage.md#fonts)). The docs site self-hosts Inter (400–700) via `styles/fonts.css`. |
| Headings use the typography tokens: `display`–`h4` at 700, `h5`–`h6` at 500; body at 400. The contrast between heavy display-level headings and regular body is the typographic signature. ([0011](decisions/0011-heading-weights-follow-tokens.md)) | Enforced |
| Products may use heavier heading weights as a site-specific choice. | Exception ([0011](decisions/0011-heading-weights-follow-tokens.md)) |
| Font weights come from `semantic.fontWeight`: `regular` 400, `medium` 500, `semibold` 600, `bold` 700. The typography tokens reference them; components never use base weight keys or literal weights ([P3](principles.md#p3-tokens-not-values)). | Enforced |
| A component that departs from a typography style (a different weight, line height, tracking or size) takes the departure from its component tokens, built from the semantic `fontWeight`, `fontSize`, `lineHeight`, `letterSpacing` and `fontFamily` scales ([0014](decisions/0014-token-tiers.md)). No literal line heights or base typography tokens in components. | Enforced |
| Code and token labels: monospace, small, on a light pill background. | Guideline |

## Buttons and actions

Five `Button` variants, each with a distinct job ([0002](decisions/0002-button-variants.md), [0016](decisions/0016-accent-selection-and-chip-types.md)):

| Variant | Appearance | Use for |
|---|---|---|
| `accent` (formerly `emphasis`) | Blue fill, white text | A call to action one level above primary: a brand moment or something that must stand out. At most one per view. |
| `primary` | Near-black fill, white text | The main action in a context |
| `secondary` | Light grey fill, near-black text | Supporting actions |
| `naked` | Transparent, near-black text | Low-emphasis actions, inline and toolbar actions |
| `danger` | Red fill, white text | Destructive actions |

| Rule | Status |
|---|---|
| Disabled states use their disabled tokens; never invent new colours for hover or active. | Enforced |
| Button uses corner radius `sm` (4px). | Enforced |
| `IconButton`'s `primary`, `secondary` and `naked` look and behave exactly like `Button`'s: the same colours in every state, from `component.button.*`, and the same colour transition (`motion.hover`). Only the size and the icon differ. ([0027](decisions/0027-iconbutton-follows-button.md)) | Enforced — `IconButton.test.tsx` compares the two |
| `IconButton` has no `accent` or `danger` variant until a product needs one ([P4](principles.md#p4-earn-its-place)). ([0027](decisions/0027-iconbutton-follows-button.md)) | Guideline |
| `IconButton`'s icon is one step larger than a `Button`'s at the same size (`sm`, `md`, `lg` against `xs`, `sm`, `md`): an icon-only button needs a larger glyph to fill the same square. ([0027](decisions/0027-iconbutton-follows-button.md)) | Exception |
| **Accent** is the name for the blue call-to-action level above `primary`, wherever a component has one. It is never a selected state, a link colour or decoration. **Emphasis** means strong near-black everywhere (the `emphasis` tokens, Typography, Icon), stronger than default text; it is never blue, and the category palette's strong step is `-strong`, not `-emphasis`. ([0016](decisions/0016-accent-selection-and-chip-types.md), [0029](decisions/0029-accent-emphasis-audit.md)) | Target — Button's `emphasis` variant is removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)); the category `-emphasis` tokens are deprecated aliases of `-strong` until then |
| Chips keep a rounded radius (12px) while Buttons use `sm` (4px): the shape signals a different job. ([0016](decisions/0016-accent-selection-and-chip-types.md)) | Exception |

## Selected and active states

| Rule | Status |
|---|---|
| Selected chips, TabBar's selected tab and the docs site's active sidebar item use the light-blue selected treatment: `background.interactive-subtle` fill with `text.interactive` text (4.70:1). The text darkens with the fill on hover (`interactive-subtle-hover` with `text.interactive-hover`, 5.60:1) and press (`interactive-subtle-active` with `text.interactive-active`, 6.65:1). TabBar's selected tab also has a blue underline ([0020](decisions/0020-tabbar-single-variant.md)). A selected disabled chip uses the disabled colours and keeps its checkmark. Never near-black, never solid accent blue. Top navigation is an exception (row below). ([0016](decisions/0016-accent-selection-and-chip-types.md)) | Enforced |
| Focus is not selection: a keyboard-focused or highlighted option (Dropdown, SearchField, listboxes) uses `background.surface`; only a selected option uses the light-blue selected treatment, and Dropdown's selected option also shows a checkmark. ([0029](decisions/0029-accent-emphasis-audit.md)) | Enforced — Dropdown and SearchField tests |
| Every component draws the same focus ring: `semantic.border.focus` with `border.focusOffset`. There is no blue focus ring. ([0029](decisions/0029-accent-emphasis-audit.md)) | Enforced — `src/tokens/focusRing.test.ts` |
| Selected filter and input chips also show a checkmark, so the state doesn't rely on colour alone ([P2](principles.md#p2-accessibility-is-the-floor)). | Enforced |
| Chips are classified by job, not emphasis: static `Chip` (`default` only, not interactive), `FilterChip` (toggle; formerly `BooleanChip`) and `InputChip` (removable; formerly `FilterChip`). No chip has emphasis levels. ([0016](decisions/0016-accent-selection-and-chip-types.md)) | Target — renames and deprecations in the next minor, removals in 3.0. `Tag` stays ([0018](decisions/0018-indicators-and-labels.md), [0029](decisions/0029-accent-emphasis-audit.md)) |
| **Badge** is only a count or dot anchored to another element. **StatusLabel** conveys status: status tokens only, always an icon with the text (never colour alone), not interactive. **CategoryLabel** colour-codes an item's category with the category palette, which carries no status meaning. No other component uses "Badge" in its name. ([0018](decisions/0018-indicators-and-labels.md)) | Target — `StatusBadge` → `StatusLabel` and `CategoryBadge` → `CategoryLabel` in the next minor, old names removed in 3.0 |
| **Tag** is neutral metadata (`default` or `emphasis`); **CategoryLabel** is a coloured category. Status uses StatusLabel, not Tag, and Badge's blue variant is `accent`, not `primary`. ([0029](decisions/0029-accent-emphasis-audit.md)) | Target — Tag's `success`, `warning`, `error` and `interactive` and Badge's `primary` are deprecated in the next minor and removed in 3.0 ([#172](https://github.com/common-origin/common-origin-design-system/issues/172), [#169](https://github.com/common-origin/common-origin-design-system/issues/169)); the [which label do I use?](https://common-origin-design-system.vercel.app/guides/labels) guide is on the docs site |
| Labels share one height scale: `small` 20px, `medium` 24px, `large` 32px. Each component takes only the sizes it needs: StatusLabel and Tag small and medium; CategoryLabel medium and large. ([0018](decisions/0018-indicators-and-labels.md)) | Target |
| Top navigation is quiet: no background fills; active items change weight or underline only. This is an exception to the light-blue selected treatment ([0016](decisions/0016-accent-selection-and-chip-types.md)). | Target — to verify |

## Messages

| Rule | Status |
|---|---|
| `Alert` is the block alert: top or bottom of a page, or in content, with an optional title, action and dismiss button. `appearance="outlined"` (default: severity tint plus 1px severity border) is **only** for alerts at the top: a page-level alert at the top of the page, an alert at the top of the content area, or an error summary. Every other alert, including those inside content and at the bottom of a page, uses `appearance="borderless"` (tint only). ([0019](decisions/0019-alert-and-inline-alert.md)) | Enforced — `appearance` is implemented through Alert's component tokens; where each one goes is documented on the Alert docs page |
| Alert's dismiss button is centred on the first line of content (the title, or the message when there's no title), in every alert. ([0019](decisions/0019-alert-and-inline-alert.md)) | Enforced — the button is centred in a slot as tall as the first line, from Alert's line-height tokens ([#69](https://github.com/common-origin/common-origin-design-system/issues/69)) |
| Alert's action follows the content: below the message, left-aligned with it, `md` above it. The action and the dismiss button never share a row. ([0021](decisions/0021-alert-action-below-content.md)) | Enforced ([#122](https://github.com/common-origin/common-origin-design-system/issues/122)) |
| `InlineAlert` is the small, local message: a severity icon and short text in the severity colour, with no background, border, title, action or dismiss button. Sizes `small` and `medium`. Feedback about a control is linked with `aria-describedby`. Every severity colour is at least 4.5:1 on the page, white and grey surfaces; check other backgrounds before use. ([0019](decisions/0019-alert-and-inline-alert.md)) | Enforced — InlineAlert ships; Alert's `inline` prop is deprecated and removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)) |

## Icons

| Rule | Status |
|---|---|
| Icons are decorative by default: `Icon` hides them from assistive technology unless it's given an `aria-label` or `title`. A component gives an icon a human-readable name only when the icon is the only way something is shown, such as MoneyDisplay's plus and minus signs or TransactionListItem's receipt and note indicators. No component announces an internal icon name such as "arrowDown" or "addRing" ([0028](decisions/0028-icons-decorative-by-default.md), [P2](principles.md#p2-accessibility-is-the-floor), WCAG 1.1.1). | Enforced — `iconAnnouncements.test.tsx` and `Icon.test.tsx` |

## Surfaces, shape and elevation

| Rule | Status |
|---|---|
| Use `semantic.elevation` tokens. `raised` is the default for cards; `floating` and `overlay` are for layers above the page (menus, sheets, modals). | Enforced in tokens |
| Image containers use generous radius (`lg`–`xl`); the image is the card, with no extra background fill behind it. | Target — to verify |
| Content can sit directly on the page background; don't wrap everything in cards. | Guideline |

## Layout and spacing

| Rule | Status |
|---|---|
| Spacing comes from spacing tokens (base unit 0.25rem). Off-grid values snap to the nearest spacing token; if that leaves a component visually unbalanced, the component is rebalanced rather than given an off-grid token. | Enforced |
| Components take padding, margin and gap from the semantic spacing scales. There are no component spacing tokens. ([0022](decisions/0022-no-component-spacing-tokens.md)) | Target — 29 component spacing and focus-offset tokens are retired in [#24](https://github.com/common-origin/common-origin-design-system/issues/24) step 3 and removed in 3.0 |
| No new token, in any tier, without the owner's sign-off: tier, value, use, and why no existing token does the job. ([0022](decisions/0022-no-component-spacing-tokens.md)) | Enforced |
| Pixel values in components come from tokens: border widths (`border.width.thin`/`thick`), focus offsets (`border.focusOffset`), sizes and breakpoints. | Target — shared sizes are semantic (`size.touchTarget`, `size.overlay`, `size.menu`) and one-off sizes are component tokens on `size.dimension`. Still px: label heights (become the 20/24/32px scale in [0018](decisions/0018-indicators-and-labels.md)) |
| Px literals that aren't design values may stay: the visually-hidden technique (`visuallyHidden` in `src/lib/styleUtils.ts`), drawn glyph geometry (the Checkbox tick), 1px overlaps that seat an active tab over its border, and "no limit" max-heights used to animate collapse. | Exception |
| Whitespace is generous by default; dense products (A2UI) set density per component. No global density mode. ([P9](principles.md#p9-serve-the-full-range)) | Enforced |
| Signature editorial layout: narrow content column (~25–30%) beside a large image (~65–70%). | Guideline |
| Layering uses the semantic z-index layers, in order `sticky` < `dropdown` < `overlay` < `modal`, each paired with an elevation token. Backdrops share their surface's layer. ([0013](decisions/0013-z-index-layers.md)) | Enforced (components and docs site); ESLint fails on z-index literals other than `-1`, `0` and `1` in `src/components`, in CSS, `zIndex` properties and numbers interpolated into styled templates (fixtures in `src/tokens/lintGuards.test.ts`) |
| Stacking inside a single component (`-1`, `0`, `1`) may use literals, written directly in the CSS text (`z-index: 1;`). Numbers interpolated into styled templates are always rejected. | Exception ([0013](decisions/0013-z-index-layers.md)) |

## Motion

Motion is part of the system ([P6](principles.md#p6-motion-responds-it-doesnt-perform), [0005](decisions/0005-motion.md), [0015](decisions/0015-reduced-motion.md)).

| Rule | Status |
|---|---|
| Durations and easings come from `semantic.motion` tokens: `duration.fast` 150ms, `normal` 200ms, `slow` 300ms; `easing.easeOut` for responses and entrances, `easeInOut` for state changes. 300ms maximum. | Enforced — `src/tokens/motion.test.ts` fails on literal durations or easings in components |
| Elements that appear — modals, sheets, action sheets, dialogs, menus — animate into place, and animate out when they disappear. | Enforced — Modal, Sheet, ActionSheet and Dropdown animate in; overlays fade out over `duration.fast` (`usePresence` + `exitAnimation`); a dismissed Alert fades, then collapses its space (300ms in total). Audited in [#35](https://github.com/common-origin/common-origin-design-system/issues/35) |
| Interactive elements respond: hover, press, focus, selection, expand/collapse. | Enforced — audited in [#35](https://github.com/common-origin/common-origin-design-system/issues/35) |
| Eased, never linear; never decorative or scroll-triggered. | Enforced |
| AgentInput's working ring rotates continuously: linear, 1300ms per turn, and stops under reduced motion. | Exception ([0010](decisions/0010-agentinput-working-ring.md)) — temporary, pending [#22](https://github.com/common-origin/common-origin-design-system/issues/22) |
| Respect `prefers-reduced-motion`: movement becomes a simple fade or an instant change; colour and opacity fades stay. Use `reducedMotion` from `src/lib/styleUtils.ts`; an exit that mustn't change once started (Alert's dismiss) reads the preference when it starts. | Enforced ([0015](decisions/0015-reduced-motion.md)) — `src/tokens/motion.test.ts` fails if a component that moves has no fallback |
