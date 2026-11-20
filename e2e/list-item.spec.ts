import { expect, test } from '@playwright/test'

// ListItem's expanded content in a real browser (#390): jsdom has no layout, so it can't tell
// whether tall content is clipped. Uses pages/fixtures/list-item.tsx. The panel is the list item's
// own aria-hidden child.

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/list-item')
})

test('shows expanded content taller than 1000px in full', async ({ page }) => {
  await page.getByRole('button', { name: 'Tall details' }).click()
  const panel = page.getByTestId('tall-content').locator('xpath=ancestor::*[@aria-hidden][parent::li][1]')
  // Once the transition settles, the panel is taller than the 1600px content and nothing in it
  // is clipped
  await expect
    .poll(() => panel.evaluate((el) => el.scrollHeight - el.clientHeight))
    .toBe(0)
  expect((await panel.boundingBox())!.height).toBeGreaterThan(1600)
  await page.getByTestId('last-link').scrollIntoViewIfNeeded()
  await expect(page.getByTestId('last-link')).toBeInViewport()
})

test('closes completely and takes the content out of the tab order', async ({ page }) => {
  const toggle = page.getByRole('button', { name: 'Tall details' })
  const panel = page.getByTestId('tall-content').locator('xpath=ancestor::*[@aria-hidden][parent::li][1]')
  const lastLink = page.getByTestId('last-link')

  await toggle.click()
  // visibility turns visible on the first frame of the transition, not the instant of the click
  await expect(lastLink).toBeVisible()
  await toggle.focus()
  await page.keyboard.press('Tab')
  await expect(lastLink).toBeFocused()

  await toggle.click()
  await expect.poll(async () => (await panel.boundingBox())?.height ?? 0).toBe(0)
  await expect(lastLink).toBeHidden()
  await toggle.focus()
  await page.keyboard.press('Tab')
  await expect(lastLink).not.toBeFocused()
})
