import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'
import iconMetaJson from '../styles/iconMeta.json'
import iconDrawingsJson from '../styles/iconDrawings.json'
import { iconSet } from './iconSet'
import { iconsData, type IconCategory, type IconElementTag, type IconName, type IconPaint } from './icons'

/* eslint-disable @typescript-eslint/no-require-imports */
const icons = require('../../scripts/icons.cjs')
/* eslint-enable @typescript-eslint/no-require-imports */

// iconSet's keys and IconName are the same set, both ways (decision 0058)
type MissingFromSet = Exclude<IconName, keyof typeof iconMetaJson>
type MissingFromName = Exclude<keyof typeof iconMetaJson, IconName>
const namesMatch: [MissingFromSet, MissingFromName] extends [never, never] ? true : false = true

const TAGS: IconElementTag[] = icons.TAGS
const PAINTS: IconPaint[] = ['stroke', 'fill', 'both']
const CATEGORIES: IconCategory[] = icons.CATEGORIES
// Geometry, plus Lucide's filled dots: paint, colour and stroke otherwise come from Icon
const ATTRIBUTES = new Set<string>(icons.ATTRIBUTES)

describe('iconSet', () => {
  const entries = Object.entries(iconSet)

  it('is keyed by IconName', () => {
    expect(namesMatch).toBe(true)
  })

  // Stored apart so Icon loads only the drawings (decision 0058); they must name the same icons
  it('has a drawing for every icon and metadata for every drawing', () => {
    expect(Object.keys(iconDrawingsJson).sort()).toEqual(Object.keys(iconMetaJson).sort())
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

  it.each(entries)('%s is drawn from shapes Icon can draw', (_key, icon) => {
    expect(PAINTS).toContain(icon.paint)
    expect(icon.elements.length).toBeGreaterThan(0)
    for (const [tag, attributes] of icon.elements) {
      expect(TAGS).toContain(tag)
      for (const [name, value] of Object.entries(attributes)) {
        expect(ATTRIBUTES).toContain(name)
        expect(typeof value).toBe('string')
        if (name === 'fill') expect(icons.FILLS).toContain(value)
      }
    }
  })

  // A Lucide upgrade that changes an icon shows up as a failure here, then a reviewed diff
  const fromLucide = entries.filter(([, icon]) => icon.source.library === 'lucide')
  if (fromLucide.length > 0) {
    it.each(fromLucide)(`%s matches its Lucide icon in lucide-static ${icons.LUCIDE_VERSION}`, (_key, icon) => {
      if (icon.source.library !== 'lucide') throw new Error('not a Lucide icon')
      expect(icon.elements).toEqual(icons.lucideElements(icon.source.name))
    })
  }

  // The system's own drawings use the house paint (decision 0058): status icons are lines like
  // Lucide's, the carets are solid with round joins, and the AI sparkle stays solid
  const OWN_PAINT: Partial<Record<IconName, IconPaint>> = { ai: 'fill', caret: 'both', caretDown: 'both', caretUp: 'both' }
  const own = entries.filter(([, icon]) => icon.source.library === 'common-origin')
  it.each(own)('%s, one of our own drawings, uses the house paint', (key, icon) => {
    expect(icon.paint).toBe(OWN_PAINT[key as IconName] ?? (key.startsWith('status') ? 'stroke' : undefined))
  })

  it('has IconName generated from its keys', () => {
    const iconsTs = readFileSync(join(__dirname, 'icons.ts'), 'utf8')
    expect(icons.withIconNameUnion(iconsTs, Object.keys(iconSet))).toBe(iconsTs)
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
