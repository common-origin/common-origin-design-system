/**
 * @jest-environment node
 */
import { readFileSync } from 'fs'
import { join } from 'path'
import tokens from '@/styles/tokens.json'

// tokens.css is published as @common-origin/design-system/tokens.css (decision 0017 §4), with
// names that keep their tier (decision 0024) and var() references between variables
const css = readFileSync(join(__dirname, '../styles/tokens.css'), 'utf8')
const declared = new Map(
  [...css.matchAll(/^\s*(--[a-z0-9-]+):\s*(.*?);(?:\s*\/\*\*.*\*\/)?\s*$/gm)].map((match) => [match[1], match[2]])
)

const kebab = (key: string) => key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const leaves: [string, string][] = []
;(function walk(node: Record<string, unknown>, path: string[]) {
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === 'object') walk(value as Record<string, unknown>, [...path, key])
    else leaves.push([`--co-${[...path, key].map(kebab).join('-')}`, String(value)])
  }
})(tokens, [])

// Replace each var() with the variable's own value until none are left
function resolve(value: string, seen: string[] = []): string {
  return value.replace(/var\((--[a-z0-9-]+)\)/g, (_, name: string) => {
    if (seen.includes(name)) throw new Error(`circular reference: ${[...seen, name].join(' -> ')}`)
    const target = declared.get(name)
    if (target === undefined) throw new Error(`undefined variable ${name}`)
    return resolve(target, [...seen, name])
  })
}

describe('tokens.css', () => {
  it('declares one variable per token, named --co-<tier>-<path>', () => {
    expect([...declared.keys()].sort()).toEqual(leaves.map(([name]) => name).sort())
    expect([...declared.keys()].filter((name) => !/^--co-(base|semantic|component)-/.test(name))).toEqual([])
  })

  it('references only declared variables', () => {
    const missing = [...declared.values()]
      .flatMap((value) => [...value.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((match) => match[1]))
      .filter((name) => !declared.has(name))
    expect(missing).toEqual([])
  })

  it('resolves every variable to its value in tokens.json', () => {
    const problems = leaves
      .filter(([name, value]) => resolve(declared.get(name) ?? '') !== value)
      .map(([name, value]) => `${name}: ${resolve(declared.get(name) ?? '')} (tokens.json: ${value})`)
    expect(problems).toEqual([])
  })

  it('keeps references, so semantic variables point at base variables', () => {
    expect(declared.get('--co-semantic-color-text-default')).toBe('var(--co-base-color-neutral-900)')
  })
})
