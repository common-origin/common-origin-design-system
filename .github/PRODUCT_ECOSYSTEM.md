# Common Origin — Product Ecosystem

> This document describes all products that consume this design system and the contexts they operate in.
> Agents must understand these contexts before proposing component changes, new patterns, or API additions.

---

## The Key Relationship

**The Common Origin personal site is built with this design system.**

The live site is not a separate visual reference — it IS evidence of what this system produces in production. When an agent makes a visual decision and cannot find a rule in the brand context files, the live Common Origin site is the ground truth. If the live site doesn't do it, the design system probably shouldn't either.

---

## Products

### 1. Common Origin Personal Site
**Type:** Creative portfolio  
**Status:** Live in production  
**Context:** Public-facing personal site covering music, generative art, and design work  
**Sections:** Music (discography, releases), Art (generative artwork gallery), Design  
**Design character:** Editorial, spacious, image-led, monochrome chrome with rich content  
**Primary components used:** Typography, Navigation, Chip (tags/filters), Button, Card patterns, Breadcrumbs, GridSystem  
**Why it matters for agents:** This is the richest visual reference in the ecosystem. Component decisions should be validated against what this site does.

---

### 2. A2UI — AI Financial POC
**Type:** Financial product / proof-of-concept  
**Status:** Active development  
**Context:** AI-powered financial data interface — dense information environment  
**Design character:** Data-dense, structured, information hierarchy is paramount  
**Primary components used:** DataView patterns, Table-like layouts, Filters, TextField, Dropdown, Modal, Alert, Badge, StatusBadge, Typography  
**Special consideration:** This product operates at higher information density than the personal site. Components should remain usable in dense contexts even if the default feel is spacious. Density is handled per-component — there is no system-wide density mode.  
**Why it matters for agents:** Component proposals should work in both editorial/spacious and information-dense contexts.

---

### 3. Meal Agent
**Type:** Agentic AI application  
**Status:** Active development  
**Context:** AI-powered meal planning — conversational, agentic UI  
**Design character:** Clean, approachable, functional  
**Primary components used:** AgentInput, ActionSheet, List, Modal, Button, Typography, Icon, Stack  
**Why it matters for agents:** Agentic UI patterns are a distinct use case — components like AgentInput serve specific interaction models.

---

### 4. Smaller React Projects
**Type:** Various personal and creative projects  
**Status:** Ongoing  
**Context:** Experimental work, small tools, creative explorations  
**Design character:** Varies by project — the system provides the base  
**Why it matters for agents:** The system must remain composable and lightweight. Never increase bundle size unnecessarily. Never add peer dependencies.

---

## Consumer Types

### React Application Consumers (Primary)
Import components directly from the published npm package (`common-origin-design-system`). Expect:
- Stable, typed component APIs
- No peer dependency surprises
- Predictable token-driven styling via `styled-components`
- Tree-shakeable exports

### Token-Only Consumers (Secondary)
Import only `tokens` from the package — no components. Use design tokens in their own styling systems. Expect:
- Tokens to be stable and well-named
- Semantic token layer to remain meaningful
- No token renames without a major version bump

---

## User Contexts

| Context | User type | Priority concerns |
|---|---|---|
| Creative/Art audience | Visitors to the personal site viewing generative art | Aesthetics, performance, image rendering quality |
| Music audience | Listeners browsing discography and releases | Media display, clean navigation, fast loads |
| Financial product users | Users of A2UI | Information clarity, data density, error states |
| Developers | Consuming the npm package | API stability, TypeScript accuracy, documentation quality |

---

## Performance Requirements

- **Bundle size:** Keep it lean. Never add a runtime dependency that can be avoided.
- **Render performance:** No unnecessary re-renders. No heavy client-side processing in display components.
- **Transition smoothness:** Interactions should feel instant. Motion is 150–300ms maximum.
- **Asset loading:** Components should not block rendering. Image components support lazy loading.

---

## Accessibility Baseline

**WCAG 2.2 AA is the minimum standard across all products** — not a nice-to-have, not aspirational. Every component must:

- Have sufficient colour contrast (4.5:1 for normal text, 3:1 for large text and UI elements)
- Be keyboard navigable
- Have correct semantic HTML and ARIA attributes
- Pass `jest-axe` in automated tests
- Support screen reader use

---

## What Agents Should Know About the Ecosystem

1. **Decisions that help the personal site and A2UI simultaneously are the right decisions** — these two products represent the full range of contexts the system serves
2. **Never optimise for one product at the expense of another** — a component that only works in dense layouts fails the personal site; a component that only works in editorial layouts fails A2UI
3. **Token stability is critical** — multiple products consume the same token names; a renamed token is a breaking change across the entire ecosystem
4. **The npm package is published** — any component API change must follow semver; agents must never break existing prop interfaces without a major version bump
