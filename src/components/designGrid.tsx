import React from 'react'
import type Post from '../../interfaces/post'
import { Container, DesignCard, ResponsiveGrid } from '@/components'

type DesignGridProps = {
  posts: Post[]
}

export const DesignGrid: React.FC<DesignGridProps> = ({ posts }) => {
  return (
    <section>
      <Container>
        <ResponsiveGrid
          cols={1}
          >
          {posts.map((post) => (
            <DesignCard
              key={post.slug}
              title={post.title}
              tag={post.tag}
              labels={post.labels}
              coverImage={post.coverImage}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </ResponsiveGrid>
      </Container>
    </section>
  )
}