# Component Documentation System

This directory contains the automated component documentation generation system for the Common Origin design system.

## Overview

The documentation system provides a **hybrid approach** that combines:
- **Automated prop extraction** from TypeScript interfaces
- **Curated documentation** with examples, tokens, and descriptions
- **Validation** to ensure documentation completeness

## Architecture

### Core Files

- **`types.ts`** - Type definitions for documentation data structures
- **`propExtractor.ts`** - TypeScript AST analysis for automatic prop extraction
- **`generator.ts`** - Main documentation generation logic
- **`index.ts`** - Public API entry point

### Key Features

- ✅ **Automatic prop extraction** from TypeScript interfaces
- ✅ **JSDoc support** for prop descriptions
- ✅ **Curated documentation** files (`.docs.ts`)
- ✅ **Validation** for documentation completeness
- ✅ **Type safety** with full TypeScript support
- ✅ **Caching** for performance

## Usage

### Basic Usage

```typescript
import { getComponentDocumentation } from './lib/docgen'

// Generate documentation for all components
const docs = await getComponentDocumentation()

// Generate documentation for a specific component
const buttonDoc = await getComponentDoc('components/atoms/button.tsx')
```

### Creating Documentation Files

Create a `.docs.tsx` file alongside your component:

```typescript
// components/atoms/button.docs.tsx
import { ComponentDocumentation } from '../../lib/docgen/types'

export default {
  id: 'button',
  name: 'Button',
  description: 'Interactive button component with various styles and states.',
  category: 'Atoms',
  
  // Props will be auto-extracted, but you can enhance them
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'naked'",
      default: 'primary',
      description: 'Visual style variant for the button'
    }
  ],
  
  tokens: [
    'semantic.color.background.interactive',
    'semantic.color.background.interactive-hover'
  ],
  
  examples: [
    {
      name: 'Basic Button',
      code: '<Button variant="primary">Click me</Button>',
      component: createElement('button', {}, 'Click me')
    }
  ]
} as ComponentDocumentation
```

### NPM Scripts

```bash
# Test the documentation system
npm run docs:generate

# Validate documentation completeness
npm run docs:validate
```

## Integration with Components Page

The system is designed to replace the manual `componentsData` array in `pages/design/components.tsx`:

```typescript
// Future integration
export async function getStaticProps() {
  const componentsData = await getComponentDocumentation()
  return { props: { componentsData } }
}
```

## Benefits

1. **Automated prop sync** - Props stay in sync with component interfaces
2. **Reduced duplication** - Documentation lives close to code
3. **Better maintainability** - Changes to components automatically update docs
4. **Type safety** - TypeScript ensures documentation accuracy
5. **Flexible curation** - Still allows manual examples and descriptions
6. **Incremental adoption** - Can migrate components one at a time

## Development Status

**Phase 1: Infrastructure** ✅ Complete
- TypeScript AST prop extraction
- Documentation generation system
- Type definitions and interfaces
- Main API entry point
- Example documentation file

**Phase 2: Component Migration** ✅ Complete
- Created documentation files for all atomic components:
  - `avatar.docs.ts` - Avatar with image/initials fallback
  - `box.docs.ts` - Foundational layout component
  - `button.docs.ts` - Interactive button component
  - `chip.docs.ts` - Compact tag/label component
  - `container.docs.ts` - Responsive container component
  - `icon.docs.ts` - SVG icon component
  - `iconButton.docs.ts` - Icon-only button component
  - `sectionSeparator.docs.ts` - Visual separator component
  - `stack.docs.ts` - Flexible layout component
  - `typography.docs.ts` - Text styling component
- Validated prop extraction for all components
- Confirmed documentation format and accessibility features
- Tested integration with existing TypeScript interfaces

**Phase 3: Integration** � Next
- Migrate components page to new system
- Add build-time generation
- Enhance with additional features

## File Structure

```
lib/docgen/
├── types.ts           # Type definitions
├── propExtractor.ts   # TypeScript AST analysis
├── generator.ts       # Documentation generation
├── index.ts          # Public API
└── README.md         # This file

components/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.docs.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Avatar/
│   │   ├── Avatar.tsx
│   │   ├── Avatar.docs.tsx
│   │   ├── Avatar.test.tsx
│   │   └── index.ts
│   └── index.ts       # Exports all atoms
├── molecules/
│   ├── CodeBlock/
│   │   ├── CodeBlock.tsx
│   │   ├── CodeBlock.docs.tsx
│   │   └── index.ts
│   └── index.ts       # Exports all molecules
└── ...
```

## Dependencies

- **ts-morph** - TypeScript AST manipulation for prop extraction
- **@types/node** - Node.js type definitions

## Future Enhancements

- Syntax highlighting for code examples
- Automated screenshot generation
- Interactive playground
- Documentation versioning
- Integration with Storybook
- Accessibility analysis
