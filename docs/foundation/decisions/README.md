# Decisions

A record of significant decisions: what was decided, why, and what follows from it. Records are never edited to change their meaning. To change a decision, write a new record that supersedes the old one and update the old one's status.

| # | Decision | Status | Date |
|---|---|---|---|
| [0001](0001-record-decisions.md) | Record significant decisions | Accepted | 2026-09-25 |
| [0002](0002-button-variants.md) | Five Button variants; `emphasis` sits above `primary` | Accepted; `emphasis` renamed `accent` by 0016 | 2026-09-25 |
| [0003](0003-use-of-blue.md) | Blue is for links, focus, and deliberate highlight | Accepted; open question resolved by 0016 | 2026-09-25 |
| [0004](0004-heading-weights.md) | System headings are weight 700; products may go heavier | Superseded by 0011 | 2026-09-25 |
| [0005](0005-motion.md) | Motion is part of the system; appearing elements animate in | Accepted; reduced-motion clause superseded by 0015 | 2026-09-25 |
| [0006](0006-page-background.md) | Page background is the `background.default` token | Accepted | 2026-09-25 |
| [0007](0007-sources-of-truth.md) | Which source answers which question | Accepted | 2026-09-25 |
| [0008](0008-framework-agnostic-components.md) | Components are framework-agnostic | Accepted | 2025-12-05 |
| [0009](0009-styling-architecture.md) | styled-components with tokens imported as values | Accepted, under review | Recorded 2026-09-25 |
| [0010](0010-agentinput-working-ring.md) | AgentInput's working ring is a temporary exception | Accepted (temporary) | 2026-09-25 |
| [0011](0011-heading-weights-follow-tokens.md) | System headings follow the typography tokens; products may go heavier | Accepted | 2026-09-25 |
| [0012](0012-shadows-use-black.md) | Shadows may use pure black | Accepted | 2026-09-26 |
| [0013](0013-z-index-layers.md) | Z-index uses semantic layers paired with elevation | Accepted | 2026-09-26 |
| [0014](0014-token-tiers.md) | Token tiers: semantic by default, component tokens for departures and families | Accepted | 2026-09-26 |
| [0015](0015-reduced-motion.md) | Every motion respects reduced motion; overlays and dismissed alerts animate out | Accepted | 2026-09-27 |
| [0016](0016-accent-selection-and-chip-types.md) | Accent is the blue level above primary; selection is light blue; chips are static, filter or input | Accepted | 2026-10-01 |
| [0017](0017-token-pipeline-dtcg-style-dictionary-5.md) | Token source moves to DTCG on Style Dictionary 5; `--co-` CSS variables are published | Accepted; step order amended by 0023, CSS variable names by 0024 | 2026-10-01 |
| [0018](0018-indicators-and-labels.md) | Badge is a count or dot; StatusLabel conveys status; CategoryLabel colour-codes categories; one 20/24/32px size scale | Accepted | 2026-10-01 |
| [0019](0019-alert-and-inline-alert.md) | Alert is the block alert (outlined or borderless); InlineAlert is the small inline message | Accepted | 2026-10-01 |
| [0020](0020-tabbar-single-variant.md) | TabBar has one variant, underline, with the light-blue selected treatment; `default` and `pills` are deprecated | Accepted | 2026-10-01 |
| [0021](0021-alert-action-below-content.md) | Alert's action follows the content, left-aligned with it; the dismiss button stays top right | Accepted | 2026-10-03 |
| [0022](0022-no-component-spacing-tokens.md) | No component spacing tokens; every new token needs the owner's sign-off with a reason | Accepted | 2026-10-05 |
| [0023](0023-upgrade-before-dtcg.md) | Upgrade to Style Dictionary 5 before converting the token source to DTCG | Accepted | 2026-10-06 |
| [0024](0024-css-variable-names-keep-tier.md) | Published CSS variable names keep their tier: `--co-semantic-color-text-default` | Accepted | 2026-10-06 |
| [0025](0025-control-borders-meet-3-to-1.md) | Resting control borders meet 3:1 with `color.border.control`; `border.default` and `border.subtle` are for dividers | Accepted | 2026-10-08 |
| [0026](0026-slider-track-stays-light.md) | Slider's unfilled track stays light on `background.progressTrack`; a disabled slider uses `icon.disabled` | Accepted | 2026-10-08 |

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
