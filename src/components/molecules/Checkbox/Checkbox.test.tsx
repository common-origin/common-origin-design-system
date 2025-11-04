import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Checkbox } from './Checkbox'

expect.extend(toHaveNoViolations)

describe('Checkbox', () => {
  describe('Basic Rendering', () => {
    it('renders with a label', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Checkbox label="Subscribe" helperText="Get weekly updates" />)
      expect(screen.getByText('Get weekly updates')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(<Checkbox label="Agree" error="You must agree to continue" />)
      expect(screen.getByText('You must agree to continue')).toBeInTheDocument()
    })

    it('renders error message instead of helper text when both provided', () => {
      render(
        <Checkbox
          label="Agree"
          helperText="This is helper text"
          error="This is an error"
        />
      )
      expect(screen.getByText('This is an error')).toBeInTheDocument()
      expect(screen.queryByText('This is helper text')).not.toBeInTheDocument()
    })

    it('applies custom id when provided', () => {
      render(<Checkbox label="Custom" id="custom-checkbox" />)
      const checkbox = screen.getByLabelText('Custom')
      expect(checkbox).toHaveAttribute('id', 'custom-checkbox')
    })

    it('generates unique id when not provided', () => {
      render(<Checkbox label="Auto ID" />)
      const checkbox = screen.getByLabelText('Auto ID')
      expect(checkbox).toHaveAttribute('id')
      expect(checkbox.id).toBeTruthy()
    })
  })

  describe('Checked State', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox label="Unchecked" />)
      const checkbox = screen.getByLabelText('Unchecked')
      expect(checkbox).not.toBeChecked()
    })

    it('renders checked when checked prop is true', () => {
      render(<Checkbox label="Checked" checked />)
      const checkbox = screen.getByLabelText('Checked')
      expect(checkbox).toBeChecked()
    })

    it('supports controlled component pattern', () => {
      const { rerender } = render(<Checkbox label="Controlled" checked={false} />)
      const checkbox = screen.getByLabelText('Controlled')
      expect(checkbox).not.toBeChecked()

      rerender(<Checkbox label="Controlled" checked={true} />)
      expect(checkbox).toBeChecked()
    })
  })

  describe('Indeterminate State', () => {
    it('sets indeterminate property when indeterminate prop is true', () => {
      render(<Checkbox label="Indeterminate" indeterminate />)
      const checkbox = screen.getByLabelText('Indeterminate') as HTMLInputElement
      expect(checkbox.indeterminate).toBe(true)
    })

    it('removes indeterminate when prop is false', () => {
      const { rerender } = render(<Checkbox label="Toggle" indeterminate />)
      const checkbox = screen.getByLabelText('Toggle') as HTMLInputElement
      expect(checkbox.indeterminate).toBe(true)

      rerender(<Checkbox label="Toggle" indeterminate={false} />)
      expect(checkbox.indeterminate).toBe(false)
    })

    it('can be both checked and indeterminate', () => {
      render(<Checkbox label="Both" checked indeterminate />)
      const checkbox = screen.getByLabelText('Both') as HTMLInputElement
      expect(checkbox.checked).toBe(true)
      expect(checkbox.indeterminate).toBe(true)
    })
  })

  describe('Label Positioning', () => {
    it('renders label to the right by default', () => {
      const { container } = render(<Checkbox label="Right" />)
      const labelContainer = container.querySelector('label')
      expect(labelContainer).toHaveStyle({ 'flex-direction': 'row' })
    })

    it('renders label to the left when labelPosition is left', () => {
      const { container } = render(<Checkbox label="Left" labelPosition="left" />)
      const labelContainer = container.querySelector('label')
      expect(labelContainer).toHaveStyle({ 'flex-direction': 'row-reverse' })
    })
  })

  describe('User Interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      render(<Checkbox label="Click me" onChange={handleChange} />)

      const label = screen.getByText('Click me')
      await user.click(label)

      expect(handleChange).toHaveBeenCalledTimes(1)
      // Check that the event was called
      const event = handleChange.mock.calls[0][0]
      expect(event.target.type).toBe('checkbox')
    })

    it('toggles between checked and unchecked', async () => {
      const user = userEvent.setup()
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false)
        return (
          <Checkbox
            label="Toggle"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        )
      }
      render(<TestComponent />)

      const checkbox = screen.getByLabelText('Toggle') as HTMLInputElement
      expect(checkbox.checked).toBe(false)

      const label = screen.getByText('Toggle')
      await user.click(label)
      expect(checkbox.checked).toBe(true)

      await user.click(label)
      expect(checkbox.checked).toBe(false)
    })

    it('responds to Space key press', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      render(<Checkbox label="Keyboard" onChange={handleChange} />)

      const checkbox = screen.getByLabelText('Keyboard')
      checkbox.focus()
      await user.keyboard(' ')

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      render(<Checkbox label="Disabled" disabled onChange={handleChange} />)

      const label = screen.getByText('Disabled')
      await user.click(label)

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(<Checkbox label="Disabled" disabled />)
      const checkbox = screen.getByLabelText('Disabled')
      expect(checkbox).toBeDisabled()
    })

    it('applies disabled cursor style', () => {
      const { container } = render(<Checkbox label="Disabled" disabled />)
      const labelContainer = container.querySelector('label')
      expect(labelContainer).toHaveStyle({ cursor: 'not-allowed' })
    })

    it('cannot be focused when disabled', () => {
      render(<Checkbox label="Disabled" disabled />)
      const checkbox = screen.getByLabelText('Disabled')
      checkbox.focus()
      expect(checkbox).not.toHaveFocus()
    })
  })

  describe('Error State', () => {
    it('sets aria-invalid when error is provided', () => {
      render(<Checkbox label="Error" error="This is required" />)
      const checkbox = screen.getByLabelText('Error')
      expect(checkbox).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not set aria-invalid when no error', () => {
      render(<Checkbox label="Valid" />)
      const checkbox = screen.getByLabelText('Valid')
      expect(checkbox).not.toHaveAttribute('aria-invalid')
    })

    it('displays error with role alert', () => {
      render(<Checkbox label="Error" error="Field is required" />)
      const error = screen.getByRole('alert')
      expect(error).toHaveTextContent('Field is required')
    })

    it('displays error with aria-live polite', () => {
      render(<Checkbox label="Error" error="Field is required" />)
      const error = screen.getByText('Field is required')
      expect(error).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = render(<Checkbox label="Default" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations when checked', async () => {
      const { container } = render(<Checkbox label="Checked" checked />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations when indeterminate', async () => {
      const { container } = render(<Checkbox label="Indeterminate" indeterminate />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with helper text', async () => {
      const { container } = render(
        <Checkbox label="With helper" helperText="This is helper text" />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with error', async () => {
      const { container } = render(<Checkbox label="Error" error="This field is required" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Checkbox label="Disabled" disabled />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with left label', async () => {
      const { container } = render(<Checkbox label="Left label" labelPosition="left" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('associates helper text with checkbox via aria-describedby', () => {
      render(<Checkbox label="With helper" helperText="Helper text" />)
      const checkbox = screen.getByLabelText('With helper')
      const helperText = screen.getByText('Helper text')
      
      expect(checkbox).toHaveAttribute('aria-describedby')
      expect(checkbox.getAttribute('aria-describedby')).toContain(helperText.id)
    })

    it('associates error with checkbox via aria-describedby', () => {
      render(<Checkbox label="Error" error="Error message" />)
      const checkbox = screen.getByLabelText('Error')
      const error = screen.getByText('Error message')
      
      expect(checkbox).toHaveAttribute('aria-describedby')
      expect(checkbox.getAttribute('aria-describedby')).toContain(error.id)
    })

    it('supports custom aria-describedby', () => {
      render(
        <>
          <div id="custom-description">Custom description</div>
          <Checkbox label="Custom" aria-describedby="custom-description" />
        </>
      )
      const checkbox = screen.getByLabelText('Custom')
      expect(checkbox.getAttribute('aria-describedby')).toContain('custom-description')
    })

    it('combines multiple aria-describedby values', () => {
      render(
        <>
          <div id="custom-description">Custom description</div>
          <Checkbox
            label="Multiple"
            aria-describedby="custom-description"
            helperText="Helper"
            error="Error"
          />
        </>
      )
      const checkbox = screen.getByLabelText('Multiple')
      const describedBy = checkbox.getAttribute('aria-describedby')
      
      expect(describedBy).toContain('custom-description')
      expect(describedBy).toContain(screen.getByText('Error').id)
    })
  })

  describe('Required Attribute', () => {
    it('applies required attribute when passed', () => {
      render(<Checkbox label="Required" required />)
      const checkbox = screen.getByLabelText('Required')
      expect(checkbox).toBeRequired()
    })

    it('does not apply required by default', () => {
      render(<Checkbox label="Optional" />)
      const checkbox = screen.getByLabelText('Optional')
      expect(checkbox).not.toBeRequired()
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Checkbox label="Ref test" ref={ref} />)
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
      expect(ref.current?.type).toBe('checkbox')
    })

    it('allows programmatic focus via ref', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Checkbox label="Focus test" ref={ref} />)
      
      ref.current?.focus()
      expect(ref.current).toHaveFocus()
    })

    it('allows checking indeterminate state via ref', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Checkbox label="Indeterminate" indeterminate ref={ref} />)
      
      expect(ref.current?.indeterminate).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty label gracefully', () => {
      render(<Checkbox label="" />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('handles very long label text', () => {
      const longLabel = 'This is a very long label that might wrap to multiple lines and we need to ensure it still works correctly with the checkbox component'
      render(<Checkbox label={longLabel} />)
      expect(screen.getByLabelText(longLabel)).toBeInTheDocument()
    })

    it('handles special characters in label', () => {
      const specialLabel = "Label with <special> & \"characters\" & 'quotes'"
      render(<Checkbox label={specialLabel} />)
      expect(screen.getByLabelText(specialLabel)).toBeInTheDocument()
    })

    it('handles rapid state changes', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      render(<Checkbox label="Rapid" onChange={handleChange} />)

      const label = screen.getByText('Rapid')
      await user.tripleClick(label)

      expect(handleChange).toHaveBeenCalled()
    })

    it('maintains state when label changes', () => {
      const { rerender } = render(<Checkbox label="Original" checked />)
      const checkbox = screen.getByLabelText('Original')
      expect(checkbox).toBeChecked()

      rerender(<Checkbox label="Updated" checked />)
      const updatedCheckbox = screen.getByLabelText('Updated')
      expect(updatedCheckbox).toBeChecked()
    })
  })

  describe('HTML Attributes', () => {
    it('passes through native input attributes', () => {
      render(
        <Checkbox
          label="Native attrs"
          name="checkbox-name"
          value="checkbox-value"
          data-testid="test-checkbox"
        />
      )
      const checkbox = screen.getByTestId('test-checkbox')
      expect(checkbox).toHaveAttribute('name', 'checkbox-name')
      expect(checkbox).toHaveAttribute('value', 'checkbox-value')
    })

    it('supports form integration', () => {
      render(
        <form data-testid="form">
          <Checkbox label="Form checkbox" name="agree" />
        </form>
      )
      const form = screen.getByTestId('form')
      const checkbox = screen.getByLabelText('Form checkbox')
      expect(form).toContainElement(checkbox)
    })
  })
})
