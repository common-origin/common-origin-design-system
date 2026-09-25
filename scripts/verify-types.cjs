#!/usr/bin/env node

/**
 * Pre-publish check: every module specifier in dist/**\/*.d.ts must resolve for consumers.
 * Fails on path aliases, JSON imports, relative imports to files that aren't shipped,
 * and packages that aren't declared dependencies or peer dependencies.
 */

const { existsSync, readdirSync, readFileSync, statSync } = require('fs')
const { join, dirname, relative, resolve } = require('path')

const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const pkg = require(join(ROOT, 'package.json'))
const declaredPackages = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
])

if (!existsSync(DIST)) {
  console.error('❌ dist/ not found. Run npm run build:package first.')
  process.exit(1)
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.d.ts') ? [path] : []
  })

const SPECIFIER = /(?:\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)['"]([^'"]+)['"]/g

const packageName = (spec) => (spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0])

const resolvesRelative = (fromFile, spec) => {
  const base = resolve(dirname(fromFile), spec.replace(/\.js$/, ''))
  return [`${base}.d.ts`, join(base, 'index.d.ts'), base].some((p) => existsSync(p) && p.endsWith('.d.ts'))
}

const problems = []
const files = walk(DIST)

if (!files.includes(join(DIST, 'index.d.ts'))) {
  console.error('❌ dist/index.d.ts not found. Run npm run build:package first.')
  process.exit(1)
}

for (const file of files) {
  const source = readFileSync(file, 'utf8')
  for (const [, spec] of source.matchAll(SPECIFIER)) {
    const where = relative(ROOT, file)
    if (spec.startsWith('@/')) {
      problems.push(`${where}: path alias "${spec}" (use a relative import)`)
    } else if (spec.endsWith('.json')) {
      problems.push(`${where}: JSON import "${spec}" (consumers need resolveJsonModule; declare a typed const instead)`)
    } else if (spec.startsWith('.')) {
      if (!resolvesRelative(file, spec)) problems.push(`${where}: "${spec}" does not resolve to a shipped .d.ts`)
    } else if (!declaredPackages.has(packageName(spec))) {
      problems.push(`${where}: "${spec}" is not a dependency or peer dependency`)
    }
  }
}

if (problems.length) {
  console.error(`❌ Type definition verification failed (${problems.length} problem${problems.length === 1 ? '' : 's'}):\n`)
  problems.forEach((p) => console.error(`  - ${p}`))
  console.error('\nSee CONTRIBUTING.md → Type Safety.\n')
  process.exit(1)
}

console.log(`✅ Type definitions OK: ${files.length} .d.ts files, all imports resolvable by consumers`)
