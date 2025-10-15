import React from 'react'
import styled from 'styled-components'
import type Author from '../../interfaces/author'
import Link from 'next/link'
import { Avatar, CoverImage, DateFormatter } from './'
import tokens from '@/styles/tokens.json'

const { 
  base: { spacing, fontSize, lineHeight },
  semantic: { color: { text } } 
} = tokens

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  margin-bottom: ${spacing[6]};
`

const Title = styled.h3`
  font-size: ${fontSize[8]};
  margin-bottom: ${spacing[3]};
  line-height: 1.2;
  
  a {
    color: ${text.default};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const DateWrapper = styled.div`
  font-size: ${fontSize[2]};
  margin-bottom: ${spacing[4]};
  color: ${text.subdued};
`

const Excerpt = styled.p`
  font-size: ${fontSize[4]};
  line-height: ${lineHeight[4]};
  margin-bottom: ${spacing[4]};
  color: ${text.default};
`

export const PostCard = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <CardContainer>
      <ImageWrapper>
        <CoverImage slug={slug} title={title} src={coverImage} />
      </ImageWrapper>
      <Title>
        <Link
          href={`/posts/${slug}`}
        >
          {title}
        </Link>
      </Title>
      <DateWrapper>
        <DateFormatter dateString={date} />
      </DateWrapper>
      <Excerpt>{excerpt}</Excerpt>
      <Avatar name={author.name} picture={author.picture} />
    </CardContainer>
  )
}

