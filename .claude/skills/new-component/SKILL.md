---
name: new-component
description: 'Add a new component to the published package — files, exports, tests, docs and docs-site registration. Use when asked to create or scaffold a component.'
---

# New component

**Earn its place first (P4).** A new component needs a real use in a real product and must not overlap an existing one. If the issue doesn't settle that, raise it with Ollie before building.

Patterns: `.github/COMPONENT_PATTERNS.md`, `.github/TESTING_STANDARDS.md`, `.github/DOCUMENTATION_STANDARDS.md`. Where they conflict with `docs/foundation/`, the foundation wins. Model new code on `Button`, `Chip` and `ProgressBar`.

## Checklist

1. **Place it:** `src/components/{atoms,molecules,layout}/Name/`. There is no organism level; larger components are molecules.
2. **Files:** `Name.tsx`, `Name.test.tsx`, `Name.docs.tsx`, `index.ts` (`export * from './Name'`).
3. **Implementation:**
   - Props interface with JSDoc on every prop, exported alongside the component.
   - `data-testid` support.
   - Transient `$props` with `shouldForwardProp`.
   - Styles from semantic or component tokens only. ESLint fails on base tokens and on colour or z-index literals.
   - Motion from `semantic.motion`, with reduced-motion handling (decision 0015).
   - No framework imports (P8).
   - Token-typed props use `import type { Tokens } from '../../../types/tokens'`, never `keyof typeof` a JSON import. Published `.d.ts` files must not contain `@/` aliases.
4. **Exports:** add `export * from './Name'` to the category's `index.ts`. The package entry re-exports categories, and the rollup build adds `'use client'`, so don't add it by hand.
5. **Tests:** role-based queries, every variant and state, keyboard interaction, and a `jest-axe` check with no violations (P2).
6. **Docs:** a full `ComponentDocumentation` object (see the `component-docs` skill), registered in `src/lib/componentsData.ts`.
7. **New tokens:** use the `token-change` skill.
8. **Validate:** typecheck, lint, test, `build:package`, `verify:package`, `verify:docs`. Check `dist/components/**/Name.d.ts` has no `@/` imports, and look at the component on the docs site (`.claude/launch.json` → `docs`).

A new component is a **minor** release.
