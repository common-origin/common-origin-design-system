import { useEffect, useState } from 'react'
import tokens from '../styles/tokens.json'

// How long an exiting element stays mounted: the duration of `exitFade` in styleUtils.
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
