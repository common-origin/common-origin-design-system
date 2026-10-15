import { expect, test, type Page } from '@playwright/test'
import tokens from '../src/styles/tokens.json'
import { cssVariableName } from '../src/lib/cssVariables'

// Components read tokens as CSS variables that fall back to the resolved values (decision 0041,
// #245). Uses the e2e fixture page (pages/fixtures/forced-colors.tsx), which loads tokens.css.

type Tree = { [key: string]: string | Tree }
const leaves = (tree: Tree, at: string[] = []): [string[], string][] =>
  Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'string' ? [[[...at, key], value] as [string[], string]] : leaves(value, [...at, key])
  )
const variables = leaves(tokens as Tree).filter(([at]) => at[1] !== 'breakpoint')

const button = (page: Page) => page.locator('[data-fc="button-primary"] button')
const measure = (page: Page) =>
  button(page).evaluate((el) => {
    const style = getComputedStyle(el)
    return { height: el.getBoundingClientRect().height, background: style.backgroundColor, color: style.color, font: style.font }
  })

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/forced-colors')
})

// So a product that doesn't load tokens.css renders exactly what one that does renders. tokens.css
// can be served minified (`.125rem` for `0.125rem`), so values are compared as the browser
// computes them: on the first CSS property that accepts the token, `var(--name)` and the fallback
// must compute to the same thing.
const PROPERTIES = [
  'color', 'width', 'box-shadow', 'font', 'font-family', 'font-weight', 'line-height', 'letter-spacing',
  'opacity', 'z-index', 'transition', 'transition-duration', 'transition-timing-function', 'border',
  'border-style', 'outline', 'transform', 'max-height', 'grid-template-columns',
]

test('every token variable in tokens.css computes to the fallback components use', async ({ page }) => {
  const differ = await page.evaluate(
    ({ variables, properties }) => {
      const live = document.createElement('div')
      const fallback = document.createElement('div')
      document.body.append(live, fallback)
      const problems: string[] = []
      for (const [name, value, token] of variables) {
        const property = properties.find((p) => {
          fallback.style.cssText = ''
          fallback.style.setProperty(p, value)
          return fallback.style.getPropertyValue(p) !== ''
        })
        if (!property) {
          problems.push(`${token}: no property accepts ${value}`)
          continue
        }
        live.style.cssText = ''
        live.style.setProperty(property, `var(${name})`)
        const [a, b] = [getComputedStyle(live).getPropertyValue(property), getComputedStyle(fallback).getPropertyValue(property)]
        if (a !== b) problems.push(`${token} (${property}): variable ${a}, fallback ${b}`)
      }
      live.remove()
      fallback.remove()
      return problems
    },
    { variables: variables.map(([at, value]) => [cssVariableName(at), value, at.join('.')]), properties: PROPERTIES }
  )
  expect(differ).toEqual([])
})

test('a token set on a region changes the components inside it, and only there', async ({ page }) => {
  const before = await measure(page)
  await page.locator('[data-fc="button-primary"]').evaluate((el) => {
    // The case wrapper is display: contents, so set the variable on its parent region
    ;(el.parentElement as HTMLElement).style.setProperty('--co-semantic-size-control-md', '2rem')
    ;(el.parentElement as HTMLElement).style.setProperty('--co-semantic-size-control-lg', '2.5rem')
  })
  const after = await measure(page)
  expect(after.height).toBeLessThan(before.height)
  expect(after.background).toBe(before.background)
  // A Button in another section keeps its height
  const elsewhere = page.locator('[data-fc="badge-count"] button')
  expect(await elsewhere.evaluate((el) => el.getBoundingClientRect().height)).toBe(before.height)
})

test('a component renders its resolved values with tokens.css removed', async ({ page }) => {
  const before = await measure(page)
  await page.evaluate(() => {
    for (const sheet of [...document.styleSheets]) {
      try {
        // The sheet that declares the variables; component styles only read them through var()
        if ([...sheet.cssRules].some((rule) => rule.cssText.includes('--co-semantic-color-text-default:'))) {
          ;(sheet.ownerNode as Element).remove()
        }
      } catch {
        // A cross-origin stylesheet can't be read, and isn't tokens.css
      }
    }
  })
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--co-semantic-color-text-default'))).toBe('')
  const after = await measure(page)
  expect({ height: after.height, background: after.background, color: after.color }).toEqual({
    height: before.height,
    background: before.background,
    color: before.color,
  })
})
