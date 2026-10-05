# 0022. No component spacing tokens; every new token needs the owner's sign-off

- **Status:** Accepted
- **Date:** 2026-10-05
- **Decided by:** Ollie (owner)
- **Principles:** P3, P4, P7
- **Amends:** [0014](0014-token-tiers.md) rule 3

## Context

Decision 0014 allows a component token in three cases: a departure from the semantic tier, a decision shared by a family, and a variant or state matrix. Planning step 3 of the token pipeline migration ([#24](https://github.com/common-origin/common-origin-design-system/issues/24)) found 24 component spacing tokens (padding, margin and gap) in Button, IconButton, Chip, Input, Badge, Separator and Field. Twenty pointed at a step the semantic spacing scales already have, and qualified only by reading "variant matrix" loosely (padding per size). The other four held off-grid values with no semantic step: Chip's `2px` vertical padding (default, small and medium) and Input's `11px`. Under the spacing rule those should have been snapped, not given tokens. Five `focus.outlineOffset` tokens duplicated `semantic.border.focusOffset` as a hard-coded `2px`.

Tokens had been added faster than they were needed, and every published token name is a contract (P7).

## Decision

**1. No component spacing tokens.** Padding, margin and gap always come from the semantic spacing scales (`semantic.spacing.*`). A component never gets its own spacing token, including for a size matrix or a family. An off-grid value is snapped to the grid, and an unbalanced component is rebalanced, as the spacing rule in `visual-language.md` already requires.

0014's three cases still apply to everything else, such as colours per variant and state, which genuinely differ.

**2. Every new token needs the owner's sign-off.** Before a token is created, in any tier, the proposal states its tier, value, what it's for, and why no existing token does the job, and the owner approves it. This applies to people, agents and subagents alike, and to tokens added as part of a larger change.

**3. Existing component spacing tokens are retired.** Components read the semantic tokens directly. The retired tokens stay in `tokens.json`, marked deprecated in their descriptions, until they're removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)).

## Consequences

- Retired (29: 24 spacing, 5 focus offset): `component.button.primary.padding`, `button.sizes.{small,medium,large}.padding`, `iconButton.sizes.{small,medium,large}.padding`, `chip.default.padding`, `chip.sizes.{small,medium,large}.padding`, the eight `separator` margins, `input.default.paddingX` and `paddingY`, `badge.count.paddingX`, `field.gap` and `field.label.gap`, plus the five `focus.outlineOffset` tokens (Button, Chip, IconButton, Input, Input error).
- Of the 24, the 20 on-grid tokens are replaced by semantic tokens directly. The four off-grid ones (Chip's `2px` on default, small and medium, and Input's `11px`) can't be until the values snap. Until [#129](https://github.com/common-origin/common-origin-design-system/issues/129) settles how controls get their heights, those two components keep reading their deprecated tokens, so nothing moves.
- The `token-change` skill and the token-architect agent require the sign-off step.
- Approved under rule 2 on the same day: eight semantic background colours for the Button, IconButton and Chip state matrices (`emphasis-hover`, `emphasis-active`, `error-hover`, `error-active`, `neutral`, `neutral-hover`, `neutral-active`, `transparent`), recorded on [#24](https://github.com/common-origin/common-origin-design-system/issues/24#issuecomment-5991823392).
