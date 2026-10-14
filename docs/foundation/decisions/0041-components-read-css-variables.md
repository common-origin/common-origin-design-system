# 0041. Components read tokens as CSS variables; styled-components stays

- **Status:** Proposed
- **Date:** 2026-10-14
- **Decided by:** Ollie (owner), pending
- **Principles:** P3, P7, P8, P9
- **Supersedes, if accepted:** the "token values baked in" part of [0009](0009-styling-architecture.md)
- **Issue:** [#41](https://github.com/common-origin/common-origin-design-system/issues/41)

## Context

[0009](0009-styling-architecture.md) records today's architecture: 47 components styled with styled-components v6 (a peer dependency), interpolating **resolved token values** from `tokens.json`. Because the values are baked in, no token can change at run time, so the density and motion modes of [0032](0032-token-modes.md) ([#191](https://github.com/common-origin/common-origin-design-system/issues/191), [#226](https://github.com/common-origin/common-origin-design-system/issues/226)) can't apply, and theming would touch every component. `tokens.css` already publishes every token as a CSS variable, with references kept, and the docs site loads it.

#41 asked whether to keep styled-components and read CSS variables, or move to a zero-runtime approach. Evidence gathered on 2026-10-14:

**styled-components is maintained again.** It entered maintenance mode in March 2025, but its maintainer resumed active development in 2026: 6.3 added React Server Components support without `'use client'` or a registry, 6.4 added inline style injection for RSC, 6.6.0 is current, and a v7 prerelease (React 19 floor, new CSS parser) shipped on 2026-10-12. It still has a single maintainer. #41's premise ("in maintenance mode") is out of date.

**Moving to zero-runtime is a rewrite and a major version.** Our components have 169 styled definitions, 119 prop-driven interpolations and 14 keyframes. vanilla-extract, Panda, StyleX, Linaria and CSS Modules all need those rewritten (prop-driven styles become variants, recipes or inline CSS variables). All of them also make consumers load a stylesheet the package ships, or configure a build plugin. That's a new setup step, and removing the styled-components peer dependency is a breaking change (P7).

**Reading CSS variables is a drop-in.** A throwaway prototype, reverted, measured it across the whole package:

- A generated mirror of `tokens.json` with the same shape and the same `Tokens` type, where each value is `var(--co-<name>, <resolved value>)`. All 972 tokens map to an existing variable in `tokens.css`.
- Switching the 51 component and lib files to it is a one-line import change each. Typecheck passes unchanged, because the type is identical.
- **No consumer setup changes.** With `tokens.css` removed from the page, the fallbacks rendered every checked component identically.
- **Modes work.** Setting `--co-semantic-size-control-*` on one element took a Button inside it from 48px to 40px, which is exactly what `data-co-density` needs.
- **Tests:** jsdom doesn't resolve `var()` (201 style assertions failed), but mapping the mirror to `tokens.json` for Jest made all 2113 tests pass unchanged. All 13 Playwright checks passed against the real `var()` output.
- **Bundle:** +10.7 KB gzip (+13%) with the mirror as a second JSON copy. Built from `tokens.json` at import time instead (one small function), the cost is close to nil.
- The #229 checker keeps working, because the mirror is typed `Tokens`.

## Decision (proposed)

1. **styled-components stays** the styling engine (a peer dependency, `^6`). We revisit it when v7 is stable, or if it stops being maintained.
2. **Components read tokens as CSS variables** through a mirror of the token object: same shape and same `Tokens` type, each value `var(--co-<name>, <resolved value>)`. The mirror is built from `tokens.json` (at build or import time), so it can't drift.
3. **The resolved value is always the fallback**, so a product that doesn't load `tokens.css` renders exactly as today. Loading `tokens.css` is needed only for modes and overrides. This makes the change a **minor** release.
4. **Breakpoints stay values.** CSS variables can't be used in media queries, and 0032 never switches breakpoints.
5. **Tests:** Jest maps the mirror to `tokens.json`, so unit tests keep asserting resolved values. Browser specs check `var()` behaviour.
6. **Mode blocks redeclare dependents.** A variable that references another is resolved where it's declared (`:root`), so a `[data-co-density]` or `[data-co-motion]` block must redeclare every alias of a token it changes, not only the token. The build generates these blocks.
7. **Zero-runtime engines are deferred, not rejected.** The CSS-variable step doesn't block a later move, and it makes one smaller, because styles would then read variables rather than values.

## Consequences

- Follow-up issues: (a) build the mirror and move components onto it, with a browser check that the `var()` output matches the resolved tokens; (b) #191 and #226 generate mode blocks that redeclare dependent aliases, now unblocked.
- `usage.md` says that loading `tokens.css` is optional, and needed only for modes.
- Package build and tree-shaking ([#237](https://github.com/common-origin/common-origin-design-system/issues/237)) and RSC without `'use client'` (styled-components 6.3+) are separate questions. This decision doesn't depend on them.
