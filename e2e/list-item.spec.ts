import { expect, test } from '@playwright/test'

// ListItem's expanded content in a real browser (#390): jsdom has no layout, so it can't tell
// whether tall content is clipped. Uses pages/fixtures/list-item.tsx.

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/list-item')
})

test('shows expanded content taller than 1000px in full', async ({ page }) => {
  await page.getByRole('button', { name: 'Tall details' }).click()
  const content = page.getByTestId('tall-content')
  // Once the transition settles, the inner element is as tall as everything in it: nothing is
  // clipped, and the panel around it is taller than the content
  await expect
    .poll(() =>
      content.evaluate((el) => {
        const inner = el.parentElement!
        return inner.scrollHeight - inner.clientHeight
      })
    )
    .toBe(0)
  const panelHeight = await content.evaluate((el) => el.parentElement!.parentElement!.getBoundingClientRect().height)
  expect(panelHeight).toBeGreaterThan(1600)
  await page.getByTestId('last-link').scrollIntoViewIfNeeded()
  await expect(page.getByTestId('last-link')).toBeInViewport()
})

test('closes completely and hides the content from the keyboard', async ({ page }) => {
  const toggle = page.getByRole('button', { name: 'Tall details' })
  await toggle.click()
  await expect(page.getByTestId('last-link')).toBeVisible()
  await toggle.click()
  await expect
    .poll(() => page.getByTestId('tall-content').evaluate((el) => el.parentElement!.parentElement!.getBoundingClientRect().height))
    .toBe(0)
  await expect(page.getByTestId('last-link')).toBeHidden()
})
