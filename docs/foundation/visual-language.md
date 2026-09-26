# Visual language

Concrete rules that apply the [principles](principles.md). Exact values live in the tokens (`src/tokens/`); this document says how to use them. Each rule has a status — see the [README](README.md#rule-status).

## Colour

**Core idea:** colour belongs to content; the UI chrome is near-monochrome ([P1](principles.md#p1-content-first-quiet-chrome)).

| Rule | Status |
|---|---|
| Page background uses `semantic.color.background.default` (`#f8f9fa`). Never hard-code a background. ([0006](decisions/0006-page-background.md)) | Enforced |
| Text uses `semantic.color.text.*`: `default` `#212529`, `subdued` `#495057`, `disabled` `#adb5bd`, `inverse` `#ffffff`. | Enforced |
| Pure black `#000000` is reserved for the logo. UI uses `#212529` or darker tokens; overlays use `background.overlay`, `hover-overlay` and `active-overlay`. | Enforced |
| Shadows (`base.shadow.*`, `semantic.elevation.*`) may use pure-black alpha. | Exception ([0012](decisions/0012-shadows-use-black.md)) |
| Status colours (`success`, `error`, `warning`, info) communicate status only. | Enforced |
| Blue (`#0265DC` family) is for links, focus, and deliberate highlight such as the `emphasis` button. It isn't decoration or filler. ([0003](decisions/0003-use-of-blue.md)) | Guideline ([0003](decisions/0003-use-of-blue.md)) |
| No decorative gradients in UI chrome. CodeBlock's collapse fade is functional. | Enforced |
| AgentInput's animated blue "working" ring uses a conic gradient. | Exception ([0010](decisions/0010-agentinput-working-ring.md)) — temporary, pending [#22](https://github.com/common-origin/common-origin-design-system/issues/22) |
| Hierarchy comes from weight and scale, not colour. | Enforced |

## Typography

| Rule | Status |
|---|---|
| Inter for all UI text; monospace stack for code. | Enforced in tokens. The package doesn't load fonts — consumers must ([usage](usage.md#fonts)). The docs site self-hosts Inter (400–700) via `styles/fonts.css`. |
| Headings use the typography tokens: `display`–`h4` at 700, `h5`–`h6` at 500; body at 400. The contrast between heavy display-level headings and regular body is the typographic signature. ([0011](decisions/0011-heading-weights-follow-tokens.md)) | Enforced |
| Products may use heavier heading weights as a site-specific choice. | Exception ([0011](decisions/0011-heading-weights-follow-tokens.md)) |
| Code and token labels: monospace, small, on a light pill background. | Guideline |

## Buttons and actions

Five `Button` variants, each with a distinct job ([0002](decisions/0002-button-variants.md)):

| Variant | Appearance | Use for |
|---|---|---|
| `emphasis` | Blue fill, white text | A call to action one level above primary: a brand moment or something that must stand out. At most one per view. |
| `primary` | Near-black fill, white text | The main action in a context |
| `secondary` | Light grey fill, near-black text | Supporting actions |
| `naked` | Transparent, near-black text | Low-emphasis actions, inline and toolbar actions |
| `danger` | Red fill, white text | Destructive actions |

| Rule | Status |
|---|---|
| Disabled states use their disabled tokens; never invent new colours for hover or active. | Enforced |
| Button uses corner radius `sm` (4px). | Enforced |
| Interactive controls in the same context share a corner radius. | **Open question** — Chip uses 12px against Button's 4px; being resolved in [#21](https://github.com/common-origin/common-origin-design-system/issues/21) |

## Selected and active states

| Rule | Status |
|---|---|
| Active navigation items (for example, the docs site sidebar) use a near-black fill with white text. | Enforced on the docs site |
| Selected and emphasised states across Button, Chip, and TabBar. Today: selected chips are light blue, active tabs are solid blue, the active sidebar item is near-black, and "emphasis" means blue on Button but near-black on Chip. | **Open question** — the rule and the Button–Chip relationship are being defined in [#21](https://github.com/common-origin/common-origin-design-system/issues/21) |
| Top navigation is quiet: no background fills; active items change weight or underline only. | Target — to verify |

## Surfaces, shape and elevation

| Rule | Status |
|---|---|
| Use `semantic.elevation` tokens. `raised` is the default for cards; `floating` and `overlay` are for layers above the page (menus, sheets, modals). | Enforced in tokens |
| Image containers use generous radius (`lg`–`xl`); the image is the card, with no extra background fill behind it. | Target — to verify |
| Content can sit directly on the page background; don't wrap everything in cards. | Guideline |

## Layout and spacing

| Rule | Status |
|---|---|
| Spacing comes from spacing tokens (base unit 0.25rem). | Target — several components hard-code pixel values |
| Whitespace is generous by default; dense products (A2UI) set density per component. No global density mode. ([P9](principles.md#p9-serve-the-full-range)) | Enforced |
| Signature editorial layout: narrow content column (~25–30%) beside a large image (~65–70%). | Guideline |
| Layering uses z-index tokens. | Target — overlays hard-code `9999`/`10000` |

## Motion

Motion is part of the system ([P6](principles.md#p6-motion-responds-it-doesnt-perform), [0005](decisions/0005-motion.md)).

| Rule | Status |
|---|---|
| Durations come from `semantic.motion` tokens: fast 150ms, normal 200ms, slow 300ms. 300ms maximum. | Target — most components hard-code durations |
| Elements that appear — modals, sheets, action sheets, dialogs, menus — animate into place. | Target — Modal, Sheet, ActionSheet do; others need an audit |
| Interactive elements respond: hover, press, focus, selection, expand/collapse. | Target — needs an audit |
| Eased, never linear; never decorative or scroll-triggered. | Enforced |
| Respect `prefers-reduced-motion`: people who don't want motion can switch it off. Any motion added from now on includes this. | Target — proposed in [0005](decisions/0005-motion.md); only 2 components do today |
