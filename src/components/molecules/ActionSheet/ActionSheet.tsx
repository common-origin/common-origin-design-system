import { 
  useState, 
  useEffect, 
  useRef, 
  ReactNode, 
  KeyboardEvent,
  MouseEvent,
  ButtonHTMLAttributes
} from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { Icon } from '../../atoms/Icon/Icon'
import { type IconName } from '../../../types/icons'
import { Stack } from '../../atoms/Stack/Stack'
import { Typography } from '../../atoms/Typography/Typography'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

/**
 * Action item for the action sheet
 */
export interface Action {
  /**
   * Unique identifier
   */
  id: string
  
  /**
   * Display label
   */
  label: string
  
  /**
   * Optional icon
   */
  icon?: IconName
  
  /**
   * Whether this is a destructive action (shown in red)
   * @default false
   */
  destructive?: boolean
  
  /**
   * Whether this action is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Callback when action is selected
   */
  onSelect: () => void
}

/**
 * Props for the ActionSheet component
 */
export interface ActionSheetProps {
  /**
   * Whether the action sheet is open
   */
  isOpen: boolean
  
  /**
   * Callback when the action sheet should close
   */
  onClose: () => void
  
  /**
   * Title of the action sheet
   */
  title?: string
  
  /**
   * Optional description
   */
  description?: string
  
  /**
   * Array of actions
   */
  actions: Action[]
  
  /**
   * Whether to close on overlay click
   * @default true
   */
  closeOnOverlayClick?: boolean
  
  /**
   * Whether to close on Escape key
   * @default true
   */
  closeOnEscape?: boolean
  
  /**
   * Show close button in header
   * @default true
   */
  showCloseButton?: boolean
  
  /**
   * Test identifier
   */
  'data-testid'?: string
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;
`

const StyledActionSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${semantic.color.background.subtle};
  border-top-left-radius: ${base.border.radius[4]};
  border-top-right-radius: ${base.border.radius[4]};
  box-shadow: ${base.shadow[4]};
  max-height: 90vh;
  overflow-y: auto;
  z-index: 10000;
  animation: ${slideUp} 0.3s ease-out;
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${base.spacing[4]} ${base.spacing[4]} ${base.spacing[3]};
  border-bottom: ${base.border.width[1]} solid ${semantic.color.border.default};
`

const StyledHeaderContent = styled.div`
  flex: 1;
`

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${base.spacing[2]};
  border: none;
  background: transparent;
  color: ${semantic.color.icon.subdued};
  cursor: pointer;
  border-radius: ${base.border.radius[2]};
  transition: ${semantic.motion.hover};
  margin-left: ${base.spacing[2]};
  
  &:hover {
    color: ${semantic.color.icon.default};
    background-color: ${semantic.color.background.surface};
  }
  
  &:focus-visible {
    outline: ${base.border.width[2]} solid ${semantic.color.border.strong};
    outline-offset: ${base.spacing[1]};
  }
`

const StyledActionsList = styled.div`
  padding: ${base.spacing[2]} 0;
`

interface StyledActionButtonProps {
  $destructive: boolean
  $disabled: boolean
}

const StyledActionButton = styled.button<StyledActionButtonProps>`
  display: flex;
  align-items: center;
  gap: ${base.spacing[3]};
  width: 100%;
  padding: ${base.spacing[3]} ${base.spacing[4]};
  border: none;
  background: transparent;
  font: ${semantic.typography.body};
  text-align: left;
  cursor: pointer;
  transition: ${semantic.motion.hover};
  
  ${props => props.$destructive && `
    color: ${semantic.color.text.error};
  `}
  
  ${props => props.$disabled && `
    color: ${semantic.color.text.disabled};
    cursor: not-allowed;
  `}
  
  &:hover:not(:disabled) {
    background-color: ${semantic.color.background['interactive-subtle']};
  }
  
  &:focus-visible {
    outline: ${base.border.width[2]} solid ${semantic.color.border.strong};
    outline-offset: -${base.spacing[1]};
  }
  
