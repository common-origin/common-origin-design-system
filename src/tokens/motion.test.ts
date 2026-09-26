import fs from 'fs'
import path from 'path'
import tokens from '@/styles/tokens.json'

// Motion rules (P6, decision 0005): token durations, 300ms maximum, never linear,
// and movement falls back to a fade or an instant change under prefers-reduced-motion.
describe('semantic motion tokens', () => {
  const { motion } = tokens.semantic

  it('keeps every duration at or under 300ms', () => {
    Object.values(motion.duration).forEach((value) => {
      expect(value).toMatch(/^\d+ms$/)
      expect(parseInt(value, 10)).toBeLessThanOrEqual(300)
    })
  })

  it('never uses linear easing', () => {
    const values = [
      ...Object.values(motion.easing),
      ...Object.values(motion.transition),
      motion.hover,
      motion.focus,
      motion.interactive,
    ]
    values.forEach((value) => expect(value).not.toMatch(/\blinear\b/))
  })
})

describe('component motion', () => {
  const componentsDir = path.join(__dirname, '../components')

  const sources = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return sources(full)
      return /\.tsx?$/.test(entry.name) && !/\.(test|docs)\.tsx?$/.test(entry.name) ? [full] : []
    })

  // AgentInput's working ring rotates continuously, so it is linear and longer than 300ms (decision 0010)
  const allowed = ['animation: ${rotateRing} 1300ms linear infinite;']

  it('takes durations and easings from tokens, not literals', () => {
    const offenders = sources(componentsDir).flatMap((file) =>
      fs
        .readFileSync(file, 'utf8')
        .split('\n')
        .filter((line) => /(transition|animation)\s*[:=]/.test(line))
        .filter((line) => /\d+m?s\b|\bease(-in|-out|-in-out)?\b|\blinear\b/.test(line))
        .filter((line) => !allowed.includes(line.trim()))
        .map((line) => `${path.relative(componentsDir, file)}: ${line.trim()}`)
    )
    expect(offenders).toEqual([])
  })

  it('gives every moving component a reduced-motion fallback', () => {
    const moving = [
      'atoms/Badge/Badge.tsx',
      'atoms/IconButton/IconButton.tsx',
      'atoms/ProgressBar/ProgressBar.tsx',
      'atoms/StatusBadge/StatusBadge.tsx',
      'molecules/ActionSheet/ActionSheet.tsx',
      'molecules/CodeBlock/CodeBlock.tsx',
      'molecules/Dropdown/Dropdown.tsx',
      'molecules/List/ListItem.tsx',
      'molecules/Modal/Modal.tsx',
      'molecules/Sheet/Sheet.tsx',
      'molecules/Slider/Slider.tsx',
    ]
    moving.forEach((file) => {
      const source = fs.readFileSync(path.join(componentsDir, file), 'utf8')
      expect([file, /reducedMotion|prefers-reduced-motion/.test(source)]).toEqual([file, true])
    })
  })
})
