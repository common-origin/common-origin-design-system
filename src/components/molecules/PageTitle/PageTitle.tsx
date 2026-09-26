import React, { FC } from 'react'
import styled from 'styled-components'
import { IconButton } from '../../atoms/IconButton'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
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
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledPageTitleProps>`
  margin-bottom: ${tokens.semantic.spacing.layout['2xl']};
  margin-top: ${({ $hasBackButton }) => $hasBackButton ? tokens.semantic.spacing.layout.none : tokens.semantic.spacing.layout['7xl']};
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
