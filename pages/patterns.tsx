import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CodeBlock,
  Container,
  Layout,
  Navigation,
  Stack,
  Typography,
} from '../src/page-components'
import tokens from '@/styles/tokens.json'

const { base: { breakpoint }, semantic: { color, border, spacing } } = tokens

// Pattern data structure
interface Pattern {
  id: string
  name: string
  description: string
  category: 'Data Display' | 'Navigation' | 'Forms' | 'Feedback' | 'Layout'
  complexity: 'Simple' | 'Moderate' | 'Complex'
  status: 'Draft' | 'Review' | 'Complete'
}

// Initial patterns data
const patternsData: Pattern[] = [
  {
    id: 'data-view',
    name: 'Data View',
    description: 'Responsive data display that transitions from table to list view based on viewport size. Includes filtering and sorting capabilities.',
    category: 'Data Display',
    complexity: 'Moderate',
    status: 'Draft',
  },
]

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

const DemoContainer = styled.div`
  background-color: ${color.background.default};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[3]};
  padding: ${spacing.layout['2xl']};
  margin: ${spacing.layout.lg} 0;
  min-height: 400px;
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

  const getComplexityColor = (complexity: Pattern['complexity']): 'default' | 'light' | 'emphasis' => {
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

  const getStatusColor = (status: Pattern['status']): 'default' | 'light' | 'emphasis' => {
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

  const renderDataViewPattern = () => {
    return (
      <Stack direction="column" gap="2xl">
        <Box>
          <Typography variant="h3">Interactive Demo</Typography>
          <Typography variant="body" color="subdued">
            Try resizing your browser to see the responsive behavior. The table view automatically transitions to a mobile-optimized list view.
          </Typography>
        </Box>

        <DemoContainer>
          <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: spacing.layout.lg }}>
            <Typography variant="h4" color="subdued">
              Pattern Demo Coming Soon
            </Typography>
            <div style={{ textAlign: 'center', maxWidth: '500px' }}>
              <Typography variant="body" color="subdued">
                This section will contain an interactive demonstration of the Data View pattern,
                showing responsive table-to-list transitions and filtering capabilities.
              </Typography>
            </div>
          </div>
        </DemoContainer>

        <PatternSection>
          <Typography variant="h3">Overview</Typography>
          <Box mt="md">
            <Typography variant="body" color="subdued">
              The Data View pattern provides a responsive approach to displaying tabular data.
              On larger screens, data is presented in a traditional table format with columns and rows.
              On smaller screens, the layout automatically transforms into a card-based list view,
              optimized for mobile interaction.
            </Typography>
          </Box>
        </PatternSection>

        <PatternSection>
          <Typography variant="h3">Key Features</Typography>
          <Box mt="md">
            <Stack direction="column" gap="sm">
              <Typography variant="body" color="subdued">
                • <strong>Responsive Layout:</strong> Automatically transitions between table and list views based on viewport size
              </Typography>
              <Typography variant="body" color="subdued">
                • <strong>Filtering:</strong> Support for multiple filter criteria with visual feedback
              </Typography>
              <Typography variant="body" color="subdued">
                • <strong>Sorting:</strong> Column-based sorting with clear sort indicators
              </Typography>
              <Typography variant="body" color="subdued">
                • <strong>Accessibility:</strong> Full keyboard navigation and screen reader support
              </Typography>
              <Typography variant="body" color="subdued">
                • <strong>Performance:</strong> Optimized for large datasets with virtualization support
              </Typography>
            </Stack>
          </Box>
        </PatternSection>

        <PatternSection>
          <Typography variant="h3">Use Cases</Typography>
          <Box mt="md">
            <Stack direction="column" gap="sm">
              <Typography variant="body" color="subdued">
                • Product catalogs and inventory lists
              </Typography>
              <Typography variant="body" color="subdued">
                • User management dashboards
              </Typography>
              <Typography variant="body" color="subdued">
                • Transaction histories
              </Typography>
              <Typography variant="body" color="subdued">
                • Search results pages
              </Typography>
              <Typography variant="body" color="subdued">
                • Any data that needs to be filterable and sortable across devices
              </Typography>
            </Stack>
          </Box>
        </PatternSection>

        <PatternSection>
          <Typography variant="h3">Components Used</Typography>
          <Box mt="md">
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="default">Container</Chip>
              <Chip variant="default">Stack</Chip>
              <Chip variant="default">Typography</Chip>
              <Chip variant="default">Button</Chip>
              <Chip variant="default">Chip</Chip>
              <Chip variant="default">Dropdown</Chip>
              <Chip variant="default">Grid</Chip>
            </Stack>
          </Box>
        </PatternSection>

        <PatternSection>
          <Typography variant="h3">Implementation Notes</Typography>
          <Box mt="md">
            <Stack direction="column" gap="md">
              <Box>
                <Typography variant="subtitle">Breakpoint Strategy</Typography>
                <Typography variant="body" color="subdued">
                  The pattern switches from table to list view at the 'md' breakpoint (768px).
                  This ensures optimal readability and usability on mobile devices while
                  maximizing information density on larger screens.
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle">State Management</Typography>
                <Typography variant="body" color="subdued">
                  Filtering and sorting state should be preserved across viewport changes.
                  Use React hooks (useState, useMemo) to manage filter criteria and sort order.
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle">Accessibility Considerations</Typography>
                <Typography variant="body" color="subdued">
                  Ensure proper ARIA labels for sort controls, filter buttons, and data cells.
                  Announce filter and sort changes to screen readers. Maintain logical tab order.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </PatternSection>
      </Stack>
    )
  }

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
                {activePatternData && (
                  <>
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

                    {/* Render pattern content based on active pattern */}
                    {activePattern === 'data-view' && renderDataViewPattern()}
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
