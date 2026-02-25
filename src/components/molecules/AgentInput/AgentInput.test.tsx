import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import { AgentInput, AgentInputProps } from './AgentInput'

type MockSpeechResult = {
  transcript: string
  isFinal: boolean
}

class MockSpeechRecognition {
  static instance: MockSpeechRecognition | null = null

  lang = 'en-AU'
  interimResults = true
  continuous = false
  onresult: ((event: any) => void) | null = null
  onerror: ((event: any) => void) | null = null
  onend: (() => void) | null = null
  start = jest.fn()
  stop = jest.fn(() => {
    this.onend?.()
  })
  abort = jest.fn()

  constructor() {
    MockSpeechRecognition.instance = this
  }

  emitResult(results: MockSpeechResult[]) {
    const mappedResults = results.map((result) => ({
      isFinal: result.isFinal,
      length: 1,
      0: { transcript: result.transcript, confidence: 0.92 },
    }))

    const resultList: Record<number | 'length', any> = {
      length: mappedResults.length,
    }

    mappedResults.forEach((result, index) => {
      resultList[index] = result
    })

    this.onresult?.({
      resultIndex: 0,
      results: resultList,
    })
  }

  emitError(error: string) {
    this.onerror?.({ error })
  }
}

const createMockAudioContext = () => {
  const analyser = {
    fftSize: 256,
    frequencyBinCount: 32,
    getByteTimeDomainData: jest.fn((array: Uint8Array) => {
      for (let index = 0; index < array.length; index += 1) {
        array[index] = 128
      }
    }),
  }

  return {
    createAnalyser: jest.fn(() => analyser),
    createMediaStreamSource: jest.fn(() => ({ connect: jest.fn() })),
    close: jest.fn().mockResolvedValue(undefined),
  }
}

describe('AgentInput', () => {
  const defaultProps: AgentInputProps = {
    onSubmit: jest.fn().mockResolvedValue(undefined),
  }

  const renderComponent = (props: Partial<AgentInputProps> = {}) => {
    return render(<AgentInput {...defaultProps} {...props} />)
  }

  beforeEach(() => {
    jest.clearAllMocks()

    ;(window as any).SpeechRecognition = MockSpeechRecognition
    ;(window as any).webkitSpeechRecognition = undefined

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    ;(global as any).AudioContext = jest.fn(() => createMockAudioContext())

    ;(navigator as any).mediaDevices = {
      getUserMedia: jest.fn().mockResolvedValue({
        getTracks: () => [{ stop: jest.fn() }],
      }),
    }

    window.requestAnimationFrame = jest.fn((callback) => setTimeout(callback, 16) as any)
    window.cancelAnimationFrame = jest.fn()
  })

  afterEach(() => {
    jest.useRealTimers()
    delete (window as any).SpeechRecognition
    delete (window as any).webkitSpeechRecognition
  })

  describe('Typing and Submit', () => {
    it('submits text on Enter with source text', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit })

      const input = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.change(input, { target: { value: 'Transfer 100 dollars' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            text: 'Transfer 100 dollars',
            source: 'text',
          })
        )
      })
    })

    it('submits text on Send button click with source text', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit })

      const input = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.change(input, { target: { value: 'What did I spend today?' } })

      fireEvent.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            text: 'What did I spend today?',
            source: 'text',
          })
        )
      })
    })
  })

  describe('Voice Input', () => {
    it('enters listening state and exposes pressed semantics on mic start', async () => {
      renderComponent()

      const voiceButton = screen.getByRole('button', { name: /start voice input/i })
      fireEvent.click(voiceButton)

      await waitFor(() => {
        expect(screen.getByText(/listening… speak now/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /stop voice input/i })).toHaveAttribute('aria-pressed', 'true')
      })
    })

    it('shows interim transcript while listening', async () => {
      renderComponent()

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      await waitFor(() => {
        expect(MockSpeechRecognition.instance).toBeTruthy()
      })

      act(() => {
        MockSpeechRecognition.instance?.emitResult([{ transcript: 'send one hundred dollars', isFinal: false }])
      })

      await waitFor(() => {
        expect(screen.getByDisplayValue('send one hundred dollars')).toBeInTheDocument()
      })
    })

    it('auto-submits final transcript with source voice-final', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit })

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      await waitFor(() => {
        expect(MockSpeechRecognition.instance).toBeTruthy()
      })

      act(() => {
        MockSpeechRecognition.instance?.emitResult([{ transcript: 'send 100 dollars to savings', isFinal: true }])
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            text: 'send 100 dollars to savings',
            source: 'voice-final',
          })
        )
      })
    })

    it('manual stop exits listening cleanly', async () => {
      const onVoiceStop = jest.fn()
      renderComponent({ onVoiceStop })

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))
      fireEvent.click(await screen.findByRole('button', { name: /stop voice input/i }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /start voice input/i })).toHaveAttribute('aria-pressed', 'false')
        expect(onVoiceStop).toHaveBeenCalled()
      })
    })

    it('supports Escape to stop listening', async () => {
      renderComponent()

      const input = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))
      fireEvent.keyDown(input, { key: 'Escape' })

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /start voice input/i })).toHaveAttribute('aria-pressed', 'false')
      })
    })
  })

  describe('Voice Error and Fallback', () => {
    it('hides mic control when voice is unsupported and keeps text path functional', async () => {
      delete (window as any).SpeechRecognition
      delete (window as any).webkitSpeechRecognition

      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit })

      expect(screen.queryByRole('button', { name: /voice input/i })).not.toBeInTheDocument()
      expect(screen.getByText(/voice input is not supported/i)).toBeInTheDocument()

      const input = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.change(input, { target: { value: 'Show my recent transfers' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            text: 'Show my recent transfers',
            source: 'text',
          })
        )
      })
    })

    it('maps permission denial to actionable guidance', async () => {
      renderComponent()

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      await waitFor(() => {
        expect(MockSpeechRecognition.instance).toBeTruthy()
      })

      act(() => {
        MockSpeechRecognition.instance?.emitError('not-allowed')
      })

      await waitFor(() => {
        expect(screen.getByText(/microphone permission denied/i)).toBeInTheDocument()
      })
    })

    it('shows no-speech guidance after configured timeout', async () => {
      jest.useFakeTimers()

      ;(window.matchMedia as jest.Mock).mockImplementation(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      renderComponent({ noSpeechTimeoutMs: 1000 })

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      await waitFor(() => {
        expect(screen.getByText(/listening… speak now/i)).toBeInTheDocument()
      })

      act(() => {
        jest.advanceTimersByTime(1200)
      })

      await waitFor(() => {
        expect(screen.getByText(/no speech detected/i)).toBeInTheDocument()
      })

      jest.useRealTimers()
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = renderComponent()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations in listening state', async () => {
      const { container } = renderComponent()

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
