import Head from 'next/head'
import styled from 'styled-components'
import { Box, Breadcrumbs, CodeBlock, Container, Layout, Navigation, Stack, Typography } from '../../src/page-components'
import { DensityPreview } from '../../src/page-components/DensityPreview'

const PageWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

// Three columns side by side, stacking on narrow screens
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
`

const setup = `// Once, at the root of the app: the CSS variables the modes switch
import '@common-origin/design-system/tokens.css'

// Then on any element: everything inside it takes that density
<section data-co-density="compact">
  <TransactionsTable />
</section>`

export default function DensityGuidePage() {
  return (
    <>
      <Head>
        <title>Density | Common Origin Design System</title>
        <meta
          name="description"
          content="How to make a region of a product compact or comfortable with data-co-density in the Common Origin Design System."
        />
      </Head>
      <Layout>
        <Navigation />
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Home', url: '/' },
            { label: 'Components', url: '/components' },
            { label: 'Density', url: '/guides/density' },
          ]}
        />
        <section>
          <Container>
            <PageWrapper>
              <Box my="4xl">
                <Stack direction="column" gap="lg">
                  <Typography variant="h1">Density</Typography>
                  <Typography variant="body" color="subdued">
                    Density is a mode, not a prop. Set it on any element and every control inside that element takes
                    it: a whole app, one table, or a sidebar. Components don&apos;t change; the tokens they read do.
                  </Typography>

                  <Columns>
                    <DensityPreview density="compact" />
                    <DensityPreview density="default" />
                    <DensityPreview density="comfortable" />
                  </Columns>

                  <Typography variant="h3">Set it up</Typography>
                  <CodeBlock>{setup}</CodeBlock>
                  <Typography variant="body" color="subdued">
                    Without <code>tokens.css</code>, components render the default density. Regions nest: a{' '}
                    <code>data-co-density=&quot;default&quot;</code> inside a compact region resets it.
                  </Typography>

                  <Typography variant="h3">What changes</Typography>
                  <Typography variant="body" color="subdued">
                    Control heights move one 8px step: compact 24, 32 and 40px for small, medium and large; default
                    32, 40 and 48px; comfortable 40, 48 and 56px. The padding inside controls moves one step with them.
                    Text, colour, radius, rows and layout spacing stay the same.
                  </Typography>

                  <Typography variant="h3">When to use it</Typography>
                  <Typography variant="body" color="subdued">
                    Use compact for dense, data-heavy work: tables, filters and toolbars in A2UI, where people scan
                    and act on many rows. Use comfortable for occasional, focused tasks and for touch-first screens.
                    Leave editorial pages at default.
                  </Typography>

                  <Typography variant="h3">Accessibility</Typography>
                  <Typography variant="body" color="subdued">
                    Compact never makes a control smaller than 24px, the minimum pointer target (WCAG 2.2, 2.5.8), and
                    the 44px touch target doesn&apos;t change with density.
                  </Typography>

                  <Typography variant="caption" color="subdued">
                    Decisions 0032 (token modes), 0034 (control heights) and 0041 (CSS variables) in the design system
                    foundation.
                  </Typography>
                </Stack>
              </Box>
            </PageWrapper>
          </Container>
        </section>
      </Layout>
    </>
  )
}
