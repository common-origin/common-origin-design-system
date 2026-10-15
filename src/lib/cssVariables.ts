// Components read tokens as CSS variables, with the resolved value as the fallback (decision 0041).
// A product that loads tokens.css can change a token for a region (a density or motion mode, a
// theme); one that doesn't renders exactly the resolved values.

/**
 * The CSS variable tokens.css declares for a token path: Style Dictionary's `name/kebab` with the
 * `co` prefix. `semantic.color.text.default` is `--co-semantic-color-text-default`, and
 * `semantic.border.focusOffset` is `--co-semantic-border-focus-offset`.
 */
export function cssVariableName(path: string[]): string {
  return `--${['co', ...path]
    .join('-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()}`
}

/** Breakpoints stay values: a CSS variable can't be used in a media query */
const keepsValue = (path: string[]) => path[1] === 'breakpoint'

type Tree = { [key: string]: string | Tree }

/**
 * A copy of a token tree with the same shape, where every value reads its CSS variable and falls
 * back to the resolved value: `var(--co-semantic-color-text-default, #212529)`.
 */
export function withCssVariables<T extends Tree>(tree: T, path: string[] = []): T {
  return Object.fromEntries(
    Object.entries(tree).map(([key, value]) => {
      const at = [...path, key]
      if (typeof value !== 'string') return [key, withCssVariables(value, at)]
      return [key, keepsValue(at) ? value : `var(${cssVariableName(at)}, ${value})`]
    })
  ) as T
}
