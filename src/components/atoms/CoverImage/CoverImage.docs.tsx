import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { CoverImage } from './CoverImage'
import { Stack } from '../Stack'
import { Box } from '../Box'

export const coverImageDocs: ComponentDocumentation = {
  id: 'coverimage',
  name: 'CoverImage',
  description: 'Responsive cover image component optimized for blog posts and articles. Features Next.js Image optimization, blur placeholder, and optional linking functionality. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
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
      name: 'slug',
      type: 'string',
      required: false,
      description: 'URL slug - when provided, makes image clickable linking to /posts/[slug]'
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
  src="/assets/cover/co-cover-2.jpg"
/>`,
      renderComponent: () => (
        <Box style={{ maxWidth: '400px' }}>
          <CoverImage
            title="Beautiful Landscape"
            src="/assets/cover/co-cover-2.jpg"
          />
        </Box>
      )
    },
    {
      name: 'Linked Cover Image',
      description: 'Cover image that links to a blog post when clicked',
      code: `<CoverImage
  title="My Blog Post"
  src="/assets/cover/co-cover-2.jpg"
  slug="my-blog-post"
/>`,
      renderComponent: () => (
        <Box style={{ maxWidth: '400px' }}>
          <CoverImage
            title="My Blog Post"
            src="/assets/cover/co-cover-2.jpg"
            slug="example-post"
          />
        </Box>
      )
    },
    {
      name: 'Custom Dimensions',
      description: 'Cover image with custom width and height for optimization',
      code: `<CoverImage
  title="Custom Size Image"
  src="/assets/cover/co-cover-2.jpg"
  width={800}
  height={400}
/>`,
      renderComponent: () => (
        <Box style={{ maxWidth: '400px' }}>
          <CoverImage
            title="Custom Size Image"
            src="/assets/cover/co-cover-2.jpg"
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
    title="Article One"
    src="/assets/cover/co-cover-2.jpg"
    slug="article-one"
  />
  <CoverImage
    title="Article Two"
    src="/assets/cover/co-cover-2.jpg"
    slug="article-two"
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <Box style={{ maxWidth: '300px' }}>
            <CoverImage
              title="Article One"
              src="/assets/cover/co-cover-2.jpg"
              slug="article-one"
            />
          </Box>
          <Box style={{ maxWidth: '300px' }}>
            <CoverImage
              title="Article Two"
              src="/assets/cover/co-cover-2.jpg"
              slug="article-two"
            />
          </Box>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Automatically generates descriptive alt text using the title prop',
      'Uses semantic link elements when slug is provided for proper navigation',
      'Includes aria-label on links for enhanced screen reader support',
      'Maintains proper focus states for keyboard navigation',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'Images include meaningful alt text for screen reader users',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'When linked, supports Enter and Space key activation',
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
