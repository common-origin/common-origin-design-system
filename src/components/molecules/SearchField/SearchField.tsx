import { 
  useState, 
  useRef, 
  useEffect, 
  useMemo, 
  KeyboardEvent, 
  ChangeEvent, 
  FocusEvent,
  InputHTMLAttributes,
  forwardRef
} from 'react'
import styled from 'styled-components'
import { Icon } from '../../atoms/Icon/Icon'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Stack } from '../../atoms/Stack/Stack'
import { Typography } from '../../atoms/Typography/Typography'
import { ListItem } from '../List/ListItem'
import tokens from '@/styles/tokens.json'

const { semantic, base, component } = tokens

/**
 * Suggestion item for autocomplete
 */
export interface Suggestion {
  /**
   * Unique identifier
   */
  id: string
  
  /**
   * Display text
   */
  label: string
  
  /**
   * Optional secondary text
   */
  description?: string
  
  /**
   * Optional category for grouping
   */
  category?: string
}

/**
 * Props for the SearchField component
 */
export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Current search value
   */
  value: string
  
  /**
   * Callback when value changes
   */
  onChange: (value: string) => void
  
  /**
   * Suggestions to display
   */
  suggestions?: Suggestion[]
  
  /**
   * Whether to show recent searches
   * @default true
   */
  showRecentSearches?: boolean
  
  /**
   * Array of recent search terms
   */
  recentSearches?: string[]
  
  /**
   * Callback when a suggestion is selected
   */
  onSuggestionSelect?: (suggestion: Suggestion | string) => void
  
  /**
   * Callback to clear recent searches
   */
  onClearRecentSearches?: () => void
  
  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceMs?: number
  
  /**
   * Placeholder text
   * @default 'Search...'
   */
  placeholder?: string
  
  /**
   * Whether the field is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean
  
  /**
   * Accessible label
   */
  'aria-label'?: string
  
  /**
   * Test identifier
   */
  'data-testid'?: string
}

interface StyledSearchContainerProps {
  $isFocused: boolean
  $disabled: boolean
}

interface StyledSuggestionItemProps {
  $isHighlighted: boolean
  $isRecent: boolean
}

const StyledSearchContainer = styled.div<StyledSearchContainerProps>`
  position: relative;
  width: 100%;
`

const StyledInputWrapper = styled.div<StyledSearchContainerProps>`
  display: flex;
  align-items: center;
  gap: ${base.spacing[2]};
  padding: ${base.spacing[2]} ${base.spacing[3]};
  background-color: ${component.input.default.backgroundColor};
  border: ${component.input.default.borderWidth} solid ${component.input.default.borderColor};
  border-radius: ${component.input.default.borderRadius};
  transition: border-color 200ms ease-in-out, outline 200ms ease-in-out;
  
  ${props => props.$isFocused && `
    border-color: ${component.input.focus.borderColor};
    outline: ${component.input.focus.outline};
    outline-offset: ${component.input.focus.outlineOffset};
  `}
  
  ${props => props.$disabled && `
    background-color: ${component.input.disabled.backgroundColor};
    border-color: ${component.input.disabled.borderColor};
    cursor: not-allowed;
  `}
  
  &:hover:not([data-disabled='true']) {
    border-color: ${component.input.hover.borderColor};
  }
`

const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font: ${semantic.typography.body};
  color: ${semantic.color.text.default};
  outline: none;
  
  &::placeholder {
    color: ${semantic.color.text.subdued};
  }
  
  &:disabled {
    color: ${semantic.color.text.disabled};
    cursor: not-allowed;
  }
`

const StyledSuggestionsList = styled.ul`
  position: absolute;
  top: calc(100% + ${base.spacing[1]});
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background-color: ${semantic.color.background.subtle};
  border: ${base.border.width[1]} solid ${semantic.color.border.default};
  border-radius: ${base.border.radius[3]};
  box-shadow: ${base.shadow[3]};
  list-style: none;
  padding: ${base.spacing[1]} 0;
  margin: 0;
  z-index: 1000;
`

const StyledSectionHeader = styled.div`
  padding: ${base.spacing[2]} ${base.spacing[3]};
  font: ${semantic.typography.caption};
  color: ${semantic.color.text.subdued};
  text-transform: uppercase;
  letter-spacing: ${base.letterSpacing[4]};
