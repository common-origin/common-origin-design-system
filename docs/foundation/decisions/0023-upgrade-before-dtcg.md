# 0023. Upgrade to Style Dictionary 5 before converting to DTCG

- **Status:** Accepted
- **Date:** 2026-10-06
- **Decided by:** Ollie (owner)
- **Principles:** P7, P8
- **Amends:** [0017](0017-token-pipeline-dtcg-style-dictionary-5.md) §2, the order of steps 4 and 5

## Context

Decision 0017 set a six-step migration of the token pipeline ([#24](https://github.com/common-origin/common-origin-design-system/issues/24)): snapshot, fix the defects on v3, normalise the component tier, **convert to DTCG**, **upgrade to Style Dictionary 5**, then add the new outputs and tests. Every step must leave resolved values unchanged.

Before starting step 4 we found that the order can't work:

- Style Dictionary 3.9.2 doesn't read DTCG. It has no handling for `$value`, `$type` or `$description`, so converting the source on v3 would leave the build with no tokens.
- `convertJSONToDTCG`, the conversion utility the plan names, only exists from Style Dictionary 4.
- Style Dictionary 5 reads both the existing format and DTCG.

## Decision

**Swap steps 4 and 5.** Step 4 upgrades to Style Dictionary 5 on the existing token format; step 5 converts the source to DTCG. The rest of 0017 is unchanged: the target, the zero-change rule checked against the golden file, the outputs and the other steps.

The alternatives were one PR combining both steps (harder to trace a value change) and a temporary shim on v3 that translated `$value` back to `value` (throwaway code), so neither was chosen.

## Consequences

- Each step stays its own PR with its own golden-file diff.
- `docs/tokens/pipeline.md` §4 and #24's checklist list the steps in the new order.
