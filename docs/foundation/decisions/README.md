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
| [0009](0009-styling-architecture.md) | styled-components with tokens imported as values | Accepted; reading values superseded by 0041 | Recorded 2026-09-25 |
| [0010](0010-agentinput-working-ring.md) | AgentInput's working ring is a temporary exception | Accepted (temporary) | 2026-09-25 |
| [0011](0011-heading-weights-follow-tokens.md) | System headings follow the typography tokens; products may go heavier | Accepted | 2026-09-25 |
| [0012](0012-shadows-use-black.md) | Shadows may use pure black | Accepted | 2026-09-26 |
| [0013](0013-z-index-layers.md) | Z-index uses semantic layers paired with elevation | Accepted | 2026-09-26 |
| [0014](0014-token-tiers.md) | Token tiers: semantic by default, component tokens for departures and families | Accepted; rule 4 has an interim exception (0036) | 2026-09-26 |
| [0015](0015-reduced-motion.md) | Every motion respects reduced motion; overlays and dismissed alerts animate out | Accepted | 2026-09-27 |
| [0016](0016-accent-selection-and-chip-types.md) | Accent is the blue level above primary; selection is light blue; chips are static, filter or input | Accepted; chip types amended by 0046 | 2026-10-01 |
| [0017](0017-token-pipeline-dtcg-style-dictionary-5.md) | Token source moves to DTCG on Style Dictionary 5; `--co-` CSS variables are published | Accepted; step order amended by 0023, CSS variable names by 0024 | 2026-10-01 |
| [0018](0018-indicators-and-labels.md) | Badge is a count or dot; StatusLabel conveys status; CategoryLabel colour-codes categories; one 20/24/32px size scale | Accepted; amended by 0045 | 2026-10-01 |
| [0019](0019-alert-and-inline-alert.md) | Alert is the block alert (outlined or borderless); InlineAlert is the small inline message | Accepted | 2026-10-01 |
| [0020](0020-tabbar-single-variant.md) | TabBar has one variant, underline, with the light-blue selected treatment; `default` and `pills` are deprecated | Accepted | 2026-10-01 |
| [0021](0021-alert-action-below-content.md) | Alert's action follows the content, left-aligned with it; the dismiss button stays top right | Accepted | 2026-10-03 |
| [0022](0022-no-component-spacing-tokens.md) | No component spacing tokens; every new token needs the owner's sign-off with a reason | Accepted | 2026-10-05 |
| [0023](0023-upgrade-before-dtcg.md) | Upgrade to Style Dictionary 5 before converting the token source to DTCG | Accepted | 2026-10-06 |
| [0024](0024-css-variable-names-keep-tier.md) | Published CSS variable names keep their tier: `--co-semantic-color-text-default` | Accepted | 2026-10-06 |
| [0025](0025-control-borders-meet-3-to-1.md) | Resting control borders meet 3:1 with `color.border.control`; `border.default` and `border.subtle` are for dividers | Accepted | 2026-10-08 |
| [0026](0026-slider-track-stays-light.md) | Slider's unfilled track stays light on `background.progressTrack`; a disabled slider uses `icon.disabled` | Accepted | 2026-10-08 |
| [0027](0027-iconbutton-follows-button.md) | IconButton uses Button's colours and motion in every variant and state; its own colour tokens are deprecated | Accepted | 2026-10-08 |
| [0028](0028-icons-decorative-by-default.md) | Icons are decorative by default; a meaningful icon gets a human-readable `aria-label`; no internal icon names are announced | Accepted | 2026-10-09 |
| [0029](0029-accent-emphasis-audit.md) | Accent and emphasis audit: emphasis is stronger than default, focus is grey and selection light blue, one focus ring, Badge `accent`, Tag keeps `default` and `emphasis` | Accepted | 2026-10-10 |
| [0030](0030-row-interaction-states.md) | Rows and items share one interaction pattern: the naked Button ladder, the 0016 selected ladder, one shared helper | Accepted | 2026-10-11 |
| [0031](0031-semantic-token-grammar.md) | Semantic tokens follow one grammar: `{category}.{property}.{role-emphasis-state}`; surfaces and fills split; a 100-based spacing scale; `color.data` reserved; domain tokens move to the component tier | Accepted; motion details settled by 0037 | 2026-10-11 |
| [0032](0032-token-modes.md) | Density and motion are token modes scoped to an element (`data-co-density`, `data-co-motion`); amends P9 | Accepted | 2026-10-11 |
| [0033](0033-token-descriptions.md) | Token descriptions say when to use a token in one sentence; deprecation, replacement and pairings are fields; base tokens are described per group; descriptions reach the types, a generated `TOKENS.md` and the docs site <!-- verify-docs-ignore: planned generated file --> | Accepted | 2026-10-11 |
| [0034](0034-control-heights.md) | Controls take their height from `size.control` (32 / 40 / 48px) as a min-height and centre their content; chips stay on the label scale; density shifts the scale by 8px | Accepted; chips amended by 0035 | 2026-10-11 |
| [0035](0035-chips-have-one-size.md) | Chips have one size, 24px (`size.label.medium`); the chip `size` prop is deprecated and ignored | Accepted | 2026-10-12 |
| [0036](0036-domain-tokens-interim-base-references.md) | Domain component tokens moved out of the semantic tier may reference base values where no semantic token fits, listed by path; interim, resolved by #224 | Accepted (interim) | 2026-10-13 |
| [0037](0037-motion-tokens.md) | Motion tokens: `duration.instant`, purpose-named easing (`standard`, `decelerate`, `accelerate`), `distance.sm`, `transition.feedback/focus/press`; exits accelerate; no `transition: all`; a fuller motion system later (#227) | Accepted | 2026-10-13 |
| [0038](0038-forced-colors.md) | Forced colours: system-colour edges and states scoped to `@media (forced-colors: active)`; `Highlight` for selected and checked; `forced-color-adjust: none` only on fills that carry state; Playwright checks | Accepted | 2026-10-13 |
| [0039](0039-target-size.md) | Pointer targets are at least 24 × 24px; a control smaller to look at extends its hit area with a pseudo-element (the chip close button) | Accepted | 2026-10-13 |
| [0040](0040-own-oklch-palette.md) | Our own palette: a 12-step pure-grey ramp (`gray.100`–`1200`, each step with a job) with alpha twins, defined in OKLCH; Spectrum and Bootstrap are no longer sources; hues follow in #233 | Accepted; amended by 0044 | 2026-10-14 |
| [0041](0041-components-read-css-variables.md) | Components read tokens as CSS variables with resolved fallbacks (a minor release); styled-components stays; zero-runtime deferred | Accepted | 2026-10-14 |
| [0042](0042-package-build.md) | Package build: per-module `.mjs` ESM with .d.mts types, `sideEffects`, pure styled calls, and a Node ESM fix for styled-components; Rollup stays; ships in a 2.x minor | Accepted | 2026-10-17 |
| [0043](0043-data-colours.md) | Colour by meaning: six role hues (accent, success, warning, serious, danger, AI) plus neutral mean the same everywhere; four display hues with no meaning for categories and chart categories; never colour alone; amends 0003 and 0010 | Accepted | 2026-10-18 |
| [0044](0044-hue-ramps.md) | Hue ramps: each step matches the grey step's contrast with white, full chroma on 800–1100, named by role (`accent`, `success`, `warning`, `serious`, `danger`, `ai`) and display hue (`olive`, `periwinkle`, `rose`, `magenta`), per-step alpha twins; amends 0040 | Accepted | 2026-10-18 |
| [0045](0045-status-indication.md) | Status indication: ten statuses with one meaning, role and shape each; outline icons on the shapes, shape indicators (12px minimum) for the six coloured statuses; always a visible label; Badge means new or unread in accent; signs are text; amends 0018 | Accepted | 2026-10-18 |
| [0046](0046-agent-proposals-and-suggestions.md) | Agent proposals: review first when the change edits the user's content or several items, otherwise apply with Undo; a review bar above the input (Accept, Discard, Undo); AI marker on proposed content; no Undo timer; suggestions are a Suggestion chip that fills the input; AgentInput renders both from data; amends 0016 | Accepted | 2026-10-22 |

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
