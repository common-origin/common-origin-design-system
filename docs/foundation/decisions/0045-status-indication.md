# 0045. Status indication: ten statuses, one shape each, never colour alone

- **Status:** Accepted
- **Date:** 2026-10-18
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P4, P5, P7
- **Amends:** [0018](0018-indicators-and-labels.md) §1 (Badge's colour variants) and §2 (the status set is defined here; StatusLabel takes statuses from it)
- **Builds on:** [0043](0043-data-colours.md) (colour by meaning), [0044](0044-hue-ramps.md) (the role ramps), [0028](0028-icons-decorative-by-default.md) (decorative icons)
- **Issue:** [#257](https://github.com/common-origin/common-origin-design-system/issues/257)

## Context

[0043](0043-data-colours.md) gives each role hue one meaning and says status is never colour alone: it's colour with text and a shape or symbol. [0044](0044-hue-ramps.md) measured why that matters: on the same step, warning and serious are 0.020 apart under deuteranopia, and accent and AI 0.027. For many colour-blind people, the shape or symbol is the only difference.

The system defines this pattern for its own sake. Products adopt it afterwards; their current statuses aren't an input (owner's direction, 2026-10-18).

**Where the components were** (2.20):
- Alert, InlineAlert and Badge use `error`, `warning`, `info` and `success`. Warning is orange and its icon is `bell`.
- StatusLabel has six transaction statuses, each with an icon and a label. `pending` and `processing` share `refresh`, and `scheduled` uses `bell` until #87 adds a calendar. `scheduled` is purple, which 0043 gives to AI.
- MoneyDisplay shows its sign as a circled plus or minus icon beside an unsigned amount, so a copied amount loses its sign.
- Badge colours its count by status, so a red "3" and a green "3" differ only by colour.

**IBM Carbon's status indicator pattern** has four indicator types: icon (symbol, shape, colour and label), shape (shape, colour and label, for small spaces and dense data), badge (count or dot) and differential (a sign, caret or arrow). Carbon's guidance:
- Never rely on colour alone.
- Every shape needs a label and an outline.
- Don't use the same shape in two colours in one experience.
- Use plain text where no action is needed, and keep to five or six indicators in a view.

Its shape indicators are 16px.

## Decision

### 1. Ten statuses, each with one meaning and one role

| Status | Means | Role | Icon (outline) | Shape indicator |
|---|---|---|---|---|
| error | Failed or blocked; act now | danger | ✕ in a hexagon | hexagon |
| serious | Will fail or cause harm without action | serious | `!` in a diamond | diamond |
| warning | Needs attention; not blocking | warning | `!` in a triangle | triangle |
| success | Done as intended | success | tick in a circle | circle |
| info | Neutral information | accent | `i` in a square | square |
| in progress | Running now | accent | half-filled circle | half-filled circle |
| pending | Waiting on someone or something else | neutral | clock | none (text) |
| scheduled | Starts at a set time | neutral | calendar | none (text) |
| not started | Exists; not begun or submitted | neutral | dashed circle | none (text) |
| cancelled | Stopped on purpose | neutral | slashed circle | none (text) |

- A status takes a hue only when it needs the attention that hue means. Waiting, future and stopped states are neutral, and are told apart by their icon and label.
- The foundation defines all ten. A component adds a status only when it's built or updated to use it (P4).
- Today's names map onto the set: `failed` is error, `completed` success, `processing` in progress. StatusLabel's `pending`, `scheduled` and `cancelled` keep their names.
- Hexagon reads as "stop", and triangle as "caution". Serious takes a diamond so that it never shares warning's shape.

### 2. Indicator types

- **Icon indicator:** an outline icon (today's 2px outline style) and a label, in the status's role colour. This is the default wherever a 16px icon fits.
- **Shape indicator:** a filled shape with a darker edge and a label. It's for small spaces and dense lists, and only for the six coloured statuses; there, the four neutral statuses are plain text (P1). Shape indicators are at least 12px, the size at which the error hexagon stops reading as a circle beside success.
- **One shape per status:** a status's icon sits on its shape-indicator shape, so it keeps one outline at every size. The general icons `crossCircle` and `info` stay unchanged; status components move to the new status icons.
- **Badge indicator:** a count or dot that means new or unread items, in accent, or a quiet grey count (`default`). Unread isn't an error, so a badge isn't red. A count of items with a status says it in words ("3 failed", with the error icon). Badge's `error`, `warning` and `success` become deprecated aliases of `accent`, removed in 3.0 (P7).
- **Differential indicator:** the sign is text. Amounts show `+$20.00` and `−$20.00` (U+2212 minus) in the success or danger role. A change over time adds a caret or arrow to its sign (`▲ +3.2%`), so it reads as a trend rather than an amount. MoneyDisplay's circled plus and minus icons go: they lose the sign on copy and borrow success's circle.

### 3. Every indicator has a visible label

The one exception is where the surrounding content already says the status in words. An Alert's title and message say it's an error, so its icon is decorative (`aria-hidden`, [0028](0028-icons-decorative-by-default.md)). In dense tables the label can be a single word, but it's still shown.

### 4. Colour

Indicators use the role ramps from [0044](0044-hue-ramps.md). Icon and shape colours are at least 3:1 against their background (SC 1.4.11), and label text is at least 4.5:1. [#190](https://github.com/common-origin/common-origin-design-system/issues/190) sets the semantic tokens and steps, including the colour changes below.

## Consequences

- **Visible changes**, made when each component adopts this pattern:
  - Warning moves from orange to yellow.
  - `pending` moves from yellow to grey, and `scheduled` from purple to grey.
  - Error and info icons take the hexagon and the square.
  - Warning's `bell` becomes a triangle, and `refresh` (which means reload) becomes the half-filled circle.
- **Status icons need drawing as a set:** ten outline icons and six shape indicators on our 24px grid, signed off before use. That absorbs [#87](https://github.com/common-origin/common-origin-design-system/issues/87)'s clock and calendar ([#259](https://github.com/common-origin/common-origin-design-system/issues/259)).
- **Follow-up issues:** the status icon set ([#259](https://github.com/common-origin/common-origin-design-system/issues/259)), StatusLabel ([#260](https://github.com/common-origin/common-origin-design-system/issues/260)), Alert and InlineAlert ([#261](https://github.com/common-origin/common-origin-design-system/issues/261)), MoneyDisplay's sign ([#262](https://github.com/common-origin/common-origin-design-system/issues/262)), Badge's variants ([#263](https://github.com/common-origin/common-origin-design-system/issues/263)), and a shape indicator for dense layouts ([#264](https://github.com/common-origin/common-origin-design-system/issues/264)).
- **Serious** has a meaning, an icon and a shape, but no component uses it until one is built or updated to show it.
- **Dark mode** uses the same shapes and roles with dark values (0043, point 7).
