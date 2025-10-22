# Common Origin Design System - AI Coding Instructions

## Project Overview
This is a **pure design system package** built with **atomic design principles**, **design tokens**, and **styled-components**. It provides reusable React components and design tokens that can be consumed by other projects, including the main Common Origin website. The design system emphasizes comprehensive testing, accessibility compliance, and token-driven styling.

## Core Architecture Patterns

### 1. Atomic Design Structure
Components are organized by complexity level in `src/components/`:
- **Atoms** (`/atoms/`): Foundational components (Button, Typography, Icon, Stack, Box)
- **Molecules** (`/molecules/`): Simple combinations (Dropdown, CodeBlock, ReleaseCard)
- **Organisms** (`/organisms/`): Complex sections (Navigation, Header, Footer)
- **Layout** (`/layout/`): Grid systems and page templates

**Key Pattern**: Each component folder contains:
```
ComponentName/
├── ComponentName.tsx        # Main component
├── ComponentName.docs.tsx   # Documentation metadata
├── ComponentName.test.tsx   # Jest tests
└── index.ts                # Export (export * from './ComponentName')
```

### 2. Design Token System
All styling uses tokens from `src/styles/tokens.json` - **NO hardcoded CSS values**. Style Dictionary converts source tokens (`src/tokens/`) into consumable formats.

**Token Hierarchy** (CRITICAL - follow this pattern):
- **Base tokens** (`base.*`): Raw values only used to create semantic/component tokens
- **Semantic tokens** (`semantic.*`): Contextual meaning, reference base tokens 
- **Component tokens** (`component.*`): Component-specific overrides, reference semantic tokens

**Import Pattern**:
```tsx
import tokens from '@/styles/tokens.json'
const { semantic: { color, typography, spacing }, base } = tokens
```

**Preferred Token Usage**:
- ✅ `semantic.color.text.default`, `semantic.typography.body`, `semantic.spacing.layout.md`
- ⚠️ `base.spacing[4]` (only when creating new semantic/component tokens)
- ❌ Hardcoded values: `'#333'`, `'1rem'`, `'Arial'`

**Style Dictionary Build**:
- Source: `src/tokens/**/*.json` → Output: `src/styles/tokens.json`, `src/styles/tokens.d.ts`
- Run: `npm run build:tokens` to rebuild tokens after changes
- **CRITICAL**: When adding new tokens, always include a `"type"` field - every token needs a type for proper generation

### 3. Component Documentation System
Every component has a `.docs.tsx` file following `ComponentDocumentation` interface:
```tsx
export const componentDocs: ComponentDocumentation = {
  id: 'component-name',
  name: 'Component Name',
  description: 'What this component does',
  category: 'Atoms' | 'Molecules' | 'Organisms' | 'Layout',
  props: [/* TypeScript props with descriptions */],
  tokens: [/* Design tokens used by this component */],
  examples: [/* Live examples with code */],
}
```

### 4. Icon System
Icons are stored as SVG path values in `src/styles/icons.json` and used through the `Icon` component:
```tsx
// Icon component automatically handles path rendering
<Icon name="add" size="md" />
// Uses path from icons.json: "M13 11H19V13H13V19H11V13H5V11H11V5H13V11Z"
```
- Add new icons by including `path` and `name` properties in `icons.json`
- Icon sizes are controlled by semantic tokens: `semantic.size.icon.*`

## Development Workflows

### Testing Standards
- **Test file pattern**: `ComponentName.test.tsx` alongside component
- **Render helper pattern**:
  ```tsx
  const renderComponent = (props: Partial<Props> = {}) => {
    return render(<Component {...defaultProps} {...props} />)
  }
  ```
- **Required test categories**: Basic Rendering, Props Variants, Accessibility, Edge Cases
- **Mock external dependencies**: Next.js components, styled-components (see `jest.setup.js`)

### Build & Development Commands
- `npm run dev` - Development server (for design system documentation)
- `npm test` - Run Jest test suite
- `npm run build` - Build Next.js documentation site
- `npm run build:package` - Build distributable package with Rollup
- `npm run build:tokens` - Generate design tokens from source
- `npm run typecheck` - TypeScript type checking

### Commit Message Standards
Follow clear, descriptive commit messages that provide context:

**Format**: `type(scope): brief description`

**Types**:
- `feat`: New features or components
- `fix`: Bug fixes
- `refactor`: Code restructuring without functionality changes
- `style`: Design token updates, styling changes
- `test`: Adding or updating tests
- `docs`: Documentation updates
- `chore`: Build process, dependencies, tooling

