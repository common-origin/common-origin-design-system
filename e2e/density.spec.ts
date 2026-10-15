import { expect, test, type Locator, type Page } from '@playwright/test'

// Density as a token mode (decision 0032, #191): data-co-density on an element changes control
// heights and control insets for everything inside it, and nothing outside it. Uses
// pages/fixtures/density.tsx, which loads tokens.css through the docs site.

const height = (locator: Locator) => locator.evaluate((el) => el.getBoundingClientRect().height)
const paddingLeft = (locator: Locator) => locator.evaluate((el) => parseFloat(getComputedStyle(el).paddingLeft))

const region = (page: Page, density: string) => page.locator(`[data-density-preview="${density}"]`)
const button = (page: Page, density: string, name: string) => region(page, density).getByRole('button', { name, exact: true })

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/density')
})

test('control heights move one 8px step per context (decision 0034)', async ({ page }) => {
  const heights = async (density: string) =>
    Promise.all(['Small', 'Medium', 'Large'].map((name) => height(button(page, density, name))))
  expect(await heights('compact')).toEqual([24, 32, 40])
  expect(await heights('default')).toEqual([32, 40, 48])
  expect(await heights('comfortable')).toEqual([40, 48, 56])
})

test('fields take the large control height in each context', async ({ page }) => {
  const field = (density: string) => region(page, density).getByRole('textbox', { name: 'Payee' })
  expect(await height(field('compact'))).toBe(40)
  expect(await height(field('default'))).toBe(48)
  expect(await height(field('comfortable'))).toBe(56)
})

test('the inset inside controls moves one step with them', async ({ page }) => {
  // A medium Button's sides are space.inset.lg: 12, 16 and 20px
  const sides = await Promise.all(['compact', 'default', 'comfortable'].map((d) => paddingLeft(button(page, d, 'Medium'))))
  expect(sides).toEqual([12, 16, 20])
})

test('a region changes only what is inside it, and a nested default resets it', async ({ page }) => {
  expect(await height(page.locator('[data-outside]').getByRole('button'))).toBe(40)
  expect(await height(page.locator('[data-nested-reset]').getByRole('button'))).toBe(40)
})

test('compact keeps every control at least 24 × 24px (WCAG 2.5.8)', async ({ page }) => {
  const controls = region(page, 'compact').locator('button, input, [role="combobox"]')
  const sizes = await controls.evaluateAll((elements) =>
    elements.map((el) => {
      const box = el.getBoundingClientRect()
      return { label: el.getAttribute('aria-label') ?? el.textContent?.trim() ?? el.tagName, width: box.width, height: box.height }
    })
  )
  expect(sizes.length).toBeGreaterThan(0)
  expect(sizes.filter(({ width, height }) => width < 24 || height < 24)).toEqual([])
})
