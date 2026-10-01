# 0017. Token pipeline: DTCG source on Style Dictionary 5

- **Status:** Accepted
- **Date:** 2026-10-01
- **Decided by:** Ollie (owner)
- **Principles:** P3, P7, P8
- **Extends:** [0009](0009-styling-architecture.md) (the build part; how components consume tokens is unchanged)

## Context

The token build runs Style Dictionary 3.9.2. Its defects are listed in [`docs/tokens/pipeline.md`](../../tokens/pipeline.md) §2:

- `$ref` keys leak into the published `tokens.json` and the `tokens` type.
- Most of the component tier is plain strings, not tokens.
- Component tokens reference base tokens.
- Type names are inconsistent.
- Built-in transforms never run, and most custom transforms do nothing or hide bugs.
- Descriptions are dropped from every output.
- Headers carry timestamps.
- One output (`lib/tokens.js`) is unused.

Style Dictionary 5 only resolves references inside real token leaves, so the component tier blocks a straight upgrade. Pipeline changes are build changes, which need the owner's approval and a decision record ([0001](0001-record-decisions.md)) ([#24](https://github.com/common-origin/common-origin-design-system/issues/24)).

## Decision

**1. Target.** Move the token source to the DTCG format (`$value`, `$type`, `$description`, DTCG type names) and build it with Style Dictionary 5:
- an ESM config with `hooks`;
- `log.warnings: 'error'`, so broken references and collisions fail the build;
- deterministic output, with no timestamps.

The component tier becomes real tokens that reference semantic tokens ([0014](0014-token-tiers.md)).

**2. Plan.** The migration follows the six steps in `pipeline.md` §4, one PR per step:
1. snapshot the resolved values;
2. fix the defects on v3;
3. normalise the component tier;
4. convert to DTCG;
5. upgrade to Style Dictionary 5;
6. add the new outputs and tests.

**Every step must leave resolved token values unchanged**, checked against a committed golden `tokens.json`, unless the PR says otherwise.

**3. Consumers keep the same JSON.** `tokens.json` keeps its token hierarchy and resolved values, so components and products that import it don't change. The one exception is the stray `$ref` keys, which are removed as a **fix in a minor release**: they were never meant to be part of the API. The golden file is today's output **without** the `$ref` keys, and every later step must match it exactly. This was weighed against P7, which normally puts removals in a major. The owner chose a minor because the keys aren't tokens: they hold file paths such as `"./base/index.json"`, so no product can use them as design values. The release note will still name the change, so anyone who reads them knows.

**4. CSS variables are published.** The package ships `tokens.css` as CSS custom properties for products that don't use styled-components, importable as `@common-origin/design-system/tokens.css` (a new `exports` entry beside the existing `./tokens`):
- every variable has a **`co-` prefix** (e.g. `--co-color-text-default`);
- `outputReferences` is on, so semantic variables reference base variables.

This is a new output. Nothing existing changes.

**5. Generated files stay committed.** `tokens.json`, `tokens.d.ts` and `tokens.css` stay in git, so fresh clones and editors work without a build step. A CI check fails when they don't match the source. `tokens.d.ts` carries each token's `$description` as JSDoc.

**6. Out of scope.**
- Components keep importing token values ([0009](0009-styling-architecture.md)). Moving components to CSS variables at runtime is a styling-architecture question for [#41](https://github.com/common-origin/common-origin-design-system/issues/41).
- Dark mode stays out of scope ([purpose](../purpose.md)). The CSS output only keeps the door open.

**7. Order.** The 2.16 work from [0016](0016-accent-selection-and-chip-types.md) (#96, #97, #98) goes first, so the pipeline migrates a settled token set.

## Consequences

- `pipeline.md` §4 is approved, no longer just proposed. When the migration lands, `pipeline.md` describes the new pipeline as current fact.
- The token architect agent can carry out pipeline steps under this decision ([`.claude/agents/token-architect.md`](../../../.claude/agents/token-architect.md)).
- New semantic tokens may be needed in step 3, where component tokens currently reference base tokens. Adding them is not a visual change.
- The `--co-` CSS variables become a published contract (P7): renaming one later is a major change.