**Examples**:
```
feat(atoms): add new Alert component with semantic tokens
fix(Button): resolve prop spreading issue with styled-components
refactor(molecules): migrate Dropdown to atomic design structure
style(tokens): add new semantic spacing tokens for layout
test(Typography): add comprehensive accessibility test coverage
docs(Button): update component documentation with new examples
chore(deps): update styled-components to v6.1.1
```

**Include context about**:
- Which design tokens were used/added
- Component migration status (if part of atomic design refactor)
- Test coverage additions
- Breaking changes or migration notes

### Styled Components Best Practices
- **Always use design tokens**: `background-color: ${color.background.subtle}`
- **Prefer semantic tokens**: Use `semantic.*` over `base.*` in components
- **Base token rule**: Only use `base.*` when creating new semantic/component tokens
- **Responsive patterns**: Use `breakpoint` tokens with media queries
- **TypeScript interfaces**: Define styled props with `$` prefix to avoid DOM attributes
- **Component composition**: Prefer extending existing atoms over creating new styled components

### Testing Standards & data-testid Implementation
- **Required**: All components must support `'data-testid'?: string` prop for testing
- **Element Selection Priority**: 1) Semantic roles, 2) data-testid, 3) Labels/text, 4) Text content (static only)
- **Accessibility Testing**: All components must include automated accessibility tests using jest-axe to ensure WCAG 2.2 AA compliance
- **Atomic Design Testing**: 
  - **Atoms**: Props, variants, accessibility, event handling
  - **Molecules**: Composition logic, child component integration (mock atoms)
  - **Organisms**: Complex workflows, state management, user interactions
- **Test Structure**: Use render helper pattern, group tests logically, include data-testid verification and jest-axe accessibility tests
- **See**: `docs/TESTING_STANDARDS.md` for comprehensive patterns and examples
- **Anti-patterns**: Avoid text-based selectors for dynamic content, don't test implementation details, never skip accessibility testing

## Integration Points

### Next.js Configuration
- Uses Next.js built-in styled-components compiler (not Babel plugin)
- Supports SSR with proper hydration
- Image optimization configured for cover images and avatars

### Component Documentation System (`lib/docgen/`)
- **PropExtractor**: Uses TypeScript AST to extract component props automatically
- **Generator**: Combines extracted props with curated documentation
- **Integration**: Powers `/design/components` page with live examples

### Testing Infrastructure
- **Jest + React Testing Library** with custom setup in `jest.setup.js`
- **jest-axe Integration**: Automated accessibility testing configured for WCAG 2.2 AA compliance
- **data-testid Support**: All components implement consistent `'data-testid'?: string` prop pattern
- **Styled-components mocking** for consistent test rendering
- **Coverage collection** from `components/` and `lib/` directories
- **Atomic Design Testing Patterns**: Component-specific testing strategies based on complexity level
- **Stable Selectors**: Prefer semantic roles and data-testid over fragile text-based queries

## Key Files for Context
- `src/components/` - All atomic design components (atoms, molecules, organisms, layout)
- `src/tokens/` - Source design tokens (base, semantic, component)
- `src/styles/tokens.json` - Generated design tokens for consumption
- `src/lib/docgen/types.ts` - Component documentation interfaces
- `jest.setup.js` - Test environment configuration with mocks
- `package.json` - Package configuration with proper peer dependencies

## Common Patterns to Follow

### New Component Creation
1. Create folder in appropriate atomic level under `src/components/`
2. Include TypeScript interfaces with proper prop typing (including `'data-testid'?: string`)
3. Use design tokens exclusively for styling from `@/styles/tokens.json`
4. Create comprehensive test file with render helper and data-testid support
5. Write documentation file with examples following `ComponentDocumentation` interface
6. Export through parent `index.ts` files

### Styling Anti-patterns to Avoid
- ❌ Hardcoded colors, spacing, or typography values
- ❌ Using base tokens in components (use semantic tokens instead)
- ❌ Direct Tailwind classes (project has migrated away)
- ❌ Inline styles without token references
- ❌ Missing responsive behavior considerations

### Testing Anti-patterns to Avoid
- ❌ Testing styled-components implementation details
- ❌ Missing accessibility test coverage
- ❌ Incomplete prop variant testing
- ❌ Not mocking Next.js dependencies
- ❌ Using text-based selectors for dynamic content
- ❌ Missing data-testid prop support verification
- ❌ Not following element selection priority (roles → data-testid → labels → text)
- ❌ Skipping jest-axe accessibility testing (WCAG 2.2 AA compliance required)

This project emphasizes **systematic design**, **comprehensive testing**, and **token-driven architecture** - prioritize these principles when making changes or additions.

## Advanced Technical Patterns & Best Practices

