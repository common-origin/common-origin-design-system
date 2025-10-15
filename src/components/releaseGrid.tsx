import React, { useState } from 'react'
import type Release from '../../interfaces/release'
import { Box, Button, ResponsiveGrid, Stack } from './'
import { ReleaseCard } from './molecules/ReleaseCard'

type Props = {
  releases: Release[]
}

export const ReleaseGrid = ({ releases }: Props) => {
  const [filter, setFilter] = useState('All')
  const filteredReleases = filter === 'All' ? releases : releases.filter(release => release.label && release.label.includes(filter))

  return (
    <Box mb="8xl">
      <Stack direction='column' gap="lg">
        <Stack direction='row' gap="sm">
          <Button 
            onClick={() => setFilter('All')} 
            variant={filter === 'All' ? 'secondary' : 'primary'} 
            size='small' 
            purpose='button'
          >
            All
          </Button>
          <Button 
            onClick={() => setFilter('Cern')} 
            variant={filter === 'Cern' ? 'secondary' : 'primary'} 
            size='small' 
            purpose='button'
          >
            Cern
          </Button>
          <Button 
            onClick={() => setFilter('Disappear Here')} 
            variant={filter === 'Disappear Here' ? 'secondary' : 'primary'} 
            size='small' 
            purpose='button'
          >
            Disappear Here
          </Button>
        </Stack>
        <ResponsiveGrid
          cols={2}
          colsMd={3}
          colsLg={4}
          colsXl={6}
          gapX="8"
          gapY="12"
        >
          {filteredReleases.map((release) => (
            <ReleaseCard
              key={release.slug}
              title={release.title}
              date={release.date}
              coverImage={release.coverImage}
              artist={release.artist}
              slug={release.slug}
            />
          ))}
        </ResponsiveGrid>
      </Stack>
    </Box>
  )
}
