import { ComponentDocumentation } from '../../../lib/docgen/types'
import { CardLarge } from './CardLarge'

export const cardLargeDocs: ComponentDocumentation = {
  id: 'cardlarge',
  name: 'CardLarge',
  description: 'Displays large card content with title, subtitle, labels, and cover image. Content-agnostic.',
  category: 'Molecules',
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Title of the card'
    },
    {
      name: 'excerpt',
      type: 'string',
      required: true,
      description: 'Short description or excerpt for the card'
    },
    {
      name: 'subtitle',
      type: 'string',
      required: true,
      description: 'Subtitle or secondary text for the card'
    },
    {
      name: 'labels',
      type: 'string[]',
      required: false,
      description: 'Array of labels for categorization or metadata'
    },
    {
      name: 'picture',
      type: 'string',
      required: true,
      description: 'URL of the picture for the card'
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
      name: 'Basic CardLarge',
      description:
        'Basic large card with title, subtitle, labels, and cover image.',
      code: `<CardLarge
  title="Digital Fabric"
  excerpt="An exploration of digital textile patterns."
  subtitle="Common Origin"
  labels={['Digital Art', 'Generative']}
  picture="/assets/art/art-fabric_1.jpg"
/>`,
      renderComponent: () => (
        <CardLarge
          title="Digital Fabric"
          excerpt="An exploration of digital textile patterns."
          subtitle="Common Origin"
          labels={['Digital Art', 'Generative']}
          picture="/assets/art/art-fabric_1.jpg"
        />
      )
    },
    {
      name: 'Clickable CardLarge',
      description:
        'Large card with click interaction for viewing details.',
      code: `<CardLarge
  title="Desire Path"
  excerpt="A study of emergent pathways in digital space."
  subtitle="Common Origin"
  labels={['Conceptual', 'Interactive']}
  picture="/assets/art/art-desire-path_2.jpg"
  onImageClick={() => alert('View details')}
/>`,
      renderComponent: () => (
        <CardLarge
          title="Desire Path"
          excerpt="A study of emergent pathways in digital space."
          subtitle="Common Origin"
          labels={['Conceptual', 'Interactive']}
          picture="/assets/art/art-desire-path_2.jpg"
          onImageClick={() => alert('View details')}
        />
      )
    },
    {
      name: 'Linked CardLarge',
      description:
        'Large card that links to a gallery page.',
      code: `<CardLarge
  title="Residual Simulation"
  excerpt="Traces of computational processes in visual form."
  subtitle="Common Origin"
  labels={['Simulation', 'Abstract']}
  picture="/assets/art/art-residual-simulation_1.jpg"
  imageHref="/gallery/residual-simulation"
/>`,
      renderComponent: () => (
        <CardLarge
          title="Residual Simulation"
          excerpt="Traces of computational processes in visual form."
          subtitle="Common Origin"
          labels={['Simulation', 'Abstract']}
          picture="/assets/art/art-residual-simulation_1.jpg"
          imageHref="/gallery/residual-simulation"
        />
      )
    }
  ]
}
