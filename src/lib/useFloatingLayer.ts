import { useEffect, useLayoutEffect, type RefObject } from 'react'
// Placement needs resolved lengths, not CSS variables (decision 0041)
import tokenValues from '../styles/tokens.json'
import { laidOutElement, placeFloating, type FloatingAlign, type FloatingSide } from './floatingPosition'

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// The Popover API puts a floating element in the top layer: above everything, Modal included,
// never clipped by a scroll container, with no z-index (#326). It's in every current browser;
// without it the element is still position: fixed, so it escapes overflow clipping.
const supportsPopover = () => typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype

const remToPx = (value: string) =>
  parseFloat(value) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16)

interface FloatingLayerOptions {
  /** Whether the floating element is rendered */
  isPresent: boolean
  /** The floating element: `position: fixed`, placed with top and left */
  floatingRef: RefObject<HTMLElement | null>
  /** The `display: contents` wrapper around the trigger */
  anchorRef: RefObject<Element | null>
  side: FloatingSide
  align: FloatingAlign
  /**
   * Called when the trigger may have moved away from the floating element: the page or a container
   * scrolled (anything but the floating element itself), or the window resized
   */
  onDetach: () => void
}

/**
 * Shows a floating element (Tooltip, Menu) in the top layer beside its trigger, before the browser
 * paints, and places it again whenever its size changes. A gap of `space.100` separates it from the
 * trigger, and it keeps `space.200` from the viewport's edges.
 */
export function useFloatingLayer({ isPresent, floatingRef, anchorRef, side, align, onDetach }: FloatingLayerOptions) {
  useIsomorphicLayoutEffect(() => {
    const floating = floatingRef.current
    if (!isPresent || !floating) return
    if (supportsPopover() && !floating.matches(':popover-open')) {
      floating.setAttribute('popover', 'manual')
      floating.showPopover()
    }
    const place = () => {
      const trigger = laidOutElement(anchorRef.current)
      if (!trigger) return
      const anchor = trigger.getBoundingClientRect()
      const { width, height } = floating.getBoundingClientRect()
      const position = placeFloating({
        anchor,
        floating: { width, height },
        side,
        align,
        offset: remToPx(tokenValues.semantic.space[100]),
        viewport: { width: window.innerWidth, height: window.innerHeight },
        margin: remToPx(tokenValues.semantic.space[200]),
      })
      floating.style.top = `${position.top}px`
      floating.style.left = `${position.left}px`
      floating.dataset.side = position.side
    }
    place()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(place)
    observer.observe(floating)
    return () => observer.disconnect()
  }, [isPresent, side, align, floatingRef, anchorRef])

  useEffect(() => {
    if (!isPresent) return
    const onScroll = (event: Event) => {
      if (event.target instanceof Node && floatingRef.current?.contains(event.target)) return
      onDetach()
    }
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onDetach)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onDetach)
    }
  }, [isPresent, floatingRef, onDetach])
}
