import React from 'react'
import { useRouter } from 'next/router'
import styled from "styled-components"
import Link from 'next/link'
import { Container } from '../../components/atoms/Container'
import tokens from '@/lib/cssTokens'
import { ThemedLogo } from '../ThemedLogo'

const { semantic: { color } } = tokens

// Props interface for the Footer component
export interface FooterProps {
  /** Logo source path. Defaults to the Common Origin logo in the colour that reads on the footer in the current theme */
  logoSrc?: string
  /** Logo alt text - defaults to "Common Origin Logo" */
  logoAlt?: string
}

const FooterStyled = styled.footer`
  background-color: ${color.fill.emphasis};
  color: ${color.text.inverse};
  width: 100%;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${tokens.semantic.space[600]} 0;
`

const LogoLink = styled(Link)<{ $isActive: boolean }>`
  margin-right: ${tokens.semantic.space[400]};
  display: flex;
  align-items: center;
  text-decoration: ${props => props.$isActive ? 'underline' : 'none'};
  border-radius: 0.25rem;
  
  /* Focus styles for WCAG 2.4.7 Focus Visible */
  &:focus {
    outline: 2px solid ${color.text.inverse};
    outline-offset: 2px;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    &:focus {
      outline: 3px solid;
    }
  }
`

const LogoImage = styled.img`
  height: auto;
  width: auto;
  
  /* Ensure image doesn't become too small for accessibility */
  min-width: 44px;
  min-height: 44px;
`

// The default logo matches text.inverse on the emphasis fill, in either theme (#360)
const FooterLogo = styled(ThemedLogo)`
  min-width: 44px;
  min-height: 44px;
`

export const Footer: React.FC<FooterProps> = ({
  logoSrc,
  logoAlt = "Common Origin Logo"
}) => {
  const router = useRouter()
  const { asPath } = router

  return (
    <FooterStyled role="contentinfo" aria-label="Site footer">
      <Container>
        <FooterContent>
          <LogoLink 
            href="/" 
            $isActive={asPath === '/'}
            aria-label={`${logoAlt} - Navigate to homepage`}
          >
            {logoSrc ? <LogoImage src={logoSrc} alt="" /> : <FooterLogo tone="inverse" alt="" />}
          </LogoLink>
        </FooterContent>
      </Container>
    </FooterStyled>
  )
}