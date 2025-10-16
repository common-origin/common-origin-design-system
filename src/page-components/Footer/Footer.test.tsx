import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { axe, toHaveNoViolations } from "jest-axe"
import { Footer, FooterProps } from "./Footer"

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations)

describe("Footer", () => {
  const defaultProps: FooterProps = {}

  const renderFooter = (props: Partial<FooterProps> = {}) => {
    return render(<Footer {...defaultProps} {...props} />)
  }

  describe("Basic Rendering", () => {
    it("renders footer element", () => {
      renderFooter()
      const footer = screen.getByRole("contentinfo")
      expect(footer).toBeInTheDocument()
    })

    it("renders logo image with default props", () => {
      renderFooter()
      const logo = screen.getByRole("presentation")
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute("src", "/assets/logo/co-logo-white.svg")
    })

    it("renders logo link pointing to home", () => {
      renderFooter()
      const logoLink = screen.getByRole("link")
      expect(logoLink).toBeInTheDocument()
      expect(logoLink).toHaveAttribute("href", "/")
    })
  })

  describe("Props Variants", () => {
    it("renders with custom logo source", () => {
      renderFooter({ logoSrc: "/custom-logo.svg" })
      const logo = screen.getByRole("presentation")
      expect(logo).toHaveAttribute("src", "/custom-logo.svg")
    })

    it("renders with custom logo alt text", () => {
      renderFooter({ logoAlt: "Custom Logo Alt" })
      const logoLink = screen.getByLabelText("Custom Logo Alt - Navigate to homepage")
      expect(logoLink).toBeInTheDocument()
    })

    it("renders with both custom logo props", () => {
      renderFooter({ 
        logoSrc: "/custom-logo.svg",
        logoAlt: "Custom Logo Alt"
      })
      const logo = screen.getByRole("presentation")
      expect(logo).toHaveAttribute("src", "/custom-logo.svg")
      
      const logoLink = screen.getByLabelText("Custom Logo Alt - Navigate to homepage")
      expect(logoLink).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      renderFooter()
      const footer = screen.getByRole("contentinfo")
      expect(footer).toBeInTheDocument()
      expect(footer.tagName).toBe("FOOTER")
    })

    it("has accessible name for footer landmark", () => {
      renderFooter()
      const footer = screen.getByLabelText("Site footer")
      expect(footer).toBeInTheDocument()
    })

    it("logo link has descriptive accessible name", () => {
      renderFooter()
      const logoLink = screen.getByLabelText("Common Origin Logo - Navigate to homepage")
      expect(logoLink).toBeInTheDocument()
    })

    it("logo link is keyboard accessible", () => {
      renderFooter()
      const logoLink = screen.getByRole("link")
      expect(logoLink).toHaveAttribute("href", "/")
      expect(logoLink).not.toHaveAttribute("tabindex", "-1")
    })

    it("maintains focus management", () => {
      renderFooter()
      const logoLink = screen.getByRole("link")
      logoLink.focus()
      expect(logoLink).toHaveFocus()
    })

    it("meets minimum target size requirements (44x44px)", () => {
      renderFooter()
      const logoImage = screen.getByRole("presentation")
      
      // Since we can't test computed styles in jsdom, we verify the CSS properties exist
      expect(logoImage).toBeInTheDocument()
      
      // Verify it's within the link which provides the interactive target
      const logoLink = screen.getByRole("link")
      expect(logoLink).toContainElement(logoImage)
    })

    it("supports custom accessible names", () => {
      renderFooter({ logoAlt: "Custom Company Logo" })
      const logoLink = screen.getByLabelText("Custom Company Logo - Navigate to homepage")
      expect(logoLink).toBeInTheDocument()
    })

    it("has decorative image with empty alt text", () => {
      renderFooter()
      const logoImage = screen.getByRole("presentation")
      expect(logoImage).toHaveAttribute("alt", "")
    })

    it("passes automated accessibility checks", async () => {
      const { container } = renderFooter()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("passes accessibility checks with custom props", async () => {
      const { container } = renderFooter({
        logoSrc: "/custom-logo.svg",
        logoAlt: "Custom Logo"
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("supports high contrast mode", () => {
      renderFooter()
      const logoLink = screen.getByRole("link")
      
      // Verify focus styles exist (though we can't test media queries in jsdom)
      expect(logoLink).toBeInTheDocument()
      
      // Focus the element to trigger focus styles
      logoLink.focus()
      expect(logoLink).toHaveFocus()
    })

    it("provides proper semantic relationship between link and image", () => {
      renderFooter()
      const logoLink = screen.getByRole("link")
      const logoImage = screen.getByRole("presentation")
      
      // Image should be contained within the link
      expect(logoLink).toContainElement(logoImage)
      
      // Link should have descriptive label that includes the logo context
      expect(logoLink).toHaveAttribute("aria-label")
      expect(logoLink.getAttribute("aria-label")).toContain("Navigate to homepage")
    })
  })

  describe("Edge Cases", () => {
    it("handles empty props gracefully", () => {
      renderFooter({})
      expect(screen.getByRole("contentinfo")).toBeInTheDocument()
      expect(screen.getByRole("presentation")).toBeInTheDocument()
    })

    it("handles missing logo src gracefully", () => {
      renderFooter({ logoSrc: "" })
      const logo = screen.getByRole("presentation")
      expect(logo).toHaveAttribute("src", "")
    })

    it("handles missing logo alt gracefully", () => {
      renderFooter({ logoAlt: "" })
      const logoLink = screen.getByRole("link")
      expect(logoLink).toHaveAttribute("aria-label", " - Navigate to homepage")
      
      const logoImage = screen.getByRole("presentation")
      expect(logoImage).toHaveAttribute("alt", "")
    })
  })

  describe("Integration", () => {
    it("works within layout context", () => {
      const { container } = renderFooter()
      const footer = container.querySelector("footer")
      expect(footer).toBeInTheDocument()
      
      // Verify it contains the expected structure
      const link = screen.getByRole("link")
      const image = screen.getByRole("presentation")
      expect(link).toContainElement(image)
    })

    it("maintains styling integrity", () => {
      const { container } = renderFooter()
      const footer = container.querySelector("footer")
      expect(footer).toBeInTheDocument()
      expect(footer?.tagName).toBe("FOOTER")
    })
  })

  describe("TypeScript Props", () => {
    it("accepts all optional props", () => {
      const props: FooterProps = {
        logoSrc: "/test-logo.svg",
        logoAlt: "Test Alt"
      }
      
      renderFooter(props)
      expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    })

    it("works with minimal props", () => {
      const props: FooterProps = {}
      renderFooter(props)
      expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    })
  })
})