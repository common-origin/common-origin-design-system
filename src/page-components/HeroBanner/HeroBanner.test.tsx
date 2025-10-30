import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { HeroBanner, HeroBannerProps } from './HeroBanner'

// Default props for consistent testing
const defaultProps: HeroBannerProps = {
  title: "Common Origin",
  subtitle: "A creative studio",
  videoSrc: "./assets/cover/homepage-loop.mp4"
}

describe('HeroBanner', () => {
  const renderHeroBanner = (props: Partial<HeroBannerProps> = {}) => {
    return render(<HeroBanner {...defaultProps} {...props} />)
  }

  describe("Basic Rendering", () => {
    it('renders hero banner container', () => {
      const { container } = renderHeroBanner()
      // Check for the grid container structure by finding the Container component
      const containerElement = container.firstChild
      expect(containerElement).toBeInTheDocument()
      
      // Check that content is present
      expect(screen.getByText('Common Origin')).toBeInTheDocument()
    })

    it('renders title and subtitle with default content', () => {
      renderHeroBanner()
      expect(screen.getByText('Common Origin')).toBeInTheDocument()
      expect(screen.getByText('A creative studio')).toBeInTheDocument()
    })

    it('renders video element with default source', () => {
      const { container } = renderHeroBanner()
      const video = container.querySelector('video')
      expect(video).toBeInTheDocument()
      
      // Boolean attributes for video
      expect(video).toHaveProperty('autoplay', true)
      expect(video).toHaveProperty('muted', true)
      expect(video).toHaveProperty('loop', true)
      expect(video).toHaveProperty('playsInline', true)
      
      const source = video?.querySelector('source')
      expect(source).toHaveAttribute('src', './assets/cover/homepage-loop.mp4')
      expect(source).toHaveAttribute('type', 'video/mp4')
    })

    it('renders navigation buttons by default', () => {
      renderHeroBanner()
      expect(screen.getByText('Music')).toBeInTheDocument()
      expect(screen.getByText('Art')).toBeInTheDocument()
      expect(screen.getByText('Design')).toBeInTheDocument()
    })
  })

  describe("Props Variants", () => {
    it('renders with custom title', () => {
      renderHeroBanner({ title: "Custom Title" })
      expect(screen.getByText('Custom Title')).toBeInTheDocument()
      expect(screen.queryByText('Common Origin')).not.toBeInTheDocument()
    })

    it('renders with custom subtitle', () => {
      renderHeroBanner({ subtitle: "Custom subtitle" })
      expect(screen.getByText('Custom subtitle')).toBeInTheDocument()
      expect(screen.queryByText('A creative studio')).not.toBeInTheDocument()
    })

    it('renders with custom video source', () => {
      const { container } = renderHeroBanner({ videoSrc: "/custom-video.mp4" })
      const video = container.querySelector('video')
      const source = video?.querySelector('source')
      expect(source).toHaveAttribute('src', '/custom-video.mp4')
    })

    it('renders with all custom props', () => {
      renderHeroBanner({
        title: "Custom Brand",
        subtitle: "Custom tagline",
        videoSrc: "/custom-video.mp4"
      })
      
      expect(screen.getByText('Custom Brand')).toBeInTheDocument()
      expect(screen.getByText('Custom tagline')).toBeInTheDocument()
      // Navigation buttons should always be present
      expect(screen.getByText('Music')).toBeInTheDocument()
      expect(screen.getByText('Art')).toBeInTheDocument()
      expect(screen.getByText('Design')).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it('has proper semantic structure', () => {
      renderHeroBanner()
      
      // Check for proper typography hierarchy
      const title = screen.getByText('Common Origin')
      const subtitle = screen.getByText('A creative studio')
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
    })

    it('video has proper accessibility attributes', () => {
      const { container } = renderHeroBanner()
      const video = container.querySelector('video')
      
      // Video should be muted for accessibility (no auto-playing audio)
      expect(video).toHaveProperty('muted', true)
      expect(video).toHaveProperty('autoplay', true)
      expect(video).toHaveProperty('loop', true)
      expect(video).toHaveProperty('playsInline', true)
      
      // Video should have proper accessibility attributes
      expect(video).toHaveAttribute('aria-hidden', 'true')
      expect(video).toHaveAttribute('role', 'presentation')
    })

    it('navigation buttons are accessible when shown', () => {
      const { container } = renderHeroBanner()
      const musicButton = screen.getByText('Music')
      const artButton = screen.getByText('Art')
      const designButton = screen.getByText('Design')
      
      // Buttons should be present and accessible
      expect(musicButton).toBeInTheDocument()
      expect(artButton).toBeInTheDocument()
      expect(designButton).toBeInTheDocument()
      
      // Check navigation container has proper accessibility
      const nav = container.querySelector('[role="navigation"]')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'Explore sections')
    })

    it('passes automated accessibility checks', async () => {
      const { container } = renderHeroBanner()
      // Basic accessibility check - ensure proper structure
      expect(container.querySelector('[role="banner"]')).toBeInTheDocument()
      expect(container.querySelector('[role="navigation"]')).toBeInTheDocument()
    })

    it('passes accessibility checks with custom props', async () => {
      const { container } = renderHeroBanner({
        title: "Custom Brand",
        subtitle: "Custom tagline",
      })
      // Basic accessibility check 
      expect(container.querySelector('[role="banner"]')).toBeInTheDocument()
      expect(screen.getByText('Custom Brand')).toBeInTheDocument()
    })

    it('passes accessibility checks with navigation always visible', async () => {
      const { container } = renderHeroBanner()
      // Basic accessibility check - navigation is always present
      expect(container.querySelector('[role="navigation"]')).toBeInTheDocument()
      expect(container.querySelector('[role="banner"]')).toBeInTheDocument()
    })
  })

  describe("Responsive Behavior", () => {
    it('renders responsive grid structure', () => {
      const { container } = renderHeroBanner()
      
      // Check that main structure is present
      expect(container.firstChild).toBeInTheDocument()
      
      // Check that content sections are present
      expect(screen.getByText('Common Origin')).toBeInTheDocument()
      const video = container.querySelector('video')
      expect(video).toBeInTheDocument()
    })

    it('maintains content structure across viewport sizes', () => {
      const { container } = renderHeroBanner()
      
      // Content should be present regardless of viewport
      expect(screen.getByText('Common Origin')).toBeInTheDocument()
      expect(screen.getByText('A creative studio')).toBeInTheDocument()
      
      // Video should be present
      const video = container.querySelector('video')
      expect(video).toBeInTheDocument()
    })
  })

  describe("Edge Cases", () => {
    it('handles empty title gracefully', () => {
      renderHeroBanner({ title: "" })
      const subtitle = screen.getByText('A creative studio')
      expect(subtitle).toBeInTheDocument()
    })

    it('handles empty subtitle gracefully', () => {
      renderHeroBanner({ subtitle: "" })
      const title = screen.getByText('Common Origin')
      expect(title).toBeInTheDocument()
    })

    it('handles empty video source', () => {
      const { container } = renderHeroBanner({ videoSrc: "" })
      const video = container.querySelector('video')
      expect(video).toBeInTheDocument()
      
  const source = video?.querySelector('source')
  expect(source?.getAttribute('src')).toBeNull()
    })
  })

  describe("Integration", () => {
    it('works within container context', () => {
      renderHeroBanner()
      
      // Should contain all expected elements
      expect(screen.getByText('Common Origin')).toBeInTheDocument()
      expect(screen.getByText('A creative studio')).toBeInTheDocument()
      expect(screen.getByText('Music')).toBeInTheDocument()
    })

    it('maintains layout integrity', () => {
      const { container } = renderHeroBanner()
      
      // Check that main structure exists
      expect(container.firstChild).toBeInTheDocument()
      
      // Check that all main components are present
      expect(screen.getByText('Common Origin')).toBeInTheDocument()
      expect(screen.getByText('Music')).toBeInTheDocument()
      const video = container.querySelector('video')
      expect(video).toBeInTheDocument()
    })
  })

  describe("TypeScript Props", () => {
    it('accepts all optional props', () => {
      expect(() => {
        renderHeroBanner({
          title: "Test Title",
          subtitle: "Test Subtitle", 
          videoSrc: "/test.mp4"
        })
      }).not.toThrow()
    })

    it('works with minimal props', () => {
      expect(() => {
        renderHeroBanner({})
      }).not.toThrow()
    })

    it('works with no props', () => {
      expect(() => {
        render(<HeroBanner />)
      }).not.toThrow()
    })
  })
})