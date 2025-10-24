# Documentation Standards

## Overview
This document establishes comprehensive standards for all documentation in the Common Origin Design System. Consistent, thorough documentation is essential for maintainability, collaboration, and developer experience.

## Documentation Types

### 1. Component Documentation (.docs.tsx)

Every component MUST have a corresponding `.docs.tsx` file that exports a `ComponentDocumentation` object.

#### Required Structure
```tsx
import type { ComponentDocumentation } from '@/lib/docgen/types'
import { ComponentName } from './ComponentName'

export const componentNameDocs: ComponentDocumentation = {
  id: 'component-name',
  name: 'Component Name',
  description: 'Clear, concise description (1-2 sentences)',
  category: 'Atoms' | 'Molecules' | 'Organisms' | 'Layout',
  
  props: [...],        // REQUIRED
  tokens: [...],       // REQUIRED
  examples: [...],     // REQUIRED (minimum 3)
  accessibility: {...},// REQUIRED
  anatomy: {...}       // REQUIRED
}
```

#### Props Documentation Standards

**Required for Every Prop:**
```tsx
{
  name: 'propName',
  type: 'string | number | ComplexType',  // Exact TypeScript type
  required: true | false,                  // Explicit boolean
  default: 'value' | undefined,            // Actual default value
  description: 'Clear explanation of purpose and behavior'
}
```

**Quality Guidelines:**
- ✅ **DO**: "Visual style variant affecting background and text colors"
- ✅ **DO**: "Size of the component affecting padding, typography, and spacing"
- ❌ **DON'T**: "The variant"
- ❌ **DON'T**: "Size"

**Completeness Checklist:**
- [ ] All props from TypeScript interface documented
- [ ] Types exactly match implementation
- [ ] Default values accurate and explicit
- [ ] Descriptions explain **what** and **why**, not just **what**
- [ ] Event handlers describe when they fire and what data they receive

#### Examples Standards

**Minimum Requirements:**
- Minimum 3 examples per component
- At least one "Basic Usage" example
- Coverage of all major variants/props
- Real-world usage patterns, not just prop combinations

**Example Structure:**
```tsx
{
  name: 'Clear, Descriptive Name',
  description: 'Explains the use case or scenario',
  code: `<ComponentName prop="value">Content</ComponentName>`,
  renderComponent: () => <ComponentName prop="value">Content</ComponentName>
}
```

**Example Quality Guidelines:**

✅ **GOOD Examples:**
```tsx
{
  name: 'Form Validation States',
  description: 'Showing success, error, and warning states for form inputs',
  code: `<Stack direction="column" gap="md">
  <Input variant="success" label="Valid Email" value="user@example.com" />
  <Input variant="error" label="Invalid Email" value="invalid" />
  <Input variant="warning" label="Weak Password" value="123" />
</Stack>`,
  renderComponent: () => (/* actual component */)
}
```

❌ **POOR Examples:**
```tsx
{
  name: 'Example',  // Too vague
  description: 'Component with props',  // Not helpful
  code: `<Component />`,  // Too minimal
  renderComponent: () => <Component />
}
```

**Coverage Expectations:**
- Basic usage (default props)
- All variants/sizes
- Interactive states (hover, focus, disabled)
- Real-world composition with other components
- Edge cases (empty state, long content, etc.)

#### Accessibility Documentation Standards

**Required Fields:**
```tsx
accessibility: {
  notes: [
    'Semantic HTML usage and screen reader behavior',
    'Color contrast compliance (WCAG 2.2 AA)',
    'Keyboard navigation details',
    'Focus management approach',
    'ARIA attributes and their purpose'
  ],
  keyboardNavigation: 'Specific keys and their actions',
  screenReader: 'What is announced and when'
}
```

**Quality Standards:**
- ✅ Specific and actionable: "Tab to focus button, Enter or Space to activate"
- ✅ Testable: "Maintains 4.5:1 contrast ratio in all variants"
- ❌ Vague: "Accessible to keyboard users"
- ❌ Generic: "Follows best practices"

**Validation:**
- All claims tested with jest-axe
- Manual keyboard navigation verified
- Screen reader testing notes included

#### Anatomy Documentation Standards

**Purpose:** 
Anatomy provides a clear visual and textual breakdown of component structure, helping developers understand the component's internal organization, styling hooks, and composition.

**Required Structure:**
```tsx
anatomy: {
  description: 'Overall structural explanation (1-2 sentences)',
  parts: [
    {
      name: 'PartName',
      description: 'What this part does and its styling characteristics',
      tokens: ['semantic.token.path']  // Optional: tokens specific to this part
    }
  ]
}
```

