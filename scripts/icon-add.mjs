#!/usr/bin/env node

/**
 * Adds an icon from Lucide to the icon set (decision 0058):
 *
 *   npm run icon:add -- <lucide-name> --as <ourName> [metadata flags]
 *
 * Copies the icon's shapes from the pinned lucide-static into src/styles/iconSet.json under our
 * name, records the Lucide name, and regenerates IconName in src/types/icons.ts. Metadata not given
 * as flags is asked for when run in a terminal. Add icons when a product needs them (P4).
 *
 * Flags: --as, --description, --category, --intent, --label (ariaLabelDefault), --aliases (comma
 * separated; defaults to Lucide's tags), --display-name (defaults to --as), --decorative,
 * --paint stroke|both (both also fills the icon, as starFilled does).
 */

import { readFileSync, writeFileSync } from 'fs'
import { createRequire } from 'module'
import { dirname, join } from 'path'
import { createInterface } from 'readline/promises'
import { fileURLToPath } from 'url'
import { parseArgs } from 'util'

const require = createRequire(import.meta.url)
const { CATEGORIES, LUCIDE_VERSION, addLucideIcon, lucideElements, lucideTags, withIconNameUnion } = require('./icons.cjs')

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ICON_SET = join(ROOT, 'src/styles/iconSet.json')
const ICONS_TS = join(ROOT, 'src/types/icons.ts')

const fail = (message) => {
  console.error(`❌ ${message}`)
  process.exit(1)
}

let parsed
try {
  parsed = parseArgs({
    allowPositionals: true,
    options: {
      as: { type: 'string' },
      description: { type: 'string' },
      category: { type: 'string' },
      intent: { type: 'string' },
      label: { type: 'string' },
      aliases: { type: 'string' },
      'display-name': { type: 'string' },
      decorative: { type: 'boolean', default: false },
      paint: { type: 'string', default: 'stroke' },
    },
  })
} catch (error) {
  fail(error.message)
}
const { values, positionals } = parsed
const [lucideName] = positionals
if (!lucideName || positionals.length > 1) fail('Usage: npm run icon:add -- <lucide-name> --as <ourName> [--description …] [--category …] [--intent …] [--label …]')

try {
  lucideElements(lucideName)
} catch (error) {
  fail(error.message)
}

const tags = lucideTags(lucideName)
const interactive = process.stdin.isTTY && process.stdout.isTTY
const REQUIRED = ['as', 'description', 'category', 'intent', 'label']
const missing = REQUIRED.filter((flag) => values[flag] === undefined)
if (!interactive && missing.length > 0) fail(`Missing ${missing.map((flag) => `--${flag}`).join(', ')} (not running in a terminal, so nothing can be asked)`)
const rl = interactive ? createInterface({ input: process.stdin, output: process.stdout }) : null

async function ask(value, question, fallback = '') {
  if (value !== undefined) return value
  if (!rl) return fallback
  const answer = (await rl.question(fallback ? `${question} [${fallback}]: ` : `${question}: `)).trim()
  return answer || fallback
}

console.log(`Adding Lucide "${lucideName}" (lucide-static ${LUCIDE_VERSION})`)
const name = await ask(values.as, 'Our name (camelCase)')
const description = await ask(values.description, 'What it depicts')
const category = await ask(values.category, `Category (${CATEGORIES.join(', ')})`)
const intent = await ask(values.intent, 'When to use it')
const ariaLabelDefault = await ask(values.label, 'Accessible label when it carries meaning')
const aliases = await ask(values.aliases, 'Aliases, comma separated', tags.slice(0, 8).join(', '))
rl?.close()

let iconSet
try {
  iconSet = addLucideIcon(JSON.parse(readFileSync(ICON_SET, 'utf8')), {
    lucideName,
    name,
    displayName: values['display-name'] ?? name,
    description,
    category,
    aliases: aliases.split(','),
    intent,
    decorativeDefault: values.decorative,
    ariaLabelDefault,
    paint: values.paint,
  })
} catch (error) {
  fail(error.message)
}

writeFileSync(ICON_SET, `${JSON.stringify(iconSet, null, 2)}\n`)
writeFileSync(ICONS_TS, withIconNameUnion(readFileSync(ICONS_TS, 'utf8'), Object.keys(iconSet)))
console.log(`✅ Added "${name}" from Lucide "${lucideName}". Use it as <Icon name="${name}" />, then run npm test.`)
