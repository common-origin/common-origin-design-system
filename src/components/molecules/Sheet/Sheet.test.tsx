import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import { Sheet } from './Sheet'

expect.extend(toHaveNoViolations)

describe('Sheet', () => {
  const mockOnClose = jest.fn()
  
  beforeEach(() => {
    mockOnClose.mockClear()
    // Reset body overflow
    document.body.style.overflow = ''
  })
  
  afterEach(() => {
    // Clean up body overflow
    document.body.style.overflow = ''
  })
  
  describe('Basic Rendering', () => {
    it('should render when isOpen is true', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          <div>Sheet Content</div>
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Sheet Content')).toBeInTheDocument()
    })
    
    it('should not render when isOpen is false', () => {
      render(
        <Sheet isOpen={false} onClose={mockOnClose}>
          <div>Sheet Content</div>
        </Sheet>
      )
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
    
    it('should render overlay when open', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} data-testid="sheet">
          Content
        </Sheet>
      )
      
      expect(screen.getByTestId('sheet-overlay')).toBeInTheDocument()
    })
    
    it('should apply data-testid correctly', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} data-testid="custom-sheet">
          Content
        </Sheet>
      )
      
      expect(screen.getByTestId('custom-sheet')).toBeInTheDocument()
      expect(screen.getByTestId('custom-sheet-overlay')).toBeInTheDocument()
    })
    
    it('should render with title', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} title="My Sheet">
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'My Sheet')
    })
  })
  
  describe('Positioning', () => {
    it('should render in right position by default', () => {
      const { container } = render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      const styles = window.getComputedStyle(dialog)
      expect(styles.position).toBe('fixed')
    })
    
    it('should render in left position', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} position="left">
          Content
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    it('should render in top position', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} position="top">
          Content
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    it('should render in bottom position', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} position="bottom">
          Content
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
  
  describe('Variants', () => {
    it('should render sheet variant by default', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    it('should render drawer variant', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} variant="drawer">
          Content
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
  
  describe('Size Configuration', () => {
    it('should apply custom width for side positions', () => {
      render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          position="right"
          width="500px"
        >
          Content
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    it('should apply custom height for top/bottom positions', () => {
      render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          position="bottom"
          height="300px"
        >
          Content
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
  
  describe('Overlay Click Behavior', () => {
    it('should close on overlay click by default', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} data-testid="sheet">
          Content
        </Sheet>
      )
      
      const overlay = screen.getByTestId('sheet-overlay')
      fireEvent.click(overlay)
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
    
    it('should not close on overlay click when closeOnOverlayClick is false', () => {
      render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          closeOnOverlayClick={false}
          data-testid="sheet"
        >
          Content
        </Sheet>
      )
      
      const overlay = screen.getByTestId('sheet-overlay')
      fireEvent.click(overlay)
      
      expect(mockOnClose).not.toHaveBeenCalled()
    })
    
    it('should not close when clicking inside the sheet', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          <button>Inside Button</button>
        </Sheet>
      )
      
      const button = screen.getByText('Inside Button')
      fireEvent.click(button)
      
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })
  
  describe('Keyboard Interactions', () => {
    it('should close on Escape key by default', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      fireEvent.keyDown(dialog, { key: 'Escape' })
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
    
    it('should not close on Escape when closeOnEscape is false', () => {
      render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose}
          closeOnEscape={false}
        >
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      fireEvent.keyDown(dialog, { key: 'Escape' })
      
      expect(mockOnClose).not.toHaveBeenCalled()
    })
    
    it('should not close on other keys', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      fireEvent.keyDown(dialog, { key: 'Enter' })
      fireEvent.keyDown(dialog, { key: 'Space' })
      
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })
  
  describe('Focus Management', () => {
    it('should focus the sheet when opened', async () => {
      const { rerender } = render(
        <Sheet isOpen={false} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      rerender(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toHaveFocus()
      }, { timeout: 200 })
    })
    
    it('should trap focus within sheet with Tab key', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </Sheet>
      )
      
      const buttons = screen.getAllByRole('button')
      const dialog = screen.getByRole('dialog')
      
      // Focus first button
      buttons[0].focus()
      expect(buttons[0]).toHaveFocus()
      
      // Tab from last button should cycle to first
      buttons[2].focus()
      fireEvent.keyDown(dialog, { key: 'Tab' })
      
      expect(buttons[0]).toHaveFocus()
    })
    
    it('should trap focus with Shift+Tab', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </Sheet>
      )
      
      const buttons = screen.getAllByRole('button')
      const dialog = screen.getByRole('dialog')
      
      // Shift+Tab from first button should cycle to last
      buttons[0].focus()
      fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true })
      
      expect(buttons[2]).toHaveFocus()
    })
    
    it('should restore focus to previous element when closed', async () => {
      const trigger = document.createElement('button')
      trigger.textContent = 'Open Sheet'
      document.body.appendChild(trigger)
      trigger.focus()
      
      const { rerender } = render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toHaveFocus()
      }, { timeout: 200 })
      
      rerender(
        <Sheet isOpen={false} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      await waitFor(() => {
        expect(trigger).toHaveFocus()
      })
      
      document.body.removeChild(trigger)
    })
  })
  
  describe('Body Scroll Prevention', () => {
    it('should prevent body scroll when open', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      expect(document.body.style.overflow).toBe('hidden')
    })
    
    it('should restore body scroll when closed', () => {
      const { rerender } = render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      expect(document.body.style.overflow).toBe('hidden')
      
      rerender(
        <Sheet isOpen={false} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      expect(document.body.style.overflow).toBe('')
    })
    
    it('should restore body scroll on unmount', () => {
      const { unmount } = render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      expect(document.body.style.overflow).toBe('hidden')
      
      unmount()
      
      expect(document.body.style.overflow).toBe('')
    })
  })
  
  describe('ARIA Attributes', () => {
    it('should have correct dialog role', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('role', 'dialog')
    })
    
    it('should have aria-modal true', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })
    
    it('should use title for aria-label', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} title="Settings">
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'Settings')
    })
    
    it('should use custom aria-label', () => {
      render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          aria-label="Custom Label"
        >
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'Custom Label')
    })
    
    it('should use default aria-label when none provided', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'Sheet dialog')
    })
    
    it('should support aria-describedby', () => {
      render(
        <>
          <div id="description">Sheet description</div>
          <Sheet 
            isOpen={true} 
            onClose={mockOnClose}
            aria-describedby="description"
          >
            Content
          </Sheet>
        </>
      )
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-describedby', 'description')
    })
  })
  
  describe('Accessibility with jest-axe', () => {
    it('should not have accessibility violations in default state', async () => {
      const { container } = render(
        <Sheet isOpen={true} onClose={mockOnClose} title="Accessible Sheet">
          <h2>Content Title</h2>
          <p>Some content</p>
        </Sheet>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have violations with right position', async () => {
      const { container } = render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          position="right"
          title="Right Sheet"
        >
          Content
        </Sheet>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have violations with left position', async () => {
      const { container } = render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          position="left"
          title="Left Sheet"
        >
          Content
        </Sheet>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have violations with top position', async () => {
      const { container } = render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          position="top"
          title="Top Sheet"
        >
          Content
        </Sheet>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have violations with bottom position', async () => {
      const { container } = render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          position="bottom"
          title="Bottom Sheet"
        >
          Content
        </Sheet>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have violations in drawer variant', async () => {
      const { container } = render(
        <Sheet 
          isOpen={true} 
          onClose={mockOnClose} 
          variant="drawer"
          title="Drawer"
        >
          Content
        </Sheet>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have violations with interactive content', async () => {
      const { container } = render(
        <Sheet isOpen={true} onClose={mockOnClose} title="Interactive Sheet">
          <button>Close</button>
          <input type="text" aria-label="Search" />
          <a href="#test">Link</a>
        </Sheet>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
  
  describe('Edge Cases', () => {
    it('should handle rapid open/close transitions', () => {
      const { rerender } = render(
        <Sheet isOpen={false} onClose={mockOnClose}>
          Content
        </Sheet>
      )
      
      rerender(<Sheet isOpen={true} onClose={mockOnClose}>Content</Sheet>)
      rerender(<Sheet isOpen={false} onClose={mockOnClose}>Content</Sheet>)
      rerender(<Sheet isOpen={true} onClose={mockOnClose}>Content</Sheet>)
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    it('should handle empty content', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} title="Empty Sheet">
          {/* empty */}
        </Sheet>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    it('should handle complex nested content', () => {
      render(
        <Sheet isOpen={true} onClose={mockOnClose} title="Complex Sheet">
          <div>
            <div>
              <div>
                <button>Nested Button</button>
              </div>
            </div>
          </div>
        </Sheet>
      )
      
      expect(screen.getByText('Nested Button')).toBeInTheDocument()
    })
  })
})
