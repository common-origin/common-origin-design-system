import React from 'react'
import styled from 'styled-components'
import type Release from '../../interfaces/release'
import { FeaturedReleaseCard } from './'
import tokens from '@/styles/tokens.json'

interface FilterReleaseListProps {
  releases: Release[]
  showFilterMessage?: boolean
}

const Container = styled.div`
  margin-top: ${tokens.base.spacing[4]};
`

const FilterMessage = styled.p`
  margin-bottom: ${tokens.base.spacing[6]};
  color: ${tokens.semantic.color.text.subdued};
  font-size: ${tokens.base.fontSize[2]};
  font-style: italic;
`

const ReleaseGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.base.spacing[4]};

  @media (min-width: 768px) {
    gap: ${tokens.base.spacing[6]};
  }
`

export const FilterReleaseList: React.FC<FilterReleaseListProps> = ({ 
  releases, 
  showFilterMessage = false 
}) => {
  const hasReleases = releases && releases.length > 0

  return (
    <Container>
      {showFilterMessage && (
        <FilterMessage>
          {hasReleases 
            ? `Showing ${releases.length} release${releases.length !== 1 ? 's' : ''}`
            : 'No releases found matching your criteria'
          }
        </FilterMessage>
      )}
      
      {hasReleases ? (
        <ReleaseGrid>
          {releases.map((release, index) => (
            <FeaturedReleaseCard
              key={release.slug}
              title={release.title}
              artistName={release.artist}
              image={release.coverImage}
              recordLabel={release.recordLabel}
              featuredChip={index === 0 ? 'Latest' : 'Featured'}
              releaseUrl={`/releases/${release.slug}`}
            />
          ))}
        </ReleaseGrid>
      ) : !showFilterMessage && (
        <FilterMessage>
          No releases available
        </FilterMessage>
      )}
    </Container>
  )
}