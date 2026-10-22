import Head from 'next/head'
import { useState } from 'react'
import { AgentInput } from '../../src/components'

// Test fixture for e2e/agent-input.spec.ts (#268): AgentInput's auto-growing field at default and
// compact density, a prefilled field that starts hidden, and the review bar at two widths (#280),
// none of which jsdom can lay out. Not part of the docs navigation, and not indexed.
export default function AgentInputFixture() {
  const [shown, setShown] = useState(false)

  return (
    <>
      <Head>
        <title>AgentInput fixture</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{ padding: 24, maxWidth: 480 }}>
        <div data-agent-input="default">
          <AgentInput label="Default input" enableVoice={false} onSubmit={() => undefined} />
        </div>
        <div data-agent-input="compact" data-co-density="compact">
          <AgentInput label="Compact input" enableVoice={false} onSubmit={() => undefined} />
        </div>
        <div data-agent-input="review-wide" style={{ width: 480 }}>
          <AgentInput
            label="Wide review input"
            enableVoice={false}
            review={{ state: 'proposal', id: 'wide', summary: '3 changes suggested', onAccept: () => undefined, onDiscard: () => undefined }}
            onSubmit={() => undefined}
          />
        </div>
        <div data-agent-input="review-narrow" style={{ width: 240 }}>
          <AgentInput
            label="Narrow review input"
            enableVoice={false}
            review={{
              state: 'proposal',
              id: 'narrow',
              summary: 'Tuesday swapped for a lighter dinner and Wednesday dropped',
              onAccept: () => undefined,
              onDiscard: () => undefined,
            }}
            onSubmit={() => undefined}
          />
        </div>
        <button type="button" data-show-hidden onClick={() => setShown(true)}>
          Show
        </button>
        <div data-agent-input="hidden" style={{ display: shown ? 'block' : 'none' }}>
          <AgentInput
            label="Hidden input"
            enableVoice={false}
            defaultValue={'Line 1\nLine 2\nLine 3'}
            onSubmit={() => undefined}
          />
        </div>
      </main>
    </>
  )
}
