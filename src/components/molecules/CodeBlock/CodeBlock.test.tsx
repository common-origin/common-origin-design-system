import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom'
import { CodeBlock } from '../CodeBlock'

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations)

// Mock clipboard API
const mockClipboard = {
  writeText: jest.fn(() => Promise.resolve()),
}

Object.assign(navigator, {
  clipboard: mockClipboard,
})

describe('CodeBlock Component', () => {
  const defaultProps = {
    children: 'const hello = "world";'
  }

  const renderCodeBlock = (props: any = {}) => {
    return render(<CodeBlock {...defaultProps} {...props} />)
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderCodeBlock()
      const codeBlock = screen.getByText('const hello = "world";')
      expect(codeBlock).toBeInTheDocument()
    })

    it('renders with custom code content', () => {
      const customCode = 'console.log("Hello, World!");'
      renderCodeBlock({ children: customCode })
      const codeBlock = screen.getByText(customCode)
      expect(codeBlock).toBeInTheDocument()
    })

    it('renders with copy button by default', () => {
      renderCodeBlock()
      const copyButton = screen.getByRole('button', { name: /copy/i })
      expect(copyButton).toBeInTheDocument()
    })

    it('can hide copy button', () => {
      renderCodeBlock({ showCopyButton: false })
      const copyButton = screen.queryByRole('button', { name: /copy/i })
      expect(copyButton).not.toBeInTheDocument()
    })

    it('applies data-testid when provided', () => {
      renderCodeBlock({ 'data-testid': 'custom-code-block' })
      const codeBlock = screen.getByTestId('custom-code-block')
      expect(codeBlock).toBeInTheDocument()
    })
  })

  describe('Copy Functionality', () => {
    it('copies code to clipboard when copy button is clicked', async () => {
      const code = 'const test = "code";'
      renderCodeBlock({ children: code })
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith(code)
      })
    })

    it('shows "Copied!" feedback after copying', async () => {
      renderCodeBlock()
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })
    })

    it('resets copy feedback after 2 seconds', async () => {
      renderCodeBlock()
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })
      
      await act(async () => {
        jest.advanceTimersByTime(2000)
      })
      
      await waitFor(() => {
        expect(screen.getByText('Copy')).toBeInTheDocument()
      })
    })

    it('calls onCopy callback when provided', async () => {
      const onCopyMock = jest.fn()
      renderCodeBlock({ onCopy: onCopyMock })
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(onCopyMock).toHaveBeenCalledTimes(1)
      })
    })

    it('handles clipboard write errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      mockClipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'))
      
      renderCodeBlock()
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy text: ', expect.any(Error))
      })
      
      consoleErrorSpy.mockRestore()
    })
  })

  describe('Content Rendering', () => {
    it('renders multiline code correctly', () => {
      const multilineCode = `const greeting = "Hello";
const name = "World";
console.log(greeting + " " + name);`
      
      const { container } = renderCodeBlock({ children: multilineCode })
      
      // Check that the pre element contains the multiline code
      const preElement = container.querySelector('pre')
      expect(preElement).toBeInTheDocument()
      expect(preElement).toHaveTextContent('const greeting = "Hello"')
      expect(preElement).toHaveTextContent('const name = "World"')
      expect(preElement).toHaveTextContent('console.log(greeting + " " + name)')
    })

    it('renders code with special characters', () => {
      const specialCode = 'const obj = { key: "value", arr: [1, 2, 3] };'
      renderCodeBlock({ children: specialCode })
      
      expect(screen.getByText(specialCode)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('copy button has correct test id', () => {
      renderCodeBlock()
      const copyButton = screen.getByTestId('copy-button')
      expect(copyButton).toBeInTheDocument()
    })

    it('maintains keyboard accessibility', () => {
      renderCodeBlock()
      const copyButton = screen.getByRole('button', { name: /copy/i })
      
      // Button should be focusable
      copyButton.focus()
      expect(copyButton).toHaveFocus()
    })


  })

  // Separate describe block for accessibility tests with real timers
  describe('Accessibility Testing', () => {
    beforeEach(() => {
      jest.useRealTimers()
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.useFakeTimers()
    })

    it('should not have accessibility violations with default props', async () => {
      const { container } = render(<CodeBlock>const hello = "world";</CodeBlock>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with copy button hidden', async () => {
      const { container } = render(
        <CodeBlock showCopyButton={false}>const test = "accessibility";</CodeBlock>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with custom code content', async () => {
      const { container } = render(
        <CodeBlock>
          {`function customCode() {
  return "accessible code";
}`}
        </CodeBlock>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
