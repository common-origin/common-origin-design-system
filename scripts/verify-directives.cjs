#!/usr/bin/env node

/**
 * Pre-publish check for React Server Components support (see rollup.config.mjs):
 * - the component chunk starts with 'use client', so components render from Server Components
 * - the entry, data and tokens bundles don't, so `tokens` and `iconsData` stay plain data
 *   that Server Components can read
 */

const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const DIST = join(__dirname, '..', 'dist')
const CLIENT = ['client.js', 'client.esm.js']
const SERVER = ['index.js', 'index.esm.js', 'data.js', 'data.esm.js', 'tokens/index.js', 'tokens/index.esm.js']
const USE_CLIENT = /^\s*['"]use client['"]/

const problems = []
for (const file of [...CLIENT, ...SERVER]) {
  const path = join(DIST, file)
  if (!existsSync(path)) {
    problems.push(`dist/${file}: not found (run npm run build:package first)`)
    continue
  }
  const hasDirective = USE_CLIENT.test(readFileSync(path, 'utf8'))
  if (CLIENT.includes(file) && !hasDirective) problems.push(`dist/${file}: must start with 'use client'`)
  if (SERVER.includes(file) && hasDirective) problems.push(`dist/${file}: must not start with 'use client' (it must stay usable as data in Server Components)`)
}

if (problems.length) {
  console.error(`❌ Directive verification failed:\n`)
  problems.forEach((p) => console.error(`  - ${p}`))
  process.exit(1)
}

console.log("✅ Component chunks start with 'use client'; entry, data and tokens bundles don't")