### Styled-Components shouldForwardProp Pattern
**Problem**: $ prefixed props leaking to DOM causing warnings
**Solution**: Implement shouldForwardProp filtering for all styled components
```tsx
const StyledComponent = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $variant: string; $size: string }>`
  // styles using $variant and $size
`
```

### Component Testing Excellence
**Comprehensive Test Structure**:
```tsx
describe('ComponentName', () => {
  // 1. Setup & Utilities
  const defaultProps = { /* */ }
  const renderComponent = (props = {}) => render(<Component {...defaultProps} {...props} />)
  
  // 2. Core Functionality
  describe('Basic Rendering', () => {
    it('renders without crashing')
    it('applies data-testid correctly')
    it('renders children correctly')
  })
  
  // 3. Props & Variants
  describe('Props Variants', () => {
    // Test all prop combinations
  })
  
  // 4. User Interactions
  describe('User Interactions', () => {
    // Click handlers, keyboard navigation
  })
  
  // 5. Accessibility (Required)
  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderComponent()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    // Test ARIA attributes, focus management, screen reader support
  })
  
  // 6. Edge Cases
  describe('Edge Cases', () => {
    // Empty props, invalid data, error states
  })
})
```

### Design Token Integration Patterns
**Token Usage Hierarchy** (Critical for consistency):
```tsx
// ✅ Preferred: Semantic tokens
const StyledComponent = styled.div`
  color: ${({theme}) => theme.semantic.color.text.default};
  padding: ${({theme}) => theme.semantic.spacing.component.md};
  font: ${({theme}) => theme.semantic.typography.body};
`

// ⚠️ Acceptable: Base tokens (only for creating new semantic tokens)
const newSemanticToken = base.color.neutral[600]

// ❌ Never: Hardcoded values
const StyledComponent = styled.div`
  color: #333; /* NEVER DO THIS */
`
```

### Component Architecture Decision Tree
**When creating/modifying components:**

1. **Is this a new component?**
   - Yes → Determine atomic level (atom/molecule/organism)
   - No → Proceed with modification

2. **What's the atomic level?**
   - **Atom**: Single responsibility, no internal components
   - **Molecule**: Combines multiple atoms, specific purpose
   - **Organism**: Complex functionality, may include molecules
   - **Layout**: Page structure, responsive behavior

3. **Does this need new design tokens?**
   - Yes → Create semantic tokens referencing base tokens
   - No → Use existing semantic tokens

4. **Is this a breaking change?**
   - Yes → Requires human approval and version bump strategy
   - No → Can proceed with implementation

### Quality Gates (Must Pass)
- **Type Safety**: No TypeScript errors, proper prop interfaces
- **Accessibility**: jest-axe clean, proper ARIA attributes
- **Token Compliance**: No hardcoded styling values
- **Test Coverage**: All functionality, edge cases, accessibility
- **Documentation**: Props documented, examples provided
- **Package Compatibility**: Works in isolation, proper exports

### Current Issue Resolution Patterns

#### Styled-Components Prop Leaking (Priority: High)
**Root Cause**: $ prefixed props reaching DOM elements
**Solution Pattern**:
```tsx
// For ALL styled components, add shouldForwardProp filtering
const Component = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledProps>`
  // Component styles
`
```

#### Test Accuracy Issues
**DesignCard Alt Text Issue**: Expected 'Test Design' but found 'Cover Image for Test Design'
- **Root Cause**: Picture component generates alt text with "Cover Image for" prefix
- **Solution**: Update test expectations to match actual component behavior OR modify Picture component if prefix is unnecessary

**PageTitle Heading Role Issue**: Typography rendering as span instead of h1
- **Root Cause**: Typography component's semantic element mapping needs verification
- **Solution**: Ensure Typography variant="h1" renders as h1 element, not span with h1 styling

