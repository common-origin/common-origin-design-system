# Token pipeline

How design tokens go from source JSON to what components, the docs site, and consumers use. This is the technical reference for anyone (human or agent) changing tokens or the Style Dictionary build. For *why* tokens are structured the way they are (the tiers, the grammar, the ramps and every semantic category), see the [token documentation](README.md).

Verified against the code on 2026-09-25.

---

## 1. Current pipeline (Style Dictionary 5)

```
src/tokens/{base,component,semantic}/index.json
        │  npm run build:tokens  →  node config/style-dictionary.config.mjs
        │  source = the three tier folders, listed in that order
        ▼
┌───────────────────┬──────────────────────────────┬───────────────────────────────┬───────────────────────────────────────┐
│ platform          │ output                       │ format                        │ used by                               │
├───────────────────┼──────────────────────────────┼───────────────────────────────┼───────────────────────────────────────┤
│ tokens            │ src/styles/tokens.json       │ json/nested (built-in)        │ every component; published in package │
│ typescript        │ src/styles/tokens.ts         │ typescript/tokens-types       │ the published Tokens types (below)    │
│                   │                              │ (custom)                      │                                       │
│ custom            │ src/styles/tokens.css        │ css/variables (built-in)      │ published as …/tokens.css (step 6b)   │
└───────────────────┴──────────────────────────────┴───────────────────────────────┴───────────────────────────────────────┘
```

