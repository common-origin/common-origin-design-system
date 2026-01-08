import React, { 
  useEffect, 
  useRef, 
  MouseEvent
} from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { Divider } from '../../atoms/Divider/Divider'
import { Icon } from '../../atoms/Icon/Icon'
import { type IconName } from '../../../types/icons'
import { Stack } from '../../atoms/Stack/Stack'
import { Typography } from '../../atoms/Typography/Typography'
import { ListItem } from '../List/ListItem'
import tokens from '@/styles/tokens.json'

const { 
  semantic: { 
    color, 
    border, 
    spacing: { layout }, 
    motion,
    elevation
  }
} = tokens

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
  background-color: ${color.background.subtle};
  border-top-left-radius: ${border.radius.lg};
  border-top-right-radius: ${border.radius.lg};
  box-shadow: ${elevation.overlay};
  max-height: 90vh;
  overflow-y: auto;
  z-index: 10000;
  animation: ${slideUp} 0.3s ease-out;
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${layout.lg} ${layout.lg} ${layout.md};
  border-bottom: ${border.default};
`

const StyledHeaderContent = styled.div`
  flex: 1;
`

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${layout.sm};
  border: none;
  background: transparent;
  color: ${color.icon.subdued};
  cursor: pointer;
  border-radius: ${border.radius.sm};
  transition: ${motion.hover};
  margin-left: ${layout.sm};
  
  &:hover {
    color: ${color.icon.default};
    background-color: ${color.background.surface};
  }
  
  &:focus-visible {
    outline: ${border.focus};
    outline-offset: ${layout.xs};
  }
`

const StyledActionsList = styled.ul`
  padding: ${layout.sm} ${layout.md};
  margin: 0;
  list-style: none;
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
    
    // Focus first focusable element (button or element with role="button")
    requestAnimationFrame(() => {
      const firstFocusable = sheetRef.current?.querySelector<HTMLElement>(
        'button:not(:disabled), [role="button"][tabindex]:not([aria-disabled="true"])'
      )
      firstFocusable?.focus()
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
            <React.Fragment key={action.id}>
              {hasDestructive && index === destructiveIndex && index > 0 && (
                <Divider size="small" />
              )}
              <ListItem
                primary={action.label}
                icon={action.icon && (
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
                interactive
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                destructive={action.destructive}
                spacing="compact"
              />
            </React.Fragment>
          ))}
        </StyledActionsList>
      </StyledActionSheet>
    </>,
    document.body
  )
}
