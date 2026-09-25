# Foundation

The foundation is the source of truth for **why** the Common Origin design system exists, **who** it serves, and **how decisions are made**. Everything else — component docs, contributing guides, agent instructions — builds on it.

If another document in this repository contradicts the foundation, the foundation wins and the other document is wrong.

## Contents

| Document | Answers |
|---|---|
| [Purpose](purpose.md) | Why does this system exist? What does success look like? What phase are we in? |
| [Users](users.md) | Which products and people depend on it, and what do they need? |
| [Brand](brand.md) | What is Common Origin, and what should the system feel like? |
| [Principles](principles.md) | The numbered principles and the decision hierarchy used to resolve conflicts |
| [Visual language](visual-language.md) | Concrete visual rules, each marked with its current status |
| [Usage](usage.md) | How consumers install and set up the package |
| [Decisions](decisions/README.md) | The record of significant decisions: context, choice, and consequences |

## Sources of truth

Different questions have different authorities ([decision 0007](decisions/0007-sources-of-truth.md)):

| Question | Authority |
|---|---|
| Why we do something | This foundation (principles and decisions) |
| Exact values (colour, spacing, radius, weight, duration) | Design tokens in `src/tokens/` |
| Component behaviour and API | Component source in `src/components/` |
| Look and feel | The live docs site: https://common-origin-design-system.vercel.app/ |

Products built on the system (for example, the personal site) may make their own site-specific choices, such as heavier heading weights. Those are not system rules.

## Rule status

Rules in [visual-language.md](visual-language.md) carry a status:

- **Enforced** — true in the code today. Keep it true.
- **Target** — the agreed direction, not yet fully true. Move towards it; don't regress.
- **Exception** — a deliberate departure from a general rule, linked to the decision that allows it.

## Changing the foundation

1. A change to a principle or rule needs a decision record in [decisions/](decisions/README.md).
2. Pull requests that change visual behaviour cite the principle (`P1`–`P9`) or decision (`0001`…) that justifies them.
3. If no principle or decision covers the change, don't guess — raise it as an open question for the owner.
