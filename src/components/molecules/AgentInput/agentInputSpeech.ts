export type AgentInputSubmitSource = 'text' | 'voice-final'

export type AgentInputVoiceErrorCode =
  | 'not-supported'
  | 'not-allowed'
  | 'no-speech'
  | 'audio-capture'
  | 'aborted'
  | 'unknown'

export interface AgentInputVoiceError {
  code: AgentInputVoiceErrorCode
  message: string
}

export interface SpeechRecognitionAlternativeLike {
  transcript: string
  confidence: number
}

export interface SpeechRecognitionResultLike {
  isFinal: boolean
  length: number
  [index: number]: SpeechRecognitionAlternativeLike
}

export interface SpeechRecognitionResultListLike {
  length: number
  [index: number]: SpeechRecognitionResultLike
}

export interface SpeechRecognitionEventLike {
  resultIndex: number
  results: SpeechRecognitionResultListLike
}

export interface SpeechRecognitionErrorEventLike {
  error?: string
  message?: string
}

export interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

export type SpeechRecognitionConstructorLike = new () => SpeechRecognitionLike

type BrowserWindowWithSpeech = Window & {
  SpeechRecognition?: SpeechRecognitionConstructorLike
  webkitSpeechRecognition?: SpeechRecognitionConstructorLike
}

export function detectSpeechRecognitionConstructor(
  targetWindow?: Window
): SpeechRecognitionConstructorLike | null {
  if (!targetWindow) return null

  const candidateWindow = targetWindow as BrowserWindowWithSpeech
  if (candidateWindow.SpeechRecognition) {
    return candidateWindow.SpeechRecognition
  }

  if (candidateWindow.webkitSpeechRecognition) {
    return candidateWindow.webkitSpeechRecognition
  }

  return null
}

export function normalizeTranscript(input: string): string {
  return input.replace(/\s+/g, ' ').trim()
}

export function mapSpeechErrorCode(error?: string): AgentInputVoiceErrorCode {
  switch (error) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'not-allowed'
    case 'no-speech':
      return 'no-speech'
    case 'audio-capture':
      return 'audio-capture'
    case 'aborted':
      return 'aborted'
    default:
      return 'unknown'
  }
}

export function defaultVoiceErrorMessage(code: AgentInputVoiceErrorCode): string {
  switch (code) {
    case 'not-supported':
      return 'Voice input is not supported in this browser. Use Chrome or Edge.'
    case 'not-allowed':
      return 'Microphone permission denied. Allow access and try again.'
    case 'no-speech':
      return 'No speech detected. Try again.'
    case 'audio-capture':
      return 'No microphone device detected. Check your microphone and try again.'
    case 'aborted':
      return 'Voice input was stopped.'
    default:
      return 'Voice input failed. Try again.'
  }
}
