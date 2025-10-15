import { ComponentDocumentation } from '../../../lib/docgen/types'
import { CodeBlock } from './CodeBlock'

export const codeBlockDocs: ComponentDocumentation = {
  id: 'codeblock',
  name: 'CodeBlock',
  description: 'Displays formatted code with syntax highlighting, copy functionality, and consistent styling. Perfect for documentation and technical content.',
  category: 'Molecules',
  
  // Props extracted with full type safety from CodeBlockProps interface
  props: [
    {
      name: 'children',
      type: 'string',
      required: true,
      description: 'Code content to display'
    },
    {
      name: 'showCopyButton',
      type: 'boolean',
      required: false,
      description: 'Show copy-to-clipboard button'
    },
    {
      name: 'onCopy',
      type: '() => void',
      required: false,
      description: 'Callback fired when code is copied'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing'
    }
  ],

  tokens: [
    'semantic.color.background.subtle',
    'semantic.border.subtle',
    'base.border.radius.2',
    'semantic.spacing.layout.md',
    'base.fontFamily.monospace',
    'semantic.typography.code'
  ],

  examples: [
    {
      name: 'Basic Code Block',
      description: 'Simple code display without copy button',
      code: `<CodeBlock>
{\`const greeting = "Hello, world!"
console.log(greeting)\`}
</CodeBlock>`,
      renderComponent: () => (
        <CodeBlock>
{`const greeting = "Hello, world!"
console.log(greeting)`}
        </CodeBlock>
      )
    },
    {
      name: 'With Copy Button',
      description: 'Code block with copy-to-clipboard functionality',
      code: `<CodeBlock showCopyButton onCopy={() => console.log('Copied!')}>
{\`function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1)
}
console.log(factorial(5)) // 120\`}
</CodeBlock>`,
      renderComponent: () => (
        <CodeBlock showCopyButton onCopy={() => console.log('Copied!')}>
{`function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1)
}
console.log(factorial(5)) // 120`}
        </CodeBlock>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic <pre> element for preserved formatting',
      'Copy button includes accessible label',
      'Keyboard navigation support for copy functionality',
      'Monospace font improves code readability'
    ],
    keyboardNavigation: 'Tab to copy button, Enter/Space to copy',
    screenReader: 'Code content announced with preserved formatting',
    focusManagement: 'Copy button receives focus outline'
  },

  notes: [
    'Preserves whitespace and formatting for code display',
    'Copy functionality uses modern clipboard API',
    'Consistent styling matches design system tokens',
    'Scrollable for long code snippets',
    'Works well with syntax highlighting libraries'
  ]
}
