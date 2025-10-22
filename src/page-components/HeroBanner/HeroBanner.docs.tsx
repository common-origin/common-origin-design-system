import { ComponentDocumentation } from '../../lib/docgen/types'
import { HeroBanner } from './HeroBanner'

export const heroBannerDocs: ComponentDocumentation = {
  id: 'hero-banner',
  name: 'HeroBanner',
  description: 'Main hero banner organism that showcases the brand identity with video background, headline content, and navigation buttons. Features responsive grid layout and accessibility considerations.',
  category: 'Organisms',
  
  // Props extracted with full type safety from HeroBannerProps interface
  props: [
    {
      name: 'title',
      type: 'string',
      required: false,
      default: 'Common Origin',
      description: 'Main title text displayed in the hero banner'
    },
    {
      name: 'subtitle',
      type: 'string',
      required: false,
      default: 'A creative studio',
      description: 'Subtitle text displayed below the main title'
    },
    {
      name: 'videoSrc',
      type: 'string',
      required: false,
      default: './assets/cover/homepage-loop.mp4',
      description: 'Video source path for the background video'
    }

  ],

  tokens: [
    'semantic.spacing.layout.lg',
    'semantic.spacing.layout.4xl',
    'semantic.spacing.layout.10xl',
    'semantic.spacing.layout.2xl',
    'base.border.radius[5]',
    'base.breakpoint.md',
    'base.breakpoint.lg',
    'base.breakpoint.xl',
    'base.breakpoint.sm'
  ],

  examples: [
    {
      name: 'Default Hero Banner',
      description: 'Hero banner with default content and navigation',
      code: `<HeroBanner />`,
      renderComponent: () => (
        <HeroBanner />
      )
    },
    {
      name: 'Hero Banner with Custom Content',
      description: 'Hero banner with custom title and subtitle',
      code: `<HeroBanner 
  title="Custom Title"
  subtitle="Custom subtitle text"
/>`,
      renderComponent: () => (
        <HeroBanner 
          title="Custom Title"
          subtitle="Custom subtitle text"
        />
      )
    }
  ],

  accessibility: {
    notes: [
      'Video element includes proper attributes for autoplay without sound',
      'Uses semantic Typography components for proper heading hierarchy',
      'Button components provide keyboard accessibility and focus management',
      'Responsive design maintains proper content flow across screen sizes',
      'Video wrapper provides proper aspect ratio constraints'
    ],
    keyboardNavigation: 'Navigation buttons are fully keyboard accessible with proper tab order',
    screenReader: 'Content uses semantic Typography variants for proper heading structure',
    focusManagement: 'Focus flows naturally through title, subtitle, and navigation buttons'
  },

  notes: [
    'Uses CSS Grid for responsive layout with 12-column system',
    'Video background automatically loops and plays without sound',
    'Responsive breakpoints adjust grid layout and content positioning',
    'Follows atomic design with composition of atoms (Button, Typography, Stack)',
    'Uses semantic spacing tokens for consistent layout spacing'
  ]
}