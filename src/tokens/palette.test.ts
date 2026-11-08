import { execFileSync } from 'node:child_process'
import path from 'node:path'

// The palette generator (#357): the signed-off light ramps follow the 0044 rule, the dark ramps
// meet 0040's floors on the dark surfaces, and the generated files match the parameters.
describe('palette generator', () => {
  it('passes its check', () => {
    const root = path.resolve(__dirname, '../..')
    expect(() =>
      execFileSync(process.execPath, ['scripts/generate-palette.mjs', '--check'], { cwd: root, stdio: 'pipe' })
    ).not.toThrow()
  })
})
