import React from 'react'
import { parseISO, format, isToday, isYesterday, isThisWeek, startOfWeek } from 'date-fns'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic: { typography, color } } = tokens

export type DateFormatMode = 'absolute' | 'relative' | 'smart'

export interface DateFormatterProps {
  /** ISO date string to format */
  dateString: string
  /** Format pattern (defaults to 'yyyy') */
  formatString?: string
  /** Date formatting mode: 'absolute' uses formatString, 'relative' shows "Today"/"Yesterday", 'smart' combines both */
  mode?: DateFormatMode
  /** Optional data-testid for testing */
  'data-testid'?: string
}

const TimeStyled = styled.time`
  font: ${typography.label};
  color: ${color.text.subdued};
`

/**
 * Formats a date with smart relative/absolute logic
 */
const formatDateSmart = (date: Date, customFormat?: string): string => {
  // Relative labels for recent dates
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  
  // Show day name for dates within this week
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, 'EEEE') // "Monday", "Tuesday", etc.
  }
  
  // Fall back to custom format or default full date format
  return format(date, customFormat || 'MMMM dd, yyyy')
}

export const DateFormatter: React.FC<DateFormatterProps> = ({ 
  dateString, 
  formatString,
  mode = 'absolute',
  'data-testid': dataTestId
}) => {
  const date = parseISO(dateString)
  
  let displayText: string
  
  switch (mode) {
    case 'relative':
      // Always use relative labels (Today/Yesterday) or fall back to day name
      displayText = formatDateSmart(date, formatString)
      break
    case 'smart':
      // Smart mode: relative for recent, absolute for older
      displayText = formatDateSmart(date, formatString)
      break
    case 'absolute':
    default:
      // Always use the format string (default 'yyyy')
      displayText = format(date, formatString || 'yyyy')
      break
  }
  
  return (
    <TimeStyled dateTime={dateString} data-testid={dataTestId}>
      {displayText}
    </TimeStyled>
  )
}