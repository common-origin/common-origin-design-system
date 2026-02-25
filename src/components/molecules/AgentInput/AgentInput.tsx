import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
} from 'react'
import styled, { css, keyframes } from 'styled-components'
import { IconButton } from '../../atoms/IconButton'
import { Typography } from '../../atoms/Typography'
import tokens from '@/styles/tokens.json'
import {
  AgentInputSubmitSource,
  AgentInputVoiceError,
  AgentInputVoiceErrorCode,
  SpeechRecognitionLike,
  defaultVoiceErrorMessage,
  detectSpeechRecognitionConstructor,
  mapSpeechErrorCode,
  normalizeTranscript,
} from './agentInputSpeech'
import { AgentInputMachineState, agentInputStateTransition } from './agentInputStateMachine'

const { semantic, base, component } = tokens

const DEFAULT_IDLE_HELPER = 'Ask about transactions, spending, or transfers'
const DEFAULT_LISTENING_MESSAGE = 'Listening… speak now'
const DEFAULT_PROCESSING_MESSAGE = 'Finishing voice input…'

interface SubmitPayload {
  text: string
  source: AgentInputSubmitSource
  timestamp: string
}

export interface AgentInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void

  onSubmit: (payload: SubmitPayload) => void | Promise<void>

  placeholder?: string
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

  statusMessage?: string
  errorMessage?: string
  label?: string
  'data-testid'?: string
}

