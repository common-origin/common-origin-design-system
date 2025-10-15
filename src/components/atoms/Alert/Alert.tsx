import React from 'react'
import styled from 'styled-components'
import { EXAMPLE_PATH } from '../../../lib/constants'
import { Container } from '../..'
import tokens from '@/styles/tokens.json'

const { base, semantic } = tokens

export type Props = {
  preview?: boolean
  'data-testid'?: string
}

const AlertWrapper = styled.div<{ $preview: boolean }>`
  border-bottom: ${semantic.border.default};
  background-color: ${({ $preview }) => 
    $preview ? semantic.color.background.emphasis : semantic.color.background.default};
  border-bottom-color: ${({ $preview }) => 
    $preview ? semantic.color.border.strong : semantic.color.border.default};
  color: ${({ $preview }) => 
    $preview ? semantic.color.text.inverse : semantic.color.text.default};
`

const AlertContent = styled.div`
  padding: ${base.spacing[2]} 0;
  text-align: center;
  font: ${semantic.typography.small};
`

const AlertLink = styled.a<{ $preview: boolean }>`
  text-decoration: underline;
  color: inherit;
  transition: color ${base.duration.fast} ${base.easing.ease};

  &:hover {
    color: ${({ $preview }) => 
      $preview ? semantic.color.text.inverse : semantic.color.text.interactive};
  }

  &:focus {
    outline: ${semantic.border.focus};
    outline-offset: ${base.spacing[1]};
  }
`

export const Alert: React.FC<Props> = ({ preview = false, 'data-testid': dataTestId }) => {
  return (
    <AlertWrapper $preview={preview} data-testid={dataTestId}>
      <Container>
        <AlertContent>
          {preview ? (
            <>
              This page is a preview.{' '}
              <AlertLink
                href="/api/exit-preview"
                $preview={preview}
                aria-label="Exit preview mode"
              >
                Click here
              </AlertLink>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
              <AlertLink
                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                $preview={preview}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code on GitHub"
              >
                available on GitHub
              </AlertLink>
              .
            </>
          )}
        </AlertContent>
      </Container>
    </AlertWrapper>
  )
}
