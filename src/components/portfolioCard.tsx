import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Chip, Stack, Typography } from './'
import tokens from '@/styles/tokens.json'

const { base: { spacing, border } } = tokens

type PortfolioCardProps = {
  title: string
  tag: string
  labels: string[]
  coverImage: string
  excerpt: string
  slug: string
}

const PortfolioCardStyled = styled.div`
  /* Card container */
`

const PortfolioImageLink = styled(Link)`
  display: block;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

const PortfolioImage = styled(Image)`
  border-radius: ${border.radius[6]};
  transition: ease opacity 0.2s;
  width: 100%;
  height: auto;
  display: block;

  &:hover {
    opacity: 0.8;
  }
`

const PortfolioTitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[1]};
`

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  tag,
  labels = [],
  coverImage,
  excerpt,
  slug,
}) => {
  if (tag === 'portfolio') {
    return (
      <PortfolioCardStyled>
        <Stack direction="column" gap="md">
          <PortfolioImageLink
            href={`/posts/${slug}`}
          >
            <PortfolioImage 
              src={coverImage} 
              alt={title}
              width={650}
              height={315}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33.33vw"
              placeholder="blur"
              blurDataURL={coverImage}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </PortfolioImageLink>
          <PortfolioTitleLink
            href={`/posts/${slug}`}
          >
            <Typography variant="h4" color="default">{title}</Typography>
          </PortfolioTitleLink>
          <Stack direction="column" gap="md">
            <Typography variant="small" color="subdued">{excerpt}</Typography>
            <ChipWrapper>
              {Array.isArray(labels) && labels.map((label, index) => (
                <Chip key={index} title={label} variant="default" />
              ))}
            </ChipWrapper>
          </Stack>
        </Stack>
      </PortfolioCardStyled>
    )
  }
  
  return null
}
