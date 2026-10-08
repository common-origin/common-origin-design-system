# 0026. Slider's unfilled track stays light

- **Status:** Accepted
- **Date:** 2026-10-08
- **Decided by:** Ollie (owner)
- **Principles:** P2, P1, P5
- **Exception to:** [0025](0025-control-borders-meet-3-to-1.md) rule 1

## Context

Decision 0025 requires the edge that shows where a control is to meet 3:1, and keeps `border.default` and `border.subtle` for dividers. Slider's unfilled track used `color.border.default` (#e9ecef, 1.19:1 on white), and so did its disabled fill and disabled thumb ring ([#150](https://github.com/common-origin/common-origin-design-system/issues/150)).

The thumb and the filled part of the track use `background.emphasis` (15.43:1). WCAG 2.2 SC 1.4.11 asks for 3:1 on the visual information needed to identify a control and its state. For a slider, the thumb's position and the filled part already show both. Whether the empty track also needs 3:1 is a matter of interpretation, and many systems keep it light.

A disabled slider's fill (#e9ecef) was only 1.07:1 against the disabled track (`background.disabled`, #dee2e6), so its value was nearly invisible.

## Decision

**1. The unfilled track doesn't need 3:1.** This is an Exception to 0025 rule 1: the thumb and the filled part identify the control and its value.

**2. The unfilled track uses `background.progressTrack`** (#dee2e6, 1.30:1), the same as ProgressBar's (P5). It's a fill, so it no longer uses a border token.

**3. A disabled slider's fill and thumb ring use `icon.disabled`** (#adb5bd). This mirrors the enabled state, where the ring is the same colour as the fill, and keeps the disabled value visible (1.59:1 on the disabled track). Disabled controls are exempt from 1.4.11.

No new tokens.

## Consequences

- The unfilled track moves from #e9ecef to #dee2e6, a barely visible change. A disabled slider's fill and thumb ring become clearly visible.
- Slider no longer reads `color.border.default`.
- `Slider.test.tsx` checks the track, fill and thumb colours in both states.
