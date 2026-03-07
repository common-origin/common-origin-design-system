import React from 'react'
import styled from 'styled-components'
import { Stack } from '../../atoms/Stack'
import { Box } from '../../atoms/Box'
import { type IconName } from '../../atoms/Icon'
import { Typography } from '../../atoms/Typography'
import { MoneyDisplay } from '../../atoms/MoneyDisplay'
import { Button } from '../../atoms/Button'
import { CategoryBadge, type CategoryColor } from '../../atoms/CategoryBadge'
import { Avatar } from '../../atoms/Avatar'
import tokens from '../../../styles/tokens.json'

// Destructure tokens for cleaner access
const { semantic } = tokens
const { spacing } = semantic
const { layout } = spacing

export type AccountType = 'checking' | 'savings' | 'credit' | 'investment' | 'loan'
export type TrendDirection = 'up' | 'down' | 'neutral'

export interface AccountCardAction {
  label: string
  onClick: () => void
  icon?: IconName
  variant?: 'primary' | 'secondary' | 'naked'
}

export interface AccountCardProps {
  /** Type of account */
  accountType: AccountType
  
  /** Display name of the account */
  accountName: string
  
  /** Account balance */
  balance: number
  
  /** Optional account number (last 4 digits) */
  accountNumber?: string
  
  /** Trend direction for balance change */
  trend?: TrendDirection
  
  /** Trend value (e.g., percentage or amount) */
  trendValue?: string
  
  /** Primary action button */
  action?: AccountCardAction
  
  /** Secondary action button */
  secondaryAction?: AccountCardAction
  
  /** Currency code */
  currency?: string
  
  /** Whether the card should be interactive (clickable) */
  onClick?: () => void
  
  /** Test identifier for automated testing */
  'data-testid'?: string
}

const StyledBalanceSection = styled.div`
  margin-bottom: ${layout.lg};
`

const StyledTrendSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${layout.xs};
`

const StyledActions = styled.div`
  display: flex;
  gap: ${layout.sm};
  margin-top: auto;
`

const StyledStackWrapper = styled.div`
  height: 100%;
`

const StyledHeaderWrapper = styled.div`
  min-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${layout.none};

  & > span {
    margin-top: -${layout.xs};
  }
`

// Map trend direction to icon and color
const trendToIcon: Record<TrendDirection, IconName> = {
  up: 'arrowUp',
  down: 'arrowDown',
  neutral: 'arrowRight'
}

const trendToColor: Record<TrendDirection, CategoryColor> = {
  up: 'green',
  down: 'red',
  neutral: 'blue'
}

/**
 * AccountCard component
 * 
 * Displays account information in a card format with account type icon,
 * name, balance, optional trend indicator, and action buttons. Minimum
 * 300x200px with elevation and hover effects.
 * 
 * Composes: Stack, Box, Avatar, Typography, MoneyDisplay, Button
 */
export const AccountCard: React.FC<AccountCardProps> = ({
  accountName,
  balance,
  accountNumber,
  trend,
  trendValue,
  action,
  secondaryAction,
  currency = 'AUD',
  onClick,
  'data-testid': dataTestId
}) => {
  const isClickable = !!onClick
  
  // Get trend icon and color
  const trendIcon = trend ? trendToIcon[trend] : undefined
  const trendColor = trend ? trendToColor[trend] : undefined
  
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
    <Box
      minWidth="300px"
      p="lg"
      bg="subtle"
      border="default"
      borderRadius="xl"
      transition="all 0.2s ease"
      cursor={isClickable ? 'pointer' : 'default'}
      hoverShadow={isClickable ? 'floating' : undefined}
      hoverTransform={isClickable ? 'translateY(-2px)' : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : 'article'}
      aria-label={isClickable ? `${accountName} account, balance ${balance}` : undefined}
      data-testid={dataTestId}
    >
      <StyledStackWrapper>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap="md">
            <Avatar
              name={accountName}
              size="lg"
              data-testid={dataTestId ? `${dataTestId}-avatar` : undefined}
            />

            <Stack direction="column" justifyContent="space-between" alignItems="stretch" gap="md">
              <Stack direction="row" gap="md" alignItems="center">
                <StyledHeaderWrapper>
                  <Typography variant="h4">
                    {accountName}
                  </Typography>
                  {accountNumber && (
                    <Typography variant="small" color="subdued">
                      •••• {accountNumber}
                    </Typography>
                  )}
                </StyledHeaderWrapper>
              </Stack>
          
              <StyledBalanceSection>
                <Stack direction="row" gap="sm">
                  <MoneyDisplay
                    amount={balance}
                    currency={currency}
                    size="medium"
                    data-testid={dataTestId ? `${dataTestId}-balance` : undefined}
                  />
                  <Typography color="subdued">
                    Available
                  </Typography>
                  {trend && trendValue && (
                    <StyledTrendSection aria-label={`Trend ${trend}`} role="img">
                      <CategoryBadge size="small" icon={trendIcon} color={trendColor} variant="minimal">{trendValue}</CategoryBadge>
                    </StyledTrendSection>
                  )}
                </Stack>
              </StyledBalanceSection>
            </Stack>
          </Stack>
        
        {(action || secondaryAction) && (
          <Stack direction="row" gap="sm" justifyContent="flex-end">
            {secondaryAction && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  secondaryAction.onClick()
                }}
                variant={secondaryAction.variant || 'secondary'}
                iconName={secondaryAction.icon}
                data-testid={dataTestId ? `${dataTestId}-secondary-action` : undefined}
                size="small"
              >
                {secondaryAction.label}
              </Button>
            )}
            {action && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick()
                }}
                variant={action.variant || 'primary'}
                iconName={action.icon}
                data-testid={dataTestId ? `${dataTestId}-action` : undefined}
                size="small"
              >
                {action.label}
              </Button>
            )}
          </Stack>
        )}
        </Stack>
      </StyledStackWrapper>
    </Box>
  )
}
