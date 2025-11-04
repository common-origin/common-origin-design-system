import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { NumberInput } from './NumberInput'
import { useState } from 'react'

expect.extend(toHaveNoViolations)

describe('NumberInput', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<NumberInput />)
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<NumberInput label="Quantity" />)
      expect(screen.getByLabelText('Quantity')).toBeInTheDocument()
      expect(screen.getByText('Quantity')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<NumberInput label="Quantity" helperText="Enter a number" />)
      expect(screen.getByText('Enter a number')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(<NumberInput label="Quantity" error="Value is required" />)
      expect(screen.getByText('Value is required')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent('Value is required')
    })

    it('renders required indicator', () => {
      render(<NumberInput label="Quantity" required />)
      expect(screen.getByLabelText('required')).toBeInTheDocument()
    })

    it('renders stepper buttons', () => {
      render(<NumberInput label="Quantity" />)
      expect(screen.getByLabelText('Increment value')).toBeInTheDocument()
      expect(screen.getByLabelText('Decrement value')).toBeInTheDocument()
    })
  })

  describe('Value Handling', () => {
    it('accepts numeric input', async () => {
      const user = userEvent.setup()
      render(<NumberInput label="Quantity" />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '123')
      expect(input).toHaveValue('123')
    })

    it('accepts decimal input', async () => {
      const user = userEvent.setup()
      render(<NumberInput label="Price" />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '12.5')
      expect(input).toHaveValue('12.5')
    })

    it('accepts negative numbers', async () => {
      const user = userEvent.setup()
      render(<NumberInput label="Temperature" />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '-10')
      expect(input).toHaveValue('-10')
    })

    it('rejects non-numeric characters', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, 'abc')
      expect(input).toHaveValue('')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('allows empty value', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={5} onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.clear(input)
      expect(onChange).toHaveBeenCalledWith('', expect.any(Object))
    })
  })

  describe('Increment/Decrement', () => {
    it('increments value when increment button is clicked', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={5} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Increment value'))
      expect(onChange).toHaveBeenCalledWith(6, expect.any(Object))
    })

    it('decrements value when decrement button is clicked', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={5} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Decrement value'))
      expect(onChange).toHaveBeenCalledWith(4, expect.any(Object))
    })

    it('increments by custom step', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={10} step={5} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Increment value'))
      expect(onChange).toHaveBeenCalledWith(15, expect.any(Object))
    })

    it('decrements by custom step', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={10} step={5} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Decrement value'))
      expect(onChange).toHaveBeenCalledWith(5, expect.any(Object))
    })

    it('increments with decimal step', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Price" value={10.5} step={0.1} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Increment value'))
      expect(onChange).toHaveBeenCalledWith(10.6, expect.any(Object))
    })

    it('starts from min when incrementing from empty', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value="" min={1} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Increment value'))
      expect(onChange).toHaveBeenCalledWith(2, expect.any(Object))
    })

    it('starts from max when decrementing from empty', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value="" max={10} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Decrement value'))
      expect(onChange).toHaveBeenCalledWith(9, expect.any(Object))
    })
  })

  describe('Min/Max Constraints', () => {
    it('does not increment beyond max', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={10} max={10} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Increment value'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('does not decrement below min', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={0} min={0} onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Decrement value'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('disables increment button at max', () => {
      render(<NumberInput label="Quantity" value={10} max={10} />)
      expect(screen.getByLabelText('Increment value')).toBeDisabled()
    })

    it('disables decrement button at min', () => {
      render(<NumberInput label="Quantity" value={0} min={0} />)
      expect(screen.getByLabelText('Decrement value')).toBeDisabled()
    })

    it('respects min/max for manual input', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" min={0} max={100} onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '50')
      expect(onChange).toHaveBeenLastCalledWith(50, expect.any(Object))
    })
  })

  describe('Keyboard Navigation', () => {
    it('increments with ArrowUp key', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={5} onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.click(input)
      await user.keyboard('{ArrowUp}')
      expect(onChange).toHaveBeenCalledWith(6, expect.any(Object))
    })

    it('decrements with ArrowDown key', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={5} onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.click(input)
      await user.keyboard('{ArrowDown}')
      expect(onChange).toHaveBeenCalledWith(4, expect.any(Object))
    })

    it('respects max when using ArrowUp', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={10} max={10} onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.click(input)
      await user.keyboard('{ArrowUp}')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('respects min when using ArrowDown', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={0} min={0} onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.click(input)
      await user.keyboard('{ArrowDown}')
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('renders as disabled', () => {
      render(<NumberInput label="Quantity" disabled />)
      expect(screen.getByRole('spinbutton')).toBeDisabled()
    })

    it('disables stepper buttons when disabled', () => {
      render(<NumberInput label="Quantity" disabled />)
      expect(screen.getByLabelText('Increment value')).toBeDisabled()
      expect(screen.getByLabelText('Decrement value')).toBeDisabled()
    })

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" disabled onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '123')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('does not increment when disabled', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" value={5} disabled onChange={onChange} />)
      
      await user.click(screen.getByLabelText('Increment value'))
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Error State', () => {
    it('displays error message', () => {
      render(<NumberInput label="Quantity" error="Invalid value" />)
      expect(screen.getByText('Invalid value')).toBeInTheDocument()
    })

    it('sets aria-invalid when error is present', () => {
      render(<NumberInput label="Quantity" error="Invalid value" />)
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true')
    })

    it('error takes precedence over helper text', () => {
      render(<NumberInput label="Quantity" helperText="Helper" error="Error" />)
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.queryByText('Helper')).not.toBeInTheDocument()
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup()
      const ControlledComponent = () => {
        const [value, setValue] = useState<number | ''>(5)
        return (
          <NumberInput 
            label="Quantity" 
            value={value} 
            onChange={(val) => setValue(val)} 
          />
        )
      }
      
      render(<ControlledComponent />)
      const input = screen.getByRole('spinbutton')
      
      expect(input).toHaveValue('5')
      await user.click(screen.getByLabelText('Increment value'))
      expect(input).toHaveValue('6')
    })

    it('works as uncontrolled component with defaultValue', () => {
      render(<NumberInput label="Quantity" defaultValue={10} />)
      expect(screen.getByRole('spinbutton')).toHaveValue('10')
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <NumberInput label="Quantity" helperText="Enter a quantity" />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with error', async () => {
      const { container } = render(
        <NumberInput label="Quantity" error="Value is required" required />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <NumberInput label="Quantity" disabled defaultValue={5} />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has proper role', () => {
      render(<NumberInput label="Quantity" />)
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('has proper aria-valuemin', () => {
      render(<NumberInput label="Quantity" min={0} />)
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuemin', '0')
    })

    it('has proper aria-valuemax', () => {
      render(<NumberInput label="Quantity" max={100} />)
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuemax', '100')
    })

    it('has proper aria-valuenow', () => {
      render(<NumberInput label="Quantity" value={50} />)
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuenow', '50')
    })

    it('associates label with input', () => {
      render(<NumberInput label="Quantity" />)
      const input = screen.getByRole('spinbutton')
      const label = screen.getByText('Quantity')
      expect(input).toHaveAccessibleName('Quantity')
      expect(label).toHaveAttribute('for', input.id)
    })

    it('associates helper text with input', () => {
      render(<NumberInput label="Quantity" helperText="Enter a number" />)
      const input = screen.getByRole('spinbutton')
      const helperText = screen.getByText('Enter a number')
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(helperText.id))
    })

    it('associates error with input', () => {
      render(<NumberInput label="Quantity" error="Invalid" />)
      const input = screen.getByRole('spinbutton')
      const error = screen.getByText('Invalid')
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(error.id))
    })

    it('marks required field', () => {
      render(<NumberInput label="Quantity" required />)
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByRole('spinbutton')).toBeRequired()
    })

    it('stepper buttons have tabIndex -1', () => {
      render(<NumberInput label="Quantity" />)
      expect(screen.getByLabelText('Increment value')).toHaveAttribute('tabindex', '-1')
      expect(screen.getByLabelText('Decrement value')).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = { current: null as HTMLInputElement | null }
      render(<NumberInput ref={ref} label="Quantity" />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
      expect(ref.current?.tagName).toBe('INPUT')
    })

    it('can focus input via ref', () => {
      const ref = { current: null as HTMLInputElement | null }
      render(<NumberInput ref={ref} label="Quantity" />)
      ref.current?.focus()
      expect(ref.current).toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('handles very large numbers', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '999999999')
      expect(onChange).toHaveBeenLastCalledWith(999999999, expect.any(Object))
    })

    it('handles very small decimals', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Precision" onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '0.00001')
      expect(onChange).toHaveBeenLastCalledWith(0.00001, expect.any(Object))
    })

    it('handles zero', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Quantity" onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '0')
      expect(onChange).toHaveBeenCalledWith(0, expect.any(Object))
    })

    it('handles negative zero', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Temperature" onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '-0')
      expect(input).toHaveValue('-0')
    })

    it('handles just a minus sign', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<NumberInput label="Temperature" onChange={onChange} />)
      const input = screen.getByRole('spinbutton')
      
      await user.type(input, '-')
      expect(onChange).toHaveBeenCalledWith('', expect.any(Object))
    })
  })

  describe('HTML Attributes', () => {
    it('forwards data-testid', () => {
      render(<NumberInput label="Quantity" data-testid="test-input" />)
      expect(screen.getByTestId('test-input')).toBeInTheDocument()
    })

    it('forwards placeholder', () => {
      render(<NumberInput label="Quantity" placeholder="Enter quantity" />)
      expect(screen.getByPlaceholderText('Enter quantity')).toBeInTheDocument()
    })

    it('forwards aria-label', () => {
      render(<NumberInput aria-label="Custom label" />)
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument()
    })
  })
})
