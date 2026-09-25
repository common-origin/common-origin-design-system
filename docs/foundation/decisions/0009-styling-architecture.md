# 0009. styled-components with tokens imported as values

- **Status:** Accepted, under review
- **Date:** Recorded 2026-09-25; the original decision predates the repository's records
- **Decided by:** Unrecorded
- **Principles:** P3, P8

## Context

Recorded retroactively so the current architecture has a documented starting point. The original rationale was not written down.

## Decision (as it stands)

- Components are styled with **styled-components** v6, a peer dependency.
- Components import `src/styles/tokens.json` directly and interpolate token **values** into their styles. There is no theme provider and no CSS custom properties at the component level.
- Style Dictionary builds the tokens from `src/tokens/` into JSON, TypeScript declarations, and CSS variables (`tokens.css`); the CSS variables are used only by the docs site.

## Consequences

- **Dark mode or theming would touch every component**, because token values are baked in at build time. The earlier claim that the token layer "already supports dark mode structurally" is not accurate.
- styled-components needs server-side style collection and Client Components in React Server Component setups (see [usage](../usage.md#server-rendering)).
- Under review: whether to move components to CSS custom properties, which would enable theming and dark mode and reduce runtime cost. Any change gets a new decision record that supersedes this one.
