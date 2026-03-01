export type AgentInputMachineState =
  | 'idle'
  | 'typing'
  | 'listening'
  | 'processingFinalTranscript'
  | 'submitting'
  | 'error'
  | 'disabled'

export type AgentInputMachineEvent =
  | { type: 'INPUT_CHANGE'; hasText: boolean }
  | { type: 'MIC_START' }
  | { type: 'MIC_STOP'; hasText: boolean }
  | { type: 'VOICE_INTERIM' }
  | { type: 'VOICE_FINAL' }
  | { type: 'VOICE_ERROR' }
  | { type: 'TIMEOUT_NO_SPEECH' }
  | { type: 'SUBMIT' }
  | { type: 'SUBMIT_SUCCESS'; hasText?: boolean }
  | { type: 'SUBMIT_ERROR' }
  | { type: 'RESET_ERROR'; hasText: boolean }

const textDrivenState = (hasText: boolean): AgentInputMachineState => (hasText ? 'typing' : 'idle')

export function agentInputStateTransition(
  currentState: AgentInputMachineState,
  event: AgentInputMachineEvent
): AgentInputMachineState {
  if (currentState === 'disabled') {
    return 'disabled'
  }

  switch (event.type) {
    case 'INPUT_CHANGE':
      if (currentState === 'listening' || currentState === 'processingFinalTranscript' || currentState === 'submitting') {
        return currentState
      }
      return textDrivenState(event.hasText)

    case 'MIC_START':
      if (currentState === 'idle' || currentState === 'typing') {
        return 'listening'
      }
      return currentState

    case 'VOICE_INTERIM':
      if (currentState === 'listening') {
        return 'listening'
      }
      return currentState

    case 'VOICE_FINAL':
      if (currentState === 'listening') {
        return 'processingFinalTranscript'
      }
      return currentState

    case 'MIC_STOP':
      if (currentState === 'listening' || currentState === 'processingFinalTranscript') {
        return textDrivenState(event.hasText)
      }
      return currentState

    case 'SUBMIT':
      return 'submitting'

    case 'SUBMIT_SUCCESS':
      return 'idle'

    case 'SUBMIT_ERROR':
      return 'error'

    case 'VOICE_ERROR':
    case 'TIMEOUT_NO_SPEECH':
      return 'error'

    case 'RESET_ERROR':
      if (currentState === 'error') {
        return textDrivenState(event.hasText)
      }
      return currentState

    default:
      return currentState
  }
}
