#!/usr/bin/env node

/**
 * Pre-publish smoke test: load the built CommonJS package with plain Node (as Jest and
 * unbundled SSR do) and server-render a component. Catches interop bugs such as a
 * styled-components default import resolving to the whole module (#53), which bundlers
 * hide and the repo's own tests (which import src/) can't see.
 */

const { existsSync } = require('fs')
const { join } = require('path')

const DIST = join(__dirname, '..', 'dist')
if (!existsSync(join(DIST, 'index.js'))) {
  console.error('❌ dist/index.js not found. Run npm run build:package first.')
  process.exit(1)
}

const problems = []
const load = (file) => {
  try {
    return require(join(DIST, file))
  } catch (error) {
    problems.push(`require('dist/${file}') threw: ${error.message}`)
    return null
  }
}

const main = load('index.js')
const tokensEntry = load('tokens/index.js')

if (main) {
  if (typeof main.Button !== 'function' && typeof main.Button !== 'object') problems.push('dist/index.js: Button is not exported')
  if (main.tokens?.semantic?.color?.background?.default === undefined) problems.push('dist/index.js: tokens are missing')
  if (!main.iconsData || Object.keys(main.iconsData).length === 0) problems.push('dist/index.js: iconsData is missing')
  try {
    const React = require('react')
    const { renderToString } = require('react-dom/server')
    const html = renderToString(React.createElement(main.Button, { variant: 'primary' }, 'Smoke test'))
    if (!html.includes('Smoke test')) problems.push('dist/index.js: Button rendered without its label')
  } catch (error) {
    problems.push(`dist/index.js: rendering Button threw: ${error.message}`)
  }
}

if (tokensEntry && tokensEntry.tokens?.semantic?.color?.background?.default === undefined) {
  problems.push('dist/tokens/index.js: tokens are missing')
}

if (problems.length) {
  console.error('❌ Package load smoke test failed:\n')
  problems.forEach((p) => console.error(`  - ${p}`))
  process.exit(1)
}

console.log('✅ CommonJS build loads in plain Node and renders a component')
