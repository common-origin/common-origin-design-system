import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import tokens from '@/styles/tokens.json'

const { semantic: { color, border, spacing } } = tokens

export interface CodeBlockProps {
  children: string
  showCopyButton?: boolean
  onCopy?: () => void
  'data-testid'?: string
}

const StyledCodeBlock = styled.pre`
  background-color: ${color.background.subtle};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[2]};
  padding: ${spacing.layout.md};
  font-family: ${tokens.base.fontFamily.monospace};
  font-size: ${tokens.base.fontSize[1]};
  line-height: ${tokens.base.lineHeight[3]};
  color: ${color.text.default};
  overflow-x: auto;
  margin: ${spacing.layout.sm} 0;
  position: relative;
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

const CopyButton: React.FC<{ text: string; onCopy?: () => void }> = ({ text, onCopy }) => {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
  
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
 * 
 * @param children - The code content to display
 * @param showCopyButton - Whether to show the copy button (default: true)
 * @param onCopy - Optional callback when code is copied
 * @param data-testid - Test identifier for the code block
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  showCopyButton = true, 
  onCopy, 
  'data-testid': testId 
}) => {
  return (
    <CodeBlockWrapper>
      <StyledCodeBlock data-testid={testId}>
        {children}
      </StyledCodeBlock>
      {showCopyButton && (
        <CopyButton text={children} onCopy={onCopy} />
      )}
    </CodeBlockWrapper>
  )
}

export default CodeBlock
