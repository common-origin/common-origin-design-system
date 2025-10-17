import React from 'react'
import { parseISO, format } from 'date-fns'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic: { typography, color } } = tokens

export interface DateFormatterProps {
  /** ISO date string to format */
  dateString: string
  /** Format pattern (defaults to 'yyyy') */
  formatString?: string
  /** Optional data-testid for testing */
  'data-testid'?: string
}

const TimeStyled = styled.time`
  font: ${typography.label};
  color: ${color.text.subdued};
`

export const DateFormatter: React.FC<DateFormatterProps> = ({ 
  dateString, 
  formatString = 'yyyy',
  'data-testid': dataTestId
}) => {
  const date = parseISO(dateString)
  return (
    <TimeStyled dateTime={dateString} data-testid={dataTestId}>
      {format(date, formatString)}
    </TimeStyled>
  )
}