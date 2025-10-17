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
  CoverImage,
  DesignCard,
  Dropdown,
  Icon,
  Layout,
  Navigation,
  Stack,
  Typography,
} from '../src/page-components'
import { staticComponentsData } from '@/lib/componentsData'
import { ComponentData } from '@/lib/componentsData'
import tokens from '@/styles/tokens.json'

const { base: { breakpoint }, semantic: { color, border, spacing } } = tokens

const ComponentsLayout = styled.div`
  display: flex;
  min-height: 100vh;
`

const Sidebar = styled.nav`
  width: 250px;
  border-right: ${border.default};
  position: sticky;
  top: 0;
  margin-top: ${spacing.layout['xs']};
  height: 100vh;
  overflow-y: auto;
  padding: ${spacing.layout['8xl']} 0;
  
  @media (max-width:${breakpoint.md}) {
    display: none;
  }
`

const MobileNavigation = styled.div`
  display: none;
  
  @media (max-width: ${breakpoint.md}) {
    display: block;
    padding: ${spacing.layout.lg};
    background-color: ${color.background.subtle};
    border-bottom: ${border.default};
    position: sticky;
    top: 0;
    z-index: 10;
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

const ComponentSection = styled.div`
  margin-bottom: ${spacing.layout['4xl']};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[4]};
  padding: ${spacing.layout['2xl']};
  background-color: ${color.background.subtle};
`

const ComponentShowcase = styled.div`
  background-color: ${color.background.default};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[3]};
  padding: ${spacing.layout['2xl']};
  margin: ${spacing.layout.lg} 0;
`

const PropsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: ${spacing.layout.lg};
  border-radius: ${tokens.base.border.radius[3]};
  overflow: hidden;
  border: ${border.subtle};
  background-color: ${color.background.default};
`

const TableHeader = styled.th`
  background-color: ${color.background.subtle};
  border-bottom: ${border.subtle};  
  padding: ${spacing.layout.md};
  text-align: left;
  font: ${tokens.semantic.typography.label};
  color: ${color.text.emphasis};
  font-weight: 600;
  
  &:not(:last-child) {
    border-right: ${border.subtle};
  }
`

const TableRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: ${border.subtle};
  }
`

const TableCell = styled.td`
  padding: ${spacing.layout.md};
  vertical-align: top;
  
  &:not(:last-child) {
    border-right: ${border.subtle};
  }
`

const TokenChip = styled(Chip)`
  margin: ${spacing.layout.xs} ${spacing.layout.xs} 0 0;
