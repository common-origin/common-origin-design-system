import { execFileSync } from 'child_process'
import tokens from '@/styles/tokens.json'

// The category palette's strong step is `<hue>-strong`. `<hue>-emphasis` is a deprecated alias
// until 3.0, because "emphasis" means strong near-black and is never a hue (decision 0029, #167)
describe('category tokens', () => {
  const category = tokens.semantic.color.category as Record<string, string>
  const hues = Object.keys(category)
    .filter((key) => key.endsWith('-strong'))
    .map((key) => key.replace(/-strong$/, ''))

  it('has a strong step for every hue', () => {
    expect(hues.sort()).toEqual(['blue', 'gray', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'])
  })

  it.each(['blue', 'gray', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'])(
    'keeps %s-emphasis as an alias of %s-strong',
    (hue) => {
      expect(category[`${hue}-emphasis`]).toBe(category[`${hue}-strong`])
    }
  )

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
