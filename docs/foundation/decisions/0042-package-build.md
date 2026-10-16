# 0042. Package build: per-module ESM that tree-shakes and loads in Node

- **Status:** Proposed
- **Date:** 2026-10-17
- **Decided by:** Ollie (owner), pending
- **Principles:** P7, P8
- **Issue:** [#237](https://github.com/common-origin/common-origin-design-system/issues/237)

## Context

Rollup 3 builds the package as two bundles, CommonJS (`dist/*.js`) and ESM (`dist/*.esm.js`), each with a `client` chunk holding every component, a `data` chunk (tokens and icons) and a small index. The package sets no `sideEffects`. Measured on 2.19.0 on 2026-10-17, bundling a consumer with Rollup and node-resolve (gzipped, unminified):

| Consumer imports | Size |
|---|---|
| `Button` only | 78.3 KB |
| everything | 110.7 KB |
| `tokens` only | 6.1 KB |

**Tree-shaking barely works:** one Button costs 71% of the whole package.

The ESM build is also wrong for Node's own loader:

- The `.esm.js` files are ESM in `.js` files, with no `"type": "module"`, so Node reads them as CommonJS. `attw` reports *Unexpected module syntax* for node16-from-ESM, which `verify:package` currently ignores (`--ignore-rules unexpected-module-syntax`).
- **Native Node ESM crashes.** `import { Button } from '@common-origin/design-system'` fails with *Cannot read properties of undefined (reading 'withConfig')*. styled-components (6.5 and 6.6 alike) has no `exports` map or ESM entry for Node, so Node's loader hands a default import the CommonJS module object, with the `styled` function on its default property; bundlers hand over the function. This affects any plain-Node ESM server render, such as Vite's dev server rendering, which loads dependencies through Node. It's listed under Known issues in [usage](../usage.md).

A reverted prototype on the same code measured the fixes:

- **Per-module ESM** (`preserveModules`, `.mjs` files beside the CommonJS build), **`"sideEffects": ["*.css"]`**, and babel-plugin-styled-components' **`pure: true`** (marks each `styled()` call removable): importing only `Button` drops from **78.3 KB to 34.6 KB (−56%)**.
- **One line normalises the styled default import** in the ESM output (`const styled = module.default || module`). With it, `Button` server-renders under native Node ESM, and CommonJS is unchanged.
- **Types and checks:** consumer type checks pass in node16-ESM and bundler resolution; `verify:types` and `verify:no-nextjs` pass.

What's left for the real build, all found by the prototype:

- **Types:** `attw` flags the `.mjs` entry as *Masquerading as CJS* until it has .d.mts declarations.
- **The `./tokens` entry** needs the same `.mjs` move.
- **Bundled `tslib` helpers** land under `dist/node_modules/`, which `npm pack` silently drops, so they move to `dist/vendor/`.
- **`verify:directives`** names the old files.
- **Importing everything grows** from 110.7 to 133.8 KB, unminified. This is to be measured minified before release.

The largest cost left in a Button-only bundle is data, not code: `icons.json` (62 KB raw, every icon, because Icon looks icons up by name at run time) and `tokens.json` (29 KB).

## Decision (proposed)

1. **ESM ships per module as `.mjs`**, with .d.mts declarations for the `import` condition, for both `.` and `./tokens`. CommonJS stays as it is (`.js`, bundled).
2. **The package declares `"sideEffects": ["*.css"]`**, and the build marks `styled()` calls pure.
3. **The ESM output normalises styled-components' default import**, so native Node ESM works. The `attw` ignore and the Known issues entry go.
4. **Rollup stays.** tsdown and Rollup 4 were considered: neither is needed for these fixes, and changing the build tool is a separate risk. Revisit with styled-components v7.
5. **Ships in a 2.x minor, not 3.0.** The `exports` map already blocks deep imports, so the public entry points (`.`, `./tokens`, `./tokens.css`) keep their names. Only the files behind them change, plus a fix for Node ESM. Release only after consumer smoke tests: a Next.js App Router app (`'use client'` per module), a Vite app with server rendering, and CommonJS `require`.
6. **Icon data is a separate question.** Shrinking it means icons a bundler can see (for example one module per icon, or imported icon components), which changes how `iconName` works. That's research for its own issue, not this build change.

## Consequences

- Follow-up issue: implement 1–3, including .d.mts generation, the `vendor/` helper path, updated `verify:*` scripts, removing the `attw` ignore, a native-Node-ESM render in `verify:load`, a bundle-size check for a Button-only consumer, and the three consumer smoke tests.
- Follow-up research: icon data that tree-shakes, weighed against keeping `iconName` strings.
- 3.0 no longer needs the build change, so it stays the deprecation removals ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)) and [#224](https://github.com/common-origin/common-origin-design-system/issues/224).
