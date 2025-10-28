import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  BooleanChip,
  CodeBlock,
  Container,
  Layout,
  Navigation,
  Stack,
  Typography,
  IconButton,
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
`

// Data View Pattern Components
const SearchInput = styled.input`
  width: 100%;
  padding: ${spacing.layout.md};
  border: ${border.default};
  border-radius: ${tokens.base.border.radius[2]};
  font-size: ${tokens.base.fontSize[2]};
  background-color: ${color.background.default};
  color: ${color.text.default};
  
  &::placeholder {
    color: ${color.text.subdued};
  }
  
  &:focus {
    outline: none;
    border-color: ${color.border.interactive};
  }
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.md};
  margin-bottom: ${spacing.layout.md};
  flex-wrap: wrap;
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.sm};
  flex: 1;
`

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.sm};
  margin-left: auto;
`

const ItemsCount = styled.div`
  color: ${color.text.subdued};
  font-size: ${tokens.base.fontSize[1]};
  margin-bottom: ${spacing.layout.md};
`

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: ${spacing.layout.lg};
  
  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  background-color: ${color.background.subtle};
  border-bottom: ${border.default};
`

const TableHeaderCell = styled.th`
  padding: ${spacing.layout.md};
  text-align: left;
  font-weight: 600;
  color: ${color.text.emphasis};
`

const TableRow = styled.tr`
  border-bottom: ${border.subtle};
  
  &:last-child {
    border-bottom: none;
  }
`

const TableCell = styled.td`
  padding: ${spacing.layout.md};
`

const PlaceholderBox = styled.div<{ $width?: string; $height?: string }>`
  background-color: ${color.background.subtle};
  border-radius: ${tokens.base.border.radius[2]};
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '40px'};
`

const ListView = styled.div`
  display: none;
  
  @media (max-width: ${breakpoint.md}) {
    display: block;
  }
`

const ListItem = styled.div`
  background-color: ${color.background.subtle};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[3]};
  padding: ${spacing.layout.md};
  margin-bottom: 1rem;
`

const ListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${spacing.layout.lg};
  
  @media (max-width: ${breakpoint.md}) {
    flex-direction: column;
    gap: ${spacing.layout.md};
  }
`

const PaginationButtons = styled.div`
  display: flex;
  gap: ${spacing.layout.xs};
  align-items: center;
`

const PageButton = styled.button<{ $active?: boolean }>`
  padding: ${spacing.layout.sm} ${spacing.layout.md};
  border: ${border.default};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${props => props.$active ? color.background.emphasis : color.background.default};
  color: ${props => props.$active ? color.text.inverse : color.text.default};
  cursor: pointer;
  font-size: ${tokens.base.fontSize[2]};
  
  &:hover {
    background-color: ${props => props.$active ? color.background.emphasis : color.background.subtle};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SideDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-100%'};
  width: 100%;
  max-width: 360px;
  height: 100vh;
  background-color: ${color.background.default};
  border-left: ${border.default};
  box-shadow: ${tokens.base.shadow[4]};
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  overflow-y: auto;
  
  @media (max-width: ${breakpoint.md}) {
    max-width: 100%;
    top: auto;
    bottom: ${props => props.$isOpen ? '0' : '-100%'};
    right: 0;
    height: auto;
    max-height: 80vh;
    border-left: none;
    border-top: ${border.default};
    border-radius: ${tokens.base.border.radius[4]} ${tokens.base.border.radius[4]} 0 0;
    transition: bottom 0.3s ease-in-out;
  }
`

const DrawerOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease-in-out;
`

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.layout.lg};
  border-bottom: ${border.default};
`

