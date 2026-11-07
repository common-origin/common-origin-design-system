import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Tooltip } from './Tooltip'
import { IconButton } from '../IconButton'
import tokens from '@/styles/tokens.json'

expect.extend(toHaveNoViolations)

const HINT = parseInt(tokens.semantic.motion.delay.hint, 10)
const GRACE = parseInt(tokens.semantic.motion.duration.fast, 10)

const setup = () => userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

// Lets the previous test's close leave the skip-delay window
const waitOutSkipWindow = () => act(() => { jest.advanceTimersByTime(1000) })

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2026, 10, 8).getTime() + Math.random() * 1e9)
  })
  afterEach(() => {
    act(() => { jest.runOnlyPendingTimers() })
    jest.useRealTimers()
  })

  const renderHome = (props: Partial<React.ComponentProps<typeof Tooltip>> = {}) =>
    render(
      <Tooltip text="Home" data-testid="tip" {...props}>
        <IconButton variant="naked" iconName="home" aria-label="Home" />
      </Tooltip>
    )

  describe('opening and closing', () => {
    it('opens after the hint delay on hover, not before', async () => {
      const user = setup()
      renderHome()
      await user.hover(screen.getByRole('button', { name: 'Home' }))
      act(() => { jest.advanceTimersByTime(HINT - 1) })
      expect(screen.queryByTestId('tip')).not.toBeInTheDocument()
      act(() => { jest.advanceTimersByTime(1) })
      expect(screen.getByTestId('tip')).toHaveTextContent('Home')
    })

    it('opens at once on keyboard focus and closes on blur', async () => {
      const user = setup()
      renderHome()
      await user.tab()
      expect(screen.getByTestId('tip')).toBeInTheDocument()
      await user.tab()
      act(() => { jest.advanceTimersByTime(GRACE) })
      expect(screen.queryByTestId('tip')).not.toBeInTheDocument()
    })

    it('stays open while the pointer moves onto it', async () => {
      const user = setup()
      renderHome()
      const button = screen.getByRole('button', { name: 'Home' })
      await user.hover(button)
      act(() => { jest.advanceTimersByTime(HINT) })
      await user.unhover(button)
      await user.hover(screen.getByTestId('tip'))
      act(() => { jest.advanceTimersByTime(GRACE * 2) })
      expect(screen.getByTestId('tip')).toBeInTheDocument()
    })

    it('closes after the pointer leaves', async () => {
      const user = setup()
      renderHome()
      const button = screen.getByRole('button', { name: 'Home' })
      await user.hover(button)
      act(() => { jest.advanceTimersByTime(HINT) })
      await user.unhover(button)
      // The grace period, then the exit fade
      act(() => { jest.advanceTimersByTime(GRACE) })
      act(() => { jest.advanceTimersByTime(GRACE) })
      expect(screen.queryByTestId('tip')).not.toBeInTheDocument()
    })

    it('closes on Escape without the key reaching anything else, and keeps focus', async () => {
      const user = setup()
      // Modal listens for Escape on the document, so a listener there stands in for one
      const onParentKeyDown = jest.fn()
      document.addEventListener('keydown', onParentKeyDown)
      renderHome()
      await user.tab()
      expect(screen.getByTestId('tip')).toBeInTheDocument()
      await user.keyboard('{Escape}')
      act(() => { jest.advanceTimersByTime(GRACE) })
      expect(screen.queryByTestId('tip')).not.toBeInTheDocument()
      const escapes = onParentKeyDown.mock.calls.filter(([event]) => event.key === 'Escape')
      expect(escapes).toHaveLength(0)
      document.removeEventListener('keydown', onParentKeyDown)
      expect(screen.getByRole('button', { name: 'Home' })).toHaveFocus()
    })

    it("doesn't open on touch", () => {
      renderHome()
      // jsdom has no PointerEvent, so give a plain event the touch pointer type
      const touch = new MouseEvent('pointerover', { bubbles: true })
      Object.defineProperty(touch, 'pointerType', { value: 'touch' })
      fireEvent(screen.getByRole('button', { name: 'Home' }), touch)
      act(() => { jest.advanceTimersByTime(HINT) })
      expect(screen.queryByTestId('tip')).not.toBeInTheDocument()
      // The same event from a mouse does open it, so the check above isn't vacuous
      const mouse = new MouseEvent('pointerover', { bubbles: true })
      Object.defineProperty(mouse, 'pointerType', { value: 'mouse' })
      fireEvent(screen.getByRole('button', { name: 'Home' }), mouse)
      act(() => { jest.advanceTimersByTime(HINT) })
      expect(screen.getByTestId('tip')).toBeInTheDocument()
    })

    it('moving straight between triggers swaps tooltips at once, one at a time', async () => {
      const user = setup()
      waitOutSkipWindow()
      render(
        <>
          <Tooltip text="Home" data-testid="home-tip">
            <IconButton variant="naked" iconName="home" aria-label="Home" />
          </Tooltip>
          <Tooltip text="Search" data-testid="search-tip">
            <IconButton variant="naked" iconName="search" aria-label="Search" />
          </Tooltip>
        </>
      )
      await user.hover(screen.getByRole('button', { name: 'Home' }))
      act(() => { jest.advanceTimersByTime(HINT) })
      // No pause: Home's tooltip is still open when the pointer reaches Search
      await user.hover(screen.getByRole('button', { name: 'Search' }))
      expect(screen.getByTestId('search-tip')).toBeInTheDocument()
      act(() => { jest.advanceTimersByTime(GRACE) })
      expect(screen.queryByTestId('home-tip')).not.toBeInTheDocument()
    })

    it('still opens on keyboard focus after the focused trigger was pressed', async () => {
      const user = setup()
      render(
        <>
          <Tooltip text="Home" data-testid="tip">
            <IconButton variant="naked" iconName="home" aria-label="Home" />
          </Tooltip>
          <button type="button">Next</button>
        </>
      )
      await user.tab()
      await user.click(screen.getByRole('button', { name: 'Home' }))
      await user.tab()
      act(() => { jest.advanceTimersByTime(GRACE) })
      await user.tab({ shift: true })
      expect(screen.getByTestId('tip')).toBeInTheDocument()
    })

    it('closes when the trigger is pressed', async () => {
      const user = setup()
      renderHome()
      const button = screen.getByRole('button', { name: 'Home' })
      await user.hover(button)
      act(() => { jest.advanceTimersByTime(HINT) })
      await user.click(button)
      act(() => { jest.advanceTimersByTime(GRACE) })
      expect(screen.queryByTestId('tip')).not.toBeInTheDocument()
    })

    it('opens at once when the pointer moves on from another tooltip', async () => {
      const user = setup()
      waitOutSkipWindow()
      render(
        <>
          <Tooltip text="Home" data-testid="home-tip">
            <IconButton variant="naked" iconName="home" aria-label="Home" />
          </Tooltip>
          <Tooltip text="Search" data-testid="search-tip">
            <IconButton variant="naked" iconName="search" aria-label="Search" />
          </Tooltip>
        </>
      )
      await user.hover(screen.getByRole('button', { name: 'Home' }))
      act(() => { jest.advanceTimersByTime(HINT) })
      await user.unhover(screen.getByRole('button', { name: 'Home' }))
      act(() => { jest.advanceTimersByTime(GRACE) })
      await user.hover(screen.getByRole('button', { name: 'Search' }))
      expect(screen.getByTestId('search-tip')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('in label mode, hides the bubble from assistive technology and leaves the name alone', async () => {
      const user = setup()
      renderHome()
      await user.tab()
      const button = screen.getByRole('button', { name: 'Home' })
      expect(screen.getByTestId('tip')).toHaveAttribute('aria-hidden', 'true')
      expect(button).not.toHaveAttribute('aria-describedby')
    })

    it('in description mode, describes the trigger even while closed', () => {
      renderHome({ kind: 'description', text: 'Go to your dashboard' })
      expect(screen.getByRole('button', { name: 'Home' })).toHaveAccessibleDescription('Go to your dashboard')
      expect(screen.queryByTestId('tip')).not.toBeInTheDocument()
    })

    it("keeps the trigger's own aria-describedby", () => {
      render(
        <>
          <p id="note">Opens in a new tab</p>
          <Tooltip text="Your dashboard" kind="description">
            <IconButton variant="naked" iconName="home" aria-label="Home" aria-describedby="note" />
          </Tooltip>
        </>
      )
      expect(screen.getByRole('button', { name: 'Home' })).toHaveAccessibleDescription('Opens in a new tab Your dashboard')
    })

    it('has no axe violations when open, in either mode', async () => {
      jest.useRealTimers()
      const user = userEvent.setup()
      const { container, unmount } = renderHome()
      await user.tab()
      expect(await axe(container)).toHaveNoViolations()
      unmount()
      const described = renderHome({ kind: 'description', text: 'Go to your dashboard' })
      await user.tab()
      expect(await axe(described.container)).toHaveNoViolations()
      jest.useFakeTimers()
    })
  })

  describe('appearance', () => {
    it('is an inverse bubble in the small text style (#326)', async () => {
      const user = setup()
      renderHome()
      await user.tab()
      expect(screen.getByTestId('tip')).toHaveStyle({
        backgroundColor: tokens.semantic.color.fill.inverse,
        color: tokens.semantic.color.text.inverse,
        maxWidth: tokens.semantic.size[7500],
      })
    })
  })
})
