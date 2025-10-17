import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
import { DateFormatter } from '../../atoms/DateFormatter'
import tokens from '@/styles/tokens.json'

export type ReleaseCardProps = {
  title: string
  coverImage?: string
  artist?: string
  date?: string
  slug?: string
}

const ReleaseCardStyled = styled.div`
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

export const ReleaseCard: React.FC<ReleaseCardProps> = ({
  title,
  coverImage,
  artist,
  date,
  slug,
}) => {
  if (!coverImage || !date) {
    return null
  }
  
  return (
    <ReleaseCardStyled>
      <Link
        href={`/releases/${slug}`}
        aria-label={title}
      >
        <Stack direction="column" gap='sm'>
          <Image 
            alt={title} 
            src={coverImage}
            width={300}
            height={300}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16.66vw, 14.28vw"
            placeholder="blur"
            blurDataURL={coverImage}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <Stack direction="column" gap='none'>
            <Typography variant="small">{title}</Typography>
            <Typography variant="label" color="subdued">{artist}</Typography>
            <DateFormatter dateString={date} />
          </Stack>
        </Stack>
      </Link>
    </ReleaseCardStyled>
  )
}
