# Common Origin Design System: agent instructions

The React component library and design tokens published as `@common-origin/design-system`, plus a Next.js docs site (https://common-origin-design-system.vercel.app/).

**Read the foundation first:** [docs/foundation/](../docs/foundation/README.md) explains why the system exists, who it serves, the principles (`P1`–`P9`) and the decisions. Where this file or any other `.github/` guide disagrees with the foundation, the foundation wins. For exact values, the tokens in `src/tokens/` are the authority; for behaviour, the component source is.

## Keeping this file current

Update this file in the same PR as any change to the structure, build, testing approach or conventions it describes. Keep it short and link to detail rather than repeating it. Record *why* in a decision record (`docs/foundation/decisions/`), not here.

## Structure

- `src/components/atoms/`, `molecules/`, `layout/`: the published package. There is no organisms level.
- Each component folder has `Name.tsx`, `Name.test.tsx`, `Name.docs.tsx` and `index.ts` (`export * from './Name'`).
- `src/tokens/`: token sources. `npm run build:tokens` compiles them to `src/styles/tokens.json`, `tokens.d.ts` and `tokens.css` ([pipeline](../docs/tokens/pipeline.md)).
- `src/styles/icons.json`: icon path data, used through `Icon`. Icon names are typed in `src/types/icons.ts`.
- `src/lib/`: shared helpers used by components (`styleUtils`, `usePresence`) and docs-site data (`componentsData.ts`).
- `src/page-components/`, `src/patterns/`, `pages/`: docs site only. Package components must never import from them.

## Tokens

Components import token values from the JSON and never hard-code colours, spacing, radius, shadows, fonts, z-index or durations (P3). The exceptions recorded in the [visual language](../docs/foundation/visual-language.md) still apply: literal `-1`, `0` or `1` z-index for stacking a component's own parts (0013), AgentInput's 1300ms working ring (0010), and a few non-design px literals.

```tsx
import tokens from '@/styles/tokens.json'
const { semantic } = tokens
// color: ${semantic.color.text.default}; padding: ${semantic.spacing.layout.md};
```

- Components use **semantic** tokens, or **component** tokens where decision [0014](../docs/foundation/decisions/0014-token-tiers.md) allows. They **never** use base tokens; an ESLint rule enforces this in `src/components`.
- If the right token doesn't exist, add one (semantic first) rather than hard-coding.
- There is no ThemeProvider or runtime theme: token values are baked in at build time.
- Prop types built from tokens use `import type { Tokens } from '../../../types/tokens'` and `keyof Tokens['semantic'][…]`, never `keyof typeof` an imported JSON file, and never `@/` aliases in anything that ends up in published `.d.ts` files.

## Components

- Styled-components with `$`-prefixed transient props, which styled-components keeps off the DOM. Many components also add `withConfig({ shouldForwardProp: (prop) => !prop.startsWith('$') })`; it isn't required for `$` props.
- Framework-agnostic: no Next.js imports ([0008](../docs/foundation/decisions/0008-framework-agnostic-components.md)). Navigation takes an optional `linkComponent`.
- Every component supports `'data-testid'?: string` on its root element.
- Motion uses `semantic.motion` durations and easings, respects `prefers-reduced-motion`, and stays at 300ms or less (P6, [0005](../docs/foundation/decisions/0005-motion.md)). The one exception is AgentInput's continuous working ring ([0010](../docs/foundation/decisions/0010-agentinput-working-ring.md)).
- Documentation: a hand-written `Name.docs.tsx` registered in `src/lib/componentsData.ts`. Nothing is generated from the source, so update the docs with every prop change ([src/lib/docgen/README.md](../src/lib/docgen/README.md)).

## Testing

- Jest and React Testing Library, configured in `jest.config.js` and `jest.setup.js`. Jest transforms with Babel (`.babelrc` and `babel-plugin-styled-components`), and styled-components is not mocked.
- Every component needs a `jest-axe` test (P2), tests for its props and variants, keyboard tests if it's interactive, and a `data-testid` test.
- Query by role first, then label, then static text, then `data-testid`. Avoid text selectors for dynamic content.
- Details: [TESTING_STANDARDS.md](./TESTING_STANDARDS.md).

## Commands

```bash
npm run typecheck        # tsc --noEmit
npm run lint             # ESLint with a warnings ratchet: never raise the limit, lower it when you fix warnings
npm run verify:docs      # docs must not reference missing files or scripts
npm test                 # Jest, including jest-axe
npm run build:tokens     # compile tokens
npm run build:package    # Rollup → dist/
npm run verify:package   # after build:package: published types, consumer type-check, publint, attw
npm run build            # docs site
npm run docs:dev         # build tokens, then run the docs site
```

Run typecheck, lint, tests, `build:package` and `verify:package` before proposing a change as done.

`npm run build` rewrites `tsconfig.json` and `next-env.d.ts`, and `build:tokens` rewrites the generated token files' timestamps. Don't commit those incidental changes.

## Change Authority & Validation Protocol

**Human approval required:**
- File structure changes (`src/` organisation, build config)
- New dependencies or peer dependency changes
- Breaking API changes (component props, exports, token names): these are major versions (P7)
- Architecture pattern changes (styling engine, testing strategy, build process), which also need a decision record

**Fine without prior approval (still reviewed in the PR):**
- Component changes within established patterns
- Bug fixes that keep the existing API
- Tests, and documentation that matches the code

**When no principle or decision covers a change:** don't guess. Keep the current behaviour and raise an open question with the options and a recommendation ([principles](../docs/foundation/principles.md#when-no-principle-or-decision-applies)).

**Before proposing a change:**
- [ ] It is backwards compatible, or the PR says it's breaking
- [ ] It uses semantic or component tokens, with no hard-coded values
- [ ] It meets WCAG 2.2 AA, with a passing jest-axe test
- [ ] Visual changes cite the principle or decision that justifies them
- [ ] The checks above pass

## Releases

See [RELEASE.md](../RELEASE.md). The docs site's `/releases` page reads `CHANGELOG.md` directly.

## Other guides

These predate the foundation and are partly inaccurate; the foundation wins where they disagree.

- [COMPONENT_PATTERNS.md](./COMPONENT_PATTERNS.md)
- [ACCESSIBILITY_GUIDELINES.md](./ACCESSIBILITY_GUIDELINES.md)
- [DOCUMENTATION_STANDARDS.md](./DOCUMENTATION_STANDARDS.md)
- [TESTING_STANDARDS.md](./TESTING_STANDARDS.md)
- [TOKEN_MANAGEMENT.md](./TOKEN_MANAGEMENT.md)
- [BUNDLE_OPTIMIZATION.md](./BUNDLE_OPTIMIZATION.md)
