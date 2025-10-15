import React from 'react'
import styled from 'styled-components'
import type Post from '../../interfaces/post'
import { ArtCard } from './molecules/ArtCard'
import { Box } from './atoms/Box'
import { Container } from './atoms/Container'
import { ResponsiveGrid } from './layout/GridSystem'

type Props = {
  posts: Post[]
}

const Section = styled.section`
  width: 100%;
`

export const ArtGrid: React.FC<Props> = ({ posts }) => {
  return (
    <Section>
      <Container>
        <Box mb='8xl'>
          <ResponsiveGrid
            cols={1}
            colsMd={2}
            gapX="8"
            gapY="12"
          >
            {posts.map((post) => (
              <ArtCard
                key={post.slug}
                title={post.title}
                tag={post.tag}
                artist={post.artist}
                labels={post.labels}
                coverImage={post.coverImage}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))}
          </ResponsiveGrid>
        </Box>
      </Container>
    </Section>
  )
}