**ASCII Diagram Pattern:**

For simple components:
```tsx
anatomy: {
  description: 'A button consists of a container with text and optional icon',
  diagram: `
┌─────────────────────────────┐
│  Button Container           │
│  ┌──────┐  ┌────────────┐  │
│  │ Icon │  │ Text Label │  │
│  └──────┘  └────────────┘  │
└─────────────────────────────┘
  `,
  parts: [
    {
      name: 'Container',
      description: 'Root element with background, padding, and border radius',
      tokens: [
        'semantic.color.background.interactive',
        'semantic.spacing.component.md',
        'semantic.border.radius.md'
      ]
    },
    {
      name: 'Icon',
      description: 'Optional leading icon with fixed size and spacing',
      tokens: ['semantic.spacing.component.sm']
    },
    {
      name: 'Text Label',
      description: 'Button text with semantic typography',
      tokens: ['semantic.typography.button1']
    }
  ]
}
```

For complex components:
```tsx
anatomy: {
  description: 'A card with header, content, and action areas',
  diagram: `
┌─────────────────────────────────────┐
│ Card Container                      │
│ ┌─────────────────────────────────┐ │
│ │ Header                          │ │
│ │  ┌──────┐  Title & Subtitle    │ │
│ │  │Image │                       │ │
│ │  └──────┘                       │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Content                         │ │
│ │  Body text and media           │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Actions                         │ │
│ │  [Button]  [Button]            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
  `,
  parts: [
    {
      name: 'Card Container',
      description: 'Root wrapper with elevation, radius, and background',
      tokens: [
        'semantic.color.background.surface',
        'semantic.border.radius.lg',
        'semantic.shadow.card'
      ]
    },
    {
      name: 'Header',
      description: 'Top section with optional image and title content',
      tokens: ['semantic.spacing.component.lg']
    },
    {
      name: 'Content',
      description: 'Main content area with flexible layout',
      tokens: [
        'semantic.spacing.component.lg',
        'semantic.typography.body1'
      ]
    },
    {
      name: 'Actions',
      description: 'Bottom action button container with right alignment',
      tokens: ['semantic.spacing.component.md']
    }
  ]
}
```

**Diagram Best Practices:**
- Use box-drawing characters: `─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼`
- Keep diagrams simple and aligned
- Label all major structural elements
- Show nesting/hierarchy clearly
- Indicate optional elements with brackets or notes

**When to Use Simple vs Complex Diagrams:**
- **Simple** (atoms): Single container with 1-3 internal elements
- **Complex** (molecules/organisms): Multiple nested sections, flexible layouts

**Alternative Anatomy Approaches:**

For components without clear visual structure:
```tsx
anatomy: {
  description: 'A utility component that wraps children with specific styling context',
  parts: [
    {
      name: 'Wrapper',
      description: 'Provides styling context without rendering additional DOM elements',
      tokens: ['semantic.color.text.default']
    }
  ]
  // No diagram needed for non-visual components
}
```

For compound components:
```tsx
anatomy: {
  description: 'Multi-part component with composable sub-components',
  diagram: `
Modal
├── Modal.Overlay (backdrop)
├── Modal.Container (dialog box)
│   ├── Modal.Header (title + close button)
│   ├── Modal.Content (main content)
│   └── Modal.Footer (action buttons)
  `,
  parts: [
    { name: 'Modal.Overlay', description: '...' },
    { name: 'Modal.Container', description: '...' },
    { name: 'Modal.Header', description: '...' },
    { name: 'Modal.Content', description: '...' },
    { name: 'Modal.Footer', description: '...' }
  ]
}
```

#### Tokens Documentation Standards

**Requirements:**
- List ALL design tokens used in component styling
- Use exact token paths from `tokens.json`
- Organize by category (color, spacing, typography, etc.)

```tsx
tokens: [
  // Colors
  'semantic.color.background.default',
  'semantic.color.text.default',
  'semantic.color.border.default',
  
  // Spacing
  'semantic.spacing.component.md',
  'semantic.spacing.layout.sm',
  
  // Typography
  'semantic.typography.body1',
  
  // Border
  'semantic.border.radius.md',
  
  // Effects
  'semantic.shadow.sm'
]
```

**Validation:**
- Every styled-component token reference must be in this list
- Tokens must exist in actual `tokens.json`
- Use semantic tokens, not base tokens (unless defining new semantics)

### 2. README Files

