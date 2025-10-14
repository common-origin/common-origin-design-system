import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { axe, toHaveNoViolations } from 'jest-axe'
import { Container, ContainerProps } from "./Container"

expect.extend(toHaveNoViolations)

describe("Container", () => {
  const defaultProps: ContainerProps = {
    children: <div>Test content</div>
  }

  const renderContainer = (props: Partial<ContainerProps> = {}) => {
    return render(<Container {...defaultProps} {...props} />)
  }

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      renderContainer({ children: <div>Container content</div> })
      expect(screen.getByText("Container content")).toBeInTheDocument()
    })

    it("renders with default props when no props provided", () => {
      const { container } = renderContainer()
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.tagName).toBe("DIV")
    })

    it("renders without children", () => {
      const { container } = render(<Container />)
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.tagName).toBe("DIV")
    })

    it("applies custom data-testid", () => {
      renderContainer({ 'data-testid': 'custom-container' })
      const container = screen.getByTestId('custom-container')
      expect(container).toBeInTheDocument()
    })

    it("supports data-testid prop correctly", () => {
      renderContainer({ 'data-testid': 'test-container' })
      expect(screen.getByTestId('test-container')).toBeInTheDocument()
      expect(screen.queryByTestId('wrong-id')).not.toBeInTheDocument()
    })
  })

  describe("Content Rendering", () => {
    it("renders simple text content", () => {
      renderContainer({ children: "Simple text" })
      expect(screen.getByText("Simple text")).toBeInTheDocument()
    })

    it("renders multiple children", () => {
      renderContainer({ 
        children: (
          <>
            <div>First child</div>
            <div>Second child</div>
          </>
        )
      })
      expect(screen.getByText("First child")).toBeInTheDocument()
      expect(screen.getByText("Second child")).toBeInTheDocument()
    })

    it("renders complex nested content", () => {
      renderContainer({ 
        children: (
          <div>
            <h1>Title</h1>
            <p>Paragraph content</p>
          </div>
        )
      })
      expect(screen.getByText("Title")).toBeInTheDocument()
      expect(screen.getByText("Paragraph content")).toBeInTheDocument()
    })
  })

  describe("Styling and Layout", () => {
    it("applies container styles", () => {
      const { container } = renderContainer()
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      
      // Check that it's a styled component (has styled-components class)
      expect(containerElement.tagName).toBe("DIV")
    })

    it("maintains responsive behavior", () => {
      const { container } = renderContainer({
        children: <div>Responsive content</div>
      })
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      expect(screen.getByText("Responsive content")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderContainer()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with complex content', async () => {
      const { container } = renderContainer({
        children: (
          <div>
            <h1>Title</h1>
            <p>Paragraph content</p>
            <button>Action Button</button>
          </div>
        )
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with semantic elements', async () => {
      const { container } = renderContainer({
        children: (
          <main>
            <nav aria-label="Main navigation">
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </nav>
            <section>
              <h1>Main Content</h1>
              <article>
                <h2>Article Title</h2>
                <p>Article content</p>
              </article>
            </section>
          </main>
        )
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations when empty', async () => {
      const { container } = render(<Container />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("has proper semantic structure", () => {
      const { container } = renderContainer({
        children: (
          <main>
            <h1>Main Content</h1>
            <p>This is contained content</p>
          </main>
        )
      })
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.tagName).toBe("DIV")
      expect(screen.getByRole("main")).toBeInTheDocument()
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    })

    it("preserves child element accessibility attributes", () => {
      renderContainer({
        children: (
          <button aria-label="Accessible button">
            Click me
          </button>
        )
      })
      
      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute("aria-label", "Accessible button")
    })
  })

  describe("TypeScript Props", () => {
    it("accepts ReactNode children", () => {
      const complexChildren = (
        <div>
          <span>Text</span>
          <button>Button</button>
        </div>
      )
      
      renderContainer({ children: complexChildren })
      expect(screen.getByText("Text")).toBeInTheDocument()
      expect(screen.getByText("Button")).toBeInTheDocument()
    })

    it("handles optional children prop", () => {
      const { container } = render(<Container />)
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.tagName).toBe("DIV")
    })
  })

  describe("Integration", () => {
    it("can be nested", () => {
      renderContainer({
        children: (
          <Container>
            <div>Nested container content</div>
          </Container>
        )
      })
      
      expect(screen.getByText("Nested container content")).toBeInTheDocument()
    })
  })

    describe('Responsive Design', () => {
    it('renders with proper container structure for responsive layout', () => {
      const { container } = renderContainer()
      const containerElement = container.firstChild as HTMLElement
      
      // Check that container is rendered properly for responsive behavior
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.tagName).toBe('DIV')
    })

    it('handles content at different viewport scenarios', () => {
      const testContent = 'Content for responsive testing'
      const { container } = renderContainer({ children: testContent })
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.textContent).toBe(testContent)
    })

    it('handles content overflow properly', () => {
      const longContent = 'A'.repeat(1000)
      const { container } = renderContainer({ children: longContent })
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.textContent).toBe(longContent)
    })

    it('works with different content widths', () => {
      const shortContent = 'Short'
      const { container } = renderContainer({ children: shortContent })
      const containerElement = container.firstChild as HTMLElement
      
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.textContent).toBe(shortContent)
    })
  })

  describe('Edge Cases', () => {
    it("handles null children gracefully", () => {
      const { container } = renderContainer({ children: null })
      const containerElement = container.firstChild as HTMLElement
      expect(containerElement).toBeInTheDocument()
      expect(containerElement).toHaveTextContent('')
    })

    it("handles undefined children gracefully", () => {
      const { container } = renderContainer({ children: undefined })
      const containerElement = container.firstChild as HTMLElement
      expect(containerElement).toBeInTheDocument()
      expect(containerElement).toHaveTextContent('')
    })

    it("handles empty string children", () => {
      const { container } = renderContainer({ children: '' })
      const containerElement = container.firstChild as HTMLElement
      expect(containerElement).toBeInTheDocument()
      expect(containerElement.textContent).toBe('')
    })

    it("handles zero as children", () => {
      renderContainer({ children: 0 })
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it("handles boolean false as children", () => {
      const { container } = renderContainer({ children: false as any })
      const containerElement = container.firstChild as HTMLElement
      expect(containerElement).toBeInTheDocument()
      // Boolean false renders as empty
      expect(containerElement).toHaveTextContent('')
    })

    it("preserves HTML attributes when passed through props", () => {
      const { container } = render(
        <Container data-testid="attr-test" id="custom-id">
          <div>Content</div>
        </Container>
      )
      const containerElement = container.firstChild as HTMLElement
      expect(containerElement).toHaveAttribute('id', 'custom-id')
      expect(containerElement).toHaveAttribute('data-testid', 'attr-test')
    })

    it("handles deeply nested complex content", () => {
      renderContainer({
        children: (
          <div>
            <section>
              <article>
                <header>
                  <h1>Article Header</h1>
                </header>
                <div>
                  <p>Deeply nested paragraph</p>
                  <footer>
                    <small>Article footer</small>
                  </footer>
                </div>
              </article>
            </section>
          </div>
        )
      })

      expect(screen.getByText('Article Header')).toBeInTheDocument()
      expect(screen.getByText('Deeply nested paragraph')).toBeInTheDocument()
      expect(screen.getByText('Article footer')).toBeInTheDocument()
    })
  })
})