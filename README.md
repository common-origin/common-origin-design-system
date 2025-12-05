# Common Origin Design System

A production-ready, **framework-agnostic** design system built with atomic design principles, design tokens, and WCAG 2.2 AA accessibility compliance. This package provides reusable React components and design tokens for building consistent user interfaces.

## ⚠️ Version 2.0 Breaking Changes

**Version 2.0.0** removes Next.js dependencies, making the design system work in **any React application** (Next.js, Create React App, Vite, etc.).

If you're upgrading from v1.x, see **[MIGRATION-V2.md](./MIGRATION-V2.md)** for the complete migration guide.

**Quick summary:** Components like `Button`, `Breadcrumbs`, and `CardSmall` now accept an optional `linkComponent` prop. Pass your framework's Link component (e.g., Next.js Link, React Router Link) for client-side navigation, or omit it to use standard HTML links.

## 🚀 Getting Started

### Installation

```bash
npm install @common-origin/design-system styled-components
```

### Usage

```tsx
import { Button, Typography, Stack } from '@common-origin/design-system'

// For Next.js apps, pass Link component for client-side routing
import Link from 'next/link'

function App() {
  return (
    <Stack direction="column" gap="md">
      <Typography variant="h1">Welcome</Typography>
      <Button 
        purpose="link" 
        url="/about" 
        linkComponent={Link}
      >
        Learn More
      </Button>
    </Stack>
  )
}
```

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

## � Requirements

This design system supports:
- **React**: 18.x or 19.x
- **TypeScript**: 4.x or higher (recommended)

## �📦 Package Usage

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
- Picture, Icon, IconButton, Divider
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

We welcome contributions! Please follow our established standards:

### Quick Start
```bash
# Fork and clone
git clone <your-fork>
cd common-origin-design-system
npm install

# Start development
npm run docs:dev  # Starts dev server with docs
npm test          # Run tests
```

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/) for automatic changelog generation:

```bash
feat(Component): add new feature
fix(Component): fix bug
docs: update documentation
chore: bump version to X.Y.Z
```

### Release Process
```bash
# Automated release (recommended)
npm run release:create

# Manual release - see .github/RELEASE_PROCESS.md
```

### Documentation
- **Contributing Guide**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Release Process**: [.github/RELEASE_PROCESS.md](./.github/RELEASE_PROCESS.md)
- **Documentation Standards**: [.github/DOCUMENTATION_STANDARDS.md](./.github/DOCUMENTATION_STANDARDS.md)
- **Quick Reference**: [.github/RELEASE_CHEATSHEET.md](./.github/RELEASE_CHEATSHEET.md)

### Development Standards
1. Components follow the atomic design hierarchy
2. All styling uses design tokens from `src/styles/tokens.json`
3. Each component includes `.test.tsx`, `.docs.tsx`, and implementation files
4. Tests must include accessibility validation with jest-axe
5. Documentation includes live examples and prop descriptions
6. Use conventional commit messages for all commits