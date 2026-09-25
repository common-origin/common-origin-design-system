# 0008. Components are framework-agnostic

- **Status:** Accepted
- **Date:** 2025-12-05 (v2.0.0)
- **Decided by:** Ollie (owner)
- **Principles:** P7, P8

## Context

Before v2.0.0, components imported `next/link` and `next/image`, so the package only worked in Next.js apps. Recorded retroactively from `MIGRATION-V2.md` and the v2.0.0 release.

## Decision

- Components contain no framework imports and work in any React application.
- Navigation components accept an optional `linkComponent` prop (Button, Breadcrumbs, CardSmall). Without it they render a standard `<a>`.
- Image components render standard `<img>` / `<picture>` elements.
- Site-only components (navigation, page layout, error boundaries, hero) live in `src/page-components/` and are not part of the package.

## Consequences

- `npm run verify:no-nextjs` checks the built package for Next.js imports before publishing.
- Site-only code must not be imported from package components. (Currently broken: `Alert` imports `Typography` via `@/page-components`, which pulls site-only type declarations into the package.)
