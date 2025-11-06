import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Slider } from './Slider'

expect.extend(toHaveNoViolations)

describe('Slider', () => {
  describe('Basic Rendering', () => {
    it('should render a single value slider', () => {
      render(<Slider data-testid="slider" />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })
    
    it('should render with a label', () => {
      render(<Slider label="Volume" data-testid="slider" />)
      
      expect(screen.getByText('Volume')).toBeInTheDocument()
    })
    
    it('should render min and max labels', () => {
      render(<Slider min={10} max={100} data-testid="slider" />)
      
      const labels = screen.getAllByText('10')
      expect(labels.length).toBeGreaterThanOrEqual(1) // Min label appears (may also be value label)
      expect(screen.getByText('100')).toBeInTheDocument()
    })
    
    it('should render with custom formatValue', () => {
      render(
        <Slider
          min={0}
          max={1000}
          defaultValue={500}
          formatValue={(val) => `$${val}`}
          data-testid="slider"
        />
      )
      
      expect(screen.getByText('$0')).toBeInTheDocument()
      expect(screen.getByText('$1000')).toBeInTheDocument()
      expect(screen.getByText('$500')).toBeInTheDocument()
    })
    
    it('should render disabled state', () => {
      render(<Slider disabled data-testid="slider" />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-disabled', 'true')
      expect(slider).toHaveAttribute('tabIndex', '-1')
    })
    
    it('should not show value label when showValueLabel is false', () => {
      render(<Slider defaultValue={50} showValueLabel={false} data-testid="slider" />)
      
      // Min/max labels should still be present
      expect(screen.getByText('0')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
      
      // Value label on thumb should not be present
      const slider = screen.getByRole('slider')
      expect(slider.textContent).not.toBe('50')
    })
  })
  
  describe('Single Value Mode', () => {
    it('should render with default value', () => {
      render(<Slider defaultValue={50} data-testid="slider" />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })
    
    it('should render with controlled value', () => {
      render(<Slider value={75} data-testid="slider" />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '75')
    })
    
    it('should call onChange when value changes', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      
      // Simulate keyboard navigation
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).toHaveBeenCalledWith(51)
    })
    
    it('should clamp value to min/max bounds', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          defaultValue={100}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      
      // Try to go beyond max
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      // Should stay at max
      expect(handleChange).toHaveBeenCalledWith(100)
    })
    
    it('should respect step increments', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          step={10}
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).toHaveBeenCalledWith(60)
    })
  })
  
  describe('Range Mode', () => {
    it('should render two thumbs in range mode', () => {
      render(
        <Slider
          defaultRangeValue={[20, 80]}
          data-testid="slider"
        />
      )
      
      const sliders = screen.getAllByRole('slider')
      expect(sliders).toHaveLength(2)
    })
    
    it('should render with default range values', () => {
      render(
        <Slider
          min={0}
          max={100}
          defaultRangeValue={[25, 75]}
          data-testid="slider"
        />
      )
      
      const [minSlider, maxSlider] = screen.getAllByRole('slider')
      expect(minSlider).toHaveAttribute('aria-valuenow', '25')
      expect(maxSlider).toHaveAttribute('aria-valuenow', '75')
    })
    
    it('should render with controlled range values', () => {
      render(
        <Slider
          min={0}
          max={100}
          rangeValue={[30, 70]}
          data-testid="slider"
        />
      )
      
      const [minSlider, maxSlider] = screen.getAllByRole('slider')
      expect(minSlider).toHaveAttribute('aria-valuenow', '30')
      expect(maxSlider).toHaveAttribute('aria-valuenow', '70')
    })
    
    it('should call onRangeChange when values change', () => {
      const handleRangeChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          defaultRangeValue={[25, 75]}
          onRangeChange={handleRangeChange}
          data-testid="slider"
        />
      )
      
      const [minSlider] = screen.getAllByRole('slider')
      
      fireEvent.keyDown(minSlider, { key: 'ArrowRight' })
      
      expect(handleRangeChange).toHaveBeenCalledWith([26, 75])
    })
    
    it('should prevent min thumb from exceeding max thumb', () => {
      const handleRangeChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          defaultRangeValue={[50, 60]}
          onRangeChange={handleRangeChange}
          data-testid="slider"
        />
      )
      
      const [minSlider] = screen.getAllByRole('slider')
      
      // Try to move min past max
      for (let i = 0; i < 15; i++) {
        fireEvent.keyDown(minSlider, { key: 'ArrowRight' })
      }
      
      // Last call should have min and max equal (min can't exceed max)
      const lastCall = handleRangeChange.mock.calls[handleRangeChange.mock.calls.length - 1]
      expect(lastCall[0][0]).toBeLessThanOrEqual(lastCall[0][1])
    })
    
    it('should show separate value labels for both thumbs', () => {
      render(
        <Slider
          defaultRangeValue={[25, 75]}
          formatValue={(val) => `${val}%`}
          data-testid="slider"
        />
      )
      
      expect(screen.getByText('25%')).toBeInTheDocument()
      expect(screen.getByText('75%')).toBeInTheDocument()
    })
  })
  
  describe('Keyboard Navigation', () => {
    it('should increase value with ArrowRight', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).toHaveBeenCalledWith(51)
    })
    
    it('should increase value with ArrowUp', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowUp' })
      
      expect(handleChange).toHaveBeenCalledWith(51)
    })
    
    it('should decrease value with ArrowLeft', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowLeft' })
      
      expect(handleChange).toHaveBeenCalledWith(49)
    })
    
    it('should decrease value with ArrowDown', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowDown' })
      
      expect(handleChange).toHaveBeenCalledWith(49)
    })
    
    it('should jump by 10 steps with PageUp', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          step={1}
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'PageUp' })
      
      expect(handleChange).toHaveBeenCalledWith(60)
    })
    
    it('should jump by 10 steps with PageDown', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          step={1}
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'PageDown' })
      
      expect(handleChange).toHaveBeenCalledWith(40)
    })
    
    it('should jump to minimum with Home', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'Home' })
      
      expect(handleChange).toHaveBeenCalledWith(0)
    })
    
    it('should jump to maximum with End', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          min={0}
          max={100}
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'End' })
      
      expect(handleChange).toHaveBeenCalledWith(100)
    })
    
    it('should not respond to keyboard when disabled', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          disabled
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).not.toHaveBeenCalled()
    })
    
    it('should handle keyboard navigation in range mode for min thumb', () => {
      const handleRangeChange = jest.fn()
      render(
        <Slider
          defaultRangeValue={[25, 75]}
          onRangeChange={handleRangeChange}
          data-testid="slider"
        />
      )
      
      const [minSlider] = screen.getAllByRole('slider')
      
      fireEvent.keyDown(minSlider, { key: 'ArrowRight' })
      expect(handleRangeChange).toHaveBeenCalledWith([26, 75])
      
      fireEvent.keyDown(minSlider, { key: 'Home' })
      expect(handleRangeChange).toHaveBeenCalledWith([0, 75])
    })
    
    it('should handle keyboard navigation in range mode for max thumb', () => {
      const handleRangeChange = jest.fn()
      render(
        <Slider
          defaultRangeValue={[25, 75]}
          onRangeChange={handleRangeChange}
          data-testid="slider"
        />
      )
      
      const [, maxSlider] = screen.getAllByRole('slider')
      
      fireEvent.keyDown(maxSlider, { key: 'ArrowLeft' })
      expect(handleRangeChange).toHaveBeenCalledWith([25, 74])
      
      fireEvent.keyDown(maxSlider, { key: 'End' })
      expect(handleRangeChange).toHaveBeenCalledWith([25, 100])
    })
  })
  
  describe('Mouse Interactions', () => {
    it('should not respond to mouse events when disabled', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          disabled
          defaultValue={50}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.mouseDown(slider)
      
      expect(handleChange).not.toHaveBeenCalled()
    })
    
    it('should allow focus on thumb via keyboard', () => {
      render(<Slider defaultValue={50} data-testid="slider" />)
      
      const slider = screen.getByRole('slider')
      slider.focus()
      
      expect(slider).toHaveFocus()
    })
    
    it('should not allow focus when disabled', () => {
      render(<Slider disabled defaultValue={50} data-testid="slider" />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabIndex', '-1')
    })
  })
  
  describe('ARIA Attributes', () => {
    it('should have correct ARIA attributes for single slider', () => {
      render(
        <Slider
          min={0}
          max={100}
          defaultValue={50}
          label="Volume"
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      
      expect(slider).toHaveAttribute('role', 'slider')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
      expect(slider).toHaveAttribute('aria-valuetext', '50')
      expect(slider).toHaveAttribute('aria-label', 'Volume')
    })
    
    it('should use aria-label when provided without label', () => {
      render(
        <Slider
          aria-label="Custom label"
          defaultValue={50}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-label', 'Custom label')
    })
    
    it('should have correct ARIA attributes for range slider', () => {
      render(
        <Slider
          min={0}
          max={100}
          defaultRangeValue={[25, 75]}
          aria-label="Budget"
          data-testid="slider"
        />
      )
      
      const [minSlider, maxSlider] = screen.getAllByRole('slider')
      
      expect(minSlider).toHaveAttribute('aria-label', 'Budget minimum')
      expect(minSlider).toHaveAttribute('aria-valuemin', '0')
      expect(minSlider).toHaveAttribute('aria-valuemax', '100')
      expect(minSlider).toHaveAttribute('aria-valuenow', '25')
      expect(minSlider).toHaveAttribute('aria-valuetext', '25')
      
      expect(maxSlider).toHaveAttribute('aria-label', 'Budget maximum')
      expect(maxSlider).toHaveAttribute('aria-valuemin', '0')
      expect(maxSlider).toHaveAttribute('aria-valuemax', '100')
      expect(maxSlider).toHaveAttribute('aria-valuenow', '75')
      expect(maxSlider).toHaveAttribute('aria-valuetext', '75')
    })
    
    it('should use formatted value in aria-valuetext', () => {
      render(
        <Slider
          min={0}
          max={1000}
          defaultValue={500}
          formatValue={(val) => `$${val}`}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuetext', '$500')
    })
    
    it('should have aria-disabled when disabled', () => {
      render(<Slider disabled defaultValue={50} data-testid="slider" />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-disabled', 'true')
    })
    
    it('should use aria-describedby when provided', () => {
      render(
        <Slider
          aria-describedby="helper-text"
          defaultValue={50}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-describedby', 'helper-text')
    })
    
    it('should have default aria-label for range slider thumbs without custom label', () => {
      render(
        <Slider
          defaultRangeValue={[25, 75]}
          data-testid="slider"
        />
      )
      
      const [minSlider, maxSlider] = screen.getAllByRole('slider')
      
      expect(minSlider).toHaveAttribute('aria-label', 'Minimum value')
      expect(maxSlider).toHaveAttribute('aria-label', 'Maximum value')
    })
  })
  
  describe('Accessibility with jest-axe', () => {
    it('should not have accessibility violations in single mode', async () => {
      const { container } = render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          defaultValue={50}
          data-testid="slider"
        />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have accessibility violations in range mode', async () => {
      const { container } = render(
        <Slider
          label="Budget Range"
          min={0}
          max={1000}
          defaultRangeValue={[200, 800]}
          data-testid="slider"
        />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have accessibility violations when disabled', async () => {
      const { container } = render(
        <Slider
          label="Volume"
          disabled
          defaultValue={50}
          data-testid="slider"
        />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have accessibility violations with custom formatting', async () => {
      const { container } = render(
        <Slider
          label="Price"
          min={0}
          max={1000}
          defaultValue={500}
          formatValue={(val) => `$${val}`}
          data-testid="slider"
        />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have accessibility violations without value labels', async () => {
      const { container } = render(
        <Slider
          label="Volume"
          showValueLabel={false}
          defaultValue={50}
          data-testid="slider"
        />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    
    it('should not have accessibility violations with step increments', async () => {
      const { container } = render(
        <Slider
          label="Rating"
          min={0}
          max={5}
          step={0.5}
          defaultValue={2.5}
          data-testid="slider"
        />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
  
  describe('Edge Cases', () => {
    it('should handle min and max being equal', () => {
      render(
        <Slider
          min={50}
          max={50}
          defaultValue={50}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })
    
    it('should handle negative values', () => {
      render(
        <Slider
          min={-100}
          max={100}
          defaultValue={-50}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '-50')
    })
    
    it('should handle decimal step values', () => {
      const handleChange = jest.fn()
      render(
        <Slider
          min={0}
          max={1}
          step={0.1}
          defaultValue={0.5}
          onChange={handleChange}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).toHaveBeenCalledWith(expect.closeTo(0.6, 1))
    })
    
    it('should handle large number ranges', () => {
      render(
        <Slider
          min={0}
          max={1000000}
          defaultValue={500000}
          data-testid="slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '500000')
    })
  })
})
