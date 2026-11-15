import { statusShapes } from './statusShapes'
import { type IconName } from '../types/icons'
import { iconSet } from '../types/iconSet'

// Coordinates in an SVG path, including each arc's radii and end point
const numbers = (path: string) => (path.match(/-?\d*\.?\d+/g) ?? []).map(Number)

const icons: Record<keyof typeof statusShapes, IconName> = {
  error: 'statusError',
  serious: 'statusSerious',
  warning: 'statusWarning',
  success: 'statusSuccess',
  info: 'statusInfo',
  inProgress: 'statusInProgress',
}

describe('status shapes and icons (decision 0045)', () => {
  it('has a shape for each of the six coloured statuses', () => {
    expect(Object.keys(statusShapes).sort()).toEqual(['error', 'inProgress', 'info', 'serious', 'success', 'warning'])
  })

  it.each(Object.entries(statusShapes))('keeps the %s shape on the 24px grid', (_, path) => {
    expect(path).toMatch(/^M/)
    // The hexagon overshoots the 2–22 live area by 0.5 at its side points (#259)
    for (const value of numbers(path)) {
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(24)
    }
  })

  it.each(Object.entries(icons))('pairs the %s shape with a status icon', (_, name) => {
    expect(iconSet[name]).toMatchObject({ name, category: 'status', decorativeDefault: false })
  })

  // The icon and the indicator are one shape: the icon's outline is the indicator's outer path,
  // drawn as a line in Lucide's style (decision 0058). In progress's indicator adds its ring and
  // half inside that outline.
  it.each(Object.entries(icons))('draws the %s icon along its shape', (shape, name) => {
    const outline = statusShapes[shape as keyof typeof statusShapes].split(/(?=M)/)[0]
    expect(iconSet[name].paint).toBe('stroke')
    expect(iconSet[name].elements[0]).toEqual(['path', { d: outline }])
  })

  it('gives every status icon a human-readable default label', () => {
    const names = Object.keys(iconSet).filter((name) => name.startsWith('status')) as IconName[]
    expect(names).toHaveLength(10)
    for (const name of names) expect(iconSet[name].ariaLabelDefault).not.toMatch(/^status/)
  })
})
