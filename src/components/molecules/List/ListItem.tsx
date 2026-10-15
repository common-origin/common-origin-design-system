import React, { useContext } from 'react'
import styled from 'styled-components'
import tokens from '@/lib/cssTokens'
import { Icon } from '../../atoms/Icon'
import { Typography } from '../../atoms/Typography'
import { interactiveRow, reducedMotion } from '../../../lib/styleUtils'
import { ListSpacingContext, type ListSpacing } from './ListContext'

const { semantic } = tokens
const { duration, easing } = semantic.motion

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
   * Density of this item. Defaults to the parent List's `spacing`, or `comfortable` outside a
   * List; set it to override the List for this item (#77).
   */
  spacing?: ListSpacing
  
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
  min-height: ${semantic.size.touchTarget};
  position: relative;
  
  /* Disable user selection for interactive items */
  ${({ $interactive }) => $interactive && 'user-select: none;'}
  
  /* Disabled state */
  ${({ $disabled }) => $disabled && `
    opacity: ${semantic.opacity.disabled};
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  /* Destructive state - apply error color to text */
  ${({ $destructive, $disabled }) => $destructive && !$disabled && `
    color: ${semantic.color.text.danger};
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
  gap: ${semantic.space[300]};
  padding: ${({ $spacing }) =>
    $spacing === 'compact'
      ? `${semantic.space[200]} ${semantic.space[300]}`
      : `${semantic.space[300]} ${semantic.space[400]}`};
  border-radius: ${semantic.radius.sm};
  transition: background-color ${duration.fast} ${easing.decelerate}, color ${duration.fast} ${easing.decelerate};
  cursor: ${({ $interactive, $disabled }) => {
    if ($disabled) return 'not-allowed'
    if ($interactive) return 'pointer'
    return 'default'
  }};
  
  /* The shared row states (decision 0030). Only interactive, enabled rows respond to hover and
     press; the primary text is Typography, so the row colours it through a selector */
  ${({ $interactive, $disabled, $selected }) =>
    interactiveRow({
      selected: $selected,
      disabled: $disabled || !$interactive,
      textSelector: `${StyledTextContent} > :first-child`,
    })}
  
  /* Focus visible */
  &:focus-visible {
    outline: ${semantic.border.focus};
    outline-offset: ${semantic.border.focusOffset};
  }
`

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: ${semantic.size.icon.lg};
  height: ${semantic.size.icon.lg};
`

const StyledTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${semantic.space[100]};
  min-width: 0; /* Allow text truncation */
`

const StyledRightContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${semantic.space[200]};
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
  width: ${semantic.size.icon.lg};
  height: ${semantic.size.icon.lg};
  color: ${semantic.color.icon.muted};
  transition: transform ${duration.fast} ${easing.decelerate};
  transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0deg')});
  pointer-events: none;

  ${reducedMotion} {
    transition: none;
  }
`

const StyledExpandedContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $spacing: 'compact' | 'comfortable'
  $expanded: boolean
}>`
  overflow: hidden;
  /* Padding collapses with the height, and visibility hides the content from
     keyboard and screen readers once the collapse finishes. */
  transition: max-height ${duration.moderate} ${easing.decelerate},
              padding ${duration.moderate} ${easing.decelerate},
              opacity ${duration.moderate} ${easing.decelerate},
              visibility ${duration.moderate} ${easing.decelerate};
  max-height: ${({ $expanded }) => ($expanded ? '1000px' : '0')};
  opacity: ${({ $expanded }) => ($expanded ? '1' : '0')};
  visibility: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};

  ${reducedMotion} {
    transition: opacity ${duration.moderate} ${easing.decelerate},
                visibility ${duration.moderate} ${easing.decelerate};
  }
  
  ${({ $expanded, $spacing }) => $expanded && `
    padding: ${
      $spacing === 'compact'
        ? `${semantic.space[200]} ${semantic.space[300]} ${semantic.space[200]} ${tokens.component.listItem.expandedIndent.compact}`
        : `${semantic.space[200]} ${semantic.space[400]} ${semantic.space[300]} ${tokens.component.listItem.expandedIndent.comfortable}`
    };
    background-color: ${semantic.surface.raised};
    border-radius: ${semantic.radius.sm};
    margin: 0 ${
      $spacing === 'compact' 
        ? semantic.space[300] 
        : semantic.space[400]
    } ${
      $spacing === 'compact'
        ? semantic.space[200]
        : semantic.space[300]
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
  spacing: spacingProp,
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
  const listSpacing = useContext(ListSpacingContext)
  const spacing = spacingProp ?? listSpacing
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
    // The List's spacing is for its own items: reset it for this item's content, so components
    // built on ListItem (ActionSheet, even through its portal) and expanded content keep their own
    // density. A nested List provides its own spacing (#77)
    <ListSpacingContext.Provider value="comfortable">
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
    </ListSpacingContext.Provider>
  )
}

ListItem.displayName = 'ListItem'
