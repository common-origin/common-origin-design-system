# 0046. Agent proposals are reviewed or undone by one rule; suggestions fill the input

- **Status:** Proposed
- **Date:** 2026-10-22
- **Decided by:** Ollie (owner)
- **Principles:** P1, P2, P4, P5, P7
- **Builds on:** [0043](0043-data-colours.md) (purple means AI, never colour alone), [0016](0016-accent-selection-and-chip-types.md) (accent level, chip types), [0021](0021-alert-action-below-content.md) (actions follow the content)
- **Amends:** [0016](0016-accent-selection-and-chip-types.md) (adds a fourth chip type, Suggestion)
- **Issue:** [#273](https://github.com/common-origin/common-origin-design-system/issues/273), part of [#22](https://github.com/common-origin/common-origin-design-system/issues/22)

## Context

An agent that changes something the user owns needs a way for the user to see the change, take it or leave it, and take it back. Meal Agent's plan page does this today with its own Accept, Discard and Undo buttons beside AgentInput, because the system has no pattern for it. Its handover (2026-10-20) also asked for suggestion chips, and proposed generic `header`, `footer` and `actions` slots on AgentInput. The owner chose to define the meaning first, so products don't each invent their own review controls (P5), and not to add slots no product needs (P4).

The system has no agent pattern yet. [0043](0043-data-colours.md) gives purple to AI-generated content and agent actions, always with an icon and a label. [0016](0016-accent-selection-and-chip-types.md) says a chip is never a clickable action ("a clickable action uses a Button") and reserves the blue accent level for one brand moment per view.

**How other systems do it:**

- **VS Code's agent edits** write the change first and mark it pending. Users choose **Keep** or **Undo** per change, per file or for all edits, and an optional setting keeps pending edits automatically after a countdown ([Review and revert agent changes](https://code.visualstudio.com/docs/agents/run/review-code-edits)).
- **Shape of AI's Inline Action** says to show the AI's result "as a suggestion layer, not an overwrite" and to require verification to accept, reject or refine. Controls sit next to the content ([Inline Action](https://www.shapeof.ai/patterns/inline-action)).
- **IBM's Carbon for AI** marks every AI instance with an **AI label** that opens an explainability popover. When the user edits AI content, it loses the AI styling and offers **Revert to AI** ([Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)).
- **Material 3** has a **suggestion chip**: dynamically generated suggestions "such as possible responses", distinct from its filter, input and assist chips ([material-web chips](https://material-web.dev/components/chip/)).
- **WCAG 2.2.1 Timing Adjustable** requires that the user can turn off, adjust or extend any time limit, with narrow exceptions ([Understanding 2.2.1](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)).

## Decision

### 1. Two modes, chosen by one rule

An agent's change to the product's content is either **reviewed** or **applied with Undo**.

- **Review first** when the change edits or removes something the user wrote or chose, or touches more than one item. The change shows as a **proposal**, and nothing is committed until the user accepts it.
- **Apply with Undo** only when all of these hold: it's one item, nothing the user wrote or chose is removed, and Undo restores exactly what was there.
- **Out of scope:** actions that can't be undone (sending, paying, deleting permanently) keep the system's explicit confirmation, a Modal. They never apply with Undo.

Products don't choose the mode per feature; they apply the rule.

### 2. The review bar sits above the input

The controls for a proposal sit in a **review bar** directly above the input, inside the same region (and inside the docked band when the input is docked). They act on the **whole proposal**. Per-item review in the content is not part of this pattern yet (P4); when a product needs it, it extends this decision.

The bar follows [0021](0021-alert-action-below-content.md)'s order: the summary first, then the actions, left-aligned with it.

### 3. Labels and levels

| State | Bar shows | Controls |
|---|---|---|
| Proposal ready | A summary, for example "3 changes suggested" | **Accept** (primary Button), **Discard** (secondary Button) |
| Accepted, or applied with Undo | "Changes applied" | **Undo** (naked Button) |

Accept is never the accent level (0016). The labels say what happens to the proposal, so the wording is fixed. Products write the summary.

### 4. The content marks what's proposed

While a proposal is open, each changed item in the content carries the **AI marker**: the AI role colour, the AI icon and a short label, "Suggested". Removed items show as proposed removals, and the original stays recoverable by Discard. The marker goes away when the proposal is accepted or discarded. This applies 0043's AI rule to agent output, and settles part of the AI-labelling question on #22: **the label belongs to the agent's output, not to the input.**

### 5. Undo has no timer

Undo stays available until the next change to the same content, a new request, or the user leaving the view. Nothing is accepted or removed on a timer (WCAG 2.2.1, P2). VS Code's auto-keep countdown is deliberately not adopted.

### 6. Focus stays put; changes are announced

When a proposal is ready, focus stays where it is. The field stays editable while the agent works, as decided on [#267](https://github.com/common-origin/common-origin-design-system/issues/267). A polite announcement says what's ready and what to do, for example "3 changes suggested. Accept or discard." Accepting announces "Changes applied. Undo available.", discarding "Suggestion discarded.", and undoing "Changes undone." Everything in the region comes before the field in Tab order: the bar's buttons (Accept then Discard, or Undo alone), then the suggestions.

### 7. Suggestions belong to the input and fill it

Suggestions are prompt starters and follow-ups. They show above the field when it's empty and after the agent replies. **While a proposal is open, suggestions are hidden**: there's one decision in front of the user at a time, and a follow-up during a proposal is the open question below. When the bar shows Undo, suggestions show below it, so the region reads top to bottom as bar, then suggestions, then field. Picking one **fills the field and focuses it**, with the caret at the end; it never sends. The user can edit before sending, so the agent acts only on a deliberate submit.

They are a fourth chip type, **Suggestion**, amending 0016's table:

| Type | Component | Job | Visual variants |
|---|---|---|---|
| **Suggestion** | `SuggestionChip` | Offers text to put in the input | `default` only; no selected state |

A suggestion is the one chip that acts on click. It fills the input; it doesn't run a command, which is why it's a chip and not a Button. It keeps the chip shape and the 24px chip height ([0035](0035-chips-have-one-size.md)).

### 8. AgentInput renders the pattern from data

AgentInput owns the region above the field and renders both parts itself:

- `review?: { summary: string; state: 'proposal' | 'applied'; onAccept; onDiscard; onUndo }`
- `suggestions?: string[]` with `onSuggestionSelect?: (text: string) => void`. Selecting fills the field by default, so the callback is optional.

These are data props, not slots: products supply content and callbacks, and the system renders the controls, labels, order and announcements. Products can't restyle or rearrange them, so the pattern can't drift (P5). It also keeps the bar with the field when docked. The marker on changed content (point 4) is the product's to place, using the system's AI marker.

## Open question

**A follow-up request while a proposal is open.** The user types "make Tuesday fish instead" while three changes are still waiting. Options:

- **a) Refine:** the follow-up goes to the agent with the open proposal as context, and the agent returns a replacement proposal. Nothing is accepted on the user's behalf.
- **b) Commit first:** the open proposal is accepted implicitly, and the follow-up starts from the result.
- **c) Block:** the field asks the user to accept or discard first.

*Recommendation: a.* It matches how people revise a request, and it never commits a change the user didn't accept. Option b breaks point 1, and c contradicts the field staying editable (#267).

## Consequences

- **AgentInput gains `review`, `suggestions` and `onSuggestionSelect`** in a 2.x minor (P7: additive). Meal Agent's own Accept / Discard / Undo stack goes once they ship.
- **New `SuggestionChip`** in the chip family, with docs and tests.
- **New AI semantic tokens and an AI icon** are needed for the marker. The `ai` base ramp exists ([0044](0044-hue-ramps.md)), but there are no semantic AI colours yet. Each new token needs the owner's sign-off with a reason ([0022](0022-no-component-spacing-tokens.md)). The icon comes from the owner's Figma file.
- **The AI marker** needs a component, or an extension of an existing label, decided when it's built and checked against [0045](0045-status-indication.md) so it doesn't read as a status.
- **The AI-labelling question on #22** narrows to the explainability part: whether the marker opens an explanation, as Carbon's does.
- Implementation issues are raised under #22 once this decision is accepted.
