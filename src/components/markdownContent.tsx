import React from 'react'
import styled from 'styled-components'
import tokens from '../styles/tokens.json'

const { base: { spacing }, semantic: { color, typography } } = tokens

interface MarkdownContentProps {
  children?: React.ReactNode
  className?: string
  dangerouslySetInnerHTML?: { __html: string }
}

const StyledMarkdown = styled.div`
  p {
    margin-top: ${spacing['4']};
    font: ${typography.body};
    color: ${color.text.default};
  }

  h2 {
    font: ${typography.h2};
    letter-spacing: -0.0625rem;
  }

  h3 {
    font: ${typography.h3};
    letter-spacing: -0.0625rem;
  }

  h4 {
    font: ${typography.h4};
    letter-spacing: -0.0625rem;
  }

  h5 {
    font: ${typography.h5};
  }

  h6 {
    font: ${typography.h6};
    text-transform: uppercase;
    color: ${color.text.emphasis};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${color.text.emphasis};
    margin: ${spacing['8']} 0 ${spacing['4']};
  }

  img {
    margin: ${spacing['12']} 0 ${spacing['4']};
    border-radius: ${tokens.base.border.radius['4']};
  }

  ul {
    list-style-type: disc;
    padding-left: ${spacing['8']};
    margin-top: ${spacing['4']};
  }

  ol {
    list-style-type: decimal;
    padding-left: ${spacing['8']};
    margin-top: ${spacing['4']};
  }

  li {
    color: ${color.text.default};
    margin-bottom: ${spacing['2']};
  }

  caption {
    font: ${typography.caption};
  }

  a {
    text-decoration: underline;
    color: ${color.text.interactive};
  }

  pre {
    padding: ${spacing['4']};
    border-radius: ${tokens.base.border.radius['4']};
    background-color: ${color.background.surface};
    margin-top: ${spacing['4']};
    font-size: 14px;
    color: ${color.text.subdued};
    overflow: hidden;
    overflow-x: scroll;
  }

  p > code,
  li > code,
  strong > code {
    padding: ${spacing['1']} ${spacing['2']};
    border-radius: ${tokens.base.border.radius['2']};
    background-color: ${color.background.surface};
    font-size: 14px;
    color: ${color.text.subdued};
  }
`

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ children, className, dangerouslySetInnerHTML }) => {
  return <StyledMarkdown className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>{children}</StyledMarkdown>
}

export default MarkdownContent
