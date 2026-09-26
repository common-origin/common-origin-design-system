# Principles

Cite these by ID (`P1`–`P9`) in pull requests and decision records.

## P1. Content first, quiet chrome
Colour and attention belong to content — photography, artwork, data. UI chrome is near-monochrome and steps back. Colour in the UI carries meaning: status, links, focus, and deliberate highlight ([0003](decisions/0003-use-of-blue.md)). It is never decoration.

## P2. Accessibility is the floor
WCAG 2.2 AA is the minimum for every component, in every product. Semantic HTML, correct ARIA, full keyboard support, visible focus, screen reader support, contrast of at least 4.5:1 for normal text and 3:1 for large text and UI elements, and a passing `jest-axe` test. When accessibility conflicts with anything else, accessibility wins.

## P3. Tokens, not values
Every colour, spacing, radius, shadow, font, z-index, and duration comes from a design token. Components use semantic tokens, or component tokens in three cases: a component departs from the semantic tier, a family of components shares a decision, or a variant or state matrix (such as Button's) needs its own values ([0014](decisions/0014-token-tiers.md)). Base tokens exist only to build semantic tokens. If the right token doesn't exist, add one — don't hard-code.

## P4. Earn its place
Every component, prop, and variant solves a real need in a real product. No speculative variants, no prop bloat, no two components solving the same problem.

## P5. Consistent and precise
The same decision is made the same way everywhere. Interaction states — hover, focus, active, selected, disabled — are designed, consistent across components, and polished to the Stripe benchmark.

## P6. Motion responds, it doesn't perform
Motion is part of the system. It explains change: elements that appear (modals, sheets, action sheets, dialogs) move into place, and interactive elements respond to input. It is quick (token durations, 300ms maximum), eased, and never decorative. See [0005](decisions/0005-motion.md).

## P7. Stable contracts
The package is published and other products depend on it. Component props, exports, and token names follow semantic versioning: removing or renaming anything is a major version. Published types must work in consuming projects.

## P8. Framework-agnostic and lean
Components work in any React app (Next.js, Vite, React Router, and so on) with no framework imports ([0008](decisions/0008-framework-agnostic-components.md)). Runtime dependencies are avoided unless there is no reasonable alternative; UI component libraries are never added. Keep bundles small, avoid unnecessary re-renders and heavy client-side work in display components, and never block rendering (images support lazy loading).

## P9. Serve the full range
Decisions must work in both editorial, spacious products (the personal site) and dense, data-heavy ones (A2UI). Density is handled per component; there is no global density mode.

---

## Decision hierarchy

When principles pull in different directions, resolve in this order:

1. **Accessibility** (P2) — always wins.
2. **Brand and principle alignment** (P1, P3–P6, P9) — the foundation, decisions, and visual language.
3. **API stability** (P7) — a brand change that breaks an API needs a major version and a migration path.
4. **Developer experience** — clear, well-typed, easy to use correctly.

## When no principle or decision applies

Don't guess. Preserve the current behaviour, and raise a specific open question for the owner: the options considered and a recommendation, if you have one. An open question is better than a confident wrong decision.
