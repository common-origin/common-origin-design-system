# Usage

How a product consumes the system today. Known issues are listed so nobody has to rediscover them.

## Install

```bash
npm install @common-origin/design-system react react-dom styled-components
```

Peer dependencies: `react` and `react-dom` 18 or 19, `styled-components` 6.

## Components

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

### Links and routing

Components that navigate (`Button` with `purpose="link"`, `Breadcrumbs`, `CardSmall`) accept an optional `linkComponent`. Pass your router's link for client-side navigation, or omit it to render a plain `<a>` ([0008](decisions/0008-framework-agnostic-components.md)).

```tsx
import Link from 'next/link'

<Button purpose="link" url="/about" linkComponent={Link}>About</Button>
```

## Tokens

```ts
import { tokens } from '@common-origin/design-system'
// or, without the components:
import tokens from '@common-origin/design-system/tokens'

const text = tokens.semantic.color.text.default
```

Use semantic tokens (`tokens.semantic.*`) in product code. Base tokens are building blocks for the token system itself.

## Fonts

The tokens specify **Inter** (weights 400, 500, 600, 700) for all UI text, but the package does not load any fonts. Each product must load Inter itself — for example with `next/font`, Fontsource, or its own `@font-face`. Without it, text falls back to the system sans-serif.

## Server rendering

Components are styled with styled-components, which needs server-side style collection to avoid a flash of unstyled content:

- **Next.js Pages Router:** collect styles in `pages/_document.tsx` with `ServerStyleSheet`.
- **Next.js App Router:** add a styled-components registry, and render design system components from Client Components (`'use client'`). They use React hooks and can't render in Server Components.

## Known issues

| Issue | Workaround |
|---|---|
| Under Node-native ESM resolution (`module`/`moduleResolution: node16` or `nodenext` in an ESM project, no bundler), the **default** import of `@common-origin/design-system/tokens` is typed as the whole module | Use the named export: `import { tokens } from '@common-origin/design-system/tokens'`. Bundler and CommonJS setups are unaffected. Tracked in [#41](https://github.com/common-origin/common-origin-design-system/issues/41) |
| The package doesn't mark its components `'use client'` | Import from Client Components in the App Router |
| Everything ships as a single bundle, including all icon data | None yet |
| Site-only dependencies (TypeScript, ts-morph, remark, Hotjar) install as runtime dependencies | None yet |
