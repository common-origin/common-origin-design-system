import { createRef, useState } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  describe('Review bar (decision 0046)', () => {
    const proposal = (overrides: Partial<{ onAccept: () => void; onDiscard: () => void }> = {}) => ({
      state: 'proposal' as const,
      summary: '3 changes suggested',
      onAccept: jest.fn(),
      onDiscard: jest.fn(),
      ...overrides,
    })

    it('shows the summary with Accept and Discard, before the field in Tab order', async () => {
      const user = userEvent.setup()
      renderComponent({ review: proposal() })

      expect(screen.getByText('3 changes suggested')).toBeInTheDocument()
      await user.tab()
      expect(screen.getByRole('button', { name: 'Accept' })).toHaveFocus()
      await user.tab()
      expect(screen.getByRole('button', { name: 'Discard' })).toHaveFocus()
      await user.tab()
      expect(screen.getByRole('textbox', { name: /agent input/i })).toHaveFocus()
    })

    it('announces a proposal politely without moving focus', () => {
      const { rerender } = renderComponent()
      const field = screen.getByRole('textbox', { name: /agent input/i })
      field.focus()

      rerender(<AgentInput onSubmit={jest.fn()} review={proposal()} />)

      expect(field).toHaveFocus()
      const announcer = screen.getByTestId('agent-input-review-announcement')
      expect(announcer).toHaveAttribute('aria-live', 'polite')
      expect(announcer).toHaveTextContent('3 changes suggested. Accept or discard.')
    })

    it('calls onAccept, then keeps focus on the same button as it becomes Undo', async () => {
      const user = userEvent.setup()
      const onAccept = jest.fn()
      const onUndo = jest.fn()
      const { rerender } = renderComponent({ review: proposal({ onAccept }) })

      await user.click(screen.getByRole('button', { name: 'Accept' }))
      expect(onAccept).toHaveBeenCalledTimes(1)

      rerender(<AgentInput onSubmit={jest.fn()} review={{ state: 'applied', onUndo }} />)

      expect(screen.getByText('Changes applied')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Undo' })).toHaveFocus()
      expect(screen.queryByRole('button', { name: 'Accept' })).not.toBeInTheDocument()
      expect(screen.getByTestId('agent-input-review-announcement')).toHaveTextContent('Changes applied. Undo available.')
    })

    it('calls onDiscard, announces it and moves focus to the field', async () => {
      const user = userEvent.setup()
      const onDiscard = jest.fn()
      renderComponent({ review: proposal({ onDiscard }) })

      await user.click(screen.getByRole('button', { name: 'Discard' }))

      expect(onDiscard).toHaveBeenCalledTimes(1)
      expect(screen.getByRole('textbox', { name: /agent input/i })).toHaveFocus()
    })

    it('announces Discard and Undo once the bar is removed', async () => {
      const user = userEvent.setup()
      const onUndo = jest.fn()
      const { rerender } = renderComponent({ review: proposal() })
      await user.click(screen.getByRole('button', { name: 'Discard' }))
      rerender(<AgentInput onSubmit={jest.fn()} />)
      expect(screen.getByTestId('agent-input-review-announcement')).toHaveTextContent('Suggestion discarded.')

      rerender(<AgentInput onSubmit={jest.fn()} review={{ state: 'applied', onUndo }} />)
      await user.click(screen.getByRole('button', { name: 'Undo' }))
      expect(onUndo).toHaveBeenCalledTimes(1)
      expect(screen.getByRole('textbox', { name: /agent input/i })).toHaveFocus()
      rerender(<AgentInput onSubmit={jest.fn()} />)
      expect(screen.getByTestId('agent-input-review-announcement')).toHaveTextContent('Changes undone.')
    })

    it('fades the bar out before removing it, and makes it inert meanwhile', async () => {
      jest.useFakeTimers()
      const { rerender } = renderComponent({ review: proposal() })

      rerender(<AgentInput onSubmit={jest.fn()} />)
      const bar = screen.getByTestId('agent-input-review')
      expect(bar.closest('[inert]')).not.toBeNull()

      act(() => {
        jest.advanceTimersByTime(400)
      })
      expect(screen.queryByTestId('agent-input-review')).not.toBeInTheDocument()
      jest.useRealTimers()
    })

    it('fades then closes its space (300ms), or only fades under reduced motion (150ms)', () => {
      jest.useFakeTimers()
      const { rerender, unmount } = renderComponent({ review: proposal() })
      rerender(<AgentInput onSubmit={jest.fn()} />)
      act(() => {
        jest.advanceTimersByTime(200)
      })
      // Still collapsing after the fade
      expect(screen.getByTestId('agent-input-review')).toBeInTheDocument()
      unmount()

      ;(window.matchMedia as jest.Mock).mockImplementation(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }))
      const reduced = renderComponent({ review: proposal() })
      reduced.rerender(<AgentInput onSubmit={jest.fn()} />)
      act(() => {
        jest.advanceTimersByTime(200)
      })
      expect(screen.queryByTestId('agent-input-review')).not.toBeInTheDocument()
      jest.useRealTimers()
    })

    it('has no accessibility violations with a proposal or an applied change', async () => {
      const { container, rerender } = renderComponent({ review: proposal() })
      expect(await axe(container)).toHaveNoViolations()
      rerender(<AgentInput onSubmit={jest.fn()} review={{ state: 'applied', onUndo: jest.fn() }} />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('Suggestions (decision 0046)', () => {
    const three = ['Swap Tuesday', 'Drop Wednesday', 'Add a fish night']

    it('fills the field and focuses it with the caret at the end, without sending', async () => {
      const onSubmit = jest.fn()
      const onSuggestionSelect = jest.fn()
      renderComponent({ onSubmit, suggestions: three, onSuggestionSelect })

      fireEvent.click(screen.getByRole('button', { name: 'Drop Wednesday' }))

      const field = screen.getByRole('textbox', { name: /agent input/i }) as HTMLTextAreaElement
      expect(field).toHaveValue('Drop Wednesday')
      expect(field).toHaveFocus()
      await waitFor(() => expect(field.selectionStart).toBe('Drop Wednesday'.length))
      expect(onSuggestionSelect).toHaveBeenCalledWith('Drop Wednesday')
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('fills a controlled field through onChange', () => {
      const onChange = jest.fn()
      renderComponent({ value: '', onChange, suggestions: three })

      fireEvent.click(screen.getByRole('button', { name: 'Swap Tuesday' }))

      expect(onChange).toHaveBeenCalledWith('Swap Tuesday')
    })

    it('is a named list before the field', () => {
      renderComponent({ suggestions: three })

      const list = screen.getByRole('list', { name: 'Suggestions' })
      expect(list).toContainElement(screen.getByRole('button', { name: 'Swap Tuesday' }))
      expect(list.compareDocumentPosition(screen.getByRole('textbox', { name: /agent input/i }))).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      )
    })

    it('is hidden while the field has text', () => {
      jest.useFakeTimers()
      renderComponent({ suggestions: three })

      fireEvent.change(screen.getByRole('textbox', { name: /agent input/i }), { target: { value: 'Swap' } })
      act(() => {
        jest.advanceTimersByTime(400)
      })

      expect(screen.queryByRole('list', { name: 'Suggestions' })).not.toBeInTheDocument()
      jest.useRealTimers()
    })

    it('is hidden while a proposal is open, and shown below the bar when it offers Undo', () => {
      jest.useFakeTimers()
      const { rerender } = renderComponent({
        suggestions: three,
        review: { state: 'proposal', summary: '1 change suggested', onAccept: jest.fn(), onDiscard: jest.fn() },
      })
      expect(screen.queryByRole('list', { name: 'Suggestions' })).not.toBeInTheDocument()

      rerender(<AgentInput onSubmit={jest.fn()} suggestions={three} review={{ state: 'applied', onUndo: jest.fn() }} />)

      const list = screen.getByRole('list', { name: 'Suggestions' })
      expect(screen.getByTestId('agent-input-review').compareDocumentPosition(list)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      )
      jest.useRealTimers()
    })

    it('shows at most three, and warns in development when given more', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
      renderComponent({ suggestions: [...three, 'A fourth'] })

      expect(screen.getAllByRole('listitem')).toHaveLength(3)
      expect(screen.queryByRole('button', { name: 'A fourth' })).not.toBeInTheDocument()
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('at most 3 suggestions'))
      warn.mockRestore()
    })

    it('has no accessibility violations', async () => {
      const { container } = renderComponent({ suggestions: three })
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('Multiline', () => {
    it('renders a one-row textarea with a Send key hint', () => {
      renderComponent()
      const field = screen.getByRole('textbox', { name: /agent input/i })

      expect(field.tagName).toBe('TEXTAREA')
      expect(field).toHaveAttribute('rows', '1')
      expect(field).toHaveAttribute('enterkeyhint', 'send')
    })

    it('adds a line on Shift+Enter without submitting', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit })
      const field = screen.getByRole('textbox', { name: /agent input/i })
      fireEvent.change(field, { target: { value: 'Swap Tuesday' } })

      // Not prevented, so the browser inserts the line break
      expect(fireEvent.keyDown(field, { key: 'Enter', shiftKey: true })).toBe(true)

      await act(async () => {})
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('keeps line breaks in the submitted text', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ onSubmit })
      const field = screen.getByRole('textbox', { name: /agent input/i })

      fireEvent.change(field, { target: { value: '  Swap Tuesday  \n  drop   Wednesday \n' } })
      fireEvent.keyDown(field, { key: 'Enter' })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ text: 'Swap Tuesday\ndrop Wednesday' }))
      })
      await waitFor(() => expect(field).toHaveValue(''))
    })
  })

  describe('Length limit', () => {
    const type = (value: string) =>
      fireEvent.change(screen.getByRole('textbox', { name: /agent input/i }), { target: { value } })

    it('shows the counter from 80% of the limit', () => {
      renderComponent({ maxLength: 10 })

      type('1234567')
      expect(screen.queryByTestId('agent-input-counter')).not.toBeInTheDocument()

      type('12345678')
      expect(screen.getByTestId('agent-input-counter')).toHaveTextContent('8/10 characters')
      expect(screen.getByRole('textbox', { name: /agent input/i })).toHaveAccessibleDescription(/8\/10 characters/)
    })

    it('announces reaching the limit once, without a per-keystroke announcement', () => {
      renderComponent({ maxLength: 10 })
      const announcer = screen.getByTestId('agent-input-limit-announcement')

      type('123456789')
      expect(announcer).toHaveTextContent('')

      type('1234567890')
      expect(announcer).toHaveTextContent('Character limit reached: 10 characters')
    })

    it('allows typing past the limit but blocks sending, and says why', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ maxLength: 10, onSubmit, helperText: 'Tell me what to change' })
      const field = screen.getByRole('textbox', { name: /agent input/i })

      type('12345678901')
      expect(field).toHaveValue('12345678901')
      expect(field).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByTestId('agent-input-counter')).toHaveTextContent('11/10')
      expect(screen.getByText('Over the 10-character limit. Shorten your message to send.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled()

      fireEvent.keyDown(field, { key: 'Enter' })
      await act(async () => {})
      expect(onSubmit).not.toHaveBeenCalled()

      type('1234567890')
      expect(field).not.toHaveAttribute('aria-invalid')
      expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled()
    })

    it('styles the over-limit counter and message as errors, like a product error', () => {
      const { rerender } = renderComponent({ maxLength: 10, errorMessage: 'Product error' })
      const errorClass = screen.getByText('Product error').className

      rerender(<AgentInput onSubmit={jest.fn()} maxLength={10} />)
      type('12345678901')

      expect(screen.getByText(/over the 10-character limit/i).className).toBe(errorClass)
      expect(screen.getByTestId('agent-input-counter').parentElement?.className).toBe(errorClass)
    })

    it('counts the text that would be sent, not surrounding spaces', () => {
      renderComponent({ maxLength: 10 })
      type('   1234567890   ')

      expect(screen.getByTestId('agent-input-counter')).toHaveTextContent('10/10')
      expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled()
    })

    it('puts an over-limit voice transcript in the field instead of sending it', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined)
      renderComponent({ maxLength: 10, onSubmit })

      fireEvent.click(screen.getByRole('button', { name: /start voice input/i }))
      await waitFor(() => expect(MockSpeechRecognition.instance).toBeTruthy())

      await act(async () => {
        MockSpeechRecognition.instance?.emitResult([{ transcript: 'swap tuesday for pasta', isFinal: true }])
      })

      expect(onSubmit).not.toHaveBeenCalled()
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /agent input/i })).toHaveValue('swap tuesday for pasta')
      })
    })

    it('has no accessibility violations over the limit', async () => {
      const { container } = renderComponent({ maxLength: 10 })
      type('12345678901')
      expect(await axe(container)).toHaveNoViolations()
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
