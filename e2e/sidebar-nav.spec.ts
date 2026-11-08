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

test('collapsing and expanding never jump: icons and labels hold their place, frame by frame (issue 348)', async ({ page }) => {
  // Every animation frame while it moves: where the Home row's icon and label sit, from the nav's
  // left edge. Only the width may change; a jump would show as an icon moving sideways.
  const track = (ms: number) =>
    nav(page).evaluate(async (el, ms) => {
      const home = [...el.querySelectorAll('[data-sidebar-row]')].find((r) => (r.getAttribute('aria-label') || r.textContent || '').startsWith('Home'))!
      const icon = home.querySelector('svg')!
      const label = [...home.querySelectorAll('span')].find((s) => s.textContent === 'Home')!
      const frames: number[][] = []
      const start = performance.now()
      while (performance.now() - start < ms) {
        const left = el.getBoundingClientRect().x
        frames.push([icon.getBoundingClientRect().x - left, label.getBoundingClientRect().x - left, el.getBoundingClientRect().width])
        await new Promise(requestAnimationFrame)
      }
      return frames
    }, ms)
  for (const button of ['Collapse sidebar', 'Expand sidebar']) {
    const frames = track(500)
    await page.waitForTimeout(20)
    await nav(page).getByRole('button', { name: button }).click()
    const result = await frames
    expect(new Set(result.map(([icon]) => Math.round(icon))).size).toBe(1)
    expect(new Set(result.map(([, label]) => Math.round(label))).size).toBe(1)
    // And the width really did move through the frames in between
    expect(new Set(result.map(([, , width]) => Math.round(width))).size).toBeGreaterThan(4)
    await page.waitForTimeout(300)
  }
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

test('a badge of any width stays inside its row, expanded and in the rail, in each density', async ({ page }) => {
  const inside = async (name: string) => (await Promise.all([/^Chats/, /^Mentions/].map((label) => insideRow(name, label)))).every(Boolean)
  const insideRow = (name: string, label: RegExp) =>
    // By its name: in the rail the label isn't shown as text
    nav(page, name).getByRole('link', { name: label }).evaluate((row) => {
      const badge = row.querySelector('[role="status"]')!.getBoundingClientRect()
      const box = row.getBoundingClientRect()
      return badge.left >= box.left && badge.right <= box.right && badge.top >= box.top && badge.bottom <= box.bottom
    })
  for (const name of ['Default', 'Compact']) {
    expect(await inside(name)).toBe(true)
    await nav(page, name).getByRole('button', { name: 'Collapse sidebar' }).click()
    await expect.poll(async () => Math.round((await nav(page, name).boundingBox())!.width)).toBe(56)
    expect(await inside(name)).toBe(true)
  }
})

test("every row's content ends inside the row when expanded, in each density", async ({ page }) => {
  for (const name of ['Default', 'Compact']) {
    const overflowing = await nav(page, name).evaluate((el) =>
      [...el.querySelectorAll('[data-sidebar-row]')]
        .filter((row) => {
          const box = row.getBoundingClientRect()
          return [...row.querySelectorAll('span')].some((span) => {
            const r = span.getBoundingClientRect()
            return r.width > 0 && r.right > box.right + 0.5
          })
        })
        .map((row) => row.textContent)
    )
    expect(overflowing).toEqual([])
  }
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
