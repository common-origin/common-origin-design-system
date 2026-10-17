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
  padding: var(--co-semantic-space-300);
}
```

Every variable is `--co-` plus the token's tier and path in kebab case ([0024](decisions/0024-css-variable-names-keep-tier.md)). Use `--co-semantic-*` in product code, as with the JS tokens. Most semantic variables reference base variables (`var(--co-base-…)`), so the file defines all three tiers. Six semantic tokens hold their own value instead (`elevation.inset`, `border.radius.none` and the four background overlays), so overriding a base variable doesn't change them. 

The components read these same variables, each with its resolved value as the fallback (`var(--co-semantic-color-text-default, #212529)`, [0041](decisions/0041-components-read-css-variables.md)). So **loading `tokens.css` is optional**: without it, components render exactly the resolved values. It's needed for your own CSS above, and for the density and motion modes when they arrive ([#191](https://github.com/common-origin/common-origin-design-system/issues/191), [#226](https://github.com/common-origin/common-origin-design-system/issues/226)). Don't override the variables yourself to restyle components: a variable that references another is resolved where `tokens.css` declares it, so an override on an element doesn't reach the variables built on it, and the modes will be the supported way.

### Density

A product can make any region compact or comfortable: load `tokens.css` once, then set `data-co-density` on an element, and every control inside it takes that density. Regions nest, and `data-co-density="default"` resets one.

```tsx
<section data-co-density="compact">
  <TransactionsTable />
</section>
```

Density changes control heights by one 8px step (compact 24 / 32 / 40px, default 32 / 40 / 48px, comfortable 40 / 48 / 56px) and the padding inside controls by one step. Text, colour, rows and layout spacing don't change, and compact never goes below the 24px pointer target ([0032](decisions/0032-token-modes.md), [0034](decisions/0034-control-heights.md)). Without `tokens.css`, everything renders at the default density. The docs site's density guide shows the three side by side.

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
| Every bundle that uses Icon (Button, IconButton, Alert and more) includes all icon data, because icons are looked up by name at run time. Components themselves tree-shake ([0042](decisions/0042-package-build.md)) | None yet. Research in [#253](https://github.com/common-origin/common-origin-design-system/issues/253) |
