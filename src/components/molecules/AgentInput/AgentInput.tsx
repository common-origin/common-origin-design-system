import {
  ChangeEvent,
  ForwardedRef,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
} from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Button } from '../../atoms/Button'
import { SuggestionChip } from '../../atoms/Chip'
import { IconButton } from '../../atoms/IconButton'
import { Typography } from '../../atoms/Typography'
import { reducedMotion, visuallyHidden } from '../../../lib/styleUtils'
import { EXIT_DURATION_MS, useInert, usePresence } from '../../../lib/usePresence'
import tokens from '@/lib/cssTokens'
import {
  AgentInputSubmitSource,
  AgentInputVoiceError,
  AgentInputVoiceErrorCode,
  SpeechRecognitionLike,
  defaultVoiceErrorMessage,
  detectSpeechRecognitionConstructor,
  mapSpeechErrorCode,
  normalizeMessage,
  normalizeTranscript,
} from './agentInputSpeech'
import { AgentInputMachineState, agentInputStateTransition } from './agentInputStateMachine'

const { semantic, component } = tokens

const DEFAULT_LISTENING_MESSAGE = 'Listening… speak now'
const DEFAULT_PROCESSING_MESSAGE = 'Finishing voice input…'
// The counter appears from this share of maxLength
const COUNTER_THRESHOLD = 0.8

// Layout effects warn during server rendering in React 18
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface SubmitPayload {
  text: string
  source: AgentInputSubmitSource
  timestamp: string
}

export interface AgentInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void

  /**
   * Called on Enter, Send, or a final voice transcript. When it resolves, the field clears if it
   * still holds the submitted text (a follow-up typed meanwhile is kept). When it rejects, the text stays.
   */
  onSubmit: (payload: SubmitPayload) => void | Promise<void>
  /** While submitting, turns Send into Stop and lets Escape stop. */
  onStop?: () => void

  /**
   * The review bar above the field, for an agent's proposal or an applied change (decision 0046).
   * Omit it when there's nothing to review or undo.
   */
  review?: AgentInputReview
  /**
   * Prompt starters or follow-ups, shown above the field while it's empty and no proposal is open.
   * At most three are shown. Picking one fills the field and focuses it; it never sends.
   */
  suggestions?: string[]
  /** Called with a suggestion's text when it's picked, after it fills the field */
  onSuggestionSelect?: (text: string) => void

  placeholder?: string
  /**
   * Soft character limit for the submitted text. Typing past it is allowed, but Send is disabled and
   * the counter and status line show the message is too long. A counter appears from 80% of the limit.
   */
  maxLength?: number
  disabled?: boolean
  isSubmitting?: boolean

  enableVoice?: boolean
  autoSubmitOnVoiceFinal?: boolean
  voiceLanguage?: string
  noSpeechTimeoutMs?: number

  onVoiceStart?: () => void
  onVoiceStop?: () => void
  onVoiceInterim?: (text: string) => void
  onVoiceFinal?: (text: string) => void
  onVoiceError?: (error: AgentInputVoiceError) => void

  /** Hint shown in the status line while idle or typing. Empty by default. */
  helperText?: string
  /** Overrides the status line in every non-error state. */
  statusMessage?: string
  /** Shown in the status line, styled and announced as an error, whenever it is set. */
  errorMessage?: string
  label?: string
  'data-testid'?: string
}

/**
 * An agent's proposal waiting for review, or a change already applied (decision 0046). In the
 * proposal state the bar shows the summary with Accept and Discard; once applied, "Changes applied"
 * with Undo.
 */
export type AgentInputReview =
  | {
      state: 'proposal'
      /** What the agent proposes, for example "3 changes suggested" */
      summary: string
      onAccept: () => void
      onDiscard: () => void
    }
  | {
      state: 'applied'
      onUndo: () => void
    }

export interface AgentInputFocusOptions {
  /** Where to put the caret. Omit to keep the browser's default. */
  cursor?: 'start' | 'end' | 'all'
}

/** Imperative handle, for products that focus or clear the field from their own controls. */
export interface AgentInputHandle {
  focus: (options?: AgentInputFocusOptions) => void
  clear: () => void
}

const rotateRing = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${semantic.space[200]};
  width: 100%;
`

const ControlsRow = styled.div`
  width: 100%;
