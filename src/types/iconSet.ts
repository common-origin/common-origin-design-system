import iconMetaJson from '../styles/iconMeta.json'
import { iconDrawings } from './iconDrawings'
import type { IconDefinition, IconName, IconSet } from './icons'

type IconMeta = Omit<IconDefinition, 'paint' | 'elements'>

// Typed so emitted .d.ts files don't import JSON. iconSet.test.ts checks the data has this shape.
const iconMeta = iconMetaJson as unknown as Record<IconName, IconMeta>

/**
 * Every icon `Icon` draws, keyed by `IconName`, with its metadata, its source and its shapes
 * (decision 0058). Read it to list icons or to draw one outside `Icon`. The metadata and the
 * drawings are stored apart so `Icon` can load the drawings alone; this joins them.
 */
// Plain loops, no spread or Object.fromEntries: this is a data module, and in the CommonJS build a
// compiled spread would pull tslib's helper from the component chunk into the data chunk (a cycle)
const join = (meta: IconMeta, drawing: object): IconDefinition => {
  const entry: Record<string, unknown> = {}
  for (const key in meta) entry[key] = meta[key as keyof IconMeta]
  for (const key in drawing) entry[key] = drawing[key as keyof typeof drawing]
  return entry as unknown as IconDefinition
}
export const iconSet = {} as IconSet
const names = Object.keys(iconMeta) as IconName[]
for (let i = 0; i < names.length; i++) iconSet[names[i]] = join(iconMeta[names[i]], iconDrawings[names[i]])
