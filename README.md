# Common Origin Design System

A production-ready design system built with atomic design principles, design tokens, and WCAG 2.2 AA accessibility compliance. This package provides reusable React components and design tokens for building consistent user interfaces.

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

Visit `http://localhost:3000` to view the interactive component documentation.

## 📁 Project Structure

```
src/
├── components/          # Complete atomic design system
│   ├── atoms/          # 12 foundational components (Button, Typography, etc.)
│   ├── molecules/      # 8 composed components (Dropdown, CodeBlock, etc.)
│   ├── organisms/      # 3 complex components (Navigation, Footer, etc.)
│   └── layout/         # 1 layout system (GridSystem)
├── tokens/             # Design token source definitions
├── styles/             # Generated tokens, CSS, and icon definitions
└── index.ts            # Main package exports

pages/                  # Interactive documentation
├── design/
│   ├── components.tsx  # Live component gallery
│   └── tokens.tsx      # Design token reference
└── index.tsx           # Landing page

lib/                    # Documentation tooling
└── docgen/             # Automated component documentation system
```

## 🎨 Features

- **Production Ready**: Complete design system with 24+ components
- **Atomic Design**: Components organized by complexity (atoms → molecules → organisms)
- **Design Tokens**: Comprehensive token system built with Style Dictionary
- **Accessibility**: WCAG 2.2 AA compliance with automated jest-axe testing
- **TypeScript**: Full type safety and IntelliSense support
- **Interactive Docs**: Live component gallery with code examples
- **Comprehensive Testing**: 500+ tests with React Testing Library
- **Token-Driven**: All styling uses semantic design tokens (no hardcoded values)

## 📖 Documentation

- **Components**: `/design/components` - Interactive component gallery with live examples
- **Tokens**: `/design/tokens` - Complete design token reference
- **Home**: `/` - Design system overview and navigation

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

Install the design system in your project:

```bash
npm install @common-origin/design-system
```

Import and use components:

```tsx
import { Button, Typography, Stack, Alert } from '@common-origin/design-system'
import tokens from '@common-origin/design-system/tokens'

function MyApp() {
  return (
    <Stack direction="column" gap="md">
      <Typography variant="heading1">Welcome</Typography>
      <Alert variant="info">Design system is ready!</Alert>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Stack>
  )
}
```

## 🎯 Component Library

**✅ Atoms (12 components)**:
- Alert, Avatar, Box, Button, Chip, Container
- Picture, Icon, IconButton, SectionSeparator
- Stack, Typography

**✅ Molecules (8 components)**:
- ArtCard, Breadcrumbs, ChipGroup, CodeBlock
- DesignCard, Dropdown, PageTitle, ReleaseCard

**✅ Organisms (3 components)**:
- Footer, HeroBanner, Navigation

**✅ Layout (1 system)**:
- GridSystem

## � Production Ready

This design system is production-ready with:
- **24+ tested components** with comprehensive test coverage
- **Semantic design tokens** for consistent theming
- **Accessibility compliance** (WCAG 2.2 AA)
- **TypeScript support** with full type definitions
- **Interactive documentation** for easy adoption
- **Optimized bundle** with tree-shaking support

## 🤝 Contributing

This design system follows established patterns:
- **Comprehensive testing** with jest-axe for accessibility compliance
- **Token-driven styling** - all components use semantic design tokens
- **TypeScript interfaces** with complete props documentation  
- **Atomic design principles** for scalable component organization
- **Component documentation** with interactive examples and usage patterns

### Development Workflow
1. Components follow the atomic design hierarchy
2. All styling uses design tokens from `src/styles/tokens.json`
3. Each component includes `.test.tsx`, `.docs.tsx`, and implementation files
4. Tests must include accessibility validation with jest-axe
5. Documentation includes live examples and prop descriptions