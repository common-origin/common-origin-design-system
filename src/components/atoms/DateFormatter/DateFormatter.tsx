import React from 'react'
import { parseISO, format, isToday, isYesterday, isThisWeek, startOfWeek } from 'date-fns'
import styled from 'styled-components'
import tokens from '@/lib/cssTokens'

const { semantic: { typography, color } } = tokens

/**
 * How DateFormatter shows a date. `'relative'`, an alias of `'smart'`, was removed in 3.0 (#82).
 */
export type DateFormatMode = 'absolute' | 'smart'

export interface DateFormatterProps {
  /** ISO date string to format */
  dateString: string
  /** Format pattern (defaults to 'yyyy') */
  formatString?: string
  /**
   * `'absolute'` always uses `formatString`. `'smart'` shows "Today", "Yesterday" or the day name
   * for dates this week, and formats older dates with `formatString`.
   * @default 'absolute'
   */
  mode?: DateFormatMode
  /** Optional data-testid for testing */
  'data-testid'?: string
}

const TimeStyled = styled.time`
  font: ${typography.label};
  color: ${color.text.muted};
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
    case 'smart':
      // Today, Yesterday or the day name for recent dates; formatted for older ones
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