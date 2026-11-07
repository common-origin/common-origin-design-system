// Places a floating element (Tooltip, Menu) next to its anchor, without a positioning library
// (P8). Pure geometry, so it can be tested without a browser: the caller measures both elements
// and applies the result as `top` and `left` on a `position: fixed` element.

export type FloatingSide = 'top' | 'right' | 'bottom' | 'left'
export type FloatingAlign = 'start' | 'center' | 'end'

export interface FloatingRect {
  top: number
  left: number
  width: number
  height: number
}

export interface FloatingOptions {
  /** The anchor's box, from getBoundingClientRect */
  anchor: FloatingRect
  /** The floating element's size */
  floating: { width: number; height: number }
  /** The side to place it on; it flips to the opposite side when that has more room */
  side: FloatingSide
  /** Where it lines up along the anchor's edge */
  align: FloatingAlign
  /** The gap between the anchor and the floating element, in px */
  offset: number
  /** The viewport's size */
  viewport: { width: number; height: number }
  /** The smallest distance kept from the viewport's edges, in px */
  margin: number
}

export interface FloatingPosition {
  top: number
  left: number
  /** The side it ended up on, after any flip */
  side: FloatingSide
}

const opposite: Record<FloatingSide, FloatingSide> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }

// The room between the anchor and the viewport edge on each side
const room = (side: FloatingSide, { anchor, viewport, margin }: FloatingOptions) => {
  switch (side) {
    case 'top': return anchor.top - margin
    case 'bottom': return viewport.height - (anchor.top + anchor.height) - margin
    case 'left': return anchor.left - margin
    case 'right': return viewport.width - (anchor.left + anchor.width) - margin
  }
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

export function placeFloating(options: FloatingOptions): FloatingPosition {
  const { anchor, floating, align, offset, viewport, margin } = options
  const vertical = (s: FloatingSide) => s === 'top' || s === 'bottom'

  // Flip when the preferred side is too small and the opposite side has more room
  let side = options.side
  const needed = (vertical(side) ? floating.height : floating.width) + offset
  if (room(side, options) < needed && room(opposite[side], options) > room(side, options)) {
    side = opposite[side]
  }

  // Main axis: beside the anchor, `offset` away
  let top = 0
  let left = 0
  if (side === 'top') top = anchor.top - offset - floating.height
  if (side === 'bottom') top = anchor.top + anchor.height + offset
  if (side === 'left') left = anchor.left - offset - floating.width
  if (side === 'right') left = anchor.left + anchor.width + offset

  // Cross axis: aligned to the anchor's start, centre or end, then kept inside the viewport
  if (vertical(side)) {
    if (align === 'start') left = anchor.left
    if (align === 'center') left = anchor.left + (anchor.width - floating.width) / 2
    if (align === 'end') left = anchor.left + anchor.width - floating.width
    left = clamp(left, margin, viewport.width - floating.width - margin)
  } else {
    if (align === 'start') top = anchor.top
    if (align === 'center') top = anchor.top + (anchor.height - floating.height) / 2
    if (align === 'end') top = anchor.top + anchor.height - floating.height
    top = clamp(top, margin, viewport.height - floating.height - margin)
  }

  return { top: Math.round(top), left: Math.round(left), side }
}

/**
 * The element that actually has a box inside a wrapper: Tooltip and Menu wrap their trigger in a
 * `display: contents` span, and a trigger can be nested in more than one (a Tooltip inside a Menu's
 * trigger), so this steps down until it finds an element that lays out.
 */
export function laidOutElement(wrapper: Element | null): Element | null {
  let element = wrapper?.firstElementChild ?? null
  while (element && typeof getComputedStyle !== 'undefined' && getComputedStyle(element).display === 'contents') {
    element = element.firstElementChild
  }
  return element
}
