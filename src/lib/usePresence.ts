import { useEffect, useState, type RefObject } from 'react'
import tokens from '../styles/tokens.json'

// How long an exiting element stays mounted: the duration of `exitAnimation` in styleUtils.
export const EXIT_DURATION_MS = parseInt(tokens.semantic.motion.duration.fast, 10)

/**
 * Keeps an element mounted for `exitMs` after `isOpen` turns false, so its exit
 * animation can run before it unmounts (decision 0005).
 */
export function usePresence(isOpen: boolean, exitMs: number = EXIT_DURATION_MS) {
  const [isMounted, setIsMounted] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      return
    }
    const timer = setTimeout(() => setIsMounted(false), exitMs)
    return () => clearTimeout(timer)
  }, [isOpen, exitMs])

  return {
    isPresent: isOpen || isMounted,
    isExiting: !isOpen && isMounted,
  }
}

/**
 * Makes an element inert while `isInert` is true, so an exiting overlay's controls leave
 * the tab order and can't be activated. Set through the DOM because React 18 has no
 * `inert` prop.
 */
export function useInert(ref: RefObject<HTMLElement | null>, isInert: boolean) {
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (isInert) node.setAttribute('inert', '')
    else node.removeAttribute('inert')
  }, [ref, isInert])
}
