import { execFileSync } from 'child_process'
import tokens from '@/styles/tokens.json'

// The category palette's strong step is `<hue>-strong`, never `<hue>-emphasis`, because "emphasis"
// means strong near-black and is never a hue (decision 0029, #167). 3.0 removed the -emphasis
// aliases and the old hues, leaving the display colours and gray (decision 0043)
describe('category tokens', () => {
  const category = tokens.semantic.color.category as Record<string, string>
  const hues = Object.keys(category)
    .filter((key) => key.endsWith('-strong'))
    .map((key) => key.replace(/-strong$/, ''))

  it('has a strong step for every hue', () => {
    expect(hues.sort()).toEqual(['gray', 'magenta', 'olive', 'periwinkle', 'rose'])
  })

  it('has no -emphasis step', () => {
    expect(Object.keys(category).filter((key) => key.endsWith('-emphasis'))).toEqual([])
  })

  it('is not read as -emphasis by any component', () => {
    let hits = ''
    try {
      hits = execFileSync('git', ['grep', '-nE', 'category\\.[a-z]+-emphasis|-emphasis`', '--', 'src/components', 'src/patterns', 'src/page-components', 'pages'], { encoding: 'utf8' })
    } catch (error) {
      if ((error as { status?: number }).status !== 1) throw error
    }
    expect(hits.trim().split('\n').filter(Boolean)).toEqual([])
  })
})
