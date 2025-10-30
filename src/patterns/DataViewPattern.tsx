import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {
  Badge,
  Box,
  Button,
  Chip,
  FilterChip,
  Stack,
  Typography,
  IconButton,
	Divider,
  Dropdown,
} from '../page-components'
import tokens from '@/styles/tokens.json'

const { base: { breakpoint, zIndex }, semantic: { color, border, spacing } } = tokens

// Styled Components
const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.xs};
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: ${spacing.layout.md} ${spacing.layout.lg};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[6]};
  font-size: ${tokens.base.fontSize[2]};
  background-color: ${color.background.subtle};
  color: ${color.text.default};
  
  &::placeholder {
    color: ${color.text.subdued};
  }
  
  &:focus {
    outline: ${tokens.component.button.focus.outline};
    outline-offset: ${tokens.component.button.focus.outlineOffset};
  }
  
  @media (max-width: ${breakpoint.md}) {
    max-width: 100%;
  }
`

const MobileActionButton = styled.div`
  display: none;
  
  @media (max-width: ${breakpoint.md}) {
    display: block;
  }
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout['6xl']};
  margin-bottom: ${spacing.layout.lg};
  flex-wrap: wrap;
  
  @media (max-width: ${breakpoint.md}) {
    flex-wrap: nowrap;
    gap: ${spacing.layout.sm};
  }
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.md};
  flex: 1;
  min-width: 0;
  position: relative;
  
  @media (max-width: ${breakpoint.md}) {
    flex: 0;
    min-width: auto;
  }
`

const ActiveFiltersLabel = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${spacing.layout.md};
  border-left: ${border.subtle};
  height: ${spacing.layout['2xl']};

  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const AppliedFiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.sm};
  flex: 1;
  min-width: 0;
  overflow: hidden;
  
  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const FilterChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.sm};
  flex-wrap: nowrap;
  overflow: hidden;
  min-width: 0;
  flex: 1;
`

const OverflowIndicator = styled.div`
	display: flex;
	align-items: center;
  flex-shrink: 0;
  margin-left: ${spacing.layout.sm};
  
  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const MobileFilterToggle = styled.div`
  display: none;
  
  @media (max-width: ${breakpoint.md}) {
    display: block;
    margin-left: auto;
  }
`

const MobileFiltersContainer = styled.div<{ $isExpanded: boolean }>`
  display: none;
  
  @media (max-width: ${breakpoint.md}) {
    display: block;
    overflow: hidden;
    max-height: ${props => props.$isExpanded ? spacing.layout['6xl'] : spacing.layout.none};
    transition: ${tokens.semantic.motion.transition.normal};
  }
`

const MobileFiltersContent = styled.div`
  padding: 0 0 ${spacing.layout.xl} 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.layout.sm};
`

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.sm};
  margin-left: auto;
  
  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const ItemsCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${color.text.subdued};
  font-size: ${tokens.base.fontSize[1]};
  padding-bottom: ${spacing.layout.md};
	border-bottom: ${border.subtle};
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
  border-bottom: ${border.subtle};
`

const TableHeaderCell = styled.th`
  padding: ${spacing.layout.md};
  text-align: left;
  font-weight: 600;
  color: ${color.text.emphasis};
	font: ${tokens.semantic.typography.overline};
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
  background-color: ${color.background.surface};
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
  margin-bottom: ${spacing.layout.lg};
`

const ListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.layout.lg};
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: ${spacing.layout.lg};
  
  @media (max-width: ${breakpoint.md}) {
    justify-content: center;
  }
`

const PaginationButtons = styled.div`
  display: flex;
  gap: ${spacing.layout.xs};
  align-items: center;
`

const SideDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-100%'};
  width: 100%;
  max-width: ${spacing.layout['6xl']};
  height: 100vh;
  background-color: ${color.background.default};
  border-left: ${border.default};
  box-shadow: ${tokens.base.shadow[4]};
  transition: ${tokens.semantic.motion.transition.normal};
  z-index: ${zIndex[8]};
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
    transition: ${tokens.semantic.motion.transition.normal};
  }
`

const DrawerOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, ${tokens.base.opacity[40]});
  z-index: ${zIndex[7]};
  opacity: ${props => props.$isOpen ? tokens.base.opacity[100] : tokens.base.opacity[0]};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  transition: ${tokens.semantic.motion.transition.normal};
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

const DemoContainer = styled.div`
  background-color: ${color.background.default};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[3]};
  padding: ${spacing.layout['2xl']};
  margin: ${spacing.layout.lg} 0;
`

