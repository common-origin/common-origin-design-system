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
    description: 'Responsive data display with unified filter row showing both quick filters and applied dropdown filters with visual separators.',
    category: 'Data Display',
    complexity: 'Moderate',
    status: 'Draft',
    component: DataViewPattern,
    overview: 'The Data View pattern provides a responsive approach to displaying tabular data with rich filtering capabilities. All active filters (both quick boolean chips and dropdown selections) appear together in a single unified filter row, separated by vertical dividers for clear visual organization. On larger screens, data is presented in a traditional table format; on smaller screens, it transforms into a card-based list view.',
    keyFeatures: [
      'Unified Filter Row: All active filters displayed together with vertical dividers for organization',
      'Quick Filters: Boolean chips for rapid status filtering (Active, Pending, Completed)',
      'Dropdown Filters: Side drawer with category, status, and priority dropdown filters',
      'Filter Chips: Applied dropdown filters shown as dismissible chips inline with quick filters',
      'Clear All: Single button to reset all filters (quick filters and dropdown selections)',
      'Responsive Layout: Automatically transitions between table and list views based on viewport',
      'Search Functionality: Text-based search with real-time filtering',
      'Pagination: Page-based navigation with visual indicators',
      'Accessibility: Full keyboard navigation and screen reader support',
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
      'BooleanChip',
      'Dropdown',
      'IconButton',
      'Divider',
      'Box',
    ],
    implementationNotes: [
      {
        title: 'Unified Filter Display',
        description: 'All filters appear in a single row, separated by vertical dividers. Quick filters (BooleanChip) appear first, followed by applied dropdown filters (FilterChipContainer), and finally a "Clear all" button. This creates a cohesive filtering experience where users can see all active filters at a glance.',
      },
      {
        title: 'Staged Filter Application',
        description: 'Dropdown filters use a staged approach: users select values from dropdowns in the side drawer, but filters are only applied when they click "Apply Filters". This allows users to make multiple selections before applying them all at once. Filter chips only appear in the unified filter row after the "Apply Filters" button is clicked.',
      },
      {
        title: 'Filter Synchronization',
        description: 'When a filter chip is removed via the × button, the corresponding dropdown selection is automatically cleared. The "Clear All" button removes all active filters (both quick filters and dropdown selections) and closes the drawer.',
      },
    ],
  },
]
