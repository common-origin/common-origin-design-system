import { DataViewPattern } from './DataViewPattern'

export interface PatternMetadata {
  id: string
  name: string
  description: string
  category: 'Data Display' | 'Navigation' | 'Forms' | 'Feedback' | 'Layout'
  complexity: 'Simple' | 'Moderate' | 'Complex'
  status: 'Draft' | 'Review' | 'Complete'
  component: React.ComponentType
  overview: string
  keyFeatures: string[]
  useCases: string[]
  componentsUsed: string[]
  implementationNotes: {
    title: string
    description: string
  }[]
}

export const patternsData: PatternMetadata[] = [
  {
    id: 'data-view',
    name: 'Data View',
    description: 'Responsive data display with dropdown-based filtering, showing applied filters as dismissible chips with overflow detection.',
    category: 'Data Display',
    complexity: 'Moderate',
    status: 'Draft',
    component: DataViewPattern,
    overview: 'The Data View pattern provides a responsive approach to displaying tabular data with powerful dropdown-based filtering. Applied filters are shown as dismissible chips in a dedicated filter row with automatic overflow detection that displays a "+X more" indicator when space is limited. On larger screens, data is presented in a traditional table format; on smaller screens, it transforms into a card-based list view.',
    keyFeatures: [
      'Dropdown Filters: Side drawer with category, status, and priority dropdown filters',
      'Filter Chips: Applied filters shown as dismissible FilterChip components with remove functionality',
      'Dynamic Overflow Detection: ResizeObserver-based detection shows "+X more" indicator when chips overflow',
      'Staged Filter Application: Users select values in drawer and click "Apply" to activate filters',
      'Responsive Layout: Automatically transitions between table and list views based on viewport',
      'Search Functionality: Text-based search with real-time filtering',
      'Export & Column Controls: Desktop-only action buttons for data export and column visibility',
      'Pagination: Page-based navigation with visual indicators and item counts',
      'Accessibility: Full keyboard navigation, screen reader support, and ARIA labels',
    ],
    useCases: [
      'Product catalogs with category and status filtering',
      'Task management dashboards with priority and status filters',
      'User management interfaces with role and status filtering',
      'Transaction histories with date and type filtering',
      'Any dataset requiring multiple filter criteria across devices',
    ],
    componentsUsed: [
      'Container',
      'Stack',
      'Typography',
      'Button',
      'FilterChip',
      'Dropdown',
      'IconButton',
      'Divider',
      'Box',
    ],
    implementationNotes: [
      {
        title: 'Staged Filter Application',
        description: 'Dropdown filters use a staged approach: users select values from dropdowns in the side drawer, but filters are only applied when they click "Apply Filters". This allows users to make multiple selections before committing them. Filter chips only appear in the filter row after applying.',
      },
      {
        title: 'Dynamic Overflow Detection',
        description: 'Uses ResizeObserver to detect when filter chips overflow their container. When overflow is detected, the system calculates how many chips are hidden using getBoundingClientRect() and displays a "+X more" indicator. On mobile, chips scroll horizontally with hidden scrollbar.',
      },
      {
        title: 'Filter Synchronization',
        description: 'When a filter chip is removed via the × button, the corresponding dropdown selection is automatically cleared in the drawer. The "Clear All" button in the drawer removes all active filters and resets all dropdown selections simultaneously.',
      },
      {
        title: 'Responsive Behavior',
        description: 'Desktop shows table view with export/column controls. Mobile switches to card-based list view with horizontal-scrolling filter chips. The "All filters" button opens a drawer on all screen sizes, positioned as a side panel on desktop and bottom sheet on mobile.',
      },
    ],
  },
]
