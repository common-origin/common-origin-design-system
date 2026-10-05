import React from 'react'
import { render, screen, fireEvent, act, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Alert, type AlertProps } from './Alert'
import tokens from '@/styles/tokens.json'
import { effectiveFontWeight } from '@/test-utils/effectiveFontWeight'
import { Button } from '../../atoms/Button'

expect.extend(toHaveNoViolations)

describe('Alert', () => {
  const defaultProps: AlertProps = {
    children: 'This is an alert message'
  }

  const renderAlert = (props: Partial<AlertProps> = {}) => {
    return render(<Alert {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderAlert()
      expect(screen.getByText('This is an alert message')).toBeInTheDocument()
    })

    it('applies data-testid correctly', () => {
      renderAlert({ 'data-testid': 'test-alert' })
      expect(screen.getByTestId('test-alert')).toBeInTheDocument()
    })

    it('renders children content', () => {
      renderAlert({ children: 'Custom alert message' })
      expect(screen.getByText('Custom alert message')).toBeInTheDocument()
    })

    it('renders title when provided', () => {
      renderAlert({ title: 'Alert Title' })
      expect(screen.getByText('Alert Title')).toBeInTheDocument()
    })

    it('renders the title at the semibold weight', () => {
      renderAlert({ title: 'Alert Title' })
      expect(effectiveFontWeight(screen.getByText('Alert Title'))).toBe(tokens.semantic.fontWeight.semibold)
    })

    it('renders both title and message', () => {
      renderAlert({
        title: 'Important Notice',
        children: 'Please read this carefully'
      })
      expect(screen.getByText('Important Notice')).toBeInTheDocument()
      expect(screen.getByText('Please read this carefully')).toBeInTheDocument()
    })
  })

  describe('Variant Props', () => {
    const variants: AlertProps['variant'][] = ['error', 'warning', 'info', 'success']

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        renderAlert({ variant, 'data-testid': `alert-${variant}` })
        const alert = screen.getByTestId(`alert-${variant}`)
        expect(alert).toBeInTheDocument()
        // Verify icon is present for the variant
        const svg = alert.querySelector('svg')
        expect(svg).toBeInTheDocument()
      })
    })

    it('defaults to info variant when not specified', () => {
      const { container } = renderAlert()
      const alert = container.querySelector('div[role="status"]')
      expect(alert).toBeInTheDocument()
    })
  })

  describe('Icon Functionality', () => {
    it('always shows icon for each variant', () => {
      const { container } = renderAlert()
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
    })

    it('shows correct icon for error variant', () => {
      const { container } = renderAlert({ variant: 'error' })
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      // crossCircle icon should be rendered
    })

    it('shows correct icon for warning variant', () => {
      const { container } = renderAlert({ variant: 'warning' })
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      // bell icon should be rendered
    })

    it('shows correct icon for info variant', () => {
      const { container } = renderAlert({ variant: 'info' })
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      // info icon should be rendered
    })

    it('shows correct icon for success variant', () => {
      const { container } = renderAlert({ variant: 'success' })
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      // checkRing icon should be rendered
    })

    it('icon has aria-hidden="true"', () => {
      const { container } = renderAlert()
      const iconContainer = container.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Dismissible Functionality', () => {
    it('does not show dismiss button by default', () => {
      renderAlert()
      expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument()
    })

    it('shows dismiss button when dismissible={true}', () => {
      renderAlert({ dismissible: true })
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })

    describe('dismiss motion', () => {
      // Fade (duration.fast) then collapse (duration.fast); removal follows the alert's own
      // animationend, which jsdom doesn't fire, so the tests fire it
      const fast = parseInt(tokens.semantic.motion.duration.fast, 10)

      // jsdom has no AnimationEvent, so build one with the fields the alert reads
      const animationEnd = (el: Element, animationName: string, pseudoElement = '') => {
        const event = new Event('animationend', { bubbles: true })
        Object.assign(event, { animationName, pseudoElement })
        fireEvent(el, event)
      }

      // The generated name of the full exit: the keyframes that collapse max-height
      const exitAnimationName = () => {
        const css = Array.from(document.querySelectorAll('style')).map((el) => el.textContent).join('')
        const match = css.match(/@keyframes\s+([\w-]+)\s*\{[^@]*max-height/)
        if (!match) throw new Error('exit keyframes not found')
        return match[1]
      }

      beforeEach(() => jest.useFakeTimers())
      afterEach(() => jest.useRealTimers())

      it('fades and collapses before it is removed, then calls onDismiss', () => {
        // onDismiss must not be able to observe the alert: it runs after removal is committed
        let presentDuringCallback: boolean | undefined
        const onDismiss = jest.fn(() => {
          presentDuringCallback = document.body.contains(document.querySelector('[data-testid="dismissable-alert"]'))
        })
        renderAlert({ dismissible: true, onDismiss, 'data-testid': 'dismissable-alert' })

        fireEvent.click(screen.getByLabelText('Dismiss alert'))

        const alert = screen.getByTestId('dismissable-alert')
        expect(alert).toHaveAttribute('aria-hidden', 'true')
        expect(alert).toHaveAttribute('inert')
        expect(alert.style.getPropertyValue('--alert-exit-height')).toMatch(/^\d+(\.\d+)?px$/)
        expect(onDismiss).not.toHaveBeenCalled()

        animationEnd(alert, exitAnimationName())
        expect(screen.queryByTestId('dismissable-alert')).not.toBeInTheDocument()
        expect(onDismiss).toHaveBeenCalledTimes(1)
        expect(presentDuringCallback).toBe(false)
      })

      const mockReducedMotion = (reduce: boolean) => {
        window.matchMedia = ((query: string) => ({
          matches: reduce && query === '(prefers-reduced-motion: reduce)',
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        })) as unknown as typeof window.matchMedia
      }
      afterEach(() => {
        delete (window as { matchMedia?: unknown }).matchMedia
      })

      // The animation the exiting alert runs, read from its class's rule in the injected CSS
      const exitAnimationOf = (el: Element) => {
        const css = Array.from(document.querySelectorAll('style')).map((s) => s.textContent).join('')
        const classes = Array.from(el.classList)
        const rule = css
          .split('}')
          .find((r) => classes.some((c) => r.includes(`.${c}{`)) && /animation:/.test(r))
        const match = rule?.match(/animation:\s*([\w-]+)\s+([\d.]+m?s)\s+ease-out\s+forwards/)
        if (!match) throw new Error('exit animation not found')
        return { name: match[1], duration: match[2] }
      }

      it('with reduced motion, only fades (duration.fast) and is removed when that fade ends', () => {
        mockReducedMotion(true)
        const onDismiss = jest.fn()
        renderAlert({ dismissible: true, onDismiss, 'data-testid': 'dismissable-alert' })
        fireEvent.click(screen.getByLabelText('Dismiss alert'))

        const alert = screen.getByTestId('dismissable-alert')
        const exit = exitAnimationOf(alert)
        expect(exit.duration).toBe(tokens.semantic.motion.duration.fast)
        expect(exit.name).not.toBe(exitAnimationName())

        animationEnd(alert, exit.name)
        expect(screen.queryByTestId('dismissable-alert')).not.toBeInTheDocument()
        expect(onDismiss).toHaveBeenCalledTimes(1)
      })

      it('keeps the exit it started with if the reduced-motion preference changes mid-exit', () => {
        mockReducedMotion(false)
        const { rerender } = renderAlert({ dismissible: true, 'data-testid': 'dismissable-alert' })
        fireEvent.click(screen.getByLabelText('Dismiss alert'))
        const alert = screen.getByTestId('dismissable-alert')
        const before = exitAnimationOf(alert)
        expect(before.name).toBe(exitAnimationName())

        // No media query can swap the running exit (jsdom doesn't evaluate media queries,
        // so check that none targets the exiting alert)
        const css = Array.from(document.querySelectorAll('style')).map((st) => st.textContent).join('')
        const reducedRules = Array.from(css.matchAll(/@media \(prefers-reduced-motion: reduce\)\{(.*?\})\}/g)).map((m) => m[1])
        const classes = Array.from(alert.classList)
        expect(reducedRules.filter((rule) => classes.some((c) => rule.includes(`.${c}{`)))).toEqual([])

        // And the choice made at dismissal isn't re-read
        mockReducedMotion(true)
        rerender(<Alert {...defaultProps} dismissible data-testid="dismissable-alert" />)
        expect(exitAnimationOf(screen.getByTestId('dismissable-alert'))).toEqual(before)
      })

      it('ignores animations ending on its children', () => {
        renderAlert({ dismissible: true, 'data-testid': 'dismissable-alert' })
        fireEvent.click(screen.getByLabelText('Dismiss alert'))

        const alert = screen.getByTestId('dismissable-alert')
        animationEnd(alert.firstElementChild as Element, exitAnimationName())
        expect(screen.getByTestId('dismissable-alert')).toBeInTheDocument()
      })

      it('ignores other animations on the alert and its pseudo-elements', () => {
        const onDismiss = jest.fn()
        renderAlert({ dismissible: true, onDismiss, 'data-testid': 'dismissable-alert' })
        fireEvent.click(screen.getByLabelText('Dismiss alert'))

        const alert = screen.getByTestId('dismissable-alert')
        animationEnd(alert, 'consumer-pulse')
        animationEnd(alert, exitAnimationName(), '::before')
        expect(screen.getByTestId('dismissable-alert')).toBeInTheDocument()
        expect(onDismiss).not.toHaveBeenCalled()
      })

      it.each([
        ['the full exit', false, 2],
        ['reduced motion', true, 1],
      ])('is removed after %s even if no animation event arrives', (_label, reduce, steps) => {
        mockReducedMotion(reduce)
        const onDismiss = jest.fn()
        renderAlert({ dismissible: true, onDismiss, 'data-testid': 'dismissable-alert' })
        fireEvent.click(screen.getByLabelText('Dismiss alert'))

        // Exactly the chosen exit's length: 300ms, or 150ms under reduced motion
        act(() => jest.advanceTimersByTime(fast * steps - 1))
        expect(screen.getByTestId('dismissable-alert')).toBeInTheDocument()

        act(() => jest.advanceTimersByTime(1))
        expect(screen.queryByTestId('dismissable-alert')).not.toBeInTheDocument()
        expect(onDismiss).toHaveBeenCalledTimes(1)
      })

      it("keeps a consumer's aria-hidden until it exits", () => {
        renderAlert({ dismissible: true, 'data-testid': 'dismissable-alert', 'aria-hidden': 'true' } as unknown as Partial<AlertProps>)
        const alert = screen.getByTestId('dismissable-alert')
        expect(alert).toHaveAttribute('aria-hidden', 'true')

        fireEvent.click(within(alert).getByLabelText('Dismiss alert'))
        expect(alert).toHaveAttribute('aria-hidden', 'true')
      })

      it('keeps consumer inline styles while it exits', () => {
        renderAlert({ dismissible: true, 'data-testid': 'dismissable-alert', style: { marginTop: '8px' } } as unknown as Partial<AlertProps>)
        const alert = screen.getByTestId('dismissable-alert')
        expect(alert.style.marginTop).toBe('8px')

        fireEvent.click(screen.getByLabelText('Dismiss alert'))
        expect(alert.style.marginTop).toBe('8px')
        expect(alert.style.getPropertyValue('--alert-exit-height')).not.toBe('')
      })
    })

    it('dismiss button has correct data-testid', () => {
      renderAlert({ dismissible: true, 'data-testid': 'my-alert' })
      expect(screen.getByTestId('my-alert-dismiss')).toBeInTheDocument()
    })

    // Decision 0019: the button is centred in a slot as tall as the first line of content
    describe('dismiss alignment', () => {
      const slotOf = (testId: string) => screen.getByTestId(testId).parentElement as HTMLElement

      it('lines up with the title when there is one', () => {
        renderAlert({ dismissible: true, title: 'Title', 'data-testid': 'a' })
        const slot = window.getComputedStyle(slotOf('a-dismiss'))
        expect(slot.height).toBe(tokens.component.alert.title.lineHeight)
        expect(slot.alignItems).toBe('center')
      })

      it('lines up with the message when there is no title', () => {
        renderAlert({ dismissible: true, 'data-testid': 'a' })
        expect(window.getComputedStyle(slotOf('a-dismiss')).height).toBe(
          tokens.component.alert.message.lineHeight
        )
      })

      it('starts at the top, with the icon, in both block and inline alerts', () => {
        ;[false, true].forEach((inline) => {
          const { unmount } = renderAlert({ dismissible: true, inline, 'data-testid': 'a' })
          expect(window.getComputedStyle(screen.getByTestId('a')).alignItems).toBe('flex-start')
          unmount()
        })
      })

      it('is the last item in the row', () => {
        renderAlert({
          dismissible: true,
          action: <Button onClick={() => {}}>Undo</Button>,
          'data-testid': 'a'
        })
        const alert = screen.getByTestId('a')
        expect(window.getComputedStyle(screen.getByTestId('a-dismiss')).position).not.toBe('absolute')
        expect(alert.lastElementChild).toBe(slotOf('a-dismiss'))
      })
    })
  })

  describe('Action Functionality', () => {
    // #122: the action follows the content, left-aligned with it
    it('places the action below the message, in the content column', () => {
      renderAlert({
        title: 'Title',
        dismissible: true,
        action: <Button onClick={() => {}}>Undo</Button>
      })
      const message = screen.getByText('This is an alert message')
      const actions = screen.getByRole('button', { name: 'Undo' }).parentElement as HTMLElement
      expect(actions.parentElement).toBe(message.parentElement)
      expect(actions.previousElementSibling).toBe(message)
      // With the content's xs gap, the space above the action is md
      const { md, xs } = tokens.semantic.spacing.layout
      expect(window.getComputedStyle(message.parentElement as HTMLElement).gap).toBe(xs)
      expect(window.getComputedStyle(actions).marginTop).toBe(`calc(${parseFloat(md) - parseFloat(xs)}rem)`)
    })

    it('renders action button when provided', () => {
      renderAlert({
        action: <Button onClick={() => {}}>Take Action</Button>
      })
      expect(screen.getByRole('button', { name: 'Take Action' })).toBeInTheDocument()
    })

    it('sets several actions side by side, sm apart, wrapping when there is no room', () => {
      renderAlert({
        action: (
          <>
            <Button onClick={() => {}}>Save</Button>
            <Button onClick={() => {}}>Discard</Button>
          </>
        )
      })
      const save = screen.getByRole('button', { name: 'Save' })
      const actions = window.getComputedStyle(save.parentElement as HTMLElement)
      expect(screen.getByRole('button', { name: 'Discard' }).parentElement).toBe(save.parentElement)
      expect(actions.display).toBe('flex')
      expect(actions.gap).toBe(tokens.semantic.spacing.layout.sm)
      expect(actions.flexWrap).toBe('wrap')
    })

    it('renders both action and dismiss button', () => {
      renderAlert({
        dismissible: true,
        action: <Button onClick={() => {}}>Undo</Button>
      })
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })

    it('action button is clickable', () => {
      const handleAction = jest.fn()
      renderAlert({
        action: <Button onClick={handleAction}>Confirm</Button>
      })

      const actionButton = screen.getByRole('button', { name: 'Confirm' })
      fireEvent.click(actionButton)

      expect(handleAction).toHaveBeenCalledTimes(1)
    })
  })

  describe('Inline Variant', () => {
    it('applies inline styling when inline={true}', () => {
      renderAlert({ inline: true, 'data-testid': 'inline-alert' })
      const alert = screen.getByTestId('inline-alert')
      expect(alert).toBeInTheDocument()
      // Verify the alert renders with its expected structure
      expect(alert).toHaveAttribute('role', 'status')
    })

    it('uses default styling when inline={false}', () => {
      const { container } = renderAlert({ inline: false, 'data-testid': 'block-alert' })
      const alert = screen.getByTestId('block-alert')
      expect(alert).toBeInTheDocument()
    })
  })

  describe('ARIA and Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderAlert()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with all props', async () => {
      const { container } = renderAlert({
        variant: 'error',
        title: 'Error',
        dismissible: true,
        action: <Button onClick={() => {}}>Retry</Button>
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations across all variants', async () => {
      const variants: AlertProps['variant'][] = ['error', 'warning', 'info', 'success']

      for (const variant of variants) {
        const { container, unmount } = renderAlert({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('has role="alert" for error variant', () => {
      renderAlert({ variant: 'error', 'data-testid': 'error-alert' })
      const alert = screen.getByTestId('error-alert')
      expect(alert).toHaveAttribute('role', 'alert')
    })

    it('has role="status" for non-error variants', () => {
      const variants: AlertProps['variant'][] = ['warning', 'info', 'success']

      variants.forEach((variant) => {
        const { unmount } = renderAlert({ variant, 'data-testid': `${variant}-alert` })
        const alert = screen.getByTestId(`${variant}-alert`)
        expect(alert).toHaveAttribute('role', 'status')
        unmount()
      })
    })

    it('has correct aria-live attribute', () => {
      renderAlert({ ariaLive: 'polite', 'data-testid': 'polite-alert' })
      const alert = screen.getByTestId('polite-alert')
      expect(alert).toHaveAttribute('aria-live', 'polite')
    })

    it('supports assertive aria-live', () => {
      renderAlert({ ariaLive: 'assertive', 'data-testid': 'assertive-alert' })
      const alert = screen.getByTestId('assertive-alert')
      expect(alert).toHaveAttribute('aria-live', 'assertive')
    })

    it('supports off aria-live', () => {
      renderAlert({ ariaLive: 'off', 'data-testid': 'off-alert' })
      const alert = screen.getByTestId('off-alert')
      expect(alert).toHaveAttribute('aria-live', 'off')
    })

    it('dismiss button has proper aria-label', () => {
      renderAlert({ dismissible: true })
      const dismissButton = screen.getByLabelText('Dismiss alert')
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert')
    })

    it('icon is hidden from screen readers', () => {
      const { container } = renderAlert()
      const iconContainer = container.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Complex Compositions', () => {
    it('renders full-featured alert with all props', () => {
      const onDismiss = jest.fn()
      const onAction = jest.fn()

      renderAlert({
        variant: 'warning',
        title: 'Budget Exceeded',
        dismissible: true,
        onDismiss,
        action: <Button onClick={onAction}>Adjust Budget</Button>,
        'data-testid': 'full-alert'
      })

      expect(screen.getByTestId('full-alert')).toBeInTheDocument()
      expect(screen.getByText('Budget Exceeded')).toBeInTheDocument()
      expect(screen.getByText('This is an alert message')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Adjust Budget' })).toBeInTheDocument()
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })

    it('handles complex children content', () => {
      renderAlert({
        children: (
          <div>
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        )
      })

      expect(screen.getByText('First paragraph')).toBeInTheDocument()
      expect(screen.getByText('Second paragraph')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderAlert({ children: '' })
      const alert = screen.queryByRole('status')
      expect(alert).toBeInTheDocument()
    })

    it('handles long content without breaking layout', () => {
      const longMessage = 'A'.repeat(500)
      renderAlert({ children: longMessage })
      expect(screen.getByText(longMessage)).toBeInTheDocument()
    })

    it('handles onDismiss being called without dismissible=true', () => {
      const onDismiss = jest.fn()
      renderAlert({ onDismiss, dismissible: false })
      expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument()
    })

    it('renders with icons for all variants', () => {
      const { container } = renderAlert()
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
    })

    it('preserves additional HTML attributes', () => {
      renderAlert({
        'data-testid': 'custom-alert',
        className: 'custom-class'
      } as any)
      const alert = screen.getByTestId('custom-alert')
      expect(alert).toHaveClass('custom-class')
    })
  })
})

describe('Alert appearance (decision 0019)', () => {
  const { alert } = tokens.component
  const severities = ['error', 'warning', 'info', 'success'] as const
  const appearances = ['outlined', 'borderless'] as const

  it('defaults to outlined, so existing alerts are unchanged', () => {
    render(<Alert variant="error" data-testid="alert">Message</Alert>)
    expect(screen.getByTestId('alert')).toHaveStyle({ borderColor: alert.appearance.outlined.borderColor.error })
  })

  describe.each(severities)('%s', (variant) => {
    it.each(appearances)('%s: severity tint and text, with the appearance border colour', (appearance) => {
      render(<Alert variant={variant} appearance={appearance} data-testid="alert">Message</Alert>)
      const el = screen.getByTestId('alert')
      expect(el).toHaveStyle({
        backgroundColor: alert.severity[variant].background,
        color: alert.severity[variant].text,
        borderColor: alert.appearance[appearance].borderColor[variant],
      })
    })

    it('keeps the same border width in both appearances, so switching never shifts layout', () => {
      render(
        <>
          <Alert variant={variant} appearance="outlined" data-testid="outlined">Message</Alert>
          <Alert variant={variant} appearance="borderless" data-testid="borderless">Message</Alert>
        </>
      )
      const outlined = window.getComputedStyle(screen.getByTestId('outlined'))
      const borderless = window.getComputedStyle(screen.getByTestId('borderless'))
      expect(borderless.borderTopWidth).toBe(outlined.borderTopWidth)
      expect(['transparent', 'rgba(0, 0, 0, 0)']).toContain(borderless.borderTopColor)
    })

    it.each(appearances)('%s has no accessibility violations, with a title and a dismiss button', async (appearance) => {
      const { container } = render(
        <Alert variant={variant} appearance={appearance} title="Title" dismissible>Message</Alert>
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  it('works alongside the deprecated inline prop', () => {
    render(<Alert inline appearance="borderless" variant="warning" data-testid="alert">Message</Alert>)
    expect(screen.getByTestId('alert')).toHaveStyle({ borderColor: 'transparent' })
  })
})
