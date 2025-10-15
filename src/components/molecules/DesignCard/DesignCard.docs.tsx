import { ComponentDocumentation } from '../../../lib/docgen/types'
import { DesignCard } from './DesignCard'

export const designCardDocs: ComponentDocumentation = {
	id: 'designcard',
	name: 'DesignCard',
	description: 'Displays design-related content with title, excerpt, labels, and cover image.',
	category: 'Molecules',
	props: [
		{
				name: 'title',
				type: 'string',
				required: true,
				description: 'Title of the design card'
		},
		{
				name: 'excerpt',
				type: 'string',
				required: true,
				description: 'Short description or excerpt of the design'
		},
		{
				name: 'labels',
				type: 'string[]',
				required: false,
				description: 'Array of labels for categorization'
		},
		{
				name: 'tag',
				type: 'string',
				required: true,
				description: 'Tag to filter content, should be "design" for this component'
		},
		{
				name: 'coverImage',
				type: 'string',
				required: true,
				description: 'URL of the cover image for the design card'
		},
		{
				name: 'date',
				type: 'string',
				required: true,
				description: 'Publication date of the design'
		},
		{
				name: 'slug',
				type: 'string',
				required: true,
				description: 'Unique identifier for the design, used in URLs'
			}
	],

	tokens: [
			'semantic.color.background.subtle',
			'semantic.border.subtle',
			'base.border.radius.2',
			'semantic.spacing.layout.md',
			'semantic.spacing.layout.lg',
			'base.fontFamily.sans',
			'semantic.typography.heading.3',
			'semantic.typography.body'
	],

	examples: [
		{
			name: 'Basic Design Card',
			description: 'Displays a design card with title, excerpt, labels, and cover image.',
			code: `<DesignCard
				title="Sample Design"
				excerpt="This is a sample design excerpt."    
					labels={['UI', 'UX']}
					tag="design"
					coverImage="/assets/art/art-5.jpg"
					date="2025-07-24"
					slug="sample-design"
				/>`,
				renderComponent: () => (
					<DesignCard
						title="Sample Design"
						excerpt="This is a sample design excerpt."
						labels={['UI', 'UX']}
						tag="design"
						coverImage="/assets/art/art-5.jpg"
						date="2025-07-24"
						slug="sample-design"
					/>
				)
			},
			{
				name: 'Design Card with Multiple Labels',
				description: 'Shows how to use multiple labels in the design card.',
				code: `<DesignCard
					title="Advanced Design"
					excerpt="An advanced design example with multiple labels."
					labels={['Accessibility', 'Responsive', 'Modern']}
					tag="design"
					coverImage="/assets/art/art-5.jpg"
					date="2025-08-01"
					slug="advanced-design"
				/>`,
				renderComponent: () => (
					<DesignCard
						title="Advanced Design"
						excerpt="An advanced design example with multiple labels."
						labels={['Accessibility', 'Responsive', 'Modern']}
						tag="design"
						coverImage="/assets/art/art-5.jpg"
						date="2025-08-01"
						slug="advanced-design"
					/>
				)
			}
	]
}

