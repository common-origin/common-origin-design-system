import { DataViewPattern } from './DataViewPattern'
import { DataViewQuickFiltersPattern } from './DataViewQuickFiltersPattern'

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
  {
    id: 'data-view-quick-filters',
    name: 'Data View with Quick Filters',
    description: 'Responsive data display with boolean chip quick filters for instant, simple filtering without advanced controls.',
    category: 'Data Display',
    complexity: 'Moderate',
    status: 'Draft',
    component: DataViewQuickFiltersPattern,
    overview: 'The Data View with Quick Filters pattern provides a streamlined approach to data filtering using boolean chips that toggle on/off instantly. Unlike dropdown-based filtering, quick filters immediately affect the displayed data without requiring a drawer or "Apply" action. This creates a simpler, more immediate user experience ideal for straightforward filtering needs.',
    keyFeatures: [
      'Boolean Quick Filters: Toggle filters on/off with BooleanChip components',
      'Instant Filtering: Data updates immediately when filters are toggled',
      'No Drawer Required: All filters visible inline, no side drawer or bottom sheet',
      'Active Filter Count: Items count displays number of active filters',
      'Responsive Layout: Table view on desktop, card list on mobile',
      'Search Functionality: Text-based search with real-time filtering',
      'Export & Column Controls: Desktop-only action buttons for data export and column visibility',
      'Pagination: Page-based navigation with visual indicators and item counts',
      'Accessibility: Full keyboard navigation, screen reader support, and ARIA labels',
    ],
    useCases: [
      'Simple datasets with 3-5 common filter criteria',
      'Quick status toggles (Active/Inactive, Complete/Incomplete)',
      'Dashboard views where users need rapid filter changes',
      'Mobile-first applications requiring simple filtering',
      'Any interface where filter simplicity is prioritized over advanced options',
    ],
    componentsUsed: [
      'Container',
      'Stack',
      'Typography',
      'Button',
      'BooleanChip',
      'IconButton',
      'Box',
    ],
    implementationNotes: [
      {
        title: 'Instant Filter Application',
        description: 'Unlike dropdown-based filters, boolean chips apply immediately when toggled. Each chip maintains its own state (on/off) and triggers data filtering directly without requiring an "Apply" button. This creates a more responsive feel but is best suited for simpler filtering scenarios.',
      },
      {
        title: 'When to Use Quick Filters vs. Dropdowns',
        description: 'Use quick filters when you have 3-5 common filter criteria that users toggle frequently. Use dropdown filters (side drawer pattern) when you have complex filtering needs, many filter options, or mutually exclusive choices. Quick filters excel at speed and simplicity; dropdowns excel at power and flexibility.',
      },
      {
        title: 'Filter State Management',
        description: 'Each boolean chip maintains independent state. Multiple filters can be active simultaneously, creating AND conditions. The active filter count is displayed in the items count to help users understand what filters are applied without visual clutter.',
      },
      {
        title: 'Responsive Behavior',
        description: 'Desktop shows all quick filters inline with the filter row. Mobile wraps filters naturally to the next line, maintaining visibility without collapsing into a drawer. Table view switches to card-based list view on smaller screens for optimal mobile readability.',
      },
    ],
  },
]
