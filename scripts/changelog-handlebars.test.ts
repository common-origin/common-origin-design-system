/**
 * @jest-environment node
 */
// Release notes are included in CHANGELOG.md through auto-changelog, whose cleanTemplate strips
// leading spaces from every line. These tests run that real pipeline so an upgrade that changes it
// fails here rather than flattening the notes in a release.
import { join } from 'path'

/* eslint-disable @typescript-eslint/no-require-imports */
const { indentWithTabs } = require('./changelog-handlebars.cjs')
const { compileTemplate } = require('auto-changelog/src/template')
/* eslint-enable @typescript-eslint/no-require-imports */

describe('release notes in the changelog', () => {
  it('gives each nesting level one tab', () => {
    const notes = [
      '- top',
      '  - nested',
      '    - deeper',
      '  - nested again',
      '',
      '  continuation of top',
      '1. ordered',
      '   - under ordered',
      'Paragraph',
    ].join('\n')
    expect(indentWithTabs(notes)).toBe(
      [
        '- top',
        '\t- nested',
        '\t\t- deeper',
        '\t- nested again',
        '',
        '\tcontinuation of top',
        '1. ordered',
        '\t- under ordered',
        'Paragraph',
      ].join('\n'),
    )
  })

  it('keeps nested lists nested through auto-changelog', async () => {
    const root = join(__dirname, '..')
    const changelog: string = await compileTemplate([{ title: 'v2.22.0', merges: [], fixes: [], commits: [] }], {
      template: join(root, 'scripts/changelog-template.hbs'),
      handlebarsSetup: join(root, 'scripts/changelog-handlebars.cjs'),
    })
    // docs/release-notes/v2.22.0.md nests these under a bullet
    expect(changelog).toContain('\n\t- neutral fills and the default Chip are lighter\n')
    expect(changelog).not.toMatch(/\n- neutral fills and the default Chip are lighter/)
  })
})