`

const InputShell = styled.div`
  display: flex;
  /* Actions sit beside the last line as the field grows */
  align-items: flex-end;
  gap: ${semantic.space[200]};
  width: 100%;
  padding: ${semantic.space[100]} ${semantic.space[200]} ${semantic.space[100]} ${semantic.space.inset.lg};
  background-color: ${component.input.default.backgroundColor};
  border: ${component.input.default.borderWidth} solid ${component.input.default.borderColor};
  border-radius: ${semantic.radius['3xl']};
  box-shadow: ${semantic.elevation.raised};
  transition: border-color ${semantic.motion.duration.moderate} ${semantic.motion.easing.standard}, outline ${semantic.motion.duration.moderate} ${semantic.motion.easing.standard};

  &:focus-within {
    border-color: ${component.input.focus.borderColor};
    outline: ${component.input.focus.outline};
    outline-offset: ${semantic.border.focusOffset};
  }

  &[data-disabled='true'] {
    background-color: ${component.input.disabled.backgroundColor};
    border-color: ${component.input.disabled.borderColor};
  }
`

// One row is a control-height field; it grows with its content to six rows, then scrolls.
// The height is set from scrollHeight in resizeField; 1lh is the body line height.
const Input = styled.textarea`
  display: block;
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  height: ${semantic.size.control.lg};
  min-height: ${semantic.size.control.lg};
  max-height: calc(5lh + ${semantic.size.control.lg});
  margin: 0;
  padding: calc((${semantic.size.control.lg} - 1lh) / 2) 0;
  resize: none;
  overflow-y: hidden;
  border: none;
  background: transparent;
  font: ${semantic.typography.body};
  color: ${semantic.color.text.default};
  outline: none;

  &::placeholder {
    color: ${component.input.placeholder.textColor};
    /* Firefox fades placeholders to 0.54 by default, which would undo the 4.5:1 contrast */
    opacity: 1;
  }

  &:disabled {
    color: ${semantic.color.text.disabled};
    cursor: not-allowed;
  }
`

const InputActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${semantic.space[200]};
  /* Centres the buttons on a one-row field, and keeps them level with the last line as it grows */
  padding-bottom: calc((${semantic.size.control.lg} - ${semantic.size.control.md}) / 2);
`

const CircularActionIconButton = styled(IconButton)`
  border-radius: ${semantic.radius.full};
`

const InputWrapper = styled.div`
  flex: 1;
  min-width: 0;
`

const MicButtonWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isListening: boolean; $reducedMotion: boolean }>`
  position: relative;
  display: inline-flex;
  border-radius: ${semantic.radius.full};

  & > button {
    position: relative;
    z-index: 1;
  }
`

// Masks read only alpha, so the opaque stop is a mask value, not a colour (decision 0010).
// eslint-disable-next-line no-restricted-syntax
const ringMask = css`radial-gradient(farthest-side, transparent calc(100% - var(--ring-thickness)), #000 calc(100% - var(--ring-thickness)))`

const MicListeningRing = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $reducedMotion: boolean }>`
  --ring-thickness: ${semantic.border.width.thick};
  position: absolute;
  inset: calc(-1 * ${semantic.space[100]} - ${semantic.border.focusOffset});
  border-radius: ${semantic.radius.full};
  pointer-events: none;
  z-index: 0;
  background: conic-gradient(
    from 0deg,
    ${semantic.color.fill['accent-muted']} 0deg,
    ${semantic.color.fill.accent} 110deg,
    ${semantic.color.fill['accent-hover']} 210deg,
    ${semantic.color.fill.accent} 300deg,
    ${semantic.color.fill['accent-muted']} 360deg
  );
  mask: ${ringMask};
  -webkit-mask: ${ringMask};

  ${({ $reducedMotion }) =>
    !$reducedMotion &&
    css`
      animation: ${rotateRing} 1300ms linear infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// Maximum suggestions shown (decision 0046, #280)
const MAX_SUGGESTIONS = 3

const regionEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(${semantic.motion.distance.sm});
  }
`

const regionFadeIn = keyframes`
  from {
    opacity: 0;
  }
`

// Leaving content fades, then its space closes, as with Alert's dismiss (decision 0015). A grid
// row from 1fr to 0fr collapses to the content's own height without measuring it.
const regionFadeThenCollapse = keyframes`
  0%, 50% {
    grid-template-rows: 1fr;
  }
  0% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
  100% {
    grid-template-rows: 0fr;
  }
`

const regionFadeOut = keyframes`
  to {
    opacity: 0;
  }
