# 0016. Accent, selection and chip types

- **Status:** Accepted
- **Date:** 2026-10-01
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P3, P4, P5, P7
- **Supersedes:** the `emphasis` variant name in [0002](0002-button-variants.md) (its role is unchanged), and resolves the open question in [0003](0003-use-of-blue.md) about how blue relates to selected and emphasised states. Under 0003's categories, blue now means links and focus (`interactive`), the selected treatment (light blue), and the `accent` call to action

## Context

The system had no single rule for emphasis and selection, and its words meant different things in different components ([#21](https://github.com/common-origin/common-origin-design-system/issues/21)):

- **"Emphasis" meant two opposite things.** On Button it was the blue call to action above `primary` ([0002](0002-button-variants.md)). Everywhere else it meant strong near-black: the semantic tokens `text.emphasis` (`#343a40`), `background.emphasis` and `icon.emphasis` (`#212529`), Typography and Icon colours, and the Chip and Tag `emphasis` variants. Chip's `interactive` variant was the blue one.
- **"Selected" had three treatments.** Selected chips were light blue, TabBar's active tab was solid blue, and the docs site's active sidebar item was near-black.
- **Chips borrowed Button's emphasis scale.** Chip had `default`, `emphasis`, `subtle` and `interactive` variants and an `onClick`, so a static label could look and act like a button.
- **Chip names didn't match the industry.** `BooleanChip` was the toggle that filters content, and `FilterChip` was the dismissible chip for an applied filter, the reverse of Material's and eBay's names.

Research across Primer, Atlassian, eBay, Shopify Polaris, Adobe Spectrum, Material 3 and Carbon (in #21) found:

- **Button hierarchies follow one of two patterns.** Either `primary` is the brand colour (Primer, Atlassian, eBay, Carbon, Material), or a coloured level sits above a neutral `primary` (Spectrum, Polaris). Common Origin follows the second. Spectrum names its blue level **`accent`**. No system uses "emphasis" as a level name.
- **No system gives chips the button emphasis scale.** Chips are split by job: static (label or tag), filter (selectable), input (removable), and sometimes action. Chip colour variants, where they exist, are categories or status, never importance.
- **Selection has its own colour role,** separate from the call-to-action colour: neutral-strong (Carbon, eBay, Spectrum) or a subtle tint of the brand colour (Material, Atlassian). Filter chips add a checkmark or bold weight so the state doesn't rely on colour alone.

## Decision

### 1. Accent

**Accent** is the system's word for the blue call-to-action level, one step **above** `primary`.

- **What it is:** the `accent` Button variant (blue fill, white text), formerly `emphasis`. Its role is unchanged from 0002: a brand moment, or the one action that must stand out beyond the primary action. **At most one per view.**
- **What it isn't:** accent is not a selected state, not a link colour and not decoration. Links and focus use the `interactive` colour family ([0003](0003-use-of-blue.md)); selection uses the selected treatment below.
- **Where it applies:** today, Button and the actions that render Buttons (Modal actions). Any other component that needs a "call to action above primary" level uses the name `accent` and the same blue. Reviewing every component against this rule is follow-up work.

**Emphasis** keeps its system-wide meaning: **strong near-black**, as in the semantic `emphasis` tokens, Typography and Icon. It is never blue.

### 2. Selected

Selected states in the contexts below use the **light-blue selected treatment**: the `background.interactive-subtle` fill with `text.interactive` (blue) text, which is 4.70:1. This applies to:

- **selected filter and input chips**, which also show a checkmark (P2: the state isn't conveyed by colour alone);
- **TabBar's active tab**, which moves from solid blue to light blue. In the `underline` variant the underline is blue;
- **the docs site's active sidebar item**, which moves from near-black to light blue.

In these contexts selection is **never** near-black and never the solid accent blue. Hover and pressed states of a selected item get their own tokens; no hard-coded colours (P3).

**Scope.** This decision covers only the contexts listed. Two other cases stay as they are:
- **Top navigation** keeps its quiet treatment, with no background fill; the active item changes weight or gains an underline (`visual-language.md`).
- **Other selected states,** such as Dropdown and listbox options (`aria-selected`), are reviewed against this rule in the accent/emphasis audit ([#100](https://github.com/common-origin/common-origin-design-system/issues/100)) before they change.

### 3. Chip types

Chips are classified by job, not by emphasis. There are no emphasis levels on any chip.

| Type | Component | Job | Visual variants |
|---|---|---|---|
| **Static** | `Chip` | A non-interactive label | `default` only |
| **Filter** | `FilterChip` (formerly `BooleanChip`) | Toggles a filter on and off | Selected state (light blue plus checkmark) |
| **Input** | `InputChip` (formerly `FilterChip`) | A removable value, such as an applied filter | Optional selected state (light blue plus checkmark); dismiss button |

- The static `Chip` loses its `emphasis`, `interactive` and `subtle` variants, the legacy `light` and `dark` variants, and `onClick`. A clickable action uses a Button; a toggle uses `FilterChip`.
- Chips keep their rounded radius (12px) while Buttons keep `sm` (4px). The different shapes signal different jobs.
- `Tag`, which also has `emphasis` and `interactive` variants, is left to [#62](https://github.com/common-origin/common-origin-design-system/issues/62), which decides whether Tag, Chip, CategoryBadge and Badge all stay.

## Consequences

**Releases.** Renames and removals are breaking (P7), so they ship in two steps:

- **Next minor (2.16): nothing breaks.**
  - Button and Modal actions accept `variant="accent"`, and `emphasis` is deprecated. The component token `button.variants.accent` is added, with `emphasis` kept as a deprecated alias.
  - `InputChip` is added (identical to today's `FilterChip`). `FilterChip` is deprecated ("renamed to InputChip; in 3.0 `FilterChip` becomes the toggle chip"), and so is `BooleanChip` ("becomes `FilterChip` in 3.0").
  - The static `Chip`'s non-default variants and `onClick` are deprecated.
  - Selected hover and pressed colours become tokens with the same values. Selected chips' text changes from near-black to blue, and TabBar's active tab and the docs sidebar move to the selected treatment. These are visual changes, not API changes.
- **Next major (3.0): breaking.**
  - `emphasis` is removed from Button, Modal actions and the button tokens.
  - `FilterChip` becomes the toggle chip, and `BooleanChip` is removed.
  - The static `Chip`'s non-default variants and `onClick` are removed.
  - The release is batched with PageTitle's removal ([#81](https://github.com/common-origin/common-origin-design-system/issues/81)), and ideally with #62 and the token pipeline ([#24](https://github.com/common-origin/common-origin-design-system/issues/24)), so products absorb one major.

**Migration notes for products using the system.**
- `variant="emphasis"` on Button or Modal actions → `variant="accent"`.
- `FilterChip` → `InputChip`, then `BooleanChip` → `FilterChip`, in that order. The two names swap meaning, so **plain JavaScript projects won't get an error** if they miss it. TypeScript reports the changed props.
- Static `Chip` with a non-default `variant` → drop the variant. With `onClick` → use a Button, or `FilterChip` for a toggle.

**Follow-up.**
- Implement the minor and major steps above.
- Audit every component for "accent" and "emphasis" usage, so both words mean the same thing everywhere.
- Update the docs (Button, Chip, TabBar pages and the docs site sidebar) to use the new names and explain the chip types.
