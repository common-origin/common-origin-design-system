import React from 'react'
import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from './Breadcrumbs'

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
})
