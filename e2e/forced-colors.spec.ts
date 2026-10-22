import { expect, test, type Page } from '@playwright/test'

// Windows Contrast Themes and other forced-colours modes (decision 0038, #155). The browser drops
// background colours and box-shadows and keeps borders and outlines, recoloured. Every control
// must keep a visible edge, and selected, checked and value fills must use system colours.
// Emulated in Chromium; a real Contrast Theme is the final manual check.

type Box = {
  border: { width: number; style: string; color: string }
  outline: { width: number; style: string; color: string }
  background: string
  color: string
}

// Computed styles of the element found by `selector` inside the `data-fc` case
async function styles(page: Page, id: string, selector: string, pseudo?: string): Promise<Box> {
  return page.evaluate(
    ({ id, selector, pseudo }) => {
      const root = document.querySelector(`[data-fc="${id}"]`)
      const el = selector === ':scope' ? root?.firstElementChild : root?.querySelector(selector)
      if (!el) throw new Error(`${id}: nothing matches ${selector}`)
      const cs = getComputedStyle(el, pseudo)
      return {
        border: { width: parseFloat(cs.borderTopWidth), style: cs.borderTopStyle, color: cs.borderTopColor },
        outline: { width: parseFloat(cs.outlineWidth), style: cs.outlineStyle, color: cs.outlineColor },
        background: cs.backgroundColor,
        color: cs.color,
      }
    },
    { id, selector, pseudo }
  )
}

// The resolved value of a system colour in the emulated palette
async function systemColor(page: Page, name: string): Promise<string> {
  return page.evaluate((name) => {
    const probe = document.createElement('div')
    probe.style.cssText = `forced-color-adjust: none; color: ${name}; background-color: ${name}`
    document.body.appendChild(probe)
    // Backgrounds keep the system colour's alpha; text colours are opaque
    const value = getComputedStyle(probe).backgroundColor
    probe.remove()
    return value
  }, name)
}

const transparent = (color: string) => /rgba\(.*,\s*0\)$/.test(color) || color === 'transparent'
const visible = (line: Box['border']) => line.style !== 'none' && line.width >= 1 && !transparent(line.color)
const hasEdge = (box: Box) => visible(box.border) || visible(box.outline)

// Controls whose edge was only a fill before decision 0038, and where to find them
const edges: [string, string][] = [
  ['button-primary', 'button'],
  ['button-secondary', 'button'],
  ['button-accent', 'button'],
  ['button-danger', 'button'],
  ['button-naked', 'button'],
  ['button-disabled', 'button'],
  ['iconbutton-primary', 'button'],
  ['iconbutton-secondary', 'button'],
  ['iconbutton-naked', 'button'],
  ['iconbutton-disabled', 'button'],
  ['chip-static', ':scope'],
  ['chip-filter', ':scope'],
  ['chip-filter-selected', ':scope'],
  ['chip-input', ':scope'],
  ['chip-input-selected', ':scope'],
  ['chip-suggestion', 'button'],
  ['chip-suggestion-disabled', 'button'],
  ['checkbox', 'input + *'],
  ['checkbox-checked', 'input + *'],
  ['checkbox-disabled', 'input + *'],
  ['progress', '[role="progressbar"]'],
  ['badge-count', '[aria-live="polite"]'],
  ['status-label', '[role="status"]'],
  ['tag', ':scope'],
  ['category-label', ':scope'],
]

