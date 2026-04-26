# Common Origin — Agent Constitution

> This document states the hard rules that every agent operating in this repository must obey without exception.
> These rules are non-negotiable. They exist to protect brand integrity, API stability, accessibility, and code quality.
> Read this file before taking any action.

---

## Mandatory Pre-Reading

Before taking any action in this repository, every agent must have read:

1. `BRAND_IDENTITY.md` — what Common Origin is and what it stands for
2. `VISUAL_DESIGN_LANGUAGE.md` — the precise visual rules governing every design decision
3. `PRODUCT_ECOSYSTEM.md` — the products this system serves and their contexts
4. `DESIGN_NORTH_STAR.md` — where the system is going and how to prioritise
5. `AGENT_WAYS_OF_WORKING.md` — the process principles that prevent common failure modes

If you have not read all five, stop and read them before proceeding.

---

## The Ten Nevers

These are absolute constraints. No exception. No "but in this case...".

### 1. Never introduce third-party component dependencies
The design system has zero runtime component dependencies beyond React and styled-components (both peer dependencies). Any PR that adds a new runtime dependency for component rendering is rejected. Build utilities (types, linting) are acceptable. UI component libraries are not.

### 2. Never use hardcoded values — tokens only
Every colour, spacing value, border-radius, shadow, font-size, font-weight, z-index, duration, and opacity must reference a design token from `src/styles/tokens.json`. If the right token does not exist, add it via the token-architect agent or raise it as an open question in the PR. Never hardcode a hex value, pixel value, or rem value in a component.

### 3. Never break the published API without a major semver bump
This system is published as an npm package. Other projects depend on it. Breaking changes require:
- A major version bump (e.g. 2.x.x → 3.0.0)
- Explicit documentation of what changed and why
- A migration path where possible

Breaking changes include: removing a prop, renaming a prop, changing a prop's type, removing a component, changing a component's import path, renaming a token.

### 4. Never ship a component without tests AND documentation
Every component change, no matter how small, must be accompanied by:
- Updated or new test coverage in `ComponentName.test.tsx`
- Updated or new documentation in `ComponentName.docs.tsx`
- Accessibility validation via `jest-axe`

Documentation drift is a form of technical debt. A component that works but is undocumented is incomplete.

### 5. Never use animations longer than 300ms or entrance animations
- Maximum transition duration: 300ms
- Typical duration: 150–200ms
- Entrance animations (elements animating in on mount/render): never
- Scroll-triggered animations: never
- Motion is purposeful and responsive — it is not entertainment

### 6. Never violate atomic design structure
The system uses atomic design:
- `atoms/` — single-responsibility building blocks (Typography, Button, Icon, etc.)
- `molecules/` — compositions of 2–5 atoms solving a specific UI problem
- `layout/` — structural and layout components

Do not put a molecule in atoms. Do not put an atom in molecules. Do not create components that do not belong to a clear category.

### 7. Never add colour for decoration
Colour communicates status and meaning. It is not used for visual interest or brand expression in UI components.
- Status colours (success, error, warning, info) are the only acceptable use of hue
- No coloured backgrounds on non-status elements
- No coloured borders on non-status elements
- No gradient fills
- No coloured text used for visual hierarchy (hierarchy comes from weight and scale)

### 8. Never use pure `#000000` in component styles
Pure black (`#000000`) is reserved exclusively for the Common Origin logo. All component text and fills use near-black (`#212529`). This is a deliberate decision that keeps the logo visually distinct from the UI system.

### 9. Never reduce border-radius below the system minimum
Rounded corners are part of the brand's human quality. Sharp corners signal hardness and coldness. The system minimum border-radius for interactive components is 6px. Image containers use 12–16px. Never introduce a flat/sharp-cornered variant of a component that currently uses rounded corners.

### 10. Never use medium-weight headings for display headings
The typographic signature of Common Origin is the dramatic contrast between heavy headings (700–900) and normal-weight body text (400). A display heading at 500 or 600 weight is a brand violation. If a specific use case needs a lighter heading, that is an open question for the reviewer — not a unilateral decision.

---

## When Uncertain

Uncertainty is expected and acceptable. Guessing is not.

When an agent cannot make a confident decision:

1. **Preserve the existing state** — do not change what you are uncertain about
2. **Document the uncertainty in the PR description** under "Open Questions" as a specific, answerable question
3. **Add a code comment** at the exact location: `// TODO: [specific question for reviewer]`
4. **Never make a confident visual decision you cannot trace** to an existing codebase pattern, a rule in a brand context file, or a clear parallel in the live Common Origin site

An uncertain decision documented is infinitely better than a confident wrong decision merged silently.

---

## PR Requirements

Every PR raised by an agent must include the following in its description:

### Required sections:
1. **Problem statement** — what specific problem was found, and where (file, line, component)
2. **Changes made** — what was changed and why
3. **Brand alignment** — which rule or principle from the context files justifies this change
4. **Validation** — confirmation that the pre-PR validation gate passed (see below)
5. **Open Questions** — any decisions that could not be made with confidence; specific questions for the reviewer

### Labels:
All agent PRs must be labelled with `copilot`.

---

## Required Validation Before Every PR

No PR may be raised until ALL of the following pass without errors:

```bash
npm run typecheck    # Zero TypeScript errors
npm test             # Zero test failures
npm run build:package  # Successful package build
```

Additionally, for any component that was modified, spot-check the generated type declaration:
```bash
cat dist/components/[ComponentName]/index.d.ts
```
Verify: no `@/` path aliases appear in the output. If they do, the build has a path resolution issue that must be fixed before raising the PR.

This validation is non-negotiable regardless of how confident the changes appear.

---

## Ground Truth for Visual Decisions

When a visual decision cannot be resolved by reading the brand context files, the resolution is:

**Look at the live Common Origin personal site.**

If the live site does it, the design system should do it. If the live site doesn't do it, the design system probably shouldn't either. If the live site is ambiguous, document an open question in the PR.

---

## Decision Hierarchy

When priorities conflict:

1. Brand alignment (BRAND_IDENTITY.md + VISUAL_DESIGN_LANGUAGE.md)
2. Accessibility (WCAG 2.2 AA — always beats brand preference)
3. API stability (existing consumers must not be broken)
4. Developer experience (clarity, types, documentation)
