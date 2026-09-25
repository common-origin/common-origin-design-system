# Users

## Primary users: humans and agents

The system is built for two kinds of user, equally:

- **Humans** — developers building with the system, and the people using the products they build.
- **Agents** — AI agents that build products with the system, and agentic products where people work alongside AI.

Both need the same things in different forms: accurate docs, unambiguous rules, stable APIs, and a record of why decisions were made. The agentic side is less mature and has its own body of work: [#22](https://github.com/common-origin/common-origin-design-system/issues/22).

## Products built on the system

| Product | Type | Character | Components it leans on |
|---|---|---|---|
| **Common Origin personal site** | Creative portfolio: music, generative art, design | Editorial, spacious, image-led | Typography, Chip filters, Button, cards, Breadcrumbs, GridSystem |
| **A2UI** | AI financial proof of concept | Data-dense, structured, clarity first | DataView patterns, filters, TextField, Dropdown, Modal, Alert, Badge, StatusBadge, MoneyDisplay |
| **Meal Agent** | Agentic AI meal planning | Clean, approachable, conversational | AgentInput, ActionSheet, List, Modal, Button, Icon, Stack |
| **Smaller React projects** | Experiments, tools, creative work | Varies | Whatever they need — the system must stay light and composable |

The personal site and A2UI mark the two ends of the range the system serves: **editorial and spacious** versus **dense and data-heavy**. A decision that serves only one end fails the other ([P9](principles.md#p9-serve-the-full-range)).

The personal site may make its own site-specific choices (for example, heavier heading weights). Those belong to the site, not to the system.

## People

| Who | Where they meet the system | What they need |
|---|---|---|
| **Developers** (the owner and future contributors) | The npm package and docs site | Stable, typed APIs; accurate docs; clear guidance on which component to use |
| **AI agents** working in this repository or in consuming products | Source code, docs, and this foundation | Accurate, unambiguous rules and a record of why decisions were made |
| **Creative audiences** | The personal site | Image quality, performance, quiet UI that lets the work speak |
| **Listeners** | Music sections of the personal site | Clean media display, fast navigation |
| **Financial product users** | A2UI | Information clarity, density, clear error and status states |
| **People using assistive technology** | Every product | WCAG 2.2 AA as a baseline, everywhere ([P2](principles.md#p2-accessibility-is-the-floor)) |

## Consumer types

**Component consumers** install `@common-origin/design-system` and expect stable typed APIs, no surprise peer dependencies, token-driven styling, and small bundles.

**Token-only consumers** import `@common-origin/design-system/tokens` into their own styling. They expect stable, well-named tokens; a renamed token is a breaking change for them.

## Ownership

The system has a single owner, who is also the reviewer for every change, including agent-authored pull requests. Decisions that aren't covered by a principle or a recorded decision go to the owner as an open question rather than being guessed.
