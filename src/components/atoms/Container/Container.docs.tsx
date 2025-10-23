import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Container } from './Container'
import { Typography } from '../Typography'
import { Stack } from '../Stack'

export const containerDocs: ComponentDocumentation = {
  id: 'container',
  name: 'Container',
  description: 'A responsive layout component that provides consistent page widths with automatic centering and progressive enhancement. Implements mobile-first design principles with semantic spacing tokens and optimized content readability across all viewport sizes. WCAG 2.2 AA compliant with comprehensive accessibility testing and semantic HTML structure.',
  category: 'Atoms',
  
  // Props extracted with full type safety from ContainerProps interface
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: 'The content to be wrapped and constrained by the container. Accepts any valid React elements including text, components, and complex layouts. Container provides responsive width constraints while preserving semantic meaning of child elements.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Unique identifier for testing purposes. Used to locate the component in automated tests and accessibility audits. Follows standard testing conventions for consistent test implementation.'
    },
    {
      name: '...props',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      required: false,
      default: '{}',
      description: 'All standard HTML div attributes including className, id, style, role, and event handlers. Provides full extensibility for custom styling and behavior while maintaining semantic HTML structure and accessibility properties.'
    }
  ],

  tokens: [
    'semantic.spacing.layout.2xl - Consistent horizontal padding across breakpoints',
    'base.breakpoint.sm (640px) - Small device breakpoint with 640px max-width',
    'base.breakpoint.md (768px) - Medium device breakpoint with 768px max-width', 
    'base.breakpoint.lg (1024px) - Large device breakpoint with 1024px max-width',
    'base.breakpoint.xl (1280px) - Extra large device breakpoint with 1280px max-width',
    'base.breakpoint.2xl (1536px) - Extra extra large device breakpoint with 1536px max-width'
  ],

  examples: [
    {
      name: 'Basic Page Layout',
      description: 'Standard container for main content areas with automatic responsive behavior',
      code: `<Container>
  <Stack direction="column" gap="lg">
    <Typography variant="h1">Welcome to Our Platform</Typography>
    <Typography variant="body">
      This content automatically adapts to screen size while maintaining 
      optimal readability through responsive max-width constraints and 
      consistent horizontal spacing.
    </Typography>
  </Stack>
</Container>`,
      renderComponent: () => (
        <Container style={{ border: '1px dashed #ccc', minHeight: '120px' }}>
          <Stack direction="column" gap="lg">
            <Typography variant="h1">Welcome to Our Platform</Typography>
            <Typography variant="body">
              This content automatically adapts to screen size while maintaining 
              optimal readability through responsive max-width constraints and 
              consistent horizontal spacing.
            </Typography>
          </Stack>
        </Container>
      )
    },
    {
      name: 'Article Content Wrapper',
      description: 'Container optimized for long-form content with proper typography hierarchy',
      code: `<Container>
  <article>
    <Stack direction="column" gap="md">
      <Typography variant="h2">Design System Principles</Typography>
      <Typography variant="body">
        Consistency in design creates predictable user experiences and reduces 
        cognitive load across digital products. The container component ensures 
        content remains readable across all device sizes.
      </Typography>
      <Typography variant="body">
        By implementing responsive width constraints based on established design 
        principles, we maintain optimal line length for comfortable reading 
        while providing generous whitespace around content areas.
      </Typography>
    </Stack>
  </article>
</Container>`,
      renderComponent: () => (
        <Container style={{ border: '1px dashed #ccc', minHeight: '140px' }}>
          <article>
            <Stack direction="column" gap="md">
              <Typography variant="h2">Design System Principles</Typography>
              <Typography variant="body">
                Consistency in design creates predictable user experiences and reduces 
                cognitive load across digital products. The container component ensures 
                content remains readable across all device sizes.
              </Typography>
              <Typography variant="body">
                By implementing responsive width constraints based on established design 
                principles, we maintain optimal line length for comfortable reading 
                while providing generous whitespace around content areas.
              </Typography>
            </Stack>
          </article>
        </Container>
      )
    },
    {
      name: 'Multi-Section Layout',
      description: 'Container with multiple content sections demonstrating vertical rhythm and consistent spacing',
      code: `<Container>
  <Stack direction="column" gap="xl">
    <section>
      <Stack direction="column" gap="sm">
        <Typography variant="h2">Getting Started</Typography>
        <Typography variant="body">
          Follow these steps to integrate the design system into your project 
          and begin building consistent user interfaces.
        </Typography>
      </Stack>
    </section>
    
    <section>
      <Stack direction="column" gap="sm">
        <Typography variant="h3">Installation Guide</Typography>
        <Typography variant="body">
          Install the package using your preferred package manager and configure 
          the theme provider in your application root for full design token access.
        </Typography>
      </Stack>
    </section>
    
    <section>
      <Stack direction="column" gap="sm">
        <Typography variant="h3">Configuration Options</Typography>
        <Typography variant="body">
          Customize tokens and component behavior through the provided configuration 
          options to align with your brand guidelines and user experience requirements.
        </Typography>
      </Stack>
    </section>
  </Stack>
</Container>`,
      renderComponent: () => (
        <Container style={{ border: '1px dashed #ccc', minHeight: '280px' }}>
          <Stack direction="column" gap="xl">
            <section>
              <Stack direction="column" gap="sm">
                <Typography variant="h2">Getting Started</Typography>
                <Typography variant="body">
                  Follow these steps to integrate the design system into your project 
                  and begin building consistent user interfaces.
                </Typography>
              </Stack>
            </section>
            
            <section>
              <Stack direction="column" gap="sm">
                <Typography variant="h3">Installation Guide</Typography>
                <Typography variant="body">
                  Install the package using your preferred package manager and configure 
                  the theme provider in your application root for full design token access.
                </Typography>
              </Stack>
            </section>
            
            <section>
              <Stack direction="column" gap="sm">
                <Typography variant="h3">Configuration Options</Typography>
                <Typography variant="body">
                  Customize tokens and component behavior through the provided configuration 
                  options to align with your brand guidelines and user experience requirements.
                </Typography>
              </Stack>
            </section>
          </Stack>
        </Container>
      )
    },
    {
      name: 'Semantic Landmarks with Custom Styling',
      description: 'Container with semantic HTML attributes and custom styling for advanced layout needs',
      code: `<Container 
  as="main"
  className="custom-page-container"
  id="main-content"
  data-testid="page-container"
  style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
>
  <Stack direction="column" gap="lg">
    <Typography variant="h2">Customized Container</Typography>
    <Typography variant="body">
      This container demonstrates semantic HTML usage with the main landmark role, 
      custom styling capabilities, and how additional HTML attributes can be applied 
      while maintaining responsive behavior and accessibility compliance.
    </Typography>
    <Typography variant="small">
      Background color, border radius, and semantic meaning enhance both visual 
      design and assistive technology navigation patterns.
    </Typography>
  </Stack>
</Container>`,
      renderComponent: () => (
        <Container 
          className="custom-page-container"
          id="demo-content"
          data-testid="demo-container"
          style={{ 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            minHeight: '140px'
          }}
        >
          <Stack direction="column" gap="lg">
            <Typography variant="h2">Customized Container</Typography>
            <Typography variant="body">
              This container demonstrates semantic HTML usage with the main landmark role, 
              custom styling capabilities, and how additional HTML attributes can be applied 
              while maintaining responsive behavior and accessibility compliance.
            </Typography>
            <Typography variant="small">
              Background color, border radius, and semantic meaning enhance both visual 
              design and assistive technology navigation patterns.
            </Typography>
          </Stack>
        </Container>
      )
    }
  ],

  accessibility: {
    notes: [
      'Renders semantic HTML div element that preserves accessibility properties of contained elements',
      'Transparent to assistive technologies - content accessibility determined by child elements',
      'Maintains natural document flow and reading order without interference',
      'Responsive design improves mobile accessibility by preventing horizontal scrolling',
      'Compatible with all ARIA attributes and landmark roles when applied appropriately',
      'Does not trap keyboard focus or interfere with navigation patterns',
      'Supports screen reader navigation through contained content without barriers',
      'WCAG 2.2 AA compliant with comprehensive automated accessibility testing via jest-axe',
      'Layout constraints improve readability by maintaining optimal content line lengths',
      'Consistent spacing enhances visual hierarchy and content comprehension for users with cognitive disabilities'
    ],
    keyboardNavigation: 'Does not intercept or modify keyboard navigation behavior. Focus management handled entirely by contained interactive elements with tab order preserved according to DOM structure.',
    screenReader: 'Container element ignored by screen readers unless semantic role applied. Content announced based on semantic meaning of contained elements with no additional reading disruptions.',
    focusManagement: 'Focus behavior inherited from contained interactive elements. No programmatic focus management implemented with visual focus indicators preserved from design system styles.'
  },

  notes: [
    'Mobile-First Responsive Design: Implements progressive enhancement starting with mobile-optimized layout (100% width with padding) and adding max-width constraints at larger breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)',
    'Design Token Integration: All spacing and breakpoint values derive from the semantic design token system, ensuring consistency across components. Horizontal padding uses semantic.spacing.layout.2xl token for theme-wide customization',
    'Automatic Centering Mechanism: Content centering achieved through margin: 0 auto combined with max-width constraints, ensuring consistent alignment regardless of content width while maintaining full width on smaller screens',
    'Styled-Components Architecture: Built with styled-components for optimal CSS-in-JS performance. Styles computed once and reused across instances with efficient min-width media queries for progressive enhancement',
    'Best Practice: Use as primary wrapper for main content areas, avoiding nested containers. Combine with semantic HTML elements (main, section, article) and appropriate ARIA landmark roles for meaningful document structure',
    'Performance Optimization: Generates minimal CSS output with no unnecessary re-renders. Responsive styles leverage browser-native media query optimization for smooth viewport transitions',
    'Accessibility Compliance: Tested extensively with automated jest-axe validation. Compatible with all HTML div attributes for extensibility while maintaining semantic structure and assistive technology compatibility',
    'Content Guidelines: Ideal for readable content areas, article layouts, and form foundations. Consider full-width layouts for heroes and navigation. Test responsive behavior across devices and browser zoom levels up to 200%'
  ]
}