import React, { useState, useRef, useEffect, useId } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Icon } from '../../atoms/Icon'
import { Typography } from '../../atoms/Typography'

const { base: { spacing, shadow, zIndex }, semantic: { color, typography, border }, component: { input } } = tokens

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
  padding: ${input.default.paddingY} ${input.default.paddingX};
  background-color: ${input.default.backgroundColor};
  border: ${input.default.borderWidth} solid ${({ $hasError }) =>
    $hasError ? input.error.borderColor : input.default.borderColor
  };
  border-radius: ${input.default.borderRadius};
  font: ${input.default.font};
  color: ${input.default.textColor};
  cursor: pointer;
  transition: border-color 200ms ease-in-out, 
              outline 200ms ease-in-out;
  
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
    outline-offset: ${input.focus.outlineOffset};
  }
  
  &:disabled {
    background-color: ${input.disabled.backgroundColor};
    color: ${input.disabled.textColor};
    border-color: ${input.disabled.borderColor};
    cursor: ${input.disabled.cursor};
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
  margin-left: ${spacing[2]};
  transition: transform 0.15s ease;
  
  ${({ $isOpen }) => $isOpen && `
    transform: rotate(180deg);
  `}
`

const DropdownMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: ${zIndex[3]};
  background-color: ${input.default.backgroundColor};
  border: ${input.default.borderWidth} solid ${input.default.borderColor};
  border-radius: ${input.default.borderRadius};
  box-shadow: ${shadow[3]};
  margin-top: ${spacing[1]};
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all 0.15s ease;
  max-height: 300px;
  overflow-y: auto;
`

const DropdownOption = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isSelected: boolean; $isFocused: boolean }>`
  width: 100%;
  display: block;
  padding: ${input.default.paddingY} ${input.default.paddingX};
  background-color: ${({ $isSelected, $isFocused }) => {
    if ($isFocused) return color.background.surface
    if ($isSelected) return color.background.surface
    return 'transparent'
  }};
  border: none;
  font: ${input.default.font};
  color: ${input.default.textColor};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;
  
  &:hover {
    background-color: ${color.background.surface};
  }
  
  &:focus {
    outline: none;
    background-color: ${color.background.surface};
  }
  
  &:not(:last-child) {
    border-bottom: ${border.subtle};
  }
`

const StyledHelperText = styled.div<{ $hasError?: boolean }>`
  font: ${typography.caption};
  color: ${({ $hasError }) => 
    $hasError 
      ? color.text.error 
      : color.text.subdued
  };
  margin-top: ${spacing[2]};
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
  error
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
    <DropdownContainer ref={dropdownRef} className={className}>
      {label && (
        <label htmlFor={dropdownId} style={{ display: 'block', marginBottom: spacing[2] }}>
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
