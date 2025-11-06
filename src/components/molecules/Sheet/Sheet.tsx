import { useEffect, useRef, ReactNode, KeyboardEvent } from 'react'
import styled, { keyframes, css } from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

/**
 * Props for the Sheet component
 */
export interface SheetProps {
  /**
   * Whether the sheet is open
   */
  isOpen: boolean
  
  /**
   * Callback fired when the sheet should close
   */
  onClose: () => void
  
  /**
   * Position of the sheet
   * @default 'right'
   */
  position?: 'top' | 'right' | 'bottom' | 'left'
  
  /**
   * Variant of the sheet
   * - 'sheet': Full height/width edge-to-edge
   * - 'drawer': Floating with rounded corners and margin
   * @default 'sheet'
   */
  variant?: 'sheet' | 'drawer'
  
  /**
   * Width of the sheet (for left/right positions)
   * @default '400px'
   */
  width?: string
  
  /**
   * Height of the sheet (for top/bottom positions)
   * @default '400px'
   */
  height?: string
  
  /**
   * Content to display in the sheet
   */
  children?: ReactNode
  
  /**
   * Whether clicking the overlay should close the sheet
   * @default true
   */
  closeOnOverlayClick?: boolean
  
  /**
   * Whether pressing Escape should close the sheet
   * @default true
   */
  closeOnEscape?: boolean
  
  /**
   * Optional title for the sheet (improves accessibility)
   */
  title?: string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
  
  /**
   * Accessible label for the sheet
   */
  'aria-label'?: string
  
  /**
   * ID of element describing the sheet
   */
  'aria-describedby'?: string
}

// Fade in animation for overlay
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

// Slide animations for each position
const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideInTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`

const slideInBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const StyledOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  ${css`animation: ${fadeIn} 200ms ease-in-out;`}
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`

const StyledSheet = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $position: 'top' | 'right' | 'bottom' | 'left'
  $variant: 'sheet' | 'drawer'
  $width: string
  $height: string
  $isOpen: boolean
}>`
  position: fixed;
  background-color: ${semantic.color.background.default};
  box-shadow: ${base.shadow[4]};
  z-index: 1001;
  overflow-y: auto;
  
  /* Position-specific styles */
  ${({ $position, $variant, $width, $height }) => {
    const isDrawer = $variant === 'drawer'
    const margin = isDrawer ? base.spacing[4] : '0'
    const borderRadius = isDrawer ? base.border.radius[3] : '0'
    
    switch ($position) {
      case 'right':
        return css`
          top: ${margin};
          right: ${margin};
          bottom: ${margin};
          width: ${$width};
          max-width: calc(100vw - ${isDrawer ? `${base.spacing[4]} * 2` : '0px'});
          border-radius: ${borderRadius} 0 0 ${borderRadius};
          animation: ${slideInRight} 200ms ease-in-out;
        `
      case 'left':
        return css`
          top: ${margin};
          left: ${margin};
          bottom: ${margin};
          width: ${$width};
          max-width: calc(100vw - ${isDrawer ? `${base.spacing[4]} * 2` : '0px'});
          border-radius: 0 ${borderRadius} ${borderRadius} 0;
          animation: ${slideInLeft} 200ms ease-in-out;
        `
      case 'top':
        return css`
          top: ${margin};
          left: ${margin};
          right: ${margin};
          height: ${$height};
          max-height: calc(100vh - ${isDrawer ? `${base.spacing[4]} * 2` : '0px'});
          border-radius: 0 0 ${borderRadius} ${borderRadius};
          animation: ${slideInTop} 200ms ease-in-out;
        `
      case 'bottom':
        return css`
          bottom: ${margin};
          left: ${margin};
          right: ${margin};
          height: ${$height};
          max-height: calc(100vh - ${isDrawer ? `${base.spacing[4]} * 2` : '0px'});
          border-radius: ${borderRadius} ${borderRadius} 0 0;
          animation: ${slideInBottom} 200ms ease-in-out;
        `
    }
  }}
  
  /* Focus trap styling */
  &:focus {
    outline: none;
  }
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: ${base.spacing[2]};
  }
  
  &::-webkit-scrollbar-track {
    background: ${semantic.color.background.subtle};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${semantic.color.border.default};
    border-radius: ${base.border.radius.circle};
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${semantic.color.border.strong};
  }
`

const StyledSheetContent = styled.div`
  padding: ${base.spacing[6]};
  min-height: 100%;
`

/**
 * Sheet component for side panels and drawers
 * 
 * Provides a sliding panel that appears from any edge of the screen.
 * Can be used for navigation menus, filters, forms, or additional content.
 * 
 * @example
 * ```tsx
 * // Right-positioned sheet (default)
 * <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <h2>Sheet Content</h2>
 *   <p>Your content here</p>
 * </Sheet>
 * 
 * // Drawer variant from bottom
 * <Sheet 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)}
 *   position="bottom"
 *   variant="drawer"
 *   height="60vh"
 * >
 *   <h2>Mobile Menu</h2>
 * </Sheet>
 * ```
 */
export const Sheet = ({
  isOpen,
  onClose,
  position = 'right',
  variant = 'sheet',
  width = '400px',
  height = '400px',
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  title,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: SheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  
  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement
      
      // Focus sheet
      setTimeout(() => {
        sheetRef.current?.focus()
      }, 100) // Small delay to allow animation to start
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Restore previous focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
      
      // Restore body scroll
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // Keyboard handling
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (closeOnEscape && event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
    
    // Focus trap
    if (event.key === 'Tab') {
      const focusableElements = sheetRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (!focusableElements || focusableElements.length === 0) return
      
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
      
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }
  
  // Overlay click handling
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }
  
  if (!isOpen) return null
  
  return (
    <>
      <StyledOverlay
        $isOpen={isOpen}
        onClick={handleOverlayClick}
        data-testid={dataTestId ? `${dataTestId}-overlay` : 'sheet-overlay'}
      />
      
      <StyledSheet
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title || 'Sheet dialog'}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        $position={position}
        $variant={variant}
        $width={width}
        $height={height}
        $isOpen={isOpen}
        onKeyDown={handleKeyDown}
        data-testid={dataTestId}
      >
        <StyledSheetContent>
          {children}
        </StyledSheetContent>
      </StyledSheet>
    </>
  )
}

Sheet.displayName = 'Sheet'
