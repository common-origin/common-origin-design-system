# Purpose

## Why this system exists

Common Origin is a one-person creative studio (see [Brand](brand.md)). The design system lets that studio build products quickly, consistently, and beautifully **without a design file for every decision**. The system is the design language: components and tokens encode the decisions so they don't have to be made again.

> "A fully documented, thoroughly tested, premium, minimal design system — a creative studio's engineering foundation. No Figma required."

It is built for two primary users — **humans and agents** ([Users](users.md)). A design system that an agent can't use correctly is incomplete.

## What it provides

- **React components** (`@common-origin/design-system`) — atoms, molecules, and a layout grid, styled with styled-components and driven by design tokens.
- **Design tokens** (`@common-origin/design-system/tokens`) — base, semantic, and component tokens usable without the components.
- **A documentation site** — live examples, token reference, patterns, and release history: https://common-origin-design-system.vercel.app/

## What "premium" means here

Premium is about precision, not decoration:

- **Consistent** — the same decision made everywhere. No component looks like it came from another system.
- **Intentional** — every value, variant, and default exists for a reason.
- **Precise** — interactions feel exact; hover, focus, disabled, and transitions are all considered.

Quality benchmarks set the ceiling, not the identity:

| Reference | What to take from it |
|---|---|
| Stripe | Interaction polish, micro-detail, focus management, transition precision |
| Shopify Polaris | Restraint, monochrome simplicity, component governance, semantic token discipline |
| Vercel | Technical monochrome confidence, minimal chrome |
| GitHub | Utility-first clarity, accessible patterns, practical component hierarchy |

Existing codebase patterns take precedence. Adopt a reference system's approach only if it is genuinely better and consistent with the brand, not merely different.

## What "minimal" means here

- Every component solves a real problem in a real Common Origin product.
- Every prop and variant is needed by a product, not added because it might be useful.
- Two components that solve the same problem means one of them is wrong.
- Composable primitives over specialised one-offs.

## What success looks like

- Any Common Origin product can be built to production quality using only system components, with no one-off visual decisions.
- A developer new to Common Origin can build UI that feels native to the brand using only the components and tokens.
- Components hold up side by side with Stripe or Shopify for quality.
- The system documents itself well enough that a new project needs no human handoff.

## Current focus

Quality and alignment of the existing components comes before breadth:

1. **Accuracy** — published types, docs, and foundation match the code.
2. **Quality** — bring existing components to the benchmark: interaction states, motion, token usage, accessibility.
3. **Gaps** — add components that products need, built to the benchmark from day one. The agentic component set is a known gap ([#22](https://github.com/common-origin/common-origin-design-system/issues/22)).
4. **Patterns** — expand composition examples (page layouts, data display, navigation).

Future, not current: dark mode (see [decision 0009](decisions/0009-styling-architecture.md) for what it would require) and a Figma/MCP connection.
