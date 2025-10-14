import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Container } from './Container'
import { Typography } from '../Typography'
import { Stack } from '../Stack'

export const containerDocs: ComponentDocumentation = {
  id: 'container',
  name: 'Container',
  description: 'Responsive container component that centers content with consistent horizontal padding and max-width constraints across breakpoints. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from ContainerProps interface
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Content to be contained and centered'
    }
  ],

  tokens: [
    'semantic.spacing.layout.2xl',
    'semantic.breakpoint.sm',
    'semantic.breakpoint.md',
    'semantic.breakpoint.lg',
    'semantic.breakpoint.xl',
    'semantic.layout.container.maxWidth.*'
  ],

  examples: [
    {
      name: 'Basic Container',
      description: 'Simple container wrapping content',
      code: `<Container>
  <Stack direction="column" gap="lg">
    <Typography variant="h2">Contained Content</Typography>
    <Typography>
      This content is automatically centered and has responsive padding.
      The container adapts to different screen sizes with appropriate max-widths.
    </Typography>
  </Stack>
</Container>`,
      renderComponent: () => (
        <Container>
          <Stack direction="column" gap="lg">
            <Typography variant="h2">Contained Content</Typography>
            <Typography>
              This content is automatically centered and has responsive padding.
              The container adapts to different screen sizes with appropriate max-widths.
            </Typography>
          </Stack>
        </Container>
      )
    }
  ],

  accessibility: {
    notes: [
      'Semantic HTML div element',
      'Does not interfere with content accessibility',
      'Maintains natural reading order',
      'Responsive design improves mobile accessibility',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'Layout component that enhances rather than hinders accessibility',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Inherited from child components',
    screenReader: 'Transparent to screen readers',
    focusManagement: 'Does not trap or manage focus'
  },

  notes: [
    'Automatically applies responsive max-widths at different breakpoints',
    'Consistent horizontal padding across all screen sizes',
    'Centers content using auto margins',
    'Works well as a page-level wrapper for main content',
    'Combine with other layout components for complex designs'
  ]
}