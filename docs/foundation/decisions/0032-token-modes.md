# 0032. Density and motion are token modes, scoped to an element

- **Status:** Accepted
- **Date:** 2026-10-11
- **Decided by:** Ollie (owner)
- **Principles:** P2, P6, P8, P9
- **Amends:** [P9](../principles.md#p9-serve-the-full-range) ("density is handled per component; there is no global density mode") and the matching row in [visual-language.md](../visual-language.md#layout-and-spacing). Changes how [0015](0015-reduced-motion.md)'s reduced motion is delivered, not what it does
- **Issue:** [#193](https://github.com/common-origin/common-origin-design-system/issues/193), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

P9 asks the system to serve both spacious, editorial products (the personal site) and dense, data-heavy ones (A2UI). Today it does that per component, with no density mode, and nothing in the tokens describes density: control heights fall out of padding ([#129](https://github.com/common-origin/common-origin-design-system/issues/129)) and a dense product has no way to ask for tighter controls.

Every system in the #187 review handles density, or platform scale, as **one set of token names with several sets of values**:

- Spectrum: each layout token has a `desktop` and a `mobile` value (`component-height-100` is 32px or 40px).
- Primer: `condensed`, `normal` and `spacious` variants of control padding and stack gaps.
- Material: a density scale (0, −1, −2, −3), each step 4px shorter.
- Radix: every space token is multiplied by `--scaling` (90–110%).

The DTCG 2025.10 Resolver module standardises this as *modifiers* with *contexts* (for example `theme: light | dark`).

Motion has the same shape. [0015](0015-reduced-motion.md) requires a reduced-motion fallback in every component that moves, and today each component branches on it (`reducedMotion` in `src/lib/styleUtils.ts`).

Components can't switch token values at run time yet: they bake resolved values in at build time ([0009](0009-styling-architecture.md)). Reading CSS variables is the subject of [#41](https://github.com/common-origin/common-origin-design-system/issues/41).

## Decision

1. **Modes are token modifiers.** A mode changes token *values* under the same *names*; components never branch on a mode and take no `density` prop. Modes are described as DTCG Resolver modifiers and published as CSS variable overrides.
2. **Density** has three contexts: `compact`, `default` and `comfortable`. A product sets it on any element with `data-co-density`, and it applies to everything inside: a whole app shell, a table, a sidebar. There is still no single global switch that forces one density on every product.
3. **Motion** has two contexts: `standard` and `reduced`. `reduced` applies automatically under `prefers-reduced-motion`, and a product can force it with `data-co-motion="reduced"`. An `expressive` context (Carbon's productive and expressive motion) fits the same modifier later, but nothing needs it yet (P4).
4. **What each mode may change:**

   | Mode | Changes | Never changes |
   |---|---|---|
   | Density | `size.control.*`, `size.row`, `space.inset.*`, `space.stack.*`, `space.inline.*`, `typography.body` size | Colour, radius, border, elevation, motion, `size.touchTarget` |
   | Motion | `motion.distance.*` (0 under `reduced`), movement durations | Colour and opacity transitions, which are already the reduced form (0015) |

5. **`default` renders exactly as the product does today.** Turning a mode on is opt-in.
6. **Accessibility limits (P2):** `compact` never takes a pointer target below 24 × 24px (WCAG 2.2, 2.5.8), and `size.touchTarget` (44px) is the same in every context. `reduced` keeps every rule of 0015.
7. **No interim delivery.** Modes wait for components to read CSS variables (#41). We won't build a React provider that swaps resolved values, which would add a context read to every component only to be removed.
8. **Theme** (light, dark) is the same mechanism and the names from [0031](0031-semantic-token-grammar.md) are compatible with it, but dark mode stays out of scope ([purpose](../purpose.md)).

## Consequences

- P9 and the visual-language density rule are updated: density is a mode a product applies to a region, not a per-component setting.
- Values are proposed with their tokens and signed off then ([0022](0022-no-component-spacing-tokens.md)). The starting proposal for density, on the 4px grid, is control heights of 32 / 40 / 48px for `compact` / `default` / `comfortable`, after #129 settles today's `default` scale (Input is 48px and a medium Button about 40px, so they disagree now).
- `tokens.css` gains `[data-co-density="…"]` and `[data-co-motion="reduced"]` blocks (and an `@media (prefers-reduced-motion: reduce)` block), with tests that each block only overrides the groups in the table above.
- When motion is a mode, the per-component `reducedMotion` branches are removed and `motion.test.ts` checks the token overrides instead.
- Build work: density in [#191](https://github.com/common-origin/common-origin-design-system/issues/191), motion in [#195](https://github.com/common-origin/common-origin-design-system/issues/195), both after #41.
