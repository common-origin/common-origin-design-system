import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PasswordField } from './PasswordField'
import type { PasswordFieldProps } from './PasswordField'

expect.extend(toHaveNoViolations)

describe('PasswordField', () => {
  const defaultProps: PasswordFieldProps = {
    label: 'Password',
    'data-testid': 'password-field',
  }

  const renderPasswordField = (props: Partial<PasswordFieldProps> = {}) => {
    return render(<PasswordField {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderPasswordField()
      expect(screen.getByTestId('password-field')).toBeInTheDocument()
    })

    it('renders with label', () => {
      renderPasswordField({ label: 'Enter Password' })
      expect(screen.getByLabelText('Enter Password')).toBeInTheDocument()
    })

    it('renders without label', () => {
      renderPasswordField({ label: undefined })
      // Password input doesn't have a specific accessible role, but we can find it by type
      const input = screen.getByTestId('password-field')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'password')
    })

    it('renders with helper text', () => {
      renderPasswordField({ helperText: 'Must be at least 8 characters' })
      expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      renderPasswordField({ error: 'Password is required' })
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })

    it('hides helper text when error is shown', () => {
      renderPasswordField({ 
        helperText: 'Helper text',
        error: 'Error message'
      })
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
      expect(screen.getByText('Error message')).toBeInTheDocument()
    })

    it('renders required indicator', () => {
      renderPasswordField({ required: true })
      expect(screen.getByLabelText('required')).toBeInTheDocument()
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('renders with visibility toggle by default', () => {
      renderPasswordField()
      expect(screen.getByLabelText('Show password')).toBeInTheDocument()
    })

    it('hides toggle when showToggle is false', () => {
      renderPasswordField({ showToggle: false })
      expect(screen.queryByLabelText('Show password')).not.toBeInTheDocument()
    })
  })

  describe('Password Visibility Toggle', () => {
    it('starts with password hidden (type="password")', () => {
      renderPasswordField()
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('toggles password visibility when toggle button clicked', async () => {
      const user = userEvent.setup()
      renderPasswordField()
      
      const input = screen.getByTestId('password-field')
      const toggleButton = screen.getByLabelText('Show password')
      
      // Initially password type
      expect(input).toHaveAttribute('type', 'password')
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
      
      // Click to show password
      await user.click(toggleButton)
      expect(input).toHaveAttribute('type', 'text')
      expect(screen.getByLabelText('Hide password')).toBeInTheDocument()
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
      
      // Click to hide password again
      await user.click(toggleButton)
      expect(input).toHaveAttribute('type', 'password')
      expect(screen.getByLabelText('Show password')).toBeInTheDocument()
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('displays view icon when password is hidden', () => {
      renderPasswordField()
      const toggleButton = screen.getByLabelText('Show password')
      // Icon component renders SVG
      expect(toggleButton.querySelector('svg')).toBeInTheDocument()
    })

    it('displays viewHide icon when password is visible', async () => {
      const user = userEvent.setup()
      renderPasswordField()
      
      const toggleButton = screen.getByLabelText('Show password')
      await user.click(toggleButton)
      
      const hideButton = screen.getByLabelText('Hide password')
      expect(hideButton.querySelector('svg')).toBeInTheDocument()
    })

    it('toggle button does not interfere with keyboard navigation', () => {
      renderPasswordField()
      const toggleButton = screen.getByLabelText('Show password')
      expect(toggleButton).toHaveAttribute('tabIndex', '-1')
    })
  })

  describe('User Interactions', () => {
    it('accepts user input', async () => {
      const user = userEvent.setup()
      renderPasswordField()
      
      const input = screen.getByTestId('password-field')
      await user.type(input, 'SecurePassword123')
      
      expect(input).toHaveValue('SecurePassword123')
    })

    it('calls onChange handler', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      renderPasswordField({ onChange: handleChange })
      
      const input = screen.getByTestId('password-field')
      await user.type(input, 'test')
      
      expect(handleChange).toHaveBeenCalled()
      expect(handleChange).toHaveBeenCalledTimes(4) // Once per character
    })

    it('calls onBlur handler', async () => {
      const user = userEvent.setup()
      const handleBlur = jest.fn()
      renderPasswordField({ onBlur: handleBlur })
      
      const input = screen.getByTestId('password-field')
      await user.click(input)
      await user.tab()
      
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('calls onFocus handler', async () => {
      const user = userEvent.setup()
      const handleFocus = jest.fn()
      renderPasswordField({ onFocus: handleFocus })
      
      const input = screen.getByTestId('password-field')
      await user.click(input)
      
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })
  })

  describe('States', () => {
    it('can be disabled', () => {
      renderPasswordField({ disabled: true })
      const input = screen.getByTestId('password-field')
      expect(input).toBeDisabled()
    })

    it('respects disabled toggle button', () => {
      renderPasswordField({ disabled: true })
      const toggleButton = screen.getByLabelText('Show password')
      expect(toggleButton).toBeDisabled()
    })

    it('can be required', () => {
      renderPasswordField({ required: true })
      const input = screen.getByTestId('password-field')
      expect(input).toBeRequired()
    })

    it('accepts placeholder', () => {
      renderPasswordField({ placeholder: 'Enter secure password' })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('placeholder', 'Enter secure password')
    })

    it('accepts defaultValue', () => {
      renderPasswordField({ defaultValue: 'initial' })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveValue('initial')
    })

    it('accepts value (controlled)', () => {
      renderPasswordField({ value: 'controlled', onChange: () => {} })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveValue('controlled')
    })
  })

  describe('ARIA Attributes', () => {
    it('associates label with input via htmlFor', () => {
      renderPasswordField({ id: 'password-input' })
      const label = screen.getByText('Password')
      expect(label).toHaveAttribute('for', 'password-input')
    })

    it('sets aria-invalid when error is present', () => {
      renderPasswordField({ error: 'Invalid password' })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not set aria-invalid when no error', () => {
      renderPasswordField()
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('aria-invalid', 'false')
    })

    it('associates helper text with input via aria-describedby', () => {
      renderPasswordField({ helperText: 'Helper text', id: 'password-input' })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('aria-describedby', 'password-input-helper')
    })

    it('associates error with input via aria-describedby', () => {
      renderPasswordField({ error: 'Error message', id: 'password-input' })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('aria-describedby', 'password-input-error')
    })

    it('prioritizes error over helper text in aria-describedby', () => {
      renderPasswordField({ 
        helperText: 'Helper',
        error: 'Error',
        id: 'password-input'
      })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('aria-describedby', 'password-input-error')
    })

    it('marks error with role="alert"', () => {
      renderPasswordField({ error: 'Error message' })
      const error = screen.getByRole('alert')
      expect(error).toHaveTextContent('Error message')
    })

    it('marks error with aria-live="polite"', () => {
      renderPasswordField({ error: 'Error message' })
      const error = screen.getByText('Error message')
      expect(error).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations with basic setup', async () => {
      const { container } = renderPasswordField()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with helper text', async () => {
      const { container } = renderPasswordField({ 
        helperText: 'Must be at least 8 characters' 
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with error', async () => {
      const { container } = renderPasswordField({ 
        error: 'Password is required' 
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations when required', async () => {
      const { container } = renderPasswordField({ required: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations when disabled', async () => {
      const { container } = renderPasswordField({ disabled: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with toggle visible', async () => {
      const user = userEvent.setup()
      const { container } = renderPasswordField()
      
      const toggleButton = screen.getByLabelText('Show password')
      await user.click(toggleButton)
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Custom Props', () => {
    it('accepts and applies maxLength', () => {
      renderPasswordField({ maxLength: 20 })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('maxLength', '20')
    })

    it('accepts and applies minLength', () => {
      renderPasswordField({ minLength: 8 })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('minLength', '8')
    })

    it('accepts and applies autoComplete', () => {
      renderPasswordField({ autoComplete: 'current-password' })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('autoComplete', 'current-password')
    })

    it('accepts and applies name', () => {
      renderPasswordField({ name: 'user-password' })
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('name', 'user-password')
    })

    it('forwards custom data attributes', () => {
      renderPasswordField({ 'data-custom': 'value' } as PasswordFieldProps)
      const input = screen.getByTestId('password-field')
      expect(input).toHaveAttribute('data-custom', 'value')
    })
  })
})
