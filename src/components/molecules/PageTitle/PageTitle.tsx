import React, { FC } from 'react'
import styled from 'styled-components'
import { IconButton, Stack, Typography } from '../../'
import tokens from '@/styles/tokens.json'

interface PageTitleProps {
  title: string
  hasBackButton?: boolean
  subtitle?: string
}

interface StyledPageTitleProps {
  $hasBackButton: boolean
}

const PageTitleStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$hasBackButton'].includes(prop),
})<StyledPageTitleProps>`
  margin-bottom: ${tokens.base.spacing[6]};
  margin-top: ${({ $hasBackButton }) => $hasBackButton ? tokens.base.spacing[0] : tokens.base.spacing[12]};
`

export const PageTitle: FC<PageTitleProps> = ({ title, hasBackButton = false, subtitle }) => {
  return (
    <PageTitleStyled $hasBackButton={hasBackButton}>
      {hasBackButton && <IconButton iconName='back' size='large' variant='naked' url='/music' aria-label='Go back to music page' />}
      <Stack direction='column' gap="md">
        <Typography variant="h1">{title}</Typography>
        {subtitle && <Typography variant='caption' color='subdued'>{subtitle}</Typography>}
      </Stack>
    </PageTitleStyled>
  )
}
