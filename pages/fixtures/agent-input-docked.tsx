import Head from 'next/head'
import { AgentInput } from '../../src/components'

// Test fixture for e2e/agent-input.spec.ts (#269): a docked AgentInput under a long list, as Meal
// Agent's plan page uses it. Not part of the docs navigation, and not indexed.
export default function AgentInputDockedFixture() {
  return (
    <>
      <Head>
        <title>AgentInput docked fixture</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <main style={{ padding: '0 16px' }}>
        <ol>
          {Array.from({ length: 40 }, (_, index) => (
            <li key={index} data-plan-item={index + 1} style={{ padding: '12px 0' }}>
              Night {index + 1}: something tasty
            </li>
          ))}
        </ol>
        <AgentInput
          docked
          label="Change the plan"
          enableVoice={false}
          suggestions={['Swap Tuesday for something lighter', 'Drop Wednesday']}
          onSubmit={() => undefined}
        />
      </main>
    </>
  )
}
