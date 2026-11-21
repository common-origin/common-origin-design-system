import { expect, test, type Page } from '@playwright/test'

// SidebarNav in a real browser (#331): the gliding highlight (0053), the width and section
// animations, density (0051, 0059, 0060) and forced colours. Uses pages/fixtures/sidebar-nav.tsx.

const nav = (page: Page, name = 'Default') => page.getByRole('navigation', { name })
const highlight = (page: Page, name = 'Default') => nav(page, name).locator('[data-sidebar-highlight]')
// The rail is a square row plus the nav's padding, so it follows density (0060)
const RAIL: Record<string, number> = { Compact: 48, Default: 56, Comfortable: 64 }

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

test('rows are 32px in compact, 40px in default and 48px in comfortable (0059)', async ({ page }) => {
  const heights = async (name: string) =>
    nav(page, name).locator('[data-sidebar-row]').evaluateAll((rows) => rows.map((row) => row.getBoundingClientRect().height))
  expect(new Set(await heights('Compact'))).toEqual(new Set([32]))
  expect(new Set(await heights('Default'))).toEqual(new Set([40]))
  expect(new Set(await heights('Comfortable'))).toEqual(new Set([48]))
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
  for (const name of ['Default', 'Compact', 'Comfortable']) {
    expect(await inside(name)).toBe(true)
    await nav(page, name).getByRole('button', { name: 'Collapse sidebar' }).click()
    await expect.poll(async () => Math.round((await nav(page, name).boundingBox())!.width)).toBe(RAIL[name])
    expect(await inside(name)).toBe(true)
  }
})

test('in the rail every row is the rail\'s width, so its rounded corners show on both sides', async ({ page }) => {
  for (const name of ['Default', 'Compact', 'Comfortable']) {
    await nav(page, name).getByRole('button', { name: 'Collapse sidebar' }).click()
    await expect.poll(async () => Math.round((await nav(page, name).boundingBox())!.width)).toBe(RAIL[name])
    const tooWide = await nav(page, name).evaluate((el) => {
      const list = el.querySelector('ul')!.getBoundingClientRect()
      return [...el.querySelectorAll('[data-sidebar-row]')]
        .filter((row) => row.getBoundingClientRect().height > 0 && row.getBoundingClientRect().right > list.right + 0.5)
        .map((row) => row.getAttribute('aria-label'))
    })
    expect(tooWide).toEqual([])
  }
})

test('the workspace switcher and the toggles are as tall as the rows, in each density (0059)', async ({ page }) => {
  for (const [name, height] of [['Compact', 32], ['Default', 40], ['Comfortable', 48]] as const) {
    const switcher = await nav(page, name).getByRole('button', { name: /Creamery Ops/ }).boundingBox()
    expect(Math.round(switcher!.height)).toBe(height)
    for (const toggle of ['Collapse sidebar', 'Expand sidebar']) {
      // The expand toggle is faded out while expanded, but it keeps its size
      const box = await nav(page, name).getByRole('button', { name: toggle, includeHidden: true }).evaluate((el) => {
        const rect = el.getBoundingClientRect()
        return { width: rect.width, height: rect.height, icon: el.querySelector('svg')!.getBoundingClientRect().width }
      })
      expect([box.width, box.height, box.icon]).toEqual([height, height, 16])
    }
  }
})

test('the switcher lines up with the rows: its avatar on their icons, its name with their labels', async ({ page }) => {
  for (const name of ['Compact', 'Default', 'Comfortable']) {
    const offsets = await nav(page, name).evaluate((el) => {
      const trigger = el.querySelector('button[aria-haspopup]')!
      const avatar = trigger.querySelector('[data-size]')!.getBoundingClientRect()
      const nameText = [...trigger.querySelectorAll('span')].find((s) => s.textContent === 'Creamery Ops' && !s.children.length)!
      const row = [...el.querySelectorAll('[data-sidebar-row]')].find((r) => r.textContent?.startsWith('Invite'))!
      const icon = row.querySelector('svg')!.getBoundingClientRect()
      const label = [...row.querySelectorAll('span')].find((s) => s.textContent === 'Invite users')!
      return [
        Math.round(avatar.left + avatar.width / 2 - (icon.left + icon.width / 2)),
        Math.round(nameText.getBoundingClientRect().left - label.getBoundingClientRect().left),
      ]
    })
    expect(offsets).toEqual([0, 0])
  }
})

test('without the collapse toggle, the header content spans the nav like the rows', async ({ page }) => {
  const gap = await nav(page, 'Not collapsible').evaluate((el) => {
    const trigger = el.querySelector('button[aria-haspopup]')!.getBoundingClientRect()
    const list = el.querySelector('ul')!.getBoundingClientRect()
    return Math.round(list.right - trigger.right)
  })
  expect(gap).toBe(0)
})

