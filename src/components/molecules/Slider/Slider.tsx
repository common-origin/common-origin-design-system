import { useRef, useState, useEffect, useId, KeyboardEvent } from 'react'
import styled from 'styled-components'
import tokens from '@/lib/cssTokens'
import { forcedColors, reducedMotion } from '../../../lib/styleUtils'

const { semantic } = tokens

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
  margin-bottom: ${semantic.space[400]};
`

const StyledSliderTrackContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${semantic.space[1000]};
  display: flex;
  align-items: center;
`

const StyledTrack = styled.div<{ $disabled?: boolean }>`
  position: relative;
  width: 100%;
  height: ${semantic.space[100]};
  background-color: ${({ $disabled }) =>
    $disabled 
      ? semantic.color.fill.disabled
      : tokens.component.track.background
  };
  border-radius: ${semantic.radius.full};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  /* A vertical swipe over the track still scrolls the page */
  touch-action: pan-y;
  /* The thumbs measure their distance apart in cqw (1% of the track's width) */
  container-type: inline-size;

  /* Forced colours drop the track's fill, so it gets an edge; the thumb stays centred on it (decision 0038).
     A div gets no system disabled colour, so a disabled track sets GrayText itself. */
  ${forcedColors} {
    border: ${semantic.border.width.thin} solid ${({ $disabled }) => $disabled ? 'GrayText' : 'CanvasText'};
  }
`

const StyledTrackFill = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  height: 100%;
  background-color: ${({ $disabled }) =>
    $disabled
      ? semantic.color.icon.disabled
      : semantic.color.fill.emphasis
  };
  border-radius: ${semantic.radius.full};
  pointer-events: none;

  /* The fill is the value, so it keeps a fill in forced colours (decision 0038) */
  ${forcedColors} {
    forced-color-adjust: none;
    background-color: ${({ $disabled }) => $disabled ? 'GrayText' : 'Highlight'};
  }
`

const StyledThumb = styled.div<{ 
  $disabled?: boolean
  $active?: boolean
  /** A range slider's thumb: its hit area stops at the midpoint between the two thumbs */
  $range?: 'min' | 'max'
}>`
  position: absolute;
  width: ${semantic.space[500]};
  height: ${semantic.space[500]};
  top: calc(-1 * ${semantic.space[200]});
  background-color: ${({ $disabled }) =>
    $disabled
      ? semantic.color.fill.disabled
      : tokens.component.slider.thumb.background
  };
  border: ${semantic.border.width.thick} solid ${({ $disabled }) =>
    $disabled
      ? semantic.color.icon.disabled
      : semantic.color.fill.emphasis
  };
  border-radius: ${semantic.radius.full};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'grab'};
  /* The thumb takes every touch gesture, so a drag moves the value instead of scrolling */
  touch-action: none;
  transform: translateX(-50%);
  /* left is the thumb's position, set from the value: it glides there, as it always has (decision 0037) */
  transition: left ${semantic.motion.duration.fast} ${semantic.motion.easing.decelerate},
              transform ${semantic.motion.duration.fast} ${semantic.motion.easing.decelerate},
              box-shadow ${semantic.motion.duration.fast} ${semantic.motion.easing.decelerate},
              background-color ${semantic.motion.duration.fast} ${semantic.motion.easing.decelerate},
              border-color ${semantic.motion.duration.fast} ${semantic.motion.easing.decelerate};
  box-shadow: ${tokens.component.slider.thumb.shadow.default};

  /* The pointer target (WCAG 2.5.8, decision 0039): the thumb keeps its 20px look, and an
     invisible hit area centred on it takes pointer input instead, 24px for a mouse or pen and
     44px on a touch screen. A range slider's two hit areas stop at the midpoint between the
     thumbs (--slider-reach, set from their positions), so they never overlap and a drag always
     takes the nearer thumb. The thumb itself takes no input, as its body can overlap the other
     thumb's half. */
  pointer-events: none;
  --slider-hit: ${semantic.size.pointerTarget};
  @media (pointer: coarse) {
    --slider-hit: ${semantic.size.touchTarget};
  }
  --slider-hit-half: calc(var(--slider-hit) / 2);
  --slider-hit-start: ${({ $range }) => $range === 'max' ? 'min(var(--slider-hit-half), var(--slider-reach))' : 'var(--slider-hit-half)'};
  --slider-hit-end: ${({ $range }) => $range === 'min' ? 'min(var(--slider-hit-half), var(--slider-reach))' : 'var(--slider-hit-half)'};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(50% - var(--slider-hit-start));
    width: calc(var(--slider-hit-start) + var(--slider-hit-end));
    height: var(--slider-hit);
    transform: translateY(-50%);
    pointer-events: auto;
  }

  /* Without container query units the midpoint can't be measured, so the hit areas stay whole
     (where they overlap, the thumb drawn later wins) */
  @supports not (width: 1cqw) {
    &::before {
      left: calc(50% - var(--slider-hit-half));
      width: var(--slider-hit);
    }
  }

  ${reducedMotion} {
    transition: none;
  }
  
  &:hover:not([aria-disabled="true"]) {
    transform: translateX(-50%) scale(1.1);
    box-shadow: ${tokens.component.slider.thumb.shadow.hover};
  }
  
  &:focus-visible {
    outline: ${semantic.border.focus};
    outline-offset: ${semantic.border.focusOffset};
  }
  
  &:active:not([aria-disabled="true"]) {
    cursor: grabbing;
    transform: translateX(-50%) scale(0.95);
  }
  
  ${({ $active }) => $active && `
    transform: translateX(-50%) scale(1.1);
    box-shadow: ${tokens.component.slider.thumb.shadow.active};
  `}
