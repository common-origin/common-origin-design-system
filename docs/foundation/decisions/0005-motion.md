# 0005. Motion is part of the system; appearing elements animate in

- **Status:** Accepted (reduced-motion clause proposed)
- **Date:** 2026-09-25
- **Decided by:** Ollie (owner)
- **Principles:** P2, P5, P6

## Context

The April 2026 brand documents banned entrance animations outright ("elements do not animate in"). The shipped Modal, Sheet, and ActionSheet do animate in, and motion tokens exist (`semantic.motion`: 150ms, 200ms, 300ms). The owner confirmed motion is intended to be part of the system; where it is missing, that is either unimplemented or broken, not deliberate.

## Decision

- Motion is part of the design system and should be applied wherever it helps explain change.
- Elements that appear on the page — modals, sheets, action sheets, dialogs, menus, and similar — animate into place.
- Interactive elements respond to hover, press, focus, selection, and expand/collapse.
- Durations come from the motion tokens, 300ms maximum. Easing is never linear. Motion is never decorative or scroll-triggered.
- **Proposed:** when the user has `prefers-reduced-motion` set, replace movement with an instant change or a simple fade, so people who don't want motion can switch it off (P2). The owner intends to adopt this as motion is added to the system. Until it's accepted, any new or reworked motion should include reduced-motion support rather than add to the backlog.

## Consequences

- The "never entrance animations" rule has been removed from the `.github/` guidance and agent definitions.
- Follow-up: audit every component for missing or broken motion, and move hard-coded durations to motion tokens.
- Follow-up: only IconButton and AgentInput currently respect reduced motion.
