/**
 * Icon set helpers shared by `npm run icon:add` and the tests (decision 0058).
 *
 * Lucide is a pinned dev dependency (`lucide-static`). An icon is copied from its node data into
 * `src/styles/iconSet.json`, and `IconName` in `src/types/icons.ts` is generated from the set's keys,
 * so the two can't drift.
 */

const lucideNodes = require('lucide-static/icon-nodes.json')
const lucideTagsByName = require('lucide-static/tags.json')
const { version: LUCIDE_VERSION } = require('lucide-static/package.json')

const CATEGORIES = ['action', 'communication', 'content', 'feedback', 'media', 'navigation', 'object', 'status', 'user']
const TAGS = ['path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon']
// Geometry, plus Lucide's per-shape fill (its dots are filled with currentColor). Paint, colour and
// stroke otherwise come from Icon, so every icon draws the same way.
const GEOMETRY = ['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'points']
const ATTRIBUTES = [...GEOMETRY, 'fill']
const FILLS = ['currentColor', 'none']
const LUCIDE_PAINTS = ['stroke', 'both']
const NAME = /^[a-z][a-zA-Z0-9]*$/

/** A Lucide icon's shapes as iconSet elements. Throws for an unknown icon or a shape we can't draw. */
function lucideElements(lucideName) {
  const nodes = lucideNodes[lucideName]
  if (!nodes) throw new Error(`Lucide ${LUCIDE_VERSION} has no icon "${lucideName}". Find names at https://lucide.dev/icons`)
  return nodes.map(([tag, attributes]) => {
    if (!TAGS.includes(tag)) throw new Error(`Lucide "${lucideName}" uses <${tag}>, which Icon doesn't draw`)
    const kept = {}
    for (const [name, value] of Object.entries(attributes)) {
      if (!ATTRIBUTES.includes(name)) throw new Error(`Lucide "${lucideName}" uses the attribute "${name}", which Icon doesn't draw`)
      if (name === 'fill' && !FILLS.includes(String(value))) throw new Error(`Lucide "${lucideName}" fills a shape with "${value}"; only currentColor is allowed`)
      kept[name] = String(value)
    }
    return [tag, kept]
  })
}

/** Lucide's search tags for an icon, offered as aliases */
const lucideTags = (lucideName) => lucideTagsByName[lucideName] ?? []

/**
 * A copy of the icon set with a Lucide icon added under our name. Throws for a taken or badly
 * formed name, an unknown category or paint, or missing metadata.
 */
function addLucideIcon(iconSet, icon) {
  const { lucideName, name, displayName = name, description, category, aliases = [], intent, decorativeDefault = false, ariaLabelDefault, paint = 'stroke' } = icon
  if (!NAME.test(name ?? '')) throw new Error(`"${name}" isn't a valid icon name: use camelCase, such as "arrowRight"`)
  if (iconSet[name]) throw new Error(`An icon named "${name}" already exists`)
  if (!CATEGORIES.includes(category)) throw new Error(`Category must be one of: ${CATEGORIES.join(', ')}`)
  if (!LUCIDE_PAINTS.includes(paint)) throw new Error(`A Lucide icon's paint is ${LUCIDE_PAINTS.join(' or ')}`)
  for (const [field, value] of Object.entries({ description, intent, ariaLabelDefault })) {
    if (!value || !String(value).trim()) throw new Error(`${field} is required`)
  }
  const elements = lucideElements(lucideName)
  return {
    ...iconSet,
    [name]: {
      name: displayName,
      description: description.trim(),
      category,
      aliases: aliases.map((alias) => alias.trim()).filter(Boolean),
      intent: intent.trim(),
      decorativeDefault: Boolean(decorativeDefault),
      ariaLabelDefault: ariaLabelDefault.trim(),
      source: { library: 'lucide', name: lucideName },
      paint,
      elements,
    },
  }
}

const UNION_START = 'export type IconName ='
const UNION = /export type IconName =\n(?: {2}\| '[a-zA-Z0-9]+'\n)+/

/** `IconName` as source: one sorted member per line */
const iconNameUnion = (names) =>
  `${UNION_START}\n${[...names].sort((a, b) => a.localeCompare(b, 'en')).map((name) => `  | '${name}'\n`).join('')}`

/** `src/types/icons.ts` with `IconName` regenerated from the given names */
function withIconNameUnion(iconsTs, names) {
  if (!UNION.test(iconsTs)) throw new Error('Could not find the IconName union in src/types/icons.ts')
  return iconsTs.replace(UNION, iconNameUnion(names))
}

module.exports = {
  ATTRIBUTES,
  CATEGORIES,
  FILLS,
  LUCIDE_VERSION,
  TAGS,
  addLucideIcon,
  iconNameUnion,
  lucideElements,
  lucideTags,
  withIconNameUnion,
}
