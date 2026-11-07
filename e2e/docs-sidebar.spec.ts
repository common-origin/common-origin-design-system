import { expect, test } from '@playwright/test'

// The docs site's sidebar is the system's own SidebarNav (#332): deep links, the current page in
// view, client-side navigation, and a Sheet on small screens.

test('links to each component and marks the one shown', async ({ page }) => {
  await page.goto('/components?component=tooltip')
  const nav = page.getByRole('navigation', { name: 'Components' })
  await expect(nav.getByRole('link', { name: 'Tooltip' })).toHaveAttribute('aria-current', 'page')
  await expect(page.getByRole('heading', { level: 1, name: 'Tooltip' })).toBeVisible()
})

test('scrolls the current item into view in a long list', async ({ page }) => {
  await page.goto('/components?component=workspace-switcher')
  const nav = page.getByRole('navigation', { name: 'Components' })
  const current = nav.locator('[aria-current="page"]')
  await expect(current).toHaveAccessibleName('WorkspaceSwitcher')
  await expect(current).toBeInViewport()
})

test('navigates on the client, updating the URL and the page', async ({ page }) => {
  await page.goto('/components?component=badge')
  const nav = page.getByRole('navigation', { name: 'Components' })
  await nav.getByRole('link', { name: 'Menu' }).click()
  await expect(page).toHaveURL(/component=menu/)
  await expect(page.getByRole('heading', { level: 1, name: 'Menu' })).toBeVisible()
  await expect(nav.getByRole('link', { name: 'Menu' })).toHaveAttribute('aria-current', 'page')
})

test('the tokens and patterns pages use it too', async ({ page }) => {
  await page.goto('/tokens?tab=border')
  await expect(page.getByRole('navigation', { name: 'Token categories' }).locator('[aria-current="page"]')).toBeVisible()
  await page.goto('/patterns')
  await expect(page.getByRole('navigation', { name: 'Patterns' }).locator('[aria-current="page"]')).toBeVisible()
})

test.describe('small screens', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('opens the navigation in a Sheet, which closes when a page is chosen', async ({ page }) => {
    await page.goto('/components?component=badge')
    await page.getByRole('button', { name: 'Badge' }).click()
    const sheet = page.getByRole('dialog', { name: 'Components' })
    await expect(sheet).toBeVisible()
    await sheet.getByRole('link', { name: 'Menu' }).click()
    await expect(page).toHaveURL(/component=menu/)
    await expect(sheet).toBeHidden()
  })
})
