import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Layout,
  Navigation,
  Stack,
  Typography,
} from '../src/page-components'
import { patternsData, type PatternMetadata } from '../src/patterns'
import tokens from '@/styles/tokens.json'

const { base: { breakpoint }, semantic: { color, border, spacing } } = tokens

const PatternsLayout = styled.div`
  display: flex;
  min-height: 100vh;
`

const Sidebar = styled.nav`
  width: 250px;
  border-right: ${border.default};
  position: sticky;
  top: 0;
  margin-top: ${spacing.layout.xs};
  height: 100vh;
  overflow-y: auto;
  padding: ${spacing.layout['8xl']} 0;
  
  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const MainContent = styled.main`
  flex: 1;
  padding: ${spacing.layout['2xl']};
  overflow-x: auto;
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${spacing.layout.lg};
  }
`

const PatternSection = styled.div`
  margin-bottom: ${spacing.layout['4xl']};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[4]};
  padding: ${spacing.layout['2xl']};
  background-color: ${color.background.subtle};
`

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.layout.xs};
  padding: ${spacing.layout.xs} ${spacing.layout.sm};
  background-color: ${color.background.emphasis};
  color: ${color.text.inverse};
  border-radius: ${tokens.base.border.radius[2]};
  font-size: ${tokens.base.fontSize[1]};
  font-weight: 600;
`

export default function Patterns() {
  const [activePattern, setActivePattern] = useState('data-view')
  
  const activePatternData = patternsData.find(pattern => pattern.id === activePattern)

  const handlePatternClick = (patternId: string) => {
    setActivePattern(patternId)
  }

  const getComplexityColor = (complexity: PatternMetadata['complexity']): 'default' | 'light' | 'emphasis' => {
    switch (complexity) {
      case 'Simple':
        return 'emphasis'
      case 'Moderate':
        return 'light'
      case 'Complex':
        return 'default'
      default:
        return 'default'
    }
  }

  const getStatusColor = (status: PatternMetadata['status']): 'default' | 'light' | 'emphasis' => {
    switch (status) {
      case 'Complete':
        return 'emphasis'
      case 'Review':
        return 'light'
      case 'Draft':
        return 'default'
      default:
        return 'default'
    }
  }

  if (!activePatternData) {
    return null
  }

  const PatternComponent = activePatternData.component

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
              <Sidebar>
                <Box px="lg">
                  <Box mb="lg">
                    <Typography variant="label" color="subdued">
                      DESIGN PATTERNS
                    </Typography>
                  </Box>
                  <Stack direction="column" gap="sm">
                    {patternsData
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((pattern) => (
                        <Button
                          key={pattern.id}
                          variant={activePattern === pattern.id ? 'primary' : 'secondary'}
                          size="medium"
                          onClick={() => handlePatternClick(pattern.id)}
                          style={{ justifyContent: 'flex-start', width: '100%' }}
                        >
                          {pattern.name}
                        </Button>
                      ))}
                  </Stack>
                </Box>
              </Sidebar>

              <MainContent>
                <Box my="4xl">
                  <Stack gap="md" direction="column">
                    <Typography variant="h1">{activePatternData.name}</Typography>
                    <Stack gap="sm" direction="row" wrap>
                      <CategoryBadge>{activePatternData.category}</CategoryBadge>
                      <Chip 
                        variant={getComplexityColor(activePatternData.complexity)} 
                        size="small"
                      >
                        {activePatternData.complexity}
                      </Chip>
                      <Chip 
                        variant={getStatusColor(activePatternData.status)} 
                        size="small"
                      >
                        {activePatternData.status}
                      </Chip>
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
              </MainContent>
            </PatternsLayout>
          </Container>
        </section>
      </Layout>
    </>
  )
}
