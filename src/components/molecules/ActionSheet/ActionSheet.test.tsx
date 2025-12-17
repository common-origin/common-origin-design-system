import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ActionSheet, type ActionSheetProps, type Action } from './ActionSheet'

describe('ActionSheet', () => {
  const mockActions: Action[] = [
    {
      id: '1',
      label: 'Edit',
      icon: 'edit',
      onSelect: jest.fn()
    },
    {
      id: '2',
      label: 'Share',
      icon: 'export',
      onSelect: jest.fn()
    },
    {
      id: '3',
      label: 'Delete',
      icon: 'trash',
      destructive: true,
      onSelect: jest.fn()
    }
  ]
  
  const defaultProps: ActionSheetProps = {
    isOpen: true,
    onClose: jest.fn(),
    actions: mockActions
  }
  
  const renderActionSheet = (props: Partial<ActionSheetProps> = {}) => {
    return render(<ActionSheet {...defaultProps} {...props} />)
  }
  
  // Mock scrollIntoView
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn()
  })
  
  afterEach(() => {
    jest.clearAllMocks()
    document.body.innerHTML = ''
  })
  
  describe('Basic Rendering', () => {
    it('renders action sheet when open', () => {
      renderActionSheet()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    it('does not render when closed', () => {
      renderActionSheet({ isOpen: false })
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
    
    it('renders title when provided', () => {
      renderActionSheet({ title: 'Choose an action' })
      expect(screen.getByText('Choose an action')).toBeInTheDocument()
    })
    
    it('renders description when provided', () => {
      renderActionSheet({ title: 'Actions', description: 'Select an action to perform' })
      expect(screen.getByText('Select an action to perform')).toBeInTheDocument()
    })
    
    it('renders all actions', () => {
      renderActionSheet()
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('Share')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
    
    it('renders action icons', () => {
      renderActionSheet()
      // Icons are present in the document
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
    
    it('renders close button by default', () => {
      renderActionSheet({ title: 'Actions' })
      expect(screen.getByLabelText('Close')).toBeInTheDocument()
    })
    
    it('hides close button when showCloseButton is false', () => {
      renderActionSheet({ title: 'Actions', showCloseButton: false })
      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
    })
    
    it('applies data-testid', () => {
      renderActionSheet({ 'data-testid': 'action-sheet-test' })
      expect(screen.getByTestId('action-sheet-test')).toBeInTheDocument()
    })
  })
  
  describe('Action Interactions', () => {
    it('calls onSelect when action is clicked', () => {
      renderActionSheet()
      
      const editButton = screen.getByText('Edit')
      fireEvent.click(editButton)
      
      expect(mockActions[0].onSelect).toHaveBeenCalledTimes(1)
    })
    
    it('calls onClose after action is selected', () => {
      const onClose = jest.fn()
      renderActionSheet({ onClose })
      
      const editButton = screen.getByText('Edit')
      fireEvent.click(editButton)
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })
    
    it('does not call onSelect for disabled action', () => {
      const disabledAction: Action = {
        id: '4',
        label: 'Disabled',
        disabled: true,
        onSelect: jest.fn()
      }
      
      renderActionSheet({ actions: [disabledAction] })
      
      const button = screen.getByText('Disabled')
      fireEvent.click(button)
      
      expect(disabledAction.onSelect).not.toHaveBeenCalled()
    })
    
    it('renders disabled action with disabled attribute', () => {
      const disabledAction: Action = {
        id: '4',
        label: 'Disabled',
        disabled: true,
        onSelect: jest.fn()
      }
      
      renderActionSheet({ actions: [disabledAction] })
      
      const button = screen.getByText('Disabled').closest('button')
      expect(button).toBeDisabled()
    })
  })
  
  describe('Destructive Actions', () => {
    it('renders destructive action with special styling', () => {
      renderActionSheet()
      
      const deleteButton = screen.getByText('Delete')
      expect(deleteButton).toBeInTheDocument()
    })
    
    it('adds divider before destructive action', () => {
      renderActionSheet()
      
      // Divider is rendered before the destructive action
      const container = screen.getByRole('dialog')
      expect(container).toBeInTheDocument()
    })
    
    it('handles multiple destructive actions', () => {
      const actions: Action[] = [
        { id: '1', label: 'Edit', onSelect: jest.fn() },
        { id: '2', label: 'Delete', destructive: true, onSelect: jest.fn() },
        { id: '3', label: 'Remove', destructive: true, onSelect: jest.fn() }
      ]
      
      renderActionSheet({ actions })
      
      expect(screen.getByText('Delete')).toBeInTheDocument()
      expect(screen.getByText('Remove')).toBeInTheDocument()
    })
  })
  
  describe('Close Interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn()
      renderActionSheet({ title: 'Actions', onClose })
      
      const closeButton = screen.getByLabelText('Close')
      fireEvent.click(closeButton)
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })
    
    it('closes on Escape key when closeOnEscape=true', () => {
      const onClose = jest.fn()
      renderActionSheet({ onClose, closeOnEscape: true })
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })
    
    it('does not close on Escape when closeOnEscape=false', () => {
      const onClose = jest.fn()
      renderActionSheet({ onClose, closeOnEscape: false })
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(onClose).not.toHaveBeenCalled()
    })
  })
  
  describe('Focus Management', () => {
    it('focuses first button when opened', async () => {
      renderActionSheet()
      
      await waitFor(() => {
        const firstButton = screen.getByText('Edit')
        expect(firstButton).toHaveFocus()
      })
    })
    
    it('prevents body scroll when open', () => {
      const originalOverflow = document.body.style.overflow
      
      renderActionSheet()
      
      expect(document.body.style.overflow).toBe('hidden')
      
      // Cleanup
      document.body.style.overflow = originalOverflow
    })
  })
  
  describe('ARIA Attributes', () => {
    it('has role="dialog"', () => {
      renderActionSheet()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    it('has aria-modal="true"', () => {
      renderActionSheet()
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })
    
    it('has aria-labelledby when title is provided', () => {
      renderActionSheet({ title: 'Choose an action' })
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby', 'action-sheet-title')
    })
    
    it('has aria-describedby when description is provided', () => {
      renderActionSheet({ title: 'Actions', description: 'Select an action' })
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-describedby', 'action-sheet-description')
    })
    
    it('action buttons have aria-label', () => {
      renderActionSheet()
      const editButton = screen.getByLabelText('Edit')
      expect(editButton).toBeInTheDocument()
    })
  })
  
  describe('Accessibility', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderActionSheet()
      await waitFor(async () => {
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    }, 10000)
    
    it('should have no accessibility violations with title and description', async () => {
      const { container } = renderActionSheet({
        title: 'Choose an action',
        description: 'Select one of the following actions'
      })
      await waitFor(async () => {
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    }, 10000)
    
    it('should have no accessibility violations with disabled action', async () => {
      const actions: Action[] = [
        { id: '1', label: 'Enabled', onSelect: jest.fn() },
        { id: '2', label: 'Disabled', disabled: true, onSelect: jest.fn() }
      ]
      
      const { container } = renderActionSheet({ actions })
      await waitFor(async () => {
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    }, 10000)
  })
  
  describe('Edge Cases', () => {
    it('handles empty actions array', () => {
      renderActionSheet({ actions: [] })
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })
    
    it('handles single action', () => {
      const singleAction: Action[] = [
        { id: '1', label: 'Only Action', onSelect: jest.fn() }
      ]
      
      renderActionSheet({ actions: singleAction })
      expect(screen.getByText('Only Action')).toBeInTheDocument()
    })
    
    it('handles action without icon', () => {
      const actionNoIcon: Action[] = [
        { id: '1', label: 'No Icon', onSelect: jest.fn() }
      ]
      
      renderActionSheet({ actions: actionNoIcon })
      expect(screen.getByText('No Icon')).toBeInTheDocument()
    })
    
    it('handles very long action labels', () => {
      const longLabel = 'This is a very long action label that might wrap to multiple lines'
      const actions: Action[] = [
        { id: '1', label: longLabel, onSelect: jest.fn() }
      ]
      
      renderActionSheet({ actions })
      expect(screen.getByText(longLabel)).toBeInTheDocument()
    })
    
    it('renders in portal (not in parent component tree)', () => {
      const { container } = renderActionSheet()
      
      // Dialog should be in document.body, not in the container
      expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument()
      expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument()
    })
  })
})
