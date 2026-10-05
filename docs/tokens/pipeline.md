# Token pipeline

How design tokens go from source JSON to what components, the docs site, and consumers use. This is the technical reference for anyone (human or agent) changing tokens or the Style Dictionary build. For *why* tokens are structured the way they are, see [P3](../foundation/principles.md#p3-tokens-not-values) and [decision 0009](../foundation/decisions/0009-styling-architecture.md).

Verified against the code on 2026-09-25.

---

## 1. Current pipeline (Style Dictionary 3.9.2)

```
src/tokens/{base,component,semantic}/index.json
        │  npm run build:tokens  →  node config/style-dictionary.config.js
        │  config/config.json: source = the three tier folders, listed in that order
        ▼
┌───────────────────┬──────────────────────────────┬───────────────────────────────┬───────────────────────────────────────┐
│ platform          │ output                       │ format                        │ used by                               │
├───────────────────┼──────────────────────────────┼───────────────────────────────┼───────────────────────────────────────┤
│ tokens            │ src/styles/tokens.json       │ json/nested (built-in)        │ every component; published in package │
│ typescript        │ src/styles/tokens.d.ts       │ typescript/nested-interface   │ Tokens* types exported from package   │
│                   │                              │ (custom)                      │                                       │
│ custom            │ src/styles/tokens.css        │ css/variables (built-in)      │ docs site only (pages/_app.tsx)       │
└───────────────────┴──────────────────────────────┴───────────────────────────────┴───────────────────────────────────────┘
```

- Components import `src/styles/tokens.json` directly and interpolate **resolved values** into styled-components. There are no CSS custom properties at component level.
- The package publishes `tokens.json` (inside the JS bundle and as `dist/styles/tokens.json`) and a tokens-only entry (`@common-origin/design-system/tokens`).
- `tokens.css` and `tokens.d.ts` are committed even though `.gitignore` lists them. Every build rewrites their "Generated on" timestamp.

### Token tiers

| Tier | File | Convention today |
|---|---|---|
| Base | `src/tokens/base/index.json` | Raw values, `{ "value", "type" }`. 17 types, kebab-case (`border-radius`, `font-size`, `box-shadow`, `z-index`, …) |
| Semantic | `src/tokens/semantic/index.json` | References to base, `{ "value", "type", "description"? }`. 14 types, **camelCase** (`boxShadow`, `borderRadius`, `zIndex`, `fontWeight`, `fontFamily`, `fontSize`, `lineHeight`, `letterSpacing`) plus `color`, `spacing`, `typography`, `transition`, `border`, `size` |
| Component | `src/tokens/component/index.json` | Real tokens, `{ "value", "type", "description" }`, referencing **semantic** tokens only, apart from Button's deprecated `emphasis` aliases, which reference `accent` until 3.0 (step 3 of [#24](https://github.com/common-origin/common-origin-design-system/issues/24)). No spacing tokens ([0022](../foundation/decisions/0022-no-component-spacing-tokens.md)): the old ones stay, marked `Deprecated`, until 3.0. The only raw px still read are IconButton's sizes, Input's `11px` and Chip's `2px`, waiting for [#129](https://github.com/common-origin/common-origin-design-system/issues/129). Deprecated tokens that nothing reads, such as the `2px` focus offsets, also keep their raw values until 3.0 |

**Which tier a component uses** ([decision 0014](../foundation/decisions/0014-token-tiers.md)):
- Components never use base tokens.
- Components use semantic tokens by default.
- Component tokens exist only for departures from the semantic tier, decisions shared by a family (for example `component.badge`, `component.input`), and variant or state matrices.
- Component tokens reference semantic tokens, never base tokens, and hold design decisions only, never layout mechanics.
- Sizes: roles that several components share are semantic (`size.touchTarget`, `size.overlay.sm/md/lg`, `size.menu.maxHeight`). A size unique to one component is a component token (for example `component.emptyState.illustration.small`) that references `semantic.size.dimension.<step>`, a scale keyed like `base.size` (0.25rem steps) with only the steps in use.
- Typography parts come from small named semantic scales, which hold only the steps components use: `fontFamily` (body, monospace), `fontSize` (xs–xl), `lineHeight` (none, tight, normal), `letterSpacing` (wide) and `fontWeight`. A component that departs from a typography style, such as Alert's title, combines the style with these parts through its component tokens.

An ESLint rule (`no-restricted-syntax` in `eslint.config.mjs`) fails the lint if a component in `src/components` uses `tokens.base` or destructures `base` from `tokens`. The one exception is `GridSystem`: its `gap*` props are typed as base spacing keys (public API), so it looks them up in `base.spacing` until those props accept semantic keys.

`src/tokens/componentTier.test.ts` keeps the component tier to these rules, and fails if anything reads a retired token.

Values are strings. There are no object-valued (composite) tokens and no arithmetic expressions. Typography is a CSS `font` shorthand string (`"700 3rem/3rem 'Inter', sans-serif"`); shadows are CSS strings.

### How the config actually behaves

`config/style-dictionary.config.js` registers one custom format (`typescript/nested-interface`), then calls `sd.buildAllPlatforms()` (v3 synchronous API, `StyleDictionary.extend(config)`). It registers no custom transforms.

Each platform uses a built-in transform group: `js` for `tokens` and `typescript`, `css` for `custom`. The groups' value transforms (`size/rem`, `color/hex`, `color/css`, `time/seconds`, `content/icon`) match on a token's category, which `attribute/cti` takes from the first path segment. Here that's always `base`, `semantic` or `component`, so none of them match, and values pass through unchanged. `name/cti/kebab` in the `css` group produces the CSS variable names (`--semantic-color-text-default`).

Until step 2 of the migration ([#24](https://github.com/common-origin/common-origin-design-system/issues/24)), every platform also set `transforms`, which in v3 replaces the group, so only ten custom transforms ran. All but the CSS name transform were no-ops or dead code, and they were deleted with the unused `styled-components` platform, its output and the unused formats.

In practice the build **resolves references and writes files**; no value is transformed.

---

## 2. Known defects

| # | Defect | Consequence |
|---|---|---|
| 1 | ~~An `index.json` of `$ref` pointers in `src/tokens/` matches the `source` glob. Style Dictionary doesn't understand `$ref`, so it merges the keys as data~~ | Fixed in step 2 of [#24](https://github.com/common-origin/common-origin-design-system/issues/24): the index is deleted and `source` lists the tier folders. The `$ref` keys no longer reach `tokens.json` or the package (a fix in a minor, decision 0017) |
| 2 | ~~Component tier is mostly not made of tokens~~ | Fixed in step 3 of #24: every component leaf is a real token with a type and a description |
| 3 | ~~Component tokens reference base tokens directly~~ | Fixed in step 3 of #24: component tokens reference semantic tokens only, checked by `componentTier.test.ts` |
| 4 | Type names are inconsistent (kebab in base, camel in semantic) and don't match the transforms' filters | Transforms silently skip tokens; types carry no reliable meaning |
| 5 | ~~`transformGroup` + `transforms` on every platform~~ | Fixed in step 2 of #24: the platforms use the built-in groups alone |
| 6 | ~~Latent bugs in custom transforms (implicit globals that throw in ESM strict mode, broken `includes` and precedence logic)~~ | Fixed in step 2 of #24: the custom transforms are deleted |
| 7 | `description` fields are dropped from every output | Designers, developers and agents can't see a token's intended use outside the source |
| 8 | Timestamped headers | Every build dirties the working tree |
| 9 | ~~The `styled-components` platform's output generated but unused~~ | Fixed in step 2 of #24: the platform and its output are deleted |
| 10 | ~~Docs drift: `.github/TOKEN_MANAGEMENT.md` showed a different, CommonJS config with transforms and outputs that don't exist here~~ | Fixed in [#37](https://github.com/common-origin/common-origin-design-system/issues/37): the guide no longer describes the build and defers to this document |

---

## 3. Style Dictionary v4/v5 — what an expert needs to know

Current release: **5.5.5** (ESM only, Node ≥ 22; this repo pins Node 22).

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

1. **Style Dictionary 5**, ESM config in `config/style-dictionary.config.mjs`, `log.warnings: 'error'`. <!-- verify-docs-ignore: planned file -->
2. **DTCG source**: `$value` / `$type` / `$description`, DTCG type names, `$type` on groups where uniform. (The `$ref` index file was deleted in step 2.)
3. **Component tier made of real tokens** referencing **semantic** tokens (add missing semantic tokens first); no raw `px`.
4. **Composite tokens where it helps**: typography, shadow, border, and transition as DTCG objects, emitted with the built-in `*/css/shorthand` transforms, so the JSON output keeps the same hierarchy and values for components.
5. **Outputs**
   - `tokens.json` — same token hierarchy and resolved values as today (components keep working unchanged), except the stray `$ref` keys, which step 2 removes. The golden file excludes them.
   - `tokens.css` — **published in the package** as `@common-origin/design-system/tokens.css` for CSS-variable consumers, every variable prefixed `co-` (for example `--co-color-text-default`), with `outputReferences: true` so semantic variables reference base variables. The variable names become a published contract (P7). This keeps the door open for theming (decision 0009); dark mode stays out of scope.
   - `tokens.d.ts` — generated with each token's `$description` as JSDoc, so editors and agents see intended use (supports #22).
   - (The unused `styled-components` output and the custom transforms and formats were dropped in step 2.)
6. **Deterministic output** (no timestamps). Generated files (`tokens.json`, `tokens.d.ts`, `tokens.css`) **stay committed**, so fresh clones and editors work without a build step, and a CI check fails when they don't match the source.
7. **Token tests** in Jest: every token has a DTCG `$type`; every semantic token has a `$description`; component tokens reference only semantic tokens; no `$ref` or non-token leaves in output.

### Migration plan (each step verifiable, each its own PR)

1. **Snapshot** (done): `config/tokens.golden.json` is the resolved `tokens.json` from before the migration, minus `$ref`. `src/tokens/golden.test.ts` fails on any difference and lists each changed path. `npm run tokens:golden` rewrites it from the current build. It lives outside `src/tokens/` because the build reads every JSON file there.
2. **Fix defects on v3 first** (done): remove `index.json` from `source`; delete dead transforms, formats, and the `styled-components` platform; drop `transforms` overrides so built-in groups run. Diff against the golden file — only the `$ref` keys should disappear.
3. **Normalise the component tier** (done) into tokens referencing semantic tokens. Diff: values must not change. Component spacing tokens are retired, not converted ([0022](../foundation/decisions/0022-no-component-spacing-tokens.md)). Done (3a Button and IconButton, 3b Chip, 3c Input, ProgressBar, Badge, Separator and Field): every component token is a real, described token that references semantic tokens, and `src/tokens/componentTier.test.ts` keeps it that way. Two exceptions remain until 3.0: Button's deprecated `emphasis` aliases reference the `accent` tokens they alias, and deprecated tokens keep their original raw values (such as `2px`), since nothing reads them except the two waiting for #129. Input's `11px` and Chip's `2px` paddings stay as deprecated tokens until [#129](https://github.com/common-origin/common-origin-design-system/issues/129).
4. **Convert to DTCG** (`convertJSONToDTCG`), then remap type names. Diff.
5. **Upgrade to Style Dictionary 5** and port the config to hooks. Diff.
6. **Add** `outputReferences` CSS, JSDoc types, token tests, and the CI freshness check.

At every step: `npm run build:tokens && npm run typecheck && npm test && npm run build:package`, plus a zero-diff check of resolved values against the golden file (`npm test` runs it) unless the PR intends a visual change.

---

## 5. Recipes

### Add a token (today, v3)
0. **Get the owner's sign-off first** ([0022](../foundation/decisions/0022-no-component-spacing-tokens.md)): the token's tier, value, use, and why no existing token does the job. Never a component spacing token.
1. Add it at the right tier with `value`, `type` (match the tier's existing type naming), and a `description` of what it's for. Semantic and component tokens always need a description ([0014](../foundation/decisions/0014-token-tiers.md)).
2. Reference the tier below: semantic → base, component → semantic (never base; add the missing semantic token first). Add a component token only for a departure, a family or a variant or state matrix ([0014](../foundation/decisions/0014-token-tiers.md)). Otherwise use the semantic token directly.
3. `npm run build:tokens`, then `npx jest src/tokens/golden`. It fails and lists every resolved value that differs from the golden file: check it shows exactly your change.
4. `npm run tokens:golden` to accept it, then commit the source change, the regenerated outputs and `config/tokens.golden.json`, but not unrelated timestamp-only changes.

### Check what a token resolves to
```bash
node -e "console.log(require('./src/styles/tokens.json').semantic.color.text.default)"
```

### Find hard-coded values that should be tokens
```bash
grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(|[0-9]+px|z-index:\s*[0-9]|[0-9]+m?s\b" src/components --include=*.tsx | grep -v "\.test\.\|\.docs\."
```
