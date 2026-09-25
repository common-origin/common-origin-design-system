# 0006. Page background is the `background.default` token

- **Status:** Accepted
- **Date:** 2026-09-25
- **Decided by:** Ollie (owner)
- **Principles:** P3

## Context

The April 2026 brand documents described the page background as a "warm off-white ~#F8F8F8, never pure white". The token `semantic.color.background.default` is `#f8f9fa`, a cool off-white.

## Decision

The token is correct: the page background is `semantic.color.background.default` (`#f8f9fa`). Components and products reference the token, never a hex value.

## Consequences

- The "warm #F8F8F8" description has been removed from the `.github/` guidance.
- "Never pure white as the page background" still holds; `background.subtle` (`#ffffff`) is for surfaces such as cards, not the page.
