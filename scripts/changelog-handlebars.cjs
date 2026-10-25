// Handlebars setup for auto-changelog (.auto-changelog → handlebarsSetup). auto-changelog rebuilds
// CHANGELOG.md from git history on every release, so hand-written notes would be lost. Notes for a
// release live in docs/release-notes/<title>.md (for example v2.21.0.md) and are included here.
const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

// auto-changelog strips every run of leading spaces from the rendered changelog (its cleanTemplate),
// which flattens nested lists and list continuations in the notes. It leaves tabs alone, so each
// indented line gets one tab per nesting level instead. A tab moves to the next multiple of four
// columns (CommonMark), so a line at depth d starts at column 4d: inside its parent's content for
// any list marker from `- ` to `10. `, and short of the four extra columns that make code.
const indentWithTabs = (markdown) => {
  const stack = [0]
  return markdown
    .split('\n')
    .map((line) => {
      if (line.trim() === '') return ''
      const indent = line.length - line.trimStart().length
      while (indent < stack[stack.length - 1]) stack.pop()
      if (indent > stack[stack.length - 1]) stack.push(indent)
      return '\t'.repeat(stack.length - 1) + line.trimStart()
    })
    .join('\n')
}

const setup = (Handlebars) => {
  Handlebars.registerHelper('releaseNotes', (title) => {
    const file = join(__dirname, '..', 'docs', 'release-notes', `${title}.md`)
    return existsSync(file) ? new Handlebars.SafeString(indentWithTabs(readFileSync(file, 'utf8').trim())) : ''
  })
}

module.exports = setup
module.exports.indentWithTabs = indentWithTabs
