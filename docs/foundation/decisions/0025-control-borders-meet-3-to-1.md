# 0025. Resting control borders meet 3:1; border.default and border.subtle are for dividers

- **Status:** Accepted
- **Date:** 2026-10-08
- **Decided by:** Ollie (owner)
- **Principles:** P2, P1, P3

## Context

The resting border of TextField (through InputBase), PasswordField, NumberInput, Dropdown, SearchField, AgentInput and the Checkbox box came from `component.input.default.borderColor`, which pointed at `semantic.color.border.subtle` (#dee2e6, 1.30:1 on white). The border is what shows where these controls are: their white fill (`background.subtle`) is only 1.05:1 on the page (`#f8f9fa`). WCAG 2.2 SC 1.4.11 (Non-text Contrast) asks for 3:1, and P2 makes AA the floor ([#144](https://github.com/common-origin/common-origin-design-system/issues/144)).

On the neutral scale, the first grey above 3:1 on white is neutral.600 (#6c757d, 4.69:1). No existing border token sat between 3:1 and 5:1.

## Decision

**1. The resting border of a control whose edge shows where it is meets 3:1** against its fill and the page.

**2. A new semantic token, `semantic.color.border.control`, on `base.color.neutral.600`** (#6c757d: 4.69:1 on white, 4.45:1 on the page). `component.input.default.borderColor` points at it. Approved under [0022](0022-no-component-spacing-tokens.md) rule 2.

**3. Disabled controls keep `border.subtle`.** SC 1.4.11 exempts inactive components, and a light border helps show that a control is disabled.

**4. `border.default` and `border.subtle` are for dividers and decorative outlines only**, never a control's edge.

## Consequences

- Text inputs, Dropdown, SearchField, AgentInput and the Checkbox box get a clearly darker resting border. Hover and focus are unchanged (`border.strong`), so hovering now changes the border less than it did.
- `src/tokens/contrast.test.ts` checks that the resting input border stays at 3:1 or more on the input fill and the page.
- Slider's unfilled track also uses `border.default` (1.19:1). It's a track, not a field edge, so it's decided separately in [#150](https://github.com/common-origin/common-origin-design-system/issues/150).
