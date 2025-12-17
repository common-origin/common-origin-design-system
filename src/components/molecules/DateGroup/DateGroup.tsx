import React from 'react'
import styled from 'styled-components'
import { DateFormatter, DateFormatMode } from '../../atoms/DateFormatter'
import { MoneyDisplay, MoneyDisplayVariant } from '../../atoms/MoneyDisplay'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
import tokens from '../../../styles/tokens.json'

export interface DateGroupProps {
  /** The date for this group (used for formatting the header) */
  date: Date | string
  
  /** Children to render under the date header (typically transactions) */
  children: React.ReactNode
  
  /** Format mode for date display */
  format?: DateFormatMode
  
  /** Whether to show total amount for this date group */
  showTotal?: boolean
  
  /** Total amount for this date group (shown if showTotal is true) */
  totalAmount?: number
  
  /** Whether to show count of items in this group */
  showCount?: boolean
  
  /** Count of items in this group (shown if showCount is true) */
  count?: number
  
  /** Whether to make the header sticky (useful for scrolling lists) */
  sticky?: boolean
  
  /** Currency for total amount display */
  currency?: string
  
  /** Test identifier for automated testing */
  'data-testid'?: string
}

interface StyledHeaderProps {
  $sticky?: boolean
}

const StyledHeader = styled.div<StyledHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${tokens.semantic.spacing.layout.md} ${tokens.semantic.spacing.layout.sm};
  background-color: ${tokens.semantic.color.background.default};
  border-bottom: 1px solid ${tokens.semantic.color.border.default};
  
  ${({ $sticky }) => $sticky && `
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: ${tokens.base.shadow[2]};
  `}
`

const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.semantic.spacing.layout.sm};
`

const StyledRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.semantic.spacing.layout.md};
`

const StyledContent = styled.div`
  /* Content area for children */
`

/**
 * DateGroup component
 * 
 * Groups related content (typically transactions) under a formatted date header
 * with optional total amount and item count displays. Supports sticky headers
 * for scrolling lists.
 * 
 * Composes: DateFormatter, MoneyDisplay, Stack, Typography
 */
export const DateGroup: React.FC<DateGroupProps> = ({
  date,
  children,
  format = 'smart',
  showTotal = false,
  totalAmount,
  showCount = false,
  count,
  sticky = false,
  currency = 'AUD',
  'data-testid': dataTestId
}) => {
  // Determine total variant based on amount (positive = income, negative = expense)
  const totalVariant: MoneyDisplayVariant = totalAmount && totalAmount !== 0
    ? totalAmount > 0 ? 'positive' : 'negative'
    : 'default'

  return (
    <div data-testid={dataTestId} role="group" aria-label={`Transactions for ${date}`}>
      <StyledHeader $sticky={sticky} data-testid={dataTestId ? `${dataTestId}-header` : undefined}>
        <StyledLeftSection>
          <DateFormatter 
            dateString={typeof date === 'string' ? date : date.toISOString()} 
            mode={format}
            data-testid={dataTestId ? `${dataTestId}-date` : undefined}
          />
          {showCount && count !== undefined && (
            <Typography 
              variant="caption" 
              color="subdued"
              data-testid={dataTestId ? `${dataTestId}-count` : undefined}
            >
              ({count} {count === 1 ? 'item' : 'items'})
            </Typography>
          )}
        </StyledLeftSection>
        
        <StyledRightSection>
          {showTotal && totalAmount !== undefined && (
            <MoneyDisplay
              amount={totalAmount}
              currency={currency}
              variant={totalVariant}
              size="small"
              weight="medium"
              showSign
              data-testid={dataTestId ? `${dataTestId}-total` : undefined}
            />
          )}
        </StyledRightSection>
      </StyledHeader>
      
      <StyledContent data-testid={dataTestId ? `${dataTestId}-content` : undefined}>
        {children}
      </StyledContent>
    </div>
  )
}
