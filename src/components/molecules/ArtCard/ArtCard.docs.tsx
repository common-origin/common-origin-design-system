import { ComponentDocumentation } from '../../../lib/docgen/types'
import { ArtCard } from './ArtCard'

export const artCardDocs: ComponentDocumentation = {
  id: 'artcard',
  name: 'ArtCard',
  description: 'Displays art-related content with title, artist, labels, and cover image.',
  category: 'Molecules',
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
      name: 'artist',
      type: 'string',
      required: true,
      description: 'Name of the artist associated with the art piece'
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
      name: 'onImageClick',
      type: '() => void',
      required: false,
      description: 'Callback function when the cover image is clicked'
    },
    {
      name: 'imageHref',
      type: 'string',
      required: false,
      description: 'URL for the cover image when used as a link'
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
      name: 'Basic Art Card',
      description:
        'Basic art card with title, artist, labels, and cover image.',
      code: `<ArtCard
  title="Digital Fabric"
  excerpt="An exploration of digital textile patterns."
  artist="Common Origin"
  labels={['Digital Art', 'Generative']}
  tag="art"
  coverImage="/assets/art/art-fabric_1.jpg"
/>`,
      renderComponent: () => (
        <ArtCard
          title="Digital Fabric"
          excerpt="An exploration of digital textile patterns."
          artist="Common Origin"
          labels={['Digital Art', 'Generative']}
          tag="art"
          coverImage="/assets/art/art-fabric_1.jpg"
        />
      )
    },
    {
      name: 'Clickable Art Card',
      description:
        'Art card with click interaction for viewing details.',
      code: `<ArtCard
  title="Desire Path"
  excerpt="A study of emergent pathways in digital space."
  artist="Common Origin"
  labels={['Conceptual', 'Interactive']}
  tag="art"
  coverImage="/assets/art/art-desire-path_2.jpg"
  onImageClick={() => alert('View art details')}
/>`,
      renderComponent: () => (
        <ArtCard
          title="Desire Path"
          excerpt="A study of emergent pathways in digital space."
          artist="Common Origin"
          labels={['Conceptual', 'Interactive']}
          tag="art"
          coverImage="/assets/art/art-desire-path_2.jpg"
          onImageClick={() => alert('View art details')}
        />
      )
    },
    {
      name: 'Linked Art Card',
      description:
        'Art card that links to a gallery page.',
      code: `<ArtCard
  title="Residual Simulation"
  excerpt="Traces of computational processes in visual form."
  artist="Common Origin"
  labels={['Simulation', 'Abstract']}
  tag="art"
  coverImage="/assets/art/art-residual-simulation_1.jpg"
  imageHref="/gallery/residual-simulation"
/>`,
      renderComponent: () => (
        <ArtCard
          title="Residual Simulation"
          excerpt="Traces of computational processes in visual form."
          artist="Common Origin"
          labels={['Simulation', 'Abstract']}
          tag="art"
          coverImage="/assets/art/art-residual-simulation_1.jpg"
          imageHref="/gallery/residual-simulation"
        />
      )
    }
  ]
}
