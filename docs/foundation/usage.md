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

### CSS custom properties

For CSS that doesn't go through styled-components, import the tokens as custom properties once, at the root of the app:

```ts
import '@common-origin/design-system/tokens.css'
```

```css
.panel {
  color: var(--co-semantic-color-text-default);
  padding: var(--co-semantic-spacing-layout-md);
}
```

Every variable is `--co-` plus the token's tier and path in kebab case ([0024](decisions/0024-css-variable-names-keep-tier.md)). Use `--co-semantic-*` in product code, as with the JS tokens. Semantic variables reference base variables (`var(--co-base-…)`), so the file defines all three tiers. The components themselves still use the JS tokens ([0009](decisions/0009-styling-architecture.md)).

## Fonts

The tokens specify **Inter** (weights 400, 500, 600, 700) for all UI text, as the literal family name `'Inter'`. The package does not load any fonts, so each product must load Inter itself **under the family name `Inter`**. Without it, text falls back to the system sans-serif.

- **Fontsource** (`@fontsource/inter`) or your own `@font-face` with `font-family: 'Inter'` both work as-is. The docs site uses `@font-face` in `styles/fonts.css`.
- **`next/font`** renames the family to a generated name (such as `__Inter_a1b2c3`), so the tokens' `'Inter'` won't match it. Use one of the options above instead.

## Server rendering

Components are styled with styled-components, which needs server-side style collection to avoid a flash of unstyled content:

- **Next.js Pages Router:** collect styles in `pages/_document.tsx` with `ServerStyleSheet`.
- **Next.js App Router:** add a styled-components registry (below) to the root layout.

### React Server Components

The package marks its components `'use client'`, so in the App Router you can import and render them straight from Server Components:

```tsx
// app/page.tsx — a Server Component
import { Button, Typography } from '@common-origin/design-system'
import { tokens } from '@common-origin/design-system/tokens'

export default function Page() {
  return (
    <>
      <Typography variant="h1">Welcome</Typography>
      <Button variant="primary">Get started</Button>
    </>
  )
}
```

- `tokens` and `iconsData` are plain data and can be read in Server Components. `tokens` is exported by both `@common-origin/design-system` and `@common-origin/design-system/tokens`; `iconsData` only by the main entry.
- Server Components can't pass functions to Client Components. Props such as `onClick`, `onChange` and `linkComponent` have to be set inside a Client Component (a file starting with `'use client'`).

The styled-components registry, from the [Next.js guide](https://nextjs.org/docs/app/guides/css-in-js#styled-components):

```tsx
// app/registry.tsx
'use client'
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet())
  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement()
    sheet.instance.clearTag()
    return <>{styles}</>
  })
  if (typeof window !== 'undefined') return <>{children}</>
  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
}
```

Wrap `{children}` in `<StyledComponentsRegistry>` inside `<body>` in `app/layout.tsx`. <!-- verify-docs-ignore: consumer's file -->

## Known issues

| Issue | Workaround |
|---|---|
| Under Node-native ESM resolution (`module`/`moduleResolution: node16` or `nodenext` in an ESM project, no bundler), the **default** import of `@common-origin/design-system/tokens` is typed as the whole module | Use the named export: `import { tokens } from '@common-origin/design-system/tokens'`. Bundler and CommonJS setups are unaffected. Tracked in [#41](https://github.com/common-origin/common-origin-design-system/issues/41) |
| Loading the package with native Node ESM and no bundler (`import` in a plain Node `.mjs` script or server) fails: styled-components has no ESM entry for Node, so its default import resolves to the whole CommonJS module | Use a bundler or test runner (Next.js, Vite, webpack, Vitest), or load the CommonJS build with `require`. Jest and other `require()` consumers work. Tracked in [#41](https://github.com/common-origin/common-origin-design-system/issues/41) |
| Everything ships as a single bundle, including all icon data | None yet |
