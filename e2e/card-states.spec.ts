import { expect, test, type Locator, type Page } from '@playwright/test'
import tokens from '../src/styles/tokens.json'

// Clickable cards answer hover, press and keyboard focus the same way within their kind (#185, P5):
// image cards fade the image (opacity.hover, then opacity.pressed); surface cards rise to
// elevation.floating and settle to elevation.raised; every one draws the system focus ring
// (decision 0029). Uses pages/fixtures/cards.tsx.
const { opacity, elevation } = tokens.semantic

// A token value as the browser computes it, so it compares with getComputedStyle: set `property`
// to `value` on a probe and read `read` (a longhand of a shorthand token, for example)
async function computed(page: Page, property: string, value: string, read = property) {
  return page.evaluate(
    ({ property, value, read }) => {
      const probe = document.createElement('div')
      probe.style.setProperty(property, value)
      document.body.append(probe)
      const result = getComputedStyle(probe).getPropertyValue(read)
      probe.remove()
      return result
    },
    { property, value, read }
  )
}

const style = (locator: Locator, property: string) =>
  locator.evaluate((el, property) => getComputedStyle(el).getPropertyValue(property), property)

// Pressing with the mouse, held down while `check` runs
async function whilePressed(page: Page, target: Locator, check: () => Promise<void>) {
  const box = await target.boundingBox()
  if (!box) throw new Error('nothing to press')
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  try {
    await check()
  } finally {
    await page.mouse.up()
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/cards')
})

for (const id of ['card-small', 'card-large', 'picture-button']) {
  test(`${id}: the image fades on hover and further while pressed, and focus rings the card`, async ({ page }, info) => {
    const card = page.locator(`[data-card="${id}"]`)
    const image = card.locator('img')
    const target = card.locator('a, button').first()

    await expect.poll(() => style(image, 'opacity')).toBe('1')
    await target.hover()
    await expect.poll(() => style(image, 'opacity')).toBe(opacity.hover)
    await whilePressed(page, target, async () => {
      await expect.poll(() => style(image, 'opacity')).toBe(opacity.pressed)
    })

    // Keyboard focus draws the system ring: on the image for a clickable image, on the card link
    // for CardSmall, whose whole card is the link
    await page.mouse.move(0, 0)
    await target.focus()
    await page.keyboard.press('Shift+Tab')
    await page.keyboard.press('Tab')
    await expect(target).toBeFocused()
    const ringed = id === 'card-small' ? target : image
    expect(await style(ringed, 'outline-style')).toBe('solid')
    expect(await style(ringed, 'outline-width')).toBe(await computed(page, 'outline', tokens.semantic.border.focus, 'outline-width'))
    expect(await style(ringed, 'outline-color')).toBe(await computed(page, 'outline', tokens.semantic.border.focus, 'outline-color'))
    await info.attach(`${id} focused`, { body: await card.screenshot(), contentType: 'image/png' })
  })
}

test('an image that isn\'t clickable doesn\'t answer hover', async ({ page }) => {
  const card = page.locator('[data-card="card-large-static"]')
  await card.locator('img').hover()
  await page.waitForTimeout(400)
  expect(await style(card.locator('img'), 'opacity')).toBe('1')
})

test('account-card: rises on hover, settles while pressed, and focus rings it', async ({ page }, info) => {
  const card = page.locator('[data-card="account-card"] [role="button"]')
  const [floating, raised] = [await computed(page, 'box-shadow', elevation.floating), await computed(page, 'box-shadow', elevation.raised)]

  await card.hover()
  await expect.poll(() => style(card, 'box-shadow')).toBe(floating)
  await whilePressed(page, card, async () => {
    await expect.poll(() => style(card, 'box-shadow')).toBe(raised)
  })

  await page.mouse.move(0, 0)
  await card.focus()
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Tab')
  await expect(card).toBeFocused()
  expect(await style(card, 'outline-style')).toBe('solid')
  await info.attach('account-card focused', { body: await card.screenshot(), contentType: 'image/png' })
})
