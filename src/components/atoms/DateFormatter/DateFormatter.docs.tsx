import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { DateFormatter } from './DateFormatter'

export const dateFormatterDocs: ComponentDocumentation = {
  id: 'date-formatter',
  name: 'DateFormatter',
  description: 'Utility atom for consistent date formatting throughout the application. Uses date-fns for reliable parsing and formatting of ISO date strings with customizable format patterns.',
  category: 'Atoms',
  
  props: [
    {
      name: 'dateString',
      type: 'string',
      required: true,
      description: 'ISO 8601 date string to be formatted (e.g., "2023-12-25T10:30:00.000Z")'
    },
    {
      name: 'formatString',
      type: 'string',
      required: false,
      default: "'yyyy'",
      description: 'Date-fns format pattern string (e.g., "MMM dd, yyyy", "HH:mm", "yyyy-MM-dd"). Used in absolute mode or as fallback in smart mode.'
    },
    {
      name: 'mode',
      type: "'absolute' | 'relative' | 'smart'",
      required: false,
      default: "'absolute'",
      description: 'Date formatting mode: "absolute" always uses formatString, "relative" shows "Today"/"Yesterday"/day names for recent dates, "smart" uses relative for recent dates and absolute for older dates'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for automated testing'
    }
  ],

  tokens: [
    'semantic.typography.label',
    'semantic.color.text.subdued'
  ],

  examples: [
    {
      name: 'Default Year Format',
      description: 'Simple year display using default format.',
      code: `<DateFormatter dateString="2023-12-25T10:30:00.000Z" />`,
      renderComponent: () => (
        <DateFormatter dateString="2023-12-25T10:30:00.000Z" />
      )
    },
    {
      name: 'Full Date Format',
      description: 'Complete date with month, day, and year.',
      code: `<DateFormatter 
  dateString="2023-12-25T10:30:00.000Z" 
  formatString="MMM dd, yyyy" 
/>`,
      renderComponent: () => (
        <DateFormatter 
          dateString="2023-12-25T10:30:00.000Z" 
          formatString="MMM dd, yyyy" 
        />
      )
    },
    {
      name: 'Time Format',
      description: 'Display time portion of datetime.',
      code: `<DateFormatter 
  dateString="2023-12-25T14:30:00.000Z" 
  formatString="HH:mm" 
/>`,
      renderComponent: () => (
        <DateFormatter 
          dateString="2023-12-25T14:30:00.000Z" 
          formatString="HH:mm" 
        />
      )
    },
    {
      name: 'Custom Format',
      description: 'European date format example.',
      code: `<DateFormatter 
  dateString="2023-12-25T10:30:00.000Z" 
  formatString="dd/MM/yyyy" 
/>`,
      renderComponent: () => (
        <DateFormatter 
          dateString="2023-12-25T10:30:00.000Z" 
          formatString="dd/MM/yyyy" 
        />
      )
    },
    {
      name: 'Relative Date Format',
      description: 'Using date-fns relative format tokens.',
      code: `<DateFormatter 
  dateString="2023-12-25T10:30:00.000Z" 
  formatString="EEEE, MMMM do, yyyy" 
/>`,
      renderComponent: () => (
        <DateFormatter 
          dateString="2023-12-25T10:30:00.000Z" 
          formatString="EEEE, MMMM do, yyyy" 
        />
      )
    },
    {
      name: 'Smart Mode - Recent Date',
      description: 'Smart mode shows "Today" for current date.',
      code: `<DateFormatter 
  dateString={new Date().toISOString()} 
  mode="smart" 
/>`,
      renderComponent: () => (
        <DateFormatter 
          dateString={new Date().toISOString()} 
          mode="smart" 
        />
      )
    },
    {
      name: 'Smart Mode - Old Date',
      description: 'Smart mode uses formatted date for older dates.',
      code: `<DateFormatter 
  dateString="2023-06-15T10:30:00.000Z" 
  mode="smart" 
/>`,
      renderComponent: () => (
        <DateFormatter 
          dateString="2023-06-15T10:30:00.000Z" 
          mode="smart" 
        />
      )
    },
    {
      name: 'Relative Mode',
      description: 'Relative mode always shows contextual labels when possible.',
      code: `<DateFormatter 
  dateString={new Date().toISOString()} 
  mode="relative" 
/>`,
      renderComponent: () => (
        <DateFormatter 
          dateString={new Date().toISOString()} 
          mode="relative" 
        />
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic HTML <time> element for proper screen reader support',
      'Includes machine-readable datetime attribute for assistive technologies',
      'Visual formatting uses semantic color tokens for consistent contrast'
    ]
  },

  notes: [
    'Built on date-fns library for reliable date parsing and formatting',
    'Accepts any valid date-fns format pattern string',
    'Always includes datetime attribute for semantic markup',
    'Uses design system typography and color tokens for consistency',
    'Handles timezone information from ISO date strings appropriately',
    'Smart mode: Shows "Today"/"Yesterday" for recent dates, day names for this week, formatted dates for older dates',
    'Relative mode: Always attempts to show contextual labels (Today/Yesterday/day name) before falling back to formatted dates',
    'Absolute mode: Always uses the formatString regardless of date recency'
  ],

  anatomy: {
    description: 'Simple text formatting component that wraps a semantic HTML time element.',
    parts: [
      {
        name: 'TimeStyled',
        description: 'Semantic HTML <time> element with design system typography and color tokens',
        tokens: [
          'semantic.typography.label',
          'semantic.color.text.subdued'
        ]
      }
    ]
  }
}