for (const colorScheme of ['dark', 'light'] as const) {
  test.describe(`forced colours, ${colorScheme} palette`, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ forcedColors: 'active', colorScheme })
      await page.goto('/fixtures/forced-colors')
    })

    test('every control keeps a visible edge', async ({ page }) => {
      const missing: string[] = []
      for (const [id, selector] of edges) {
        if (!hasEdge(await styles(page, id, selector))) missing.push(id)
      }
      // The Slider track isn't reachable by a role, so it's found from its thumb
      if (!hasEdge(await sliderTrack(page))) missing.push('slider track')
      expect(missing).toEqual([])
    })

    test('selected and checked states use the system selection colour', async ({ page }) => {
      const highlight = await systemColor(page, 'Highlight')
      expect((await styles(page, 'chip-filter-selected', ':scope')).background).toBe(highlight)
      expect((await styles(page, 'chip-input-selected', ':scope')).background).toBe(highlight)
      expect((await styles(page, 'checkbox-checked', 'input + *')).background).toBe(highlight)
      expect((await styles(page, 'checkbox-indeterminate', 'input + *')).background).toBe(highlight)
      expect((await styles(page, 'row-selected', 'li > *')).background).toBe(highlight)
      expect((await styles(page, 'dropdown', '[role="option"][aria-selected="true"]')).background).toBe(highlight)
      expect((await styles(page, 'tabs', '[role="tab"][aria-selected="true"]', '::after')).background).toBe(highlight)
      // Selected text is the matching system text colour, so it reads on the selection colour
      const highlightText = await page.evaluate(() => {
        const probe = document.createElement('div')
        probe.style.cssText = 'forced-color-adjust: none; color: HighlightText'
        document.body.appendChild(probe)
        const value = getComputedStyle(probe).color
        probe.remove()
        return value
      })
      expect((await styles(page, 'chip-filter-selected', ':scope')).color).toBe(highlightText)
      expect((await styles(page, 'chip-input-selected', ':scope')).color).toBe(highlightText)
      expect((await styles(page, 'row-selected', 'li > *')).color).toBe(highlightText)
      // forced-color-adjust: none is inherited, so every text inside a selected row must follow
      const rowTexts = await page.evaluate(() =>
        [...document.querySelectorAll('[data-fc="row-selected"] li *')]
          .filter((el) => [...el.childNodes].some((node) => node.nodeType === 3 && node.textContent?.trim()))
          .map((el) => getComputedStyle(el).color)
      )
      expect(rowTexts.length).toBeGreaterThan(2)
      expect(new Set(rowTexts)).toEqual(new Set([highlightText]))
      // A chip inside a selected row drops its fill and keeps a HighlightText edge
      const rowChip = await page.evaluate(() => {
        const chip = [...document.querySelectorAll('[data-fc="row-selected"] li *')].find(
          (el) => el.textContent?.trim() === '3 new' && el.children.length === 0
        )?.closest('span:not(:only-child), span')
        if (!chip) throw new Error('row chip not found')
        const cs = getComputedStyle(chip)
        return { background: cs.backgroundColor, color: cs.color, border: cs.borderTopStyle }
      })
      expect(transparent(rowChip.background)).toBe(true)
      expect(rowChip.color).toBe(highlightText)
      expect(rowChip.border).toBe('solid')
      // Unselected and static rows stay on the page colour, not the selection colour or GrayText
      expect((await styles(page, 'row', 'li > *')).background).not.toBe(highlight)
      expect((await styles(page, 'chip-filter', ':scope')).background).not.toBe(highlight)
    })

    test('fills that carry a value or state stay visible', async ({ page }) => {
      const highlight = await systemColor(page, 'Highlight')
      const grayText = await systemColor(page, 'GrayText')
      const canvasText = await systemColor(page, 'CanvasText')
      expect((await styles(page, 'progress', '[role="progressbar"] > *')).background).toBe(highlight)
      expect((await sliderFill(page)).background).toBe(highlight)
      expect((await styles(page, 'checkbox-disabled-checked', 'input + *')).background).toBe(grayText)
      expect((await styles(page, 'badge-dot', '[aria-live="polite"]')).background).toBe(canvasText)
    })

    test('screenshot for review', async ({ page }, testInfo) => {
      await testInfo.attach(`forced-colors-${colorScheme}.png`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
      })
    })
  })
}

// The Slider's track is the thumb's parent; its fill is the track's first child
async function sliderTrack(page: Page): Promise<Box> {
  return trackPart(page, 'track')
}
async function sliderFill(page: Page): Promise<Box> {
  return trackPart(page, 'fill')
}
async function trackPart(page: Page, part: 'track' | 'fill'): Promise<Box> {
  return page.evaluate((part) => {
    const thumb = document.querySelector('[data-fc="slider"] [role="slider"]')
    const track = thumb?.parentElement
    const el = part === 'track' ? track : track?.firstElementChild
    if (!el) throw new Error(`slider ${part} not found`)
    const cs = getComputedStyle(el)
    return {
      border: { width: parseFloat(cs.borderTopWidth), style: cs.borderTopStyle, color: cs.borderTopColor },
      outline: { width: parseFloat(cs.outlineWidth), style: cs.outlineStyle, color: cs.outlineColor },
      background: cs.backgroundColor,
      color: cs.color,
    }
  }, part)
}
