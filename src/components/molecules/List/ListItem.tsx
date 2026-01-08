import React, { useState } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Icon } from '../../atoms/Icon'
import { Typography } from '../../atoms/Typography'
import { Stack } from '../../atoms/Stack'

const { semantic, base } = tokens

export interface ListItemProps {
  /**
   * Main text/content
   */
  primary: React.ReactNode
  
  /**
   * Secondary text (smaller, subdued color)
   */
  secondary?: React.ReactNode
  
  /**
   * Badge/chip component on the right
   */
  badge?: React.ReactNode
  
  /**
   * Left icon or avatar component
   */
  icon?: React.ReactNode
  
  /**
   * Can be expanded to show children content
   * @default false
   */
  expandable?: boolean
  
  /**
   * Expansion state (controlled)
   * @default false
   */
  expanded?: boolean
  
  /**
   * Called when expansion is toggled
   */
  onToggle?: () => void
  
  /**
   * Enable hover/click interactive states
   * @default false
   */
  interactive?: boolean
  
  /**
   * Click handler for interactive items
   */
  onClick?: () => void
  
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean
  
  /**
   * Selected/active state
   * @default false
   */
  selected?: boolean
  
  /**
   * Destructive/danger state (e.g., delete actions)
   * Displays text and icon in error color
   * @default false
   */
  destructive?: boolean
  
  /**
   * Spacing variant from parent List
   * @default 'comfortable'
   */
  spacing?: 'compact' | 'comfortable'
  
  /**
   * Expanded content (shown when expanded=true)
   */
  children?: React.ReactNode
  
  /**
   * Additional CSS class name
   */
  className?: string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
  
  /**
   * Custom ARIA role (e.g., 'option' for combobox)
   * @default 'listitem'
   */
  role?: string
  
  /**
   * ARIA selected state (for role="option")
   */
  'aria-selected'?: boolean
  
  /**
   * Custom ID for ARIA references
   */
  id?: string
  
  /**
   * Custom tabIndex for focus management
   */
  tabIndex?: number
  
  /**
   * Keyboard event handler
   */
  onKeyDown?: (e: React.KeyboardEvent) => void
}

const StyledListItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $interactive: boolean
  $disabled: boolean
  $selected: boolean
  $destructive: boolean
  $spacing: 'compact' | 'comfortable'
}>`
  display: flex;
  flex-direction: column;
  min-height: 44px; /* Touch target minimum */
  position: relative;
  
  /* Disable user selection for interactive items */
  ${({ $interactive }) => $interactive && 'user-select: none;'}
  
  /* Disabled state */
  ${({ $disabled }) => $disabled && `
    opacity: ${base.opacity[50]};
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  /* Destructive state - apply error color to text */
  ${({ $destructive, $disabled }) => $destructive && !$disabled && `
    color: ${semantic.color.text.error};
  `}
`

const StyledItemContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $interactive: boolean
  $disabled: boolean
  $selected: boolean
  $destructive: boolean
  $spacing: 'compact' | 'comfortable'
}>`
  display: flex;
  align-items: flex-start;
  gap: ${semantic.spacing.layout.md};
  padding: ${({ $spacing }) =>
    $spacing === 'compact'
      ? `${semantic.spacing.layout.sm} ${semantic.spacing.layout.md}`
      : `${semantic.spacing.layout.md} ${semantic.spacing.layout.lg}`};
  border-radius: ${base.border.radius[2]};
  background-color: ${({ $selected }) =>
    $selected ? semantic.color.background['interactive-subtle'] : 'transparent'};
  transition: background-color 150ms ease;
  cursor: ${({ $interactive, $disabled }) => {
    if ($disabled) return 'not-allowed'
    if ($interactive) return 'pointer'
    return 'default'
  }};
  
  /* Interactive hover states */
  ${({ $interactive, $disabled, $selected }) => !$disabled && $interactive && `
    &:hover {
      background-color: ${
        $selected 
          ? tokens.component.button.variants.secondary.backgroundColor
          : tokens.component.button.variants.secondary.backgroundColor
      };
    }
    
    &:active {
      background-color: ${tokens.component.button.variants.naked.backgroundColor};
    }
  `}
  
  /* Focus visible */
  &:focus-visible {
    outline: 2px solid ${semantic.color.border.interactive};
    outline-offset: 2px;
  }
`

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
`

const StyledTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${semantic.spacing.layout.xs};
  min-width: 0; /* Allow text truncation */
`

const StyledRightContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${semantic.spacing.layout.sm};
  flex-shrink: 0;
  margin-left: auto;
`

const StyledChevronIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $expanded: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${semantic.color.icon.subdued};
  transition: transform 200ms ease;
  transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0deg')});
  pointer-events: none;
`

const StyledExpandedContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $spacing: 'compact' | 'comfortable'
  $expanded: boolean
}>`
  overflow: hidden;
  transition: max-height 200ms ease-out, opacity 200ms ease-out;
  max-height: ${({ $expanded }) => ($expanded ? '1000px' : '0')};
  opacity: ${({ $expanded }) => ($expanded ? '1' : '0')};
  
  ${({ $expanded, $spacing }) => $expanded && `
    padding: ${
      $spacing === 'compact'
        ? `${semantic.spacing.layout.sm} ${semantic.spacing.layout.md} ${semantic.spacing.layout.sm} 48px`
        : `${semantic.spacing.layout.sm} ${semantic.spacing.layout.lg} ${semantic.spacing.layout.md} 60px`
    };
    background-color: ${semantic.color.background['subtle']};
    border-radius: ${base.border.radius[2]};
    margin: 0 ${
      $spacing === 'compact' 
        ? semantic.spacing.layout.md 
        : semantic.spacing.layout.lg
    } ${
      $spacing === 'compact'
        ? semantic.spacing.layout.sm
        : semantic.spacing.layout.md
    };
  `}
`

export const ListItem = ({
  primary,
  secondary,
  badge,
  icon,
  expandable = false,
  expanded = false,
  onToggle,
  interactive = false,
  onClick,
  disabled = false,
  selected = false,
  destructive = false,
  spacing = 'comfortable',
  children,
  className,
  'data-testid': dataTestId,
  role: customRole,
  'aria-selected': ariaSelected,
  id,
  tabIndex: customTabIndex,
  onKeyDown: customOnKeyDown,
  ...props
}: ListItemProps) => {
  const isInteractive = interactive || expandable || customRole === 'option'
  const contentRole = customRole === 'option' ? undefined : (isInteractive ? 'button' : undefined)
  const ariaExpanded = expandable ? expanded : undefined
  const ariaDisabled = disabled ? true : undefined
  const ariaCurrent = selected ? 'true' : undefined
  
  const handleClick = () => {
    if (disabled) return
    
    if (expandable && onToggle) {
      onToggle()
    } else if (onClick) {
      onClick()
    }
  }
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (customOnKeyDown) {
      customOnKeyDown(event)
      return
    }
    
    if (disabled) return
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }
  
  return (
    <StyledListItem
      $interactive={isInteractive}
      $disabled={disabled}
      $selected={selected}
      $destructive={destructive}
      $spacing={spacing}
      className={className}
      data-testid={dataTestId}
      role={customRole || 'listitem'}
      id={id}
      aria-selected={ariaSelected}
      {...props}
    >
      <StyledItemContent
        $interactive={isInteractive}
        $disabled={disabled}
        $selected={selected}
        $destructive={destructive}
        $spacing={spacing}
        role={contentRole}
        aria-expanded={ariaExpanded}
        aria-disabled={ariaDisabled}
        aria-current={ariaCurrent}
        tabIndex={customTabIndex !== undefined ? customTabIndex : (isInteractive && !disabled ? 0 : undefined)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {icon && (
          <StyledIconContainer aria-hidden="true">
            {icon}
          </StyledIconContainer>
        )}
        
        <StyledTextContent>
          <Typography variant="body" color={destructive ? 'error' : 'default'}>
            {primary}
          </Typography>
          {secondary && (
            <Typography variant="small" color="subdued">
              {secondary}
            </Typography>
          )}
        </StyledTextContent>
        
        <StyledRightContent>
          {badge}
          {expandable && (
            <StyledChevronIcon $expanded={expanded} aria-hidden="true">
              <Icon name="caretDown" size="sm" />
            </StyledChevronIcon>
          )}
        </StyledRightContent>
      </StyledItemContent>
      
      {expandable && children && (
        <StyledExpandedContent
          $spacing={spacing}
          $expanded={expanded}
          aria-hidden={!expanded}
        >
          {children}
        </StyledExpandedContent>
      )}
    </StyledListItem>
  )
}

ListItem.displayName = 'ListItem'
