# Common Origin Design System

A comprehensive design system built with atomic design principles, design tokens, and WCAG 2.2 AA accessibility compliance.

## 🚀 Getting Started

### Development
```bash
# Install dependencies
npm install

# Build design tokens
npm run build:tokens

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the design system documentation.

## 📁 Project Structure

```
src/
├── components/          # Atomic design components
│   ├── atoms/          # Foundational components
│   ├── molecules/      # Simple component combinations
│   └── layout/         # Layout components
├── tokens/             # Design token definitions
├── styles/             # Generated tokens and icons
└── index.ts            # Main package exports

pages/                  # Documentation pages
├── design/
│   ├── components.tsx  # Component documentation
│   └── tokens.tsx      # Token documentation
└── index.tsx           # Home page

lib/                    # Documentation generation
└── docgen/             # Component documentation system
```

## 🎨 Features

- **Atomic Design**: Components organized by complexity (atoms → molecules → organisms)
- **Design Tokens**: Comprehensive token system with Style Dictionary
- **Accessibility**: WCAG 2.2 AA compliance with automated testing
- **TypeScript**: Full type safety and IntelliSense support
- **Documentation**: Interactive component documentation with live examples
- **Testing**: Jest + React Testing Library with accessibility testing

## 📖 Documentation

- **Components**: `/design/components` - Interactive component gallery
- **Tokens**: `/design/tokens` - Design token reference
- **Home**: `/design` - Design system overview

## 🔧 Development Commands

```bash
npm run dev              # Start development server
npm run build            # Build Next.js app
npm run build:package    # Build npm package
npm run build:tokens     # Generate design tokens
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run typecheck        # Type checking
npm run docs:generate    # Generate component docs
```

## 📦 Package Usage

Once published, install the design system:

```bash
npm install @common-origin/design-system
```

Import components:

```tsx
import { Button, Typography, Stack } from '@common-origin/design-system'
import tokens from '@common-origin/design-system/tokens'
```

## 🎯 Component Status

**Atoms** (0/12 extracted):
- Alert, Avatar, Box, Button, Chip, Container
- CoverImage, Icon, IconButton, SectionSeparator
- Stack, Typography

**Molecules** (0/8 extracted):
- ArtCard, Breadcrumbs, ChipGroup, CodeBlock
- DesignCard, Dropdown, PageTitle, ReleaseCard

**Layout** (0/1 extracted):
- GridSystem

## 🚧 Next Steps

1. Extract atomic components from main project
2. Extract molecule components
3. Extract layout components
4. Set up package build system
5. Configure npm publishing
6. Update main project to use the design system package

## 🤝 Contributing

This design system follows established patterns:
- Comprehensive testing with jest-axe for accessibility
- Design token-driven styling (no hardcoded values)
- TypeScript interfaces with proper props documentation
- Atomic design principles for component organization