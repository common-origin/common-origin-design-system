import { expect, test, type Page } from '@playwright/test'

// SidebarNav in a real browser (#331): the gliding highlight (0053), the width and section
// animations, density (0051) and forced colours. Uses pages/fixtures/sidebar-nav.tsx.

const nav = (page: Page, name = 'Default') => page.getByRole('navigation', { name })
const highlight = (page: Page, name = 'Default') => nav(page, name).locator('[data-sidebar-highlight]')

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/sidebar-nav')
})

test('the highlight glides to the hovered row and steps aside for the current page', async ({ page }) => {
  const invite = nav(page).getByRole('link', { name: /Invite users/ })
  // It appears at the first row without sliding, then glides from row to row
  await nav(page).getByRole('button', { name: 'New chat' }).hover()
  await expect(highlight(page)).toHaveCSS('opacity', '1')
  await invite.hover()
  // Let it settle, then compare its box with the row's
  await page.waitForTimeout(400)
  const [row, glide] = [await invite.boundingBox(), await highlight(page).boundingBox()]
  expect(Math.round(glide!.y)).toBe(Math.round(row!.y))
  expect(Math.round(glide!.height)).toBe(Math.round(row!.height))
  expect(await highlight(page).evaluate((el) => getComputedStyle(el).transitionProperty)).toContain('transform')
  await nav(page).getByRole('link', { name: 'Home' }).hover()
  await expect(highlight(page)).toHaveCSS('opacity', '0')
})

test('collapses to the 56px rail, animating its width', async ({ page }) => {
  expect(await nav(page).evaluate((el) => getComputedStyle(el).transitionProperty)).toContain('width')
  await nav(page).getByRole('button', { name: 'Collapse sidebar' }).click()
  await expect.poll(async () => Math.round((await nav(page).boundingBox())!.width)).toBe(56)
})

test('a section hides and shows its items, animating their height', async ({ page }) => {
  const toggle = nav(page).getByRole('button', { name: 'Chats' })
  const list = nav(page).getByRole('list', { name: 'Chats' })
  const open = (await list.boundingBox())!.height
  expect(open).toBeGreaterThan(0)
  await toggle.click()
  await expect.poll(async () => (await nav(page).locator(`#${await toggle.getAttribute('aria-controls')}`).boundingBox())?.height ?? 0).toBe(0)
  await toggle.click()
  await expect.poll(async () => (await list.boundingBox())!.height).toBe(open)
})

test('rows are 24px in a compact region and at least 24px everywhere (0051)', async ({ page }) => {
  const heights = async (name: string) =>
    nav(page, name).locator('[data-sidebar-row]').evaluateAll((rows) => rows.map((row) => row.getBoundingClientRect().height))
  expect(new Set(await heights('Default'))).toEqual(new Set([32]))
  expect(new Set(await heights('Compact'))).toEqual(new Set([24]))
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('the highlight jumps and the width changes at once', async ({ page }) => {
    expect(await highlight(page).evaluate((el) => getComputedStyle(el).transitionProperty)).not.toContain('transform')
    expect(await nav(page).evaluate((el) => getComputedStyle(el).transitionProperty)).not.toContain('width')
  })
})

test.describe('forced colours', () => {
  test.use({ forcedColors: 'active' })

  test('hides the highlight and marks the current page with a system colour', async ({ page }) => {
    await nav(page).getByRole('link', { name: /Invite users/ }).hover()
    await expect(highlight(page)).toBeHidden()
    const current = await nav(page).getByRole('link', { name: 'Home' }).evaluate((el) => getComputedStyle(el).backgroundColor)
    const system = await page.evaluate(() => {
      const probe = document.createElement('div')
      probe.style.backgroundColor = 'Highlight'
      document.body.append(probe)
      const value = getComputedStyle(probe).backgroundColor
      probe.remove()
      return value
    })
    expect(current).toBe(system)
  })
})
