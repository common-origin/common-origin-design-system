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
      description: 'date-fns format pattern (e.g. "MMM dd, yyyy", "HH:mm", "yyyy-MM-dd"). Used in absolute mode, and for older dates in smart and relative modes. Defaults to "yyyy" in absolute mode and "MMMM dd, yyyy" in the other modes.'
    },
    {
      name: 'mode',
      type: "'absolute' | 'relative' | 'smart'",
      required: false,
      default: "'absolute'",
      description: '"absolute" always uses formatString. "smart" shows "Today", "Yesterday" or the day name for dates this week (weeks start on Monday), and formats older dates with formatString, or "MMMM dd, yyyy" if none is given. "relative" currently behaves exactly like "smart".'
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
      description: 'The time portion of a datetime, shown in the viewer\'s local time zone (the example is 14:30 UTC).',
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
      description: 'Relative mode currently gives the same output as smart mode.',
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
    'Dates are parsed with parseISO and formatted in the viewer\'s local time zone, so a UTC timestamp near midnight can show a different day',
    'Smart mode: "Today" or "Yesterday" for recent dates, the day name for dates this week (weeks start on Monday), and formatted dates for older ones',
    'Relative mode: currently identical to smart mode',
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