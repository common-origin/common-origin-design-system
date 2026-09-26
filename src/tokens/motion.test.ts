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

  const files = sources(componentsDir).map((file) => ({
    name: path.relative(componentsDir, file),
    source: fs.readFileSync(file, 'utf8'),
  }))

  // Every transition/animation value, including multiline declarations, longhands
  // (transition-duration, animation-timing-function, …) and JSX props (transition="…").
  // Token interpolations (`${…}`) are dropped so only literal text is left to check.
  const motionValues = (source: string): string[] => {
    const css = [...source.matchAll(/\b(?:transition|animation)(?:-[a-z-]+)?\s*:\s*([^;`{}]*(?:\$\{[^}]*\}[^;`{}]*)*)/g)]
    const props = Array.from(source.matchAll(/\b(?:transition|animation)=\{?\s*["'`]([^"'`]*)["'`]/g))
    return [...css, ...props].map((match) => match[1].replace(/\s+/g, ' ').trim())
  }
  const literal = (value: string) => value.replace(/\$\{[^}]*\}/g, '')

  // AgentInput's working ring rotates continuously, so it is linear and longer than 300ms (decision 0010)
  const allowed = [{ file: 'molecules/AgentInput/AgentInput.tsx', value: '${rotateRing} 1300ms linear infinite' }]

  it('takes durations and easings from tokens, not literals', () => {
    const offenders = files.flatMap(({ name, source }) =>
      motionValues(source)
        .filter((value) => /\d+m?s\b|\bease(-in|-out|-in-out)?\b|\blinear\b|cubic-bezier|steps\(/.test(literal(value)))
        .filter((value) => !allowed.some((a) => a.file === name && a.value === value))
        .map((value) => `${name}: ${value}`)
    )
    expect(offenders).toEqual([])
  })

  it('gives every component that moves a reduced-motion fallback', () => {
    // Moves = keyframes that transform, or a transition on transform, size, or `all`
    // (including the composite tokens, which are `all`, and motion.interactive, which transforms)
    const moves = (source: string) =>
      Array.from(source.matchAll(/keyframes`([^`]*)`/g)).some((m) => /transform/.test(m[1])) ||
      motionValues(source).some((value) =>
        /\b(transform|max-height|height|width|all)\b|transition\.(fast|normal|slow)|motion\.interactive/.test(value)
      )

    // Moves only through values a consumer passes in, so the consumer owns the fallback
    const exempt: Record<string, string> = {
      'atoms/Box/Box.tsx': 'transition and hoverTransform are consumer-supplied props',
      'molecules/Checkbox/SelectableInputBase.tsx': '`all` only ever changes colours; the box never resizes',
    }

    const missing = files
      .filter(({ name, source }) => moves(source) && !exempt[name])
      .filter(({ source }) => !/reducedMotion|prefers-reduced-motion/.test(source))
      .map(({ name }) => name)
    expect(missing).toEqual([])
  })
})
