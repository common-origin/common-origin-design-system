
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { FeatureBlock } from './FeatureBlock'

export const featureBlockDocs: ComponentDocumentation = {
  id: 'featureblock',
  name: 'FeatureBlock',
  description: 'Displays a feature block with title, excerpt, labels, and cover image.',
  category: 'Molecules',
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Title of the feature block'
    },
    {
      name: 'excerpt',
      type: 'string',
      required: true,
      description: 'Short description or excerpt of the feature'
    },
    {
      name: 'labels',
      type: 'string[]',
      required: false,
      description: 'Array of labels for categorization'
    },
    {
      name: 'coverImage',
      type: 'string',
      required: true,
      description: 'URL of the cover image for the feature block'
    },
    {
      name: 'date',
      type: 'string',
      required: true,
      description: 'Publication date of the feature'
    },
    {
      name: 'onReadMore',
      type: '() => void',
      required: false,
      description: 'Callback function when Read More button is clicked'
    },
    {
      name: 'readMoreHref',
      type: 'string',
      required: false,
      description: 'URL for Read More button when used as a link'
    },
    {
      name: 'readMoreText',
      type: 'string',
      required: false,
      description: 'Custom text for the Read More button (defaults to "Read more")'
    }
  ],

  tokens: [
    'semantic.color.background.subtle',
    'semantic.border.subtle',
    'base.border.radius.2',
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.lg',
    'base.fontFamily.sans',
    'semantic.typography.heading.3',
    'semantic.typography.body'
  ],

  examples: [
    {
      name: 'Basic Feature Block',
      description: 'Displays a feature block with title, excerpt, labels, and cover image.',
      code: `<FeatureBlock
title="Sample Feature"
excerpt="This is a sample feature excerpt."    
  labels={['UI', 'UX']}
  coverImage="/assets/art/art-1.jpg"
  date="2025-07-24"
  onReadMore={() => alert('Read more clicked!')}
/>`,
      renderComponent: () => (
        <FeatureBlock
          title="Sample Feature"
          excerpt="This is a sample feature excerpt."
          labels={['UI', 'UX']}
          coverImage="/assets/art/art-1.jpg"
          date="2025-07-24"
          onReadMore={() => alert('Read more clicked!')}
        />
      )
    },
    {
      name: 'Feature Block with Multiple Labels',
      description: 'Shows how to use multiple labels in the feature block.',
      code: `<FeatureBlock
  title="Advanced Feature"
  excerpt="An advanced feature example with multiple labels."
  labels={['Accessibility', 'Responsive', 'Modern']}
  coverImage="/assets/art/art-desire-path_1.jpg"
  date="2025-08-01"
  readMoreHref="/features/advanced-feature"
/>`,
      renderComponent: () => (
        <FeatureBlock
          title="Advanced Feature"
          excerpt="An advanced feature example with multiple labels."
          labels={['Accessibility', 'Responsive', 'Modern']}
          coverImage="/assets/art/art-desire-path_1.jpg"
          date="2025-08-01"
          readMoreHref="/features/advanced-feature"
        />
      )
    },
    {
      name: 'Feature Block with Custom Read More Text',
      description: 'Shows how to customize the Read More button text.',
      code: `<FeatureBlock
  title="Explore This Feature"
  excerpt="A feature that invites exploration with custom button text."
  labels={['Interactive', 'Experimental']}
  coverImage="/assets/art/art-fabric_2.jpg"
  date="2025-08-15"
  readMoreHref="/features/explore-feature"
  readMoreText="Explore Now"
/>`,
      renderComponent: () => (
        <FeatureBlock
          title="Explore This Feature"
          excerpt="A feature that invites exploration with custom button text."
          labels={['Interactive', 'Experimental']}
          coverImage="/assets/art/art-fabric_2.jpg"
          date="2025-08-15"
          readMoreHref="/features/explore-feature"
          readMoreText="Explore Now"
        />
      )
    }
  ]
}