const DrawerContent = styled.div`
  padding: ${spacing.layout.lg};
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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilters, setActiveFilters] = useState<string[]>(['Active', 'Pending'])
    
    const totalItems = 48
    const itemsPerPage = 10
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)
    
    const toggleFilter = (filter: string) => {
      setActiveFilters(prev => 
        prev.includes(filter) 
          ? prev.filter(f => f !== filter)
          : [...prev, filter]
      )
    }
    
    return (
      <Stack direction="column" gap="2xl">
        <Box>
          <Typography variant="h3">Interactive Demo</Typography>
          <Typography variant="body" color="subdued">
            Try resizing your browser to see the responsive behavior. The table view automatically transitions to a mobile-optimized list view.
          </Typography>
        </Box>

        <DemoContainer>
          {/* Search Row */}
          <Box mb="md">
            <SearchInput 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          
          {/* Filter Row */}
          <FilterRow>
            <FilterGroup>
              <Button 
                variant="primary" 
                size="small"
                onClick={() => setIsDrawerOpen(true)}
              >
                All filters
              </Button>
              
              <BooleanChip
                selected={activeFilters.includes('Active')}
                onClick={() => toggleFilter('Active')}
              >
                Active
              </BooleanChip>
              
              <BooleanChip
                selected={activeFilters.includes('Pending')}
                onClick={() => toggleFilter('Pending')}
              >
                Pending
              </BooleanChip>
              
              <BooleanChip
                selected={activeFilters.includes('Completed')}
                onClick={() => toggleFilter('Completed')}
              >
                Completed
              </BooleanChip>
            </FilterGroup>
            
            <ActionsGroup>
              <IconButton 
                iconName="add" 
                variant="naked" 
                size="medium"
                aria-label="Export data"
              />
              <IconButton 
                iconName="menu" 
                variant="naked" 
                size="medium"
                aria-label="Column visibility"
              />
            </ActionsGroup>
          </FilterRow>
          
          {/* Items Count */}
          <ItemsCount>
            Showing {startItem}-{endItem} of {totalItems} items
          </ItemsCount>
          
          {/* Table View (Desktop) */}
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Column 1</TableHeaderCell>
                  <TableHeaderCell>Column 2</TableHeaderCell>
                  <TableHeaderCell>Column 3</TableHeaderCell>
                  <TableHeaderCell>Column 4</TableHeaderCell>
                  <TableHeaderCell>Column 5</TableHeaderCell>
                  <TableHeaderCell>Column 6</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><PlaceholderBox $height="40px" /></TableCell>
                    <TableCell><PlaceholderBox $height="40px" /></TableCell>
                    <TableCell><PlaceholderBox $height="40px" /></TableCell>
                    <TableCell><PlaceholderBox $height="40px" /></TableCell>
                    <TableCell><PlaceholderBox $height="40px" /></TableCell>
                    <TableCell><PlaceholderBox $height="40px" /></TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          
          {/* List View (Mobile) */}
          <ListView>
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <ListItem key={index}>
                <ListItemContent>
                  <PlaceholderBox $height="40px" />
                  <PlaceholderBox $height="40px" />
                  <PlaceholderBox $height="40px" />
                  <PlaceholderBox $height="40px" />
                </ListItemContent>
              </ListItem>
            ))}
          </ListView>
          
          {/* Pagination */}
          <PaginationContainer>
            <ItemsCount>
              Page {currentPage} of {totalPages}
            </ItemsCount>
            
            <PaginationButtons>
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                const pageNumber = index + 1
                return (
                  <PageButton
                    key={pageNumber}
                    $active={currentPage === pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </PageButton>
                )
              })}
              
              {totalPages > 5 && <span>...</span>}
              
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </PaginationButtons>
          </PaginationContainer>
        </DemoContainer>
        
        {/* Side Drawer Overlay */}
        <DrawerOverlay $isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />
        
        {/* Side Drawer */}
        <SideDrawer $isOpen={isDrawerOpen}>
          <DrawerHeader>
            <Typography variant="h4">All Filters</Typography>
            <IconButton 
              iconName="close" 
              variant="naked" 
              size="medium"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close filters"
            />
          </DrawerHeader>
          <DrawerContent>
            <Stack direction="column" gap="lg">
              <Box>
                <Box mb="sm">
                  <Typography variant="subtitle">Filter Group 1</Typography>
                </Box>
                <PlaceholderBox $height="120px" />
              </Box>
              
              <Box>
                <Box mb="sm">
                  <Typography variant="subtitle">Filter Group 2</Typography>
                </Box>
                <PlaceholderBox $height="120px" />
              </Box>
              
              <Box>
                <Box mb="sm">
                  <Typography variant="subtitle">Filter Group 3</Typography>
                </Box>
                <PlaceholderBox $height="120px" />
              </Box>
              
              <Box>
                <Box mb="sm">
                  <Typography variant="subtitle">Filter Group 4</Typography>
                </Box>
                <PlaceholderBox $height="120px" />
              </Box>
            </Stack>
          </DrawerContent>
        </SideDrawer>

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
