import React from 'react'
import styled from 'styled-components'
import { Stack } from '../../atoms/Stack'
import { Box } from '../../atoms/Box'
import { Icon, IconName } from '../../atoms/Icon'
import { Typography } from '../../atoms/Typography'
import { MoneyDisplay } from '../../atoms/MoneyDisplay'
import { Button } from '../../atoms/Button'
import tokens from '../../../styles/tokens.json'

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

interface StyledCardProps {
  $clickable?: boolean
}

const StyledCard = styled.div<StyledCardProps>`
  min-width: 300px;
  min-height: 200px;
  padding: ${tokens.semantic.spacing.layout.lg};
  background-color: ${tokens.semantic.color.background.surface};
  border: 1px solid ${tokens.semantic.color.border.default};
  border-radius: ${tokens.base.border.radius[5]};
  box-shadow: ${tokens.base.shadow[3]};
  transition: all 0.2s ease;
  
  ${({ $clickable }) => $clickable && `
    cursor: pointer;
    
    &:hover {
      box-shadow: ${tokens.base.shadow[4]};
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:focus-visible {
      outline: 2px solid ${tokens.semantic.color.border.interactive};
      outline-offset: 2px;
    }
  `}
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${tokens.semantic.spacing.layout.md};
`

const StyledIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${tokens.semantic.color.background.interactive};
  border-radius: ${tokens.base.border.radius[3]};
  color: ${tokens.semantic.color.icon.interactive};
`

const StyledBalanceSection = styled.div`
  margin-bottom: ${tokens.semantic.spacing.layout.lg};
`

const StyledTrendSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.semantic.spacing.layout.xs};
  margin-top: ${tokens.semantic.spacing.layout.sm};
`

const StyledActions = styled.div`
  display: flex;
  gap: ${tokens.semantic.spacing.layout.sm};
  margin-top: auto;
  
  & > * {
    flex: 1;
  }
`

const StyledStackWrapper = styled.div`
  height: 100%;
  min-height: 168px;
`

// Map account types to icon names (using placeholders)
const accountTypeToIcon: Record<AccountType, IconName> = {
  checking: 'paper',      // Will use bank icon
  savings: 'star',        // Will use piggyBank icon
  credit: 'paper',        // Will use creditCard icon
  investment: 'star',     // Will use chartLine icon
  loan: 'paper'           // Will use document icon
}

// Map trend direction to icon and color
const trendToIcon: Record<TrendDirection, IconName> = {
  up: 'arrowUp',
  down: 'arrowDown',
  neutral: 'arrowRight'
}

/**
 * AccountCard component
 * 
 * Displays account information in a card format with account type icon,
 * name, balance, optional trend indicator, and action buttons. Minimum
 * 300x200px with elevation and hover effects.
 * 
 * Composes: Stack, Box, Icon, Typography, MoneyDisplay, Button
 */
export const AccountCard: React.FC<AccountCardProps> = ({
  accountType,
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
  
  // Get account type icon
  const accountIcon = accountTypeToIcon[accountType]
  
  // Get trend icon and color
  const trendIcon = trend ? trendToIcon[trend] : undefined
  const trendColor = trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'subdued'
  
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
    <StyledCard
      $clickable={isClickable}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : 'article'}
      aria-label={isClickable ? `${accountName} account, balance ${balance}` : undefined}
      data-testid={dataTestId}
    >
      <StyledStackWrapper>
        <Stack direction="column" gap="none">
          <StyledHeader>
          <Stack direction="row" gap="md" alignItems="center">
            <StyledIconWrapper aria-label={`${accountType} account`} role="img">
              <Icon 
                name={accountIcon} 
                size="md" 
              />
            </StyledIconWrapper>
            <Stack direction="column" gap="xs">
              <Typography variant="h4">
                {accountName}
              </Typography>
              {accountNumber && (
                <Typography variant="caption" color="subdued">
                  •••• {accountNumber}
                </Typography>
              )}
            </Stack>
          </Stack>
        </StyledHeader>
        
        <StyledBalanceSection>
          <Stack direction="column" gap="xs">
            <Typography variant="caption" color="subdued">
              Balance
            </Typography>
            <MoneyDisplay
              amount={balance}
              currency={currency}
              size="xlarge"
              weight="bold"
              data-testid={dataTestId ? `${dataTestId}-balance` : undefined}
            />
          </Stack>
          
          {trend && trendValue && (
            <StyledTrendSection aria-label={`Trend ${trend}`} role="img">
              <Icon 
                name={trendIcon!} 
                size="xs" 
                iconColor={trendColor}
              />
              <Typography variant="caption" color={trendColor}>
                {trendValue}
              </Typography>
            </StyledTrendSection>
          )}
        </StyledBalanceSection>
        
        {(action || secondaryAction) && (
          <StyledActions>
            {action && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick()
                }}
                variant={action.variant || 'primary'}
                iconName={action.icon}
                data-testid={dataTestId ? `${dataTestId}-action` : undefined}
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  secondaryAction.onClick()
                }}
                variant={secondaryAction.variant || 'naked'}
                iconName={secondaryAction.icon}
                data-testid={dataTestId ? `${dataTestId}-secondary-action` : undefined}
              >
                {secondaryAction.label}
              </Button>
            )}
          </StyledActions>
        )}
        </Stack>
      </StyledStackWrapper>
    </StyledCard>
  )
}
