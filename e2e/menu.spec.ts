import { expect, test } from '@playwright/test'

// Menu in a real browser (#329): the top layer, flipping and density, which jsdom can't run.
// Uses pages/fixtures/menu.tsx.

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/menu')
  await page.getByRole('button', { name: 'Options' }).click()
})

test('opens in the top layer, above the trigger when there\'s no room below', async ({ page }) => {
  const menu = page.getByTestId('menu')
  await expect(menu).toBeVisible()
  expect(await menu.evaluate((el) => el.matches(':popover-open'))).toBe(true)
  await expect(menu).toHaveAttribute('data-side', 'top')
  const [menuBox, triggerBox] = [await menu.boundingBox(), await page.getByRole('button', { name: 'Options' }).boundingBox()]
  expect(menuBox!.y + menuBox!.height).toBeLessThanOrEqual(triggerBox!.y)
})

test('keeps every item at least 24px tall in compact density (decision 0051)', async ({ page }) => {
  const heights = await page.getByRole('menu').locator('[role^="menuitem"]').evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().height)
  )
  expect(heights.length).toBe(4)
  expect(Math.min(...heights)).toBeGreaterThanOrEqual(24)
})

test.describe('forced colours', () => {
  test.use({ forcedColors: 'active' })

  test('keeps the panel\'s edge and marks the checked item with a system colour', async ({ page }) => {
    const panel = await page.getByTestId('menu').evaluate((el) => {
      const cs = getComputedStyle(el)
      return { width: parseFloat(cs.borderTopWidth), style: cs.borderTopStyle }
    })
    expect(panel.width).toBeGreaterThan(0)
    expect(panel.style).toBe('solid')
    const checked = page.getByRole('menuitemradio', { name: 'Creamery Ops' })
    const background = await checked.evaluate((el) => getComputedStyle(el).backgroundColor)
    const highlight = await page.evaluate(() => {
      const probe = document.createElement('div')
      probe.style.backgroundColor = 'Highlight'
      document.body.append(probe)
      const value = getComputedStyle(probe).backgroundColor
      probe.remove()
      return value
    })
    expect(background).toBe(highlight)
  })
})
