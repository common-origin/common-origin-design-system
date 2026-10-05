#!/usr/bin/env node
// Writes the golden resolved tokens: src/styles/tokens.json without its stray $ref keys
// (decision 0017, #24). src/tokens/golden.test.ts fails if a build resolves to anything else.
//
// Only rewrite the golden file in a PR that means to change resolved values, and say so in
// the PR. Run `npm run build:tokens` first, so it reflects the current source.
const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const root = join(__dirname, '..')
const built = join(root, 'src/styles/tokens.json')
const golden = join(root, 'config/tokens.golden.json')

// The $ref keys come from src/tokens/index.json leaking into the build. They hold file
// paths, not design values, and step 2 of the migration removes them.
function withoutRefs(value) {
  if (Array.isArray(value)) return value.map(withoutRefs)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== '$ref')
        .map(([key, child]) => [key, withoutRefs(child)])
    )
  }
  return value
}

module.exports = { withoutRefs }

if (require.main === module) {
  const tokens = withoutRefs(JSON.parse(readFileSync(built, 'utf8')))
  writeFileSync(golden, `${JSON.stringify(tokens, null, 2)}\n`)
  console.log(`Wrote ${golden.replace(`${root}/`, '')}`)
}