- Components read tokens as **CSS variables with the resolved value as the fallback** (`var(--co-semantic-color-text-default, #212529)`, [0041](../foundation/decisions/0041-components-read-css-variables.md), [#245](https://github.com/common-origin/common-origin-design-system/issues/245)). They import `src/lib/cssTokens.ts`, a mirror of `tokens.json` with the same shape and `Tokens` type, built at import time by `withCssVariables` in `src/lib/cssVariables.ts`. Breakpoints stay values (no `var()` in media queries), and a value read as data, such as a duration parsed for a timer, comes from `tokens.json`. Jest maps the mirror to `tokens.json`, so unit tests assert resolved values. `src/lib/cssVariables.test.ts` checks that every variable is declared in `tokens.css`, and `e2e/css-variables.spec.ts` checks in a browser that each variable computes to its fallback and that a region can change one.
- The package publishes `tokens.json` (inside the JS bundle and as `dist/styles/tokens.json`) and a tokens-only entry (`@common-origin/design-system/tokens`).
- The published `Tokens`, `TokensBase`, `TokensSemantic` and `TokensComponent` types come from the generated `src/styles/tokens.ts` ([0033](../foundation/decisions/0033-token-descriptions.md), [#199](https://github.com/common-origin/common-origin-design-system/issues/199)): one nested `Tokens` type literal with each token's `$description` as JSDoc, each group's description on the group, and `@deprecated` (with the replacement) on deprecated tokens. `src/types/tokens.ts` declares `tokens` with that type, so hovering a token in a consumer's editor shows when to use it, and a deprecated token is struck through. Every value is `string` and the type is identical to the old `typeof tokens.json` (`src/types/tokens.test.ts` checks both). It's a type literal, not interfaces, so token groups stay assignable to `Record<string, string>` (`verify:package` checks that). The old, unused declaration file it replaced is gone.
- CI rebuilds the tokens and fails if `tokens.json`, `tokens.css` or `tokens.ts` differ from what's committed (step 6).
- `tokens.css` is committed even though `.gitignore` lists it. The build is deterministic: generated headers carry no timestamp, so a rebuild with no token changes leaves every file untouched.

### Token tiers

| Tier | File | Convention today |
|---|---|---|
| Base | `src/tokens/base/index.json` | Raw values, DTCG `{ "$value" }` with `$type` on the group where its tokens share one. Described per group, not per token: each group that holds tokens has a `$description` saying what the scale is and how it's keyed ([0033](../foundation/decisions/0033-token-descriptions.md), checked by `dtcgTypes.test.ts`) |
| Semantic | `src/tokens/semantic/index.json` | References to base, DTCG `{ "$value", "$description"? }` with `$type` on the token or its group |
| Component | `src/tokens/component/index.json` | Real DTCG tokens with `$value`, `$type` and `$description`, referencing **semantic** tokens only, apart from Button's deprecated `emphasis` aliases, which reference `accent` until 3.0 (step 3 of [#24](https://github.com/common-origin/common-origin-design-system/issues/24)), and the domain tokens [0036](../foundation/decisions/0036-domain-tokens-interim-base-references.md) lets reference base values for now, listed by path in `componentTier.test.ts` until [#224](https://github.com/common-origin/common-origin-design-system/issues/224) resolves them. No spacing tokens ([0022](../foundation/decisions/0022-no-component-spacing-tokens.md)): the old ones stay, deprecated, until 3.0. Deprecation is data ([0033](../foundation/decisions/0033-token-descriptions.md)): a DTCG `$deprecated` string says why, `$extensions["studio.commonorigin"].replacedBy` names the token to use when exactly one replaces it, and `tokens.css` prints the deprecation as the variable's comment. `src/tokens/deprecation.test.ts` checks every `replacedBy` and that nothing reads a deprecated token. Code reads are found through the TypeScript type checker (`src/tokens/tokenReads.ts`, [#229](https://github.com/common-origin/common-origin-design-system/issues/229)): it follows destructures, aliases, typed parameters, helpers and computed keys (template literals over a union), and counts a read it can't pin down as every token under its group. Reads that are deliberate are allow-listed in the test with a reason; token paths written as text (docs lists, READMEs) are found by a text search. No raw px is read any more ([0034](../foundation/decisions/0034-control-heights.md)): fields take `size.control.lg` ([#206](https://github.com/common-origin/common-origin-design-system/issues/206)), Button and IconButton take `size.control.sm` / `md` / `lg` ([#207](https://github.com/common-origin/common-origin-design-system/issues/207)), and chips take `size.label` min-heights instead of their `2px` padding ([#208](https://github.com/common-origin/common-origin-design-system/issues/208)). Deprecated tokens that nothing reads, such as the `2px` focus offsets, also keep their raw values until 3.0 |

**Which tier a component uses** ([decision 0014](../foundation/decisions/0014-token-tiers.md)):
- Components never use base tokens.
- Components use semantic tokens by default.
- Component tokens exist only for departures from the semantic tier, decisions shared by a family (for example `component.badge`, `component.input`), and variant or state matrices.
- Component tokens reference semantic tokens, never base tokens, and hold design decisions only, never layout mechanics.
- Sizes: roles that several components share are semantic (`size.touchTarget`, `size.overlay.sm/md/lg`, `size.menu.maxHeight`). A size unique to one component is a component token (for example `component.emptyState.illustration.small`) that references `semantic.size.dimension.<step>`, a scale keyed like `base.dimension` (0.25rem steps) with only the steps in use.
- Typography parts come from small named semantic scales, which hold only the steps components use: `fontFamily` (body, monospace), `fontSize` (xs–xl), `lineHeight` (none, tight, normal), `letterSpacing` (wide) and `fontWeight`. A component that departs from a typography style, such as Alert's title, combines the style with these parts through its component tokens.

An ESLint rule (`no-restricted-syntax` in `eslint.config.mjs`) fails the lint if a component in `src/components` uses `tokens.base` or destructures `base` from `tokens`. The one exception is `GridSystem`: its `gap*` props are typed as `base.dimension` keys or `auto` (public API), so it looks them up in the base tier until those props accept semantic keys. Before 3.0 they took `base.spacing` keys, the deprecated aliases of `base.dimension` ([#188](https://github.com/common-origin/common-origin-design-system/issues/188)).

`src/tokens/componentTier.test.ts` keeps the component tier to these rules, and fails if anything reads a retired token.

Values are strings. There are no object-valued (composite) tokens and no arithmetic expressions. Typography is a CSS `font` shorthand string (`"700 3rem/3rem 'Inter', sans-serif"`); shadows are CSS strings.

### How the config actually behaves

`config/style-dictionary.config.mjs` is an ESM config for Style Dictionary 5 (step 4 of [#24](https://github.com/common-origin/common-origin-design-system/issues/24)). It registers one custom format through `hooks.formats` (`typescript/tokens-types`, the published types) and one preprocessor through `hooks.preprocessors` (`deprecation-comments`, which the CSS platform alone runs, so a deprecated variable's comment carries its deprecation), sets `log.warnings: 'error'`, and awaits `sd.buildAllPlatforms()`. It sets `usesDtcg: true`: the source is DTCG (step 5).

**No value transforms.** Each platform names only a name transform: `name/camel` for `tokens` and `typescript` (their output doesn't use names, but Style Dictionary needs unique ones), and `name/kebab` for `custom`, which, with the `co` prefix, produces the CSS variable names (`--co-semantic-color-text-default`). That platform also sets `outputReferences`, so references stay as `var()` chains. Style Dictionary 5's built-in `js` and `css` groups match on token **type**, unlike v3's, which matched on the first path segment and so never ran here. Turned on, `color/hex` and `color/css` would rewrite every colour (`#16191C` → `#16191c`, `transparent` → `#00000000`). Value transforms come back deliberately, each with its own diff, in later steps.

Until step 2, every platform also set `transforms`, which in v3 replaced the group, so only ten custom transforms ran. All but the CSS name transform were no-ops or dead code, and they were deleted with the unused `styled-components` platform, its output and the unused formats.

In practice the build **resolves references and writes files**; no value is transformed.

### Token modes

`src/tokens/resolver.json` describes the token sets and the modes in the DTCG 2025.10 Resolver format ([0032](../foundation/decisions/0032-token-modes.md)). Each mode context is a file under `src/tokens/modes/` that overrides only the `$value` of tokens in the groups that mode may change (density: `semantic.size.control.*` and `semantic.space.inset.*`, [#191](https://github.com/common-origin/common-origin-design-system/issues/191)). After the main build, the config merges each context over the tiers in memory, resolves it, and compares every token's resolved value with the default. Each token that changes, the overridden tokens and every alias built on them, is redeclared in a `[data-co-<mode>="<context>"]` block appended to `tokens.css`, with references kept as `var()`. Aliases have to be redeclared because a CSS variable is resolved where it's declared ([0041](../foundation/decisions/0041-components-read-css-variables.md)). A `default` block resets a nested region. `tokens.json` and `tokens.ts` are unaffected. `src/tokens/modes.test.ts` keeps each mode to its groups, checks that every block is complete, and checks the density values; `e2e/density.spec.ts` checks them in a browser.

---

## 2. Known defects

| # | Defect | Consequence |
|---|---|---|
| 1 | ~~An `index.json` of `$ref` pointers in `src/tokens/` matches the `source` glob. Style Dictionary doesn't understand `$ref`, so it merges the keys as data~~ | Fixed in step 2 of [#24](https://github.com/common-origin/common-origin-design-system/issues/24): the index is deleted and `source` lists the tier folders. The `$ref` keys no longer reach `tokens.json` or the package (a fix in a minor, decision 0017) |
| 2 | ~~Component tier is mostly not made of tokens~~ | Fixed in step 3 of #24: every component leaf is a real token with a type and a description |
| 3 | ~~Component tokens reference base tokens directly~~ | Fixed in step 3 of #24: component tokens reference semantic tokens only, checked by `componentTier.test.ts` |
| 4 | ~~Type names are inconsistent (kebab in base, camel in semantic) and don't match the transforms' filters~~ | Fixed in step 5 of #24: every token has a DTCG type name |
| 5 | ~~`transformGroup` + `transforms` on every platform~~ | Fixed in step 2 of #24: the platforms use the built-in groups alone |
| 6 | ~~Latent bugs in custom transforms (implicit globals that throw in ESM strict mode, broken `includes` and precedence logic)~~ | Fixed in step 2 of #24: the custom transforms are deleted |
| 7 | `description` fields are dropped from every output | Partly fixed in step 5 of #24: `tokens.css` carries each `$description` as a comment. JSDoc reaches the types through a generated `tokens.ts` ([0033](../foundation/decisions/0033-token-descriptions.md), [#199](https://github.com/common-origin/common-origin-design-system/issues/199)) |
| 8 | ~~Timestamped headers~~ | Fixed in step 4 of #24: Style Dictionary 5's CSS header has no timestamp, and the custom TypeScript format no longer writes one |
| 9 | ~~The `styled-components` platform's output generated but unused~~ | Fixed in step 2 of #24: the platform and its output are deleted |
| 10 | ~~Docs drift: `.github/TOKEN_MANAGEMENT.md` showed a different, CommonJS config with transforms and outputs that don't exist here~~ | Fixed in [#37](https://github.com/common-origin/common-origin-design-system/issues/37): the guide no longer describes the build and defers to this document |

---

## 3. Style Dictionary v4/v5 — what an expert needs to know

This repo uses **5.6.0** (`^5.6.0`; ESM only, Node ≥ 22, and the repo pins Node 22).

### API
```js
import StyleDictionary from 'style-dictionary'

const sd = new StyleDictionary({
  source: ['src/tokens/**/*.tokens.json'],
  usesDtcg: true,
  log: { warnings: 'error', verbosity: 'verbose' },   // fail on broken refs / collisions
  hooks: {
    transforms: {
      'co/example': { type: 'value', transitive: true, filter: (t) => t.$type === 'dimension', transform: (t) => t.$value },
    },
    formats: {
      'co/example': async ({ dictionary, platform, options, file }) => '…',
    },
  },
  platforms: { /* … */ },
})
await sd.buildAllPlatforms()
```
- v3 → v4 renames: `extend()` → `new StyleDictionary()`; build methods are async; hooks live under `hooks` (plural keys); transform `matcher` → `filter`, `transformer` → `transform`; format `formatter` → `format` with a single `{ dictionary, platform, options, file }` argument; `name/cti/kebab` → `name/kebab`; reference helpers move to `style-dictionary/utils` (`usesReferences`, `getReferences`, `resolveReferences`, `outputReferencesFilter`).
- File header timestamps are **off by default** from v4 (opt in with `formatting.fileHeaderTimestamp`).
- `log.warnings: 'error'` turns token collisions and broken references into build failures.

### v5 specifics
- References must point at **token leaves** (`$value` + `$type`). References to groups, sub-properties, or into composite values are no longer allowed. Non-token leaves are dropped from nested outputs.
- Reference syntax is fixed to `{a.b.c}`.
- Node 22+.

### DTCG format
- Tokens use `$value`, `$type`, `$description`, `$extensions`; `$type` can be set on a group and is inherited (`typeDtcgDelegate` runs automatically).
- DTCG types: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `strokeStyle`, `border`, `transition`, `shadow`, `gradient`, `typography`.
- Convert existing files with `convertToDTCG(dictionary, { applyTypesToGroup })` or `convertJSONToDTCG(path)` from `style-dictionary/utils`. They rename `value/type/description` but **don't** remap type names (e.g. `size` → `dimension`).
- The DTCG 2025.10 spec (object values for `color` and `dimension`) is only partly supported in v5; keep string values until support lands.

### Composite tokens
- Built-in CSS transforms: `shadow/css/shorthand`, `typography/css/shorthand`, `border/css/shorthand`, `transition/css/shorthand`, `cubicBezier/css`, `strokeStyle/css/shorthand`, `fontFamily/css`.
- `expand` (global or per platform: `true`, a function, or `{ include, exclude, typesMap }`) splits composite tokens into individual tokens.

### Outputs that matter here
- `css/variables` — options `selector` (e.g. `:root`, `[data-theme="dark"]`), `outputReferences` (boolean or function; emits `var(--…)` chains), `outputReferenceFallbacks`.
- `json/nested`, `javascript/esm` (`minify`, `flat`, `stripMeta`), `typescript/es6-declarations` (`outputStringLiterals`).
- `filter` on a file (name, function, or object) selects tokens, e.g. one file per tier or per theme.

### Ecosystem
- `@tokens-studio/sd-transforms` 2.x (peer `style-dictionary@^5`) adds Tokens Studio / Figma compatibility (math resolution, type mapping). Relevant only if a Figma connection is pursued (Purpose: future).

---

## 4. Target architecture (approved in [decision 0017](../foundation/decisions/0017-token-pipeline-dtcg-style-dictionary-5.md); not yet built)

The owner approved this direction and the migration plan below in [decision 0017](../foundation/decisions/0017-token-pipeline-dtcg-style-dictionary-5.md) ([#24](https://github.com/common-origin/common-origin-design-system/issues/24)). Until the steps land, sections 1–3 describe what is current. The decision also settles that `tokens.css` is published with a `co-` variable prefix, that generated files stay committed with a CI freshness check, and that the 2.16 work from decision 0016 goes first.

1. **Style Dictionary 5**, ESM config in `config/style-dictionary.config.mjs`, `log.warnings: 'error'` (done in step 4).
2. **DTCG source**: `$value` / `$type` / `$description`, DTCG type names, `$type` on groups where uniform. (The `$ref` index file was deleted in step 2.)
3. **Component tier made of real tokens** referencing **semantic** tokens (add missing semantic tokens first); no raw `px`.
4. **Composite tokens where it helps**: typography, shadow, border, and transition as DTCG objects, emitted with the built-in `*/css/shorthand` transforms, so the JSON output keeps the same hierarchy and values for components.
5. **Outputs**
   - `tokens.json` — same token hierarchy and resolved values as today (components keep working unchanged), except the stray `$ref` keys, which step 2 removes. The golden file excludes them.
   - `tokens.css` — **published in the package** as `@common-origin/design-system/tokens.css` for CSS-variable consumers, every variable prefixed `co-` and keeping its tier (for example `--co-semantic-color-text-default`, [0024](../foundation/decisions/0024-css-variable-names-keep-tier.md)), with `outputReferences: true` so semantic variables reference base variables. The variable names become a published contract (P7). This keeps the door open for theming (decision 0009); dark mode stays out of scope.
   - `tokens.ts` — the published types, generated with each token's `$description` as JSDoc, so editors and agents see intended use (supports #22). It replaced the earlier, unused declaration file ([#199](https://github.com/common-origin/common-origin-design-system/issues/199)).
   - (The unused `styled-components` output and the custom transforms and formats were dropped in step 2.)
6. **Deterministic output** (no timestamps). Generated files (`tokens.json`, `tokens.ts`, `tokens.css`) **stay committed**, so fresh clones and editors work without a build step, and a CI check fails when they don't match the source.
7. **Token tests** in Jest: every token has a DTCG `$type`; every semantic token has a `$description`; component tokens reference only semantic tokens; no `$ref` or non-token leaves in output.

### Migration plan (each step verifiable, each its own PR)

1. **Snapshot** (done): `config/tokens.golden.json` is the resolved `tokens.json` from before the migration, minus `$ref`. `src/tokens/golden.test.ts` fails on any difference and lists each changed path. `npm run tokens:golden` rewrites it from the current build. It lives outside `src/tokens/` because the build reads every JSON file there.
2. **Fix defects on v3 first** (done): remove `index.json` from `source`; delete dead transforms, formats, and the `styled-components` platform; drop `transforms` overrides so built-in groups run. Diff against the golden file — only the `$ref` keys should disappear.
3. **Normalise the component tier** (done) into tokens referencing semantic tokens. Diff: values must not change. Component spacing tokens are retired, not converted ([0022](../foundation/decisions/0022-no-component-spacing-tokens.md)). Done (3a Button and IconButton, 3b Chip, 3c Input, ProgressBar, Badge, Separator and Field): every component token is a real, described token that references semantic tokens, and `src/tokens/componentTier.test.ts` keeps it that way. Two exceptions remain until 3.0: Button's deprecated `emphasis` aliases reference the `accent` tokens they alias, and deprecated tokens keep their original raw values (such as `2px`), since nothing reads them. Input's `11px` and Chip's `2px` paddings stay as deprecated tokens until 3.0; [0034](../foundation/decisions/0034-control-heights.md) stopped components reading them.
4. **Upgrade to Style Dictionary 5** (done) and port the config to hooks, on the existing format. Diff: `tokens.json` byte-identical; `tokens.css` and `tokens.d.ts` lose their timestamps. Value transforms stay off (see §1). <!-- verify-docs-ignore: retired file, replaced by tokens.ts (#199) -->
5. **Convert to DTCG** (done): type names remapped, then `convertToDTCG` with `$type` moved to groups where uniform, and `usesDtcg: true`. Diff: `tokens.json` and `tokens.d.ts` byte-identical; `tokens.css` variables identical, each now followed by its `$description` as a comment. <!-- verify-docs-ignore: retired file, replaced by tokens.ts (#199) -->

   | Old type(s) | DTCG `$type` |
   |---|---|
   | `size`, `spacing`, `dimension`, `breakpoint`, `border-radius`/`borderRadius`, `border-width`/`borderWidth`, `font-size`/`fontSize`, `letter-spacing`/`letterSpacing`, `line-height`/`lineHeight` | `dimension` |
   | unitless line height (`base.lineHeight.none` = `1`, and the tokens that alias it: `semantic.lineHeight.none`, `component.badge.count.lineHeight`, `component.avatar.initials.lineHeight`), `opacity`, `z-index`/`zIndex` | `number` |
   | `font-family`/`fontFamily`, `font-weight`/`fontWeight`, `duration`, `color` | `fontFamily`, `fontWeight`, `duration`, `color` |
   | `cubic-bezier`/`easing`, `border-style` | `cubicBezier`, `strokeStyle` |
   | `box-shadow`/`boxShadow`, `border`, `transition`, `typography` | `shadow`, `border`, `transition`, `typography` |
   | `other` (four deprecated layout and behaviour tokens: IconButton's `display` and alignment, `input.disabled.cursor`) | `other`, not a DTCG type; removed in 3.0 |

   `src/tokens/dtcgTypes.test.ts` checks that every token has a type and that every alias has its target's type.

   **Values keep their current strings**, so they don't yet have the shapes DTCG 2025.10 specifies. Every `color`, `dimension` and `duration` is a CSS string (`#f8f9fa`, `0.125rem`, `150ms`), where DTCG specifies objects (`{ colorSpace, components }`, `{ value, unit }`). Beyond that: the composite types (`shadow`, `border`, `transition`, `typography`) are CSS shorthand strings, not objects; `number` and `fontWeight` values are strings (`"0"`, `"500"`); `cubicBezier` holds keywords and `cubic-bezier(…)` strings, not four-number arrays; and `base.spacing.auto` is `auto`. Converting them would change the published `tokens.json` strings, so it needs value transforms that keep the output identical. That's the composite-token work in the target above (item 4), checked against the golden file like every step.

   **`dimension` values that aren't a single `px` or `rem` length** (29 tokens), from mapping `size` and `spacing` wholesale:

   | Values | Tokens | Plan |
   |---|---|---|
   | Keywords: `auto`, `min-content`, `max-content`, `fit-content` | `base.size.auto`, `base.size.min`, `base.size.max`, `base.size.fit`; `base.spacing.auto`; `semantic.spacing.layout.auto` | **Open:** not lengths, so they don't fit DTCG `dimension`. Decide whether they stay as tokens, and with what type, before value transforms reach them |
   | Units DTCG doesn't allow (only `px` and `rem` are valid) | `base.size.full` (`100%`), `base.size.screen` (`100vh`) | **Open,** with the keywords |
   | Unitless zero (`0`) | `base.border.width.0`, `base.dimension.0` (which `semantic.radius.none` references), `semantic.border.radius.none`, `semantic.spacing.layout.none` | DTCG needs a unit even for zero. Convert to `{ value: 0, unit: 'px' }` when dimensions become objects, with an output transform that still writes `0`, so the published value doesn't change |
   | Multi-value shorthands (`0.75rem 1rem`, `2rem 0`) | 16 component padding and margin tokens: Button's and Chip's paddings and Separator's margins | Retired by [0022](../foundation/decisions/0022-no-component-spacing-tokens.md) and removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)), so they're dropped, not converted. Chip's small and medium paddings wait for [#129](https://github.com/common-origin/common-origin-design-system/issues/129) first |

Steps 4 and 5 were swapped on 2026-10-06 ([0023](../foundation/decisions/0023-upgrade-before-dtcg.md), amending 0017): Style Dictionary 3 can't read DTCG, and Style Dictionary 5 reads both formats.
6. **Add** `outputReferences` CSS, JSDoc types, token tests, and the CI freshness check. In parts: **6a** (done) the CI freshness check; **6b** (done) `tokens.css` published as `@common-origin/design-system/tokens.css`, with `--co-<tier>-<path>` names ([0024](../foundation/decisions/0024-css-variable-names-keep-tier.md)) and `outputReferences`, checked by `src/tokens/tokensCss.test.ts`. The entry ships a declaration (`tokens.css.d.ts`, `export {}`), so the side-effect import type-checks with `noUncheckedSideEffectImports`, and `verify:package` imports it in every resolution mode. Six semantic tokens hold literal values rather than referencing base (`elevation.inset`, `border.radius.none`, `color.background.overlay`, `hover-overlay`, `active-overlay`, `inverse-overlay`); giving them base aliases would mean new base tokens, which needs the owner's sign-off (0022). Then **6c** (done) descriptions for the 103 semantic tokens that had none, with `dtcgTypes.test.ts` requiring one on every semantic and component token, and a way for descriptions to reach the types people see: the generated `tokens.ts` ([#199](https://github.com/common-origin/common-origin-design-system/issues/199)).

At every step: `npm run build:tokens && npm run typecheck && npm test && npm run build:package`, plus a zero-diff check of resolved values against the golden file (`npm test` runs it) unless the PR intends a visual change.

---

## 5. Recipes

### Add a token
0. **Get the owner's sign-off first** ([0022](../foundation/decisions/0022-no-component-spacing-tokens.md)): the token's tier, value, use, and why no existing token does the job. Never a component spacing token.
1. Add it at the right tier with `$value`, a DTCG `$type` (on the token, or inherited from its group) and a `$description` of what it's for. Semantic and component tokens always need a description ([0014](../foundation/decisions/0014-token-tiers.md)).
2. Reference the tier below: semantic → base, component → semantic (never base; add the missing semantic token first). Add a component token only for a departure, a family or a variant or state matrix ([0014](../foundation/decisions/0014-token-tiers.md)). Otherwise use the semantic token directly.
3. `npm run build:tokens`, then `npx jest src/tokens/golden`. It fails and lists every resolved value that differs from the golden file: check it shows exactly your change.
4. `npm run tokens:golden` to accept it, then commit the source change, the regenerated outputs and `config/tokens.golden.json`.

### Check what a token resolves to
```bash
node -e "console.log(require('./src/styles/tokens.json').semantic.color.text.default)"
```

### Find hard-coded values that should be tokens
```bash
grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(|[0-9]+px|z-index:\s*[0-9]|[0-9]+m?s\b" src/components --include=*.tsx | grep -v "\.test\.\|\.docs\."
```
