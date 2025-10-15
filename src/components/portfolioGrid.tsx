import React from 'react'
import styled from 'styled-components'
import type Post from '../../interfaces/post'
import { Box, Container, PortfolioCard, ResponsiveGrid, Typography } from './'
import tokens from '@/styles/tokens.json'

const { semantic: { spacing: { layout } } } = tokens

type Props = {
  posts: Post[]
}

const PortfolioGridSection = styled.section`
  /* Section wrapper */
`

const TitleWrapper = styled.div`
  margin: ${layout['2xl']} 0;
`

export const PortfolioGrid: React.FC<Props> = ({ posts }) => {
  return (
    <PortfolioGridSection>
      <Container>
        <TitleWrapper>
          <Typography variant="h2">Recent work</Typography>
        </TitleWrapper>
        <Box mb='8xl'>
          <ResponsiveGrid
            cols={1}
            colsMd={2}
            colsXl={3}
            gapX="8"
            gapY="12"
          >
            {posts.map((post) => (
              <PortfolioCard
                key={post.slug}
                title={post.title}
                tag={post.tag}
                labels={post.labels}
                coverImage={post.coverImage}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            ))}
          </ResponsiveGrid>
        </Box>
      </Container>
    </PortfolioGridSection>
  )
}
