import { readdirSync } from 'fs'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// Colour contrast in both themes (P2, #359). jsdom can't resolve var() or paint, so jest-axe
// can't check the colours components render; axe's colour-contrast rule can in a browser. The
// docs site picks the theme from the system setting before paint (#360), so emulating
// prefers-color-scheme renders each fixture in that theme.

// Every fixture page, so a new one is checked without being listed here
const fixtures = readdirSync('pages/fixtures')
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => file.replace(/\.tsx$/, ''))

// Elements axe can't decide, each with the token test that checks its pairing instead. Slider's
// value label has pointer-events: none, so axe can't find what's behind it; it's inverse text on
// fill.emphasis ("keeps inverse text on the strong fill…" in src/tokens/contrast.test.ts)
const checkedElsewhere = [/Slider__StyledValueLabel/]

for (const theme of ['light', 'dark'] as const) {
  test.describe(`${theme} theme`, () => {
    // Reduced motion, so entry animations (Badge scales in from opacity 0) have settled
    test.use({ colorScheme: theme, reducedMotion: 'reduce' })

    for (const fixture of fixtures) {
      test(`${fixture} meets colour contrast`, async ({ page }) => {
        await page.goto(`/fixtures/${fixture}`)
        await expect(page.locator('html')).toHaveAttribute('data-co-theme', theme)
        const { violations, incomplete } = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
        // Each failing element with its colours and ratio, so a failure names what to fix. Elements
        // axe couldn't decide (a translucent or overlapping background) fail too, so nothing is
        // passed unchecked
        const undecided = incomplete.map((result) => ({
          ...result,
          nodes: result.nodes.filter((node) => !checkedElsewhere.some((pattern) => pattern.test(node.target.join(' ')))),
        }))
        const failures = [...violations, ...undecided].flatMap((result) =>
          result.nodes.map((node) => `${node.target.join(' ')}: ${node.any[0]?.message ?? result.help}`)
        )
        expect(failures).toEqual([])
      })
    }
  })
}
