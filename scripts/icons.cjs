/**
 * Icon set helpers shared by `npm run icon:add` and the tests (decision 0058).
 *
 * Lucide is a pinned dev dependency (`lucide-static`). An icon is copied from its node data into the
 * set, stored as `src/styles/iconMeta.json` (metadata) and `src/styles/iconDrawings.json` (paint and
 * shapes) so `Icon` loads only the drawings. `IconName` in `src/types/icons.ts` is generated from
 * the set's keys, so the two can't drift.
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

/** Throws unless `name` is a free, camelCase icon name */
function checkName(iconSet, name) {
  if (!NAME.test(name ?? '')) throw new Error(`"${name}" isn't a valid icon name: use camelCase, such as "arrowRight"`)
  if (iconSet[name]) throw new Error(`An icon named "${name}" already exists`)
}

/** Throws unless `category` is one of the icon categories */
function checkCategory(category) {
  if (!CATEGORIES.includes(category)) throw new Error(`Category must be one of: ${CATEGORIES.join(', ')}`)
}

/**
 * A copy of the icon set with a Lucide icon added under our name. Throws for a taken or badly
 * formed name, an unknown category or paint, or missing metadata.
 */
function addLucideIcon(iconSet, icon) {
  const { lucideName, name, displayName = name, description, category, aliases = [], intent, decorativeDefault = false, ariaLabelDefault, paint = 'stroke' } = icon
  checkName(iconSet, name)
  checkCategory(category)
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

/** The whole set, from its stored metadata and drawings */
function joinIconSet(meta, drawings) {
  const set = {}
  for (const name of Object.keys(meta)) {
    if (!drawings[name]) throw new Error(`Icon "${name}" has metadata but no drawing`)
    set[name] = { ...meta[name], ...drawings[name] }
  }
  for (const name of Object.keys(drawings)) if (!meta[name]) throw new Error(`Icon "${name}" has a drawing but no metadata`)
  return set
}

/** The set split for storage: metadata, and the paint and shapes Icon draws */
function splitIconSet(set) {
  const meta = {}
  const drawings = {}
  for (const [name, { paint, elements, ...rest }] of Object.entries(set)) {
    meta[name] = rest
    drawings[name] = { paint, elements }
  }
  return { meta, drawings }
}

const UNION = /export type IconName =\r?\n(?: {2}\| '[a-zA-Z0-9]+'\r?\n)+/

/** `IconName` as source: one member per line, in code-point order (the same on every machine) */
const iconNameUnion = (names, eol = '\n') =>
  `export type IconName =${eol}${[...names].sort().map((name) => `  | '${name}'${eol}`).join('')}`

/** `src/types/icons.ts` with `IconName` regenerated from the given names, keeping its line endings */
function withIconNameUnion(iconsTs, names) {
  if (!UNION.test(iconsTs)) throw new Error('Could not find the IconName union in src/types/icons.ts')
  return iconsTs.replace(UNION, iconNameUnion(names, iconsTs.includes('\r\n') ? '\r\n' : '\n'))
}

module.exports = {
  ATTRIBUTES,
  CATEGORIES,
  FILLS,
  LUCIDE_VERSION,
  TAGS,
  addLucideIcon,
  checkCategory,
  checkName,
  iconNameUnion,
  joinIconSet,
  lucideElements,
  lucideTags,
  splitIconSet,
  withIconNameUnion,
}
