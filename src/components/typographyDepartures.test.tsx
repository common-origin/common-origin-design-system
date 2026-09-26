import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import tokens from '@/styles/tokens.json'
import { effectiveFontProperty, effectiveFontWeight } from '@/test-utils/effectiveFontWeight'
import { Alert } from './molecules/Alert'
import { TabBar } from './molecules/TabBar'
import { SearchField } from './molecules/SearchField'
import { Avatar } from './atoms/Avatar'
import { CodeBlock } from './molecules/CodeBlock'
import { Badge } from './atoms/Badge'
import { Typography } from './atoms/Typography'

// Components whose type departs from a typography style take the departure from
// their component tokens (decision 0014)
const { component } = tokens

describe('typography departures', () => {
  it('Alert title and message use their component tokens', () => {
    render(<Alert title="Title">Message</Alert>)
    const title = screen.getByText('Title')
    expect(effectiveFontWeight(title)).toBe(component.alert.title.fontWeight)
    expect(effectiveFontProperty(title, 'line-height')).toBe(component.alert.title.lineHeight)
    expect(effectiveFontProperty(screen.getByText('Message'), 'line-height')).toBe(component.alert.message.lineHeight)
  })

  it('TabBar count badge is bold', () => {
    render(<TabBar tabs={[{ id: 'a', label: 'All', badge: 7 }]} activeTab="a" onTabChange={() => {}} />)
    expect(effectiveFontWeight(screen.getByText('7'))).toBe(component.tabBar.badge.fontWeight)
  })

  it('SearchField section header uses the wide letter-spacing token', async () => {
    render(<SearchField value="" onChange={() => {}} showRecentSearches recentSearches={['shoes']} />)
    fireEvent.focus(screen.getByRole('combobox'))
    await waitFor(() => expect(screen.getByText('Recent Searches')).toBeInTheDocument())
    expect(screen.getByText('Recent Searches')).toHaveStyle({
      letterSpacing: component.searchField.sectionHeader.letterSpacing,
    })
  })

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('Avatar %s initials use their font-size token', (size) => {
    render(<Avatar name="Ada Lovelace" size={size} />)
    expect(screen.getByText('AL')).toHaveStyle({
      fontSize: component.avatar.initials.fontSize[size],
      lineHeight: component.avatar.initials.lineHeight,
    })
  })

  it('CodeBlock uses its code font tokens', () => {
    const { container } = render(<CodeBlock>const a = 1</CodeBlock>)
    expect(container.querySelector('pre')).toHaveStyle({
      fontSize: component.codeBlock.fontSize,
      lineHeight: component.codeBlock.lineHeight,
    })
  })

  it.each([
    ['display', 'tighter'],
    ['h1', 'tighter'],
    ['h2', 'tight'],
    ['h3', 'tight'],
    ['h4', 'tight'],
    ['h5', 'normal'],
    ['h6', 'normal'],
  ] as const)('Typography %s uses the %s letter-spacing token', (variant, step) => {
    render(<Typography variant={variant}>Heading</Typography>)
    expect(screen.getByText('Heading')).toHaveStyle({ letterSpacing: tokens.semantic.letterSpacing[step] })
  })

  it.each(['body', 'subtitle', 'small'] as const)('Typography %s takes its line height from its typography token', (variant) => {
    render(<Typography variant={variant}>Text</Typography>)
    const tokenLineHeight = tokens.semantic.typography[variant].split(' ')[1].split('/')[1]
    expect(effectiveFontProperty(screen.getByText('Text'), 'line-height')).toBe(tokenLineHeight)
  })

  it('Badge count text uses the count line-height token', () => {
    render(<Badge count={3}><button>Inbox</button></Badge>)
    expect(screen.getByRole('status')).toHaveStyle({ lineHeight: component.badge.count.lineHeight })
  })
})
