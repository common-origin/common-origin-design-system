import { ComponentDocumentation } from '../../../lib/docgen/types'
import { ArtCard } from './ArtCard'

export const artCardDocs: ComponentDocumentation = {
  id: 'artcard',
  name: 'ArtCard',
  description: 'Displays art-related content with title, excerpt, labels, and cover image.',
  category: 'Atoms',
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Title of the art card'
    },
    {
      name: 'excerpt',
      type: 'string',
      required: true,
      description: 'Short description or excerpt of the art'
    },
    {
      name: 'labels',
      type: 'string[]',
      required: false,
      description: 'Array of labels for categorization'
    },
    {
      name: 'tag',
      type: 'string',
      required: true,
      description: 'Tag to filter content, should be "art" for this component'
    },
    {
      name: 'coverImage',
      type: 'string',
      required: true,
      description: 'URL of the cover image for the art card'
    },
    {
      name: 'slug',
      type: 'string',
      required: true,
      description: 'Unique identifier for the art, used in URLs'
    },
    { name: 'artist',
      type: 'string',
      required: false,
      description: 'Name of the artist associated with the art piece'
    }
  ],

  tokens: [
    'semantic.color.background.subtle',
    'semantic.border.subtle',
    'base.border.radius.2',
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.lg',
    'base.fontFamily.sans'
  ],

  examples: [
    {
      name: 'Default Art Card',
      description:
        'Basic art card with title, excerpt, labels, and cover image.',
      code: `<ArtCard
  title="Starry Night"
  excerpt="A beautiful depiction of a starry night sky."
  labels={['Impressionism', 'Vincent van Gogh']}
  tag="art"
  coverImage="/assets/cover/co-cover-2.jpg"
  date="1889-06-01"
  slug="starry-night"
/>`,
      renderComponent: () => (
        <ArtCard
          title="Starry Night"
          excerpt="A beautiful depiction of a starry night sky."
          labels={['Impressionism', 'Vincent van Gogh']}
          tag="art"
          coverImage="/assets/cover/co-cover-2.jpg"
          slug="starry-night"
          artist="Vincent van Gogh"
        />
      )
    }
  ]
}
