import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { CardSmall } from './CardSmall'
import { Stack } from '../../atoms/Stack'

/**
 * ReleaseCard component documentation
 * A card component for displaying music release information with cover art
 */
export const cardSmallDocs: ComponentDocumentation = {
  id: 'cardsmall',
  name: 'CardSmall',
  description: 'A small, content-agnostic card component with title, picture, subtitle, meta, and link. Features hover effects and responsive image handling.',
  category: 'Molecules',
  
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Title of the card'
    },
    {
      name: 'picture',
      type: 'string',
      required: true,
      description: 'URL or path to the card image. Component returns null if not provided.'
    },
    {
      name: 'subtitle',
      type: 'string',
      required: false,
      description: 'Subtitle or secondary text'
    },
    {
      name: 'meta',
      type: 'string',
      required: false,
      description: 'Meta information or label'
    },
    {
      name: 'href',
      type: 'string',
      required: false,
      description: 'Link URL for the card. Uses standard <a> tag by default, or custom linkComponent if provided'
    },
    {
      name: 'linkComponent',
      type: 'React.ComponentType<any>',
      required: false,
      description: 'Custom link component for client-side routing (e.g., Next.js Link, React Router Link). Receives href and children props. When not provided, uses standard <a> tag'
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
      name: 'Basic CardSmall',
      description: 'Standard card with all essential information',
      code: `<CardSmall
  title="Ambient Spaces"
  picture="/cover-art.jpg"
  subtitle="Sound Designer"
  meta="2024-01-15"
  href="/ambient-spaces"
/>`,
      renderComponent: () => (
        <div style={{ maxWidth: '200px' }}>
          <CardSmall
            title="Ambient Spaces"
            picture="/assets/art/commonorigin-particles.jpg"
            subtitle="Sound Designer"
            meta="2024-01-15"
            href="/ambient-spaces"
          />
        </div>
      )
    },
    {
      name: 'CardSmall Grid',
      description: 'Multiple cards in a responsive grid layout',
      code: `<Stack direction="row" gap="md" style={{ flexWrap: 'wrap' }}>
  <CardSmall
    title="Electronic Dreams"
    picture="/electronic-cover.jpg"
    subtitle="Synth Master"
    meta="2024-02-01"
    href="/electronic-dreams"
  />
  <CardSmall
    title="Organic Rhythms"
    picture="/organic-cover.jpg"
    subtitle="Nature Sounds"
    meta="2024-01-20"
    href="/organic-rhythms"
  />
  <CardSmall
    title="Digital Landscapes"
    picture="/digital-cover.jpg"
    subtitle="Code Composer"
    meta="2024-01-10"
    href="/digital-landscapes"
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <div style={{ maxWidth: '150px' }}>
            <CardSmall
              title="Electronic Dreams"
              picture="/assets/art/commonorigin-impermanence.jpg"
              subtitle="Synth Master"
              meta="2024-02-01"
              href="/electronic-dreams"
            />
          </div>
          <div style={{ maxWidth: '150px' }}>
            <CardSmall
              title="Organic Rhythms"
              picture="/assets/art/commonorigin-particles.jpg"
              subtitle="Nature Sounds"
              meta="2024-01-20"
              href="/organic-rhythms"
            />
          </div>
          <div style={{ maxWidth: '150px' }}>
            <CardSmall
              title="Digital Landscapes"
              picture="/assets/art/dispatch_desire-path.jpg"
              subtitle="Code Composer"
              meta="2024-01-10"
              href="/digital-landscapes"
            />
          </div>
        </Stack>
      )
    },
    {
      name: 'Long Title Handling',
      description: 'Card with longer title and subtitle',
      code: `<CardSmall
  title="A Very Long Album Title That Might Wrap to Multiple Lines"
  subtitle="An Artist With a Really Long Name"
  picture="/long-title-cover.jpg"
  meta="2024-03-01"
  href="/very-long-album-title"
/>`,
      renderComponent: () => (
        <div style={{ maxWidth: '200px' }}>
          <CardSmall
            title="A Very Long Album Title That Might Wrap to Multiple Lines"
            subtitle="An Artist With a Really Long Name"
            picture="/assets/art/commonorigin-particles.jpg"
            meta="2024-03-01"
            href="/very-long-album-title"
          />
        </div>
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Uses semantic link structure with Next.js Link component',
      'Provides descriptive aria-label for screen readers',
      'Images include alt text matching the card title',
      'Focus management with visible focus indicators',
      'Hover states are supplemented with focus states for keyboard navigation'
    ],
    keyboardNavigation: 'Tab to focus the card link, Enter to navigate',
    screenReader: 'Announced as link with card title, includes image alt text',
    focusManagement: 'Focus outline appears around the entire card when focused'
  },
  
  notes: [
    'Component returns null if picture prop is missing or empty',
    'Uses Next.js Image component for optimized loading and responsive images',
    'Card images should be square (1:1 aspect ratio) for best results',
    'Hover effect reduces image opacity to 0.8 for visual feedback',
    'Link structure ensures the entire card is clickable',
    'Responsive image sizes optimize loading across different screen sizes'
  ]
}