`


const componentsData: ComponentData[] = staticComponentsData
export default function Components() {
  const [activeComponent, setActiveComponent] = useState('avatar')
  
  const activeComponentData = componentsData.find(comp => comp.id === activeComponent)

  const handleComponentClick = (componentId: string) => {
    setActiveComponent(componentId)
  }

  const renderPropsTable = (props: ComponentData['props']) => {
    if (props.length === 0) {
      return <Typography color="subdued" variant="caption">No props available</Typography>
    }

    return (
      <PropsTable>
        <thead>
          <tr>
            <TableHeader>Prop</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Default</TableHeader>
            <TableHeader>Required</TableHeader>
            <TableHeader>Description</TableHeader>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell>
                <code>{prop.name}</code>
              </TableCell>
              <TableCell>
                <code>{prop.type}</code>
              </TableCell>
              <TableCell>
                {prop.default ? <code>{prop.default}</code> : <Typography variant="caption" color="subdued">—</Typography>}
              </TableCell>
              <TableCell>
                {prop.required ? (
                  <Chip title="Required" variant="default"/>
                ) : (
                  <Typography variant="caption" color="subdued">—</Typography>
                )}
              </TableCell>
              <TableCell>
                <Typography variant="small" color="subdued">{prop.description}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </PropsTable>
    )
  }

  const renderTokenList = (tokens: string[]) => {
    return (
      <Box mt="sm">
        <Stack direction="column" gap="xs">
          {tokens.map((token, index) => (
            <TokenChip key={index} title={token} variant="default" />
          ))}
        </Stack>
      </Box>
    )
  }

  const renderAccessibilityInfo = (accessibility: ComponentData['accessibility']) => {
    if (!accessibility) {
      return <Typography color="subdued" variant="caption">No accessibility information available</Typography>
    }

    return (
      <Stack direction="column" gap="xl">
        {accessibility.notes && accessibility.notes.length > 0 && (
          <Box>
            <Box mb="xs">
              <Typography variant="subtitle">General Notes:</Typography>
            </Box>
            <Stack direction="column" gap="xs">
              {accessibility.notes.map((note, index) => (
                <Typography key={index} variant="small" color="subdued">• {note}</Typography>
              ))}
            </Stack>
          </Box>
        )}
        
        {accessibility.keyboardNavigation && (
          <Box>
            <Box mb="xs">
              <Typography variant="subtitle">Keyboard Navigation:</Typography>
            </Box>
            <Typography variant="small" color="subdued">{accessibility.keyboardNavigation}</Typography>
          </Box>
        )}
        
        {accessibility.screenReader && (
          <Box>
            <Box mb="xs">
              <Typography variant="subtitle">Screen Reader:</Typography>
            </Box>
            <Typography variant="small" color="subdued">{accessibility.screenReader}</Typography>
          </Box>
        )}
        
        {accessibility.colorContrast && (
          <Box>
            <Box mb="xs">
              <Typography variant="subtitle">Color Contrast:</Typography>
            </Box>
            <Typography variant="small" color="subdued">{accessibility.colorContrast}</Typography>
          </Box>
        )}
        
        {accessibility.focusManagement && (
          <Box>
            <Box mb="xs">
              <Typography variant="subtitle">Focus Management:</Typography>
            </Box>
            <Typography variant="small" color="subdued">{accessibility.focusManagement}</Typography>
          </Box>
        )}
      </Stack>
    )
  }

  const renderNotes = (notes: string[]) => {
    if (!notes || notes.length === 0) {
      return <Typography color="subdued" variant="caption">No additional notes available</Typography>
    }

    return (
      <Stack direction="column" gap="xs">
        {notes.map((note, index) => (
          <Typography key={index} variant="small" color="subdued">• {note}</Typography>
        ))}
      </Stack>
    )
  }

  const renderExamples = (examples: ComponentData['examples']) => {
    return (
      <Stack direction="column" gap="4xl">
        {examples.map((example, index) => (
          <Box key={index} mt="lg">
            <Typography variant="h3">
              {example.name}
            </Typography>
            <Typography variant="small" color="subdued">
              {example.description}
            </Typography>
            <ComponentShowcase>
              {example.renderComponent ? example.renderComponent() : example.component}
            </ComponentShowcase>
            <Typography variant="label">
              Code:
            </Typography>
            <CodeBlock>
              {example.code}
            </CodeBlock>
          </Box>
        ))}
      </Stack>
    )
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Components - Common Origin</title>
        </Head>
        <Navigation />
        <Breadcrumbs breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Components', url: '/components' }]} />
        
        <section>
          <Container>
            <MobileNavigation>
              <Dropdown 
                options={componentsData.map(comp => ({ id: comp.id, label: comp.name }))}
                value={activeComponent}
                onChange={handleComponentClick}
                placeholder="Select a component"
              />
            </MobileNavigation>
            
            <ComponentsLayout>
              <Sidebar>
                <Box px="lg">
                  <Stack direction="column" gap="sm">
                    {componentsData.sort((a, b) => a.name.localeCompare(b.name)).map((comp) => (
                      <Button
                        key={comp.id}
                        variant={activeComponent === comp.id ? 'primary' : 'secondary'}
                        size="medium"
                        onClick={() => handleComponentClick(comp.id)}
                        style={{ justifyContent: 'flex-start', width: '100%' }}
                      >
                        {comp.name}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Sidebar>

              <MainContent>
                {activeComponentData && (
                  <>
                    <Box my="4xl">
                      <Stack gap="sm">
                        <Typography variant="h1">{activeComponentData.name}</Typography>
                        <Chip title={activeComponentData.category} variant="default" size="small" />
                      </Stack>
                      <Box mt="md">
                        <Typography variant="body" color="emphasis">
                          {activeComponentData.description}
                        </Typography>
                      </Box>
                      <Box mt="lg">
                        
                      </Box>
                    </Box>

                    <ComponentSection>
                      <Stack gap="md" direction="column">
                        <Typography variant="h2" color="default">
                          Examples
                        </Typography>
                        {renderExamples(activeComponentData.examples)}
                      </Stack>
                    </ComponentSection>

                    <ComponentSection>
                      <Stack gap="md" direction="column">
                        <Typography variant="h3" color="default">
                          Props
                        </Typography>
                        {renderPropsTable(activeComponentData.props)}
                      </Stack>
                    </ComponentSection>

                    <ComponentSection>
                      <Stack gap="md" direction="column">
                        <Typography variant="h3" color="default">
                          Design Tokens Used
                        </Typography>
                        {renderTokenList(activeComponentData.tokens)}
                      </Stack>
                    </ComponentSection>

                    <ComponentSection>
                      <Stack gap="md" direction="column">
                        <Typography variant="h3" color="default">
                          Accessibility
                        </Typography>
                        {renderAccessibilityInfo(activeComponentData.accessibility)}
                      </Stack>
                    </ComponentSection>

                    {activeComponentData.notes && activeComponentData.notes.length > 0 && (
                      <ComponentSection>
                        <Stack gap="md" direction="column">
                          <Typography variant="h3" color="default">
                            Additional Notes
                          </Typography>
                          {renderNotes(activeComponentData.notes)}
                        </Stack>
                      </ComponentSection>
                    )}
                  </>
                )}
              </MainContent>
            </ComponentsLayout>
          </Container>
        </section>
      </Layout>
    </>
  )
}
