#!/usr/bin/env node

/**
 * Post-build step for the ESM types (decision 0042): writes a .d.mts beside every .d.ts in dist,
 * for the `import` condition, so TypeScript reads the .mjs files as ESM rather than CommonJS
 * masquerading as ESM. ESM resolution needs explicit extensions, so each relative specifier is
 * rewritten to the .mjs file it means: './components' becomes './components/index.mjs', and
 * '../styles/tokens' becomes '../styles/tokens.mjs'. A deep import into a package with no
 * `exports` map (TypeScript writes 'styled-components/dist/types' into inferred types) needs its
 * extension too: 'styled-components/dist/types.js'. Other package specifiers are left alone.
 */

const { existsSync, readdirSync, readFileSync, statSync, writeFileSync } = require('fs')
const { dirname, join, resolve } = require('path')

const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
if (!existsSync(DIST)) {
  console.error('❌ dist/ not found. Run rollup first.')
  process.exit(1)
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.d.ts') ? [path] : []
  })

const SPECIFIER = /(\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)(['"])(\.{1,2}\/[^'"]*)\2/g
const PACKAGE_DEEP = /(\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)(['"])((?:@[^/'"]+\/)?[^./'"][^/'"]*)\/([^'"]+)\2/g

// Whether a package resolves deep imports without an exports map (so ESM needs the extension)
const hasNoExports = (name) => {
  const manifest = join(ROOT, 'node_modules', name, 'package.json')
  return existsSync(manifest) && !require(manifest).exports
}

const problems = []
const files = walk(DIST)
for (const file of files) {
  const source = readFileSync(file, 'utf8')
  const rewritten = source.replace(SPECIFIER, (whole, lead, quote, spec) => {
    const bare = spec.replace(/\.(m?js|d\.ts)$/, '')
    const base = resolve(dirname(file), bare)
    if (existsSync(`${base}.d.ts`)) return `${lead}${quote}${bare}.mjs${quote}`
    if (existsSync(join(base, 'index.d.ts'))) return `${lead}${quote}${bare}/index.mjs${quote}`
    problems.push(`${file.slice(DIST.length + 1)}: can't resolve '${spec}'`)
    return whole
  })
  const withPackages = rewritten.replace(PACKAGE_DEEP, (whole, lead, quote, name, subpath) => {
    if (/\.(m?js|cjs)$/.test(subpath) || !hasNoExports(name)) return whole
    if (existsSync(join(ROOT, 'node_modules', name, `${subpath}.d.ts`))) return `${lead}${quote}${name}/${subpath}.js${quote}`
    problems.push(`${file.slice(DIST.length + 1)}: can't resolve '${name}/${subpath}'`)
    return whole
  })
  writeFileSync(file.replace(/\.d\.ts$/, '.d.mts'), withPackages)
}

if (problems.length) {
  console.error('❌ Writing .d.mts failed:\n')
  problems.forEach((p) => console.error(`  - ${p}`))
  process.exit(1)
}

console.log(`✅ Wrote ${files.length} .d.mts declarations for the ESM build`)