  &:active:not(:disabled) {
    background-color: ${semantic.color.background.surface};
  }
`

const StyledDivider = styled.div`
  height: ${base.border.width[1]};
  background-color: ${semantic.color.border.default};
  margin: ${base.spacing[2]} ${base.spacing[4]};
`

/**
 * ActionSheet component for bottom sheet modals
 * 
 * Displays a modal action sheet that slides up from the bottom,
 * providing a list of actions for the user to choose from.
 * Includes focus trapping, keyboard navigation, and accessibility features.
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * 
 * <ActionSheet
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Choose an action"
 *   actions={[
 *     {
 *       id: 'edit',
 *       label: 'Edit',
 *       icon: 'edit',
 *       onSelect: () => console.log('Edit')
 *     },
 *     {
 *       id: 'delete',
 *       label: 'Delete',
 *       icon: 'trash',
 *       destructive: true,
 *       onSelect: () => console.log('Delete')
 *     }
 *   ]}
 * />
 * ```
 */
export const ActionSheet = ({
  isOpen,
  onClose,
  title,
  description,
  actions,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  'data-testid': dataTestId
}: ActionSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  
  // Store the element that had focus when sheet opened
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
    }
  }, [isOpen])
  
  // Focus management and escape key handling
  useEffect(() => {
    if (!isOpen) return
    
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        e.preventDefault()
        onClose()
      }
      
      // Focus trap
      if (e.key === 'Tab' && sheetRef.current) {
        const focusableElements = sheetRef.current.querySelectorAll<HTMLElement>(
          'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
        )
        
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    // Focus first focusable element
    requestAnimationFrame(() => {
      const firstButton = sheetRef.current?.querySelector<HTMLElement>('button:not(:disabled)')
      firstButton?.focus()
    })
    
    // Prevent body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      
      // Return focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, onClose, closeOnEscape])
  
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }
  
  const handleActionClick = (action: Action) => {
    if (!action.disabled) {
      action.onSelect()
      onClose()
    }
  }
  
  if (!isOpen) return null
  
  // Find if there are any destructive actions to add divider
  const destructiveIndex = actions.findIndex(a => a.destructive)
  const hasDestructive = destructiveIndex >= 0
  
  return createPortal(
    <>
      <StyledOverlay onClick={handleOverlayClick} />
      <StyledActionSheet
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'action-sheet-title' : undefined}
        aria-describedby={description ? 'action-sheet-description' : undefined}
        data-testid={dataTestId}
      >
        {(title || description || showCloseButton) && (
          <StyledHeader>
            <StyledHeaderContent>
              <Stack direction="column" gap={description && title ? 'xs' : 'none'}>
                {title && (
                  <div id="action-sheet-title">
                    <Typography variant="h3">
                      {title}
                    </Typography>
                  </div>
                )}
                {description && (
                  <div id="action-sheet-description">
                    <Typography variant="body" color="subdued">
                      {description}
                    </Typography>
                  </div>
                )}
              </Stack>
            </StyledHeaderContent>
            {showCloseButton && (
              <StyledCloseButton
                type="button"
                onClick={onClose}
                aria-label="Close"
              >
                <Icon name="close" size="sm" iconColor="subdued" />
              </StyledCloseButton>
            )}
          </StyledHeader>
        )}
        
        <StyledActionsList>
          {actions.map((action, index) => (
            <div key={action.id}>
              {hasDestructive && index === destructiveIndex && index > 0 && (
                <StyledDivider />
              )}
              <StyledActionButton
                type="button"
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                $destructive={action.destructive || false}
                $disabled={action.disabled || false}
                aria-label={action.label}
              >
                {action.icon && (
                  <Icon
                    name={action.icon}
                    size="md"
                    iconColor={
                      action.disabled
                        ? 'disabled'
                        : action.destructive
                        ? 'error'
                        : 'default'
                    }
                  />
                )}
                <Typography variant="body">{action.label}</Typography>
              </StyledActionButton>
            </div>
          ))}
        </StyledActionsList>
      </StyledActionSheet>
    </>,
    document.body
  )
}
