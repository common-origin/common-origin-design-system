import React, { useState, useRef, useEffect, useId } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Icon } from '../../atoms/Icon'
import { Typography } from '../../atoms/Typography'
import { interactiveRow, reducedMotion } from '../../../lib/styleUtils'

const { semantic: { border, elevation, motion, space }, component: { input, field } } = tokens

// Spacing comes from the semantic scales: no component spacing tokens (decision 0022).
// The trigger and options take their height from size.control.lg as a minimum and centre
// their content (decision 0034). The small vertical padding only matters when a long
// label wraps; a single line is shorter than the minimum.
const controlPaddingX = tokens.semantic.space.inset.lg
const controlPaddingY = space[200]
const controlHeight = tokens.semantic.size.control.lg
const { duration, easing } = motion

interface DropdownOption {
  id: string
  label: string
  value?: any
}

export interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  label?: string
  helperText?: string
  error?: string
  /** Test identifier for automated testing */
  'data-testid'?: string
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`

const DropdownTrigger = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isOpen: boolean; $hasError?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box; /* the min-height includes the border, without relying on a global reset */
  min-height: ${controlHeight};
  padding: ${controlPaddingY} ${controlPaddingX};
  background-color: ${input.default.backgroundColor};
  border: ${input.default.borderWidth} solid ${({ $hasError }) =>
    $hasError ? input.error.borderColor : input.default.borderColor
  };
  border-radius: ${input.default.borderRadius};
  font: ${input.default.font};
  color: ${input.default.textColor};
  cursor: pointer;
  transition: border-color ${duration.moderate} ${easing.standard},
              outline ${duration.moderate} ${easing.standard};
  
  &:hover:not(:disabled) {
    border-color: ${({ $hasError }) =>
      $hasError ? input.error.hover.borderColor : input.hover.borderColor
    };
  }
  
  &:focus {
    border-color: ${({ $hasError }) =>
      $hasError ? input.error.focus.borderColor : input.focus.borderColor
    };
    outline: ${input.focus.outline};
    outline-offset: ${border.focusOffset};
  }
  
  &:disabled {
    background-color: ${input.disabled.backgroundColor};
    color: ${input.disabled.textColor};
    border-color: ${input.disabled.borderColor};
    cursor: not-allowed;
  }
  
  ${({ $isOpen, $hasError }) => $isOpen && `
    border-color: ${$hasError ? input.error.focus.borderColor : input.focus.borderColor};
  `}
`

const DropdownIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  margin-left: ${space[200]};
  transition: transform ${duration.fast} ${easing.decelerate};
  
  ${({ $isOpen }) => $isOpen && `
    transform: rotate(180deg);
  `}

  ${reducedMotion} {
    transition: none;
  }
`

const DropdownMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: ${tokens.semantic.layer.dropdown};
  background-color: ${input.default.backgroundColor};
  /* A decorative outline: elevation separates the menu, and only the trigger is a control edge (decision 0025) */
  border: ${border.emphasis};
  border-radius: ${input.default.borderRadius};
  box-shadow: ${elevation.floating};
  margin-top: ${space[100]};
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : `translateY(-${tokens.semantic.motion.distance.sm})`)};
  transition: opacity ${duration.fast} ${easing.decelerate},
              visibility ${duration.fast} ${easing.decelerate},
              transform ${duration.fast} ${easing.decelerate};
  max-height: ${tokens.semantic.size.menu.maxHeight};
  overflow-y: auto;

  ${reducedMotion} {
    transform: none;
  }
`

const DropdownOption = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isSelected: boolean; $isFocused: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space[200]};
  box-sizing: border-box; /* the min-height includes the border, without relying on a global reset */
  min-height: ${controlHeight};
  padding: ${controlPaddingY} ${controlPaddingX};
  border: none;
  font: ${input.default.font};
  color: ${input.default.textColor};
  text-align: left;
  cursor: pointer;
  transition: background-color ${duration.fast} ${easing.decelerate}, color ${duration.fast} ${easing.decelerate};

  /* The shared row states (decisions 0029, 0030): focus shows the hover state in grey; only the
     selected option is light blue, with its text darkening with the fill */
  ${({ $isSelected, $isFocused }) => interactiveRow({ selected: $isSelected, focused: $isFocused })}
  
  &:focus {
    outline: none;
  }
  
  &:not(:last-child) {
    border-bottom: ${border.emphasis};
  }
