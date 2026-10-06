# 0024. Published CSS variable names keep their tier

- **Status:** Accepted
- **Date:** 2026-10-06
- **Decided by:** Ollie (owner)
- **Principles:** P3, P7
- **Amends:** [0017](0017-token-pipeline-dtcg-style-dictionary-5.md) §4, the variable naming in its example

## Context

Decision 0017 publishes `tokens.css` as CSS custom properties with a `co-` prefix and `outputReferences`, so semantic variables reference base variables. Its example name, `--co-color-text-default`, leaves out the tier (`semantic`).

Leaving the tier out of every name makes 10 variables collide, such as `base.fontFamily.body` and `semantic.fontFamily.body`, which would both become `--co-font-family-body`. And because `outputReferences` points semantic variables at base ones, the base variables have to be published too. Dropping the tier for semantic tokens only would avoid the collisions, but makes the names inconsistent across tiers.

The variable names are a published contract once they ship (P7).

## Decision

**Every published variable keeps its tier**, after the `co-` prefix, in kebab case:

- `--co-semantic-color-text-default`
- `--co-base-color-neutral-900`
- `--co-component-button-primary-background-color`

The rest of 0017 §4 is unchanged: the file is importable as `@common-origin/design-system/tokens.css`, and `outputReferences` keeps references as `var()` chains. Semantic tokens that reference base tokens become `var(--co-base-…)`. Six semantic tokens hold their own value rather than referencing base (`elevation.inset`, `border.radius.none` and the four background overlays), so they don't follow a base override.

## Consequences

- One rule for every tier, with no collisions. The tier in the name shows which variables products should use: semantic, as the token docs already say.
- Renaming a published variable later is a major version.
