#!/usr/bin/env node
/**
 * Fails if a doc references a file, folder or npm script that doesn't exist (#37).
 *
 * Checks every Markdown file outside node_modules, build output and the changelog:
 * - relative Markdown links resolve (anchors are ignored)
 * - `npm run <script>` names a script in package.json
 * - backticked repo paths (src/, docs/, scripts/, …) exist
 *
 * A line ending in `<!-- verify-docs-ignore: reason -->` is skipped, for planned files.
 */
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const scripts = require(path.join(root, 'package.json')).scripts

const SKIP_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'coverage', 'out'])
// Generated history, not guidance
const SKIP_FILES = new Set(['CHANGELOG.md'])
// Dead code that #39 deletes; its README describes the dead generator
const SKIP_PREFIXES = ['lib/releases/']
const PATH_PREFIXES = ['src/', 'docs/', 'scripts/', 'config/', 'pages/', 'public/', '.github/', 'lib/', 'styles/']

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (SKIP_DIRS.has(entry.name)) return []
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith('.md') ? [full] : []
  })

// Placeholders and patterns, not real paths: Name/, X.Y.Z, <…>, {a,b}, globs, ellipses
const isPlaceholder = p => /[*{}<>…]|\bName\b|ComponentName|X\.Y\.Z|yourtype|\.\.\.$/.test(p)

const problems = []
for (const file of walk(root)) {
  const rel = path.relative(root, file)
  if (SKIP_FILES.has(rel) || SKIP_PREFIXES.some(prefix => rel.startsWith(prefix))) continue
  const text = fs.readFileSync(file, 'utf8')
  const lines = text.split('\n')
  let inFence = false

  lines.forEach((line, index) => {
    const where = `${rel}:${index + 1}`
    if (line.trimStart().startsWith('```')) inFence = !inFence
    // For deliberate references to files that don't exist yet, such as a planned migration target
    if (line.includes('<!-- verify-docs-ignore')) return

    for (const [, target] of line.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(target)) continue
      const clean = decodeURI(target.split('#')[0])
      if (!clean || isPlaceholder(clean)) continue
      if (!fs.existsSync(path.resolve(path.dirname(file), clean))) problems.push(`${where}: broken link ${target}`)
    }

    for (const [, name] of line.matchAll(/npm run ([a-z][\w:-]*)/g)) {
      if (!scripts[name]) problems.push(`${where}: unknown script "npm run ${name}"`)
    }

    // Repo paths in inline code, outside code blocks (which hold examples)
    if (inFence) return
    for (const [, code] of line.matchAll(/`([^`\s]+)`/g)) {
      const candidate = code.replace(/[),.:;]+$/, '').replace(/:\d+$/, '')
      if (!PATH_PREFIXES.some(prefix => candidate.startsWith(prefix)) || isPlaceholder(candidate)) continue
      if (!fs.existsSync(path.join(root, candidate))) problems.push(`${where}: missing path ${candidate}`)
    }
  })
}

if (problems.length) {
  console.error(`Docs reference ${problems.length} missing file(s) or script(s):\n`)
  for (const problem of problems) console.error(`  ${problem}`)
  process.exit(1)
}
console.log('Docs references OK')
