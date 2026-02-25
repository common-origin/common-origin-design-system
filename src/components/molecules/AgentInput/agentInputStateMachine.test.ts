import { agentInputStateTransition } from './agentInputStateMachine'

describe('agentInputStateTransition', () => {
  it('transitions idle to listening on MIC_START', () => {
    expect(agentInputStateTransition('idle', { type: 'MIC_START' })).toBe('listening')
  })

  it('keeps listening on VOICE_INTERIM', () => {
    expect(agentInputStateTransition('listening', { type: 'VOICE_INTERIM' })).toBe('listening')
  })

  it('transitions listening to processingFinalTranscript on VOICE_FINAL', () => {
    expect(agentInputStateTransition('listening', { type: 'VOICE_FINAL' })).toBe('processingFinalTranscript')
  })

  it('returns to typing from listening on MIC_STOP when text exists', () => {
    expect(agentInputStateTransition('listening', { type: 'MIC_STOP', hasText: true })).toBe('typing')
  })

  it('returns to idle from listening on MIC_STOP when text is empty', () => {
    expect(agentInputStateTransition('listening', { type: 'MIC_STOP', hasText: false })).toBe('idle')
  })

  it('transitions to submitting on SUBMIT', () => {
    expect(agentInputStateTransition('typing', { type: 'SUBMIT' })).toBe('submitting')
  })

  it('transitions submitting to idle on SUBMIT_SUCCESS', () => {
    expect(agentInputStateTransition('submitting', { type: 'SUBMIT_SUCCESS' })).toBe('idle')
  })

  it('transitions submitting to error on SUBMIT_ERROR', () => {
    expect(agentInputStateTransition('submitting', { type: 'SUBMIT_ERROR' })).toBe('error')
  })

  it('transitions to error from any state on VOICE_ERROR', () => {
    expect(agentInputStateTransition('idle', { type: 'VOICE_ERROR' })).toBe('error')
    expect(agentInputStateTransition('typing', { type: 'VOICE_ERROR' })).toBe('error')
    expect(agentInputStateTransition('listening', { type: 'VOICE_ERROR' })).toBe('error')
  })

  it('resets error to text-driven state on RESET_ERROR', () => {
    expect(agentInputStateTransition('error', { type: 'RESET_ERROR', hasText: false })).toBe('idle')
    expect(agentInputStateTransition('error', { type: 'RESET_ERROR', hasText: true })).toBe('typing')
  })
})
