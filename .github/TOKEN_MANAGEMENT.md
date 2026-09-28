# Design token management

How to add, use, change and test design tokens. For **why** tokens are structured this way, see [P3](../docs/foundation/principles.md#p3-tokens-not-values) and decision [0014](../docs/foundation/decisions/0014-token-tiers.md). For **how the build works** (Style Dictionary config, outputs, types, known defects and the planned migration), see the [token pipeline](../docs/tokens/pipeline.md), which is the technical reference.

There is no ThemeProvider, runtime token validation or dark-mode switching. Components import resolved token values from `src/styles/tokens.json` at build time.

## Tiers

| Tier | Source | Used by |
|---|---|---|
| Base | `src/tokens/base/index.json` | Only to build semantic tokens. Components never use base tokens (an ESLint rule enforces this in `src/components`), except GridSystem (below). |
| Semantic | `src/tokens/semantic/index.json` | Components, by default. References base tokens. |
| Component | `src/tokens/component/index.json` | Components, in the three cases decision 0014 allows: a component departs from the semantic tier, a family of components shares a decision, or a variant or state matrix needs its own values. References semantic tokens. |

GridSystem is the one existing exception: its public `gap*` props take base spacing keys, so it reads `tokens.base.spacing` with the rule disabled on that line. Changing the prop types is a breaking change, tracked in [#34](https://github.com/common-origin/common-origin-design-system/issues/34); don't treat it as routine cleanup.

Many component-tier entries don't have the `{ "value", "type" }` shape yet, and some still reference base tokens. Normalising them is part of [#24](https://github.com/common-origin/common-origin-design-system/issues/24).

## Adding or changing a token

1. Edit the source JSON in `src/tokens/`. Every new or changed token, in any tier, is `{ "value": …, "type": …, "description": … }`, with a description saying what it's for (0014, rule 6). References use `{base.color.neutral.900}` syntax. Match the `type` naming already used in that tier (see the pipeline doc). Many existing tokens lack descriptions; add one when you touch them.
2. Run `npm run build:tokens`. It regenerates `src/styles/tokens.json`, `tokens.d.ts` and `tokens.css`.
3. Commit the source change and the regenerated files. Don't commit a rebuild whose only change is the "Generated on" timestamp.
4. If the token needs a new semantic concept, add the semantic token first; never point a component at a base token.

## Using tokens in components

```tsx
import tokens from '@/styles/tokens.json'
const { semantic } = tokens

const Label = styled.span`
  color: ${semantic.color.text.subdued};
  padding: ${semantic.spacing.layout.xs};
`
```

- Never hard-code colour, spacing, radius, shadow, font, z-index or duration values. If the right token doesn't exist, add one. The exceptions recorded in the [visual language](../docs/foundation/visual-language.md) still apply: literal `-1`, `0` or `1` z-index for stacking a component's own parts (0013), AgentInput's 1300ms working ring (0010), and a few non-design px literals.
- Off-grid pixel values snap to the nearest spacing token. If that leaves a component unbalanced, rebalance the component rather than adding an off-grid token ([visual language](../docs/foundation/visual-language.md)).
- Prop types that accept token keys use `import type { Tokens } from '../../../types/tokens'` and `keyof Tokens['semantic'][…]`. Never use `keyof typeof` on the imported JSON or an `@/` alias in anything that ends up in the published `.d.ts` files.

## Changing or removing tokens

Token names are part of the published API (P7). The package exports `tokens`, and consumers read them.

- **Adding** a token is a minor change.
- **Changing a value** is a minor or patch change, but it is a visual change: cite the principle or decision that justifies it.
- **Renaming or removing** a token is a major change. Add the new name first, keep the old one until the next major, and note the migration in the release notes.
- A change to the build or the token structure needs owner approval and a decision record (see the pipeline doc).

## Testing

- Assert against values from `tokens.json`, never literal colours or sizes, so tests follow the tokens: `expect(el).toHaveStyle({ color: tokens.semantic.color.text.default })`.
- Token rules that must always hold have tests in `src/tokens/` (for example the z-index, motion and font-weight tests).
