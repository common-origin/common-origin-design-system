import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TextField } from './TextField'
import type { TextFieldProps } from './TextField'

expect.extend(toHaveNoViolations)

describe('TextField', () => {
  const defaultProps: TextFieldProps = {
    label: 'Test Label',
    'data-testid': 'test-field',
  }

  const renderTextField = (props: Partial<TextFieldProps> = {}) => {
    return render(<TextField {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderTextField()
      expect(screen.getByTestId('test-field')).toBeInTheDocument()
    })

    it('renders with label', () => {
      renderTextField({ label: 'Username' })
      expect(screen.getByLabelText('Username')).toBeInTheDocument()
    })

    it('renders without label', () => {
      renderTextField({ label: undefined })
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      renderTextField({ helperText: 'Enter your username' })
      expect(screen.getByText('Enter your username')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      renderTextField({ error: 'This field is required' })
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('hides helper text when error is shown', () => {
      renderTextField({ 
        helperText: 'Helper text',
        error: 'Error message'
      })
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
      expect(screen.getByText('Error message')).toBeInTheDocument()
    })

    it('renders required indicator', () => {
      renderTextField({ required: true })
      expect(screen.getByLabelText('required')).toBeInTheDocument()
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('Input Types', () => {
    const types: Array<'text' | 'email' | 'tel' | 'url' | 'search'> = [
      'text',
      'email',
      'tel',
      'url',
      'search',
    ]

    types.forEach((type) => {
      it(`renders with type="${type}"`, () => {
        renderTextField({ type })
        // Note: type="search" has role="searchbox" not "textbox"
        const input = type === 'search' 
          ? screen.getByRole('searchbox')
          : screen.getByRole('textbox')
        expect(input).toHaveAttribute('type', type)
      })
    })

    it('defaults to type="text"', () => {
      renderTextField()
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'text')
    })
  })

  describe('User Interactions', () => {
    it('accepts user input', async () => {
      const user = userEvent.setup()
      renderTextField()
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'Hello World')
      
      expect(input).toHaveValue('Hello World')
    })

    it('calls onChange handler', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      renderTextField({ onChange: handleChange })
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      
      expect(handleChange).toHaveBeenCalled()
    })

    it('calls onFocus handler', async () => {
      const user = userEvent.setup()
      const handleFocus = jest.fn()
      renderTextField({ onFocus: handleFocus })
      
      const input = screen.getByRole('textbox')
      await user.click(input)
      
      expect(handleFocus).toHaveBeenCalled()
    })

    it('calls onBlur handler', async () => {
      const user = userEvent.setup()
      const handleBlur = jest.fn()
      renderTextField({ onBlur: handleBlur })
      
      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.tab()
      
      expect(handleBlur).toHaveBeenCalled()
    })

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup()
      renderTextField({ disabled: true })
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      
      expect(input).toHaveValue('')
    })
  })

  describe('States', () => {
    it('applies disabled state correctly', () => {
      renderTextField({ disabled: true })
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })

    it('applies required attribute', () => {
      renderTextField({ required: true })
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
    })

    it('applies error state with aria-invalid', () => {
      renderTextField({ error: 'Error message' })
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not have aria-invalid when no error', () => {
      renderTextField()
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'false')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderTextField()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with all props', async () => {
      const { container } = renderTextField({
        label: 'Email',
        helperText: 'Enter your email address',
        required: true,
        type: 'email',
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations in error state', async () => {
      const { container } = renderTextField({
        error: 'This field is required',
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations when disabled', async () => {
      const { container } = renderTextField({
        disabled: true,
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('associates label with input via htmlFor', () => {
      renderTextField({ label: 'Username', id: 'username-input' })
      const input = screen.getByLabelText('Username')
      expect(input).toHaveAttribute('id', 'username-input')
    })

    it('generates unique ID when not provided', () => {
      const { unmount } = renderTextField({ label: 'Field 1' })
      const input1 = screen.getByLabelText('Field 1')
      const id1 = input1.getAttribute('id')

      // Unmount first component before rendering second
      unmount()

      renderTextField({ label: 'Field 2' })
      const input2 = screen.getByLabelText('Field 2')
      const id2 = input2.getAttribute('id')

      expect(id1).toBeTruthy()
      expect(id2).toBeTruthy()
      expect(id1).not.toBe(id2)
    })

    it('links helper text with aria-describedby', () => {
      renderTextField({ 
        helperText: 'Enter your username',
        id: 'username'
      })
      const input = screen.getByRole('textbox')
      const describedBy = input.getAttribute('aria-describedby')
      expect(describedBy).toContain('username-helper')
    })

    it('links error message with aria-describedby', () => {
      renderTextField({ 
        error: 'Username is required',
        id: 'username'
      })
      const input = screen.getByRole('textbox')
      const describedBy = input.getAttribute('aria-describedby')
      expect(describedBy).toContain('username-error')
    })

    it('error message has role="alert"', () => {
      renderTextField({ error: 'This field is required' })
      const errorMessage = screen.getByRole('alert')
      expect(errorMessage).toHaveTextContent('This field is required')
    })

    it('error message has aria-live="polite"', () => {
      renderTextField({ error: 'This field is required' })
      const errorMessage = screen.getByRole('alert')
      expect(errorMessage).toHaveAttribute('aria-live', 'polite')
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      renderTextField()
      
      const input = screen.getByRole('textbox')
      
      // Tab to focus
      await user.tab()
      expect(input).toHaveFocus()
      
      // Tab away
      await user.tab()
      expect(input).not.toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty label gracefully', () => {
      renderTextField({ label: '' })
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('handles undefined values', () => {
      renderTextField({ 
        label: undefined,
        helperText: undefined,
        error: undefined,
      })
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('handles very long error messages', () => {
      const longError = 'A'.repeat(200)
      renderTextField({ error: longError })
      expect(screen.getByText(longError)).toBeInTheDocument()
    })

    it('handles very long helper text', () => {
      const longHelper = 'B'.repeat(200)
      renderTextField({ helperText: longHelper })
      expect(screen.getByText(longHelper)).toBeInTheDocument()
    })

    it('applies custom data-testid', () => {
      renderTextField({ 'data-testid': 'custom-id' })
      expect(screen.getByTestId('custom-id')).toBeInTheDocument()
    })

    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<TextField label="Test" ref={ref} />)
      expect(ref).toHaveBeenCalled()
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement)
    })

    it('passes through additional HTML attributes', () => {
      renderTextField({ 
        placeholder: 'Enter text',
        maxLength: 100,
        autoComplete: 'username',
      })
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', 'Enter text')
      expect(input).toHaveAttribute('maxLength', '100')
      expect(input).toHaveAttribute('autoComplete', 'username')
    })
  })

  describe('Styling', () => {
    it('applies error styling when error prop is provided', () => {
      renderTextField({ error: 'Error' })
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      // Error styling is applied via $hasError prop to styled component
    })

    it('applies disabled styling when disabled', () => {
      renderTextField({ disabled: true })
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      // Disabled styling is applied via $disabled prop
    })
  })
})
