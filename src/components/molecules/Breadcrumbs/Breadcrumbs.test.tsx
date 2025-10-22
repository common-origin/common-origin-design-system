import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Breadcrumbs } from './Breadcrumbs'

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations)

describe('Breadcrumbs', () => {
  it('renders all breadcrumb items', () => {
    const breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Portfolio', url: '/portfolio' },
      { label: 'Page', url: '/portfolio/page' }
    ]
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Page')).toBeInTheDocument()
  })

  it('renders last breadcrumb as plain text', () => {
    const breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Page', url: '/page' }
    ]
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />)
    const last = screen.getByText('Page')
    expect(last.closest('a')).toBeNull()
  })

  describe('Accessibility Testing', () => {
    it('should not have accessibility violations with standard breadcrumbs', async () => {
      const breadcrumbs = [
        { label: 'Home', url: '/' },
        { label: 'Portfolio', url: '/portfolio' },
        { label: 'Current Page', url: '/portfolio/current' }
      ]
      const { container } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with single breadcrumb', async () => {
      const breadcrumbs = [
        { label: 'Home', url: '/' }
      ]
      const { container } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with long breadcrumb trail', async () => {
      const breadcrumbs = [
        { label: 'Home', url: '/' },
        { label: 'Music', url: '/music' },
        { label: 'Artists', url: '/music/artists' },
        { label: 'Jazz', url: '/music/artists/jazz' },
        { label: 'Miles Davis', url: '/music/artists/jazz/miles-davis' }
      ]
      const { container } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