export const DataViewPattern: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)
  
  // Applied filter chips from dropdowns
  const [appliedFilters, setAppliedFilters] = useState<Array<{ id: string; label: string; value: string }>>([])
  
  // Dropdown selections (staged - not applied until user clicks Apply)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  
  // Dynamic overflow detection
  const filterChipsRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [hiddenCount, setHiddenCount] = useState(0)
  
  // Detect if filter chips are overflowing
  useEffect(() => {
    if (!filterChipsRef.current || appliedFilters.length === 0) {
      setHasOverflow(false)
      setHiddenCount(0)
      return
    }
    
    const checkOverflow = () => {
      const container = filterChipsRef.current
      if (!container) return
      
      const isOverflowing = container.scrollWidth > container.clientWidth
      setHasOverflow(isOverflowing)
      
      if (isOverflowing) {
        // Calculate approximately how many chips are hidden
        const chips = Array.from(container.children) as HTMLElement[]
        let visibleWidth = 0
        let hiddenChips = 0
        
        chips.forEach((chip, index) => {
          const chipRect = chip.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()
          
          // Check if chip is fully visible within container
          if (chipRect.right > containerRect.right) {
            hiddenChips = appliedFilters.length - index
          }
        })
        
        setHiddenCount(Math.max(1, hiddenChips))
      } else {
        setHiddenCount(0)
      }
    }
    
    // Check initially and on changes
    setTimeout(checkOverflow, 0)
    
    const resizeObserver = new ResizeObserver(checkOverflow)
    if (filterChipsRef.current) {
      resizeObserver.observe(filterChipsRef.current)
    }
    
    return () => resizeObserver.disconnect()
  }, [appliedFilters])
  
  // Dropdown options
  const categoryOptions = [
    { id: 'cat-none', label: 'Select category...', value: '' },
    { id: 'cat-design', label: 'Design', value: 'design' },
    { id: 'cat-development', label: 'Development', value: 'development' },
    { id: 'cat-marketing', label: 'Marketing', value: 'marketing' },
    { id: 'cat-sales', label: 'Sales', value: 'sales' },
  ]
  
  const statusOptions = [
    { id: 'status-none', label: 'Select status...', value: '' },
    { id: 'status-todo', label: 'To Do', value: 'todo' },
    { id: 'status-progress', label: 'In Progress', value: 'in-progress' },
    { id: 'status-review', label: 'In Review', value: 'review' },
    { id: 'status-done', label: 'Done', value: 'done' },
  ]
  
  const priorityOptions = [
    { id: 'priority-none', label: 'Select priority...', value: '' },
    { id: 'priority-low', label: 'Low', value: 'low' },
    { id: 'priority-medium', label: 'Medium', value: 'medium' },
    { id: 'priority-high', label: 'High', value: 'high' },
    { id: 'priority-urgent', label: 'Urgent', value: 'urgent' },
  ]
  
  const totalItems = 48
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)
  
  const applyFilters = () => {
    const newFilters: Array<{ id: string; label: string; value: string }> = []
    
    // Add category filter if selected
    if (categoryFilter) {
      const option = categoryOptions.find(opt => opt.id === categoryFilter)
      if (option) {
        newFilters.push({ 
          id: categoryFilter, 
          label: `Category: ${option.label}`, 
          value: option.value || categoryFilter 
        })
      }
    }
    
    // Add status filter if selected
    if (statusFilter) {
      const option = statusOptions.find(opt => opt.id === statusFilter)
      if (option) {
        newFilters.push({ 
          id: statusFilter, 
          label: `Status: ${option.label}`, 
          value: option.value || statusFilter 
        })
      }
    }
    
    // Add priority filter if selected
    if (priorityFilter) {
      const option = priorityOptions.find(opt => opt.id === priorityFilter)
      if (option) {
        newFilters.push({ 
          id: priorityFilter, 
          label: `Priority: ${option.label}`, 
          value: option.value || priorityFilter 
        })
      }
    }
    
    setAppliedFilters(newFilters)
    setIsDrawerOpen(false)
  }
  
  const removeAppliedFilter = (filterId: string) => {
    setAppliedFilters(prev => prev.filter(f => f.id !== filterId))
    
    // Reset the corresponding dropdown based on the filter ID
    if (filterId.startsWith('cat-')) setCategoryFilter('')
    if (filterId.startsWith('status-')) setStatusFilter('')
    if (filterId.startsWith('priority-')) setPriorityFilter('')
  }
  
  const clearAllFilters = () => {
    setAppliedFilters([])
    setCategoryFilter('')
    setStatusFilter('')
    setPriorityFilter('')
  }
  
  return (
    <>
      <DemoContainer>
        {/* Search Row */}
        <Box mb="lg">
          <SearchRow>
            <SearchInput 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MobileActionButton>
              <IconButton 
                iconName="filter" 
                variant="naked" 
                size="medium"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open actions menu"
              />
            </MobileActionButton>
          </SearchRow>
        </Box>
        
        {/* Filter Row */}
        <FilterRow>
          <FilterGroup>
						<Badge count={appliedFilters.length} variant="primary">
							<Button 
								variant="primary" 
								size="small"
								onClick={() => setIsDrawerOpen(true)}
								aria-label="Open filters"
								iconName="menu"
							>
								All filters
							</Button>
						</Badge>
            
            {/* Applied Filters from Dropdowns - Desktop Only */}
            {appliedFilters.length > 0 && (
              <AppliedFiltersContainer>
								<ActiveFiltersLabel>
									<Typography variant="label" color="subdued">Active filters:</Typography>
								</ActiveFiltersLabel>
                <FilterChipsWrapper ref={filterChipsRef}>
                  {appliedFilters.map(filter => (
                    <FilterChip
                      key={filter.id}
                      selected
                      onDismiss={() => removeAppliedFilter(filter.id)}
                      aria-label={`Remove ${filter.label} filter`}
                    >
                      {filter.label}
                    </FilterChip>
                  ))}
                </FilterChipsWrapper>
                {hasOverflow && hiddenCount > 0 && (
                  <OverflowIndicator>
                    <Typography variant="label" color="subdued">
                      +{hiddenCount} more
                    </Typography>
                  </OverflowIndicator>
                )}
              </AppliedFiltersContainer>
            )}
          </FilterGroup>
          
          {/* Mobile Filter Toggle */}
          {appliedFilters.length > 0 && (
            <MobileFilterToggle>
              <Button
                variant="secondary"
                size="small"
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                iconName={isFiltersExpanded ? "arrowUp" : "arrowDown"}
                aria-label={isFiltersExpanded ? "Collapse active filters" : "Expand active filters"}
                aria-expanded={isFiltersExpanded}
              >
                {isFiltersExpanded ? "Collapse" : "Expand"} active filters
              </Button>
            </MobileFilterToggle>
          )}
          
          <ActionsGroup>
            <Button 
              iconName="export" 
              variant="secondary" 
              size="small"
              aria-label="Export data"
            >
							Export
            </Button>
            <Button 
              iconName="table" 
              variant="secondary" 
              size="small"
              aria-label="Column visibility"
            >
              Columns
            </Button>
          </ActionsGroup>
        </FilterRow>
        
        {/* Mobile Expandable Filters */}
        {appliedFilters.length > 0 && (
          <MobileFiltersContainer $isExpanded={isFiltersExpanded}>
            <MobileFiltersContent>
							<Typography variant="label" color="subdued">Active filters:</Typography>
              {appliedFilters.map(filter => (
                <FilterChip
                  key={filter.id}
                  selected
                  onDismiss={() => removeAppliedFilter(filter.id)}
                  aria-label={`Remove ${filter.label} filter`}
                >
                  {filter.label}
                </FilterChip>
              ))}
            </MobileFiltersContent>
          </MobileFiltersContainer>
        )}
        
        {/* Items Count */}
        <ItemsCount>
          <span>Showing {startItem}-{endItem} of {totalItems} items</span>
          <span>Page {currentPage} of {totalPages}</span>
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
          
          <PaginationButtons>
            <Button 
              variant="secondary"
              size="small"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              const pageNumber = index + 1
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })}
            
            {totalPages > 5 && <span>...</span>}
            
            <Button 
              variant="secondary"
              size="small"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </DemoContainer>
      
      {/* Side Drawer Overlay */}
      <DrawerOverlay $isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />
      
      {/* Side Drawer */}
      <SideDrawer $isOpen={isDrawerOpen}>
        <DrawerHeader>
          <Typography variant="h4">Filters</Typography>
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
              <Dropdown
                label="Category"
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="Select category..."
              />
            </Box>
            
            <Box>
              <Dropdown
                label="Status"
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Select status..."
              />
            </Box>
            
            <Box>
              <Dropdown
                label="Priority"
                options={priorityOptions}
                value={priorityFilter}
                onChange={setPriorityFilter}
                placeholder="Select priority..."
              />
            </Box>
            
            <Divider size="small" />
            
            <Stack direction="row" gap="sm" justifyContent="flex-end">
              <Button 
                variant="secondary" 
                size="medium"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
							<Button 
                variant="primary" 
                size="medium"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </Stack>
          </Stack>
        </DrawerContent>
      </SideDrawer>
    </>
  )
}
