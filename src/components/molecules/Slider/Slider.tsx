import { useRef, useState, useEffect, useId, KeyboardEvent } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

/**
 * Props for the Slider component
 */
export interface SliderProps {
  /**
   * Minimum value of the slider
   * @default 0
   */
  min?: number
  
  /**
   * Maximum value of the slider
   * @default 100
   */
  max?: number
  
  /**
   * Step increment for value changes
   * @default 1
   */
  step?: number
  
  /**
   * Current value for single slider
   */
  value?: number
  
  /**
   * Default value for uncontrolled single slider
   */
  defaultValue?: number
  
  /**
   * Current values for range slider [min, max]
   */
  rangeValue?: [number, number]
  
  /**
   * Default values for uncontrolled range slider [min, max]
   */
  defaultRangeValue?: [number, number]
  
  /**
   * Callback fired when value changes (single slider)
   */
  onChange?: (value: number) => void
  
  /**
   * Callback fired when range values change (range slider)
   */
  onRangeChange?: (values: [number, number]) => void
  
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Label for the slider
   */
  label?: string
  
  /**
   * Whether to show value labels
   * @default true
   */
  showValueLabel?: boolean
  
  /**
   * Custom formatter for value labels
   */
  formatValue?: (value: number) => string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
  
  /**
   * Accessible name for the slider
   */
  'aria-label'?: string
  
  /**
   * ID of element describing the slider
   */
  'aria-describedby'?: string
}

const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap:0;
  width: 100%;
`

const StyledLabel = styled.label<{ $disabled?: boolean }>`
  font: ${semantic.typography.label};
  color: ${({ $disabled }) => 
    $disabled ? semantic.color.text.disabled : semantic.color.text.default
  };
  margin-bottom: ${semantic.spacing.layout.lg};
`

const StyledSliderTrackContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${base.spacing[10]};
  display: flex;
  align-items: center;
`

const StyledTrack = styled.div<{ $disabled?: boolean }>`
  position: relative;
  width: 100%;
  height: ${base.spacing[1]};
  background-color: ${({ $disabled }) =>
    $disabled 
      ? semantic.color.background.disabled
      : semantic.color.border.default
  };
  border-radius: ${base.border.radius.circle};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
`

const StyledTrackFill = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  height: 100%;
  background-color: ${({ $disabled }) =>
    $disabled
      ? semantic.color.border.default
      : semantic.color.background.emphasis
  };
  border-radius: ${base.border.radius.circle};
  pointer-events: none;
`

const StyledThumb = styled.div<{ 
  $disabled?: boolean
  $active?: boolean
}>`
  position: absolute;
  width: ${base.spacing[5]};
  height: ${base.spacing[5]};
  top: -${semantic.spacing.layout.sm};
  background-color: ${({ $disabled }) =>
    $disabled
      ? semantic.color.background.disabled
      : semantic.color.background.subtle
  };
  border: ${base.border.width[2]} solid ${({ $disabled }) =>
    $disabled
      ? semantic.color.border.default
      : semantic.color.background.emphasis
  };
  border-radius: ${base.border.radius.circle};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'grab'};
  transform: translateX(-50%);
  transition: ${semantic.motion.transition.fast};
  box-shadow: ${base.shadow[2]};
  
  &:hover:not([aria-disabled="true"]) {
    transform: translateX(-50%) scale(1.1);
    box-shadow: ${base.shadow[3]};
  }
  
  &:focus-visible {
    outline: ${base.border.width[2]} solid ${semantic.color.border.interactive};
    outline-offset: ${base.spacing[1]};
  }
  
  &:active:not([aria-disabled="true"]) {
    cursor: grabbing;
    transform: translateX(-50%) scale(0.95);
  }
  
  ${({ $active }) => $active && `
    transform: translateX(-50%) scale(1.1);
    box-shadow: ${base.shadow[4]};
  `}
`

const StyledValueLabel = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  top: -${base.spacing[8]};
  left: ${semantic.spacing.layout.sm};
  transform: translateX(-50%);
  padding: ${base.spacing[1]} ${base.spacing[2]};
  background-color: ${semantic.color.background.emphasis};
  color: ${semantic.color.text.inverse};
  font: ${semantic.typography.caption};
  border-radius: ${base.border.radius[2]};
  white-space: nowrap;
  pointer-events: none;
  opacity: ${({ $disabled }) => $disabled ? base.opacity[50] : base.opacity[100]};
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: ${base.spacing[1]} solid transparent;
    border-right: ${base.spacing[1]} solid transparent;
    border-top: ${base.spacing[1]} solid ${semantic.color.background.emphasis};
  }
`

const StyledMinMaxLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font: ${semantic.typography.body};
  color: ${semantic.color.text.subdued};
  margin-top: ${base.spacing[1]};
`

/**
 * Slider component for single value or range selection
 * 
 * @example
 * ```tsx
 * // Single value slider
 * <Slider 
 *   label="Volume"
 *   min={0}
 *   max={100}
 *   value={50}
 *   onChange={(value) => console.log(value)}
 * />
 * 
 * // Range slider
 * <Slider 
 *   label="Budget Range"
 *   min={0}
 *   max={1000}
 *   rangeValue={[200, 800]}
 *   onRangeChange={(values) => console.log(values)}
 * />
 * ```
 */
export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue,
  rangeValue: controlledRangeValue,
  defaultRangeValue,
  onChange,
  onRangeChange,
  disabled = false,
  label,
  showValueLabel = true,
  formatValue = (val) => val.toString(),
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: SliderProps) => {
  const generatedId = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeThumb, setActiveThumb] = useState<'single' | 'min' | 'max' | null>(null)
  
  // Determine if this is a range slider
  const isRange = controlledRangeValue !== undefined || defaultRangeValue !== undefined || onRangeChange !== undefined
  
  // State for single slider
  const [internalValue, setInternalValue] = useState(defaultValue ?? min)
  const currentValue = controlledValue ?? internalValue
  
  // State for range slider
  const [internalRangeValue, setInternalRangeValue] = useState<[number, number]>(
    defaultRangeValue ?? [min, min + (max - min) / 4]
  )
  const currentRangeValue = controlledRangeValue ?? internalRangeValue
  
  // Clamp value to min/max and nearest step
  const clampValue = (val: number): number => {
    const clamped = Math.max(min, Math.min(max, val))
    const stepped = Math.round((clamped - min) / step) * step + min
    return Math.min(max, stepped)
  }
  
  // Convert pixel position to value
  const positionToValue = (clientX: number): number => {
    if (!trackRef.current) return min
    
    const rect = trackRef.current.getBoundingClientRect()
    const percent = (clientX - rect.left) / rect.width
    const rawValue = min + percent * (max - min)
    return clampValue(rawValue)
  }
  
  // Convert value to percentage for positioning
  const valueToPercent = (val: number): number => {
    return ((val - min) / (max - min)) * 100
  }
  
  // Handle single slider change
  const handleSingleChange = (newValue: number) => {
    const clampedValue = clampValue(newValue)
    setInternalValue(clampedValue)
    onChange?.(clampedValue)
  }
  
  // Handle range slider change
  const handleRangeChange = (newMin: number, newMax: number) => {
    const clampedMin = clampValue(newMin)
    const clampedMax = clampValue(newMax)
    
    // Ensure min <= max
    const orderedMin = Math.min(clampedMin, clampedMax)
    const orderedMax = Math.max(clampedMin, clampedMax)
    
    setInternalRangeValue([orderedMin, orderedMax])
    onRangeChange?.([orderedMin, orderedMax])
  }
  
  // Mouse/touch handlers
  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    
    const newValue = positionToValue(event.clientX)
    
    if (isRange) {
      const [minVal, maxVal] = currentRangeValue
      const distToMin = Math.abs(newValue - minVal)
      const distToMax = Math.abs(newValue - maxVal)
      
      if (distToMin < distToMax) {
        handleRangeChange(newValue, maxVal)
      } else {
        handleRangeChange(minVal, newValue)
      }
    } else {
      handleSingleChange(newValue)
    }
  }
  
  const handleThumbMouseDown = (thumb: 'single' | 'min' | 'max') => (event: React.MouseEvent) => {
    if (disabled) return
    event.preventDefault()
    setActiveThumb(thumb)
    
    const handleMouseMove = (e: MouseEvent) => {
      const newValue = positionToValue(e.clientX)
      
      if (isRange) {
        const [minVal, maxVal] = currentRangeValue
        if (thumb === 'min') {
          handleRangeChange(newValue, maxVal)
        } else {
          handleRangeChange(minVal, newValue)
        }
      } else {
        handleSingleChange(newValue)
      }
    }
    
    const handleMouseUp = () => {
      setActiveThumb(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  // Keyboard navigation
  const handleKeyDown = (thumb: 'single' | 'min' | 'max') => (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    
    let valueChange = 0
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        valueChange = step
        event.preventDefault()
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        valueChange = -step
        event.preventDefault()
        break
      case 'PageUp':
        valueChange = step * 10
        event.preventDefault()
        break
      case 'PageDown':
        valueChange = -step * 10
        event.preventDefault()
        break
      case 'Home':
        if (isRange) {
          const [minVal, maxVal] = currentRangeValue
          if (thumb === 'min') {
            handleRangeChange(min, maxVal)
          } else {
            handleRangeChange(minVal, min)
          }
        } else {
          handleSingleChange(min)
        }
        event.preventDefault()
        return
      case 'End':
        if (isRange) {
          const [minVal, maxVal] = currentRangeValue
          if (thumb === 'min') {
            handleRangeChange(max, maxVal)
          } else {
            handleRangeChange(minVal, max)
          }
        } else {
          handleSingleChange(max)
        }
        event.preventDefault()
        return
      default:
        return
    }
    
    if (isRange) {
      const [minVal, maxVal] = currentRangeValue
      if (thumb === 'min') {
        handleRangeChange(minVal + valueChange, maxVal)
      } else {
        handleRangeChange(minVal, maxVal + valueChange)
      }
    } else {
      handleSingleChange(currentValue + valueChange)
    }
  }
  
  // Calculate positions
  const singlePercent = valueToPercent(currentValue)
  const [minPercent, maxPercent] = [
    valueToPercent(currentRangeValue[0]),
    valueToPercent(currentRangeValue[1])
  ]
  
  return (
    <StyledSliderContainer data-testid={dataTestId}>
      {label && (
        <StyledLabel htmlFor={generatedId} $disabled={disabled}>
          {label}
        </StyledLabel>
      )}
      
      <StyledSliderTrackContainer>
        <StyledTrack
          ref={trackRef}
          onClick={handleTrackClick}
          $disabled={disabled}
        >
          {isRange ? (
            <StyledTrackFill
              $disabled={disabled}
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />
          ) : (
            <StyledTrackFill
              $disabled={disabled}
              style={{
                left: 0,
                width: `${singlePercent}%`,
              }}
            />
          )}
          
          {isRange ? (
            <>
              {/* Min thumb */}
              <StyledThumb
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-label={ariaLabel ? `${ariaLabel} minimum` : 'Minimum value'}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={currentRangeValue[0]}
                aria-valuetext={formatValue(currentRangeValue[0])}
                aria-disabled={disabled}
                aria-describedby={ariaDescribedBy}
                $disabled={disabled}
                $active={activeThumb === 'min'}
                style={{ left: `${minPercent}%` }}
                onMouseDown={handleThumbMouseDown('min')}
                onKeyDown={handleKeyDown('min')}
              >
                {showValueLabel && (
                  <StyledValueLabel $disabled={disabled}>
                    {formatValue(currentRangeValue[0])}
                  </StyledValueLabel>
                )}
              </StyledThumb>
              
              {/* Max thumb */}
              <StyledThumb
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-label={ariaLabel ? `${ariaLabel} maximum` : 'Maximum value'}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={currentRangeValue[1]}
                aria-valuetext={formatValue(currentRangeValue[1])}
                aria-disabled={disabled}
                aria-describedby={ariaDescribedBy}
                $disabled={disabled}
                $active={activeThumb === 'max'}
                style={{ left: `${maxPercent}%` }}
                onMouseDown={handleThumbMouseDown('max')}
                onKeyDown={handleKeyDown('max')}
              >
                {showValueLabel && (
                  <StyledValueLabel $disabled={disabled}>
                    {formatValue(currentRangeValue[1])}
                  </StyledValueLabel>
                )}
              </StyledThumb>
            </>
          ) : (
            <StyledThumb
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-label={ariaLabel || label || 'Slider value'}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={currentValue}
              aria-valuetext={formatValue(currentValue)}
              aria-disabled={disabled}
              aria-describedby={ariaDescribedBy}
              $disabled={disabled}
              $active={activeThumb === 'single'}
              style={{ left: `${singlePercent}%` }}
              onMouseDown={handleThumbMouseDown('single')}
              onKeyDown={handleKeyDown('single')}
            >
              {showValueLabel && (
                <StyledValueLabel $disabled={disabled}>
                  {formatValue(currentValue)}
                </StyledValueLabel>
              )}
            </StyledThumb>
          )}
        </StyledTrack>
      </StyledSliderTrackContainer>
      
      <StyledMinMaxLabels>
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </StyledMinMaxLabels>
    </StyledSliderContainer>
  )
}

Slider.displayName = 'Slider'
