import { ComponentDocumentation } from '../../../lib/docgen/types'
import { PageTitle } from './PageTitle'
import { Typography } from '../../atoms/Typography'

export const pageTitleDocs: ComponentDocumentation = {
  id: 'page-title',
  name: 'PageTitle',
  description: 'The main heading of a page (an h1), with an optional subtitle below it. It adds generous space above and below so page content starts at a consistent position.',
  category: 'Molecules',
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Main title of the page, rendered as an h1'
    },
    {
      name: 'subtitle',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Optional subtitle, rendered below the title as uppercase caption text in the subdued colour'
    },
    {
      name: 'hasBackButton',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Shows a back button above the title and removes the top margin. Warning: the button currently always links to /music with the label "Go back to music page", and neither can be changed (tracked in #81). Avoid it until that is fixed.'
    }
  ],
  tokens: [
    'semantic.spacing.layout.2xl',
    'semantic.spacing.layout.7xl',
    'semantic.spacing.layout.none'
  ],
  examples: [
    {
      name: 'Title Only',
      description: 'A page heading with no subtitle.',
      code: `<PageTitle title="Settings" />`,
      renderComponent: () => (
        <PageTitle title="Settings" />
      )
    },
    {
      name: 'Title and Subtitle',
      description: 'A subtitle adds a short line of context below the heading.',
      code: `<PageTitle title="Welcome to Common Origin" subtitle="Your design system" />`,
      renderComponent: () => (
        <PageTitle title="Welcome to Common Origin" subtitle="Your design system" />
      )
    },
    {
      name: 'At the Top of a Page',
      description: 'PageTitle sets the space above the heading and before the first content, so the content that follows needs no extra top margin.',
      code: `<>
  <PageTitle title="Recipes" subtitle="Saved this week" />
  <Typography>Five recipes, sorted by cooking time.</Typography>
</>`,
      renderComponent: () => (
        <>
          <PageTitle title="Recipes" subtitle="Saved this week" />
          <Typography>Five recipes, sorted by cooking time.</Typography>
        </>
      )
    }
  ],
  accessibility: {
    notes: [
      'The title renders as an h1. Use one PageTitle per page, so the page has a single top-level heading',
      'The subtitle is a span, not a heading, so it does not affect the heading outline',
      'The back button is an IconButton link with an aria-label, but its destination and label are hard-coded (#81)'
    ]
  },
  anatomy: {
    description: 'A container with vertical margin, an optional back button, and a stack with the title and optional subtitle.',
    parts: [
      {
        name: 'Container',
        description: 'Bottom margin 2xl. Top margin 7xl, or none when the back button is shown.',
        tokens: [
          'semantic.spacing.layout.2xl',
          'semantic.spacing.layout.7xl',
          'semantic.spacing.layout.none'
        ]
      },
      {
        name: 'Back button',
        description: 'Optional naked, large IconButton with the back icon.'
      },
      {
        name: 'Title',
        description: 'Typography variant h1.'
      },
      {
        name: 'Subtitle',
        description: 'Optional Typography, caption variant (uppercase span), subdued colour.'
      }
    ]
  }
}
