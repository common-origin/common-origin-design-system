import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Breadcrumbs,
  Chip,
  CodeBlock,
  Container,
  Layout,
  Navigation,
  Stack,
  Tag,
  Typography,
} from '../src/page-components'
import { staticComponentsData } from '@/lib/componentsData'
import { ComponentData } from '@/lib/componentsData'
import tokens from '@/lib/cssTokens'
import { DocsSidebar } from '../src/page-components/DocsSidebar'
import { COMPONENT_GROUPS } from '@/lib/componentGroups'

const { base: { breakpoint }, semantic: { color, border } } = tokens

const ComponentsLayout = styled.div`
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

const ComponentSection = styled.div`
  margin-bottom: ${tokens.semantic.space[800]};
  border: ${border.default};
  border-radius: ${tokens.base.border.radius[4]};
  padding: ${tokens.semantic.space[600]};
  background-color: ${tokens.semantic.surface.raised};
`

const ComponentShowcase = styled.div`
  background-color: ${tokens.semantic.surface.base};
  border: ${border.default};
  border-radius: ${tokens.base.border.radius[3]};
  padding: ${tokens.semantic.space[600]};
  margin: ${tokens.semantic.space[400]} 0;
`

const PropsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: ${tokens.semantic.space[400]};
  border-radius: ${tokens.base.border.radius[3]};
  overflow: hidden;
  border: ${border.default};
  background-color: ${tokens.semantic.surface.base};
`

const TableHeader = styled.th`
  background-color: ${tokens.semantic.surface.raised};
  border-bottom: ${border.default};  
  padding: ${tokens.semantic.space[300]};
  text-align: left;
  font: ${tokens.semantic.typography.label};
  color: ${color.text.default};
  font-weight: 600;
  
  &:not(:last-child) {
    border-right: ${border.default};
  }
`

const TableRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: ${border.default};
  }
`

const TableCell = styled.td`
  padding: ${tokens.semantic.space[300]};
  vertical-align: top;
  
  &:not(:last-child) {
    border-right: ${border.default};
  }
`

const TokenChip = styled(Chip)`
  margin: ${tokens.semantic.space[100]} ${tokens.semantic.space[100]} 0 0;
`

const GuideLink = styled(Link)`
  font: ${tokens.semantic.typography.body};
  color: ${tokens.semantic.color.text.accent};
  text-decoration: underline;

  &:hover {
    color: ${tokens.semantic.color.text.accent};
  }
`



const componentsData: ComponentData[] = staticComponentsData
export default function Components() {
  // Sort components and default to the first one alphabetically
  const sortedComponents = useMemo(
    () => componentsData.sort((a, b) => a.name.localeCompare(b.name)),
    []
  )
  // The component shown comes from the URL, so every component has a link (#332)
  const router = useRouter()
  const requested = typeof router.query.component === 'string' ? router.query.component : undefined
  const activeComponent = sortedComponents.some((comp) => comp.id === requested)
    ? (requested as string)
    : sortedComponents[0]?.id || 'alert'

  // Group components by purpose, in the defined order, leaving out empty groups (decision 0057).
  // Within a group, pages are alphabetical and a child page follows its parent, at any depth.
  const sidebarSections = useMemo(() => {
    const toItem = (comp: ComponentData) => ({ id: comp.id, label: comp.name, url: `/components?component=${comp.id}` })
    return COMPONENT_GROUPS.map((group) => {
      const inGroup = sortedComponents.filter((comp) => comp.category === group)
      const ids = new Set(inGroup.map((comp) => comp.id))
      const children = new Map<string, ComponentData[]>()
      for (const comp of inGroup) {
        if (comp.parentId && ids.has(comp.parentId)) {
          children.set(comp.parentId, [...(children.get(comp.parentId) ?? []), comp])
        }
      }
      const withChildren = (comp: ComponentData): ComponentData[] => [comp, ...(children.get(comp.id) ?? []).flatMap(withChildren)]
      const tops = inGroup.filter((comp) => !comp.parentId || !ids.has(comp.parentId))
      return { label: group, items: tops.flatMap(withChildren).map(toItem) }
    }).filter((section) => section.items.length > 0)
  }, [sortedComponents])

  // The page is prerendered without its query, so wait for the router rather than flash the first
  // component before a deep link's
  const activeComponentData = router.isReady ? sortedComponents.find(comp => comp.id === activeComponent) : undefined

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

  const renderAnatomy = (anatomy: ComponentData['anatomy']) => {
    if (!anatomy) {
      return <Typography color="subdued" variant="caption">No anatomy information available</Typography>
    }

    return (
      <Stack direction="column" gap="xl">
        <Typography variant="body" color="subdued">{anatomy.description}</Typography>
        
        {anatomy.diagram && (
          <Box>
            <Box mb="xs">
              <Typography variant="subtitle">Structure Diagram:</Typography>
            </Box>
            <CodeBlock>{anatomy.diagram}</CodeBlock>
          </Box>
        )}
        
        {anatomy.parts && anatomy.parts.length > 0 && (
          <Box>
            <Box mb="md">
              <Typography variant="subtitle">Component Parts:</Typography>
            </Box>
            <Stack direction="column" gap="lg">
              {anatomy.parts.map((part, index) => (
                <Box key={index}>
                  <Typography variant="label">{part.name}</Typography>
                  <Typography variant="small" color="subdued">{part.description}</Typography>
                  {part.tokens && part.tokens.length > 0 && (
                    <Box mt="xs">
                      <Stack direction="row" gap="xs" wrap>
                        {part.tokens.map((token, tokenIndex) => (
                          <TokenChip key={tokenIndex} title={token} variant="default" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
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
            <ComponentsLayout>
              <DocsSidebar label="Components" sections={sidebarSections} currentId={router.isReady ? activeComponent : ''} />

              <MainContent>
                {activeComponentData && (
                  <>
                    <Box my="4xl">
                      <Stack gap="sm">
                        <Typography variant="h1">{activeComponentData.name}</Typography>
                        {/* Group and tier are neutral metadata, so they're Tags (decisions 0018, 0057) */}
                        <Stack direction="row" gap="xs" wrap>
                          <Tag>{activeComponentData.category}</Tag>
                          <Tag>{activeComponentData.tier}</Tag>
                        </Stack>
                      </Stack>
                      <Box mt="md">
                        <Typography variant="body" color="emphasis">
                          {activeComponentData.description}
                        </Typography>
                      </Box>
                      {activeComponentData.guides && activeComponentData.guides.length > 0 && (
                        <Box mt="lg">
                          <Stack direction="row" gap="md" wrap>
                            {activeComponentData.guides.map((guide) => (
                              <GuideLink key={guide.href} href={guide.href}>
                                Guide: {guide.label} →
                              </GuideLink>
                            ))}
                          </Stack>
                        </Box>
                      )}
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

                    {activeComponentData.anatomy && (
                      <ComponentSection>
                        <Stack gap="md" direction="column">
                          <Typography variant="h3" color="default">
                            Anatomy
                          </Typography>
                          {renderAnatomy(activeComponentData.anatomy)}
                        </Stack>
                      </ComponentSection>
                    )}

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
