import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'
import iconSetJson from '../styles/iconSet.json'
import { iconSet } from './iconSet'
import { iconsData, type IconCategory, type IconElementTag, type IconName, type IconPaint } from './icons'

// iconSet's keys and IconName are the same set, both ways (decision 0058)
type MissingFromSet = Exclude<IconName, keyof typeof iconSetJson>
type MissingFromName = Exclude<keyof typeof iconSetJson, IconName>
const namesMatch: [MissingFromSet, MissingFromName] extends [never, never] ? true : false = true

const TAGS: IconElementTag[] = ['path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon']
const PAINTS: IconPaint[] = ['stroke', 'fill', 'both']
const CATEGORIES: IconCategory[] = ['action', 'communication', 'content', 'feedback', 'media', 'navigation', 'object', 'status', 'user']
// Geometry only: paint, colour and stroke come from Icon, so every icon draws the same way
const ATTRIBUTES = new Set(['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'points'])

describe('iconSet', () => {
  const entries = Object.entries(iconSet)

  it('is keyed by IconName', () => {
    expect(namesMatch).toBe(true)
  })

  it.each(entries)('%s has its metadata', (_key, icon) => {
    expect(icon.name.trim()).not.toBe('')
    expect(icon.description).toEqual(expect.any(String))
    expect(CATEGORIES).toContain(icon.category)
    expect(icon.aliases).toEqual(expect.any(Array))
    expect(icon.intent).toEqual(expect.any(String))
    expect(typeof icon.decorativeDefault).toBe('boolean')
    expect(icon.ariaLabelDefault.trim()).not.toBe('')
  })

  it.each(entries)('%s says where it comes from', (_key, icon) => {
    if (icon.source.library === 'lucide') expect(icon.source.name).toMatch(/^[a-z0-9-]+$/)
    else expect(icon.source).toEqual({ library: 'common-origin' })
  })

  it.each(entries)('%s is drawn from geometry only', (_key, icon) => {
    expect(PAINTS).toContain(icon.paint)
    expect(icon.elements.length).toBeGreaterThan(0)
    for (const [tag, attributes] of icon.elements) {
      expect(TAGS).toContain(tag)
      for (const [name, value] of Object.entries(attributes)) {
        expect(ATTRIBUTES).toContain(name)
        expect(typeof value).toBe('string')
      }
    }
  })
})

describe('iconsData (deprecated)', () => {
  // Frozen at 3.2.0 (decision 0058): this file must never change until it's removed in 4.0
  it('is frozen', () => {
    const json = readFileSync(join(__dirname, '../styles/icons.json'))
    expect(createHash('sha256').update(json).digest('hex')).toBe('da49289ae5a1af149f407819a96e1a4157e6f82a4c1df178bb82f565d6cea5df')
    expect(Object.keys(iconsData)).toHaveLength(64)
  })
})
