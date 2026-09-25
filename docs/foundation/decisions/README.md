# Decisions

A record of significant decisions: what was decided, why, and what follows from it. Records are never edited to change their meaning. To change a decision, write a new record that supersedes the old one and update the old one's status.

| # | Decision | Status | Date |
|---|---|---|---|
| [0001](0001-record-decisions.md) | Record significant decisions | Accepted | 2026-09-25 |
| [0002](0002-button-variants.md) | Five Button variants; `emphasis` sits above `primary` | Accepted | 2026-09-25 |
| [0003](0003-use-of-blue.md) | Blue is for links, focus, and deliberate highlight | Accepted | 2026-09-25 |
| [0004](0004-heading-weights.md) | System headings are weight 700; products may go heavier | Superseded by 0011 | 2026-09-25 |
| [0005](0005-motion.md) | Motion is part of the system; appearing elements animate in | Accepted | 2026-09-25 |
| [0006](0006-page-background.md) | Page background is the `background.default` token | Accepted | 2026-09-25 |
| [0007](0007-sources-of-truth.md) | Which source answers which question | Accepted | 2026-09-25 |
| [0008](0008-framework-agnostic-components.md) | Components are framework-agnostic | Accepted | 2025-12-05 |
| [0009](0009-styling-architecture.md) | styled-components with tokens imported as values | Accepted, under review | Recorded 2026-09-25 |
| [0010](0010-agentinput-working-ring.md) | AgentInput's working ring is a temporary exception | Accepted (temporary) | 2026-09-25 |
| [0011](0011-heading-weights-follow-tokens.md) | System headings follow the typography tokens; products may go heavier | Accepted | 2026-09-25 |

## Template

```markdown
# NNNN. Title

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD
- **Decided by:** name
- **Principles:** P1, P2…

## Context
What prompted the decision, including what was true before.

## Decision
What we decided, stated so it can be checked against the code.

## Consequences
What changes, what follow-up work exists, and what to watch for.
```
