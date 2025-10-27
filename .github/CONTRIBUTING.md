# Contributing to Common Origin Design System

## Development Guidelines

### TypeScript Type Definitions for Exported Components

**CRITICAL**: When creating component props that reference JSON files or token data, follow these rules to ensure proper TypeScript support in consuming projects:

#### ❌ DON'T: Use Path Aliases in Type Definitions

```typescript
// DON'T - This breaks in consuming projects
import iconsData from '@/styles/icons.json'

export interface MyComponentProps {
  iconName: keyof typeof iconsData  // ❌ Path alias won't resolve externally
}
```

#### ✅ DO: Create Self-Contained String Literal Union Types

```typescript
// DO - Create explicit type in src/types/
export type IconName = 
  | 'add'
  | 'close'
  | 'menu'
  // ... all icon names

// Then import with RELATIVE paths
import { type IconName } from '../../../types/icons'

export interface MyComponentProps {
  iconName: IconName  // ✅ Works perfectly in consuming projects
}
```

#### ✅ DO: Use Relative Imports for Type Dependencies

```typescript
// ✅ GOOD - Use relative imports for types
import { type IconName } from '../../../types/icons'

// ❌ BAD - Path aliases break in generated .d.ts files
import { type IconName } from '@/types/icons'
```

### Why This Matters

1. **Path Aliases Don't Work in Published Packages**: The `@/` alias works internally but TypeScript preserves it in generated `.d.ts` files. Consuming projects can't resolve these aliases.

2. **Autocomplete & Type Safety**: Proper types give developers autocomplete and validation in their projects.

3. **Better DX**: Self-contained union types are portable and don't depend on JSON file resolution.

### Checklist for New Components

- [ ] If component uses token values, verify `tokens` is exported from main package
- [ ] If component uses JSON data for types (like icons), create a type file in `src/types/`
- [ ] Use **relative imports** for type dependencies, not path aliases
- [ ] Export the type from `src/index.ts` for external use
- [ ] Test that types work by checking generated `.d.ts` files in `dist/`
- [ ] Verify no `@/` path aliases appear in `dist/**/*.d.ts` files

### File Structure for Types

```
src/
  types/
    icons.ts          # Icon-related types
    tokens.ts         # Token-related types (if needed)
    index.ts          # Re-export all types
  index.ts            # Export types for external use
```

### Exporting Types

Always export types from the main package index:

```typescript
// src/index.ts
export * from './components'
export { default as tokens } from './styles/tokens.json'
export { iconsData, type IconName } from './types/icons'
```

### Testing Type Definitions

After building, verify the generated types:

```bash
npm run build:package
cat dist/components/atoms/YourComponent/YourComponent.d.ts
```

Check for:
- ✅ No `@/` path aliases
- ✅ Relative paths like `../../../types/...`
- ✅ Self-contained types that don't require JSON imports

## Common Patterns

### Pattern 1: String Literal Unions from JSON

When you have a JSON file with fixed values (like icons):

1. Create a type file: `src/types/yourtype.ts`
2. Define explicit string literal union
3. Export from main package
4. Import with relative paths in components

### Pattern 2: Token-Based Props

When using design tokens (already exported):

```typescript
// ✅ This works because tokens is exported
import tokens from '@/styles/tokens.json'

export interface BoxProps {
  gap?: keyof typeof tokens.semantic.spacing.layout  // ✅ OK
}
```

**Why it works**: `tokens` is exported from the main package, so consuming projects can resolve it.

### Pattern 3: Auto-Generated Types

For maintainability, consider generating types from JSON:

```javascript
// scripts/generate-types.js
const icons = require('./src/styles/icons.json')
const iconNames = Object.keys(icons).map(k => `'${k}'`).join(' | ')
// Write to src/types/icons.ts
```

## Questions?

If you're unsure whether your types will work in consuming projects:
1. Build the package: `npm run build:package`
2. Check the generated `.d.ts` files in `dist/`
3. Look for any `@/` imports - these will break!
4. Test in a separate project to verify autocomplete works

## Related Issues

- #[issue-number] - IconName type resolution in consuming projects
- See `CHANGELOG.md` for v1.4.2 release notes about this pattern
