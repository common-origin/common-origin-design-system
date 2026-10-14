import { expect, test, type Page } from '@playwright/test'

// Slider thumbs drag with touch through pointer events, and a vertical swipe over the track still
// scrolls the page (#235). jsdom has no touch-action, so this runs real touches in Chromium.
// Uses the fixture page's Slider (pages/fixtures/forced-colors.tsx).
test.use({ hasTouch: true })

type Point = { x: number; y: number }

// A one-finger swipe in steps, through the DevTools protocol, so the browser decides between
// scrolling and handing the gesture to the page exactly as it would for a real finger
async function swipe(page: Page, from: Point, to: Point) {
  const cdp = await page.context().newCDPSession(page)
  const steps = 10
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [from] })
  for (let i = 1; i <= steps; i++) {
    const point = { x: from.x + ((to.x - from.x) * i) / steps, y: from.y + ((to.y - from.y) * i) / steps }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point] })
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await cdp.detach()
}

async function thumbCentre(page: Page) {
  const thumb = page.locator('[data-fc="slider"] [role="slider"]')
  await thumb.scrollIntoViewIfNeeded()
  const box = await thumb.boundingBox()
  if (!box) throw new Error('slider: no thumb')
  return { thumb, centre: { x: box.x + box.width / 2, y: box.y + box.height / 2 } }
}

test('a touch drag on the thumb moves the value, not the page', async ({ page }) => {
  await page.goto('/fixtures/forced-colors')
  const { thumb, centre } = await thumbCentre(page)
  const before = Number(await thumb.getAttribute('aria-valuenow'))
  const scrollBefore = await page.evaluate(() => window.scrollY)

  await swipe(page, centre, { x: centre.x + 80, y: centre.y })

  expect(Number(await thumb.getAttribute('aria-valuenow'))).toBeGreaterThan(before)
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore)
})

test('a vertical swipe over the track still scrolls the page', async ({ page }) => {
  await page.goto('/fixtures/forced-colors')
  const { thumb, centre } = await thumbCentre(page)
  const track = await thumb.locator('..').boundingBox()
  if (!track) throw new Error('slider: no track')
  // On the track, clear of the thumb
  const start = { x: track.x + track.width - 8, y: track.y + track.height / 2 }
  expect(Math.abs(start.x - centre.x)).toBeGreaterThan(24)
  const value = await thumb.getAttribute('aria-valuenow')
  const scrollBefore = await page.evaluate(() => window.scrollY)

  await swipe(page, start, { x: start.x, y: start.y - 120 })

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollBefore)
  expect(await thumb.getAttribute('aria-valuenow')).toBe(value)
})
