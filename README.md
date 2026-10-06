# Common Origin Design System

React components and design tokens for Common Origin products, published as [`@common-origin/design-system`](https://www.npmjs.com/package/@common-origin/design-system). Components work in any React app (Next.js, Vite, React Router and so on), are built from design tokens, and meet WCAG 2.2 AA.

- **Docs site:** https://common-origin-design-system.vercel.app/ (components at `/components`, tokens at `/tokens`)
- **Why it exists, who it serves and how decisions are made:** [docs/foundation/](docs/foundation/README.md)

## Install

```bash
npm install @common-origin/design-system react react-dom styled-components
```

Peer dependencies: `react` and `react-dom` 18 or 19, and `styled-components` 6.

```tsx
import { Button, Stack, Typography } from '@common-origin/design-system'

export function Welcome() {
  return (
    <Stack direction="column" gap="md">
      <Typography variant="h1">Welcome</Typography>
      <Button variant="primary">Get started</Button>
    </Stack>
  )
}
```

Tokens are exported from the main entry and from `@common-origin/design-system/tokens`. Fonts, links and routing, server rendering and known issues are covered in the [usage guide](docs/foundation/usage.md).

Upgrading from v1? See [MIGRATION-V2.md](MIGRATION-V2.md).

## What's in the package

- **Atoms** (`src/components/atoms/`): 18 components, including Button, Typography, Stack, Box, Chip and Icon
- **Molecules** (`src/components/molecules/`): 25 components, including Alert, Dropdown, List, Modal, TextField and TabBar
- **Layout** (`src/components/layout/`): GridSystem (Grid, GridCol, ResponsiveGrid)
- **Tokens** (`src/tokens/`): base, semantic and component tiers, compiled by Style Dictionary to `src/styles/tokens.json`, `.css` and `.d.ts` ([pipeline](docs/tokens/pipeline.md))

The docs site lists every component with its props, examples and accessibility notes, except PageTitle, which is deprecated and will be removed in the next major version: use `Typography variant="h1"` in a `Stack` instead ([#81](https://github.com/common-origin/common-origin-design-system/issues/81)).

## Repository layout

```
src/
├── components/        # The published package: atoms, molecules, layout
├── tokens/            # Token sources
├── styles/            # Generated tokens (JSON, CSS, types) and icon data
├── lib/               # Shared helpers (styleUtils, usePresence) and docs-site data (componentsData.ts registers each .docs.tsx)
├── page-components/   # Docs-site only (layout, navigation, footer, hero)
├── patterns/          # Docs-site only (pattern examples)
└── index.ts           # Package entry
pages/                 # Docs site (Next.js): /, /components, /tokens, /patterns, /releases
docs/foundation/       # Purpose, users, principles, visual language, decisions
```

Package components never import from `src/page-components/`, `src/patterns/` or `pages/`.

## Development

Requires Node 22 or later to work on the repository: the token build uses Style Dictionary 5. The published package supports Node 20 or later.

```bash
npm install
npm run docs:dev         # build tokens, then start the docs site at http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Docs site dev server |
| `npm run build` | Build the docs site |
| `npm run build:tokens` | Compile token sources |
| `npm run build:package` | Build the package to `dist/` (Rollup) |
| `npm run verify:package` | After `build:package`: check published types, consumer type-check, publint, attw |
| `npm test` | Jest, including jest-axe accessibility tests |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint, with a warnings ratchet: never raise the limit, lower it when you fix warnings |
| `npm run verify:docs` | Fails if a doc references a missing file, folder or npm script |

Before proposing a change: `typecheck`, `lint`, `test`, `build:package` and `verify:package`.

## Contributing and releases

- [CONTRIBUTING.md](CONTRIBUTING.md): component structure, testing and pull requests
- [RELEASE.md](RELEASE.md): how releases are made
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/); the changelog is generated from them.
