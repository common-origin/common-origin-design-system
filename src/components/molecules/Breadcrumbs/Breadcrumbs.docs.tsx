import { Breadcrumbs } from './Breadcrumbs'

export default {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component: 'Breadcrumbs navigation for hierarchical site structure.'
      }
    }
  },
}

export const Example = () => (
  <Breadcrumbs breadcrumbs={[
    { label: 'Home', url: '/' },
    { label: 'Section', url: '/section' },
    { label: 'Page', url: '/section/page' }
  ]} />
)
