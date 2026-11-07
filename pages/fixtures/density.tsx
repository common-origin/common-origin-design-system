import Head from 'next/head'
import { Button, IconButton, List, ListItem, Stack, TransactionListItem } from '../../src/components'
import { DensityPreview } from '../../src/page-components/DensityPreview'

// Test fixture for e2e/density.spec.ts (#191): each density context side by side, a default
// region nested inside a compact one, a compact region inside a comfortable one, a Button
// outside every region, and a list row and a two-line row in each context (decision 0051). Not part of the docs
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
          <Stack direction="row" gap="lg" alignItems="flex-start">
            {(['compact', 'default', 'comfortable'] as const).map((density) => (
              <div key={density} data-co-density={density} data-rows={density} style={{ width: 320 }}>
                <List>
                  <ListItem primary="Groceries" data-testid="row-list" />
                </List>
                <List>
                  <ListItem primary="Transport" spacing="compact" data-testid="row-list-compact-spacing" />
                </List>
                <TransactionListItem merchant="Corner Store" amount={-12.5} date="2026-11-07" data-testid="row-two-line" />
              </div>
            ))}
          </Stack>
          <div data-co-density="compact">
            <div data-co-density="default" data-nested-reset>
              <Button size="medium" variant="secondary">Nested default</Button>
            </div>
          </div>
          {/* compact inside comfortable: inset.xs is the same in compact and default, and must
              still be compact's, not the comfortable value it would inherit */}
          <div data-co-density="comfortable">
            <div data-co-density="compact" data-nested-compact>
              <IconButton variant="secondary" size="small" iconName="search" aria-label="Nested search" />
            </div>
          </div>
        </Stack>
      </main>
    </>
  )
}
