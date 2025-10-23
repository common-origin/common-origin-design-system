import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Stack } from '../Stack'
import { Typography } from './Typography'

/**
 * Typography component documentation
 * Demonstrates semantic text rendering with design tokens
 */
export const typographyDocs: ComponentDocumentation = {
  id: 'typography',
  name: 'Typography',
  description: 'Semantic text component with predefined styles and color variants using design tokens. Provides consistent typography hierarchy across the design system. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from TypographyProps interface
  props: [
    {
      name: 'variant',
      type: 'TypographyVariant',
      required: false,
      default: 'body',
      description: 'Typography variant defining the semantic meaning and style. Options: display, h1-h6, subtitle, body, small, overline, caption, button1-button3, label'
    },
    {
      name: 'color',
      type: 'TypographyColor', 
      required: false,
      default: 'default',
      description: 'Color variant for the text. Options: default, emphasis, subdued, inverse, disabled, interactive, error, success, warning'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Content to render - text or other React nodes'
    },
    {
      name: 'as',
      type: 'React.ElementType',
      required: false,
      description: 'HTML element to render as (overrides default semantic element). Defaults vary by variant: h1-h6 for headings, p for body/subtitle, span for others'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing purposes'
    }
  ],

  tokens: [
    // Typography variant tokens
    'semantic.typography.display',
    'semantic.typography.h1',
    'semantic.typography.h2', 
    'semantic.typography.h3',
    'semantic.typography.h4',
    'semantic.typography.h5',
    'semantic.typography.h6',
    'semantic.typography.subtitle',
    'semantic.typography.body',
    'semantic.typography.small',
    'semantic.typography.overline',
    'semantic.typography.caption',
    'semantic.typography.button1',
    'semantic.typography.button2',
    'semantic.typography.button3',
    'semantic.typography.label',
    // Color variant tokens
    'semantic.color.text.default',
    'semantic.color.text.emphasis',
    'semantic.color.text.subdued',
    'semantic.color.text.inverse',
    'semantic.color.text.disabled',
    'semantic.color.text.interactive',
    'semantic.color.text.error',
    'semantic.color.text.success',
    'semantic.color.text.warning',
    // Letter spacing tokens
    'base.letterSpacing.0', // Display and H1
    'base.letterSpacing.1', // H2-H4
    'base.letterSpacing.2'  // H5-H6
  ],
  
  examples: [
    {
      name: 'Typography Hierarchy',
      description: 'All typography variants showing semantic hierarchy and text sizes',
      code: `<Stack direction="column" gap="md">
  <Typography variant="display">Display - Largest heading</Typography>
  <Typography variant="h1">Heading 1 - Main page title</Typography>
  <Typography variant="h2">Heading 2 - Section title</Typography>
  <Typography variant="h3">Heading 3 - Subsection title</Typography>
  <Typography variant="h4">Heading 4 - Minor heading</Typography>
  <Typography variant="h5">Heading 5 - Small heading</Typography>
  <Typography variant="h6">Heading 6 - Smallest heading</Typography>
  <Typography variant="subtitle">Subtitle - Supporting text</Typography>
  <Typography variant="body">Body text - Main content</Typography>
  <Typography variant="small">Small text - Fine print</Typography>
  <Typography variant="overline">Overline - Section labels</Typography>
  <Typography variant="label">Label text - Form labels</Typography>
  <Typography variant="caption">Caption text - Image captions</Typography>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Typography variant="display">Display - Largest heading</Typography>
          <Typography variant="h1">Heading 1 - Main page title</Typography>
          <Typography variant="h2">Heading 2 - Section title</Typography>
          <Typography variant="h3">Heading 3 - Subsection title</Typography>
          <Typography variant="h4">Heading 4 - Minor heading</Typography>
          <Typography variant="h5">Heading 5 - Small heading</Typography>
          <Typography variant="h6">Heading 6 - Smallest heading</Typography>
          <Typography variant="subtitle">Subtitle - Supporting text</Typography>
          <Typography variant="body">Body text - Main content</Typography>
          <Typography variant="small">Small text - Fine print</Typography>
          <Typography variant="overline">Overline - Section labels</Typography>
          <Typography variant="label">Label text - Form labels</Typography>
          <Typography variant="caption">Caption text - Image captions</Typography>
        </Stack>
      )
    },
    {
      name: 'Color Variants',
      description: 'Semantic color variations for different contexts',
      code: `<Typography color="default">Default text</Typography>
<Typography color="emphasis">Emphasis text</Typography>
<Typography color="subdued">Subdued text</Typography>
<Typography color="disabled">Disabled text</Typography>
<Typography color="interactive">Interactive text</Typography>
<Typography color="error">Error text</Typography>
<Typography color="success">Success text</Typography>
<Typography color="warning">Warning text</Typography>
`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <Typography color="default">Default text</Typography>
          <Typography color="emphasis">Emphasis text</Typography>
          <Typography color="subdued">Subdued text</Typography>
          <Typography color="disabled">Disabled text</Typography>
          <Typography color="interactive">Interactive text</Typography>
          <Typography color="error">Error text</Typography>
          <Typography color="success">Success text</Typography>
          <Typography color="warning">Warning text</Typography>
        </Stack>
      )
    },
    {
      name: 'Button Typography Variants',
      description: 'Typography variants designed for button components',
      code: `<Stack direction="column" gap="sm">
  <Typography variant="button1">Button Primary Text</Typography>
  <Typography variant="button2">Button Secondary Text</Typography>
  <Typography variant="button3">Button Small Text</Typography>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <Typography variant="button1">Button Primary Text</Typography>
          <Typography variant="button2">Button Secondary Text</Typography>
          <Typography variant="button3">Button Small Text</Typography>
        </Stack>
      )
    },
    {
      name: 'Polymorphic Rendering',
      description: 'Using the "as" prop to render different HTML elements while maintaining visual styling',
      code: `<Stack direction="column" gap="sm">
  <Typography variant="h3" as="h1">H3 Style as H1 Element (for SEO)</Typography>
  <Typography variant="body" as="div">Body style as div container</Typography>
  <Typography variant="label" as="span">Label as inline span</Typography>
  <Typography variant="caption" as="figcaption">Caption as figure caption</Typography>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <Typography variant="h3" as="h1">H3 Style as H1 Element (for SEO)</Typography>
          <Typography variant="body" as="div">Body style as div container</Typography>
          <Typography variant="label" as="span">Label as inline span</Typography>
          <Typography variant="caption" as="figcaption">Caption as figure caption</Typography>
        </Stack>
      )
    },
    {
      name: 'Real-world Usage Examples',
      description: 'Common patterns showing proper semantic hierarchy and accessibility',
      code: `<Stack direction="column" gap="lg">
  {/* Article header */}
  <Stack direction="column" gap="sm">
    <Typography variant="overline" color="subdued">DESIGN SYSTEM</Typography>
    <Typography variant="h1">Typography Component Guide</Typography>
    <Typography variant="subtitle" color="subdued">Learn how to use typography effectively in your designs</Typography>
  </Stack>
  
  {/* Article content */}
  <Stack direction="column" gap="md">
    <Typography variant="h2">Getting Started</Typography>
    <Typography variant="body">
      The Typography component provides consistent text rendering across your application
      with semantic HTML elements and design token integration.
    </Typography>
    
    <Typography variant="h3">Best Practices</Typography>
    <Typography variant="body">
      Always use semantic variants for proper document structure and accessibility.
    </Typography>
    <Typography variant="small" color="subdued">
      Last updated: December 2024
    </Typography>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          {/* Article header */}
          <Stack direction="column" gap="sm">
            <Typography variant="overline" color="subdued">DESIGN SYSTEM</Typography>
            <Typography variant="h1">Typography Component Guide</Typography>
            <Typography variant="subtitle" color="subdued">Learn how to use typography effectively in your designs</Typography>
          </Stack>
          
          {/* Article content */}
          <Stack direction="column" gap="md">
            <Typography variant="h2">Getting Started</Typography>
            <Typography variant="body">
              The Typography component provides consistent text rendering across your application
              with semantic HTML elements and design token integration.
            </Typography>
            
            <Typography variant="h3">Best Practices</Typography>
            <Typography variant="body">
              Always use semantic variants for proper document structure and accessibility.
            </Typography>
            <Typography variant="small" color="subdued">
              Last updated: December 2024
            </Typography>
          </Stack>
        </Stack>
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Semantic HTML Elements: Uses proper heading hierarchy (h1-h6), paragraph tags for body text, and spans for inline content',
      'Heading Structure: Display and h1-h6 variants automatically map to semantic heading elements for proper document outline',
      'Polymorphic Support: "as" prop allows visual style separation from semantic meaning (e.g., h3 style as h1 element)',
      'Color Contrast: All 9 color variants (default, emphasis, subdued, inverse, disabled, interactive, error, success, warning) meet WCAG AA contrast ratios',
      'Screen Reader Support: Content announced with appropriate semantic context based on HTML element',
      'Document Outline: Proper heading hierarchy helps screen readers navigate page structure effectively',
      'Focus Management: Non-interactive component - no focus management required',
      'Text Scaling: Typography responds to browser text scaling up to 200% as required by WCAG 2.2',
      'High Contrast Mode: All text colors work with system high contrast modes',
      'Automated Testing: Comprehensive jest-axe testing ensures ongoing accessibility compliance across all variants'
    ],
    keyboardNavigation: 'Not interactive - no keyboard navigation required or supported',
    screenReader: 'Content announced with semantic context: headings as navigational landmarks, body text as readable content, spans as inline text',
    colorContrast: 'All color variants exceed WCAG AA requirements (4.5:1 for normal text, 3:1 for large text). Tested against both light and dark backgrounds.',
    focusManagement: 'Not applicable - Typography is a non-interactive presentation component'
  },
  
  notes: [
    'Semantic First: Always choose variants based on semantic meaning (h1 for main title, h2 for sections, body for content)',
    'Heading Hierarchy: Only use one h1 per page, follow logical heading order (h1 → h2 → h3, never skip levels)',
    'Polymorphic Usage: Use "as" prop when visual style needs to differ from semantic meaning (e.g., h3 style as h1 for SEO)',
    'Color Semantics: Color variants carry meaning - use "error" for error states, "success" for confirmations, "subdued" for secondary info',
    'Button Variants: button1, button2, button3 variants are specifically designed for button component text styling',
    'Design Tokens: All styles derive from semantic typography tokens ensuring consistency across the design system',
    'Default Elements: Component automatically selects appropriate HTML elements: h1-h6 for headings, p for body/subtitle, span for inline text',
    'Line Height: Body, subtitle, and small variants include enhanced line-height (1.5) for improved readability',
    'Letter Spacing: Heading variants (display, h1-h6) include letter-spacing tokens for optimal visual hierarchy',
    'Responsive Design: Typography scales appropriately with browser text scaling and system font size preferences'
  ]
  
}
