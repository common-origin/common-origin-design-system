# Contributing to Common Origin Design System

Thank you for contributing! This guide will help you follow our standards for commits, releases, and documentation.

## Quick Start

1. **Clone and install:**
   ```bash
   git clone <repo-url>
   cd common-origin-design-system
   npm install
   ```

2. **Development:**
   ```bash
   npm run docs:dev  # Start documentation site
   npm test          # Run tests
   npm run typecheck # Type checking
   ```

3. **Before committing:**
   - Ensure all tests pass
   - Follow conventional commit format (see below)
   - Update component documentation if needed

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for automatic changelog generation.

### Format
```
<type>(<scope>): <subject>
```

### Types

| Type | Description | Changelog Section |
|------|-------------|-------------------|
| `feat` | New feature | ✨ Features |
| `fix` | Bug fix | 🐛 Bug Fixes |
| `perf` | Performance improvement | ⚡ Performance |
| `refactor` | Code refactoring | ♻️ Refactoring |
| `docs` | Documentation only | 📚 Documentation |
| `style` | Code style (formatting) | 💎 Styles |
| `test` | Test changes | ✅ Tests |
| `build` | Build system changes | 📦 Build |
| `ci` | CI/CD changes | 👷 CI/CD |
| `chore` | Maintenance tasks | 🔧 Chores |

### Examples

```bash
# Feature
git commit -m "feat(Button): add new variant for destructive actions"

# Bug fix
git commit -m "fix(Typography): correct line-height calculation for headings"

# Documentation
git commit -m "docs(Chip): add FilterChip usage examples"

# Refactoring
git commit -m "refactor(Chip): split into specialized components"

# Chore (version bump, dependencies, etc.)
git commit -m "chore: bump version to 1.7.0"
git commit -m "chore(deps): update styled-components to 6.1.0"
```

### Scope

The scope is usually the component name (e.g., `Button`, `Chip`, `Typography`).

### Multi-line Commits

For complex changes:
```bash
git commit -m "feat(Modal): add dismissible modal variant

- Added onDismiss callback prop
- Implemented close button with accessibility
- Updated tests and documentation
- Added keyboard escape handler"
```

## Creating a Release

`main` is protected, so a release is a version-bump PR followed by a tag:

```bash
git switch main && git pull
npm run release:create patch   # or minor / major / X.Y.Z
```

This checks you're on a clean, up-to-date `main`, previews the version, then creates `chore/release-X.Y.Z`, bumps `package.json`, adds the `CHANGELOG.md` entry, commits, pushes and opens the PR.

Once the PR is merged (CI green, Copilot review comments addressed):

```bash
git switch main && git pull
npm run release:tag
```

This tags `main` as `vX.Y.Z` and pushes the tag, which triggers the publish workflow (npm Trusted Publishing).

See [RELEASE.md](./RELEASE.md) and [RELEASE_PROCESS.md](./.github/RELEASE_PROCESS.md) for details.

## Component Development

### File Structure

Every component should have:
```
ComponentName/
├── ComponentName.tsx       # Implementation
├── ComponentName.test.tsx  # Tests (required)
├── ComponentName.docs.tsx  # Documentation (required)
└── index.ts                # Exports
```

### Documentation Requirements

All components MUST have a `.docs.tsx` file. See [DOCUMENTATION_STANDARDS.md](./.github/DOCUMENTATION_STANDARDS.md) for complete requirements.

Key sections:
- **Props**: All props with types and descriptions
- **Examples**: Minimum 3 real-world examples
- **Tokens**: All design tokens used
- **Accessibility**: Specific WCAG 2.2 AA claims
- **Anatomy**: Component structure diagram

After creating `.docs.tsx`, add to `src/lib/componentsData.ts`:
```typescript
import { yourComponentDocs } from '@/components/path/to/YourComponent/YourComponent.docs'

export const staticComponentsData: ComponentData[] = [
  // ... existing
  convertDocumentationToLegacyFormat(yourComponentDocs),
]
```

### Testing Requirements

All components require:
- ✅ Unit tests for all props and variants
- ♿ Accessibility tests with `jest-axe`
- ⌨️ Keyboard navigation tests
- 🎨 Visual regression tests for interactive states

