import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import React from 'react'

// Test importing individual components
import { 
  Button,
  Chip,
  Stack,
  Typography,
  Container,
  DateFormatter,
  tokens
} from '../../dist/index.esm.js'

// Simple theme for testing
const theme = {}

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

describe('Design System Package Consumption', () => {
  describe('Component Imports', () => {
    it('should import and render Button component', () => {
      render(
        <TestWrapper>
          <Button>Test Button</Button>
        </TestWrapper>
      )
      expect(screen.getByText('Test Button')).toBeInTheDocument()
    })

    it('should import and render Chip component', () => {
      render(
        <TestWrapper>
          <Chip>Test Chip</Chip>
        </TestWrapper>
      )
      expect(screen.getByText('Test Chip')).toBeInTheDocument()
    })

    it('should import and render Typography component', () => {
      render(
        <TestWrapper>
          <Typography variant="h1">Test Typography</Typography>
        </TestWrapper>
      )
      expect(screen.getByText('Test Typography')).toBeInTheDocument()
    })

    it('should import and render Stack component', () => {
      render(
        <TestWrapper>
          <Stack>
            <div>Stack Item</div>
          </Stack>
        </TestWrapper>
      )
      expect(screen.getByText('Stack Item')).toBeInTheDocument()
    })

    it('should import and render Container component', () => {
      render(
        <TestWrapper>
          <Container>
            <div>Container Content</div>
          </Container>
        </TestWrapper>
      )
      expect(screen.getByText('Container Content')).toBeInTheDocument()
    })

    it('should import and render DateFormatter component', () => {
      render(
        <TestWrapper>
          <DateFormatter dateString="2023-12-25T10:30:00.000Z" />
        </TestWrapper>
      )
      expect(screen.getByText('2023')).toBeInTheDocument()
    })
  })

  describe('Component Functionality', () => {
    it('should handle Button onClick events', () => {
      let clicked = false
      render(
        <TestWrapper>
          <Button onClick={() => { clicked = true }}>
            Click Me
          </Button>
        </TestWrapper>
      )
      
      const button = screen.getByText('Click Me')
      button.click()
      expect(clicked).toBe(true)
    })

    it('should apply Button variants correctly', () => {
      render(
        <TestWrapper>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </TestWrapper>
      )
      
      expect(screen.getByText('Primary')).toBeInTheDocument()
      expect(screen.getByText('Secondary')).toBeInTheDocument()
      expect(screen.getByText('Ghost')).toBeInTheDocument()
    })

    it('should apply Chip variants correctly', () => {
      render(
        <TestWrapper>
          <Chip variant="default">Default</Chip>
          <Chip variant="emphasis">Emphasis</Chip>
          <Chip variant="subtle">Subtle</Chip>
        </TestWrapper>
      )
      
      expect(screen.getByText('Default')).toBeInTheDocument()
      expect(screen.getByText('Emphasis')).toBeInTheDocument()
      expect(screen.getByText('Subtle')).toBeInTheDocument()
    })

    it('should handle disabled states correctly', () => {
      render(
        <TestWrapper>
          <Button disabled>Disabled Button</Button>
          <Chip disabled>Disabled Chip</Chip>
        </TestWrapper>
      )
      
      const button = screen.getByText('Disabled Button')
      const chip = screen.getByText('Disabled Chip')
      
      expect(button).toBeDisabled()
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Design Tokens', () => {
    it('should export design tokens object', () => {
      expect(tokens).toBeDefined()
      expect(typeof tokens).toBe('object')
    })

    it('should include semantic color tokens', () => {
      expect(tokens.semantic.color).toBeDefined()
      expect(tokens.semantic.color.text.default).toBeDefined()
      expect(tokens.semantic.color.background.default).toBeDefined()
    })

    it('should include semantic typography tokens', () => {
      expect(tokens.semantic.typography).toBeDefined()
      expect(tokens.semantic.typography.h1).toBeDefined()
      expect(tokens.semantic.typography.body).toBeDefined()
    })

    it('should include semantic spacing tokens', () => {
      expect(tokens.semantic.spacing).toBeDefined()
      expect(tokens.semantic.spacing.layout).toBeDefined()
      expect(tokens.semantic.spacing.layout.sm).toBeDefined()
      expect(tokens.semantic.spacing.layout.md).toBeDefined()
      expect(tokens.semantic.spacing.layout.lg).toBeDefined()
    })
  })

  describe('TypeScript Types', () => {
    it('should provide proper TypeScript types for components', () => {
      // This test verifies that TypeScript compilation works
      // The fact that the test file compiles means types are working
      
      const buttonProps: React.ComponentProps<typeof Button> = {
        variant: 'primary',
        children: 'Test'
      }
      
      const chipProps: React.ComponentProps<typeof Chip> = {
        variant: 'default',
        children: 'Test'
      }
      
      expect(buttonProps.variant).toBe('primary')
      expect(chipProps.variant).toBe('default')
    })
  })
})