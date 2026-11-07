# 0050. Headings are semibold; only display is bold

- **Status:** Accepted
- **Date:** 2026-11-07
- **Decided by:** Ollie (owner)
- **Principles:** P1, P5
- **Amends:** [0011](0011-heading-weights-follow-tokens.md)

## Context

[0011](0011-heading-weights-follow-tokens.md) recorded the live heading weights: `display` to `h4` at 700, `h5` and `h6` at 500, and said any change is a new decision for the owner. The owner asked to reduce the heading weights to 600 for every heading except `display`, and chose to bring `h5` and `h6` up to 600 as well, so all heading levels share one weight.

## Decision

| Tokens | Weight |
|---|---|
| `display` | 700 (`semantic.fontWeight.bold`) |
| `h1`, `h2`, `h3`, `h4`, `h5`, `h6` | 600 (`semantic.fontWeight.semibold`) |
| `body` | 400, unchanged |

- Only the display heading is bold. Hierarchy between heading levels comes from scale, not weight.
- The rest of 0011 stands: products may still use heavier heading weights as a site-specific choice.

## Consequences

- `h1`–`h4` render lighter and `h5`–`h6` heavier. The change is a token value change, so it ships in a minor release ([P7](../principles.md#p7-stable-contracts)).
- Products already load Inter at 600 ([usage](../usage.md#fonts)); nothing new to load.
- Alert's title builds on `h6` and was already semibold through `component.alert.title.fontWeight`. That token now matches `h6`; it stays, because removing a token is a major version. The example in [0014](0014-token-tiers.md) ("h6 style (500) but is semibold") describes the system before this decision and is kept as history.