`

// One part of the region above the field: the review bar or the suggestions
const RegionItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $exiting: boolean; $reducedExit: boolean }>`
  display: grid;
  grid-template-rows: 1fr;
  animation: ${regionEnter} ${semantic.motion.duration.moderate} ${semantic.motion.easing.decelerate};

  ${reducedMotion} {
    animation-name: ${regionFadeIn};
  }

  ${({ $exiting, $reducedExit }) =>
    $exiting &&
    css`
      pointer-events: none;
      animation: ${$reducedExit
        ? css`${regionFadeOut} ${semantic.motion.duration.fast} ${semantic.motion.easing.accelerate} forwards`
        : css`${regionFadeThenCollapse} calc(2 * ${semantic.motion.duration.fast}) ${semantic.motion.easing.accelerate} forwards`};
    `}
`

// Clips while the row collapses. Its bottom padding is the space to the next part, so it closes too.
const RegionItemContent = styled.div`
  min-height: 0;
  overflow: hidden;
  padding-bottom: ${semantic.space[200]};
  padding-left: ${semantic.space[500]};
`

// The summary first, then the actions, left-aligned after it; they wrap below on narrow screens (0021)
const ReviewBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: ${semantic.space[300]};
  row-gap: ${semantic.space[200]};
`

const ReviewActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${semantic.space[200]};
`

const SuggestionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${semantic.space[200]};
  margin: 0;
  padding: 0;
  list-style: none;

  & > li {
    max-width: 100%;
  }
`

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${semantic.space[300]};
  min-height: ${semantic.space[600]};
`

const StatusText = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isError: boolean }>`
  padding-left: ${semantic.space[500]};
`

const StatusAnnouncement = styled.div``

const StatusEnd = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${semantic.space[300]};
`

const VisuallyHidden = styled.span`
  ${visuallyHidden}
`

const MeterContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  gap: ${semantic.space[100]};
  height: ${semantic.space[400]};
`

const MeterBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $height: number }>`
  width: ${semantic.space[100]};
  border-radius: ${semantic.radius.xs};
  background-color: ${semantic.color.fill.accent};
  height: ${({ $height }) => `${$height * 100}%`};
  transition: height ${semantic.motion.duration.fast} ${semantic.motion.easing.decelerate};
`

const VisuallyHiddenLabel = styled.label`
  ${visuallyHidden}
