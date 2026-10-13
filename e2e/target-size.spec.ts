import { expect, test } from '@playwright/test'

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
