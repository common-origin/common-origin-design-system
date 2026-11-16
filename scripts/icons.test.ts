/**
 * @jest-environment node
 */
// The helpers behind `npm run icon:add` (decision 0058): copying a Lucide icon into the icon set
// and regenerating IconName.

/* eslint-disable @typescript-eslint/no-require-imports */
const { addLucideIcon, iconNameUnion, joinIconSet, lucideElements, lucideTags, splitIconSet, withIconNameUnion } = require('./icons.cjs')
/* eslint-enable @typescript-eslint/no-require-imports */

const metadata = {
  lucideName: 'calendar',
  name: 'calendar',
  description: 'Calendar page',
  category: 'object',
  intent: 'Use for dates and scheduling',
  ariaLabelDefault: 'Calendar',
}

describe('lucideElements', () => {
  it("copies a Lucide icon's shapes", () => {
    expect(lucideElements('search')).toEqual([
      ['path', { d: 'm21 21-4.34-4.34' }],
      ['circle', { cx: '11', cy: '11', r: '8' }],
    ])
  })

  it("keeps Lucide's filled dots", () => {
    expect(lucideElements('palette')).toContainEqual(['circle', expect.objectContaining({ fill: 'currentColor' })])
  })

  it('names an unknown icon', () => {
    expect(() => lucideElements('not-an-icon')).toThrow('has no icon "not-an-icon"')
  })
})

describe('addLucideIcon', () => {
  const set = { add: { name: 'add' } }

  it('adds the icon under our name, recording where it came from', () => {
    const next = addLucideIcon(set, { ...metadata, aliases: [' date ', '', 'month'] })
    expect(next.add).toBe(set.add)
    expect(next.calendar).toEqual({
      name: 'calendar',
      description: 'Calendar page',
      category: 'object',
      aliases: ['date', 'month'],
      intent: 'Use for dates and scheduling',
      decorativeDefault: false,
      ariaLabelDefault: 'Calendar',
      source: { library: 'lucide', name: 'calendar' },
      paint: 'stroke',
      elements: lucideElements('calendar'),
    })
  })

  it("doesn't change the set it was given", () => {
    addLucideIcon(set, metadata)
    expect(set).toEqual({ add: { name: 'add' } })
  })

  it.each([
    [{ name: 'add' }, 'already exists'],
    [{ name: 'Calendar' }, 'camelCase'],
    [{ name: 'calendar-page' }, 'camelCase'],
    [{ category: 'thing' }, 'Category must be one of'],
    [{ paint: 'fill' }, "A Lucide icon's paint"],
    [{ intent: ' ' }, 'intent is required'],
    [{ ariaLabelDefault: undefined }, 'ariaLabelDefault is required'],
    [{ lucideName: 'not-an-icon' }, 'has no icon'],
  ])('refuses %o', (change, message) => {
    expect(() => addLucideIcon(set, { ...metadata, ...change })).toThrow(message)
  })

  it('offers Lucide tags as aliases', () => {
    expect(lucideTags('search')).toContain('magnifier')
    expect(lucideTags('not-an-icon')).toEqual([])
  })
})

describe('stored metadata and drawings', () => {
  const set = {
    drag: { name: 'drag', category: 'action', source: { library: 'lucide', name: 'grip-vertical' }, paint: 'stroke', elements: [['circle', { cx: '9', cy: '12', r: '1' }]] },
  }

  it('splits the set so the drawings stand alone, and joins it back unchanged', () => {
    const { meta, drawings } = splitIconSet(set)
    expect(drawings).toEqual({ drag: { paint: 'stroke', elements: set.drag.elements } })
    expect(meta.drag).not.toHaveProperty('elements')
    expect(joinIconSet(meta, drawings)).toEqual(set)
  })

  it('refuses metadata without a drawing, or a drawing without metadata', () => {
    const { meta, drawings } = splitIconSet(set)
    expect(() => joinIconSet(meta, {})).toThrow('has metadata but no drawing')
    expect(() => joinIconSet({}, drawings)).toThrow('has a drawing but no metadata')
  })
})

describe('IconName', () => {
  it('lists the names sorted, one per line', () => {
    expect(iconNameUnion(['view', 'add', 'arrowDown'])).toBe("export type IconName =\n  | 'add'\n  | 'arrowDown'\n  | 'view'\n")
  })

  it('replaces only the union', () => {
    const source = "// head\nexport type IconName =\n  | 'old'\n\nexport type Other = 1\n"
    expect(withIconNameUnion(source, ['b', 'a'])).toBe("// head\nexport type IconName =\n  | 'a'\n  | 'b'\n\nexport type Other = 1\n")
  })

  it('keeps Windows line endings', () => {
    expect(withIconNameUnion("export type IconName =\r\n  | 'old'\r\n\r\n", ['a'])).toBe("export type IconName =\r\n  | 'a'\r\n\r\n")
  })

  it('sorts by code point, the same on every machine', () => {
    expect(iconNameUnion(['b', 'B', 'a'])).toBe("export type IconName =\n  | 'B'\n  | 'a'\n  | 'b'\n")
  })

  it('fails loudly if the union moved', () => {
    expect(() => withIconNameUnion('export type Names = string\n', ['a'])).toThrow('Could not find the IconName union')
  })
})
