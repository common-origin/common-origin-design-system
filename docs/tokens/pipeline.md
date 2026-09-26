# Token pipeline

How design tokens go from source JSON to what components, the docs site, and consumers use. This is the technical reference for anyone (human or agent) changing tokens or the Style Dictionary build. For *why* tokens are structured the way they are, see [P3](../foundation/principles.md#p3-tokens-not-values) and [decision 0009](../foundation/decisions/0009-styling-architecture.md).

Verified against the code on 2026-09-25.

---

## 1. Current pipeline (Style Dictionary 3.9.2)

```
src/tokens/{base,semantic,component}/index.json   (+ src/tokens/index.json)
        │  npm run build:tokens  →  node config/style-dictionary.config.js
        │  config/config.json: source = src/tokens/**/*.json
        ▼
┌───────────────────┬──────────────────────────────┬───────────────────────────────┬───────────────────────────────────────┐
│ platform          │ output                       │ format                        │ used by                               │
├───────────────────┼──────────────────────────────┼───────────────────────────────┼───────────────────────────────────────┤
│ tokens            │ src/styles/tokens.json       │ json/nested (built-in)        │ every component; published in package │
│ typescript        │ src/styles/tokens.d.ts       │ typescript/nested-interface   │ Tokens* types exported from package   │
│                   │                              │ (custom)                      │                                       │
│ custom            │ src/styles/tokens.css        │ css/variables (built-in)      │ docs site only (pages/_app.tsx)       │
│ styled-components │ lib/tokens.js                │ javascript/styled-components  │ nothing (dead output)                 │
│                   │                              │ (custom)                      │                                       │
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
| Component | `src/tokens/component/index.json` | **Mostly not tokens.** Plain key/value strings such as `"backgroundColor": "{base.color.neutral.900}"`, with no `value`/`type` wrapper. Only 6 leaves are real tokens. Many reference **base** tokens directly, and 17 values hard-code `px` (focus outline offsets, chip padding, icon-button sizes, input padding) |

**Which tier a component uses** ([decision 0014](../foundation/decisions/0014-token-tiers.md)):
- Components never use base tokens.
- Components use semantic tokens by default.
- Component tokens exist only for departures from the semantic tier, decisions shared by a family (for example `component.badge`, `component.input`), and variant or state matrices.
- Component tokens reference semantic tokens, never base tokens, and hold design decisions only, never layout mechanics.
- Sizes: roles that several components share are semantic (`size.touchTarget`, `size.overlay.sm/md/lg`, `size.menu.maxHeight`). A size unique to one component is a component token (for example `component.emptyState.illustration.small`) that references `semantic.size.dimension.<step>`, a scale keyed like `base.size` (0.25rem steps) with only the steps in use.
- Typography parts come from small named semantic scales, which hold only the steps components use: `fontFamily` (body, monospace), `fontSize` (xs–xl), `lineHeight` (none, tight, normal), `letterSpacing` (wide) and `fontWeight`. A component that departs from a typography style, such as Alert's title, combines the style with these parts through its component tokens.

An ESLint rule (`no-restricted-syntax` in `eslint.config.mjs`) fails the lint if a component in `src/components` uses `tokens.base` or destructures `base` from `tokens`. The one exception is `GridSystem`: its `gap*` props are typed as base spacing keys (public API), so it looks them up in `base.spacing` until those props accept semantic keys.

The table above describes the component tier's state before 0014; it is being cleaned up with #24.

Values are strings. There are no object-valued (composite) tokens and no arithmetic expressions. Typography is a CSS `font` shorthand string (`"700 3rem/3rem 'Inter', sans-serif"`); shadows are CSS strings.

### How the config actually behaves

`config/style-dictionary.config.js` registers 10 transforms and 3 formats, then calls `sd.buildAllPlatforms()` (v3 synchronous API, `StyleDictionary.extend(config)`).

**Every platform sets both `transformGroup` and `transforms`. In v3, `transforms` replaces the group entirely** (`lib/transform/config.js`: `if (transforms) … else if (transformGroup)`), so none of the built-in `js` or `css` transforms run. Only the listed custom transforms apply:

| Custom transform | Platforms | Tokens it matches | Effect |
|---|---|---|---|
| `nameFormatter` | custom (CSS) | all | Kebab-case CSS variable names — the only transform doing real work |
| `jsCalculationFormatter` | tokens, typescript, styled-components | 58 of 439 | None: no token contains arithmetic |
| `calculationFormatter` | custom | 64 | None: no arithmetic or object values |
| `boxShadowValueFormatter` | all four | 6 (semantic `boxShadow` only; base uses `box-shadow`) | None: values are already strings |
| `pxToRemConverter`, `baseToken` | custom | 0 (no `sizing` type exists) | None |
| `valueKeyFormatter`, `typographyFormatter`, `typographyNameFormatter`, `responsiveFormatter`, `colorWithOpacity`, format `css/utilities` | not used by any platform | — | Dead code |

In practice the build **resolves references and writes files**; no value is transformed.

---

## 2. Known defects

| # | Defect | Consequence |
|---|---|---|
| 1 | `src/tokens/index.json` (a `$ref` index) matches the `source` glob. Style Dictionary doesn't understand `$ref`, so it merges the keys as data | `"$ref": "./base/index.json"` etc. leak into `tokens.json`, the published package, and the exported `tokens` type |
| 2 | Component tier is mostly not made of tokens (only the 6 badge entries are) | Button, chip, input and the rest get no CSS variables, no `type`, no transforms, no descriptions. **Breaks on Style Dictionary v5**, which only resolves references inside real token leaves |
| 3 | Component tokens reference base tokens directly | Violates the tier rule (component → semantic → base) and P3 |
| 4 | Type names are inconsistent (kebab in base, camel in semantic) and don't match the transforms' filters | Transforms silently skip tokens; types carry no reliable meaning |
| 5 | `transformGroup` + `transforms` on every platform | Built-in transforms never run; CSS values get no built-in normalisation |
| 6 | Latent bugs in custom transforms: implicit globals (`objValue`, `result`) that throw in ESM strict mode; `includes(' * ' \|\| ' - ' …)` only checks `' * '`; `a && b && c \|\| d` precedence in `calculationFormatter` | Invisible today because the branches never run; would fail the moment a token uses arithmetic or an object value |
| 7 | `description` fields are dropped from every output | Designers, developers and agents can't see a token's intended use outside the source |
| 8 | Timestamped headers | Every build dirties the working tree |
| 9 | `lib/tokens.js` (and a stale copy at `src/lib/tokens.js`) generated but unused | Dead output and confusion |
| 10 | Docs drift: `.github/TOKEN_MANAGEMENT.md` shows a different, CommonJS config with transforms and outputs that don't exist here | Following it would break the build |

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

## 4. Target architecture (proposed — needs a decision record and owner approval)

Build config, dependency, and token-structure changes need human approval (`.github/MAIN_INSTRUCTIONS.md`, "Change Authority & Validation Protocol"), and a change to the build and distribution approach needs a decision record ([decision 0001](../foundation/decisions/0001-record-decisions.md)). This is the recommended direction, not current fact.

1. **Style Dictionary 5**, ESM config in `config/style-dictionary.config.mjs`, `log.warnings: 'error'`.
2. **DTCG source**: `$value` / `$type` / `$description`, DTCG type names, `$type` on groups where uniform. Delete `src/tokens/index.json`.
3. **Component tier made of real tokens** referencing **semantic** tokens (add missing semantic tokens first); no raw `px`.
4. **Composite tokens where it helps**: typography, shadow, border, and transition as DTCG objects, emitted with the built-in `*/css/shorthand` transforms, so JSON output stays the same shape for components.
5. **Outputs**
   - `tokens.json` — resolved values, same shape as today (components keep working unchanged).
   - `tokens.css` — `outputReferences: true`, so semantic variables reference base variables. This is the foundation for theming and dark mode (decision 0009) and can be published for CSS-variable consumers.
   - `tokens.d.ts` — generated with each token's `$description` as JSDoc, so editors and agents see intended use (supports #22).
   - Drop `lib/tokens.js` and the unused custom transforms and formats.
6. **Deterministic output** (no timestamps). Treat generated files as build artifacts: either stop committing them or add a CI check that they're up to date.
7. **Token tests** in Jest: every token has a DTCG `$type`; every semantic token has a `$description`; component tokens reference only semantic tokens; no `$ref` or non-token leaves in output.

### Migration plan (each step verifiable, each its own PR)

1. **Snapshot**: commit a golden copy of today's resolved `tokens.json` (minus `$ref`) for diffing.
2. **Fix defects on v3 first**: remove `index.json` from `source`; delete dead transforms, formats, and the `styled-components` platform; drop `transforms` overrides so built-in groups run. Diff against the golden file — only the `$ref` keys should disappear.
3. **Normalise the component tier** into tokens referencing semantic tokens. Diff: values must not change.
4. **Convert to DTCG** (`convertJSONToDTCG`), then remap type names. Diff.
5. **Upgrade to Style Dictionary 5** and port the config to hooks. Diff.
6. **Add** `outputReferences` CSS, JSDoc types, token tests, and the CI freshness check.

At every step: `npm run build:tokens && npm run typecheck && npm test && npm run build:package`, plus a zero-diff check of resolved values against the golden file unless the PR intends a visual change.

---

## 5. Recipes

### Add a token (today, v3)
1. Add it at the right tier with `value`, `type` (match the tier's existing type naming), and a `description` of what it's for. Semantic and component tokens always need a description ([0014](../foundation/decisions/0014-token-tiers.md)).
2. Reference the tier below: semantic → base, component → semantic (never base; add the missing semantic token first). Add a component token only for a departure, a family or a variant or state matrix ([0014](../foundation/decisions/0014-token-tiers.md)). Otherwise use the semantic token directly.
3. `npm run build:tokens`, then check `src/styles/tokens.json` for the resolved value.
4. Commit the source change and regenerated outputs, but not unrelated timestamp-only changes.

### Check what a token resolves to
```bash
node -e "console.log(require('./src/styles/tokens.json').semantic.color.text.default)"
```

### Find hard-coded values that should be tokens
```bash
grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(|[0-9]+px|z-index:\s*[0-9]|[0-9]+m?s\b" src/components --include=*.tsx | grep -v "\.test\.\|\.docs\."
```