Example:
```typescript
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from './Button'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Type Safety

### TypeScript Type Definitions for Exported Components

**CRITICAL**: When creating component props that reference JSON files or token data, follow these rules to ensure proper TypeScript support in consuming projects.

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

- [ ] Token-based props use the `Tokens` type from `src/types/tokens.ts` (Pattern 2), never `keyof typeof` an imported JSON file
- [ ] If component uses JSON data for types (like icons), create a type file in `src/types/`
- [ ] Use **relative imports** for type dependencies, not path aliases
- [ ] Export the type from `src/index.ts` for external use
- [ ] `npm run build:package && npm run verify:package` passes

### Testing Type Definitions

```bash
npm run build:package
npm run verify:package
```

`verify:package` runs:
- `verify:types` — every import in every `dist/**/*.d.ts` must resolve for consumers: no `@/` aliases, no JSON imports, no relative imports to unshipped files, no undeclared packages
- `verify:no-nextjs` — no Next.js imports, no docs-site code (`page-components`, `patterns`) in `dist/`, and every package the bundle imports is a declared dependency
- `verify:consumer` — type-checks a throwaway consumer project under `node10`, `node16` (CJS and ESM) and `bundler` resolution with `skipLibCheck` and `resolveJsonModule` off; `@ts-expect-error` lines catch types that have silently become `any`
- `publint` and `attw` — package.json and exports correctness

CI runs it on every PR, and `prepublishOnly` runs it before every publish.

### Common Type Patterns

**Pattern 1: String Literal Unions from JSON**

When you have a JSON file with fixed values (like icons):
1. Create a type file: `src/types/yourtype.ts`
2. Define explicit string literal union
3. Export from main package
4. Import with relative paths in components

**Pattern 2: Token-Based Props**

Import token **values** from the JSON for styling, but take prop **types** from `Tokens`:
```typescript
import tokens from '../../../styles/tokens.json'          // runtime values (bundled)
import type { Tokens } from '../../../types/tokens'        // types

export interface BoxProps {
  gap?: keyof Tokens['semantic']['spacing']['layout']     // ✅ OK
}
```

**Why:** `keyof typeof tokens…` on an imported JSON file makes the generated `.d.ts` import that JSON, which consumers can only resolve with `resolveJsonModule` (and not at all through an `@/` alias). `Tokens` is declared as a const type in `src/types/tokens.ts`, so it's inlined into the published declarations.

## Pull Request Process

1. **Create a feature branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make changes with conventional commits:**
   ```bash
   git commit -m "feat(Component): add new feature"
   ```

3. **Ensure quality:**
   ```bash
   npm test           # All tests pass
   npm run typecheck  # No type errors
   npm run build:package  # Package builds
   ```

4. **Push and create PR:**
   ```bash
   git push origin feat/your-feature-name
   ```

5. **PR requirements:**
   - Descriptive title following conventional commit format
   - Summary of changes
   - Test coverage for new code
   - Documentation updated
   - No breaking changes (or clearly documented)

## Project Structure

```
common-origin-design-system/
├── .github/                    # GitHub configs and docs
│   ├── DOCUMENTATION_STANDARDS.md
│   ├── RELEASE_PROCESS.md
│   └── workflows/              # GitHub Actions
├── src/
│   ├── components/             # Component library
│   │   ├── atoms/              # Basic components
│   │   ├── molecules/          # Composed components
│   │   ├── layout/             # Layout components
│   │   └── index.ts
│   ├── types/                  # Shared TypeScript types
│   └── styles/                 # Design tokens and global styles
├── pages/                      # Documentation site (Next.js)
├── lib/                        # Build and documentation utilities
│   ├── docgen/                 # Documentation generation
│   └── releases/               # Changelog generation
├── scripts/                    # Build and release scripts
└── tests/                      # Test utilities
```

## Resources

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [React Testing Library](https://testing-library.com/react)

## Getting Help

- Check existing component `.docs.tsx` files for examples
- Review [DOCUMENTATION_STANDARDS.md](./.github/DOCUMENTATION_STANDARDS.md)
- Ask questions in pull requests
- Check the documentation site for component examples

## License

By contributing, you agree that your contributions will be licensed under the project's license.
