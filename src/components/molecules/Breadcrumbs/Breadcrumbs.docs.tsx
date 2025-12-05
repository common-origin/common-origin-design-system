import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'

/**
 * Breadcrumbs component documentation
 * Navigation component for hierarchical site structure and wayfinding
 */

export const breadcrumbsDocs: ComponentDocumentation = {
  id: 'breadcrumbs',
  name: 'Breadcrumbs',
  description: 'Navigation component that shows the hierarchical location of the current page within the site structure. Provides wayfinding functionality with proper semantic markup and accessibility support for screen readers and keyboard navigation.',
  category: 'Molecules',
  
  props: [
    {
      name: 'breadcrumbs',
      type: 'Breadcrumb[]',
      required: true,
      description: 'Array of breadcrumb items defining the navigation path. Each item requires: label (display text) and url (navigation link). Interface: { label: string, url: string }'
    },
    {
      name: 'linkComponent',
      type: 'React.ComponentType<any>',
      required: false,
      description: 'Custom link component for client-side routing (e.g., Next.js Link, React Router Link). When provided, internal URLs will use this component. External URLs always use standard <a> tags. When not provided, all URLs use standard <a> tags'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing purposes'
    }
  ],

  tokens: [
    // Spacing tokens
    'base.spacing.2',  // Item padding and margin
    'base.spacing.3',  // Right margin for separator
    'base.spacing.4',  // Separator icon size
    // Border tokens  
    'semantic.border.default', // Bottom border
    // Typography tokens
    'Typography component tokens' // Uses Typography for text rendering
  ],

  examples: [
    {
      name: 'Basic Breadcrumbs',
      description: 'Standard breadcrumb navigation showing hierarchical page structure',
      code: `<Breadcrumbs 
  breadcrumbs={[
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Electronics', url: '/products/electronics' },
    { label: 'Smartphones', url: '/products/electronics/smartphones' }
  ]} 
/>`,
      renderComponent: () => (
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'Products', url: '/products' },
          { label: 'Electronics', url: '/products/electronics' },
          { label: 'Smartphones', url: '/products/electronics/smartphones' }
        ]} />
      )
    },
    {
      name: 'Short Path',
      description: 'Breadcrumbs with minimal hierarchy (2 levels)',
      code: `<Breadcrumbs 
  breadcrumbs={[
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' }
  ]} 
/>`,
      renderComponent: () => (
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'About Us', url: '/about' }
        ]} />
      )
    },
    {
      name: 'Deep Navigation',
      description: 'Breadcrumbs showing deep site hierarchy with multiple levels',
      code: `<Breadcrumbs 
  breadcrumbs={[
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/docs' },
    { label: 'Components', url: '/docs/components' },
    { label: 'Molecules', url: '/docs/components/molecules' },
    { label: 'Breadcrumbs', url: '/docs/components/molecules/breadcrumbs' },
    { label: 'Examples', url: '/docs/components/molecules/breadcrumbs/examples' }
  ]} 
/>`,
      renderComponent: () => (
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'Documentation', url: '/docs' },
          { label: 'Components', url: '/docs/components' },
          { label: 'Molecules', url: '/docs/components/molecules' },
          { label: 'Breadcrumbs', url: '/docs/components/molecules/breadcrumbs' },
          { label: 'Examples', url: '/docs/components/molecules/breadcrumbs/examples' }
        ]} />
      )
    },
    {
      name: 'Content Categories',
      description: 'Real-world example showing content categorization in a blog or CMS',
      code: `<Stack direction="column" gap="xl">
  {/* Blog post breadcrumbs */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">BLOG POST NAVIGATION</Typography>
    <Breadcrumbs 
      breadcrumbs={[
        { label: 'Blog', url: '/blog' },
        { label: 'Design System', url: '/blog/category/design-system' },
        { label: 'Getting Started with Tokens', url: '/blog/design-system/getting-started-tokens' }
      ]} 
    />
  </Stack>

  {/* E-commerce breadcrumbs */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">E-COMMERCE NAVIGATION</Typography>
    <Breadcrumbs 
      breadcrumbs={[
        { label: 'Store', url: '/store' },
        { label: 'Clothing', url: '/store/clothing' },
        { label: 'Women', url: '/store/clothing/women' },
        { label: 'Dresses', url: '/store/clothing/women/dresses' }
      ]} 
    />
  </Stack>

  {/* Documentation breadcrumbs */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">DOCUMENTATION NAVIGATION</Typography>
    <Breadcrumbs 
      breadcrumbs={[
        { label: 'Docs', url: '/docs' },
        { label: 'API Reference', url: '/docs/api' },
        { label: 'Components', url: '/docs/api/components' },
        { label: 'Breadcrumbs', url: '/docs/api/components/breadcrumbs' }
      ]} 
    />
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          {/* Blog post breadcrumbs */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">BLOG POST NAVIGATION</Typography>
            <Breadcrumbs breadcrumbs={[
              { label: 'Blog', url: '/blog' },
              { label: 'Design System', url: '/blog/category/design-system' },
              { label: 'Getting Started with Tokens', url: '/blog/design-system/getting-started-tokens' }
            ]} />
          </Stack>

          {/* E-commerce breadcrumbs */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">E-COMMERCE NAVIGATION</Typography>
            <Breadcrumbs breadcrumbs={[
              { label: 'Store', url: '/store' },
              { label: 'Clothing', url: '/store/clothing' },
              { label: 'Women', url: '/store/clothing/women' },
              { label: 'Dresses', url: '/store/clothing/women/dresses' }
            ]} />
          </Stack>

          {/* Documentation breadcrumbs */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">DOCUMENTATION NAVIGATION</Typography>
            <Breadcrumbs breadcrumbs={[
              { label: 'Docs', url: '/docs' },
              { label: 'API Reference', url: '/docs/api' },
              { label: 'Components', url: '/docs/api/components' },
              { label: 'Breadcrumbs', url: '/docs/api/components/breadcrumbs' }
            ]} />
          </Stack>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Semantic Navigation: Uses HTML5 <nav> element with proper role and aria-label for screen reader identification',
      'Ordered List Structure: Breadcrumb items rendered as ordered list (<ol>) to convey hierarchical sequence',
      'Link Accessibility: All breadcrumb items except the last are interactive links with proper hover and focus states',
      'Current Page Context: Last breadcrumb item represents current page and is not interactive (no link)',
      'Screen Reader Support: Announced as "breadcrumb navigation" with numbered list items showing navigation path',
      'Keyboard Navigation: Standard link navigation via Tab key, Enter/Space to follow links',
      'Visual Separators: Caret icons between items are decorative only and hidden from screen readers via CSS',
      'High Contrast Support: Link styles and separators work in high contrast modes with proper borders',
      'Text Truncation: Long labels may need truncation on narrow viewports to maintain usability',
      'Focus Management: Clear focus indicators on all interactive breadcrumb links',
      'WCAG 2.2 Compliance: Meets AA standards for navigation landmarks and link identification'
    ],
    keyboardNavigation: 'Tab: Navigate between breadcrumb links | Enter/Space: Follow breadcrumb link | Standard link navigation patterns',
    screenReader: 'Announced as "breadcrumb navigation, list with X items". Each item announced as "link, item X of Y" for interactive items, "item X of Y" for current page',
    focusManagement: 'Focus moves sequentially through breadcrumb links. Current page (last item) is not focusable as it is not a link',
    colorContrast: 'Breadcrumb links meet WCAG AA contrast requirements. Hover and focus states provide additional visual feedback'
  },

  notes: [
    'Navigation Purpose: Use breadcrumbs for hierarchical site structures with 3+ levels to aid user wayfinding',
    'Current Page Context: Last breadcrumb item represents the current page and should not be a clickable link',
    'Link Structure: All breadcrumb items except the last should be navigable links to parent pages',
    'Path Accuracy: Breadcrumb path should reflect actual site hierarchy, not user\'s browsing history',
    'Separator Design: Caret icons (>) are used as visual separators between breadcrumb items',
    'Container Styling: Component includes bottom border to separate breadcrumbs from main content',
    'Responsive Behavior: On narrow screens, consider truncating or scrolling long breadcrumb paths',
    'Next.js Integration: Uses Next.js Link component for client-side navigation and performance',
    'Text Transformation: Breadcrumb labels are displayed in uppercase for visual hierarchy',
    'Semantic HTML: Proper use of nav, ol, and li elements ensures good accessibility and SEO',
    'Performance: Links are prefetched by Next.js for faster navigation between breadcrumb pages',
    'URL Structure: Each breadcrumb should correspond to a real, accessible URL in your application'
  ]
}
