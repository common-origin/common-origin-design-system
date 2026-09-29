---
name: component-docs
description: 'Write or update a component''s docs-site page (its .docs.tsx documentation object and registration). Use when docs are missing, drift from the code, or a component''s API or tokens change.'
---

# Component docs page

Each component's docs page is its `Name.docs.tsx` object, rendered by `pages/components.tsx` through `src/lib/componentsData.ts`. Standards are in `.github/DOCUMENTATION_STANDARDS.md`; good examples are `Button`, `Chip` and `ProgressBar`. For a larger docs pass, use the `documentation-specialist` subagent.

## Rules

- **Read the component source first.** Document what the code does, not what the docs used to say. Every prop in the props interface appears, with an accurate type, `required` and `default`.
- **Required fields:** `id`, `name`, `description`, `category`, `props`, `tokens`, `examples` (at least 3, each with `code` and `renderComponent`, real use cases), `accessibility`, `anatomy` (ASCII diagram plus parts, each with its tokens).
- **Tokens are exact paths** from `src/styles/tokens.json`, one per styled reference the component uses. Put explanations in comments or anatomy parts, not in the path string.
- **Examples** import only from the package's components, never from `src/page-components/` or `src/patterns/`.
- **Registration:** import the docs object in `src/lib/componentsData.ts` and add it to `staticComponentsData` through `convertDocumentationToLegacyFormat`. Deprecated components aren't registered.

## Validate

`npm run typecheck` (`.docs.tsx` type errors are common), `npm run verify:docs`, and open the page on the docs site (`.claude/launch.json` → `docs`, then pick the component on `/components`) to check the examples render.
