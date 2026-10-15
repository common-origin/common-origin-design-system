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
  /** Test identifier for automated testing */
  'data-testid'?: string
}

// The whole card is one link (#185): hovering anywhere fades its image, pressing fades it one step
// further, and keyboard focus draws the system focus ring around the card (decision 0029)
const CardSmallStyled = styled.div`
  a {
    display: block;
    text-decoration: none;
    border-radius: ${tokens.semantic.radius.sm};
  }

  img {
    border-radius: ${tokens.semantic.radius.sm};
    transition: ${tokens.semantic.motion.transition.press};
    width: 100%;
    height: auto;
    display: block;
  }

  a:hover img {
    opacity: ${tokens.semantic.opacity.hover};
  }

  a:active img {
    opacity: ${tokens.semantic.opacity.pressed};
  }

  a:focus-visible {
    outline: ${tokens.semantic.border.focus};
    outline-offset: ${tokens.semantic.border.focusOffset};
  }
`

export const CardSmall: React.FC<CardSmallProps> = ({
  title,
  picture,
  subtitle,
  meta,
  href,
  linkComponent: LinkComponent,
  'data-testid': dataTestId,
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
    <CardSmallStyled data-testid={dataTestId}>
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