#### When to Create READMEs

Create a README.md when:
- Directory contains 3+ related files
- System/feature requires setup or configuration
- Complex logic needs explanation
- Future maintenance requires context

**Do NOT create README for:**
- Simple component folders (use .docs.tsx instead)
- Single-purpose directories
- Self-explanatory structures

#### README Structure Template

```markdown
# [Feature/System Name]

## Overview
Brief description of what this feature/system does (2-3 sentences).

## Purpose
Why this exists and what problems it solves.

## How It Works
Step-by-step explanation of the system's operation.

## File Structure
```
directory/
├── file1.ts     # Description
├── file2.ts     # Description
└── subdirectory/
    └── file3.ts # Description
```

## Usage
Practical examples of how to use this feature.

```typescript
// Example code
```

## Configuration
Any configuration options or environment setup needed.

## Integration
How this integrates with other parts of the system.

## Maintenance
Notes for future developers:
- Common gotchas
- Update procedures
- Testing considerations

## Future Enhancements
Planned improvements or known limitations.
```

#### README Quality Standards

✅ **GOOD README:**
- Clear, scannable sections
- Code examples that actually work
- Explains "why" not just "what"
- Maintenance notes for future developers
- Links to related documentation

❌ **POOR README:**
- Vague descriptions
- No code examples
- Just lists files without context
- No maintenance guidance
- Orphaned/outdated information

### 3. Code Comments & JSDoc

#### JSDoc Standards

**Functions/Methods:**
```typescript
/**
 * Calculates the responsive spacing value based on viewport size
 * 
 * @param size - The spacing size token ('sm' | 'md' | 'lg')
 * @param breakpoint - The viewport breakpoint to calculate for
 * @returns The calculated spacing value in pixels
 * 
 * @example
 * ```typescript
 * const spacing = calculateSpacing('md', 'tablet')
 * // Returns: '16px'
 * ```
 */
function calculateSpacing(size: SpacingSize, breakpoint: Breakpoint): string {
  // Implementation
}
```

**Interfaces/Types:**
```typescript
/**
 * Props for the Button component
 * 
 * @remarks
 * The Button component supports multiple variants and sizes.
 * All interactive states are handled automatically.
 */
interface ButtonProps {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary'
  
  /**
   * Size affecting padding and typography
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}
```

#### Inline Comment Standards

**When to Comment:**
- Complex logic that isn't immediately obvious
- Workarounds or non-standard approaches
- Business logic or domain-specific rules
- Performance optimizations
- Browser-specific fixes

**When NOT to Comment:**
- Self-explanatory code
- Repeating what the code clearly does
- Obvious variable names or functions

✅ **GOOD Comments:**
```typescript
// Safari has a bug with flex-gap in iOS 13, using margin as fallback
const StyledStack = styled.div`
  display: flex;
  gap: ${props => props.$gap};
  
  @supports not (gap: 1px) {
    > * + * {
      margin-left: ${props => props.$gap};
    }
  }
`

// Debounce search to avoid excessive API calls during typing
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  [handleSearch]
)
```

❌ **POOR Comments:**
```typescript
// Set the color to blue
const color = 'blue'

// Loop through items
items.forEach(item => {
  // Process the item
  processItem(item)
})
```

### 4. Markdown Standards

#### Formatting Conventions

**Headings:**
- Use ATX-style headings (`#`)
- One H1 per document
- Maintain hierarchy (no skipping levels)
- Use sentence case, not title case

```markdown
# Main Title

## Section Heading

### Subsection Heading
```

