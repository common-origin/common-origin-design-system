#!/usr/bin/env node

/**
 * Pre-publish check that the package is framework-agnostic and contains no docs-site code:
 * - no Next.js imports in any built JS file
 * - no docs-site folders (page-components, patterns) anywhere in dist/
 * - every package the built JS imports is a declared dependency or peer dependency
 */

const { existsSync, readdirSync, readFileSync, statSync } = require('fs')
const { join, relative } = require('path')

const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const pkg = require(join(ROOT, 'package.json'))
const declaredPackages = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
])
const SITE_ONLY_DIRS = ['page-components', 'patterns']

if (!existsSync(join(DIST, 'index.js'))) {
  console.error('❌ dist/index.js not found. Run npm run build:package first.')
  process.exit(1)
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? [path, ...walk(path)] : [path]
  })

const paths = walk(DIST)
const problems = []

for (const path of paths) {
  const rel = relative(DIST, path)
  if (SITE_ONLY_DIRS.some((dir) => rel.split(/[\\/]/).includes(dir))) {
    if (statSync(path).isDirectory()) problems.push(`dist/${rel}/: docs-site code in the package`)
  }
}

const IMPORT = /(?:\bfrom\s+|\brequire\(\s*|\bimport\(\s*)['"]([^'"]+)['"]/g
const packageName = (spec) => (spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0])

for (const path of paths.filter((p) => /\.(c|m)?js$/.test(p))) {
  const source = readFileSync(path, 'utf8')
  for (const [, spec] of source.matchAll(IMPORT)) {
    if (spec.startsWith('.')) continue
    const name = packageName(spec)
    const where = `dist/${relative(DIST, path)}`
    if (name === 'next') problems.push(`${where}: imports "${spec}" (components must be framework-agnostic)`)
    else if (!declaredPackages.has(name)) problems.push(`${where}: imports "${spec}", which is not a dependency or peer dependency`)
  }
}

if (problems.length) {
  console.error(`❌ Package content verification failed (${problems.length} problem${problems.length === 1 ? '' : 's'}):\n`)
  ;[...new Set(problems)].forEach((p) => console.error(`  - ${p}`))
  console.error('\nPackage components must not import Next.js or docs-site code (src/page-components, src/patterns).\n')
  process.exit(1)
}

console.log('✅ No Next.js imports, no docs-site code, and every imported package is declared')
