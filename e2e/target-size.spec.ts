import { expect, test, type Page } from '@playwright/test'

// WCAG 2.2 AA 2.5.8 Target size (minimum): pointer targets are at least 24 × 24px (decision 0039,
// #209). The chip close button is 20px to look, with a 24px hit area. Uses the fixture page's
// InputChips (pages/fixtures/forced-colors.tsx).
const TARGET = 24

test('the chip close button takes pointer input across a 24 × 24px area', async ({ page }) => {
  await page.goto('/fixtures/forced-colors')
  for (const id of ['chip-input', 'chip-input-selected']) {
    const result = await page.evaluate(
      ({ id, target }) => {
        const button = document.querySelector<HTMLElement>(`[data-fc="${id}"] button`)
        if (!button) throw new Error(`${id}: no close button`)
        const box = button.getBoundingClientRect()
        const cx = box.left + box.width / 2
        const cy = box.top + box.height / 2
        // Just inside each corner and edge of the 24px square centred on the button
        const reach = target / 2 - 0.5
        const points = [
          [cx - reach, cy - reach], [cx + reach, cy - reach], [cx - reach, cy + reach], [cx + reach, cy + reach],
          [cx, cy - reach], [cx, cy + reach], [cx - reach, cy], [cx + reach, cy],
        ]
        return {
          visible: { width: box.width, height: box.height },
          missed: points.filter(([x, y]) => document.elementFromPoint(x, y) !== button).length,
        }
      },
      { id, target: TARGET }
    )
    // The button still looks 20px; the hit area is what grew
    expect(result.visible).toEqual({ width: 20, height: 20 })
    expect(result.missed, `${id}: points of the 24px area that miss the button`).toBe(0)
  }
})

// The Slider thumb is 20px to look at, with a hit area of semantic.size.pointerTarget (24px) for a
// mouse or pen and semantic.size.touchTarget (44px) on a touch screen (#231). A range slider's two
// hit areas stop at the midpoint between the thumbs, so each stays separately grabbable.
const TOUCH_TARGET = 44

type Probe = { centre: { x: number; y: number }; width: number }

// The thumbs of the `data-fc` case, measured in the page
async function thumbs(page: Page, id: string): Promise<Probe[]> {
  return page.evaluate((id) => {
    const found = [...document.querySelectorAll<HTMLElement>(`[data-fc="${id}"] [role="slider"]`)]
    if (!found.length) throw new Error(`${id}: no slider thumbs`)
    return found.map((thumb) => {
      const box = thumb.getBoundingClientRect()
      return { centre: { x: box.left + box.width / 2, y: box.top + box.height / 2 }, width: box.width }
    })
  }, id)
}

// Which thumb (by index in the case) each point lands on, or -1 for none
async function landsOn(page: Page, id: string, points: [number, number][]): Promise<number[]> {
  return page.evaluate(
    ({ id, points }) => {
      const found = [...document.querySelectorAll(`[data-fc="${id}"] [role="slider"]`)]
      return points.map(([x, y]) => found.indexOf(document.elementFromPoint(x, y) as Element))
    },
    { id, points }
  )
}

// Points just inside each corner and edge of a square of `size` centred on (x, y)
const square = ({ x, y }: { x: number; y: number }, size: number): [number, number][] => {
  const reach = size / 2 - 0.5
  return [
    [x - reach, y - reach], [x + reach, y - reach], [x - reach, y + reach], [x + reach, y + reach],
    [x, y - reach], [x, y + reach], [x - reach, y], [x + reach, y],
  ]
}

async function checkThumbs(page: Page, size: number) {
  await page.goto('/fixtures/forced-colors')
  await page.locator('[data-fc="slider"]').scrollIntoViewIfNeeded()

  // A single thumb takes the whole square around it, and still looks 20px
  const [single] = await thumbs(page, 'slider')
  expect(single.width, 'the thumb still looks 20px').toBe(20)
  const hits = await landsOn(page, 'slider', square(single.centre, size))
  expect(hits.filter((hit) => hit !== 0), `points of the ${size}px area that miss the thumb`).toEqual([])
  const [outside] = await landsOn(page, 'slider', [[single.centre.x + size / 2 + 1, single.centre.y]])
  expect(outside, 'a point beyond the hit area').toBe(-1)

  // Close range thumbs split the space between them at the midpoint
  await page.locator('[data-fc="slider-range"]').scrollIntoViewIfNeeded()
  const [low, high] = await thumbs(page, 'slider-range')
  const midpoint = (low.centre.x + high.centre.x) / 2
  expect(high.centre.x - low.centre.x, 'the fixture thumbs share a value').toBe(0)
  const y = low.centre.y
  expect(
    await landsOn(page, 'slider-range', [
      [low.centre.x - size / 2 + 0.5, y], // the low thumb's outer edge
      [midpoint - 1, y],
      [midpoint + 1, y],
      [high.centre.x + size / 2 - 0.5, y], // the high thumb's outer edge
    ])
  ).toEqual([0, 0, 1, 1])
}

test('the Slider thumb takes mouse input across a 24 × 24px area', async ({ page }) => {
  expect(await page.evaluate(() => matchMedia('(pointer: fine)').matches)).toBe(true)
  await checkThumbs(page, TARGET)
})

test.describe('on a touch screen', () => {
  test.use({ hasTouch: true, isMobile: true })

  test('the Slider thumb takes touch input across a 44 × 44px area', async ({ page }) => {
    expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(true)
    await checkThumbs(page, TOUCH_TARGET)
  })
})