test('text, gap and padding follow density: 14px text in compact, a 12px gap and 16px padding in comfortable (0060)', async ({ page }) => {
  const expected = {
    Compact: { font: '14px', weight: '400', switcherFont: '14px', switcherWeight: '600', gap: 8, left: 8, right: 8 },
    Default: { font: '16px', weight: '400', switcherFont: '16px', switcherWeight: '600', gap: 8, left: 12, right: 12 },
    Comfortable: { font: '16px', weight: '400', switcherFont: '16px', switcherWeight: '600', gap: 12, left: 16, right: 16 },
  }
  for (const [name, want] of Object.entries(expected)) {
    const got = await nav(page, name).evaluate((el) => {
      const row = [...el.querySelectorAll('[data-sidebar-row]')].find((r) => r.textContent?.startsWith('Invite'))!
      const box = row.getBoundingClientRect()
      const icon = row.querySelector('svg')!.getBoundingClientRect()
      const label = [...row.querySelectorAll('span')].find((s) => s.textContent === 'Invite users')!
      const meta = [...row.querySelectorAll('span')].find((s) => s.textContent === '3/10')!
      const trigger = el.querySelector('button[aria-haspopup]')!
      return {
        font: getComputedStyle(label).fontSize,
        weight: getComputedStyle(label).fontWeight,
        switcherFont: getComputedStyle(trigger).fontSize,
        switcherWeight: getComputedStyle(trigger).fontWeight,
        gap: Math.round(label.getBoundingClientRect().left - icon.right),
        left: Math.round(icon.left - box.left),
        right: Math.round(box.right - meta.getBoundingClientRect().right),
      }
    })
    expect({ name, ...got }).toEqual({ name, ...want })
  }
})

test('in the rail, each density\'s icons are centred and in the same place as when expanded', async ({ page }) => {
  for (const name of ['Compact', 'Default', 'Comfortable']) {
    const iconX = () =>
      nav(page, name).evaluate((el) => {
        const icon = el.querySelector('[data-sidebar-row] svg')!.getBoundingClientRect()
        return Math.round(icon.left - el.getBoundingClientRect().left)
      })
    const expanded = await iconX()
    await nav(page, name).getByRole('button', { name: 'Collapse sidebar' }).click()
    await expect.poll(async () => Math.round((await nav(page, name).boundingBox())!.width)).toBe(RAIL[name])
    const sides = await nav(page, name).evaluate((el) => {
      const nav = el.getBoundingClientRect()
      const icon = el.querySelector('[data-sidebar-row] svg')!.getBoundingClientRect()
      return [Math.round(icon.left - nav.left), Math.round(nav.right - icon.right)]
    })
    expect(sides[0]).toBe(sides[1])
    expect(sides[0]).toBe(expanded)
  }
})

test('section headers line up with the items: the caret on their icons, the label with their labels (0060)', async ({ page }) => {
  for (const name of ['Compact', 'Default', 'Comfortable']) {
    const offsets = await nav(page, name).evaluate((el) => {
      const disclosure = el.querySelector('button[aria-controls]')!
      const caret = disclosure.querySelector('svg')!.getBoundingClientRect()
      const text = [...disclosure.childNodes].find((node) => node.nodeType === Node.TEXT_NODE)!
      const range = document.createRange()
      range.selectNodeContents(text)
      const row = [...el.querySelectorAll('[data-sidebar-row]')].find((r) => r.textContent?.startsWith('Invite'))!
      const icon = row.querySelector('svg')!.getBoundingClientRect()
      const label = [...row.querySelectorAll('span')].find((s) => s.textContent === 'Invite users')!
      return [
        Math.round(caret.left + caret.width / 2 - (icon.left + icon.width / 2)),
        Math.round(range.getBoundingClientRect().left - label.getBoundingClientRect().left),
      ]
    })
    expect({ name, offsets }).toEqual({ name, offsets: [0, 0] })
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

test("the workspace menu is at least as wide as its trigger, and lines up with it (issue 350)", async ({ page }) => {
  const trigger = nav(page).getByRole('button', { name: 'Creamery Ops' })
  await trigger.click()
  const menu = page.getByRole('menu')
  await expect(menu).toBeVisible()
  const [button, panel] = [await trigger.boundingBox(), await menu.boundingBox()]
  expect(Math.round(panel!.width)).toBeGreaterThanOrEqual(Math.round(button!.width))
  expect(Math.round(panel!.x)).toBe(Math.round(button!.x))
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
