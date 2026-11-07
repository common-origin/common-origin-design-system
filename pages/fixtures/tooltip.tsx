import Head from 'next/head'
import { IconButton, Tooltip } from '../../src/components'

// Test fixture for e2e/tooltip.spec.ts (#326): a trigger inside a small scrolling box that clips
// its content, and a trigger at the very top of the page whose tooltip has to flip below it.
// Not part of the docs navigation, and not indexed.
export default function TooltipFixture() {
  return (
    <>
      <Head>
        <title>Tooltip fixture</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <div style={{ position: 'absolute', top: 0, left: 200 }}>
          <Tooltip text="Flips below" side="top" data-testid="edge-tip">
            <IconButton variant="secondary" iconName="home" aria-label="At the edge" />
          </Tooltip>
        </div>
        <div data-clip style={{ position: 'absolute', top: 200, left: 200, width: 120, height: 48, overflow: 'auto' }}>
          <Tooltip text="Escapes the scroll box" side="right" data-testid="clip-tip">
            <IconButton variant="secondary" iconName="search" aria-label="Inside a scroll box" />
          </Tooltip>
          <div style={{ height: 200 }} />
        </div>
      </main>
    </>
  )
}
