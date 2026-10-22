import { createRef, useState } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import { AgentInput, AgentInputHandle, AgentInputProps } from './AgentInput'

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

    it('does not submit on Enter while an IME composition is active', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit })

      const input = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.change(input, { target: { value: 'にほんご' } })
      fireEvent.keyDown(input, { key: 'Enter', isComposing: true })
      fireEvent.keyDown(input, { key: 'Enter', keyCode: 229 })

      await act(async () => {})
      expect(onSubmit).not.toHaveBeenCalled()
      expect(input).toHaveValue('にほんご')
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

  describe('While submitting', () => {
    const deferred = () => {
      let resolve!: () => void
      let reject!: (error: Error) => void
      const promise = new Promise<void>((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }

    it('keeps the field editable and focused, and only disables Send', async () => {
      const pending = deferred()
      const onSubmit = jest.fn(() => pending.promise)
      renderComponent({ onSubmit })

      const input = screen.getByRole('textbox', { name: /agent input/i })
      input.focus()
      fireEvent.change(input, { target: { value: 'Swap Tuesday' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      await waitFor(() => expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled())
      expect(input).toBeEnabled()
      expect(input).toHaveFocus()

      fireEvent.change(input, { target: { value: 'Swap Tuesday, and drop Wednesday' } })
      expect(input).toHaveValue('Swap Tuesday, and drop Wednesday')

      fireEvent.keyDown(input, { key: 'Enter' })
      expect(onSubmit).toHaveBeenCalledTimes(1)

      await act(async () => pending.resolve())
    })

    it('keeps a follow-up typed while submitting when onSubmit resolves', async () => {
      const pending = deferred()
      renderComponent({ onSubmit: jest.fn(() => pending.promise) })

      const input = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.change(input, { target: { value: 'Swap Tuesday' } })
      fireEvent.keyDown(input, { key: 'Enter' })
      fireEvent.change(input, { target: { value: 'Drop Wednesday' } })

      await act(async () => pending.resolve())

      expect(input).toHaveValue('Drop Wednesday')
    })

    it('clears unchanged text when onSubmit resolves and keeps it when it rejects', async () => {
      const onSubmit = jest.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('failed'))
      renderComponent({ onSubmit })

      const input = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.change(input, { target: { value: 'Swap Tuesday' } })
      fireEvent.keyDown(input, { key: 'Enter' })
      await waitFor(() => expect(input).toHaveValue(''))

      fireEvent.change(input, { target: { value: 'Drop Wednesday' } })
      fireEvent.keyDown(input, { key: 'Enter' })
      await screen.findByText(/submission failed/i)
      expect(input).toHaveValue('Drop Wednesday')
    })

    it('turns Send into Stop when onStop is set, and Stop or Escape calls it', () => {
      const onStop = jest.fn()
      renderComponent({ onStop, isSubmitting: true, defaultValue: 'Swap Tuesday' })

      expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument()
      const stop = screen.getByRole('button', { name: 'Stop' })
      expect(stop).toBeEnabled()

      fireEvent.click(stop)
      fireEvent.keyDown(screen.getByRole('textbox', { name: /agent input/i }), { key: 'Escape' })

      expect(onStop).toHaveBeenCalledTimes(2)
    })

    it('calls onStop with no arguments, and ignores Escape during an IME composition', () => {
      const onStop = jest.fn()
      renderComponent({ onStop, isSubmitting: true })
      const input = screen.getByRole('textbox', { name: /agent input/i })

      fireEvent.keyDown(input, { key: 'Escape', isComposing: true })
      fireEvent.keyDown(input, { key: 'Escape', keyCode: 229 })
      expect(onStop).not.toHaveBeenCalled()

      fireEvent.click(screen.getByRole('button', { name: 'Stop' }))
      expect(onStop).toHaveBeenCalledWith()
    })

    it('keeps a disabled Send without onStop', () => {
      renderComponent({ isSubmitting: true, defaultValue: 'Swap Tuesday' })

      expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled()
      expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument()
    })

    it('has no accessibility violations while submitting with Stop', async () => {
      const { container } = renderComponent({ onStop: jest.fn(), isSubmitting: true, defaultValue: 'Swap Tuesday' })
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('Imperative handle', () => {
    it('focuses with the caret after prefilled text', async () => {
      const ref = createRef<AgentInputHandle>()
      const Prefill = () => {
        const [value, setValue] = useState('')
        return (
          <>
            <button
              type="button"
              onClick={() => {
                setValue('Friday: ')
                ref.current?.focus({ cursor: 'end' })
              }}
            >
              Change
            </button>
            <AgentInput ref={ref} value={value} onChange={setValue} onSubmit={jest.fn()} />
          </>
        )
      }
      render(<Prefill />)

      fireEvent.click(screen.getByRole('button', { name: 'Change' }))
      const input = screen.getByRole('textbox', { name: /agent input/i }) as HTMLInputElement

      expect(input).toHaveFocus()
      await waitFor(() => {
        expect(input.value).toBe('Friday: ')
        expect(input.selectionStart).toBe(8)
        expect(input.selectionEnd).toBe(8)
      })
    })

    it('places the caret at the start or selects all', () => {
      const ref = createRef<AgentInputHandle>()
      render(<AgentInput ref={ref} defaultValue="Friday: pasta" onSubmit={jest.fn()} />)
      const input = screen.getByRole('textbox', { name: /agent input/i }) as HTMLInputElement

      act(() => ref.current?.focus({ cursor: 'start' }))
      expect(input).toHaveFocus()
      expect([input.selectionStart, input.selectionEnd]).toEqual([0, 0])

      act(() => ref.current?.focus({ cursor: 'all' }))
      expect([input.selectionStart, input.selectionEnd]).toEqual([0, 13])
    })

    it('clears in uncontrolled and controlled modes', () => {
      const ref = createRef<AgentInputHandle>()
      const { rerender } = render(<AgentInput ref={ref} defaultValue="Friday: pasta" onSubmit={jest.fn()} />)
      act(() => ref.current?.clear())
      expect(screen.getByRole('textbox', { name: /agent input/i })).toHaveValue('')

      const onChange = jest.fn()
      rerender(<AgentInput key="controlled" ref={ref} value="Friday: pasta" onChange={onChange} onSubmit={jest.fn()} />)
      act(() => ref.current?.clear())
      expect(onChange).toHaveBeenCalledWith('')
    })
  })

  describe('Status line', () => {
    it('has no default copy when neither helperText nor statusMessage is set', () => {
      renderComponent()

      expect(screen.getByRole('status')).toHaveTextContent('')
      expect(screen.queryByText(/transactions/i)).not.toBeInTheDocument()
    })

    it('shows helperText while idle and typing', () => {
      renderComponent({ helperText: 'Tell me what to change' })

      expect(screen.getByRole('status')).toHaveTextContent('Tell me what to change')

      fireEvent.change(screen.getByRole('textbox', { name: /agent input/i }), { target: { value: 'Swap Tuesday' } })

      expect(screen.getByRole('status')).toHaveTextContent('Tell me what to change')
    })

    it('lets statusMessage override helperText', () => {
      renderComponent({ helperText: 'Tell me what to change', statusMessage: 'Moved Tuesday to Wednesday' })

      expect(screen.getByRole('status')).toHaveTextContent('Moved Tuesday to Wednesday')
    })

    it('shows a product-set errorMessage on an idle input, announced in the live region', () => {
      renderComponent({ helperText: 'Tell me what to change', errorMessage: "Couldn't update the plan. Try again." })

      const status = screen.getByRole('status')
      expect(status).toHaveAttribute('aria-live', 'polite')
      expect(status).toHaveTextContent("Couldn't update the plan. Try again.")
      expect(screen.queryByText('Tell me what to change')).not.toBeInTheDocument()
    })

    it('styles a product-set errorMessage the same as an internal error', async () => {
      const onSubmit = jest.fn().mockRejectedValue(new Error('failed'))
      const { rerender } = renderComponent({ onSubmit })

      const input = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.change(input, { target: { value: 'Swap Tuesday' } })
      fireEvent.keyDown(input, { key: 'Enter' })
      const internalError = await screen.findByText(/submission failed/i)
      const internalClass = internalError.className

      rerender(<AgentInput onSubmit={onSubmit} errorMessage="Couldn't update the plan." />)

      expect(screen.getByText("Couldn't update the plan.").className).toBe(internalClass)
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
        expect(screen.getByTestId('agent-input-listening-ring')).toBeInTheDocument()
      })
    })

    it('removes listening ring immediately on manual stop', async () => {
      renderComponent()

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      await waitFor(() => {
        expect(screen.getByTestId('agent-input-listening-ring')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByRole('button', { name: /stop voice input/i }))

      await waitFor(() => {
        expect(screen.queryByTestId('agent-input-listening-ring')).not.toBeInTheDocument()
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
        expect(screen.queryByTestId('agent-input-listening-ring')).not.toBeInTheDocument()
      })
    })

    it('stores final transcript without auto-submit when autoSubmitOnVoiceFinal is false', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit, autoSubmitOnVoiceFinal: false })

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      await waitFor(() => {
        expect(MockSpeechRecognition.instance).toBeTruthy()
      })

      act(() => {
        MockSpeechRecognition.instance?.emitResult([{ transcript: 'review this transfer request', isFinal: true }])
      })

      await waitFor(() => {
        expect(onSubmit).not.toHaveBeenCalled()
        expect(screen.getByDisplayValue('review this transfer request')).toBeInTheDocument()
        expect(screen.queryByText(/finishing voice input/i)).not.toBeInTheDocument()
      })
    })

    it('allows manual submit after final transcript is stored when autoSubmitOnVoiceFinal is false', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit, autoSubmitOnVoiceFinal: false })

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      await waitFor(() => {
        expect(MockSpeechRecognition.instance).toBeTruthy()
      })

      act(() => {
        MockSpeechRecognition.instance?.emitResult([{ transcript: 'queue transfer for review', isFinal: true }])
      })

      await waitFor(() => {
        expect(screen.getByDisplayValue('queue transfer for review')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            text: 'queue transfer for review',
            source: 'text',
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
      expect(screen.queryByText(/not supported/i)).not.toBeInTheDocument()
      expect(screen.getByRole('status')).toHaveTextContent('')

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
        expect(screen.queryByTestId('agent-input-listening-ring')).not.toBeInTheDocument()
      })
    })

    it('uses a static listening ring when reduced motion is enabled', async () => {
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

      renderComponent()

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))

      await waitFor(() => {
        expect(screen.getByTestId('agent-input-listening-ring')).toHaveAttribute('data-animated', 'false')
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
