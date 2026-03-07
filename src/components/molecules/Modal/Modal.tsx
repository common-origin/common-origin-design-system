import { useEffect, useRef, type ReactNode, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes, css } from 'styled-components'
import { IconButton } from '../../atoms/IconButton'
import { Button } from '../../atoms/Button'
import { Typography } from '../../atoms/Typography'
import { Stack } from '../../atoms/Stack'
import { Divider } from '../../atoms/Divider'
import { type IconName } from '../../../types/icons'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens
const { spacing: { layout }, color, border, elevation, motion } = semantic

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ModalSize = 'small' | 'medium' | 'large'

export interface ModalAction {
  /** Button label text */
  label: string
  /** Callback when the action is clicked */
  onClick: () => void
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'naked' | 'emphasis' | 'danger'
  /** Optional leading icon */
  icon?: IconName
  /** Whether the button is disabled */
  disabled?: boolean
}

export interface ModalProps {
  /** Whether the modal is visible */
  isOpen: boolean

  /** Callback fired when the modal should close (close button, overlay, Escape) */
  onClose: () => void

  /** Title displayed in the modal header */
  title: string

  /** Body content of the modal */
  children: ReactNode

  /**
   * Width preset. All sizes auto-switch to fullscreen below the `md` breakpoint (768 px).
   * - small  → 400 px
   * - medium → 560 px
   * - large  → 720 px
   * @default 'medium'
   */
  size?: ModalSize

  /** Structured action buttons rendered in the footer */
  actions?: ModalAction[]

  /**
   * Close when the backdrop overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: boolean

  /**
   * Close when the Escape key is pressed
   * @default true
   */
  closeOnEscape?: boolean

  /** Test identifier for automated testing */
  'data-testid'?: string

  /** Accessible label – falls back to `title` */
  'aria-label'?: string

  /** ID of an element that describes the modal */
  'aria-describedby'?: string
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const sizeToWidth: Record<ModalSize, string> = {
  small: '400px',
  medium: '560px',
  large: '720px',
}

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  ${css`animation: ${fadeIn} 200ms ease-out;`}
`

const StyledDialog = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $width: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  z-index: 10000;

  width: ${({ $width }) => $width};
  max-width: calc(100vw - ${layout.lg} * 2);
  max-height: calc(100vh - ${layout.lg} * 2);

  display: flex;
  flex-direction: column;

  background-color: ${color.background.subtle};
  border-radius: ${border.radius.xl};
  box-shadow: ${elevation.overlay};
  overflow: hidden;

  ${css`animation: ${scaleIn} 200ms ease-out;`}

  /* Auto-fullscreen below md breakpoint (768px) */
  @media (max-width: ${base.breakpoint.md}) {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    top: 0;
    left: 0;
    transform: none;
    animation: ${fadeIn} 200ms ease-out;
  }

  &:focus {
    outline: none;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${layout.lg} ${layout.lg} 0;
  flex-shrink: 0;
`

const StyledBody = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: ${layout.md} ${layout.lg};

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: ${base.spacing[2]};
  }
  &::-webkit-scrollbar-track {
    background: ${color.background.surface};
  }
  &::-webkit-scrollbar-thumb {
    background: ${color.border.default};
    border-radius: ${border.radius.circle};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${color.border.strong};
  }
`

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${layout.sm};
  padding: 0 ${layout.lg} ${layout.lg};
  flex-shrink: 0;
`

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Modal component
 *
 * A centred dialog overlay with a title, close button (IconButton), scrollable
 * body content, and an optional footer with structured action buttons.
 *
 * - Renders via `createPortal` to avoid z-index / overflow issues.
 * - Auto-fullscreen on viewports narrower than 768 px.
 * - Focus trap, Escape-to-close, overlay-click-to-close.
 * - Locks body scroll while open.
 *
 * Composes: IconButton, Button, Typography, Stack, Divider
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  actions,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // -----------------------------------------------------------------------
  // Focus & scroll-lock management
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      // Short delay so the animation can start before we shift focus
      const timer = setTimeout(() => dialogRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(timer)
      }
    } else {
      previousFocusRef.current?.focus()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // -----------------------------------------------------------------------
  // Keyboard handling (Escape + focus trap)
  // -----------------------------------------------------------------------
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (closeOnEscape && event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }

    if (event.key === 'Tab') {
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusableElements || focusableElements.length === 0) return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  // -----------------------------------------------------------------------
  // Overlay click
  // -----------------------------------------------------------------------
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  if (!isOpen) return null

  const titleId = dataTestId ? `${dataTestId}-title` : 'modal-title'
  const width = sizeToWidth[size]

  const modal = (
    <>
      <StyledOverlay
        onClick={handleOverlayClick}
        data-testid={dataTestId ? `${dataTestId}-overlay` : 'modal-overlay'}
      />

      <StyledDialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        aria-labelledby={titleId}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        $width={width}
        onKeyDown={handleKeyDown}
        data-testid={dataTestId}
      >
        {/* ---- Header ---- */}
        <StyledHeader>
          <span id={titleId}>
            <Typography variant="h3">
              {title}
            </Typography>
          </span>
          <IconButton
            variant="naked"
            iconName="close"
            aria-label="Close modal"
            onClick={onClose}
            size="medium"
            data-testid={dataTestId ? `${dataTestId}-close` : 'modal-close'}
          />
        </StyledHeader>

        <Divider size="small" />

        {/* ---- Body ---- */}
        <StyledBody data-testid={dataTestId ? `${dataTestId}-body` : 'modal-body'}>
          {children}
        </StyledBody>

        {/* ---- Footer ---- */}
        {actions && actions.length > 0 && (
          <>
            <Divider size="small" />
            <StyledFooter data-testid={dataTestId ? `${dataTestId}-footer` : 'modal-footer'}>
              {actions.map((action, index) => (
                <Button
                  key={`${action.label}-${index}`}
                  onClick={action.onClick}
                  variant={action.variant || 'secondary'}
                  iconName={action.icon}
                  disabled={action.disabled}
                  size="medium"
                  data-testid={
                    dataTestId ? `${dataTestId}-action-${index}` : `modal-action-${index}`
                  }
                >
                  {action.label}
                </Button>
              ))}
            </StyledFooter>
          </>
        )}
      </StyledDialog>
    </>
  )

  return createPortal(modal, document.body)
}

Modal.displayName = 'Modal'
