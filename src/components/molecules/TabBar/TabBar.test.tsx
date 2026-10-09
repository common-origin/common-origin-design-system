import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TabBar, TabBarProps, Tab, TabVariant } from './TabBar'
import tokens from '@/styles/tokens.json'
import { contrastRatio, pseudoClassDeclarations } from '../../../test-utils/contrast'

const { background, text } = tokens.semantic.color

expect.extend(toHaveNoViolations)

describe('TabBar Component', () => {
  const mockTabs: Tab[] = [
    { id: 'tab1', label: 'Overview' },
    { id: 'tab2', label: 'Transactions', badge: 5 },
    { id: 'tab3', label: 'Analytics' },
    { id: 'tab4', label: 'Settings', disabled: true }
  ]

  const defaultProps: TabBarProps = {
    tabs: mockTabs,
    activeTab: 'tab1',
    onTabChange: jest.fn()
  }

  const renderTabBar = (props: Partial<TabBarProps> = {}) => {
    return render(<TabBar {...defaultProps} {...props} />)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderTabBar()
      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('renders all tabs', () => {
      renderTabBar()
      expect(screen.getByText('Overview')).toBeInTheDocument()
      expect(screen.getByText('Transactions')).toBeInTheDocument()
      expect(screen.getByText('Analytics')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('renders tab badges when provided', () => {
      renderTabBar()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('displays 99+ for badges over 99', () => {
      const tabsWithLargeBadge: Tab[] = [
        { id: 'tab1', label: 'Notifications', badge: 150 }
      ]
      renderTabBar({ tabs: tabsWithLargeBadge, activeTab: 'tab1' })
      expect(screen.getByText('99+')).toBeInTheDocument()
    })
  })

  describe('Selected treatment (decisions 0016, 0020)', () => {
    const tab = (name: RegExp) => screen.getByRole('tab', { name })

    it('gives the selected tab the light-blue fill, blue text and a blue underline', () => {
      renderTabBar()
      const selected = tab(/Overview/i)
      expect(selected).toHaveStyle({
        backgroundColor: background['interactive-subtle'],
        color: text.interactive,
      })
      expect(pseudoClassDeclarations(selected, '::after')).toContain(`background-color:${background.interactive};`)
    })

    it('darkens the selected text with the fill on hover and press', () => {
      renderTabBar()
      const selected = tab(/Overview/i)
      expect(pseudoClassDeclarations(selected, ':hover:not(:disabled)')).toContain(
        `background-color:${background['interactive-subtle-hover']};color:${text['interactive-hover']};`
      )
      expect(pseudoClassDeclarations(selected, ':active:not(:disabled)')).toContain(
        `background-color:${background['interactive-subtle-active']};color:${text['interactive-active']};`
      )
    })

    // Press feedback is colour only, like Button and Chip: no off-grid 1px nudge (#73)
    it('doesn\'t move a tab when it is pressed', () => {
      renderTabBar()
      ;[tab(/Overview/i), tab(/Analytics/i)].forEach((pressed) => {
        expect(pseudoClassDeclarations(pressed, ':active:not(:disabled)')).not.toMatch(/transform/)
      })
    })

    it('keeps unselected tabs unfilled, subdued, and never blue on hover', () => {
      renderTabBar()
      const unselected = tab(/Analytics/i)
      expect(unselected).toHaveStyle({ color: text.subdued })
      expect(pseudoClassDeclarations(unselected, ':hover:not(:disabled)')).toContain(
        `background-color:transparent;color:${text.default};`
      )
      expect(pseudoClassDeclarations(unselected, '::after')).toContain('background-color:transparent;')
    })

    it.each([
      ['selected', text.interactive, background['interactive-subtle']],
      ['hover', text['interactive-hover'], background['interactive-subtle-hover']],
      ['pressed', text['interactive-active'], background['interactive-subtle-active']],
    ])('meets 4.5:1 text contrast when %s', (_state, foreground, fill) => {
      expect(contrastRatio(foreground, fill)).toBeGreaterThanOrEqual(4.5)
    })

    it('shows the blue count badge on the selected tab', () => {
      renderTabBar({ tabs: [{ id: 'tab1', label: 'Inbox', badge: 3 }], activeTab: 'tab1' })
      expect(screen.getByLabelText('3 items')).toHaveStyle({
        backgroundColor: background.interactive,
        color: text.inverse,
      })
    })

    it.each(['default', 'pills'] as TabVariant[])(
      'renders the deprecated %s variant exactly like underline',
      (variant) => {
        const { container: underline } = renderTabBar({ variant: 'underline', 'data-testid': 'tabs' })
        const { container: deprecated } = renderTabBar({ variant, 'data-testid': 'tabs' })
        expect(deprecated.innerHTML).toBe(underline.innerHTML)
      }
    )

    it('renders as underline when no variant is given', () => {
      const { container: underline } = renderTabBar({ variant: 'underline', 'data-testid': 'tabs' })
      const { container: unset } = renderTabBar({ 'data-testid': 'tabs' })
      expect(unset.innerHTML).toBe(underline.innerHTML)
    })
  })

  describe('Tab Selection', () => {
    it('marks the active tab with aria-selected="true"', () => {
      renderTabBar()
      const activeTab = screen.getByRole('tab', { name: /Overview/i })
      expect(activeTab).toHaveAttribute('aria-selected', 'true')
    })

    it('marks inactive tabs with aria-selected="false"', () => {
      renderTabBar()
      const inactiveTab = screen.getByRole('tab', { name: /Analytics/i })
      expect(inactiveTab).toHaveAttribute('aria-selected', 'false')
    })

    it('calls onTabChange when clicking a tab', () => {
      const onTabChange = jest.fn()
      renderTabBar({ onTabChange })
      
      const tab = screen.getByRole('tab', { name: /Analytics/i })
      fireEvent.click(tab)
      
      expect(onTabChange).toHaveBeenCalledWith('tab3')
    })

    it('allows clicking the active tab', () => {
      const onTabChange = jest.fn()
      renderTabBar({ onTabChange, activeTab: 'tab1' })
      
      const tab = screen.getByRole('tab', { name: /Overview/i })
      fireEvent.click(tab)
      
      // Component allows re-clicking active tab - some use cases need this
      expect(onTabChange).toHaveBeenCalledWith('tab1')
    })

    it('does not call onTabChange when clicking a disabled tab', () => {
      const onTabChange = jest.fn()
      renderTabBar({ onTabChange })
      
      const tab = screen.getByRole('tab', { name: /Settings/i })
      fireEvent.click(tab)
      
      expect(onTabChange).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('marks disabled tabs with aria-disabled="true"', () => {
      renderTabBar()
      const disabledTab = screen.getByRole('tab', { name: /Settings/i })
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true')
    })

    it('enabled tabs have aria-disabled="false"', () => {
      renderTabBar()
      const enabledTab = screen.getByRole('tab', { name: /Overview/i })
      expect(enabledTab).toHaveAttribute('aria-disabled', 'false')
    })
  })

  describe('Keyboard Navigation', () => {
    it('navigates to next tab with ArrowRight', () => {
      renderTabBar()
      const firstTab = screen.getByRole('tab', { name: /Overview/i })
      firstTab.focus()
      
      fireEvent.keyDown(firstTab, { key: 'ArrowRight' })
      
      const secondTab = screen.getByRole('tab', { name: /Transactions/i })
      expect(secondTab).toHaveFocus()
    })

    it('navigates to previous tab with ArrowLeft', () => {
      renderTabBar()
      const secondTab = screen.getByRole('tab', { name: /Transactions/i })
      secondTab.focus()
      
      fireEvent.keyDown(secondTab, { key: 'ArrowLeft' })
      
      const firstTab = screen.getByRole('tab', { name: /Overview/i })
      expect(firstTab).toHaveFocus()
    })

    it('wraps to first tab when pressing ArrowRight on last tab', () => {
      renderTabBar()
      const lastEnabledTab = screen.getByRole('tab', { name: /Analytics/i })
      lastEnabledTab.focus()
      
      fireEvent.keyDown(lastEnabledTab, { key: 'ArrowRight' })
      
      const firstTab = screen.getByRole('tab', { name: /Overview/i })
      expect(firstTab).toHaveFocus()
    })

    it('wraps to last enabled tab when pressing ArrowLeft on first tab', () => {
      renderTabBar()
      const firstTab = screen.getByRole('tab', { name: /Overview/i })
      firstTab.focus()
      
      fireEvent.keyDown(firstTab, { key: 'ArrowLeft' })
      
      const lastEnabledTab = screen.getByRole('tab', { name: /Analytics/i })
      expect(lastEnabledTab).toHaveFocus()
    })

    it('skips disabled tabs when navigating with arrows', () => {
      renderTabBar()
      const analyticsTab = screen.getByRole('tab', { name: /Analytics/i })
      analyticsTab.focus()
      
      // Should skip disabled Settings tab and wrap to Overview
      fireEvent.keyDown(analyticsTab, { key: 'ArrowRight' })
      
      const firstTab = screen.getByRole('tab', { name: /Overview/i })
      expect(firstTab).toHaveFocus()
    })

    it('navigates to first tab with Home key', () => {
      renderTabBar()
      const lastTab = screen.getByRole('tab', { name: /Analytics/i })
      lastTab.focus()
      
      fireEvent.keyDown(lastTab, { key: 'Home' })
      
      const firstTab = screen.getByRole('tab', { name: /Overview/i })
      expect(firstTab).toHaveFocus()
    })

    it('navigates to last enabled tab with End key', () => {
      renderTabBar()
      const firstTab = screen.getByRole('tab', { name: /Overview/i })
      firstTab.focus()
      
      fireEvent.keyDown(firstTab, { key: 'End' })
      
      const lastEnabledTab = screen.getByRole('tab', { name: /Analytics/i })
      expect(lastEnabledTab).toHaveFocus()
    })
  })

  describe('Focus Management', () => {
    it('only the focused tab has tabIndex="0"', () => {
      renderTabBar()
      const firstTab = screen.getByRole('tab', { name: /Overview/i })
      const secondTab = screen.getByRole('tab', { name: /Transactions/i })
      
      expect(firstTab).toHaveAttribute('tabIndex', '0')
      expect(secondTab).toHaveAttribute('tabIndex', '-1')
    })

    it('updates tabIndex when activeTab changes', () => {
      const { rerender } = renderTabBar({ activeTab: 'tab1' })
      
      rerender(<TabBar {...defaultProps} activeTab="tab2" />)
      
      const secondTab = screen.getByRole('tab', { name: /Transactions/i })
      expect(secondTab).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('ARIA Attributes', () => {
    it('has role="tablist" on container', () => {
      renderTabBar()
      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('each tab has role="tab"', () => {
      renderTabBar()
      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(4)
    })

    it('badges have aria-label for screen readers', () => {
      renderTabBar()
      const badge = screen.getByLabelText('5 items')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderTabBar()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations for every variant value, including deprecated ones', async () => {
      const variants: TabVariant[] = ['default', 'pills', 'underline']

      for (const variant of variants) {
        const { container, unmount } = renderTabBar({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with badges', async () => {
      const { container } = renderTabBar()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with disabled tabs', async () => {
      const { container } = renderTabBar()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Edge Cases', () => {
    it('handles single tab', () => {
      const singleTab: Tab[] = [{ id: 'only', label: 'Only Tab' }]
      renderTabBar({ tabs: singleTab, activeTab: 'only' })
      expect(screen.getByRole('tab')).toBeInTheDocument()
    })

    it('handles tabs without badges', () => {
      const tabsNoBadges: Tab[] = [
        { id: 'tab1', label: 'First' },
        { id: 'tab2', label: 'Second' }
      ]
      renderTabBar({ tabs: tabsNoBadges, activeTab: 'tab1' })
      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.queryByLabelText(/notifications/)).not.toBeInTheDocument()
    })

    it('handles all tabs disabled except one', () => {
      const mostlyDisabled: Tab[] = [
        { id: 'tab1', label: 'Active', disabled: false },
        { id: 'tab2', label: 'Disabled1', disabled: true },
        { id: 'tab3', label: 'Disabled2', disabled: true }
      ]
      renderTabBar({ tabs: mostlyDisabled, activeTab: 'tab1' })
      expect(screen.getByText('Active')).toBeInTheDocument()
    })

    it('handles long tab labels', () => {
      const longLabelTabs: Tab[] = [
        { id: 'tab1', label: 'This is a very long tab label that might overflow' }
      ]
      renderTabBar({ tabs: longLabelTabs, activeTab: 'tab1' })
      expect(screen.getByText('This is a very long tab label that might overflow')).toBeInTheDocument()
    })

    it('does not show badge when value is zero', () => {
      const zeroBadgeTabs: Tab[] = [
        { id: 'tab1', label: 'Tab', badge: 0 }
      ]
      renderTabBar({ tabs: zeroBadgeTabs, activeTab: 'tab1' })
      // Badge should not render for zero values
      expect(screen.queryByLabelText(/items/)).not.toBeInTheDocument()
    })
  })
})
