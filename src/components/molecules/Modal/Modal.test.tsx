import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Modal, type ModalProps, type ModalAction } from './Modal'

expect.extend(toHaveNoViolations)

// createPortal renders into document.body by default which works fine with RTL
describe('Modal', () => {
  const mockOnClose = jest.fn()
  const mockPrimaryAction = jest.fn()
  const mockSecondaryAction = jest.fn()

  const defaultActions: ModalAction[] = [
    { label: 'Cancel', onClick: mockSecondaryAction, variant: 'secondary' },
    { label: 'Confirm', onClick: mockPrimaryAction, variant: 'primary' },
  ]

  const defaultProps: ModalProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Test Modal',
    children: <p>Modal body content</p>,
  }

  const renderModal = (props: Partial<ModalProps> = {}) => {
    return render(<Modal {...defaultProps} {...props} />)
  }

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
    document.body.style.overflow = ''
  })

  // -------------------------------------------------------------------------
  // Basic Rendering
  // -------------------------------------------------------------------------
  describe('Basic Rendering', () => {
    it('renders the modal when isOpen is true', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
      renderModal({ isOpen: false })
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('renders the title', () => {
      renderModal()
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
    })

    it('renders children content', () => {
      renderModal()
      expect(screen.getByText('Modal body content')).toBeInTheDocument()
    })

    it('renders the close button', () => {
      renderModal({ 'data-testid': 'my-modal' })
      expect(screen.getByTestId('my-modal-close')).toBeInTheDocument()
    })

    it('renders without actions by default', () => {
      renderModal()
      expect(screen.queryByTestId('modal-footer')).not.toBeInTheDocument()
    })
  })

  // -------------------------------------------------------------------------
  // Actions / Footer
  // -------------------------------------------------------------------------
  describe('Actions', () => {
    it('renders footer when actions are provided', () => {
      renderModal({ actions: defaultActions })
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('calls the correct callback when an action is clicked', () => {
      renderModal({ actions: defaultActions })
      fireEvent.click(screen.getByText('Confirm'))
      expect(mockPrimaryAction).toHaveBeenCalledTimes(1)
    })

    it('renders disabled actions', () => {
      renderModal({
        actions: [{ label: 'Disabled', onClick: jest.fn(), disabled: true }],
      })
      expect(screen.getByText('Disabled')).toBeDisabled()
    })

    it('does not render footer when actions array is empty', () => {
      renderModal({ actions: [] })
      expect(screen.queryByTestId('modal-footer')).not.toBeInTheDocument()
    })
  })

  // -------------------------------------------------------------------------
  // Close behaviour
  // -------------------------------------------------------------------------
  describe('Close behaviour', () => {
    it('calls onClose when the close button is clicked', () => {
      renderModal({ 'data-testid': 'modal' })
      fireEvent.click(screen.getByTestId('modal-close'))
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when overlay is clicked', () => {
      renderModal({ 'data-testid': 'modal' })
      fireEvent.click(screen.getByTestId('modal-overlay'))
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('does not call onClose on overlay click when closeOnOverlayClick is false', () => {
      renderModal({ closeOnOverlayClick: false, 'data-testid': 'modal' })
      fireEvent.click(screen.getByTestId('modal-overlay'))
      expect(mockOnClose).not.toHaveBeenCalled()
    })

    it('calls onClose on Escape key', () => {
      renderModal()
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('does not call onClose on Escape when closeOnEscape is false', () => {
      renderModal({ closeOnEscape: false })
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  // -------------------------------------------------------------------------
  // Size variants
  // -------------------------------------------------------------------------
  describe('Sizes', () => {
    it('applies data-testid correctly for each size', () => {
      const { rerender } = render(
        <Modal {...defaultProps} size="small" data-testid="modal" />,
      )
      expect(screen.getByTestId('modal')).toBeInTheDocument()

      rerender(<Modal {...defaultProps} size="medium" data-testid="modal" />)
      expect(screen.getByTestId('modal')).toBeInTheDocument()

      rerender(<Modal {...defaultProps} size="large" data-testid="modal" />)
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
  })

  // -------------------------------------------------------------------------
  // Accessibility
  // -------------------------------------------------------------------------
  describe('Accessibility', () => {
    it('sets role="dialog" and aria-modal="true"', () => {
      renderModal()
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('has aria-label defaulting to the title', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Test Modal')
    })

    it('accepts a custom aria-label', () => {
      renderModal({ 'aria-label': 'Custom label' })
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Custom label')
    })

    it('has aria-labelledby pointing to the title element', () => {
      renderModal({ 'data-testid': 'a11y-modal' })
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby', 'a11y-modal-title')
    })

    it('accepts aria-describedby', () => {
      renderModal({ 'aria-describedby': 'desc-id' })
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby', 'desc-id')
    })

    it('locks body scroll when open', () => {
      renderModal()
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when closed', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={true} />)
      expect(document.body.style.overflow).toBe('hidden')

      rerender(<Modal {...defaultProps} isOpen={false} />)
      expect(document.body.style.overflow).toBe('')
    })

    it('should have no axe violations', async () => {
      const { container } = renderModal({ actions: defaultActions })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  // -------------------------------------------------------------------------
  // data-testid propagation
  // -------------------------------------------------------------------------
  describe('data-testid', () => {
    it('propagates data-testid to sub-elements', () => {
      renderModal({ 'data-testid': 'dt', actions: defaultActions })
      expect(screen.getByTestId('dt')).toBeInTheDocument()
      expect(screen.getByTestId('dt-overlay')).toBeInTheDocument()
      expect(screen.getByTestId('dt-close')).toBeInTheDocument()
      expect(screen.getByTestId('dt-body')).toBeInTheDocument()
      expect(screen.getByTestId('dt-footer')).toBeInTheDocument()
      expect(screen.getByTestId('dt-action-0')).toBeInTheDocument()
      expect(screen.getByTestId('dt-action-1')).toBeInTheDocument()
    })
  })
})