`

const StyledValueLabel = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  top: calc(-1 * ${semantic.space[800]});
  left: ${semantic.space[200]};
  transform: translateX(-50%);
  padding: ${semantic.space[100]} ${semantic.space[200]};
  background-color: ${semantic.color.fill.emphasis};
  color: ${semantic.color.text.inverse};
  font: ${semantic.typography.caption};
  border-radius: ${semantic.radius.sm};
  white-space: nowrap;
  pointer-events: none;
  opacity: ${({ $disabled }) => $disabled ? semantic.opacity.disabled : semantic.opacity.full};
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: ${semantic.space[100]} solid transparent;
    border-right: ${semantic.space[100]} solid transparent;
    border-top: ${semantic.space[100]} solid ${semantic.color.fill.emphasis};
  }
`

const StyledMinMaxLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font: ${semantic.typography.body};
  color: ${semantic.color.text.muted};
  margin-top: ${semantic.space[100]};
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
  // Removes the document listeners of a drag in progress
  const endDragRef = useRef<(() => void) | null>(null)

  useEffect(() => () => endDragRef.current?.(), [])
  
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
  
  // Pointer handlers: mouse, touch and pen
  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    // A click on a thumb (or the end of a drag) leaves the value where the thumb put it
    if ((event.target as HTMLElement).closest('[role="slider"]')) return
    
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
  
  const handleThumbPointerDown = (thumb: 'single' | 'min' | 'max', event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    // Only the primary button drags; a touch or pen contact always counts
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.preventDefault()
    endDragRef.current?.()
    setActiveThumb(thumb)

    const { pointerId } = event
    // Capture keeps the drag on this thumb when the pointer leaves it, or the window
    event.currentTarget.setPointerCapture?.(pointerId)

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
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
    
    const endDrag = () => {
      setActiveThumb(null)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerEnd)
      document.removeEventListener('pointercancel', handlePointerEnd)
      endDragRef.current = null
    }

    // pointercancel fires when the browser takes the gesture over, so it ends the drag too
    const handlePointerEnd = (e: PointerEvent) => {
      if (e.pointerId === pointerId) endDrag()
    }
    
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerEnd)
    document.addEventListener('pointercancel', handlePointerEnd)
    endDragRef.current = endDrag
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
                $range="min"
                style={{ left: `${minPercent}%`, '--slider-reach': `${(maxPercent - minPercent) / 2}cqw` } as React.CSSProperties}
                onPointerDown={(event) => handleThumbPointerDown('min', event)}
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
                $range="max"
                style={{ left: `${maxPercent}%`, '--slider-reach': `${(maxPercent - minPercent) / 2}cqw` } as React.CSSProperties}
                onPointerDown={(event) => handleThumbPointerDown('max', event)}
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
              onPointerDown={(event) => handleThumbPointerDown('single', event)}
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