**Code Blocks:**
- Always specify language for syntax highlighting
- Use fences (```) not indentation
- Keep examples runnable and realistic

```markdown
```typescript
const example = 'with syntax highlighting'
```
```

**Lists:**
- Use `-` for unordered lists (not `*` or `+`)
- Use `1.` for ordered lists
- Maintain consistent indentation (2 spaces)

```markdown
- First item
  - Nested item
  - Another nested item
- Second item

1. First step
2. Second step
   - Sub-step A
   - Sub-step B
3. Third step
```

**Links:**
- Use descriptive text, not "click here"
- Prefer relative paths for internal links
- Include protocol for external links

```markdown
See [Component Patterns](./COMPONENT_PATTERNS.md) for details.
Visit [React documentation](https://react.dev) for more information.
```

**Emphasis:**
- `**bold**` for important concepts
- `*italic*` for emphasis
- `` `code` `` for code references, not emphasis

**Tables:**
- Use for structured data only
- Align columns for readability
- Include header row

```markdown
| Property | Type   | Required |
| -------- | ------ | -------- |
| name     | string | Yes      |
| value    | number | No       |
```

### 5. Documentation Site Pages

#### Page Structure Standard

Every documentation site page should follow this structure:

```tsx
import Layout from '@/src/page-components/Layout'
import Navigation from '@/src/page-components/Navigation'
import Breadcrumbs from '@/src/page-components/Breadcrumbs'
import { Container, Grid, GridCol } from '@/src/components'

export default function PageName() {
  return (
    <Layout>
      <Navigation />
      
      <Container maxWidth="xl" paddingY="xl">
        <Grid>
          <GridCol span={12}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Section', href: '/section' },
                { label: 'Current Page' }
              ]}
            />
            
            {/* Page content */}
          </GridCol>
        </Grid>
      </Container>
    </Layout>
  )
}
```

#### Content Organization

**Information Hierarchy:**
1. **Page Title** - H1, clear and descriptive
2. **Overview** - Brief introduction (2-3 sentences)
3. **Main Content** - Organized by H2 sections
4. **Examples** - Live component examples where applicable
5. **Related Links** - Navigation to related content

**Example:**
```tsx
<Typography variant="h1" marginBottom="md">
  Component Name
</Typography>

<Typography variant="body1" color="subdued" marginBottom="lg">
  Brief overview explaining what this component is and when to use it.
</Typography>

<Typography variant="h2" marginBottom="md">
  Usage
</Typography>
{/* Usage content */}

<Typography variant="h2" marginBottom="md">
  Examples
</Typography>
{/* Live examples */}
```

### 6. Maintenance & Updates

#### Documentation Update Triggers

Update documentation when:
- [ ] Adding new component
- [ ] Changing component API (props, behavior)
- [ ] Adding/removing design tokens
- [ ] Updating accessibility implementation
- [ ] Changing build process
- [ ] Adding new patterns or standards

#### Update Protocol

1. **Identify Impact**: What documentation is affected?
2. **Update All Locations**: 
   - `.docs.tsx` files
   - READMEs
   - Site pages
   - Main instructions
3. **Verify Examples**: Ensure code examples still work
4. **Test Changes**: Run tests, build site
5. **Review Completeness**: Check all required sections present

#### Documentation Review Checklist

Before committing documentation:
- [ ] All required sections present
- [ ] Code examples are accurate and runnable
- [ ] Design token references are correct
- [ ] Accessibility claims are tested
- [ ] Anatomy diagram matches implementation
- [ ] Links work and point to correct locations
- [ ] Grammar and spelling checked
- [ ] Markdown formatting correct
- [ ] Consistency with existing docs

### 7. Quality Standards

#### Completeness Metrics

A component is considered fully documented when:
- ✅ `.docs.tsx` file with all required fields
- ✅ Minimum 3 examples covering major use cases
- ✅ All props documented with types and descriptions
- ✅ Accessibility section with specific claims
- ✅ Anatomy section with diagram and parts breakdown
- ✅ All design tokens listed
- ✅ Test coverage including jest-axe
- ✅ Exported through proper index files

#### Writing Style Guidelines

**Tone:**
- Professional but approachable
- Direct and concise
- Action-oriented (use imperatives)

**Voice:**
- Use second person ("you") for instructions
- Use first person plural ("we") for collaborative decisions
- Use third person for descriptions

**Clarity:**
- One concept per sentence
- Short paragraphs (3-5 sentences max)
- Use bullet points for lists
- Use examples liberally

**Technical Accuracy:**
- Exact type names
- Correct token paths
- Tested code examples
- Current API references

### 8. Documentation Tools

#### Available Tools

- **TypeScript**: Type definitions as documentation
- **JSDoc**: Function and interface documentation
- **Docgen System**: Automated component documentation generation
- **ASCII Diagrams**: Component anatomy visualization
- **MDX**: Enhanced markdown for documentation site
- **jest-axe**: Automated accessibility testing

#### Future Enhancements

Consider implementing:
- Visual component playground with live editing
- Automated token usage analysis
- Screenshot-based anatomy diagrams
- Interactive component explorer
- API reference auto-generation
- Documentation coverage reports

---

## Summary

Quality documentation is not optional—it's a core deliverable for every component and feature. Following these standards ensures:
- Consistent developer experience
- Easier onboarding
- Better maintenance
- Fewer bugs
- Stronger accessibility
- Institutional knowledge preservation

When in doubt, over-document rather than under-document. Future you (and your teammates) will thank you.
