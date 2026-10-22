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
