import { ComponentDocumentation } from '../../../lib/docgen/types'
import { PageTitle } from './PageTitle'

export const pageTitleDocs: ComponentDocumentation = {
  id: 'pageTitle',
  name: 'PageTitle',
  description: 'Displays the title of a page with optional subtitle and back button.',
  category: 'Molecules',
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Main title of the page'
    },
    {
      name: 'subtitle',
      type: 'string',
      required: false,
      description: 'Optional subtitle for the page'
    },
    {
      name: 'hasBackButton',
      type: 'boolean',
      required: false,
      description: 'Whether to display a back button'
    }
  ],
  tokens: [
    'semantic.space.600', // Bottom margin
    'semantic.space.1200', // Top margin without a back button
    'semantic.space.0', // Top margin with a back button
    'semantic.typography.h1', // Title
    'semantic.typography.caption', // Subtitle
    'semantic.color.text.muted',
  ],
  examples: [
    {
      name: 'Default Page Title',
      description: 'Basic page title with no subtitle or back button',
      code: `<PageTitle title="Welcome to Common Origin" subtitle="Your design system" />`,
      renderComponent: () => (
        <PageTitle title="Welcome to Common Origin" subtitle="Your design system" />
      )
    },
    {
      name: 'Page Title with Back Button',
      description: 'Page title with a back button for navigation',
      code: `<PageTitle title="Back to Home" hasBackButton />`,
      renderComponent: () => (
        <PageTitle title="Back to Home" hasBackButton />
      )
    }
  ]
}
