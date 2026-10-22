import { expect, test, type Locator, type Page } from '@playwright/test'

// AgentInput's field grows with its content to six rows, then scrolls, and its buttons stay beside
// the last line (#268). jsdom has no layout, so this runs in Chromium against
// pages/fixtures/agent-input.tsx.

const box = async (locator: Locator) => {
  const rect = await locator.boundingBox()
  if (!rect) throw new Error('no box')
  return rect
}

const field = (page: Page, density: string) => page.locator(`[data-agent-input="${density}"] textarea`)
const send = (page: Page, density: string) =>
  page.locator(`[data-agent-input="${density}"]`).getByRole('button', { name: 'Send message' })

async function typeLines(locator: Locator, lines: number) {
  await locator.focus()
  for (let line = 1; line <= lines; line++) {
    await locator.pressSequentially(`Line ${line}`)
    if (line < lines) await locator.press('Shift+Enter')
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/agent-input')
})

test('an empty field is one control-height row, with Send centred on it', async ({ page }) => {
  const input = await box(field(page, 'default'))
  const button = await box(send(page, 'default'))

  expect(input.height).toBe(48)
  expect(Math.abs(button.y + button.height / 2 - (input.y + input.height / 2))).toBeLessThanOrEqual(1)
})

test('the field grows a line at a time to six rows, then scrolls', async ({ page }) => {
  const input = field(page, 'default')

  await typeLines(input, 3)
  expect((await box(input)).height).toBe(48 + 2 * 24)
  await expect(input).toHaveCSS('overflow-y', 'hidden')

  await input.press('Shift+Enter')
  await input.pressSequentially('Line 4')
  await input.press('Shift+Enter')
  await input.pressSequentially('Line 5')
  await input.press('Shift+Enter')
  await input.pressSequentially('Line 6')
  expect((await box(input)).height).toBe(48 + 5 * 24)

  await input.press('Shift+Enter')
  await input.pressSequentially('Line 7')
  await input.press('Shift+Enter')
  await input.pressSequentially('Line 8')
  expect((await box(input)).height).toBe(48 + 5 * 24)
  await expect(input).toHaveCSS('overflow-y', 'auto')
})

test('Send stays beside the last line as the field grows', async ({ page }) => {
  const input = field(page, 'default')
  await typeLines(input, 4)

  const inputBox = await box(input)
  const button = await box(send(page, 'default'))
  // The same 4px gap from the field's bottom edge as on a single row
  expect(Math.round(inputBox.y + inputBox.height - (button.y + button.height))).toBe(4)
})

test('compact density keeps one row at the compact control height, and still grows by line height', async ({ page }) => {
  const input = field(page, 'compact')
  expect((await box(input)).height).toBe(40)

  await typeLines(input, 2)
  expect((await box(input)).height).toBe(40 + 24)
})

test('a prefilled field that starts hidden takes its full height when shown', async ({ page }) => {
  // Shown through the page script: the dev overlay can cover pointer targets
  await page.locator('[data-show-hidden]').evaluate((button: HTMLButtonElement) => button.click())
  const input = field(page, 'hidden')

  await expect.poll(async () => (await box(input)).height).toBe(48 + 2 * 24)
})

test.describe('docked, on a 375px phone viewport', () => {
  test.use({ viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true })

  const docked = (page: Page) => page.locator('[data-docked]')

  test('stays at the bottom of the viewport while the list scrolls', async ({ page }) => {
    await page.goto('/fixtures/agent-input-docked')
    const viewport = page.viewportSize()!

    for (const scrollY of [0, 600]) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY)
      const rect = await box(docked(page))
      expect(Math.round(rect.y + rect.height)).toBe(viewport.height)
      await expect(page.getByRole('textbox', { name: 'Change the plan' })).toBeInViewport()
    }
  })

  test('the band hides the list behind it, and the last item is fully visible at the end', async ({ page }) => {
    await page.goto('/fixtures/agent-input-docked')
    await expect(docked(page)).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    const last = await box(page.locator('[data-plan-item="40"]'))
    const dock = await box(docked(page))
    expect(last.y + last.height).toBeLessThanOrEqual(dock.y)
  })
})
