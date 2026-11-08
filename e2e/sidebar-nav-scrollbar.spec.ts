import { expect, test } from '@playwright/test'

// SidebarNav rows with a classic scrollbar (issue 348). Playwright hides scrollbars in headless
// Chromium; this file's browser keeps them, so the body's scrollbar takes room as it does on
// Windows, Linux and macOS with scrollbars always shown. Uses pages/fixtures/sidebar-nav.tsx.

test.use({ launchOptions: { ignoreDefaultArgs: ['--hide-scrollbars'] } })

test('rows still fit when the body scrolls and its scrollbar takes room', async ({ page }) => {
  await page.goto('/fixtures/sidebar-nav')
  const nav = page.getByRole('navigation', { name: 'Default' })
  await page.addStyleTag({ content: 'nav ::-webkit-scrollbar { width: 15px } nav ::-webkit-scrollbar-thumb { background: #888 }' })
  // Shrink the nav until its body scrolls
  await nav.evaluate((el) => {
    ;(el.parentElement as HTMLElement).style.height = '200px'
  })
  await expect
    .poll(() => nav.evaluate((el) => getComputedStyle(el).getPropertyValue('--co-sidebar-nav-scrollbar').trim()))
    .toBe('15px')
  // Against what the body shows, left of its scrollbar: a row that ran under the scrollbar would hold
  // its content and still be clipped
  const overflowing = await nav.evaluate((el) =>
    [...el.querySelectorAll('[data-sidebar-row]')]
      .filter((row) => {
        let body = row.parentElement as HTMLElement
        while (body && getComputedStyle(body).overflowY !== 'auto') body = body.parentElement as HTMLElement
        const visibleRight = body.getBoundingClientRect().left + body.clientWidth
        return [row, ...row.querySelectorAll('span')].some((part) => {
          const r = part.getBoundingClientRect()
          return r.width > 0 && r.right > visibleRight + 0.5
        })
      })
      .map((row) => row.textContent)
  )
  expect(overflowing).toEqual([])
})
