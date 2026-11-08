import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import tokens from '@/lib/cssTokens'
// Timers need resolved durations, not CSS variables (decision 0041)
// eslint-disable-next-line no-restricted-imports
import tokenValues from '../../../styles/tokens.json'
import { exitAnimation, forcedColorsEdge, visuallyHidden } from '../../../lib/styleUtils'
import { usePresence } from '../../../lib/usePresence'
import { type FloatingAlign, type FloatingSide } from '../../../lib/floatingPosition'
import { useFloatingLayer } from '../../../lib/useFloatingLayer'
import { isKeyboardFocus } from '../../../lib/keyboardFocus'

const { semantic } = tokens
const { motion } = tokenValues.semantic

// How long the pointer rests before the tooltip opens (#326)
const HINT_DELAY_MS = parseInt(motion.delay.hint, 10)
// Moving to another trigger within this window opens its tooltip at once, so a rail feels immediate
const SKIP_DELAY_MS = parseInt(motion.duration.slow, 10)
// The grace period for the pointer to cross from the trigger onto the tooltip (WCAG 1.4.13)
const CLOSE_GRACE_MS = parseInt(motion.duration.fast, 10)

// Shared by every Tooltip: only one is open at a time, and the next one opens at once while one
// is open or within the skip-delay window after it closed
let lastClosedAt = 0
let active: { owner: object; close: () => void } | null = null

export type TooltipSide = FloatingSide
export type TooltipAlign = FloatingAlign

export interface TooltipProps {
  /** The tooltip's text. In `label` mode it repeats the trigger's existing accessible name. */
  text: string
  /**
   * `label` (default) shows the name the trigger already has, such as an IconButton's
   * `aria-label`, and is hidden from assistive technology so the name isn't announced twice.
   * `description` adds non-essential help, linked to the trigger with `aria-describedby`. Hover
   * text can't be reached on touch screens, so anything a user needs must be visible text.
   * @default 'label'
   */
  kind?: 'label' | 'description'
  /**
   * The side of the trigger it opens on. It flips to the opposite side when there's no room.
   * @default 'top'
   */
  side?: TooltipSide
  /**
   * Where it lines up along the trigger's edge.
   * @default 'center'
   */
  align?: TooltipAlign
  /**
   * Turns the tooltip off while keeping the trigger where it is, such as when the label it repeats
   * is visible. Changing it never remounts the trigger.
   * @default false
   */
  disabled?: boolean
  /** One focusable element: the trigger */
  children: React.ReactElement
  /** Test identifier for the tooltip bubble */
  'data-testid'?: string
}

const fadeIn = keyframes`
  from { opacity: 0; }
`

// A fade, so it needs no reduced-motion fallback (0015). Entrances decelerate (0037).
const Bubble = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $exiting: boolean }>`
  /* Reset the popover defaults: it's placed with top and left */
  position: fixed;
  inset: auto;
  top: 0;
  left: 0;
  margin: 0;
  overflow: visible;
  box-sizing: border-box;
  max-width: ${semantic.size[7500]};
  padding: ${semantic.space.inset.xs} ${semantic.space.inset.sm};
  border: none;
  border-radius: ${semantic.radius.sm};
  background-color: ${semantic.color.fill.inverse};
  color: ${semantic.color.text.inverse};
  font: ${semantic.typography.small};
  overflow-wrap: break-word;
  pointer-events: auto;
  animation: ${fadeIn} ${semantic.motion.duration.fast} ${semantic.motion.easing.decelerate}
    ${({ $exiting }) => ($exiting ? exitAnimation : css``)};

  ${forcedColorsEdge}
`

const Description = styled.span`
  ${visuallyHidden}
`

// The trigger's wrapper takes no box of its own, so the trigger lays out as if unwrapped
const Anchor = styled.span`
  display: contents;
`

