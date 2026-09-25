# Common Origin Design System

React component library and design tokens (`@common-origin/design-system`), plus a Next.js docs site (https://common-origin-design-system.vercel.app/).

## Foundation (always applies)

@docs/foundation/README.md
@docs/foundation/principles.md

Read these as needed:
- `docs/foundation/visual-language.md` — before any visual, token, or motion change
- `docs/foundation/decisions/` — why things are the way they are
- `docs/foundation/users.md`, `purpose.md`, `brand.md`, `usage.md`
- `docs/tokens/pipeline.md` — before changing tokens or the Style Dictionary config (don't trust `.github/TOKEN_MANAGEMENT.md` for this)

The guidance in `.github/*.md` predates the foundation and is partly inaccurate. Where it conflicts with `docs/foundation/`, the foundation wins.

## Layout

- `src/components/{atoms,molecules,layout}/Name/` — `Name.tsx`, `Name.test.tsx`, `Name.docs.tsx`, `index.ts`. This is the published package.
- `src/tokens/` — token sources. `npm run build:tokens` compiles them to `src/styles/tokens.json` (+ `.d.ts`, `.css`).
- `src/page-components/`, `src/patterns/`, `pages/` — docs site only. Package components must never import from these.
- `src/lib/componentsData.ts` — registers each `.docs.tsx` on the docs site.

## Commands

```bash
npm run typecheck        # tsc --noEmit
npm test                 # jest (includes jest-axe)
npm run build:package    # rollup → dist/
npm run verify:types     # checks dist .d.ts for @/ aliases (currently misses nested dirs)
npm run verify:no-nextjs
npm run build            # docs site
```

Run typecheck, tests, and `build:package` before proposing any change as done.

## Gotchas

- `@/` path aliases must never reach a published type. Component props must not reference types via `@/` imports — use relative imports.
- `npm run build` rewrites `tsconfig.json` and `next-env.d.ts`, and `build:tokens` rewrites the generated token files' timestamps. Don't commit those incidental changes.
