import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// Colour contrast in both themes (P2, #359). jsdom can't resolve var() or paint, so jest-axe
// can't check the colours components render; axe's colour-contrast rule can in a browser. The
// docs site picks the theme from the system setting before paint (#360), so emulating
// prefers-color-scheme renders each fixture in that theme.
const fixtures = ['forced-colors', 'cards', 'menu', 'tooltip', 'agent-input', 'sidebar-nav']

for (const theme of ['light', 'dark'] as const) {
  test.describe(`${theme} theme`, () => {
    test.use({ colorScheme: theme })

    for (const fixture of fixtures) {
      test(`${fixture} meets colour contrast`, async ({ page }) => {
        await page.goto(`/fixtures/${fixture}`)
        await expect(page.locator('html')).toHaveAttribute('data-co-theme', theme)
        const { violations } = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
        // Each failing element with its colours and ratio, so a failure names what to fix
        const failures = violations.flatMap((violation) =>
          violation.nodes.map((node) => `${node.target.join(' ')}: ${node.any[0]?.message ?? violation.help}`)
        )
        expect(failures).toEqual([])
      })
    }
  })
}
