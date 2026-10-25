import React from 'react'
import styled from 'styled-components'
import { Chip, Stack } from '@/components/atoms'

export type ChipGroupProps = {
  labels: string[]
  'data-testid'?: string
}

const ChipGroupWrapper = styled.div`
  > div {
    display: flex;
    flex-wrap: wrap;
  }
`

export const ChipGroup: React.FC<ChipGroupProps> = ({ 
  labels, 
  'data-testid': dataTestId 
}) => {
  return (
    <ChipGroupWrapper data-testid={dataTestId}>
      <Stack direction="row" gap="sm">
        {labels && labels.map((title, index) => (
          <Chip key={index} title={title} />
        ))}
      </Stack>
    </ChipGroupWrapper>
  )
}
