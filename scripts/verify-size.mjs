#!/usr/bin/env node

/**
 * Pre-publish size check (decision 0042): bundles a consumer that imports only Button from the
 * built ESM, as a consumer's bundler would (tree-shaking, honouring package.json "sideEffects"),
 * and fails if it grows past the budget. On 2.19.0, before per-module ESM, Button alone cost
 * 78.3 KB gzipped (71% of the package); per-module ESM brought it to about 35 KB.
 *
 * Most of what's left is data: every icon (Icon looks them up by name) and the token object.
 * Shrinking icons is research in #253; lower the budget when it lands.
 */

import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { gzipSync } from 'zlib'
import { rollup } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ENTRY = join(ROOT, 'dist', 'index.mjs')
const BUDGET_KB = 40

if (!existsSync(ENTRY)) {
  console.error('❌ dist/index.mjs not found. Run npm run build:package first.')
  process.exit(1)
}

const consumer = '\0consumer'
const bundle = await rollup({
  input: consumer,
  external: (id) => /^(react|react-dom|styled-components|date-fns)(\/|$)/.test(id),
  plugins: [
    { name: 'consumer', resolveId: (id) => (id === consumer ? id : null), load: (id) => (id === consumer ? `export { Button } from ${JSON.stringify(ENTRY)}` : null) },
    resolve({ browser: true }),
    commonjs(),
    json(),
  ],
  onwarn: () => {},
})
const { output } = await bundle.generate({ format: 'esm' })
const code = output.filter((chunk) => chunk.type === 'chunk').map((chunk) => chunk.code).join('\n')
const kb = gzipSync(code).length / 1024

if (kb > BUDGET_KB) {
  console.error(`❌ A Button-only consumer bundle is ${kb.toFixed(1)} KB gzipped, over the ${BUDGET_KB} KB budget.`)
  console.error('   Something made the ESM build harder to tree-shake (a side effect, a shared import, sideEffects in package.json).')
  process.exit(1)
}

console.log(`✅ A Button-only consumer bundle is ${kb.toFixed(1)} KB gzipped (budget ${BUDGET_KB} KB; 78.3 KB on 2.19.0)`)
