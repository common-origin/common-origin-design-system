import React from 'react'
import { useRouter } from 'next/router'
import styled from "styled-components"
import Link from 'next/link'
import { Container } from '../../components/atoms/Container'
import tokens from '@/styles/tokens.json'

const { semantic: { color, spacing } } = tokens

// Props interface for the Footer component
export interface FooterProps {
  /** Logo source path - defaults to white logo */
  logoSrc?: string
  /** Logo alt text - defaults to "Common Origin Logo" */
  logoAlt?: string
}

const FooterStyled = styled.footer`
  background-color: ${color.background.emphasis};
  color: ${color.text.inverse};
  width: 100%;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${spacing.layout['2xl']} 0;
`

const LogoLink = styled(Link)<{ $isActive: boolean }>`
  margin-right: ${spacing.layout.lg};
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

export const Footer: React.FC<FooterProps> = ({
  logoSrc = "/assets/logo/co-logo-white.svg",
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
            <LogoImage src={logoSrc} alt="" />
          </LogoLink>
        </FooterContent>
      </Container>
    </FooterStyled>
  )
}