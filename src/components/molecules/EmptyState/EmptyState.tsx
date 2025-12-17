import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Stack } from '../../atoms/Stack'
import { Box } from '../../atoms/Box'
import { Typography } from '../../atoms/Typography'
import { Button } from '../../atoms/Button'
import { Icon } from '../../atoms/Icon'
import { type IconName } from '../../../types/icons'

const { semantic } = tokens

export type EmptyStateIllustration = 'search' | 'transactions' | 'notifications' | 'empty' | 'error' | 'custom'
export type EmptyStateVariant = 'default' | 'error' | 'success'
export type EmptyStateSize = 'small' | 'medium' | 'large'

export interface EmptyStateAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  icon?: IconName
}

export interface EmptyStateProps {
  /** Predefined illustration type */
  illustration?: EmptyStateIllustration
  /** Custom illustration (SVG string or React node) */
  customIllustration?: React.ReactNode
  /** Main heading */
  title: string
  /** Descriptive text */
  description: string
  /** Primary call-to-action */
  action?: EmptyStateAction
  /** Secondary action */
  secondaryAction?: EmptyStateAction
  /** Visual variant */
  variant?: EmptyStateVariant
  /** Size of the component */
  size?: EmptyStateSize
  /** Data test id for testing */
  'data-testid'?: string
}

interface StyledContainerProps {
  $size: EmptyStateSize
}

const StyledContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ $size }) => 
    $size === 'small' ? semantic.spacing.layout['4xl'] :
    $size === 'large' ? semantic.spacing.layout['8xl'] :
    semantic.spacing.layout['6xl']
  };
`

interface StyledIllustrationProps {
  $size: EmptyStateSize
  $variant: EmptyStateVariant
}

const StyledIllustration = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledIllustrationProps>`
  width: ${({ $size }) =>
    $size === 'small' ? '80px' :
    $size === 'large' ? '200px' :
    '120px'
  };
  height: ${({ $size }) =>
    $size === 'small' ? '80px' :
    $size === 'large' ? '200px' :
    '120px'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${semantic.spacing.layout['2xl']};
  color: ${({ $variant }) =>
    $variant === 'error' ? semantic.color.icon.error :
    $variant === 'success' ? semantic.color.icon.success :
    semantic.color.icon.subdued
  };
`

const StyledTextContainer = styled.div`
  max-width: 360px;
  margin-bottom: ${semantic.spacing.layout['2xl']};
`

// Map illustration type to icon name
const illustrationToIcon: Record<Exclude<EmptyStateIllustration, 'custom'>, IconName> = {
  search: 'search',
  transactions: 'paper', // Placeholder - will use custom icon when available
  notifications: 'bell',
  empty: 'paper',
  error: 'crossCircle'
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  illustration = 'empty',
  customIllustration,
  title,
  description,
  action,
  secondaryAction,
  variant = 'default',
  size = 'medium',
  'data-testid': dataTestId
}) => {
  // Determine what to show for illustration
  const renderIllustration = () => {
    if (customIllustration) {
      return customIllustration
    }
    
    if (illustration !== 'custom') {
      const iconName = illustrationToIcon[illustration]
      return <Icon name={iconName} size="2xl" />
    }
    
    return null
  }

  return (
    <StyledContainer 
      $size={size}
      data-testid={dataTestId}
      role="status"
      aria-label={`Empty state: ${title}`}
    >
      <StyledIllustration $size={size} $variant={variant} aria-hidden="true">
        {renderIllustration()}
      </StyledIllustration>

      <StyledTextContainer>
        <Typography 
          variant={size === 'small' ? 'h4' : size === 'large' ? 'h2' : 'h3'}
          color={variant === 'error' ? 'error' : 'default'}
          as={size === 'small' ? 'h4' : size === 'large' ? 'h2' : 'h3'}
        >
          {title}
        </Typography>
        
        <div style={{ marginTop: semantic.spacing.layout.md }}>
          <Typography variant="body" color="subdued">
            {description}
          </Typography>
        </div>
      </StyledTextContainer>

      {(action || secondaryAction) && (
        <Box width="100%" maxWidth="300px">
          <Stack direction="column" gap="sm">
            {action && (
              <Button
                variant={action.variant || 'primary'}
                onClick={action.onClick}
                iconName={action.icon}
                data-testid={dataTestId ? `${dataTestId}-primary-action` : undefined}
              >
                {action.label}
              </Button>
            )}
            
            {secondaryAction && (
              <Button
                variant="naked"
                onClick={secondaryAction.onClick}
                data-testid={dataTestId ? `${dataTestId}-secondary-action` : undefined}
              >
                {secondaryAction.label}
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </StyledContainer>
  )
}
