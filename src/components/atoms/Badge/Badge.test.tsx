import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Badge } from './Badge'
import { Button } from '../Button'

expect.extend(toHaveNoViolations)

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Badge count={5}>
          <Button>Notifications</Button>
        </Badge>
      )
      
      expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument()
    })

    it('displays count when provided', () => {
      render(
        <Badge count={5}>
          <Button>Notifications</Button>
        </Badge>
      )
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('hides badge when count is 0', () => {
      render(
        <Badge count={0}>
          <button>Test</button>
        </Badge>
      )
      
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    it('displays "99+" when count exceeds max', () => {
      render(
        <Badge count={150} max={99}>
          <Button>Notifications</Button>
        </Badge>
      )
      
      expect(screen.getByText('99+')).toBeInTheDocument()
    })

    it('renders dot variant without count', () => {
      const { container } = render(
        <Badge dot>
          <Button>Notifications</Button>
        </Badge>
      )
      
      const badge = container.querySelector('[role="status"]')
      expect(badge).toBeInTheDocument()
      expect(badge).not.toHaveTextContent(/\d/)
    })

    it('shows dot variant even when count is 0', () => {
      const { container } = render(
        <Badge dot count={0}>
          <Button>Notifications</Button>
        </Badge>
      )
      
      const badge = container.querySelector('[role="status"]')
      expect(badge).toBeVisible()
    })
  })

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(
        <Badge count={5} variant="default">
          <Button>Button</Button>
        </Badge>
      )
      
      expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    })

    it('renders primary variant', () => {
      const { container } = render(
        <Badge count={5} variant="primary">
          <Button>Button</Button>
        </Badge>
      )
      
      expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    })

    it('renders error variant', () => {
      const { container } = render(
        <Badge count={5} variant="error">
          <Button>Button</Button>
        </Badge>
      )
      
      expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    })

    it('renders warning variant', () => {
      const { container } = render(
        <Badge count={5} variant="warning">
          <Button>Button</Button>
        </Badge>
      )
      
      expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    })

    it('renders success variant', () => {
      const { container } = render(
        <Badge count={5} variant="success">
          <Button>Button</Button>
        </Badge>
      )
      
      expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations with count', async () => {
      const { container } = render(
        <Badge count={5} aria-label="5 unread messages">
          <Button>Messages</Button>
        </Badge>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with dot', async () => {
      const { container } = render(
        <Badge dot aria-label="New notification">
          <Button>Notifications</Button>
        </Badge>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('includes screen reader text for count', () => {
      render(
        <Badge count={5}>
          <Button>Notifications</Button>
        </Badge>
      )
      
      expect(screen.getByText('5 notifications')).toBeInTheDocument()
    })

    it('includes custom aria-label when provided', () => {
      render(
        <Badge count={5} aria-label="5 unread messages">
          <Button>Messages</Button>
        </Badge>
      )
      
      expect(screen.getByText('5 unread messages')).toBeInTheDocument()
    })

    it('uses singular form for count of 1', () => {
      render(
        <Badge count={1}>
          <Button>Notifications</Button>
        </Badge>
      )
      
      expect(screen.getByText('1 notification')).toBeInTheDocument()
    })

    it('has role="status" for live region', () => {
      const { container } = render(
        <Badge count={5}>
          <Button>Notifications</Button>
        </Badge>
      )
      
      expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    })

    it('has aria-live="polite" for updates', () => {
      const { container } = render(
        <Badge count={5}>
          <Button>Notifications</Button>
        </Badge>
      )
      
      const badge = container.querySelector('[role="status"]')
      expect(badge).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Different wrapped components', () => {
    it('wraps IconButton', () => {
      const { container } = render(
        <Badge count={3}>
          <button aria-label="Notifications">🔔</button>
        </Badge>
      )
      
      expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('wraps Avatar-like component', () => {
      render(
        <Badge dot variant="success">
          <div role="img" aria-label="User avatar">👤</div>
        </Badge>
      )
      
      expect(screen.getByRole('img', { name: 'User avatar' })).toBeInTheDocument()
    })

    it('wraps Chip-like component', () => {
      render(
        <Badge count={2} variant="error">
          <span role="button">Filter</span>
        </Badge>
      )
      
      expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })
})
