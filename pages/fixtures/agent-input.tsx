import Head from 'next/head'
import { AgentInput } from '../../src/components'

// Test fixture for e2e/agent-input.spec.ts (#268): AgentInput's auto-growing field at default and
// compact density, which jsdom can't lay out. Not part of the docs navigation, and not indexed.
export default function AgentInputFixture() {
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
      </main>
    </>
  )
}
