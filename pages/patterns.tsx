import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { DocsSidebar } from '../src/page-components/DocsSidebar'
import {
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Layout,
  Navigation,
  Stack,
  StatusLabel,
  Tag,
  Typography,
} from '../src/page-components'
import { patternsData, type PatternMetadata } from '../src/patterns'
import tokens from '@/styles/tokens.json'

const { base: { breakpoint }, semantic: { border } } = tokens

const PatternsLayout = styled.div`
  display: flex;
  min-height: 100vh;

  /* Narrow screens: the sidebar's Sheet button sits above the content */
  @media (max-width: ${breakpoint.md}) {
    flex-direction: column;
  }
`

const MainContent = styled.main`
  flex: 1;
  padding: ${tokens.semantic.space[600]};
  overflow-x: auto;
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${tokens.semantic.space[400]};
  }
`

const PatternSection = styled.div`
  margin-bottom: ${tokens.semantic.space[800]};
  border: ${border.default};
  border-radius: ${tokens.base.border.radius[4]};
  padding: ${tokens.semantic.space[600]};
  background-color: ${tokens.semantic.surface.raised};
`

export default function Patterns() {
  // The pattern shown comes from the URL, so every pattern has a link (#332)
  const router = useRouter()
  const requested = typeof router.query.pattern === 'string' ? router.query.pattern : undefined
  const activePattern = patternsData.some((pattern) => pattern.id === requested) ? (requested as string) : 'data-view'

  // The page is prerendered without its query, so wait for the router rather than flash the default
  // pattern before a deep link's
  const activePatternData = router.isReady ? patternsData.find(pattern => pattern.id === activePattern) : undefined

  const sidebarSections = [
    {
      items: [...patternsData]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((pattern) => ({ id: pattern.id, label: pattern.name, url: `/patterns?pattern=${pattern.id}` })),
    },
  ]

  // A pattern's status is a status, so it uses StatusLabel with the pattern's own wording
  // (decisions 0018 and 0029); category and complexity are neutral metadata, so they're Tags
  const statusTypes: Record<PatternMetadata['status'], 'completed' | 'processing' | 'pending'> = {
    Complete: 'completed',
    Review: 'processing',
    Draft: 'pending',
  }

  const PatternComponent = activePatternData?.component

  return (
    <>
      <Layout>
        <Head>
          <title>Patterns - Common Origin Design System</title>
          <meta 
            name="description" 
            content="Design patterns and best practices using Common Origin Design System components" 
          />
        </Head>
        
        <Navigation />
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', url: '/' }, 
          { label: 'Patterns', url: '/patterns' }
        ]} />
        
        <section>
          <Container>
            <PatternsLayout>
              <DocsSidebar label="Patterns" sections={sidebarSections} currentId={router.isReady ? activePattern : ''} />

              <MainContent>
                {activePatternData && PatternComponent && (
                  <>
                    <Box my="4xl">
                      <Stack gap="md" direction="column">
                        <Typography variant="h1">{activePatternData.name}</Typography>
                        <Stack gap="sm" direction="row" alignItems="center" wrap>
                          <Tag variant="emphasis">{activePatternData.category}</Tag>
                          <Tag>{activePatternData.complexity}</Tag>
                          <StatusLabel
                            status={statusTypes[activePatternData.status]}
                            label={activePatternData.status}
                            aria-label={`Status: ${activePatternData.status}`}
                            liveRegion={false}
                          />
                        </Stack>
                      </Stack>
                      <Box mt="md">
                        <Typography variant="body" color="emphasis">
                          {activePatternData.description}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Interactive Demo */}
                    <Box mb="4xl">
                      <Typography variant="h3">Interactive Demo</Typography>
                      <Typography variant="body" color="subdued">
                        Try resizing your browser to see the responsive behavior. The table view automatically transitions to a mobile-optimized list view.
                      </Typography>
                    </Box>

                    <PatternComponent />

                    {/* Pattern Documentation Sections */}
                    <PatternSection>
                      <Typography variant="h3">Overview</Typography>
                      <Box mt="md">
                        <Typography variant="body" color="subdued">
                          {activePatternData.overview}
                        </Typography>
                      </Box>
                    </PatternSection>

                    <PatternSection>
                      <Typography variant="h3">Key Features</Typography>
                      <Box mt="md">
                        <Stack direction="column" gap="sm">
                          {activePatternData.keyFeatures.map((feature, index) => (
                            <Typography key={index} variant="body" color="subdued">
                              • {feature}
                            </Typography>
                          ))}
                        </Stack>
                      </Box>
                    </PatternSection>

                    <PatternSection>
                      <Typography variant="h3">Use Cases</Typography>
                      <Box mt="md">
                        <Stack direction="column" gap="sm">
                          {activePatternData.useCases.map((useCase, index) => (
                            <Typography key={index} variant="body" color="subdued">
                              • {useCase}
                            </Typography>
                          ))}
                        </Stack>
                      </Box>
                    </PatternSection>

                    <PatternSection>
                      <Typography variant="h3">Components Used</Typography>
                      <Box mt="md">
                        <Stack direction="row" gap="sm" wrap>
                          {activePatternData.componentsUsed.map((component, index) => (
                            <Chip key={index} variant="default">{component}</Chip>
                          ))}
                        </Stack>
                      </Box>
                    </PatternSection>

                    <PatternSection>
                      <Typography variant="h3">Implementation Notes</Typography>
                      <Box mt="md">
                        <Stack direction="column" gap="md">
                          {activePatternData.implementationNotes.map((note, index) => (
                            <Box key={index}>
                              <Typography variant="subtitle">{note.title}</Typography>
                              <Typography variant="body" color="subdued">
                                {note.description}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    </PatternSection>
                  </>
                )}
              </MainContent>
            </PatternsLayout>
          </Container>
        </section>
      </Layout>
    </>
  )
}
