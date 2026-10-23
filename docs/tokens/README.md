# Design tokens

Design tokens are the named decisions the system is built from: every colour, space, size, radius, border, shadow, layer, type style and motion value. Components never hold a raw value; they read a token ([P3](../foundation/principles.md#p3-tokens-not-values)). This page explains how the library is organised and why. The other pages go deeper:

| Page | Covers |
|---|---|
| [Base tokens](base.md) | The raw scales: the colour ramps and the theory behind them, then dimension, size, radius, border, shadow, layers, opacity, typography, breakpoints and motion |
| [Semantic tokens](semantic.md) | Every semantic category: what it's for, how to choose within it, and the decisions behind it |
| [Pipeline](pipeline.md) | How the source JSON becomes `tokens.json`, `tokens.css` and the published types |

The exact values live in the token sources (`src/tokens/`), which are the authority on values ([decision 0007](../foundation/decisions/0007-sources-of-truth.md)). Each token's job, and its contrast where that matters, is in its `$description`. Those descriptions reach consumers through the published types (hover a token in your editor) and `tokens.css`. This documentation explains the thinking; it doesn't repeat every value.

## Three tiers

Tokens come in three tiers. Each tier has one job, and a component reads only from the tiers above base ([decision 0014](../foundation/decisions/0014-token-tiers.md)).

| Tier | Holds | Named by | Example |
|---|---|---|---|
| **Base** | The raw palette and scales | What the value *is* | `base.color.gray.1200`, `base.dimension.4` |
| **Semantic** | What a value is *for* | Its role in the interface | `semantic.color.text.default`, `semantic.space.400` |
| **Component** | A decision that belongs to one component or family | The component and its part | `component.button.hover.backgroundColor` |

**Why three tiers.** Base tokens let the palette and scales be designed as systems, on fixed steps, without thinking about any one component. Semantic tokens let a component say what it needs ("primary text", "the resting edge of a control") without knowing which grey that is. So the palette can be retuned, a theme or density mode applied, or a contrast fixed in one place. Component tokens exist only where a component really departs from the semantic tier, so they stay few and meaningful.

The rules:

1. **Components never read base tokens.** Base tokens exist only to build semantic tokens. If a component needs something the semantic tier lacks, a semantic token is added first. A lint rule enforces this (see [Pipeline](pipeline.md#token-tiers)).
2. **Components use semantic tokens by default.**
3. **A component token exists only when** the component departs from the semantic tier (Alert's semibold title), a family shares the decision (`component.badge`, `component.input`), or there's a variant-and-state matrix (Button). Component tokens reference semantic tokens, never base tokens. The domain tokens listed in [decision 0036](../foundation/decisions/0036-domain-tokens-interim-base-references.md) are an interim exception, until [#224](https://github.com/common-origin/common-origin-design-system/issues/224) resolves them.
4. **No component spacing tokens.** Padding, margins and gaps come from the semantic `space` scales, so density can change them in one place ([decision 0022](../foundation/decisions/0022-no-component-spacing-tokens.md)).
5. **Tokens hold design decisions only:** colour, typography, spacing, size, radius, border, shadow, motion and layer. Layout mechanics such as `display` and flex alignment stay in component code.
6. **Every new token needs the owner's sign-off**, with a reason no existing token does the job ([decision 0022](../foundation/decisions/0022-no-component-spacing-tokens.md)).

## Choosing a token

1. **Look for the semantic token whose job matches.** Ask what the value is for, not what it looks like: "secondary text" is `color.text.muted`, whatever grey it happens to be today.
2. **If the component departs from that job, or a family shares a decision,** use or add a component token that references a semantic one.
3. **If nothing fits,** propose a semantic token with a reason. Never reach for a base token or a raw value.

Two rules apply to every choice:

- **Colour carries meaning.** Each role hue means one thing everywhere, and meaning is never colour alone ([decision 0043](../foundation/decisions/0043-data-colours.md)). Chrome stays near-monochrome ([P1](../foundation/principles.md#p1-content-first-quiet-chrome)).
- **Contrast is part of the token's job.** Text tokens meet 4.5:1, and control edges and meaningful graphics meet 3:1 ([P2](../foundation/principles.md#p2-accessibility-is-the-floor)). The description states the ratio, and `src/tokens/contrast.test.ts` checks the floors.

## Naming grammar

A semantic token is `{category}.{property}.{key}` ([decision 0031](../foundation/decisions/0031-semantic-token-grammar.md)): `color.fill.accent-muted-hover`, `space.inset.lg`, `size.control.lg`.

Colour keys combine three closed vocabularies, joined with hyphens:

| Slot | Words | Left out when |
|---|---|---|
| **role** | `accent`, `danger`, `warning`, `success`, `ai`, `inverse`, and `input` for control edges | the role is neutral |
| **emphasis** | `muted`, `default`, and `emphasis`, which now means only the strong near-black fill ([decision 0048](../foundation/decisions/0048-emphasis-leaves-the-colour-tokens.md)) | `default`, when a role is written |
| **state** | `hover`, `pressed`, `selected`, `focus` | at rest |

So `fill.accent-muted-pressed` is the accent role, muted, pressed. `text.muted` is neutral and muted. Three words stand alone because they replace emphasis: `disabled`, `focus` (the one focus ring) and `none` (no fill or an invisible border).

Numbered scales use the multiple of the 4px grid unit × 100: `space.400` is 16px and `size.1200` is 48px. A step can be inserted later (`space.150` is 6px) without renaming anything.

## Descriptions, deprecation and versions

- **Every semantic and component token has a `$description`** saying when to use it in one sentence. Base tokens are described per group ([decision 0033](../foundation/decisions/0033-token-descriptions.md)). Descriptions never contain raw hex, px or rem values, so they can't go stale against the value.
- **Removing or renaming a token is a major version** ([P7](../foundation/principles.md#p7-stable-contracts)). A replaced token is deprecated, not deleted: a `$deprecated` string says why, and `$extensions["studio.commonorigin"].replacedBy` names its successor. A deprecated token keeps working, and resolves to its replacement where it has one, until the next major version removes it ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)). The types mark it `@deprecated`, so editors strike it through.
- **Values are owned by the token sources.** `config/tokens.golden.json` records every resolved value, and a test fails on any change that wasn't accepted on purpose ([decision 0017](../foundation/decisions/0017-token-pipeline-dtcg-style-dictionary-5.md)).

## How tokens reach the page

- **Components read tokens as CSS variables with their resolved value as the fallback,** for example `var(--co-semantic-color-text-default, #222222)` ([decision 0041](../foundation/decisions/0041-components-read-css-variables.md)). A product that doesn't load `tokens.css` still renders correctly. Loading it turns on modes and overrides.
- **Variable names keep their tier,** for example `--co-semantic-…` and `--co-component-…` ([decision 0024](../foundation/decisions/0024-css-variable-names-keep-tier.md)).
- **Modes are token values applied to a region, not component props.** Density (`data-co-density="compact"`, `default` or `comfortable`) changes control heights and the padding inside controls, wherever a product sets it ([decision 0032](../foundation/decisions/0032-token-modes.md), [P9](../foundation/principles.md#p9-serve-the-full-range)). Dark values will arrive the same way, from the same ramps ([decision 0043](../foundation/decisions/0043-data-colours.md)).

## What's changing

The palette retune ([#190](https://github.com/common-origin/common-origin-design-system/issues/190)) is moving the semantic tier onto the new ramps in parts:

- **Done:** the neutrals.
- **Still to come:** the role colours (accent, danger, success, warning to yellow, and the new serious and AI tokens), the category labels, the `color.data.*` chart colours, and the component status and transaction tokens.

[Semantic tokens](semantic.md) marks the categories still moving.
