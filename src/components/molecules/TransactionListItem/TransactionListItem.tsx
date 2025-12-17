import React from 'react'
import styled from 'styled-components'
import { Avatar } from '../../atoms/Avatar'
import { Badge } from '../../atoms/Badge'
import { MoneyDisplay, MoneyDisplayVariant } from '../../atoms/MoneyDisplay'
import { Icon, IconName } from '../../atoms/Icon'
import { DateFormatter } from '../../atoms/DateFormatter'
import { Typography } from '../../atoms/Typography'
import { Stack } from '../../atoms/Stack'
import tokens from '../../../styles/tokens.json'

export type TransactionStatus = 'completed' | 'pending' | 'failed'
export type TransactionCategory = 'shopping' | 'dining' | 'transport' | 'entertainment' | 'bills' | 'other'

export interface TransactionListItemProps {
  /** Merchant or transaction name */
  merchant: string
  
  /** Transaction amount (positive for income, negative for expense) */
  amount: number
  
  /** Transaction date */
  date: Date | string
  
  /** Transaction status */
  status?: TransactionStatus
  
  /** Transaction category */
  category?: TransactionCategory
  
  /** Optional merchant logo URL */
  merchantLogo?: string
  
  /** Optional description or note */
  description?: string
  
  /** Whether this transaction has a receipt attached */
  hasReceipt?: boolean
  
  /** Whether this transaction has notes attached */
  hasNote?: boolean
  
  /** Currency code */
  currency?: string
  
  /** Click handler for the transaction */
  onClick?: () => void
  
  /** Test identifier for automated testing */
  'data-testid'?: string
}

interface StyledContainerProps {
  $clickable?: boolean
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  align-items: center;
  min-height: 72px;
  padding: ${tokens.semantic.spacing.layout.md} ${tokens.semantic.spacing.layout.md};
  background-color: ${tokens.semantic.color.background.default};
  border-bottom: 1px solid ${tokens.semantic.color.border.default};
  gap: ${tokens.semantic.spacing.layout.md};
  transition: background-color 0.2s ease;
  
  ${({ $clickable }) => $clickable && `
    cursor: pointer;
    
    &:hover {
      background-color: ${tokens.semantic.color.background['interactive-hover']};
    }
    
    &:active {
      background-color: ${tokens.semantic.color.background['interactive-active']};
    }
    
    &:focus-visible {
      outline: 2px solid ${tokens.semantic.color.border.interactive};
      outline-offset: -2px;
    }
  `}
`

const StyledAvatarSection = styled.div`
  flex-shrink: 0;
`

const StyledMainContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${tokens.semantic.spacing.layout.xs};
`

const StyledTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.semantic.spacing.layout.sm};
`

const StyledMerchantSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.semantic.spacing.layout.xs};
  min-width: 0;
  flex: 1;
`

const StyledBottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.semantic.spacing.layout.sm};
`

const StyledMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.semantic.spacing.layout.sm};
`

const StyledIconIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.semantic.spacing.layout.xs};
  color: ${tokens.semantic.color.icon.subdued};
`

const StyledTruncatedText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// Map categories to icon names (using placeholders until custom icons available)
const categoryToIcon: Record<TransactionCategory, IconName> = {
  shopping: 'paper',      // Will use shopping bag icon
  dining: 'paper',        // Will use restaurant icon
  transport: 'paper',     // Will use car icon
  entertainment: 'star',  // Will use ticket icon
  bills: 'paper',         // Will use document icon
  other: 'paper'
}

// Map status to badge variant
const statusToBadgeVariant: Record<TransactionStatus, 'default' | 'primary' | 'error' | 'warning' | 'success'> = {
  completed: 'success',
  pending: 'warning',
  failed: 'error'
}

/**
 * TransactionListItem component
 * 
 * Displays a single transaction in a list with merchant info, amount, date,
 * status, and optional metadata (category, receipt, notes). Minimum height 72px
 * with interactive states for clickable items.
 * 
 * Composes: Avatar, Badge, MoneyDisplay, Icon, DateFormatter, Typography, Stack
 */
export const TransactionListItem: React.FC<TransactionListItemProps> = ({
  merchant,
  amount,
  date,
  status = 'completed',
  category,
  merchantLogo,
  description,
  hasReceipt = false,
  hasNote = false,
  currency = 'AUD',
  onClick,
  'data-testid': dataTestId
}) => {
  const isClickable = !!onClick
  
  // Determine amount variant
  const amountVariant: MoneyDisplayVariant = amount > 0 ? 'positive' : amount < 0 ? 'negative' : 'default'
  
  // Get category icon
  const categoryIcon = category ? categoryToIcon[category] : undefined
  
  // Get badge variant from status
  const badgeVariant = statusToBadgeVariant[status]
  
  const handleClick = () => {
    if (isClickable && onClick) {
      onClick()
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick?.()
    }
  }
  
  return (
    <StyledContainer
      $clickable={isClickable}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      aria-label={isClickable ? `${merchant} transaction, ${amount < 0 ? 'expense' : 'income'} of ${Math.abs(amount)}` : undefined}
      data-testid={dataTestId}
    >
      <StyledAvatarSection>
        {status === 'pending' ? (
          <Badge variant={badgeVariant} dot aria-label="Pending transaction">
            <Avatar 
              name={merchant}
              picture={merchantLogo}
              size="md"
            />
          </Badge>
        ) : (
          <Avatar 
            name={merchant}
            picture={merchantLogo}
            size="md"
          />
        )}
      </StyledAvatarSection>
      
      <StyledMainContent>
        <StyledTopRow>
          <StyledMerchantSection>
            {categoryIcon && (
              <span aria-label={`Category: ${category}`} role="img">
                <Icon 
                  name={categoryIcon} 
                  size="sm" 
                  iconColor="subdued"
                />
              </span>
            )}
            <StyledTruncatedText>
              <Typography variant="body">
                {merchant}
              </Typography>
            </StyledTruncatedText>
            {status === 'failed' && (
              <Badge variant="error" dot aria-label="Failed transaction">
                <span />
              </Badge>
            )}
          </StyledMerchantSection>
          
          <MoneyDisplay
            amount={amount}
            currency={currency}
            variant={amountVariant}
            size="medium"
            weight="medium"
            showSign
            data-testid={dataTestId ? `${dataTestId}-amount` : undefined}
          />
        </StyledTopRow>
        
        <StyledBottomRow>
          <StyledMetadata>
            <DateFormatter 
              dateString={typeof date === 'string' ? date : date.toISOString()} 
              mode="smart"
              data-testid={dataTestId ? `${dataTestId}-date` : undefined}
            />
            {description && (
              <StyledTruncatedText>
                <Typography 
                  variant="caption" 
                  color="subdued"
                >
                  • {description}
                </Typography>
              </StyledTruncatedText>
            )}
          </StyledMetadata>
          
          {(hasReceipt || hasNote) && (
            <StyledIconIndicator>
              {hasReceipt && (
                <span aria-label="Has receipt" role="img">
                  <Icon 
                    name="fileDocSearch" 
                    size="xs" 
                  />
                </span>
              )}
              {hasNote && (
                <span aria-label="Has note" role="img">
                  <Icon 
                    name="paper" 
                    size="xs" 
                  />
                </span>
              )}
            </StyledIconIndicator>
          )}
        </StyledBottomRow>
      </StyledMainContent>
    </StyledContainer>
  )
}
