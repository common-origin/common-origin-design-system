import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import tokens from '@/styles/tokens.json'

const { semantic: { color, border, spacing, motion } } = tokens

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
  background-color: ${color.background.subtle};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[2]};
  padding: ${spacing.layout.md};
  font-family: ${tokens.base.fontFamily.monospace};
  font-size: ${tokens.base.fontSize[1]};
  line-height: ${tokens.base.lineHeight[3]};
  color: ${color.text.default};
  overflow-x: auto;
  overflow-y: ${({ $isExpanded, $needsExpansion }) => 
    $needsExpansion && !$isExpanded ? 'hidden' : 'auto'};
  margin: ${spacing.layout.sm} 0;
  position: relative;
  transition: max-height 300ms ease-in-out;
  
  ${({ $maxHeight, $isExpanded, $needsExpansion }) => {
    if (!$maxHeight || !$needsExpansion) return ''
    // Use a large value when expanded to allow smooth transition
    // 10000px is effectively "no limit" for most code blocks
    return $isExpanded 
      ? 'max-height: 10000px;'
      : `max-height: ${$maxHeight}px;`
  }}
`

const CodeBlockWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

const CopyButtonWrapper = styled.div`
  position: absolute;
  bottom: ${spacing.layout.lg};
  right: ${spacing.layout.sm};
`

const ExpandButtonWrapper = styled.div<{ $hasGradient: boolean }>`
  display: flex;
  justify-content: center;
  padding: ${spacing.layout.sm} 0;
  position: absolute;
  bottom: 1px;
  left: 1px;
  right: 1px;
  width: calc(100% - 2px);
  margin-bottom: ${spacing.layout.sm};
  border-radius: ${tokens.base.border.radius[2]};
  transition: opacity 300ms ease-in-out, background 300ms ease-in-out;
  
  ${({ $hasGradient }) => $hasGradient ? `
    margin-top: -${spacing.layout['4xl']};
    padding-top: ${spacing.layout['4xl']};
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${color.background.subtle} 60%
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
    const announcement = isExpanded ? 'Code block collapsed' : 'Code block expanded'
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', 'polite')
    announcer.setAttribute('aria-atomic', 'true')
    announcer.setAttribute('class', 'sr-only')
    announcer.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;'
    announcer.textContent = announcement
    document.body.appendChild(announcer)
    
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
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
      
      {showCopyButton && (
        <CopyButton text={children} onCopy={onCopy} />
      )}
    </CodeBlockWrapper>
  )
}

export default CodeBlock
