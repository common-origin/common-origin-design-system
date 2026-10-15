import Head from 'next/head'
import { Button, Stack } from '../../src/components'
import { DensityPreview } from '../../src/page-components/DensityPreview'

// Test fixture for e2e/density.spec.ts (#191): each density context side by side, a default
// region nested inside a compact one, and a Button outside every region. Not part of the docs
// navigation, and not indexed.
export default function DensityFixture() {
  return (
    <>
      <Head>
        <title>Density fixture</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{ padding: 24 }}>
        <Stack direction="column" gap="lg">
          <div data-outside>
            <Button size="medium" variant="secondary">Outside</Button>
          </div>
          <Stack direction="row" gap="lg" alignItems="flex-start">
            <DensityPreview density="compact" />
            <DensityPreview density="default" />
            <DensityPreview density="comfortable" />
          </Stack>
          <div data-co-density="compact">
            <div data-co-density="default" data-nested-reset>
              <Button size="medium" variant="secondary">Nested default</Button>
            </div>
          </div>
        </Stack>
      </main>
    </>
  )
}
