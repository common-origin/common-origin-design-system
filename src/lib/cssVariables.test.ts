/**
 * @jest-environment node
 */
import fs from 'fs'
import path from 'path'
import tokensJson from '../styles/tokens.json'
import { cssVariableName, withCssVariables } from './cssVariables'

// Components read tokens through withCssVariables (decision 0041, #245), so every variable it
// names must be one tokens.css declares, or a mode could never reach it.

type Tree = { [key: string]: string | Tree }

const leaves = (tree: Tree, at: string[] = []): [string[], string][] =>
  Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'string' ? [[[...at, key], value] as [string[], string]] : leaves(value, [...at, key])
  )

const declared = new Set(
  [...fs.readFileSync(path.join(__dirname, '../styles/tokens.css'), 'utf8').matchAll(/^\s*(--co-[\w-]+):/gm)].map((m) => m[1])
)
const tokens = tokensJson as Tree
const withVariables = withCssVariables(tokens)

describe('cssVariableName', () => {
  it('names every token the way tokens.css does', () => {
    const missing = leaves(tokens).map(([at]) => cssVariableName(at)).filter((name) => !declared.has(name))
    expect(missing).toEqual([])
  })

  it('splits camelCase keys and keeps digits with their word', () => {
    expect(cssVariableName(['component', 'button', 'focus', 'outlineOffset'])).toBe('--co-component-button-focus-outline-offset')
    expect(cssVariableName(['semantic', 'typography', 'h1'])).toBe('--co-semantic-typography-h1')
    expect(cssVariableName(['semantic', 'radius', '2xl'])).toBe('--co-semantic-radius-2xl')
  })
})

describe('withCssVariables', () => {
  const resolved = new Map(leaves(tokens).map(([at, value]) => [at.join('.'), value]))
  const mirrored = leaves(withVariables)

  it('keeps the shape: the same paths as tokens.json', () => {
    expect(mirrored.map(([at]) => at.join('.'))).toEqual([...resolved.keys()])
  })

  it('reads each token from its variable, falling back to the resolved value', () => {
    const wrong = mirrored
      .filter(([at]) => at[1] !== 'breakpoint')
      .filter(([at, value]) => value !== `var(${cssVariableName(at)}, ${resolved.get(at.join('.'))})`)
      .map(([at]) => at.join('.'))
    expect(wrong).toEqual([])
  })

  it('leaves breakpoints as values, as media queries need', () => {
    const breakpoints = mirrored.filter(([at]) => at[1] === 'breakpoint')
    expect(breakpoints.length).toBeGreaterThan(0)
    for (const [at, value] of breakpoints) expect(value).toBe(resolved.get(at.join('.')))
  })
})
