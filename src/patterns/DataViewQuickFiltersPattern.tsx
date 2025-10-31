import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  BooleanChip,
  Stack,
  Typography,
  IconButton,
} from '../page-components'
import tokens from '@/styles/tokens.json'

const { base: { breakpoint }, semantic: { color, border, spacing } } = tokens

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
  gap: ${spacing.layout.md};
  margin-bottom: ${spacing.layout.lg};
  flex-wrap: wrap;
  
  @media (max-width: ${breakpoint.md}) {
    gap: ${spacing.layout.sm};
  }
`

const QuickFiltersGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.sm};
  flex-wrap: wrap;
  flex: 1;
  
  @media (max-width: ${breakpoint.md}) {
    flex: 1;
    width: 100%;
  }
`

const QuickFiltersLabel = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${spacing.layout.sm};

  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
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

  @media (max-width: ${breakpoint.md}) {
    border-bottom: none;
  }
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

const DemoContainer = styled.div`
  background-color: ${color.background.default};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[3]};
  padding: ${spacing.layout['2xl']};
  margin: ${spacing.layout.lg} 0;
`

export const DataViewQuickFiltersPattern: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Boolean filter states - toggled directly on/off
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [urgentItems, setUrgentItems] = useState(false)
  
  const totalItems = 48
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)
  
  // Count active filters
  const activeFiltersCount = [showActiveOnly, showCompleted, urgentItems].filter(Boolean).length
  
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
                aria-label="Open actions menu"
              />
            </MobileActionButton>
          </SearchRow>
        </Box>
        
        {/* Filter Row with Quick Filters */}
        <FilterRow>
          <QuickFiltersGroup>
            <QuickFiltersLabel>
              <Typography variant="label" color="subdued">Quick filters:</Typography>
            </QuickFiltersLabel>
            
            <BooleanChip
              selected={showActiveOnly}
              onClick={() => setShowActiveOnly(!showActiveOnly)}
              aria-label="Toggle show active only filter"
            >
              Show Active Only
            </BooleanChip>
            
            <BooleanChip
              selected={showCompleted}
              onClick={() => setShowCompleted(!showCompleted)}
              aria-label="Toggle show completed filter"
            >
              Show Completed
            </BooleanChip>
            
            <BooleanChip
              selected={urgentItems}
              onClick={() => setUrgentItems(!urgentItems)}
              aria-label="Toggle urgent items filter"
            >
              Urgent Items
            </BooleanChip>
          </QuickFiltersGroup>
          
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
        
        {/* Items Count */}
        <ItemsCount>
          <span>
            Showing {startItem}-{endItem} of {totalItems} items
          </span>
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
    </>
  )
}
