# GitHub Copilot Instructions for Common Origin Design System

## Code Generation Guidelines

### TypeScript Component Props

When generating component props that use design tokens or JSON data:

1. **ALWAYS use relative imports** for type dependencies (never use `@/` path aliases in components)
2. **Create string literal union types** for JSON-based values instead of `keyof typeof`
3. **Export types** from `src/index.ts` for external consumption

### Type Import Pattern

```typescript
// ✅ CORRECT: Use relative paths for types
import { type IconName } from '../../../types/icons'

// ❌ WRONG: Don't use path aliases for types
import { type IconName } from '@/types/icons'
```

### Token-Based Props

```typescript
// ✅ OK: tokens is exported, so keyof typeof works
import tokens from '@/styles/tokens.json'
gap?: keyof typeof tokens.semantic.spacing.layout

// ❌ WRONG: Don't use keyof typeof with non-exported JSON
import iconsData from '@/styles/icons.json'
iconName?: keyof typeof iconsData  // This breaks!
```

### Creating New Types

When adding new JSON-based types:

1. Create type file: `src/types/yourtype.ts`
2. Define as string literal union (not `keyof typeof`)
3. Export from `src/index.ts`
4. Import with relative paths in components

### Required Exports

All types used in exported components must be in `src/index.ts`:

```typescript
export { iconsData, type IconName } from './types/icons'
```

### Build Verification

After generating component code, suggest:

```bash
npm run build:package
cat dist/components/path/to/Component.d.ts
```

Check: No `@/` path aliases in generated `.d.ts` files.

## Component Patterns

### Atomic Design Structure

- `atoms/` - Basic building blocks
- `molecules/` - Simple component groups  
- `layout/` - Layout components
- `templates/` - Page templates

### Component File Structure

```
ComponentName/
  ComponentName.tsx       # Implementation
  ComponentName.test.tsx  # Tests
  ComponentName.docs.tsx  # Documentation
  index.ts                # Exports
```

### Export Pattern

```typescript
// index.ts
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName'
```

## Testing Requirements

- All components must have `.test.tsx`
- Use React Testing Library
- Test accessibility with aria-label checks
- Test variants and states

## Documentation

- All components should have `.docs.tsx` for Storybook
- Document all props with JSDoc comments
- Include usage examples

## Additional Context

- This is a published npm package
- Types must work in external consuming projects
- Path aliases (`@/`) only work internally, not in published `.d.ts` files
- Focus on developer experience: autocomplete, type safety, clear errors
