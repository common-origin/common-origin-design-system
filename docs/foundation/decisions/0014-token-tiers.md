# 0014. Token tiers: semantic by default, component tokens for departures and families

- **Status:** Accepted
- **Date:** 2026-09-26
- **Decided by:** Ollie (owner)
- **Principles:** P3, P4, P5

## Context

Tokens have three tiers: base (`src/tokens/base`), semantic (`src/tokens/semantic`) and component (`src/tokens/component`). The point of tokens is to hold the design decisions, so components can be built with as little styling code as possible. An audit during [#34](https://github.com/common-origin/common-origin-design-system/issues/34) found the tiers don't work that way yet:

- **Components skip the semantic tier.** At least 146 references to `base.*` across 22 of the 51 component source files (mostly spacing and border, plus breakpoints, letter spacing and font size).
- **The component tier is thin and bypasses the semantic tier.** It has 7 groups (button, chip, iconButton, input, progressBar, separator, badge); separator and badge are unused, and only 12 component files use any component token. Of its 151 values, 76 reference semantic tokens, 53 reference base tokens directly and 22 are literals, including layout mechanics such as `display: flex`. Only 6 are real tokens with `value` and `type`.
- **Design decisions live in styled-components code.** Components combine semantic and base tokens in CSS, so a decision can be wrong without anyone noticing. For example, StatusBadge and CategoryBadge declared weight 500, but a later `font` shorthand reset it, so both have always rendered at 400.
- **Component families repeat decisions.** The pill-shaped labels (StatusBadge, CategoryBadge, Badge, Tag, Chip) are styled separately, and the required-field indicator is written in three fields. The input family's shared `component.input` group is the exception.

Two models were considered:
- **Hybrid.** Semantic tokens by default, and component tokens only where they add a decision. This is the approach of Primer: base → functional → component, with shared functional groups such as `control`, and component tokens that reference functional tokens.
- **Full component tokens.** Every component property goes through a component token, as in Material 3's reference → system → component. That means less judgement per component, but many more tokens to maintain.

## Decision

Use the **hybrid** model:

1. **Components never use base tokens.** Base tokens exist only to build semantic tokens. If a component needs something the semantic tier doesn't have (for example breakpoints or letter spacing), add a semantic token first.
2. **Components use semantic tokens by default**, and a component token when one exists for that decision.
3. **Create a component token only when:**
   - **it departs from the semantic tier.** The component needs a value the semantic tier doesn't give it. Example: Alert's title uses the h6 style (500) but is semibold, so it gets `component.alert.title.fontWeight → {semantic.fontWeight.semibold}`.
   - **it's shared by a family.** Several components share the decision, so they get one shared group rather than a copy per component. Examples: `component.badge` for the pill-label family (radius, height, padding and typography per size), `component.input` (already exists), and a field group for the required indicator.
   - **it's a variant or state matrix.** Colours or sizes per variant and state, as Button has.
4. **Component tokens reference semantic tokens, never base tokens.** If no suitable semantic token exists, add one first, as in rule 1.
5. **Tokens hold design decisions only:** colour, typography, spacing, size, radius, border, shadow, motion and layer. Layout mechanics (`display`, flex and grid alignment) stay in component code.
6. **Every token has `value`, `type` and a `description`** saying what it's for. That includes component tokens, so they can be typed, documented and validated.
7. **The aim is component styles that only map tokens to CSS properties**, with no design decisions left in component code.

## Consequences

- New or changed component styling follows these rules from now on.
- Existing code is migrated incrementally, one family at a time, with each PR citing this decision:
  1. **Badge family** (StatusBadge, CategoryBadge, Badge, and Tag and Chip where they share decisions) moves to `component.badge`. This includes the family's font weight: whether badges render at 400 (as they always have) or the 500 they declared is decided on that token, as a visual change.
  2. **Field family:** the required indicator and label treatments shared by TextField, PasswordField and NumberInput.
  3. **Departures:** decisions such as the Alert title's weight move from component code into component tokens.
  4. **Remaining base references** in components are replaced, adding semantic tokens where the tier is missing them (breakpoints, letter spacing).
- The existing component tier is cleaned up as part of the DTCG / Style Dictionary 5 migration ([#24](https://github.com/common-origin/common-origin-design-system/issues/24)): every component token references a semantic token (adding any missing semantic tokens first, never keeping a base reference), layout properties removed, real `value` and `type` everywhere, unused groups removed or used.
- Component token names are published, so renaming or removing one is a breaking change (P7). New groups are additive.
- Lint or a test should eventually block `base.*` imports in `src/components` (see #34's "Done when").
