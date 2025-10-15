import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Icon } from '../../atoms/Icon'
import { Typography } from '../../atoms/Typography'

const { base: { spacing, shadow, zIndex }, semantic: { color, typography, border } } = tokens

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
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`

const DropdownTrigger = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[3]} ${spacing[4]};
  background-color: ${color.background.default};
  border: ${border.default};
  border-radius: ${tokens.base.border.radius[2]};
  font: ${typography.body};
  color: ${color.text.default};
  cursor: pointer;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: ${color.background.surface};
    border-color: ${color.border.strong};
  }
  
  &:focus {
    outline: ${tokens.semantic.border.focus};
    outline-offset: 2px;
  }
  
  &:disabled {
    background-color: ${color.background.disabled};
    color: ${color.text.disabled};
    cursor: not-allowed;
    border-color: ${color.border.subtle};
  }
  
  ${({ $isOpen }) => $isOpen && `
    background-color: ${color.background.surface};
    border-color: ${color.border.strong};
  `}
`

const DropdownIcon = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  margin-left: ${spacing[2]};
  transition: transform 0.15s ease;
  
  ${({ $isOpen }) => $isOpen && `
    transform: rotate(180deg);
  `}
`

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: ${zIndex[3]};
  background-color: ${color.background.default};
  border: ${border.default};
  border-radius: ${tokens.base.border.radius[2]};
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

const DropdownOption = styled.button<{ $isSelected: boolean; $isFocused: boolean }>`
  width: 100%;
  display: block;
  padding: ${spacing[3]} ${spacing[4]};
  background-color: ${({ $isSelected, $isFocused }) => {
    if ($isFocused) return color.background.surface
    if ($isSelected) return color.background.surface
    return 'transparent'
  }};
  border: none;
  font: ${typography.body};
  color: ${color.text.default};
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

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Generate unique ID for accessibility
  const dropdownId = useRef(`dropdown-${Math.random().toString(36).substr(2, 9)}`).current
  
  const selectedOption = options.find(option => option.id === value)
  
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
        onClick={handleTriggerClick}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <DropdownIcon $isOpen={isOpen}>
          <Icon name="arrowDown" iconColor={disabled ? 'disabled' : 'subdued'} />
        </DropdownIcon>
      </DropdownTrigger>
      
      <DropdownMenu $isOpen={isOpen} role="listbox">{options.map((option, index) => (
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
    </DropdownContainer>
  )
}
