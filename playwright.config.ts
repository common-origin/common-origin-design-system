import { defineConfig, devices } from '@playwright/test'

// Browser checks that jsdom can't do, such as forced-colours mode (decision 0038). They run
// against the docs site's test fixtures in pages/fixtures/.
const port = 3100

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // CI builds the site first and serves the production build; locally a dev server is enough
    command: process.env.CI ? `npx next start -p ${port}` : `npx next dev -p ${port}`,
    url: `http://localhost:${port}/fixtures/forced-colors`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
