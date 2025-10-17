import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { CoverImage } from './CoverImage'
import { Stack } from '../Stack'
import { Box } from '../Box'

export const coverImageDocs: ComponentDocumentation = {
  id: 'coverimage',
  name: 'CoverImage',
  description: 'Responsive cover image component for displaying images with optional click interactions. Framework-agnostic and suitable for any React application. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Title of the content - used for alt text and accessibility'
    },
    {
      name: 'src',
      type: 'string',
      required: true,
      description: 'Image source URL or path'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Callback function when image is clicked (renders as button)'
    },
    {
      name: 'href',
      type: 'string',
      required: false,
      description: 'URL for image link (renders as anchor tag)'
    },
    {
      name: 'width',
      type: 'number',
      required: false,
      default: '1300',
      description: 'Image width in pixels for optimization'
    },
    {
      name: 'height',
      type: 'number',
      required: false,
      default: '630',
      description: 'Image height in pixels for optimization'
    }
  ],

  tokens: [
    'base.border.radius.2',
    'semantic.spacing.layout.md',
    'semantic.color.interactive.hover'
  ],

  examples: [
    {
      name: 'Basic Cover Image',
      description: 'Static cover image without linking functionality',
      code: `<CoverImage
  title="Beautiful Landscape"
  src="/assets/art/art-1.jpg"
/>`,
      renderComponent: () => (
        <Box style={{ maxWidth: '400px' }}>
          <CoverImage
            title="Beautiful Landscape"
            src="/assets/art/art-1.jpg"
          />
        </Box>
      )
    },
    {
      name: 'Clickable Cover Image with Callback',
      description: 'Cover image that triggers a callback when clicked',
      code: `<CoverImage
  title="Interactive Art"
  src="/assets/art/art-2.jpg"
  onClick={() => alert('Image clicked!')}
/>`,
      renderComponent: () => (
        <Box style={{ maxWidth: '400px' }}>
          <CoverImage
            title="Interactive Art"
            src="/assets/art/art-2.jpg"
            onClick={() => alert('Image clicked!')}
          />
        </Box>
      )
    },
    {
      name: 'Linked Cover Image',
      description: 'Cover image that links to an external URL',
      code: `<CoverImage
  title="Linked Art"
  src="/assets/art/art-3.jpg"
  href="/gallery/art-3"
/>`,
      renderComponent: () => (
        <Box style={{ maxWidth: '400px' }}>
          <CoverImage
            title="Linked Art"
            src="/assets/art/art-3.jpg"
            href="/gallery/art-3"
          />
        </Box>
      )
    },
    {
      name: 'Custom Dimensions',
      description: 'Cover image with custom width and height for optimization',
      code: `<CoverImage
  title="Custom Size Image"
  src="/assets/art/art-4.jpg"
  width={800}
  height={400}
/>`,
      renderComponent: () => (
        <Box style={{ maxWidth: '400px' }}>
          <CoverImage
            title="Custom Size Image"
            src="/assets/art/art-4.jpg"
            width={800}
            height={400}
          />
        </Box>
      )
    },
    {
      name: 'Multiple Cover Images',
      description: 'Demonstration of multiple cover images in a layout',
      code: `<Stack direction="column" gap="lg">
  <CoverImage
    title="Desire Path Art"
    src="/assets/art/art-desire-path_1.jpg"
    href="/gallery/desire-path-1"
  />
  <CoverImage
    title="Fabric Art"
    src="/assets/art/art-fabric_1.jpg"
    onClick={() => console.log('Fabric art clicked')}
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <Box style={{ maxWidth: '300px' }}>
            <CoverImage
              title="Desire Path Art"
              src="/assets/art/art-desire-path_1.jpg"
              href="/gallery/desire-path-1"
            />
          </Box>
          <Box style={{ maxWidth: '300px' }}>
            <CoverImage
              title="Fabric Art"
              src="/assets/art/art-fabric_1.jpg"
              onClick={() => console.log('Fabric art clicked')}
            />
          </Box>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Automatically generates descriptive alt text using the title prop',
      'Uses semantic link elements when href is provided for proper navigation',
      'Uses semantic button elements when onClick is provided for interactions',
      'Includes aria-label on interactive elements for enhanced screen reader support',
      'Maintains proper focus states for keyboard navigation',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'Images include meaningful alt text for screen reader users',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'When interactive, supports Enter and Space key activation',
    screenReader: 'Alt text follows pattern "Cover Image for [title]" for clarity',
    focusManagement: 'Linked images receive focus outline and proper tab order'
  },

  notes: [
    'Uses Next.js Image component for automatic optimization and lazy loading',
    'Includes blur placeholder for improved perceived performance',
    'Priority loading is enabled for linked images (likely above-the-fold)',
    'Responsive design adapts margin for mobile vs desktop layouts',
    'Hover effects provide visual feedback for interactive images',
    'Default aspect ratio optimized for blog post cover images (1300x630)',
    'Border radius applied for consistent visual design'
  ]
}
