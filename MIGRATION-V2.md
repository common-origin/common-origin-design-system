# Migration Guide: v1.x to v2.0.0

## Breaking Changes

Version 2.0.0 removes Next.js dependencies from the design system, making it framework-agnostic. This is a **breaking change** if you were relying on automatic Next.js Link behavior.

## What Changed

### Components Affected
- `Button`
- `Breadcrumbs`
- `CardSmall`

### Key Changes
1. **Removed Next.js imports** - Components no longer import `next/link` or `next/image`
2. **Added `linkComponent` prop** - You can now pass your own link component (Next.js Link, React Router Link, etc.)
3. **Default to standard HTML** - Without a custom link component, components use standard `<a>` tags

## Migration Steps

### Option 1: Using Next.js Link (Recommended for Next.js apps)

Import Next.js Link and pass it to components:

```tsx
import Link from 'next/link'
import { Button, Breadcrumbs, CardSmall } from '@common-origin/design-system'

// Button with Next.js Link
<Button 
  purpose="link" 
  url="/about" 
  linkComponent={Link}
>
  About Us
</Button>

// Breadcrumbs with Next.js Link
<Breadcrumbs 
  breadcrumbs={[
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' }
  ]}
  linkComponent={Link}
/>

// CardSmall with Next.js Link
<CardSmall
  title="Article Title"
  picture="/image.jpg"
  meta="2024-01-15"
  href="/articles/123"
  linkComponent={Link}
/>
```

### Option 2: Using React Router Link

```tsx
import { Link } from 'react-router-dom'
import { Button, Breadcrumbs } from '@common-origin/design-system'

<Button 
  purpose="link" 
  url="/about" 
  linkComponent={Link}
>
  About Us
</Button>

<Breadcrumbs 
  breadcrumbs={breadcrumbsData}
  linkComponent={Link}
/>
```

### Option 3: Standard Links (No framework)

If you don't need client-side routing, simply omit the `linkComponent` prop. Components will use standard `<a>` tags:

```tsx
import { Button, Breadcrumbs } from '@common-origin/design-system'

// Uses standard <a> tag
<Button purpose="link" url="/about">
  About Us
</Button>

// Uses standard <a> tags
<Breadcrumbs breadcrumbs={breadcrumbsData} />
```

## Why This Change?

### Problem in v1.x
The design system had Next.js as a hard dependency. This caused:
- ❌ Package couldn't be imported in non-Next.js React apps
- ❌ Build tools bundled Next.js code into the package
- ❌ "Cannot find module 'next/link'" errors for consumers

### Solution in v2.0
- ✅ **Framework-agnostic** - Works in Next.js, Create React App, Vite, or any React app
- ✅ **Flexible** - Use Next.js Link, React Router Link, or standard links
- ✅ **No breaking functionality** - All features still work, just need to pass `linkComponent`
- ✅ **Smaller bundle** - No framework code bundled into the package

## Component-Specific Migration

### Button Component

**v1.x (automatic Next.js Link):**
```tsx
<Button purpose="link" url="/about">About</Button>
// Automatically used Next.js Link for internal URLs
```

**v2.0 (explicit linkComponent):**
```tsx
import Link from 'next/link'

<Button purpose="link" url="/about" linkComponent={Link}>
  About
</Button>
```

### Breadcrumbs Component

**v1.x:**
```tsx
<Breadcrumbs breadcrumbs={items} />
// Automatically used Next.js Link for internal URLs
```

**v2.0:**
```tsx
import Link from 'next/link'

<Breadcrumbs breadcrumbs={items} linkComponent={Link} />
```

### CardSmall Component

**v1.x:**
```tsx
<CardSmall title="Article" href="/articles/1" picture="/img.jpg" meta="2024-01-15" />
// Automatically used Next.js Link
```

**v2.0:**
```tsx
import Link from 'next/link'

<CardSmall 
  title="Article" 
  href="/articles/1" 
  picture="/img.jpg" 
  meta="2024-01-15"
  linkComponent={Link}
/>
```

## TypeScript Changes

All affected components now have the `linkComponent` prop in their type definitions:

```typescript
interface BaseButtonProps {
  // ... other props
  /**
   * Custom link component (e.g., Next.js Link, React Router Link)
   * Receives href, children, and other props
   */
  linkComponent?: React.ComponentType<any>
}
```

## Testing Your Migration

1. **Update all component usages** to include `linkComponent` where needed
2. **Run your tests** to ensure link behavior works correctly
3. **Test client-side navigation** to verify routing works
4. **Build your app** to ensure no import errors

## Need Help?

If you encounter issues during migration:
1. Check that you're passing the correct Link component for your framework
2. Verify the Link component accepts `href` and `children` props
3. Ensure your routing setup is working independently of the design system

## Rollback

If you need to stay on v1.x temporarily:
```bash
npm install @common-origin/design-system@1.16.1
```

However, v1.x has the Next.js dependency issue that may break your builds.
