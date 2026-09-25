# Bundle Optimization & Distribution Guide

## Overview

This guide documents the **current** bundle/distribution setup for `@common-origin/design-system` and practical optimization steps that fit this repository.

## Current Distribution (Source of Truth)

The package currently publishes from `dist/` with these `package.json` fields:

```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    },
    "./tokens": {
      "types": "./dist/tokens/tokens.d.ts",
      "import": "./dist/tokens/index.esm.js",
      "require": "./dist/tokens/index.js"
    }
  },
  "typesVersions": { "*": { "tokens": ["./dist/tokens/tokens.d.ts"] } },
  "files": ["dist/", "README.md"]
}
```

## Build Pipeline

### Commands in this repo

```bash
npm run build:tokens   # Generate token artifacts
npm run build:package  # Build distributable package (rollup)
npm run typecheck      # Type check source
npm run verify:types   # Validate generated type output
npm run verify:no-nextjs
npm run verify:consumer  # consumer type-check across module-resolution modes
npm run verify:package   # all of the above plus publint and attw
```

### Publish checks

`prepublishOnly` runs:

```bash
npm run build:tokens && npm run build:package && npm run verify:package
```

That means local `npm publish` and CI publishing both validate package artifacts before publishing.

## Release Automation

- Tag push matching `v*.*.*` triggers `.github/workflows/publish.yml`
- Publish workflow installs deps, type checks, builds package, then publishes with provenance
- `CHANGELOG.md` is updated in the version-bump PR by the `version` script (`auto-changelog -p`); there is no post-release changelog workflow

## Peer Dependencies

Current peer ranges:

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "styled-components": "^6.0.0"
}
```

## Consumer Installation

```bash
npm install @common-origin/design-system react react-dom styled-components
```

## Bundle Optimization Recommendations

1. Keep `exports` explicit and stable; avoid deep-import reliance.
2. Preserve side-effect-safe component modules (avoid global side effects in component entry files).
3. Keep token output slim; avoid shipping duplicate token formats unless required.
4. Prefer explicit named exports in public entry points to help consumers tree-shake effectively.
5. Run `npm run build:package` before release and inspect `dist/` size changes for regressions.

## Size Tracking (Practical)

A lightweight way to track release size changes:

```bash
du -sh dist
find dist -type f -name "*.js" -o -name "*.d.ts" | xargs ls -lh
```

For deeper analysis, add optional tooling (`rollup-plugin-visualizer`) in a temporary analysis branch, then remove it if not needed for CI.

## Upgrade Guidance for Consumers

```bash
# Upgrade to latest
npm install @common-origin/design-system@latest

# Verify installed version
npm ls @common-origin/design-system
```

If consumers use strict lockfiles, remind them to update lockfiles in the same PR as component adoption changes.