#### Non-Boolean Attribute Warnings
**Pattern**: Components receiving string 'false' instead of boolean false
**Solution Strategy**:
```tsx
// Fix prop passing - ensure boolean props are actual booleans
<Chip clickable={false} /> // ✅ Boolean
<Chip clickable="false" /> // ❌ String

// Fix styled component prop handling
const ChipStyled = styled.span.withConfig({
  shouldForwardProp: (prop) => !['clickable', 'variant', 'size'].includes(prop)
})<{ clickable?: boolean }>`
```

### Implementation Workflow
1. **Identify Root Cause**: Don't fix symptoms, fix the underlying pattern
2. **System-Wide Impact**: Check if the fix applies to other components
3. **Regression Prevention**: Ensure fix doesn't break existing functionality
4. **Pattern Documentation**: Update this guide if new patterns emerge

## Specialized Documentation References

### 📋 Comprehensive Guides
- **[Testing Standards](./TESTING_STANDARDS.md)**: Complete testing strategies, accessibility compliance, atomic design testing patterns, visual regression, and consumer integration testing
- **[Component Patterns](./COMPONENT_PATTERNS.md)**: Advanced component creation, TypeScript patterns, styled-components best practices, accessibility implementation, and performance optimization
- **[Token Management](./TOKEN_MANAGEMENT.md)**: Design token creation, evolution, validation, runtime management, and Style Dictionary configuration
- **[Bundle Optimization](./BUNDLE_OPTIMIZATION.md)**: Multi-target builds, tree-shaking, performance optimization, peer dependency management, and distribution strategies
- **[Accessibility Guidelines](./ACCESSIBILITY_GUIDELINES.md)**: Comprehensive WCAG 2.2 AA compliance patterns, ARIA implementation, keyboard navigation, screen reader optimization, and inclusive design principles

### 🎯 Quick Reference Usage
- **Creating new components**: See [Component Patterns](./COMPONENT_PATTERNS.md) for complete creation checklist and patterns
- **Writing comprehensive tests**: Follow [Testing Standards](./TESTING_STANDARDS.md) for atomic design testing strategies
- **Managing design tokens**: Use [Token Management](./TOKEN_MANAGEMENT.md) for token hierarchy and validation
- **Optimizing package distribution**: Reference [Bundle Optimization](./BUNDLE_OPTIMIZATION.md) for build and distribution strategies
- **Implementing accessibility**: Follow [Accessibility Guidelines](./ACCESSIBILITY_GUIDELINES.md) for WCAG 2.2 AA compliance and inclusive design

### 📐 Architecture Decision Framework
When making changes, consult the appropriate specialized guide:
1. **Component changes** → Component Patterns + Testing Standards + Accessibility Guidelines
2. **Token changes** → Token Management + Testing Standards + Accessibility Guidelines  
3. **Build/distribution changes** → Bundle Optimization + requires human approval
4. **Testing improvements** → Testing Standards + Component Patterns + Accessibility Guidelines
5. **Accessibility improvements** → Accessibility Guidelines + Component Patterns + Testing Standards

## Architectural Decision Framework

### System Architecture Principles
- **Framework Agnostic**: Components must work in any React environment (no Next.js/framework dependencies)
- **Token-Driven**: All styling through semantic design tokens, never hardcoded values
- **Atomic Design**: Strict hierarchy - atoms → molecules → organisms → layouts
- **Package-First**: Every component must be distributable via NPM package
- **Accessibility-First**: WCAG 2.2 AA compliance is non-negotiable

### Change Authority & Validation Protocol
**🔒 Human Approval Required:**
- File structure changes (`src/` organization, build config)
- New dependencies or peer dependency changes
- Breaking API changes (component props, token structure)
- Architecture pattern changes (testing strategy, build process)

**✅ AI Autonomous (with validation):**
- Component implementation within established patterns
- Bug fixes maintaining existing APIs
- Test additions following established patterns
- Documentation updates within existing structure
- Code optimization without API changes

**🔍 Pre-Change Validation Checklist:**
- [ ] Does this maintain backward compatibility?
- [ ] Does this follow atomic design hierarchy?
- [ ] Does this use semantic design tokens exclusively?
- [ ] Does this maintain accessibility compliance?
- [ ] Does this pass existing test suite?
- [ ] Does this affect package consumers?

### Problem-Solving Protocol
1. **Context Analysis**: Identify affected systems (components, tokens, build, tests)
2. **Impact Assessment**: Evaluate package API, consumer compatibility, build system
3. **Solution Scope**: Propose minimal change achieving desired outcome
4. **Validation Strategy**: Define success criteria and testing approach
5. **Implementation**: Execute with comprehensive validation

## Current Development Status & Known Issues

**✅ Recently Completed:**
- **Component Extraction**: All atomic design components successfully extracted from main project
- **Token System Synchronization**: Design tokens generating identical output to main project
- **Infrastructure Setup**: Dependencies, build configuration, and import paths working correctly
- **Test Coverage**: 500+ comprehensive tests passing with accessibility compliance
- **Component Semantic Improvements**: CoverImage → Picture for better design system naming

**⚠️ Current Focus Areas:**
- **Styled-Components Prop Leaking**: Need shouldForwardProp filtering for $ prefixed props
- **Test Accuracy**: Fix failing component tests (DesignCard alt text, PageTitle heading role)
- **Attribute Warnings**: Fix non-boolean attribute value issues
- **Package Consumption Testing**: Verify NPM package integration in consumer projects

**🎯 Design System Goals:**
- Provide reusable components with consistent design tokens
- Ensure accessibility compliance (WCAG 2.2 AA) across all components  
- Enable seamless consumption by main project and future projects
- Maintain comprehensive test coverage and TypeScript support