#!/usr/bin/env node

/**
 * Pre-publish check for React Server Components support (see rollup.config.mjs):
 * - the CommonJS component chunk, and every ESM component and lib module (decision 0042), starts
 *   with 'use client', so components render from Server Components
 * - the entries, the data and the tokens don't, so `tokens` and `iconsData` stay plain data that
 *   Server Components can read
 */

const { existsSync, readdirSync, readFileSync, statSync } = require('fs')
const { join, relative } = require('path')

const DIST = join(__dirname, '..', 'dist')
const USE_CLIENT = /^\s*['"]use client['"]/

const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((name) => {
        const path = join(dir, name)
        return statSync(path).isDirectory() ? walk(path) : path.endsWith('.mjs') ? [path] : []
      })
    : []

const esmModules = walk(DIST).map((path) => relative(DIST, path))
const isClientModule = (file) => /^(components|lib)\//.test(file)

const CLIENT = ['client.js', ...esmModules.filter(isClientModule)]
const SERVER = [
  'index.js',
  'index.mjs',
  'data.js',
  'tokens/index.js',
  'tokens/index.mjs',
  ...esmModules.filter((file) => /^(styles|types)\//.test(file)),
]

const problems = []
if (esmModules.filter(isClientModule).length === 0) problems.push('no ESM component modules found (run npm run build:package first)')
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

console.log(`✅ Component modules start with 'use client' (${CLIENT.length}); entries, data and tokens don't (${SERVER.length})`)
