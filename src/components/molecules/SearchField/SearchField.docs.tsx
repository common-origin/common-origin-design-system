import type { ComponentDocumentation } from '@/lib/docgen/types'
import { SearchField } from './SearchField'
import { Stack } from '../../atoms/Stack/Stack'
import { Typography } from '../../atoms/Typography/Typography'
import { useState } from 'react'
import type { Suggestion } from './SearchField'

export const searchFieldDocs: ComponentDocumentation = {
  id: 'search-field',
  name: 'SearchField',
  description: 'A search input with autocomplete, suggestions, and recent searches. Includes debouncing and full keyboard navigation support.',
  category: 'Molecules',
  
  props: [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Current search value (controlled component)'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: true,
      description: 'Callback when the search value changes'
    },
    {
      name: 'suggestions',
      type: 'Suggestion[]',
      required: false,
      description: 'Array of suggestion objects to display when user types. Each suggestion has id, label, optional description and category.'
    },
    {
      name: 'showRecentSearches',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to show recent searches when input is empty'
    },
    {
      name: 'recentSearches',
      type: 'string[]',
      required: false,
      description: 'Array of recent search terms to display when input is empty'
    },
    {
      name: 'onSuggestionSelect',
      type: '(suggestion: Suggestion | string) => void',
      required: false,
      description: 'Callback when a suggestion or recent search is selected. Receives either a Suggestion object or string.'
    },
    {
      name: 'onClearRecentSearches',
      type: '() => void',
      required: false,
      description: 'Callback to clear recent searches. When provided, shows "Clear recent searches" button.'
    },
    {
      name: 'debounceMs',
      type: 'number',
      required: false,
      default: '300',
      description: 'Debounce delay in milliseconds for internal value updates'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: '"Search..."',
      description: 'Placeholder text shown when input is empty'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the search field is disabled'
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether to show loading indicator (refresh icon)'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: '"Search"',
      description: 'Accessible label for screen readers'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for automated testing'
    }
  ],
  
  tokens: [
    'base.spacing.2',
    'base.spacing.3',
    'semantic.color.background.subtle',
    'semantic.color.background.surface',
    'semantic.color.background.interactive-subtle',
    'semantic.color.border.default',
    'semantic.color.border.interactive',
    'semantic.color.border.strong',
    'semantic.color.text.default',
    'semantic.color.text.subdued',
    'semantic.color.text.disabled',
    'semantic.color.text.interactive',
    'semantic.color.icon.subdued',
    'semantic.color.icon.default',
    'base.border.width.1',
    'base.border.width.2',
    'base.border.radius.2',
    'base.border.radius.3',
    'semantic.typography.body',
    'semantic.typography.caption',
    'semantic.typography.small',
    'semantic.motion.hover',
    'base.shadow.3'
  ],
  
  examples: [
    {
      name: 'Basic Search with Suggestions',
      description: 'Search field with autocomplete suggestions showing label and description',
      code: `const [search, setSearch] = useState('')
const suggestions = [
  { id: '1', label: 'Apple', description: 'A sweet fruit', category: 'Fruit' },
  { id: '2', label: 'Banana', description: 'A yellow fruit', category: 'Fruit' },
  { id: '3', label: 'Carrot', description: 'A root vegetable', category: 'Vegetable' }
]

<SearchField
  value={search}
  onChange={setSearch}
  suggestions={suggestions}
  onSuggestionSelect={(item) => {
    console.log('Selected:', item)
  }}
/>`,
      renderComponent: () => {
        const [search, setSearch] = useState('')
        const suggestions: Suggestion[] = [
          { id: '1', label: 'Apple', description: 'A sweet fruit', category: 'Fruit' },
          { id: '2', label: 'Banana', description: 'A yellow fruit', category: 'Fruit' },
          { id: '3', label: 'Carrot', description: 'A root vegetable', category: 'Vegetable' }
        ]
        
        return (
          <SearchField
            value={search}
            onChange={setSearch}
            suggestions={suggestions}
            onSuggestionSelect={(item) => {
              if (typeof item === 'string') {
                setSearch(item)
              } else {
                setSearch(item.label)
              }
            }}
          />
        )
      }
    },
    {
      name: 'Recent Searches',
      description: 'Showing recent search history when input is empty',
      code: `const [search, setSearch] = useState('')
const recentSearches = ['coffee', 'tea', 'chocolate']

<SearchField
  value={search}
  onChange={setSearch}
  recentSearches={recentSearches}
  showRecentSearches={true}
  onClearRecentSearches={() => {
    // Clear recent searches from storage
  }}
/>`,
      renderComponent: () => {
        const [search, setSearch] = useState('')
        const [recent, setRecent] = useState(['coffee', 'tea', 'chocolate'])
        
        return (
          <div>
            <Stack direction="column" gap="sm">
              <Typography variant="body">
                Clear the search to see recent searches
              </Typography>
            </Stack>
            <SearchField
              value={search}
              onChange={setSearch}
              recentSearches={recent}
              showRecentSearches={true}
              onClearRecentSearches={() => setRecent([])}
              onSuggestionSelect={(item) => {
                setSearch(typeof item === 'string' ? item : item.label)
              }}
            />
          </div>
        )
      }
    },
    {
      name: 'Debounced Search with Loading',
      description: 'Implementing debounced API calls with loading indicator',
      code: `const [search, setSearch] = useState('')
const [loading, setLoading] = useState(false)
const [suggestions, setSuggestions] = useState([])

useEffect(() => {
  if (search.length >= 2) {
    setLoading(true)
    // Debounced API call happens internally
    setTimeout(() => {
      // Simulate API response
      setSuggestions([
        { id: '1', label: \`Result for "\${search}"\` }
      ])
      setLoading(false)
    }, 500)
  }
}, [search])

<SearchField
  value={search}
  onChange={setSearch}
  suggestions={suggestions}
  loading={loading}
  debounceMs={300}
/>`,
      renderComponent: () => {
        const [search, setSearch] = useState('')
        const [loading, setLoading] = useState(false)
        const [suggestions, setSuggestions] = useState<Suggestion[]>([])
        
        // Simulate API call
        const handleSearch = (value: string) => {
          setSearch(value)
          if (value.length >= 2) {
            setLoading(true)
            setTimeout(() => {
              setSuggestions([
                { id: '1', label: `Result for "${value}"`, description: 'Search result' }
              ])
              setLoading(false)
            }, 500)
          } else {
            setSuggestions([])
          }
        }
        
        return (
          <div>
            <div style={{ marginBottom: '8px' }}>
              <Typography variant="caption" color="subdued">
                Type at least 2 characters to see results
              </Typography>
            </div>
            <SearchField
              value={search}
              onChange={handleSearch}
              suggestions={suggestions}
              loading={loading}
              debounceMs={300}
              placeholder="Search products..."
            />
          </div>
        )
      }
    },
    {
      name: 'Keyboard Navigation',
      description: 'Full keyboard support with arrow keys, Enter, and Escape',
      code: `<SearchField
  value={search}
  onChange={setSearch}
  suggestions={suggestions}
  onSuggestionSelect={(item) => {
    // Handle selection
  }}
/>

// Keyboard shortcuts:
// - ArrowDown: Navigate to next suggestion
// - ArrowUp: Navigate to previous suggestion  
// - Enter: Select highlighted suggestion
// - Escape: Close suggestions dropdown`,
      renderComponent: () => {
        const [search, setSearch] = useState('')
        const fruits: Suggestion[] = [
          { id: '1', label: 'Apple', description: 'Use arrows to navigate' },
          { id: '2', label: 'Banana', description: 'Press Enter to select' },
          { id: '3', label: 'Cherry', description: 'Press Escape to close' },
          { id: '4', label: 'Date', description: 'Fully accessible' }
        ]
        
        return (
          <div>
            <div style={{ marginBottom: '8px' }}>
              <Typography variant="caption" color="subdued">
                Focus and use arrow keys, Enter, or Escape
              </Typography>
            </div>
            <SearchField
              value={search}
              onChange={setSearch}
              suggestions={fruits}
              onSuggestionSelect={(item) => {
                if (typeof item !== 'string') {
                  setSearch(item.label)
                }
              }}
            />
          </div>
        )
      }
    },
    {
      name: 'Disabled State',
      description: 'Search field in disabled state',
      code: `<SearchField
  value="Cannot edit this"
  onChange={() => {}}
  disabled={true}
/>`,
      renderComponent: () => (
        <SearchField
          value="Cannot edit this"
          onChange={() => {}}
          disabled={true}
        />
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Implements WAI-ARIA combobox pattern with role="combobox"',
      'Suggestions listbox has role="listbox" with individual role="option" items',
      'Uses aria-activedescendant to announce highlighted suggestion',
      'aria-expanded indicates when suggestions dropdown is open',
      'aria-autocomplete="list" indicates autocomplete behavior',
      'Clear button has aria-label="Clear search" for screen readers',
      'Loading indicator announced with aria-label="Loading"',
      'Full keyboard navigation with arrow keys, Enter, and Escape',
      'Focus remains on input during keyboard navigation (aria-activedescendant pattern)',
      'Recent searches announced as "Recent Searches" section header'
    ],
    keyboardNavigation: 'ArrowDown and ArrowUp navigate suggestions, Enter selects highlighted suggestion, Escape closes dropdown',
    screenReader: 'Announces "Search combobox", suggestions count, highlighted suggestion via aria-activedescendant, and selection changes'
  },
  
  anatomy: {
    description: 'SearchField consists of an input wrapper with search icon, text input, optional loading indicator, clear button, and suggestions dropdown.',
    parts: [
      {
        name: 'Search Container',
        description: 'Root wrapper providing positioning context for absolute dropdown',
        tokens: []
      },
      {
        name: 'Input Wrapper',
        description: 'Visual container with border, padding, background, and focus states',
        tokens: [
          'semantic.color.background.subtle',
          'semantic.color.border.default',
          'base.border.radius.3',
          'base.spacing.2',
          'base.spacing.3'
        ]
      },
      {
        name: 'Search Icon',
        description: 'Leading search icon (decorative, aria-hidden)',
        tokens: ['semantic.color.icon.subdued']
      },
      {
        name: 'Text Input',
        description: 'Input element with combobox role and ARIA attributes',
        tokens: [
          'semantic.typography.body',
          'semantic.color.text.default'
        ]
      },
      {
        name: 'Loading Indicator',
        description: 'Optional refresh icon shown during async operations',
        tokens: ['semantic.color.icon.subdued']
      },
      {
        name: 'Clear Button',
        description: 'Close icon button to clear search value',
        tokens: [
          'semantic.color.icon.subdued',
          'base.border.radius.2'
        ]
      },
      {
        name: 'Suggestions Listbox',
        description: 'Dropdown container with scrollable list of suggestions',
        tokens: [
          'semantic.color.background.subtle',
          'semantic.color.border.default',
          'base.border.radius.3',
          'base.shadow.3'
        ]
      },
      {
        name: 'Suggestion Item',
        description: 'Individual option with label, optional description, and hover state',
        tokens: [
          'semantic.color.background.interactive-subtle',
          'semantic.typography.body',
          'semantic.typography.caption'
        ]
      },
      {
        name: 'Recent Searches Section',
        description: 'Header and items for recent search history',
        tokens: [
          'semantic.color.text.subdued',
          'semantic.typography.caption'
        ]
      }
    ]
  }
}
