#!/usr/bin/env node

/**
 * Pre-publish smoke test: load the built package with plain Node, both as CommonJS (as Jest does)
 * and as native ESM (as unbundled server rendering does, such as Vite's dev server), and
 * server-render a component from each. Catches interop bugs such as a styled-components default
 * import resolving to the whole module (#53, decision 0042), which bundlers hide and the repo's
 * own tests (which import src/) can't see.
 */

const { existsSync } = require('fs')
const { join } = require('path')
const { pathToFileURL } = require('url')

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

// The same through Node's own ESM loader, from the .mjs build
async function checkEsm() {
  const load = async (file) => {
    try {
      return await import(pathToFileURL(join(DIST, file)).href)
    } catch (error) {
      problems.push(`import('dist/${file}') threw: ${error.message}`)
      return null
    }
  }
  const esm = await load('index.mjs')
  if (esm) {
    if (esm.tokens?.semantic?.color?.background?.default === undefined) problems.push('dist/index.mjs: tokens are missing')
    try {
      const React = require('react')
      const { renderToString } = require('react-dom/server')
      const html = renderToString(React.createElement(esm.Button, { variant: 'primary' }, 'ESM smoke test'))
      if (!html.includes('ESM smoke test')) problems.push('dist/index.mjs: Button rendered without its label')
    } catch (error) {
      problems.push(`dist/index.mjs: rendering Button threw: ${error.message}`)
    }
  }
  const esmTokens = await load('tokens/index.mjs')
  if (esmTokens && esmTokens.tokens?.semantic?.color?.background?.default === undefined) {
    problems.push('dist/tokens/index.mjs: tokens are missing')
  }
}

checkEsm().then(() => {
  if (problems.length) {
    console.error('❌ Package load smoke test failed:\n')
    problems.forEach((p) => console.error(`  - ${p}`))
    process.exit(1)
  }
  console.log('✅ CommonJS and native ESM builds load in plain Node and render a component')
})