`

function getInitialState(hasText: boolean): AgentInputMachineState {
  return hasText ? 'typing' : 'idle'
}

function createMeterBars(level: number): number[] {
  const clampedLevel = Math.max(0, Math.min(level, 1))
  return [
    0.25 + clampedLevel * 0.75,
    0.2 + clampedLevel * 0.6,
    0.3 + clampedLevel * 0.7,
    0.2 + clampedLevel * 0.5,
  ]
}

// Declared separately so the react-hooks lint rules analyse it (they skip functions inline in forwardRef)
// Development builds warn about props that break the pattern. Bundlers replace process.env.NODE_ENV
// with a literal; without a bundler, a browser has no process, so reading it throws.
function readIsProduction(): boolean {
  try {
    return process.env.NODE_ENV === 'production'
  } catch {
    return false
  }
}
const isProduction = readIsProduction()

// A part of the region above the field. It stays mounted while it fades out and its space closes.
function RegionPart({ show, reducedExit, children }: { show: boolean; reducedExit: boolean; children: ReactNode }) {
  const { isPresent, isExiting } = usePresence(show, reducedExit ? EXIT_DURATION_MS : EXIT_DURATION_MS * 2)
  const ref = useRef<HTMLDivElement>(null)
  // Leaving controls drop out of the tab order and can't be activated
  useInert(ref, isExiting)

  if (!isPresent) return null

  return (
    <RegionItem ref={ref} $exiting={isExiting} $reducedExit={reducedExit} aria-hidden={isExiting || undefined}>
      <RegionItemContent>{children}</RegionItemContent>
    </RegionItem>
  )
}

function AgentInputWithRef({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  onStop,
  review,
  suggestions,
  onSuggestionSelect,
  placeholder = 'Ask a question',
  maxLength,
  disabled = false,
  isSubmitting,
  enableVoice = true,
  autoSubmitOnVoiceFinal = true,
  voiceLanguage = 'en-AU',
  noSpeechTimeoutMs = 8000,
  onVoiceStart,
  onVoiceStop,
  onVoiceInterim,
  onVoiceFinal,
  onVoiceError,
  helperText = '',
  statusMessage,
  errorMessage,
  label = 'Agent input',
  'data-testid': dataTestId,
}: AgentInputProps, ref: ForwardedRef<AgentInputHandle>) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [machineState, setMachineState] = useState<AgentInputMachineState>(
    getInitialState(normalizeTranscript(value ?? defaultValue).length > 0)
  )
  const [interimTranscript, setInterimTranscript] = useState('')
  const [internalSubmitting, setInternalSubmitting] = useState(false)
  const [internalErrorMessage, setInternalErrorMessage] = useState<string | undefined>(undefined)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [meterLevel, setMeterLevel] = useState(0)

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const noSpeechTimeoutRef = useRef<number | null>(null)
  const isStoppingRef = useRef(false)
  const hasSubmittedVoiceFinalRef = useRef(false)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const meterRafRef = useRef<number | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const inputId = useId()
  const statusId = `${inputId}-status`
  const counterId = `${inputId}-counter`

  const currentValue = isControlled ? value ?? '' : internalValue
  // Read after onSubmit settles, when the closure's value may be stale
  const currentValueRef = useRef(currentValue)
  useEffect(() => {
    currentValueRef.current = currentValue
  }, [currentValue])
  const hasText = normalizeTranscript(currentValue).length > 0
  const messageLength = normalizeMessage(currentValue).length
  const isOverLimit = maxLength !== undefined && messageLength > maxLength
  const effectiveSubmitting = isSubmitting ?? internalSubmitting
  const effectiveState = disabled ? 'disabled' : machineState
  const isListening = effectiveState === 'listening'
  const hasVoice = enableVoice && voiceSupported

  const updateMachineState = useCallback((event: Parameters<typeof agentInputStateTransition>[1]) => {
    setMachineState((previousState) => agentInputStateTransition(previousState, event))
  }, [])

  const updateValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onChange?.(nextValue)
    },
    [isControlled, onChange]
  )

  const clearNoSpeechTimeout = useCallback(() => {
    if (noSpeechTimeoutRef.current) {
      window.clearTimeout(noSpeechTimeoutRef.current)
      noSpeechTimeoutRef.current = null
    }
  }, [])

  const stopMeter = useCallback(async () => {
    if (meterRafRef.current) {
      window.cancelAnimationFrame(meterRafRef.current)
      meterRafRef.current = null
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop())
      audioStreamRef.current = null
    }

    if (audioContextRef.current) {
      await audioContextRef.current.close()
      audioContextRef.current = null
    }

    setMeterLevel(0)
  }, [])

  const startMeter = useCallback(async () => {
    if (prefersReducedMotion || !navigator?.mediaDevices?.getUserMedia) {
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256

      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)

      const data = new Uint8Array(analyser.frequencyBinCount)

      audioStreamRef.current = stream
      audioContextRef.current = audioContext

      const loop = () => {
        analyser.getByteTimeDomainData(data)
        let sum = 0
        for (let index = 0; index < data.length; index += 1) {
          const centered = data[index] / 128 - 1
          sum += centered * centered
        }

        const rms = Math.sqrt(sum / data.length)
        const nextLevel = Math.max(0.05, Math.min(rms * 3, 1))
        setMeterLevel(nextLevel)
        meterRafRef.current = window.requestAnimationFrame(loop)
      }

      meterRafRef.current = window.requestAnimationFrame(loop)
    } catch {
      setMeterLevel(0)
    }
  }, [prefersReducedMotion])

  const emitVoiceError = useCallback(
    (code: AgentInputVoiceErrorCode, fallback?: string) => {
      const message = fallback ?? defaultVoiceErrorMessage(code)
      setInternalErrorMessage(message)
      updateMachineState({ type: 'VOICE_ERROR' })
      onVoiceError?.({ code, message })
    },
    [onVoiceError, updateMachineState]
  )

  const submitPayload = useCallback(
    async (rawText: string, source: AgentInputSubmitSource) => {
      const text = source === 'text' ? normalizeMessage(rawText) : normalizeTranscript(rawText)
      if (!text || disabled || effectiveSubmitting) {
        return
      }

      if (maxLength !== undefined && text.length > maxLength) {
        // A long transcript goes into the field to be shortened, unless the user has typed since
        if (source === 'voice-final' && !normalizeMessage(currentValueRef.current)) {
          updateValue(text)
        }
        return
      }

      updateMachineState({ type: 'SUBMIT' })
      setInternalErrorMessage(undefined)
      if (isSubmitting === undefined) {
        setInternalSubmitting(true)
      }

      try {
        await onSubmit({
          text,
          source,
          timestamp: new Date().toISOString(),
        })

        updateMachineState({ type: 'SUBMIT_SUCCESS' })
        setInterimTranscript('')
        // Keep a follow-up typed while submitting
        if (normalizeMessage(currentValueRef.current) === text) {
          updateValue('')
        }
      } catch {
        updateMachineState({ type: 'SUBMIT_ERROR' })
        // Restore the transcript unless the user has typed something since
        if (source === 'voice-final' && !normalizeMessage(currentValueRef.current)) {
          updateValue(text)
        }
        setInternalErrorMessage('Submission failed. Please try again.')
      } finally {
        if (isSubmitting === undefined) {
          setInternalSubmitting(false)
        }
      }
    },
    [disabled, effectiveSubmitting, isSubmitting, maxLength, onSubmit, updateMachineState, updateValue]
  )

  const stopListening = useCallback(
    async (emitStopEvent: boolean, preserveState: boolean = false) => {
      isStoppingRef.current = true
      clearNoSpeechTimeout()
      setInterimTranscript('')

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch {
          // no-op
        }
      }

      await stopMeter()
      if (emitStopEvent) {
        onVoiceStop?.()
      }

      if (!preserveState) {
        updateMachineState({ type: 'MIC_STOP', hasText })
      }
      isStoppingRef.current = false
    },
    [clearNoSpeechTimeout, hasText, onVoiceStop, stopMeter, updateMachineState]
  )

  const onNoSpeechTimeout = useCallback(async () => {
    clearNoSpeechTimeout()
    updateMachineState({ type: 'TIMEOUT_NO_SPEECH' })
    const message = defaultVoiceErrorMessage('no-speech')
    setInternalErrorMessage(message)
    onVoiceError?.({ code: 'no-speech', message })
    await stopListening(true, true)
  }, [clearNoSpeechTimeout, onVoiceError, stopListening, updateMachineState])

  const beginListening = useCallback(async () => {
    if (!recognitionRef.current || disabled || effectiveSubmitting) {
      return
    }

    setInternalErrorMessage(undefined)
    hasSubmittedVoiceFinalRef.current = false

    try {
      recognitionRef.current.start()
      updateMachineState({ type: 'MIC_START' })
      onVoiceStart?.()
      clearNoSpeechTimeout()
      noSpeechTimeoutRef.current = window.setTimeout(onNoSpeechTimeout, noSpeechTimeoutMs)
      await startMeter()
    } catch {
      emitVoiceError('unknown')
    }
  }, [
    clearNoSpeechTimeout,
    disabled,
    effectiveSubmitting,
    emitVoiceError,
    noSpeechTimeoutMs,
    onNoSpeechTimeout,
    onVoiceStart,
    startMeter,
    updateMachineState,
  ])

  useEffect(() => {
    const constructor = detectSpeechRecognitionConstructor(window)
    setVoiceSupported(Boolean(constructor))

    if (!enableVoice || !constructor) {
      return
    }

    const recognition = new constructor()
    recognition.lang = voiceLanguage
    recognition.interimResults = true
    recognition.continuous = false

    recognition.onresult = async (event) => {
      clearNoSpeechTimeout()
      noSpeechTimeoutRef.current = window.setTimeout(onNoSpeechTimeout, noSpeechTimeoutMs)

      let interim = ''
      let finalText = ''

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index]
        if (!result || !result[0]) continue

        if (result.isFinal) {
          finalText += ` ${result[0].transcript}`
        } else {
          interim += ` ${result[0].transcript}`
        }
      }

      const normalizedInterim = normalizeTranscript(interim)
      setInterimTranscript(normalizedInterim)
      updateMachineState({ type: 'VOICE_INTERIM' })

      if (normalizedInterim) {
        onVoiceInterim?.(normalizedInterim)
      }

      const normalizedFinal = normalizeTranscript(finalText)
      if (!normalizedFinal || hasSubmittedVoiceFinalRef.current) {
        return
      }

      hasSubmittedVoiceFinalRef.current = true
      updateMachineState({ type: 'VOICE_FINAL' })
      setInterimTranscript('')
      onVoiceFinal?.(normalizedFinal)

      await stopMeter()

      if (autoSubmitOnVoiceFinal) {
        await submitPayload(normalizedFinal, 'voice-final')
      } else {
        updateValue(normalizedFinal)
        updateMachineState({ type: 'MIC_STOP', hasText: true })
      }
    }

    recognition.onerror = async (event) => {
      const mappedCode = mapSpeechErrorCode(event.error)
      emitVoiceError(mappedCode)
      await stopListening(true, true)
    }

    recognition.onend = async () => {
      if (isStoppingRef.current) return
      clearNoSpeechTimeout()
      await stopMeter()
      if (!hasSubmittedVoiceFinalRef.current) {
        updateMachineState({ type: 'MIC_STOP', hasText })
      }
    }

    recognitionRef.current = recognition

    return () => {
      clearNoSpeechTimeout()
      recognitionRef.current?.abort()
      recognitionRef.current = null
      stopMeter()
    }
  }, [
    autoSubmitOnVoiceFinal,
    clearNoSpeechTimeout,
    emitVoiceError,
    enableVoice,
    hasText,
    noSpeechTimeoutMs,
    onNoSpeechTimeout,
    onVoiceFinal,
    onVoiceInterim,
    stopListening,
    stopMeter,
    submitPayload,
    updateMachineState,
    updateValue,
    voiceLanguage,
  ])

  const focusField = useCallback((cursor?: AgentInputFocusOptions['cursor']) => {
    const input = inputRef.current
    if (!input) return
    input.focus()
    if (!cursor) return

    const placeCursor = () => {
      if (cursor === 'all') {
        input.select()
        return
      }
      const position = cursor === 'start' ? 0 : input.value.length
      input.setSelectionRange(position, position)
    }
    placeCursor()
    // Again after the render a prefill in the same handler triggers, so 'end' lands after the new text
    window.setTimeout(placeCursor, 0)
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      focus: (options) => focusField(options?.cursor),
      clear: () => {
        setInterimTranscript('')
        updateValue('')
      },
    }),
    [focusField, updateValue]
  )

  // The region above the field (decision 0046). The last review and suggestions shown are kept, so
  // they can fade out after the product removes them.
  const [shownReview, setShownReview] = useState(review)
  const [lastReviewAction, setLastReviewAction] = useState<'discarded' | 'undone' | null>(null)
  if (review && review !== shownReview) {
    setShownReview(review)
    // A new proposal or change replaces what the last Discard or Undo announced
    if (lastReviewAction) setLastReviewAction(null)
  }

  const cappedSuggestions = useMemo(() => (suggestions ?? []).slice(0, MAX_SUGGESTIONS), [suggestions])
  const showSuggestions = cappedSuggestions.length > 0 && !hasText && review?.state !== 'proposal'
  const [shownSuggestions, setShownSuggestions] = useState(cappedSuggestions)
  if (showSuggestions && cappedSuggestions !== shownSuggestions) {
    setShownSuggestions(cappedSuggestions)
  }

  const suggestionCount = suggestions?.length ?? 0
  useEffect(() => {
    if (!isProduction && suggestionCount > MAX_SUGGESTIONS) {
      console.warn(
        `AgentInput shows at most ${MAX_SUGGESTIONS} suggestions (decision 0046); ${suggestionCount} were passed, so the rest are hidden.`
      )
    }
  }, [suggestionCount])

  const reviewAnnouncement = review
    ? review.state === 'proposal'
      ? `${review.summary}. Accept or discard.`
      : 'Changes applied. Undo available.'
    : lastReviewAction === 'discarded'
      ? 'Suggestion discarded.'
      : lastReviewAction === 'undone'
        ? 'Changes undone.'
        : ''

  const onReviewDiscard = (onDiscard: () => void) => {
    setLastReviewAction('discarded')
    onDiscard()
    // The bar is leaving, so focus goes to the field rather than being lost
    focusField()
  }

  const onReviewUndo = (onUndo: () => void) => {
    setLastReviewAction('undone')
    onUndo()
    focusField()
  }

  const onPickSuggestion = (text: string) => {
    updateValue(text)
    onSuggestionSelect?.(text)
    // Fills, never sends: the user reviews the text in the field first
    focusField('end')
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setPrefersReducedMotion(mediaQuery.matches)
    sync()
    mediaQuery.addEventListener('change', sync)
    return () => mediaQuery.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (effectiveState === 'error' && !internalErrorMessage && !errorMessage) {
      updateMachineState({ type: 'RESET_ERROR', hasText })
    }
  }, [effectiveState, errorMessage, hasText, internalErrorMessage, updateMachineState])

  useEffect(() => {
    if (!disabled && (machineState === 'idle' || machineState === 'typing')) {
      updateMachineState({ type: 'INPUT_CHANGE', hasText })
    }
  }, [disabled, hasText, machineState, updateMachineState])

  const displayedValue = useMemo(() => {
    if (!interimTranscript) {
      return currentValue
    }

    return normalizeMessage([currentValue, interimTranscript].filter(Boolean).join(' '))
  }, [currentValue, interimTranscript])

  const lastFieldWidthRef = useRef(0)

  const resizeField = useCallback(() => {
    const field = inputRef.current
    // Hidden (for example in a closed sheet): measure when it's shown, via the observer below
    if (!field || field.clientWidth === 0) return
    lastFieldWidthRef.current = field.clientWidth
    // Collapsing the field to measure it shrinks the page for a moment; some engines clamp a page
    // scrolled to the bottom when that happens, so restore its scroll position
    const { scrollX, scrollY } = window
    field.style.height = 'auto'
    field.style.height = `${field.scrollHeight}px`
    if (window.scrollY !== scrollY) window.scrollTo(scrollX, scrollY)
    // Scroll only once max-height (six rows) clips the content
    field.style.overflowY = field.scrollHeight > field.clientHeight ? 'auto' : 'hidden'
  }, [])

  useIsomorphicLayoutEffect(() => {
    resizeField()
  }, [displayedValue, resizeField])

  // Text rewraps when the field's width changes (layout, or being shown), not only the window's
  useEffect(() => {
    const field = inputRef.current
    if (!field || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      // Its own height changes trigger this too; only a width change can rewrap the text
      if (field.clientWidth !== lastFieldWidthRef.current) resizeField()
    })
    observer.observe(field)
    return () => observer.disconnect()
  }, [resizeField])

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(event.target.value)
    if (effectiveState === 'error') {
      setInternalErrorMessage(undefined)
      updateMachineState({ type: 'RESET_ERROR', hasText: normalizeTranscript(event.target.value).length > 0 })
    }
  }

  const onInputKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const isComposing = event.nativeEvent.isComposing || event.keyCode === 229

    // Escape during an IME composition cancels the composition, not the request
    if (event.key === 'Escape' && onStop && effectiveSubmitting && !isComposing) {
      event.preventDefault()
      onStop()
      return
    }

    if (event.key === 'Escape' && isListening) {
      event.preventDefault()
      await stopListening(true)
      return
    }

    // Shift+Enter adds a line. Enter also confirms an IME composition (Japanese, Chinese, Korean);
    // only submit once it ends
    if (event.key === 'Enter' && !event.shiftKey && !isComposing) {
      event.preventDefault()
      await submitPayload(currentValue, 'text')
    }
  }

  const onMicToggle = async () => {
    if (!hasVoice) return

    if (isListening) {
      await stopListening(true)
      return
    }

    await beginListening()
  }

  const statusByState: Record<AgentInputMachineState, string> = {
    idle: statusMessage || helperText,
    typing: statusMessage || helperText,
    listening: statusMessage || DEFAULT_LISTENING_MESSAGE,
    processingFinalTranscript: statusMessage || DEFAULT_PROCESSING_MESSAGE,
    submitting: statusMessage || 'Submitting…',
    error: errorMessage || internalErrorMessage || 'Voice input failed. Try again.',
    disabled: statusMessage || helperText,
  }

  const overLimitMessage =
    isOverLimit && maxLength !== undefined
      ? `Over the ${maxLength}-character limit. Shorten your message to send.`
      : undefined

  // A product-set error shows in any state. Unsupported voice hides the mic without a message.
  const resolvedStatus = errorMessage || overLimitMessage || statusByState[effectiveState]
  const isStatusError = Boolean(errorMessage) || isOverLimit || effectiveState === 'error'
  const meterBars = createMeterBars(meterLevel)
  const showStop = Boolean(onStop) && effectiveSubmitting
  const sendDisabled = disabled || effectiveSubmitting || isOverLimit || messageLength === 0
  const showCounter = maxLength !== undefined && messageLength >= maxLength * COUNTER_THRESHOLD
  // Announced once when the limit is reached; going over is announced by the status line
  const limitAnnouncement =
    maxLength !== undefined && messageLength === maxLength ? `Character limit reached: ${maxLength} characters` : ''

  return (
    <Container data-testid={dataTestId}>
      <VisuallyHiddenLabel htmlFor={inputId}>
        {label}
      </VisuallyHiddenLabel>
      <ControlsRow>
        <RegionPart show={Boolean(review)} reducedExit={prefersReducedMotion}>
          {shownReview && (
            <ReviewBar data-testid="agent-input-review">
              <Typography variant="small" color="default">
                {shownReview.state === 'proposal' ? shownReview.summary : 'Changes applied'}
              </Typography>
              {/* Accept, then Undo, render as the same first button, so focus stays on it after Accept */}
              <ReviewActions>
                {shownReview.state === 'proposal' ? (
                  <>
                    <Button variant="primary" size="small" onClick={shownReview.onAccept}>
                      Accept
                    </Button>
                    <Button variant="secondary" size="small" onClick={() => onReviewDiscard(shownReview.onDiscard)}>
                      Discard
                    </Button>
                  </>
                ) : (
                  <Button variant="naked" size="small" onClick={() => onReviewUndo(shownReview.onUndo)}>
                    Undo
                  </Button>
                )}
              </ReviewActions>
            </ReviewBar>
          )}
        </RegionPart>

        <RegionPart show={showSuggestions} reducedExit={prefersReducedMotion}>
          <SuggestionList aria-label="Suggestions" data-testid="agent-input-suggestions">
            {shownSuggestions.map((suggestion) => (
              <li key={suggestion}>
                <SuggestionChip onClick={() => onPickSuggestion(suggestion)}>{suggestion}</SuggestionChip>
              </li>
            ))}
          </SuggestionList>
        </RegionPart>

        <VisuallyHidden aria-live="polite" aria-atomic="true" data-testid="agent-input-review-announcement">
          {reviewAnnouncement}
        </VisuallyHidden>

        <InputWrapper>
          <InputShell data-disabled={disabled}>
            <Input
              ref={inputRef}
              id={inputId}
              rows={1}
              enterKeyHint="send"
              aria-label={label}
              value={displayedValue}
              onChange={onTextChange}
              onKeyDown={onInputKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={isListening}
              aria-describedby={showCounter ? `${statusId} ${counterId}` : statusId}
              aria-invalid={isOverLimit || undefined}
            />

            <InputActions>
              {hasVoice && (
                <MicButtonWrapper $isListening={isListening} $reducedMotion={prefersReducedMotion}>
                  {isListening && (
                    <MicListeningRing
                      $reducedMotion={prefersReducedMotion}
                      aria-hidden="true"
                      data-testid="agent-input-listening-ring"
                      data-animated={prefersReducedMotion ? 'false' : 'true'}
                    />
                  )}
                  <CircularActionIconButton
                    variant="naked"
                    size="medium"
                    iconName={'mic'}
                    onClick={onMicToggle}
                    aria-pressed={isListening}
                    aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                    disabled={disabled || effectiveSubmitting}
                    type="button"
                  />
                </MicButtonWrapper>
              )}

              {showStop ? (
                <CircularActionIconButton
                  variant="secondary"
                  size="medium"
                  iconName="stop"
                  onClick={() => onStop?.()}
                  disabled={disabled}
                  aria-label="Stop"
                  type="button"
                />
              ) : (
                <CircularActionIconButton
                  variant="secondary"
                  size="medium"
                  iconName="directionUp"
                  onClick={() => submitPayload(currentValue, 'text')}
                  disabled={sendDisabled}
                  aria-label="Send message"
                  type="button"
                />
              )}
            </InputActions>
          </InputShell>
        </InputWrapper>
      </ControlsRow>

      <StatusRow>
        <StatusText $isError={isStatusError}>
          <StatusAnnouncement id={statusId} role="status" aria-live="polite" aria-atomic="true">
            {resolvedStatus && (
              <Typography variant="small" color={isStatusError ? 'error' : 'subdued'}>
                {resolvedStatus}
              </Typography>
            )}
          </StatusAnnouncement>
        </StatusText>

        <StatusEnd>
          {isListening && !prefersReducedMotion && (
            <MeterContainer aria-hidden="true">
              {meterBars.map((barHeight, index) => (
                <MeterBar key={`meter-${index}`} $height={barHeight} />
              ))}
            </MeterContainer>
          )}

          {showCounter && (
            <Typography variant="small" color={isOverLimit ? 'error' : 'subdued'}>
              <span id={counterId} data-testid="agent-input-counter">
                {messageLength}/{maxLength}
                <VisuallyHidden> characters</VisuallyHidden>
              </span>
            </Typography>
          )}
        </StatusEnd>

        {maxLength !== undefined && (
          <VisuallyHidden role="status" aria-live="polite" aria-atomic="true" data-testid="agent-input-limit-announcement">
            {limitAnnouncement}
          </VisuallyHidden>
        )}
      </StatusRow>
    </Container>
  )
}

export const AgentInput = forwardRef(AgentInputWithRef)

AgentInput.displayName = 'AgentInput'
