import React from 'react'
import styled from 'styled-components'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
import { Picture } from '../../atoms/Picture/Picture'
import tokens from '@/styles/tokens.json'

export type CardSmallProps = {
  title: string
  picture?: string
  subtitle?: string
  meta?: string
  href?: string
  /**
   * Custom link component (e.g., Next.js Link)
   * @example linkComponent={NextLink}
   */
  linkComponent?: React.ComponentType<any>
}

const CardSmallStyled = styled.div`
  a {
    text-decoration: none;
  }

  img {
    border-radius: ${tokens.base.border.radius[2]};
    transition: ease opacity 0.2s;
    width: 100%;
    height: auto;
    display: block;
  }

  &:hover {
    img {
      opacity: 0.8;
    }
  }

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px ${tokens.semantic.color.border.strong};
  }
`

export const CardSmall: React.FC<CardSmallProps> = ({
  title,
  picture,
  subtitle,
  meta,
  href,
  linkComponent: LinkComponent,
}) => {
  if (!picture || !meta) {
    return null
  }

  const content = (
    <Stack direction="column" gap='sm'>
      <Picture
        title={title}
        src={picture}
        width={300}
        height={300}
      />
      <Stack direction="column" gap='xs'>
        <Typography variant="small">{title}</Typography>
        <Stack direction="column" gap='none'>
          {subtitle && <Typography variant="label" color="subdued">{subtitle}</Typography>}
          {meta && <Typography variant="label" color="subdued">{meta}</Typography>}
        </Stack>
      </Stack>
    </Stack>
  )

  return (
    <CardSmallStyled>
      {LinkComponent && href ? (
        <LinkComponent href={href} aria-label={title}>
          {content}
        </LinkComponent>
      ) : (
        <a href={href || '#'} aria-label={title}>
          {content}
        </a>
      )}
    </CardSmallStyled>
  )
}
