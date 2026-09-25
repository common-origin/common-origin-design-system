# GitHub Copilot Instructions for Common Origin Design System

## Foundation: Purpose, Users, Brand & Principles

**The source of truth is [`docs/foundation/`](../docs/foundation/README.md).** If anything in `.github/` conflicts with it, the foundation wins.

Before making any visual, token, or component decision, read:

1. [`docs/foundation/principles.md`](../docs/foundation/principles.md) — principles P1–P9 and the decision hierarchy
2. [`docs/foundation/visual-language.md`](../docs/foundation/visual-language.md) — visual rules, each marked Enforced, Target, Exception, or Open question
3. [`docs/foundation/decisions/`](../docs/foundation/decisions/README.md) — why things are the way they are
4. [`.github/AGENT_CONSTITUTION.md`](AGENT_CONSTITUTION.md) — hard rules, validation requirements, PR protocol
5. [`.github/AGENT_WAYS_OF_WORKING.md`](AGENT_WAYS_OF_WORKING.md) — read before write, one PR one problem, evidence-based decisions

Also available: [purpose](../docs/foundation/purpose.md), [users](../docs/foundation/users.md), [brand](../docs/foundation/brand.md), [usage](../docs/foundation/usage.md).

**Key visual rules:**
- Colour belongs to content; UI chrome is near-monochrome. Colour carries meaning (status, links, focus, deliberate highlight) — never decoration.
- Button has five variants: `emphasis` (blue, a CTA above primary), `primary`, `secondary`, `naked`, `danger` (decision 0002).
- Headings use the typography tokens (`display`–`h4` at 700, `h5`–`h6` at 500); body is 400 (decision 0011).
- Motion is part of the system: appearing elements (modals, sheets, dialogs) animate in, using motion tokens, 300ms max (decision 0005).
- Use tokens for every value. Text is `#212529`; pure `#000000` is for the logo only.
- Selected/active states are an open question ([#21](https://github.com/common-origin/common-origin-design-system/issues/21)) — don't change them without a decision.

---

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

## Documentation Requirements

**IMPORTANT:** Refer to [DOCUMENTATION_STANDARDS.md](./DOCUMENTATION_STANDARDS.md) for complete documentation guidelines.

### Quick Reference for `.docs.tsx` Files

**This project uses a CUSTOM documentation system, NOT Storybook.**

Key requirements for component documentation:
- Export a `ComponentDocumentation` object from `lib/docgen/types`
- Include all required fields: `id`, `name`, `description`, `category`, `props`, `tokens`, `examples`, `accessibility`, `anatomy`
- Each example needs both `code` (string) and `renderComponent` (function)
- Stack and Typography components do NOT support `style` prop - use plain HTML elements when inline styles are needed
- Check existing `.docs.tsx` files (Chip, Button, ProgressBar) for reference patterns
- **CRITICAL:** Add new component docs to `src/lib/componentsData.ts` (see DOCUMENTATION_STANDARDS.md for steps)

For complete standards including:
- Anatomy diagrams (required for all components)
- Accessibility documentation requirements
- Token documentation standards
- Example quality guidelines
- README creation guidelines
- **How to add documentation to the docs site**

**See [DOCUMENTATION_STANDARDS.md](./DOCUMENTATION_STANDARDS.md)**
- Include usage examples

## Additional Context

- This is a published npm package
- Types must work in external consuming projects
- Path aliases (`@/`) only work internally, not in published `.d.ts` files
- Focus on developer experience: autocomplete, type safety, clear errors

## Agentic Enhancements (Explore)

We are actively exploring ways to make this design system easier for AI agents to use correctly. The icon metadata enrichment (v2.8.0) was the first step. Areas to investigate next:

### Completed
- **Icon metadata** (v2.8.0): Every icon in `src/styles/icons.json` has `description`, `category`, `aliases`, `intent`, `decorativeDefault`, and `ariaLabelDefault` fields. Types: `IconCategory`, `IconMetadata`, `IconRegistry`.

### To Explore
- **Component intent metadata**: Add `intent`, `whenToUse`, `whenNotToUse` fields to component documentation so agents can choose the right component for a task
- **Token selection hints**: Annotate design tokens with usage context (e.g. "use for card padding, not inline spacing") so agents pick semantically correct tokens
- **Prop constraint descriptions**: Add human-readable descriptions to complex prop combinations and validation rules so agents avoid invalid prop states
- **Pattern recipes**: Machine-readable composition patterns (e.g. "confirmation dialog = Modal + Typography + Stack + Button[variant=primary] + Button[variant=secondary]") that agents can follow
- **Accessibility decision trees**: Structured rules for when to use `aria-label`, `aria-hidden`, roles, etc., keyed to component + context, replacing guesswork
- **Relationship metadata**: Icon `statePair` (star/starFilled), `variants` (caret/caretDown/caretUp), component `relatedComponents` fields to help agents understand the full design vocabulary
