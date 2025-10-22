import { ComponentDocumentation } from '../../lib/docgen/types'
import { Footer } from './Footer'

export const footerDocs: ComponentDocumentation = {
  id: 'footer',
  name: 'Footer',
  description: 'Site footer organism that provides consistent branding and navigation. Features responsive layout with logo link and emphasizes brand identity.',
  category: 'Organisms',
  
  // Props extracted with full type safety from FooterProps interface
  props: [
    {
      name: 'logoSrc',
      type: 'string',
      required: false,
      default: '/assets/logo/co-logo-white.svg',
      description: 'Logo source path - defaults to white logo'
    },
    {
      name: 'logoAlt',
      type: 'string',
      required: false,
      default: 'Common Origin Logo',
      description: 'Logo alt text for accessibility'
    }
  ],

  tokens: [
    'semantic.color.background.emphasis',
    'semantic.color.text.inverse',
    'semantic.spacing.layout.2xl',
    'semantic.spacing.layout.lg'
  ],

  examples: [
    {
      name: 'Default Footer',
      description: 'Footer with default logo and styling',
      code: `<Footer />`,
      renderComponent: () => (
        <Footer />
      )
    },
    {
      name: 'Footer with Custom Logo',
      description: 'Footer with custom logo source and alt text',
      code: `<Footer 
  logoSrc="/custom-logo.svg"
  logoAlt="Custom Logo"
/>`,
      renderComponent: () => (
        <Footer 
          logoSrc="/assets/logo/co-logo-white.svg"
          logoAlt="Custom Logo"
        />
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic footer element with contentinfo role for proper landmark navigation',
      'Logo link has descriptive aria-label that includes context about destination',
      'Image uses empty alt text (decorative) since link provides context',
      'Focus management with visible focus indicators meeting WCAG 2.4.7 requirements',
      'High contrast color scheme with semantic tokens for WCAG 1.4.3 compliance',
      'Minimum target size of 44x44px for touch accessibility (WCAG 2.5.5)',
      'Supports high contrast mode with enhanced focus indicators',
      'Link receives proper focus indicators with sufficient contrast'
    ],
    keyboardNavigation: 'Logo link is keyboard accessible with Tab navigation and visible focus indicators',
    screenReader: 'Footer landmark is announced with descriptive label, logo link provides clear navigation context',
    colorContrast: 'Uses high contrast colors (semantic.color.text.inverse on background.emphasis) meeting WCAG AA standards',
    focusManagement: 'Clear focus indicators with 2px outline and proper contrast ratios'
  },

  notes: [
    'Full-width footer with emphasis background color',
    'Logo automatically detects active state for home route',
    'Responsive design works across all screen sizes',
    'Uses Container atom for consistent site-wide spacing',
    'Part of site-wide layout structure',
    'Logo link navigates to home page (/)',
    'Flexible logo configuration for different contexts',
    'WCAG 2.2 AA compliant with automated accessibility testing',
    'Minimum 44x44px touch target size for mobile accessibility',
    'Proper semantic structure with contentinfo landmark'
  ]
}