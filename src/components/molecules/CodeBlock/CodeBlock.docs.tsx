import { ComponentDocumentation } from '../../../lib/docgen/types'
import { CodeBlock } from './CodeBlock'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'

export const codeBlockDocs: ComponentDocumentation = {
  id: 'codeblock',
  name: 'CodeBlock',
  description: 'A comprehensive code display component optimized for developer documentation and technical content. Features syntax-preserved formatting, modern clipboard integration, and enhanced accessibility support. Designed for technical documentation, API references, code tutorials, and developer onboarding experiences with WCAG 2.2 AA compliance.',
  category: 'Molecules',
  
  // Props extracted with full type safety from CodeBlockProps interface
  props: [
    {
      name: 'children',
      type: 'string',
      required: true,
      description: 'The code content to display with preserved whitespace and formatting. Accepts multi-line strings with proper indentation, line breaks, and spacing that will be rendered exactly as provided for accurate code representation.'
    },
    {
      name: 'showCopyButton',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Controls the visibility of the copy-to-clipboard button. When true, displays an accessible button that copies the entire code content to the user\'s clipboard with visual feedback and screen reader announcements.'
    },
    {
      name: 'onCopy',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: 'Optional callback function executed when the code is successfully copied to clipboard. Useful for analytics tracking, user feedback, or triggering additional actions in response to copy events.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Testing identifier for automated test location and interaction verification. Enables consistent testing patterns across different code block instances and content variations throughout the application.'
    }
  ],

  tokens: [
    'semantic.color.background.subtle - Subtle background color providing clear code container definition',
    'semantic.border.subtle - Subtle border styling for visual separation from surrounding content',
    'base.border.radius.2 - Consistent rounded corners matching design system patterns',
    'semantic.spacing.layout.md - Internal padding for comfortable code reading and visual breathing room',
    'base.fontFamily.monospace - Monospace font family ensuring proper code alignment and character spacing',
    'semantic.color.text.default - Standard text color optimized for code readability across themes',
    'base.fontSize.1 - Appropriate font size for code content balancing readability and space efficiency',
    'base.lineHeight.3 - Optimal line height for multi-line code preventing cramped or spread-out appearance'
  ],

  examples: [
    {
      name: 'JavaScript Code Examples',
      description: 'JavaScript code snippets with proper syntax preservation and copy functionality for developer documentation',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="h4">Function Declaration</Typography>
    <CodeBlock showCopyButton>
{\`function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

const cart = [
  { name: 'Laptop', price: 999.99 },
  { name: 'Mouse', price: 29.99 }
]

console.log(calculateTotal(cart)) // 1029.98\`}
    </CodeBlock>
  </div>
  
  <div>
    <Typography variant="h4">Async/Await Pattern</Typography>
    <CodeBlock showCopyButton onCopy={() => console.log('Async example copied')}>
{\`async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`)
    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error:', error.message)
    return null
  }
}\`}
    </CodeBlock>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="h4">Function Declaration</Typography>
            <CodeBlock showCopyButton>
{`function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

const cart = [
  { name: 'Laptop', price: 999.99 },
  { name: 'Mouse', price: 29.99 }
]

console.log(calculateTotal(cart)) // 1029.98`}
            </CodeBlock>
          </div>
          
          <div>
            <Typography variant="h4">Async/Await Pattern</Typography>
            <CodeBlock showCopyButton onCopy={() => console.log('Async example copied')}>
{`async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`)
    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error:', error.message)
    return null
  }
}`}
            </CodeBlock>
          </div>
        </Stack>
      )
    },
    {
      name: 'React Component Examples',
      description: 'React component code with JSX syntax and component patterns for frontend documentation',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="h4">Functional Component with Hooks</Typography>
    <CodeBlock showCopyButton>
{\`import React, { useState, useEffect } from 'react'
import { Button } from '@/components/atoms/Button'

export const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser(userId).then(userData => {
      setUser(userData)
      setLoading(false)
    })
  }, [userId])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <Button onClick={() => console.log('Edit user')}>
        Edit Profile
      </Button>
    </div>
  )
}\`}
    </CodeBlock>
  </div>
  
  <div>
    <Typography variant="h4">Custom Hook Example</Typography>
    <CodeBlock showCopyButton>
{\`import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })
  
  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }
  
  return [storedValue, setValue]
}\`}
    </CodeBlock>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="h4">Functional Component with Hooks</Typography>
            <CodeBlock showCopyButton>
{`import React, { useState, useEffect } from 'react'
import { Button } from '@/components/atoms/Button'