`

const StyledHelperText = styled.div<{ $hasError?: boolean }>`
  font: ${field.helperText.typography};
  color: ${({ $hasError }) =>
    $hasError
      ? field.helperText.colorError
      : field.helperText.color
  };
  margin-top: ${space[200]};
`


export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className,
  label,
  helperText,
  error,
  'data-testid': dataTestId
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Generate unique ID for accessibility (SSR-safe)
  const dropdownId = useId()
  
  const selectedOption = options.find(option => option.id === value)
  
  const hasError = Boolean(error)
  const errorId = error ? `${dropdownId}-error` : undefined
  const helperId = helperText && !error ? `${dropdownId}-helper` : undefined
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Close dropdown on escape key and handle arrow navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          setFocusedIndex(-1)
          // Return focus to trigger button
          if (dropdownRef.current) {
            const trigger = dropdownRef.current.querySelector('button') as HTMLButtonElement
            trigger?.focus()
          }
          break
        
        case 'ArrowDown':
          event.preventDefault()
          setFocusedIndex(prev => {
            const newIndex = prev < options.length - 1 ? prev + 1 : 0
            return newIndex
          })
          break
        
        case 'ArrowUp':
          event.preventDefault()
          setFocusedIndex(prev => {
            const newIndex = prev > 0 ? prev - 1 : options.length - 1
            return newIndex
          })
          break
        
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            handleOptionClick(options[focusedIndex].id)
          }
          break
        
        case 'Home':
          event.preventDefault()
          setFocusedIndex(0)
          break
        
        case 'End':
          event.preventDefault()
          setFocusedIndex(options.length - 1)
          break
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
    
    return undefined
  }, [isOpen, focusedIndex, options])
  
  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (!isOpen) {
        // When opening, set focus to the currently selected option or first option
        const selectedIndex = options.findIndex(option => option.id === value)
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0)
      } else {
        // When closing, reset focus
        setFocusedIndex(-1)
      }
    }
  }
  
  const handleOptionClick = (optionId: string) => {
    onChange(optionId)
    setIsOpen(false)
    setFocusedIndex(-1)
  }
  
  return (
    <DropdownContainer ref={dropdownRef} className={className} data-testid={dataTestId}>
      {label && (
        <label htmlFor={dropdownId} style={{ display: 'block', marginBottom: space[200] }}>
          <Typography variant="label">{label}</Typography>
        </label>
      )}
      <DropdownTrigger
        id={dropdownId}
        $isOpen={isOpen}
        $hasError={hasError}
        onClick={handleTriggerClick}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={hasError}
        aria-describedby={describedBy}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <DropdownIcon $isOpen={isOpen}>
          <Icon name="arrowDown" iconColor={disabled ? 'disabled' : 'subdued'} />
        </DropdownIcon>
      </DropdownTrigger>
      
      <DropdownMenu $isOpen={isOpen} role="listbox" aria-labelledby={dropdownId}>{options.map((option, index) => (
          <DropdownOption
            key={option.id}
            $isSelected={option.id === value}
            $isFocused={index === focusedIndex}
            onClick={() => handleOptionClick(option.id)}
            role="option"
            aria-selected={option.id === value}
          >
            {option.label}
            {/* The selected state isn't conveyed by colour alone (P2); aria-selected carries it for
                assistive technology, so the checkmark is decorative */}
            {option.id === value && <Icon name="check" size="sm" iconColor="inherit" />}
          </DropdownOption>
        ))}
      </DropdownMenu>
      
      {error && (
        <StyledHelperText
          id={errorId}
          role="alert"
          aria-live="polite"
          $hasError={true}
        >
          {error}
        </StyledHelperText>
      )}
      
      {helperText && !error && (
        <StyledHelperText id={helperId}>
          {helperText}
        </StyledHelperText>
      )}
    </DropdownContainer>
  )
}
