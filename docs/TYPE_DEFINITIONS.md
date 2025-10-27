# Type Definition Best Practices

Quick reference for creating TypeScript types in this design system.

## Golden Rule

**NEVER use path aliases (`@/...`) in component files that export types.**

TypeScript preserves path aliases in generated `.d.ts` files, which breaks type resolution in consuming projects.

## Quick Checklist

- [ ] Use relative imports for type dependencies: `../../../types/...`
- [ ] Create self-contained union types for JSON-based values (like icons)
- [ ] Export types from `src/index.ts`
- [ ] Verify no `@/` in generated `.d.ts` files after build

## Examples

### ✅ CORRECT

```typescript
// src/types/icons.ts
export type IconName = 'add' | 'close' | 'menu'

// src/components/atoms/Icon/Icon.tsx
import { type IconName } from '../../../types/icons'  // ✅ Relative path

export interface IconProps {
  name: IconName  // ✅ Self-contained type
}
```

### ❌ INCORRECT

```typescript
// src/components/atoms/Icon/Icon.tsx
import iconsData from '@/styles/icons.json'  // ❌ Path alias

export interface IconProps {
  name: keyof typeof iconsData  // ❌ Breaks in consuming projects
}
```

## Verification

```bash
npm run build:package
grep -r "@/" dist/**/*.d.ts  # Should return NO results
```

See `.github/CONTRIBUTING.md` for full guidelines.