export const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser(userId).then(userData => {
      setUser(userData)
      setLoading(false)
    })
  }, [userId])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <Button onClick={() => console.log('Edit user')}>
        Edit Profile
      </Button>
    </div>
  )
}`}
            </CodeBlock>
          </div>
          
          <div>
            <Typography variant="h4">Custom Hook Example</Typography>
            <CodeBlock showCopyButton>
{`import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })
  
  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }
  
  return [storedValue, setValue]
}`}
            </CodeBlock>
          </div>
        </Stack>
      )
    },
    {
      name: 'Configuration and Data Examples',
      description: 'Configuration files, JSON data, and markup examples for comprehensive technical documentation',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="h4">Package.json Configuration</Typography>
    <CodeBlock showCopyButton>
{\`{
  "name": "my-design-system",
  "version": "1.0.0",
  "description": "A comprehensive design system",
  "main": "dist/index.js",
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "storybook": "start-storybook -p 6006"
  },
  "dependencies": {
    "react": "^18.2.0",
    "styled-components": "^5.3.6"
  },
  "devDependencies": {
    "@rollup/plugin-typescript": "^8.5.0",
    "jest": "^29.0.0"
  }
}\`}
    </CodeBlock>
  </div>
  
  <div>
    <Typography variant="h4">CSS-in-JS Styling</Typography>
    <CodeBlock showCopyButton>
{\`import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const StyledCard = styled.div\`
  background: \${tokens.semantic.color.background.default};
  border: \${tokens.semantic.border.default};
  border-radius: \${tokens.base.border.radius[2]};
  padding: \${tokens.semantic.spacing.layout.md};
  box-shadow: \${tokens.semantic.elevation.low};
  
  &:hover {
    box-shadow: \${tokens.semantic.elevation.medium};
    transform: translateY(-2px);
    transition: all 0.2s ease;
  }
\`;

export const Card = ({ children, ...props }) => (
  <StyledCard {...props}>{children}</StyledCard>
)\`}
    </CodeBlock>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="h4">Package.json Configuration</Typography>
            <CodeBlock showCopyButton>
{`{
  "name": "my-design-system",
  "version": "1.0.0",
  "description": "A comprehensive design system",
  "main": "dist/index.js",
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "storybook": "start-storybook -p 6006"
  },
  "dependencies": {
    "react": "^18.2.0",
    "styled-components": "^5.3.6"
  },
  "devDependencies": {
    "@rollup/plugin-typescript": "^8.5.0",
    "jest": "^29.0.0"
  }
}`}
            </CodeBlock>
          </div>
          
          <div>
            <Typography variant="h4">CSS-in-JS Styling</Typography>
            <CodeBlock showCopyButton>
{`import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const StyledCard = styled.div\`
  background: \${tokens.semantic.color.background.default};
  border: \${tokens.semantic.border.default};
  border-radius: \${tokens.base.border.radius[2]};
  padding: \${tokens.semantic.spacing.layout.md};
  box-shadow: \${tokens.semantic.elevation.low};
  
  &:hover {
    box-shadow: \${tokens.semantic.elevation.medium};
    transform: translateY(-2px);
    transition: all 0.2s ease;
  }
\`;

export const Card = ({ children, ...props }) => (
  <StyledCard {...props}>{children}</StyledCard>
)`}
            </CodeBlock>
          </div>
        </Stack>
      )
    },
    {
      name: 'Terminal Commands and Shell Scripts',
      description: 'Command-line instructions and shell scripts for developer setup and deployment guides',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="h4">Installation Commands</Typography>
    <CodeBlock showCopyButton>
{\`# Install dependencies
npm install

# Install with yarn
yarn install

# Install specific version
npm install @myorg/design-system@^2.0.0

# Install as dev dependency
npm install --save-dev @myorg/design-system\`}
    </CodeBlock>
  </div>
  
  <div>
    <Typography variant="h4">Build and Deploy Script</Typography>
    <CodeBlock showCopyButton onCopy={() => console.log('Deploy script copied')}>
{\`#!/bin/bash

# Build and deploy script
set -e

echo "Building design system..."
npm run build

echo "Running tests..."
npm test

echo "Building storybook..."
npm run build-storybook

echo "Deploying to production..."
aws s3 sync ./storybook-static s3://my-design-system-docs
aws cloudfront create-invalidation --distribution-id E123456789 --paths "/*"

echo "Deployment complete! 🚀"\`}
    </CodeBlock>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="h4">Installation Commands</Typography>
            <CodeBlock showCopyButton>
{`# Install dependencies
npm install

# Install with yarn
yarn install

# Install specific version
npm install @myorg/design-system@^2.0.0

# Install as dev dependency
npm install --save-dev @myorg/design-system`}
            </CodeBlock>
          </div>
          
          <div>
            <Typography variant="h4">Build and Deploy Script</Typography>
            <CodeBlock showCopyButton onCopy={() => console.log('Deploy script copied')}>
{`#!/bin/bash

# Build and deploy script
set -e

echo "Building design system..."
npm run build

echo "Running tests..."
npm test

echo "Building storybook..."
npm run build-storybook

echo "Deploying to production..."
aws s3 sync ./storybook-static s3://my-design-system-docs
aws cloudfront create-invalidation --distribution-id E123456789 --paths "/*"

echo "Deployment complete! 🚀"`}
            </CodeBlock>
          </div>
        </Stack>
      )
    },
    {
      name: 'Copy Functionality and User Feedback',
      description: 'CodeBlock variants demonstrating copy button states and user feedback mechanisms',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="h4">Basic Code without Copy Button</Typography>
    <CodeBlock showCopyButton={false}>
{\`// This code block has copy disabled
const readOnlyExample = "View only content"
console.log("No copy functionality available")\`}
    </CodeBlock>
  </div>
  
  <div>
    <Typography variant="h4">With Custom Copy Callback</Typography>
    <CodeBlock 
      showCopyButton={true}
      onCopy={() => {
        console.log('Custom callback executed!')
        // Could trigger analytics, notifications, etc.
      }}
    >
{\`// This triggers a custom callback when copied
function trackCopyEvent() {
  analytics.track('code_copied', {
    component: 'CodeBlock',
    content_type: 'javascript'
  })
}

trackCopyEvent()\`}
    </CodeBlock>
  </div>
  
  <div>
    <Typography variant="h4">Long Code with Scrolling</Typography>
    <CodeBlock showCopyButton>
{\`// Long code example demonstrating horizontal scrolling
const veryLongVariableName = "This is a very long line of code that will demonstrate horizontal scrolling behavior in the CodeBlock component"

const complexObject = {
  propertyOne: "value1",
  propertyTwo: "value2", 
  propertyThree: "value3",
  propertyFour: {
    nestedProperty: "nested value with a very long string that extends beyond typical line length",
    anotherNested: {
      deeplyNested: "This demonstrates how the CodeBlock handles deeply nested and long content structures"
    }
  }
}

console.log("The CodeBlock component maintains proper formatting and provides horizontal scrolling for long lines")\`}
    </CodeBlock>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="h4">Basic Code without Copy Button</Typography>
            <CodeBlock showCopyButton={false}>
{`// This code block has copy disabled
const readOnlyExample = "View only content"
console.log("No copy functionality available")`}
            </CodeBlock>
          </div>
          
          <div>
            <Typography variant="h4">With Custom Copy Callback</Typography>
            <CodeBlock 
              showCopyButton={true}
              onCopy={() => {
                console.log('Custom callback executed!')
                // Could trigger analytics, notifications, etc.
              }}
            >
{`// This triggers a custom callback when copied
function trackCopyEvent() {
  analytics.track('code_copied', {
    component: 'CodeBlock',
    content_type: 'javascript'
  })
}

trackCopyEvent()`}
            </CodeBlock>
          </div>
          
          <div>
            <Typography variant="h4">Long Code with Scrolling</Typography>
            <CodeBlock showCopyButton>
{`// Long code example demonstrating horizontal scrolling
const veryLongVariableName = "This is a very long line of code that will demonstrate horizontal scrolling behavior in the CodeBlock component"

const complexObject = {
  propertyOne: "value1",
  propertyTwo: "value2", 
  propertyThree: "value3",
  propertyFour: {
    nestedProperty: "nested value with a very long string that extends beyond typical line length",
    anotherNested: {
      deeplyNested: "This demonstrates how the CodeBlock handles deeply nested and long content structures"
    }
  }
}

console.log("The CodeBlock component maintains proper formatting and provides horizontal scrolling for long lines")`}
            </CodeBlock>
          </div>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic HTML <pre> element which preserves whitespace formatting and announces code content appropriately to screen readers with proper context',
      'Copy button includes comprehensive accessibility attributes with descriptive aria-label and role="button" for clear assistive technology interaction',
      'Keyboard navigation fully supported: Tab key moves focus to copy button, Enter and Space keys activate copy functionality following standard web interaction patterns',
      'Copy button provides immediate visual and auditory feedback with "Copied!" text change and screen reader announcements confirming successful clipboard operation',
      'Monospace font family enhances code readability by ensuring consistent character spacing, proper alignment, and improved visual scanning for developers',
      'High contrast support maintained across all color themes ensuring code remains readable in high contrast mode with proper background and text color relationships',
      'Focus indicators are highly visible with design system consistent focus outline styling, providing clear visual feedback for keyboard navigation users',
      'Content is announced by screen readers as code with preserved formatting, maintaining the semantic meaning and structure essential for understanding technical content',
      'Copy functionality gracefully degrades when clipboard API is unavailable, with error handling that prevents component failure and provides appropriate user feedback',
      'Responsive design ensures horizontal scrolling on smaller screens while maintaining accessibility navigation patterns and touch-friendly copy button interaction',
      'WCAG 2.2 AA compliance verified through automated jest-axe testing with comprehensive coverage of color contrast, keyboard navigation, and screen reader compatibility',
      'No focus traps or navigation barriers introduced - users can tab through the component naturally as part of the larger page flow without accessibility interruptions'
    ],
    keyboardNavigation: 'Tab key moves focus to the copy button when showCopyButton is true. Enter or Space key activates the copy functionality. Focus outline is clearly visible and follows design system standards. No keyboard traps are introduced.',
    screenReader: 'Code content is announced with proper formatting preserved through the semantic <pre> element. Copy button announces as "Copy code to clipboard, button" and provides feedback when activated: "Code copied to clipboard".',
    focusManagement: 'Copy button receives focus with visible outline following design system focus indicators. Focus is not trapped within the component and follows natural tab order. Focus management respects user preferences for focus-visible behavior.'
  },

  notes: [
    'Developer Experience Optimization: Component designed specifically for technical documentation with syntax-preserved formatting, making it ideal for API documentation, code tutorials, and developer onboarding materials where exact code representation is critical.',
    'Modern Clipboard Integration: Uses the modern Navigator Clipboard API with proper error handling and fallback support. Copy functionality includes immediate visual feedback and works reliably across different browsers and security contexts.',
    'Responsive Behavior: Horizontal scrolling ensures long code lines remain readable on all screen sizes. Copy button positioning adapts to content length while maintaining consistent accessibility and interaction patterns.',
    'Performance Considerations: Component renders efficiently with minimal re-renders. String content is passed directly without processing, maintaining fast rendering performance even with large code blocks or frequent updates.',
    'Content Flexibility: Accepts any string content with preserved whitespace, indentation, and line breaks. Handles various programming languages, configuration files, command-line instructions, and markup examples equally well.',
    'Integration Patterns: Works seamlessly with syntax highlighting libraries, documentation generators, and content management systems. onCopy callback enables analytics tracking, user feedback systems, and custom interaction behaviors.',
    'Design System Consistency: All visual styling derives from design tokens ensuring consistency with the broader design system. Background, border, spacing, and typography follow established patterns for predictable user experience.',
    'Testing Support: Comprehensive data-testid support enables consistent automated testing. Component includes extensive test coverage for copy functionality, accessibility compliance, and edge cases like clipboard API failures.'
  ]
}