const pulseRing = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  70% {
    transform: scale(1.08);
    opacity: 0;
  }
  100% {
    transform: scale(1.08);
    opacity: 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${base.spacing[2]};
  width: 100%;
`

const ControlsRow = styled.div`
  width: 100%;
`

const InputShell = styled.div`
  display: flex;
  align-items: center;
  gap: ${base.spacing[2]};
  width: 100%;
  padding: ${semantic.spacing.layout.xs} ${semantic.spacing.layout.sm} ${semantic.spacing.layout.xs} ${component.input.default.paddingX};
  background-color: ${component.input.default.backgroundColor};
  border: ${component.input.default.borderWidth} solid ${component.input.default.borderColor};
  border-radius: ${semantic.border.radius['3xl']};
  box-shadow: ${semantic.elevation.raised};
  transition: border-color 200ms ease-in-out, outline 200ms ease-in-out;

  &:focus-within {
    border-color: ${component.input.focus.borderColor};
    outline: ${component.input.focus.outline};
    outline-offset: ${component.input.focus.outlineOffset};
  }

  &[data-disabled='true'] {
    background-color: ${component.input.disabled.backgroundColor};
    border-color: ${component.input.disabled.borderColor};
  }
`

const Input = styled.input`
  flex: 1;
  min-width: 0;
  min-height: ${base.spacing[12]};
  border: none;
  background: transparent;
  font: ${semantic.typography.body};
  color: ${semantic.color.text.default};
  outline: none;

  &::placeholder {
    color: ${semantic.color.text.subdued};
  }

  &:disabled {
    color: ${semantic.color.text.disabled};
    cursor: not-allowed;
  }
`

const InputActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${semantic.spacing.layout.xs};
`

const CircularActionIconButton = styled(IconButton)`
  border-radius: ${semantic.border.radius.circle};
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

  ${({ $isListening, $reducedMotion }) =>
    $isListening &&
    !$reducedMotion &&
    css`
      &::before {
        content: '';
        position: absolute;
        inset: -${base.spacing[1]};
        border: ${base.border.width[1]} solid ${semantic.color.border.interactive};
        border-radius: ${base.border.radius[4]};
        animation: ${pulseRing} 1400ms ease-out infinite;
        pointer-events: none;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${base.spacing[3]};
  min-height: ${base.spacing[6]};
`

const StatusText = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isError: boolean }>`
padding-left: ${semantic.spacing.layout.xl};
  color: ${({ $isError }) => ($isError ? semantic.color.text.error : semantic.color.text.subdued)};
`

const StatusAnnouncement = styled.div``

const MeterContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  gap: ${base.spacing[1]};
  height: ${base.spacing[4]};
`

const MeterBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $height: number }>`
  width: ${base.spacing[1]};
  border-radius: ${base.border.radius[1]};
  background-color: ${semantic.color.background.interactive};
  height: ${({ $height }) => `${$height * 100}%`};
  transition: height 120ms linear;
`

const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

export const AgentInput = ({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  placeholder = 'Ask a question',
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
  statusMessage,
  errorMessage,
  label = 'Agent input',
  'data-testid': dataTestId,
}: AgentInputProps) => {
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
  const inputId = useId()
  const statusId = `${inputId}-status`

  const currentValue = isControlled ? value ?? '' : internalValue
  const hasText = normalizeTranscript(currentValue).length > 0
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
      const text = normalizeTranscript(rawText)
      if (!text || disabled || effectiveSubmitting) {
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
        updateValue('')
      } catch {
        updateMachineState({ type: 'SUBMIT_ERROR' })
        if (source === 'voice-final') {
          updateValue(text)
        }
        setInternalErrorMessage('Submission failed. Please try again.')
      } finally {
        if (isSubmitting === undefined) {
          setInternalSubmitting(false)
        }
      }
    },
    [disabled, effectiveSubmitting, isSubmitting, onSubmit, updateMachineState, updateValue]
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

    return normalizeTranscript([currentValue, interimTranscript].filter(Boolean).join(' '))
  }, [currentValue, interimTranscript])

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateValue(event.target.value)
    if (effectiveState === 'error') {
      setInternalErrorMessage(undefined)
      updateMachineState({ type: 'RESET_ERROR', hasText: normalizeTranscript(event.target.value).length > 0 })
    }
  }

  const onInputKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && isListening) {
      event.preventDefault()
      await stopListening(true)
      return
    }

    if (event.key === 'Enter') {
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
    idle: statusMessage || DEFAULT_IDLE_HELPER,
    typing: statusMessage || DEFAULT_IDLE_HELPER,
    listening: statusMessage || DEFAULT_LISTENING_MESSAGE,
    processingFinalTranscript: statusMessage || DEFAULT_PROCESSING_MESSAGE,
    submitting: statusMessage || 'Submitting…',
    error: errorMessage || internalErrorMessage || 'Voice input failed. Try again.',
    disabled: statusMessage || DEFAULT_IDLE_HELPER,
  }

  const unsupportedMessage = defaultVoiceErrorMessage('not-supported')
  const shouldShowUnsupported = enableVoice && !hasVoice
  const resolvedStatus = shouldShowUnsupported ? unsupportedMessage : statusByState[effectiveState]
  const isStatusError = effectiveState === 'error' || shouldShowUnsupported
  const meterBars = createMeterBars(meterLevel)
  const sendDisabled = disabled || effectiveSubmitting || normalizeTranscript(currentValue).length === 0

  return (
    <Container data-testid={dataTestId}>
      <VisuallyHiddenLabel htmlFor={inputId}>
        {label}
      </VisuallyHiddenLabel>
      <ControlsRow>
        <InputWrapper>
          <InputShell data-disabled={disabled || effectiveSubmitting}>
            <Input
              id={inputId}
              type="text"
              aria-label={label}
              value={displayedValue}
              onChange={onTextChange}
              onKeyDown={onInputKeyDown}
              placeholder={placeholder}
              disabled={disabled || effectiveSubmitting}
              readOnly={isListening}
              aria-describedby={statusId}
            />

            <InputActions>
              {hasVoice && (
                <MicButtonWrapper $isListening={isListening} $reducedMotion={prefersReducedMotion}>
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

              <CircularActionIconButton
                variant="secondary"
                size="medium"
                iconName="directionUp"
                onClick={() => submitPayload(currentValue, 'text')}
                disabled={sendDisabled}
                aria-label="Send message"
                type="button"
              />
            </InputActions>
          </InputShell>
        </InputWrapper>
      </ControlsRow>

      <StatusRow>
        <StatusText $isError={isStatusError}>
          <StatusAnnouncement id={statusId} role="status" aria-live="polite" aria-atomic="true">
            <Typography variant="small">{resolvedStatus}</Typography>
          </StatusAnnouncement>
        </StatusText>

        {isListening && !prefersReducedMotion && (
          <MeterContainer aria-hidden="true">
            {meterBars.map((barHeight, index) => (
              <MeterBar key={`meter-${index}`} $height={barHeight} />
            ))}
          </MeterContainer>
        )}
      </StatusRow>
    </Container>
  )
}
