import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ChipGroup, ChipGroupProps } from './ChipGroup'

// Mock child components to focus on ChipGroup logic
jest.mock('@/components/atoms', () => ({
  Chip: ({ title, variant }: { title: string; variant: string }) => (
    <span data-testid={`chip-${title.toLowerCase()}`} data-variant={variant}>
      {title}
    </span>
  ),
  Stack: ({ children, direction, gap }: any) => (
    <div data-testid="stack" data-direction={direction} data-gap={gap}>
      {children}
    </div>
  )
}))

describe('ChipGroup', () => {
  const defaultProps: ChipGroupProps = {
    labels: ['React', 'TypeScript', 'Next.js']
  }

  const renderChipGroup = (props: Partial<ChipGroupProps> = {}) => {
    return render(<ChipGroup {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderChipGroup()
      expect(screen.getByTestId('stack')).toBeInTheDocument()
    })

    it('accepts custom data-testid', () => {
      renderChipGroup({ 'data-testid': 'custom-chip-group' })
      expect(screen.getByTestId('custom-chip-group')).toBeInTheDocument()
    })

    it('renders all provided labels as chips', () => {
      renderChipGroup()
      
      expect(screen.getByTestId('chip-react')).toBeInTheDocument()
      expect(screen.getByTestId('chip-typescript')).toBeInTheDocument()
      expect(screen.getByTestId('chip-next.js')).toBeInTheDocument()
    })

    it('renders with empty labels array', () => {
      renderChipGroup({ labels: [] })
      expect(screen.getByTestId('stack')).toBeInTheDocument()
      expect(screen.queryByTestId(/chip-/)).not.toBeInTheDocument()
    })
  })

  // ChipGroup's variant was removed in 3.0: chips have one look (decision 0016)
  it('renders every chip with the one chip look', () => {
    renderChipGroup({ labels: ['One', 'Two'] })
    expect(screen.getByTestId('chip-one')).not.toHaveAttribute('data-variant')
    expect(screen.getByTestId('chip-two')).not.toHaveAttribute('data-variant')
  })

  describe('Component Composition', () => {
    it('uses Stack component with correct props', () => {
      renderChipGroup()
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveAttribute('data-direction', 'row')
      expect(stack).toHaveAttribute('data-gap', 'sm')
    })

    it('passes correct props to individual chips', () => {
      renderChipGroup({ labels: ['Custom Label'] })
      
      const chip = screen.getByTestId('chip-custom label')
      expect(chip).toHaveTextContent('Custom Label')
    })
  })

  describe('Edge Cases', () => {
    it('handles labels with special characters', () => {
      renderChipGroup({ labels: ['React.js', 'C++', '@types/node'] })
      
      expect(screen.getByTestId('chip-react.js')).toBeInTheDocument()
      expect(screen.getByTestId('chip-c++')).toBeInTheDocument()
      expect(screen.getByTestId('chip-@types/node')).toBeInTheDocument()
    })

    it('handles single label', () => {
      renderChipGroup({ labels: ['Solo'] })
      
      expect(screen.getByTestId('chip-solo')).toBeInTheDocument()
      expect(screen.getAllByTestId(/chip-/).length).toBe(1)
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations with default props', async () => {
      const { container } = renderChipGroup({ 'data-testid': 'chip-group' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with empty labels', async () => {
      const { container } = renderChipGroup({ 
        labels: [],
        'data-testid': 'empty-chip-group' 
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
