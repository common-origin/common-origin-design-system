import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
import { Picture } from '../../atoms/Picture/Picture'
import { DateFormatter } from '../../atoms/DateFormatter'
import tokens from '@/styles/tokens.json'

export type CardSmallProps = {
  title: string
  picture?: string
  subtitle?: string
  meta?: string
  href?: string
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
}) => {
  if (!picture || !meta) {
    return null
  }
  return (
    <CardSmallStyled>
      <Link href={href || '#'} aria-label={title}>
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
      </Link>
    </CardSmallStyled>
  )
}
