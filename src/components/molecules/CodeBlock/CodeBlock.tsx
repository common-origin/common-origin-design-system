import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import tokens from '@/styles/tokens.json'
import { reducedMotion, visuallyHidden } from '../../../lib/styleUtils'

const { semantic: { color, border, motion } } = tokens

export interface CodeBlockProps {
  children: string
  showCopyButton?: boolean
  onCopy?: () => void
  /**
   * Maximum height in pixels before content is collapsed.
   * When set, enables expand/collapse functionality.
   */
  maxHeight?: number
  /**
   * Initial expanded state when maxHeight is set.
   * @default false
   */
  defaultExpanded?: boolean
  'data-testid'?: string
}

interface StyledCodeBlockProps {
  $maxHeight?: number
  $isExpanded: boolean
  $needsExpansion: boolean
}

const StyledCodeBlock = styled.pre<StyledCodeBlockProps>`
  background-color: ${tokens.semantic.surface.raised};
  border: ${border.emphasis};
  border-radius: ${tokens.semantic.radius.sm};
  padding: ${tokens.semantic.space[300]};
  font-family: ${tokens.component.codeBlock.fontFamily};
  font-size: ${tokens.component.codeBlock.fontSize};
  line-height: ${tokens.component.codeBlock.lineHeight};
  color: ${color.text.default};
  overflow-x: auto;
  overflow-y: ${({ $isExpanded, $needsExpansion }) => 
    $needsExpansion && !$isExpanded ? 'hidden' : 'auto'};
  margin: ${tokens.semantic.space[200]} 0;
  position: relative;
  transition: max-height ${motion.duration.slow} ${motion.easing.easeInOut};

  ${reducedMotion} {
    transition: none;
  }
  
  ${({ $maxHeight, $isExpanded, $needsExpansion }) => {
    if (!$maxHeight || !$needsExpansion) return ''
    // Use a large value when expanded to allow smooth transition
    // 10000px is effectively "no limit" for most code blocks
    return $isExpanded 
      ? 'max-height: 10000px;'
      : `max-height: ${$maxHeight}px;`
  }}

  /* The block is focusable so keyboard users can scroll it; it shows the system focus ring
     (decision 0029) */
  &:focus-visible {
    outline: ${border.focus};
    outline-offset: ${border.focusOffset};
  }
`

const CodeBlockWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

const CopyButtonWrapper = styled.div`
  position: absolute;
  bottom: ${tokens.semantic.space[400]};
  right: ${tokens.semantic.space[200]};
`

const ExpandButtonWrapper = styled.div<{ $hasGradient: boolean }>`
  display: flex;
  justify-content: center;
  padding: ${tokens.semantic.space[200]} 0;
  position: absolute;
  bottom: ${tokens.semantic.border.width.thin};
  left: ${tokens.semantic.border.width.thin};
  right: ${tokens.semantic.border.width.thin};
  width: calc(100% - 2 * ${tokens.semantic.border.width.thin});
  margin-bottom: ${tokens.semantic.space[200]};
  border-radius: ${tokens.semantic.radius.sm};
  transition: opacity ${motion.duration.slow} ${motion.easing.easeInOut}, background ${motion.duration.slow} ${motion.easing.easeInOut};
  
  ${({ $hasGradient }) => $hasGradient ? `
    margin-top: -${tokens.semantic.space[800]};
    padding-top: ${tokens.semantic.space[800]};
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${tokens.semantic.surface.raised} 60%
    );
  ` : `
    background: transparent;
  `}
`

const CopyButton: React.FC<{ text: string; onCopy?: () => void }> = ({ text, onCopy }) => {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy?.()
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setCopied(false)
        timeoutRef.current = null
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  return (
    <CopyButtonWrapper>
      <Button 
        variant="secondary" 
        size="small" 
        iconName="copy"
        onClick={handleCopy}
        data-testid="copy-button"
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </CopyButtonWrapper>
  )
}

const LiveRegion = styled.span`
  ${visuallyHidden}
`

/**
 * CodeBlock component for displaying formatted code with optional copy functionality
 * and expandable content for long code blocks.
 * 
 * @param children - The code content to display
 * @param showCopyButton - Whether to show the copy button (default: true)
 * @param onCopy - Optional callback when code is copied
 * @param maxHeight - Maximum height in pixels before enabling expand/collapse
 * @param defaultExpanded - Initial expanded state when maxHeight is set
 * @param data-testid - Test identifier for the code block
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <CodeBlock>const x = 1;</CodeBlock>
 * 
 * // With max height and expand/collapse
 * <CodeBlock maxHeight={200}>
 *   {longCodeString}
 * </CodeBlock>
 * 
 * // Start expanded
 * <CodeBlock maxHeight={200} defaultExpanded>
 *   {longCodeString}
 * </CodeBlock>
 * ```
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  showCopyButton = true, 
  onCopy,
  maxHeight,
  defaultExpanded = false,
  'data-testid': testId 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [needsExpansion, setNeedsExpansion] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const contentRef = useRef<HTMLPreElement>(null)
  
  // Check if content exceeds maxHeight
  useEffect(() => {
    if (maxHeight && contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight
      setNeedsExpansion(scrollHeight > maxHeight)
    }
  }, [children, maxHeight])
  
  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev)
    // Announce state change to screen readers
    setAnnouncement(isExpanded ? 'Code block collapsed' : 'Code block expanded')
  }
  
  const showExpandButton = maxHeight && needsExpansion
  
  return (
    <CodeBlockWrapper>
      <StyledCodeBlock 
        ref={contentRef}
        data-testid={testId}
        $maxHeight={maxHeight}
        $isExpanded={isExpanded}
        $needsExpansion={needsExpansion}
        aria-expanded={showExpandButton ? isExpanded : undefined}
        tabIndex={0}
      >
        {children}
      </StyledCodeBlock>
      
      {showExpandButton && (
        <ExpandButtonWrapper $hasGradient={!isExpanded}>
          <Button 
            variant="secondary" 
            size="small"
            iconName={isExpanded ? 'caretUp' : 'caretDown'}
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
            aria-controls={testId}
            data-testid="expand-button"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </ExpandButtonWrapper>
      )}
      
      {showExpandButton && (
        <LiveRegion aria-live="polite" aria-atomic="true">
          {announcement}
        </LiveRegion>
      )}
      
      {showCopyButton && (
        <CopyButton text={children} onCopy={onCopy} />
      )}
    </CodeBlockWrapper>
  )
}

export default CodeBlock
