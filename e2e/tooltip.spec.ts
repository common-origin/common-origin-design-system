import { expect, test } from '@playwright/test'

// Tooltip in a real browser (#326): the Popover API's top layer and the positioner, which jsdom
// can't run. Uses pages/fixtures/tooltip.tsx.

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/tooltip')
})

test('renders in the top layer, so a scrolling container doesn\'t clip it', async ({ page }) => {
  await page.getByRole('button', { name: 'Inside a scroll box' }).focus()
  const tip = page.getByTestId('clip-tip')
  await expect(tip).toBeVisible()
  expect(await tip.evaluate((el) => el.matches(':popover-open'))).toBe(true)
  // It runs past the 120px box's right edge, and just beyond that edge the tooltip is what's
  // there, not the page: the box doesn't clip it
  const box = await tip.boundingBox()
  const clip = await page.locator('[data-clip]').boundingBox()
  const clipRight = clip!.x + clip!.width
  expect(box!.x + box!.width).toBeGreaterThan(clipRight + 8)
  const hit = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.getAttribute('data-testid'), {
    x: clipRight + 4,
    y: box!.y + box!.height / 2,
  })
  expect(hit).toBe('clip-tip')
})

test('flips to the other side when there\'s no room on its side', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'At the edge' })
  await trigger.focus()
  const tip = page.getByTestId('edge-tip')
  await expect(tip).toBeVisible()
  const [tipBox, triggerBox] = [await tip.boundingBox(), await trigger.boundingBox()]
  expect(tipBox!.y).toBeGreaterThanOrEqual(triggerBox!.y + triggerBox!.height)
  await expect(tip).toHaveAttribute('data-side', 'bottom')
})

test('opens on hover after the delay and closes on Escape, keeping focus', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Inside a scroll box' })
  await trigger.hover()
  await expect(page.getByTestId('clip-tip')).toBeVisible()
  await trigger.focus()
  await page.keyboard.press('Escape')
  await expect(page.getByTestId('clip-tip')).toBeHidden()
  await expect(trigger).toBeFocused()
})

test.describe('forced colours', () => {
  test.use({ forcedColors: 'active' })

  test('keeps a visible edge', async ({ page }) => {
    await page.getByRole('button', { name: 'At the edge' }).focus()
    const border = await page.getByTestId('edge-tip').evaluate((el) => {
      const cs = getComputedStyle(el)
      return { width: parseFloat(cs.borderTopWidth), style: cs.borderTopStyle }
    })
    expect(border.width).toBeGreaterThan(0)
    expect(border.style).toBe('solid')
  })
})
