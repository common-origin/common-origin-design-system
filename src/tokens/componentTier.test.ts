/**
 * @jest-environment node
 */
import source from './component/index.json'

type Node = { [key: string]: Node | string }
type Leaf = { path: string; node: Node | string; type?: string }

// The component tier, normalised in step 3 of the token pipeline migration (decision 0017, #24)
// under decisions 0014 and 0022

// The source is DTCG: a token has `$value`, and its `$type` may sit on a parent group. An object
// with no child tokens or groups (only `$` metadata, or nothing) is a token that lost its
// `$value`, so it's returned as a leaf for the checks below to report.
function leaves(node: Node, path: string[] = [], inheritedType?: string): Leaf[] {
  const groupType = typeof node.$type === 'string' ? node.$type : inheritedType
  const isGroup = (child: Node) =>
    !('$value' in child) && Object.keys(child).some((key) => !key.startsWith('$'))
  return Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .flatMap(([key, child]) =>
      typeof child === 'object' && isGroup(child)
        ? leaves(child, [...path, key], groupType)
        : [{ path: [...path, key].join('.'), node: child, type: typeof child === 'object' ? String(child.$type ?? groupType ?? '') : undefined }]
    )
}

const components = Object.entries((source as unknown as { component: Node }).component)
const converted = components.flatMap(([name, node]) =>
  leaves(node as Node, ['component', name], (source as unknown as { component: Node }).component.$type as string | undefined)
)

describe('component tier (decisions 0014 and 0022)', () => {
  it('every leaf is a real token with a value, a type and a description', () => {
    const problems = converted.flatMap(({ path, node, type }) => {
      if (typeof node !== 'object') return [`${path}: a plain string, not a token`]
      return [
        ...(node.$value ? [] : [`${path}: no $value`]),
        ...(type ? [] : [`${path}: no $type (on the token or a parent group)`]),
        ...(node.$description ? [] : [`${path}: no $description`]),
      ]
    })
    expect(problems).toEqual([])
  })

  // The only exception: Button's deprecated `emphasis` variant, kept until 3.0, aliases the
  // matching `accent` token (decision 0016). Matched by exact path, so no other token can opt out.
  const ALIAS = /^component\.button\.variants\.emphasis\.(.+)$/
  // Decision 0036 (interim, #224): domain tokens that 0031 §6 moved out of the semantic tier may
  // reference base values where no semantic token fits, listed by exact path. #224 empties this.
  const BASE_INTERIM = [
    'component.status.pending.text',
    'component.status.pending.background',
    'component.status.processing.text',
    'component.status.processing.background',
    'component.status.scheduled.text',
    'component.status.scheduled.background',
    'component.transaction.credit',
    'component.transaction.credit-hover',
    'component.transaction.debit',
    'component.transaction.debit-hover',
    'component.transaction.pending',
    'component.transaction.neutral',
    'component.track.background',
    'component.tooltip.border',
    'component.breadcrumbs.font',
    'component.button.sizes.small.font',
    'component.slider.thumb.background',
  ]

  it('lists only interim base references that still exist and still need it', () => {
    const byPath = new Map(converted.map(({ path, node }) => [path, node]))
    const stale = BASE_INTERIM.filter((path) => !/\{base\./.test(String((byPath.get(path) as Node | undefined)?.$value ?? '')))
    expect(stale).toEqual([])
  })

  it('references only semantic tokens', () => {
    const problems = converted
      // A leaf with no `$value` is reported by the test above, not counted as having no references
      .filter(({ node }) => typeof node === 'object' && typeof node.$value === 'string')
      .flatMap(({ path, node }) => {
        const refs = [...String((node as Node).$value).matchAll(/\{([^}]+)\}/g)].map((match) => match[1])
        const aliasTarget = path.match(ALIAS)?.[1]
        return refs
          .filter((ref) => !ref.startsWith('semantic.') && ref !== `component.button.variants.accent.${aliasTarget}`)
          .filter((ref) => !(BASE_INTERIM.includes(path) && ref.startsWith('base.')))
          .map((ref) => `${path}: {${ref}}`)
      })
    expect(problems).toEqual([])
  })
})

// Deprecated tokens, in every tier, are checked in deprecation.test.ts (decision 0033, #200).
