# Common Origin — Agent Constitution

> This document states the hard rules that every agent operating in this repository must obey without exception.
> These rules are non-negotiable. They exist to protect brand integrity, API stability, accessibility, and code quality.
> Read this file before taking any action.

---

## Mandatory Pre-Reading

Before taking any action in this repository, every agent must have read:

1. `docs/foundation/principles.md` — principles P1–P9 and the decision hierarchy
2. `docs/foundation/visual-language.md` — the visual rules, each with its status
3. `.github/AGENT_WAYS_OF_WORKING.md` — the process principles that prevent common failure modes

Read as the task requires: `docs/foundation/decisions/` (why things are the way they are), `purpose.md`, `users.md`, `brand.md`, `usage.md`.

`docs/foundation/` is the source of truth. If this document conflicts with it, the foundation wins.

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

### 5. Never use motion that is slow, decorative, or hard-coded
Motion is part of the system (decision 0005). Elements that appear — modals, sheets, action sheets, dialogs — animate into place, and interactive elements respond to input. But:
- Maximum duration: 300ms; durations come from `semantic.motion` tokens
- Never linear easing, never decorative, never scroll-triggered
- New or reworked motion must respect `prefers-reduced-motion`
- Motion is purposeful and responsive — it is not entertainment

### 6. Never violate atomic design structure
The system uses atomic design:
- `atoms/` — single-responsibility building blocks (Typography, Button, Icon, etc.)
- `molecules/` — compositions of 2–5 atoms solving a specific UI problem
- `layout/` — structural and layout components

Do not put a molecule in atoms. Do not put an atom in molecules. Do not create components that do not belong to a clear category.

### 7. Never add colour for decoration
Colour communicates meaning. It is not used for visual interest in UI chrome (P1).
- Hue is for status (success, error, warning, info), links, focus, and deliberate highlight such as the `emphasis` button (decision 0003)
- No decorative coloured backgrounds or borders
- No decorative gradients (AgentInput's working ring is a recorded exception)
- No coloured text used for visual hierarchy (hierarchy comes from weight and scale)

### 8. Never use pure `#000000` in component styles
Pure black (`#000000`) is reserved exclusively for the Common Origin logo. All component text and fills use near-black (`#212529`). This is a deliberate decision that keeps the logo visually distinct from the UI system.

### 9. Never remove rounded corners
Rounded corners are part of the brand's human quality. Border-radius comes from the radius tokens; never introduce a flat/sharp-cornered variant of a component that currently uses rounded corners. Whether controls should share a radius (Button 4px vs Chip 12px) is an open question (#21) — don't change either without a decision.

### 10. Never lighten headings below the heading tokens
The typographic signature is the contrast between heavy headings and regular body text (400). Headings use the heading tokens (weight 700, decision 0004). Products may go heavier as a site-specific choice; the system does not go lighter. If a use case needs a lighter heading, raise it as an open question.

---

## When Uncertain

Uncertainty is expected and acceptable. Guessing is not.

When an agent cannot make a confident decision:

1. **Preserve the existing state** — do not change what you are uncertain about
2. **Document the uncertainty in the PR description** under "Open Questions" as a specific, answerable question
3. **Add a code comment** at the exact location: `// TODO: [specific question for reviewer]`
4. **Never make a confident visual decision you cannot trace** to an existing codebase pattern, a principle or decision in `docs/foundation/`, or the docs site

An uncertain decision documented is infinitely better than a confident wrong decision merged silently.

---

## PR Requirements

Every PR raised by an agent must include the following in its description:

### Required sections:
1. **Problem statement** — what specific problem was found, and where (file, line, component)
2. **Changes made** — what was changed and why
3. **Brand alignment** — which principle (P1–P9) or decision in `docs/foundation/` justifies this change
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
cat dist/components/[atoms|molecules|layout]/[ComponentName]/[ComponentName].d.ts
```
Verify: no `@/` path aliases appear in the output. If they do, the build has a path resolution issue that must be fixed before raising the PR.

This validation is non-negotiable regardless of how confident the changes appear.

---

## Ground Truth for Visual Decisions

Different questions have different authorities (decision 0007):

- **Why** — `docs/foundation/` principles and decisions
- **Exact values** — design tokens (`src/tokens/`)
- **Behaviour and API** — component source (`src/components/`)
- **Look and feel** — the docs site, https://common-origin-design-system.vercel.app/

Products built on the system (such as the personal site) may make site-specific choices; they are not the authority for system values. If the sources disagree and the foundation doesn't say which is intended, document an open question in the PR.

---

## Decision Hierarchy

See `docs/foundation/principles.md`. In short, when priorities conflict:

1. Accessibility (WCAG 2.2 AA) — always wins
2. Brand and principle alignment (`docs/foundation/`)
3. API stability (existing consumers must not be broken)
4. Developer experience (clarity, types, documentation)
