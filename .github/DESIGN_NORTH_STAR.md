# Common Origin — Design North Star

> This document defines where the design system is going, what "done" looks like, and how to make decisions when priorities conflict.
> Every agent should read this to understand not just the current state, but the direction of travel.

---

## Vision Statement

> **"A fully documented, thoroughly tested, premium, minimal, monochrome design system — a creative studio's engineering foundation. No Figma required."**

This system exists so that Common Origin products can be built quickly, consistently, and beautifully without needing a visual design file for every decision. The system IS the design language.

---

## What "Premium" Means

Premium is not about complexity, richness, or decoration. In this system, premium means:

- **Consistent:** Every spacing value, weight decision, and border-radius is the same decision made everywhere. No component looks like it came from a different system.
- **Intentional:** Nothing is accidental. If a value exists, it exists for a reason. If a variant exists, it solves a distinct problem.
- **Nothing accidental:** No component has a default that was never thought through. No prop exists because it was easy to add.
- **Precise:** Interactions feel exact. Hover states respond immediately. Transitions complete cleanly.

Reference: Stripe's component library achieves premium through relentless attention to the small things — focus rings, hover timing, disabled states, placeholder text. That is the benchmark for interaction quality.

---

## What "Minimal" Means

Minimal is not about having few things. It means:

- **Every component earns its place** — if a component doesn't solve a real problem in a real Common Origin product, it shouldn't exist
- **No prop bloat** — every prop must be necessary; variants are added because the product demands them, not because they are theoretically useful
- **No redundancy** — if two components solve the same problem, one of them is wrong
- **Composable over comprehensive** — it is better to have a small set of excellent composable primitives than a large set of mediocre specialised components

Reference: Shopify's Polaris system achieves minimal through strict component governance. That is the benchmark for system discipline.

---

## Quality Ceiling

The system's quality target is defined by two reference systems:

| Reference | What it benchmarks |
|---|---|
| **Stripe** | Interaction polish, component micro-detail, modern feel, focus management, transition precision |
| **Shopify** | Monochrome simplicity, restraint, product-first clarity, semantic token discipline |

**Important:** These systems inform the quality ceiling — they do not define the identity. Common Origin has its own visual identity. When a reference system does something differently, the question is: "Is their approach better, or just different?" Only adopt it if it's genuinely better.

---

## Current State vs North Star

### What Exists (Strengths)
- 44 components across atoms, molecules, and layout
- Comprehensive test coverage with `jest-axe` accessibility testing
- Well-structured documentation system with live examples
- Hierarchical token system (base → semantic → component)
- Clean published npm package with TypeScript types
- Good CI/CD pipeline (build, types, tests, publish)

### The Gap
- **Quality ceiling:** Some components are functional but not yet at the Stripe/Shopify benchmark for polish and precision
- **Brand alignment:** Some component variants or visual treatments may not precisely reflect the visual patterns of the live Common Origin site
- **Interaction detail:** Hover states, focus management, and transition timing may be inconsistent across components
- **Token completeness:** Some component-level visual decisions may be hardcoded or using tokens at the wrong semantic level

### Priority Alignment Targets
When an agent audits the system, these are the highest-value improvement areas:

1. **Interactive states** — are hover, focus, active, and disabled states consistent and precise across all interactive components?
2. **Active/selected state pattern** — is the solid black + white text inverse pattern applied universally and correctly?
3. **Typography weights** — are heading weights at 700+ throughout? Are any medium-weight headings present where heavy weight should be used?
4. **Button system** — are there any button variants that violate the binary system (solid black OR outlined)?
5. **Colour discipline** — are there any decorative colour uses that should be removed?
6. **Token usage** — are there hardcoded values that should reference tokens?

---

## Phase Roadmap

### Phase 1 — Brand Alignment (Current Priority)
Raise the quality of existing 44 components to precisely match the live Common Origin site and the Stripe/Shopify benchmark. No new components until existing components are at north star quality.

### Phase 2 — Component Gaps
Identify and build components that Common Origin products need but the system does not yet provide. Each new component must meet north star quality from day one.

### Phase 3 — Pattern Library Expansion
Expand the patterns layer with more composition examples — page layouts, data display patterns, navigation patterns — that show how components combine into real product surfaces.

### Phase 4 — Future: Figma / MCP Connection
At some point it may be desirable to connect this system to a Figma design system via MCP, enabling design-from-code or code-from-design workflows. This is **not a current priority** and should not influence decisions in Phases 1–3.

---

## Dark Mode

Dark mode is a future requirement but is **not in scope** for current work.

The semantic token layer already supports dark mode structurally — when dark mode work begins, it will be a token-level change, not a component-level rewrite. Agents should not add dark mode support proactively, but should also not make decisions that would make dark mode harder to add later.

**Acceptable:** Using semantic colour tokens (`color.background.default`, `color.text.default`) rather than raw hex values — these are the foundation for future dark mode.

**Not acceptable:** Hardcoding `#F8F8F8` in a component when `color.background.default` is the correct token — this would break dark mode.

---

## Decision Hierarchy

When priorities conflict, apply this hierarchy in order:

1. **Brand alignment** — does this decision align with Common Origin's visual identity, BRAND_IDENTITY.md, and VISUAL_DESIGN_LANGUAGE.md?
2. **Accessibility** — does this decision meet WCAG 2.2 AA? Does it pass `jest-axe`?
3. **API stability** — does this decision break any existing published API? If yes, it requires a major semver bump.
4. **Developer experience** — is this decision clear, well-typed, and easy to use correctly?

When two things at the same level conflict (e.g. brand alignment vs accessibility), accessibility wins — always.

---

## What Success Looks Like

The design system has achieved its north star when:

- Any Common Origin product can be built to production quality using only system components, without any one-off visual decisions
- A developer new to Common Origin products can build a UI that looks and feels native to the brand, using only the components and tokens provided
- The components are indistinguishable in quality from the Stripe or Shopify component libraries when placed side-by-side
- The system documents itself well enough that no human handoff is required for a new project to begin
