import base from './base/index.json'
import semantic from './semantic/index.json'
import component from './component/index.json'

type Node = { [key: string]: Node | string }

// Every token's effective DTCG `$type`: its own, or inherited from the nearest group that has one
function types(node: Node, path: string[] = [], inherited?: string, out = new Map<string, string>()) {
  const groupType = typeof node.$type === 'string' ? node.$type : inherited
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || typeof child !== 'object') continue
    if ('$value' in child) out.set([...path, key].join('.'), String(child.$type ?? groupType))
    else types(child, [...path, key], groupType, out)
  }
  return out
}

function aliases(node: Node, path: string[] = [], out: [string, string][] = []) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || typeof child !== 'object') continue
    const match = '$value' in child ? /^\{([^}]+)\}$/.exec(String(child.$value)) : null
    if (match) out.push([[...path, key].join('.'), match[1]])
    else if (!('$value' in child)) aliases(child, [...path, key], out)
  }
  return out
}

// The DTCG types this source uses (decision 0017, #24 step 5)
const DTCG_TYPES = new Set([
  'color', 'dimension', 'number', 'fontFamily', 'fontWeight', 'duration', 'cubicBezier',
  'strokeStyle', 'shadow', 'border', 'transition', 'typography',
])
// `other` is not a DTCG type. Only these deprecated layout and behaviour tokens use it, until 3.0.
const OTHER = new Set([
  'component.iconButton.primary.display',
  'component.iconButton.primary.alignItems',
  'component.iconButton.primary.justifyContent',
  'component.input.disabled.cursor',
])

function descriptions(node: Node, path: string[] = [], out: [string, string][] = []) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || typeof child !== 'object') continue
    // A DTCG description is text: anything else counts as missing
    if ('$value' in child) out.push([[...path, key].join('.'), typeof child.$description === 'string' ? child.$description : ''])
    else descriptions(child, [...path, key], out)
  }
  return out
}

// Every group that holds tokens directly, with its own description (or '' if it has none)
function groupDescriptions(node: Node, path: string[] = [], out: [string, string][] = []) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || typeof child !== 'object' || '$value' in child) continue
    const holdsTokens = Object.values(child).some((grandchild) => typeof grandchild === 'object' && '$value' in grandchild)
    if (holdsTokens) out.push([[...path, key].join('.'), typeof child.$description === 'string' ? child.$description : ''])
    groupDescriptions(child, [...path, key], out)
  }
  return out
}

const sources = [base, semantic, component] as unknown as Node[]
const typeOf = new Map(sources.flatMap((source) => [...types(source)]))

// Step 5 of the token pipeline migration (decision 0017, #24): a token that only references
// another token (an alias) has the same DTCG type as its target
describe('DTCG types', () => {
  it('give every token a supported DTCG type', () => {
    const problems = [...typeOf]
      .filter(([path, type]) => !DTCG_TYPES.has(type) && !(type === 'other' && OTHER.has(path)))
      .map(([path, type]) => `${path}: ${type}`)
    expect(problems).toEqual([])
  })

  // Decision 0014, rule 6, as amended by 0033: every semantic and component token has a
  // description saying when to use it
  it('describe every semantic and component token', () => {
    const undescribed = [semantic, component]
      .flatMap((source) => descriptions(source as unknown as Node))
      // A description of only whitespace doesn't count
      .filter(([, description]) => !description.trim())
      .map(([path]) => path)
    expect(undescribed).toEqual([])
  })

  // Base tokens are described per group, not per token: what the scale is and how it's keyed
  // (decision 0033, #201). Components never use base tokens, so a per-token description would
  // only restate the value.
  it('describe every base group that holds tokens', () => {
    const groups = groupDescriptions(base as unknown as Node)
    expect(groups.length).toBeGreaterThan(0)
    expect(groups.filter(([, description]) => !description.trim()).map(([path]) => path)).toEqual([])
  })

  it('match between an alias and the token it references', () => {
    const problems = sources
      .flatMap((source) => aliases(source))
      .filter(([path, ref]) => typeOf.get(path) !== typeOf.get(ref))
      .map(([path, ref]) => `${path} (${typeOf.get(path)}) -> ${ref} (${typeOf.get(ref)})`)
    expect(problems).toEqual([])
  })
})
