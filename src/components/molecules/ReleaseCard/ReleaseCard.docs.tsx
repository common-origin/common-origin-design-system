import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { ReleaseCard } from './ReleaseCard'
import { Stack } from '../../atoms/Stack'

/**
 * ReleaseCard component documentation
 * A card component for displaying music release information with cover art
 */
export const releaseCardDocs: ComponentDocumentation = {
  id: 'release-card',
  name: 'ReleaseCard',
  description: 'A card component designed for displaying music release information including cover art, title, artist, and release date. Features hover effects and responsive image handling.',
  category: 'Molecules',
  
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'The title of the music release'
    },
    {
      name: 'artist',
      type: 'string',
      required: false,
      description: 'The artist or band name'
    },
    {
      name: 'coverImage',
      type: 'string',
      required: true,
      description: 'URL or path to the cover art image. Component returns null if not provided.'
    },
    {
      name: 'date',
      type: 'string',
      required: true,
      description: 'Release date string. Component returns null if not provided.'
    },
    {
      name: 'slug',
      type: 'string',
      required: true,
      description: 'URL slug for the release, used to generate the link path'
    }
  ],
  
  tokens: [
    'base.border.radius.2',
    'semantic.color.border.strong',
    'semantic.spacing.sm',
    'semantic.spacing.none'
  ],
  
  examples: [
    {
      name: 'Basic Release Card',
      description: 'Standard release card with all essential information',
      code: `<ReleaseCard
  title="Ambient Spaces"
  artist="Sound Designer"
  coverImage="/cover-art.jpg"
  date="2024-01-15"
  slug="ambient-spaces"
/>`,
      renderComponent: () => (
        <div style={{ maxWidth: '200px' }}>
          <ReleaseCard
            title="Ambient Spaces"
            artist="Sound Designer"
            coverImage="/assets/releases/commonorigin-particles.jpg"
            date="2024-01-15"
            slug="ambient-spaces"
          />
        </div>
      )
    },
    {
      name: 'Release Grid',
      description: 'Multiple release cards in a responsive grid layout',
      code: `<Stack direction="row" gap="md" style={{ flexWrap: 'wrap' }}>
  <ReleaseCard
    title="Electronic Dreams"
    artist="Synth Master"
    coverImage="/electronic-cover.jpg"
    date="2024-02-01"
    slug="electronic-dreams"
  />
  <ReleaseCard
    title="Organic Rhythms"
    artist="Nature Sounds"
    coverImage="/organic-cover.jpg"
    date="2024-01-20"
    slug="organic-rhythms"
  />
  <ReleaseCard
    title="Digital Landscapes"
    artist="Code Composer"
    coverImage="/digital-cover.jpg"
    date="2024-01-10"
    slug="digital-landscapes"
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <div style={{ maxWidth: '150px' }}>
            <ReleaseCard
              title="Electronic Dreams"
              artist="Synth Master"
              coverImage="/assets/releases/commonorigin-particles.jpg"
              date="2024-02-01"
              slug="electronic-dreams"
            />
          </div>
          <div style={{ maxWidth: '150px' }}>
            <ReleaseCard
              title="Organic Rhythms"
              artist="Nature Sounds"
              coverImage="/assets/releases/commonorigin-particles.jpg"
              date="2024-01-20"
              slug="organic-rhythms"
            />
          </div>
          <div style={{ maxWidth: '150px' }}>
            <ReleaseCard
              title="Digital Landscapes"
              artist="Code Composer"
              coverImage="/assets/releases/commonorigin-particles.jpg"
              date="2024-01-10"
              slug="digital-landscapes"
            />
          </div>
        </Stack>
      )
    },
    {
      name: 'Long Title Handling',
      description: 'Release card with longer title and artist names',
      code: `<ReleaseCard
  title="A Very Long Album Title That Might Wrap to Multiple Lines"
  artist="An Artist With a Really Long Name"
  coverImage="/long-title-cover.jpg"
  date="2024-03-01"
  slug="very-long-album-title"
/>`,
      renderComponent: () => (
        <div style={{ maxWidth: '200px' }}>
          <ReleaseCard
            title="A Very Long Album Title That Might Wrap to Multiple Lines"
            artist="An Artist With a Really Long Name"
            coverImage="/assets/releases/commonorigin-particles.jpg"
            date="2024-03-01"
            slug="very-long-album-title"
          />
        </div>
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Uses semantic link structure with Next.js Link component',
      'Provides descriptive aria-label for screen readers',
      'Images include alt text matching the release title',
      'Focus management with visible focus indicators',
      'Hover states are supplemented with focus states for keyboard navigation'
    ],
    keyboardNavigation: 'Tab to focus the card link, Enter to navigate',
    screenReader: 'Announced as link with release title, includes image alt text',
    focusManagement: 'Focus outline appears around the entire card when focused'
  },
  
  notes: [
    'Component returns null if coverImage or date props are missing or empty',
    'Uses Next.js Image component for optimized loading and responsive images',
    'Cover art images should be square (1:1 aspect ratio) for best results',
    'Hover effect reduces image opacity to 0.8 for visual feedback',
    'Uses DateFormatter component for consistent date display',
    'Link structure ensures the entire card is clickable',
    'Responsive image sizes optimize loading across different screen sizes'
  ]
}
