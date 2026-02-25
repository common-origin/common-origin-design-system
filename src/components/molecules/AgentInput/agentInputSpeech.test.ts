import {
  defaultVoiceErrorMessage,
  detectSpeechRecognitionConstructor,
  mapSpeechErrorCode,
  normalizeTranscript,
} from './agentInputSpeech'

describe('agentInputSpeech', () => {
  describe('detectSpeechRecognitionConstructor', () => {
    it('prefers SpeechRecognition over webkitSpeechRecognition', () => {
      const standardConstructor = jest.fn()
      const webkitConstructor = jest.fn()

      const constructor = detectSpeechRecognitionConstructor({
        SpeechRecognition: standardConstructor,
        webkitSpeechRecognition: webkitConstructor,
      } as any)

      expect(constructor).toBe(standardConstructor)
    })

    it('falls back to webkitSpeechRecognition when SpeechRecognition is unavailable', () => {
      const webkitConstructor = jest.fn()

      const constructor = detectSpeechRecognitionConstructor({
        webkitSpeechRecognition: webkitConstructor,
      } as any)

      expect(constructor).toBe(webkitConstructor)
    })

    it('returns null when neither constructor exists', () => {
      const constructor = detectSpeechRecognitionConstructor({} as any)
      expect(constructor).toBeNull()
    })
  })

  describe('normalizeTranscript', () => {
    it('normalizes whitespace and trims transcript', () => {
      expect(normalizeTranscript('  send   one hundred   dollars  ')).toBe('send one hundred dollars')
    })
  })

  describe('mapSpeechErrorCode', () => {
    it.each([
      ['not-allowed', 'not-allowed'],
      ['service-not-allowed', 'not-allowed'],
      ['no-speech', 'no-speech'],
      ['audio-capture', 'audio-capture'],
      ['aborted', 'aborted'],
      ['network', 'unknown'],
      [undefined, 'unknown'],
    ])('maps %s to %s', (input, expected) => {
      expect(mapSpeechErrorCode(input as any)).toBe(expected)
    })
  })

  describe('defaultVoiceErrorMessage', () => {
    it('returns actionable message for not-allowed', () => {
      expect(defaultVoiceErrorMessage('not-allowed')).toContain('permission denied')
    })

    it('returns fallback message for unknown errors', () => {
      expect(defaultVoiceErrorMessage('unknown')).toBe('Voice input failed. Try again.')
    })
  })
})
