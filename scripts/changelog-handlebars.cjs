// Handlebars setup for auto-changelog (.auto-changelog → handlebarsSetup). auto-changelog rebuilds
// CHANGELOG.md from git history on every release, so hand-written notes would be lost. Notes for a
// release live in docs/release-notes/<title>.md (for example v2.21.0.md) and are included here.
const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

module.exports = (Handlebars) => {
  Handlebars.registerHelper('releaseNotes', (title) => {
    const file = join(__dirname, '..', 'docs', 'release-notes', `${title}.md`)
    return existsSync(file) ? new Handlebars.SafeString(readFileSync(file, 'utf8').trim()) : ''
  })
}
