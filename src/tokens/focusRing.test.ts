import { execFileSync } from 'child_process'

// One focus ring everywhere: semantic.border.focus (or a component focus.outline token that
// references it) with semantic.border.focusOffset. There is no blue focus ring (decision 0029, #171)
const declarations = (property: string) => {
  let out = ''
  try {
    out = execFileSync(
      'git',
      ['grep', '-nE', `^[[:space:]]*${property}:`, '--', 'src/components', ':!*.test.tsx', ':!*.docs.tsx'],
      { encoding: 'utf8' }
    )
  } catch (error) {
    if ((error as { status?: number }).status !== 1) throw error
  }
  return out.trim().split('\n').filter(Boolean)
}

describe('focus ring', () => {
  it('draws every outline with the shared focus ring token', () => {
    const offenders = declarations('outline')
      .filter((line) => !/outline:\s*(none|0)\s*;/.test(line))
      .filter((line) => !/\$\{[\w.]*(border\.focus|focus\.outline)\}\s*;/.test(line))
    expect(offenders).toEqual([])
  })

  it('offsets every outline by border.focusOffset (inside or outside the edge)', () => {
    const offenders = declarations('outline-offset').filter((line) => !/border\.focusOffset/.test(line))
    expect(offenders).toEqual([])
  })

  // A focusable element without its own ring falls back to the browser's (or a site's) default
  it('gives every component with tabIndex={0} a focus-visible ring', () => {
    let files = ''
    try {
      files = execFileSync('git', ['grep', '-l', 'tabIndex={0}', '--', 'src/components', ':!*.test.tsx', ':!*.docs.tsx'], { encoding: 'utf8' })
    } catch (error) {
      if ((error as { status?: number }).status !== 1) throw error
    }
    const { readFileSync } = jest.requireActual<typeof import('fs')>('fs')
    // Focusable elements styled in another file, with where their ring is
    const styledElsewhere: Record<string, string> = {
      'src/components/atoms/Chip/InputChip.tsx': 'CloseButton is styled in shared/ChipBase.tsx',
    }
    const missing = files.trim().split('\n').filter(Boolean)
      .filter((file) => !styledElsewhere[file])
      .filter((file) => !/:focus-visible[^{]*\{[^}]*outline:\s*\$\{[\w.]*(border\.focus|focus\.outline)\}/.test(readFileSync(file, 'utf8')))
    expect(missing).toEqual([])
  })

  it('never draws a focus ring in the interactive blue', () => {
    const offenders = declarations('outline').filter((line) => /interactive/.test(line))
    expect(offenders).toEqual([])
  })
})