/**
 * A short label or hint that appears beside a control on hover or keyboard focus (#326).
 *
 * Opens after `motion.delay.hint` of hover, at once on keyboard focus, and at once when the pointer
 * moves on from another tooltip. Stays open while the pointer is over it; closes on pointer leave,
 * blur, scroll and Escape. Doesn't open on touch.
 */
export const Tooltip = ({
  text,
  kind = 'label',
  side = 'top',
  align = 'center',
  disabled = false,
  children,
  'data-testid': dataTestId,
}: TooltipProps) => {
  const descriptionId = useId()
  const anchorRef = useRef<HTMLSpanElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [owner] = useState(() => ({}))
  // Set by a press, so the focus that follows a click or tap doesn't reopen the tooltip
  const pressed = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  // Turned off while showing (its label became visible): close it on the same render
  const [wasDisabled, setWasDisabled] = useState(disabled)
  if (wasDisabled !== disabled) {
    setWasDisabled(disabled)
    if (disabled) setIsOpen(false)
  }
  const { isPresent, isExiting } = usePresence(isOpen)

  const clearTimers = () => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
  }

  const close = useCallback(() => {
    clearTimers()
    if (active?.owner === owner) {
      active = null
      lastClosedAt = Date.now()
    }
    setIsOpen(false)
  }, [owner])

  const open = useCallback(() => {
    clearTimers()
    if (active && active.owner !== owner) active.close()
    active = { owner, close }
    setIsOpen(true)
  }, [owner, close])

  const scheduleOpen = () => {
    clearTimeout(closeTimer.current)
    if (isOpen || disabled) return
    // Moving straight from one trigger to the next (another tooltip still open) or just after one
    // closed skips the delay, so a rail feels immediate
    if (active || Date.now() - lastClosedAt < SKIP_DELAY_MS) return open()
    clearTimeout(openTimer.current)
    openTimer.current = setTimeout(open, HINT_DELAY_MS)
  }

  const scheduleClose = () => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(close, CLOSE_GRACE_MS)
  }

  useEffect(
    () => () => {
      clearTimers()
      if (active?.owner === owner) active = null
    },
    [owner]
  )

  // While open: Escape closes it without moving focus, and before anything else hears the key
  // (an Escape meant for the tooltip mustn't also close a Modal)
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.stopPropagation()
      close()
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [isOpen, close])

  // In the top layer beside the trigger; scrolling or resizing closes it, since the trigger moves
  useFloatingLayer({ isPresent, floatingRef: bubbleRef, anchorRef, side, align, onDetach: close })

  const child = React.Children.only(children) as React.ReactElement<{ 'aria-describedby'?: string }>
  const describedBy = [child.props['aria-describedby'], kind === 'description' ? descriptionId : undefined]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <Anchor
      ref={anchorRef}
      onPointerEnter={(event) => event.pointerType !== 'touch' && scheduleOpen()}
      onPointerLeave={(event) => event.pointerType !== 'touch' && scheduleClose()}
      onFocus={(event) => {
        // Keyboard focus opens it at once; a click's or tap's focus doesn't
        if (pressed.current) {
          pressed.current = false
          return
        }
        if (!disabled && isKeyboardFocus(event.target)) open()
      }}
      onBlur={() => {
        // A press on an already focused trigger has no focus to skip; don't carry it over
        pressed.current = false
        close()
      }}
      // Pressing the trigger acts on it, so the hint has done its job
      onPointerDown={() => {
        pressed.current = true
        close()
      }}
    >
      {React.cloneElement(child, { 'aria-describedby': describedBy })}
      {kind === 'description' && <Description id={descriptionId}>{text}</Description>}
      {isPresent && (
        // Hidden from assistive technology: a label repeats the trigger's name, and a
        // description reaches it through aria-describedby on the always-present text above
        <Bubble ref={bubbleRef} aria-hidden="true" $exiting={isExiting} data-testid={dataTestId}>
          {text}
        </Bubble>
      )}
    </Anchor>
  )
}

Tooltip.displayName = 'Tooltip'
