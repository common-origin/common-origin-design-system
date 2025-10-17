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
      description: 'Date-fns format pattern string (e.g., "MMM dd, yyyy", "HH:mm", "yyyy-MM-dd")'
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
      name: 'Relative Format',
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
    'Handles timezone information from ISO date strings appropriately'
  ]
}