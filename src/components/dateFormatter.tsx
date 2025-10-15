import React from 'react'
import { parseISO, format } from 'date-fns'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic: { typography, color } } = tokens

type DateFormatterProps = {
  dateString: string
  formatString?: string
}

const TimeStyled = styled.time`
  font: ${typography.label};
  color: ${color.text.subdued};
`

export const DateFormatter: React.FC<DateFormatterProps> = ({ 
  dateString, 
  formatString = 'yyyy' 
}) => {
  const date = parseISO(dateString)
  return (
    <TimeStyled dateTime={dateString}>
      {format(date, formatString)}
    </TimeStyled>
  )
}
