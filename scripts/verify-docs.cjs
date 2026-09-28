#!/usr/bin/env node
/**
 * Fails if a doc references a file, folder or npm script that doesn't exist (#37).
 *
 * Checks every Markdown file outside node_modules, build output and the changelog:
 * - relative Markdown links resolve, including titled links and reference definitions (anchors are ignored)
 * - `npm run <script>` names a script in package.json
 * - repo paths in inline code exist: bare file names and dotfiles (`package.json`, `.babelrc`,
 *   which pass if a file with that name exists anywhere in the repo), anything under a top-level
 *   folder, or a/b.ext paths that aren't inside an installed package. Build output (dist/) is
 *   skipped because a clean checkout doesn't have it. Bare folder names such as `atoms/` are
 *   ambiguous (they usually mean src/components/atoms/), so they aren't checked
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
// Top-level folders of this repo: a path starting with one must exist
const TOP_LEVEL_DIRS = fs
  .readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && !SKIP_DIRS.has(entry.name))
  .map(entry => `${entry.name}/`)

// Is this inline code a repo path? Either it starts with a top-level folder, or it looks like a
// relative file path (a/b.ext) whose first segment isn't an installed package, such as a stale
// `tests/integration/setup.ts` that names a folder the repo doesn't have.
const isRepoPath = candidate => {
  // Build output isn't in a clean checkout, so paths inside it can't be checked
  if (SKIP_DIRS.has(candidate.split('/')[0])) return false
  // File extensions such as `.d.ts` or `.docs.tsx` aren't paths
  if (/^(\.[a-z]+)?\.(tsx?|jsx?|css|mjs|cjs|json|md|ya?ml)$/.test(candidate)) return false
  // Bare file names and dotfiles, such as `package.json`, `.babelrc` or `CONTRIBUTING.md`
  if (/^(\.[\w.-]+|[\w-]+(\.[\w-]+)*\.(json|js|cjs|mjs|ts|tsx|md|css|ya?ml|hbs|sh))$/.test(candidate)) return true
  if (TOP_LEVEL_DIRS.some(dir => candidate.startsWith(dir))) return true
  if (/^[@.~/]|:\/\//.test(candidate) || !/^[\w-]+\/[\w./-]+\.[a-z]{1,5}$/i.test(candidate)) return false
  return !fs.existsSync(path.join(root, 'node_modules', candidate.split('/')[0]))
}

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (SKIP_DIRS.has(entry.name)) return []
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
const allFiles = walk(root)
// Bare file names (`package.json`, `.babelrc`, `tokens.json`) pass if a file with that name exists
const fileNames = new Set(allFiles.map(file => path.basename(file)))

// Placeholders and patterns, not real paths: Name/, X.Y.Z, <…>, {a,b}, globs, ellipses
const isPlaceholder = p => /[*{}<>…]|\bName\b|ComponentName|X\.Y\.Z|yourtype|\.\.\.$/.test(p)

const problems = []
for (const file of allFiles.filter(file => file.endsWith('.md'))) {
  const rel = path.relative(root, file)
  if (SKIP_FILES.has(rel)) continue
  const text = fs.readFileSync(file, 'utf8')
  const lines = text.split('\n')
  let inFence = false

  lines.forEach((line, index) => {
    const where = `${rel}:${index + 1}`
    if (line.trimStart().startsWith('```')) inFence = !inFence
    // For deliberate references to files that don't exist yet, such as a planned migration target
    if (line.includes('<!-- verify-docs-ignore')) return

    // npm scripts are checked everywhere, including the commands in code blocks
    for (const [, name] of line.matchAll(/npm run (\w[\w:.-]*)/g)) {
      if (!scripts[name]) problems.push(`${where}: unknown script "npm run ${name}"`)
    }

    // Links and paths in code blocks are examples, not references
    if (inFence) return

    // Inline links (optionally <bracketed>, with a "title", or with one level of balanced
    // parentheses in the destination) and reference definitions
    const targets = [
      ...Array.from(line.matchAll(/\]\(\s*(?:<([^>]+)>|((?:[^()\s]|\([^()\s]*\))+))(?:\s+["'(][^)]*)?\s*\)/g), match => match[1] ?? match[2]),
      ...Array.from(line.matchAll(/^\s{0,3}\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/g), match => match[1] ?? match[2])
    ]
    for (const target of targets) {
      if (/^(https?:|mailto:|#)/.test(target)) continue
      const clean = decodeURI(target.split('#')[0])
      if (!clean || isPlaceholder(clean)) continue
      if (!fs.existsSync(path.resolve(path.dirname(file), clean))) problems.push(`${where}: broken link ${target}`)
    }

    // Repo paths in inline code
    for (const [, code] of line.matchAll(/`([^`\s]+)`/g)) {
      const candidate = code.replace(/[),.:;]+$/, '').replace(/:\d+$/, '')
      if (!isRepoPath(candidate) || isPlaceholder(candidate)) continue
      // Relative to the repo root or the doc; a bare file name may be anywhere in the repo
      const exists =
        fs.existsSync(path.join(root, candidate)) ||
        fs.existsSync(path.resolve(path.dirname(file), candidate)) ||
        (!candidate.includes('/') && fileNames.has(candidate))
      if (!exists) problems.push(`${where}: missing path ${candidate}`)
    }
  })
}

if (problems.length) {
  console.error(`Docs reference ${problems.length} missing file(s) or script(s):\n`)
  for (const problem of problems) console.error(`  ${problem}`)
  process.exit(1)
}
console.log('Docs references OK')
