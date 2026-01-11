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

    it('should not have accessibility violations when collapsed with maxHeight', async () => {
      const longCode = Array(50).fill('const line = "code";').join('\n')
      const { container } = render(
        <CodeBlock maxHeight={100}>{longCode}</CodeBlock>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations when expanded', async () => {
      const longCode = Array(50).fill('const line = "code";').join('\n')
      const { container } = render(
        <CodeBlock maxHeight={100} defaultExpanded>{longCode}</CodeBlock>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Expand/Collapse Functionality', () => {
    const longCode = Array(50).fill('const line = "code";').join('\n')
    const shortCode = 'const x = 1;'

    beforeEach(() => {
      jest.useRealTimers()
      // Mock scrollHeight to simulate content height
      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
        configurable: true,
        get: function() {
          // Return a large value for long code, small for short
          if (this.textContent?.includes('const line')) {
            return 500
          }
          return 20
        }
      })
    })

    it('does not show expand button when maxHeight is not set', () => {
      render(<CodeBlock>{longCode}</CodeBlock>)
      expect(screen.queryByTestId('expand-button')).not.toBeInTheDocument()
    })

    it('does not show expand button when content fits within maxHeight', () => {
      render(<CodeBlock maxHeight={100}>{shortCode}</CodeBlock>)
      expect(screen.queryByTestId('expand-button')).not.toBeInTheDocument()
    })

    it('shows expand button when content exceeds maxHeight', () => {
      render(<CodeBlock maxHeight={100}>{longCode}</CodeBlock>)
      const expandButton = screen.getByTestId('expand-button')
      expect(expandButton).toBeInTheDocument()
      expect(expandButton).toHaveTextContent('Show more')
    })

    it('starts collapsed by default when maxHeight is set', () => {
      render(<CodeBlock maxHeight={100} data-testid="code-block">{longCode}</CodeBlock>)
      const codeBlock = screen.getByTestId('code-block')
      expect(codeBlock).toHaveAttribute('aria-expanded', 'false')
    })

    it('starts expanded when defaultExpanded is true', () => {
      render(<CodeBlock maxHeight={100} defaultExpanded data-testid="code-block">{longCode}</CodeBlock>)
      const codeBlock = screen.getByTestId('code-block')
      expect(codeBlock).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByTestId('expand-button')).toHaveTextContent('Show less')
    })

    it('toggles expand state when button is clicked', () => {
      render(<CodeBlock maxHeight={100} data-testid="code-block">{longCode}</CodeBlock>)
      const expandButton = screen.getByTestId('expand-button')
      
      // Initially collapsed
      expect(screen.getByTestId('code-block')).toHaveAttribute('aria-expanded', 'false')
      expect(expandButton).toHaveTextContent('Show more')
      
      // Click to expand
      fireEvent.click(expandButton)
      expect(screen.getByTestId('code-block')).toHaveAttribute('aria-expanded', 'true')
      expect(expandButton).toHaveTextContent('Show less')
      
      // Click to collapse
      fireEvent.click(expandButton)
      expect(screen.getByTestId('code-block')).toHaveAttribute('aria-expanded', 'false')
      expect(expandButton).toHaveTextContent('Show more')
    })

    it('expand button has aria-expanded attribute', () => {
      render(<CodeBlock maxHeight={100}>{longCode}</CodeBlock>)
      const expandButton = screen.getByTestId('expand-button')
      expect(expandButton).toHaveAttribute('aria-expanded', 'false')
      
      fireEvent.click(expandButton)
      expect(expandButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('code block is keyboard focusable when expandable', () => {
      render(<CodeBlock maxHeight={100} data-testid="code-block">{longCode}</CodeBlock>)
      const codeBlock = screen.getByTestId('code-block')
      expect(codeBlock).toHaveAttribute('tabIndex', '0')
    })

    it('shows both copy and expand buttons when applicable', () => {
      render(<CodeBlock maxHeight={100} showCopyButton>{longCode}</CodeBlock>)
      expect(screen.getByTestId('copy-button')).toBeInTheDocument()
      expect(screen.getByTestId('expand-button')).toBeInTheDocument()
    })

    it('can hide copy button while showing expand button', () => {
      render(<CodeBlock maxHeight={100} showCopyButton={false}>{longCode}</CodeBlock>)
      expect(screen.queryByTestId('copy-button')).not.toBeInTheDocument()
      expect(screen.getByTestId('expand-button')).toBeInTheDocument()
    })
  })
})