`

const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * SearchField component with autocomplete and recent searches
 * 
 * Provides intelligent search with debouncing, keyboard navigation,
 * suggestions, and recent search history. Fully accessible with ARIA.
 * 
 * @example
 * ```tsx
 * const [search, setSearch] = useState('')
 * const [suggestions] = useState([
 *   { id: '1', label: 'Apple', category: 'Fruit' },
 *   { id: '2', label: 'Banana', category: 'Fruit' }
 * ])
 * 
 * <SearchField
 *   value={search}
 *   onChange={setSearch}
 *   suggestions={suggestions}
 *   recentSearches={['coffee', 'tea']}
 *   onSuggestionSelect={(item) => console.log('Selected:', item)}
 * />
 * ```
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      value,
      onChange,
      suggestions = [],
      showRecentSearches = true,
      recentSearches = [],
      onSuggestionSelect,
      onClearRecentSearches,
      debounceMs = 300,
      placeholder = 'Search...',
      disabled = false,
      loading = false,
      'aria-label': ariaLabel = 'Search',
      'data-testid': dataTestId,
      ...inputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [debouncedValue, setDebouncedValue] = useState(value)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLUListElement>(null)
    
    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current)
        } else {
          ref.current = inputRef.current
        }
      }
    }, [ref])
    
    // Debounced search
    const debouncedOnChange = useMemo(
      () =>
        debounce((newValue: string) => {
          setDebouncedValue(newValue)
        }, debounceMs),
      [debounceMs]
    )
    
    useEffect(() => {
      debouncedOnChange(value)
    }, [value, debouncedOnChange])
    
    // Combined list of suggestions and recent searches
    const displayItems = useMemo(() => {
      const items: Array<{ type: 'suggestion' | 'recent' | 'clear'; data: Suggestion | string }> = []
      
      if (value.trim()) {
        // Show matching suggestions
        suggestions.forEach(s => items.push({ type: 'suggestion', data: s }))
      } else if (showRecentSearches && recentSearches.length > 0) {
        // Show recent searches when empty
        recentSearches.forEach(r => items.push({ type: 'recent', data: r }))
        if (onClearRecentSearches) {
          items.push({ type: 'clear', data: 'clear' })
        }
      }
      
      return items
    }, [value, suggestions, recentSearches, showRecentSearches, onClearRecentSearches])
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue)
      setShowSuggestions(true)
      setHighlightedIndex(-1)
    }
    
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      setShowSuggestions(true)
      inputProps.onFocus?.(e)
    }
    
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      // Delay to allow click events on suggestions
      setTimeout(() => {
        setIsFocused(false)
        setShowSuggestions(false)
        setHighlightedIndex(-1)
      }, 200)
      inputProps.onBlur?.(e)
    }
    
    const handleSuggestionClick = (item: typeof displayItems[0]) => {
      if (item.type === 'clear') {
        onClearRecentSearches?.()
        return
      }
      
      const suggestion = item.data
      if (typeof suggestion === 'string') {
        onChange(suggestion)
        onSuggestionSelect?.(suggestion)
      } else {
        onChange(suggestion.label)
        onSuggestionSelect?.(suggestion)
      }
      setShowSuggestions(false)
      inputRef.current?.focus()
    }
    
    const handleClear = () => {
      onChange('')
      setShowSuggestions(false)
      inputRef.current?.focus()
    }
    
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestions || displayItems.length === 0) return
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(prev =>
            prev < displayItems.length - 1 ? prev + 1 : prev
          )
          break
          
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1))
          break
          
        case 'Enter':
          e.preventDefault()
          if (highlightedIndex >= 0 && highlightedIndex < displayItems.length) {
            handleSuggestionClick(displayItems[highlightedIndex])
          }
          break
          
        case 'Escape':
          e.preventDefault()
          setShowSuggestions(false)
          setHighlightedIndex(-1)
          break
      }
      
      inputProps.onKeyDown?.(e)
    }
    
    // Scroll highlighted item into view
    useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const items = listRef.current.querySelectorAll('li')
        items[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
      }
    }, [highlightedIndex])
    
    const showClearButton = value.length > 0 && !disabled
    const hasItems = displayItems.length > 0
    
    return (
      <StyledSearchContainer
        $isFocused={isFocused}
        $disabled={disabled}
        data-testid={dataTestId}
      >
        <StyledInputWrapper 
          $isFocused={isFocused} 
          $disabled={disabled}
          data-disabled={disabled}
        >
          <Icon
            name="search"
            size="sm"
            iconColor="subdued"
            aria-hidden="true"
          />
          
          <StyledInput
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-autocomplete="list"
            aria-controls={showSuggestions && hasItems ? 'search-suggestions' : undefined}
            aria-expanded={showSuggestions && hasItems}
            aria-activedescendant={
              highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
            }
            role="combobox"
            {...inputProps}
          />
          
          {loading && (
            <Icon
              name="refresh"
              size="sm"
              iconColor="subdued"
              aria-label="Loading"
            />
          )}
          
          {showClearButton && (
            <IconButton
              iconName="close"
              size="small"
              variant="naked"
              onClick={handleClear}
              aria-label="Clear search"
              tabIndex={-1}
            />
          )}
        </StyledInputWrapper>
        
        {showSuggestions && hasItems && (
          <StyledSuggestionsList
            ref={listRef}
            id="search-suggestions"
            role="listbox"
          >
            {!value.trim() && showRecentSearches && recentSearches.length > 0 && (
              <StyledSectionHeader>Recent Searches</StyledSectionHeader>
            )}
            
            {displayItems.map((item, index) => {
              if (item.type === 'clear') {
                return (
                  <ListItem
                    key="clear"
                    role="option"
                    primary="Clear recent searches"
                    interactive
                    spacing="compact"
                    onClick={() => handleSuggestionClick(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleSuggestionClick(item)
                      }
                    }}
                  />
                )
              }
              
              const suggestion = item.data
              const isString = typeof suggestion === 'string'
              const label = isString ? suggestion : suggestion.label
              const description = !isString ? suggestion.description : undefined
              
              return (
                <ListItem
                  key={isString ? suggestion : suggestion.id}
                  id={`suggestion-${index}`}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  primary={label}
                  secondary={description}
                  icon={item.type === 'recent' ? <Icon name="refresh" size="xs" aria-hidden="true" /> : undefined}
                  interactive
                  selected={index === highlightedIndex}
                  spacing="compact"
                  onClick={() => handleSuggestionClick(item)}
                />
              )
            })}
          </StyledSuggestionsList>
        )}
      </StyledSearchContainer>
    )
  }
)

SearchField.displayName = 'SearchField'
