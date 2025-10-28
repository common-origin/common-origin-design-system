import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import { Container } from '../components/atoms/Container'
import { IconButton } from '../components/atoms/IconButton'
import { Typography } from '../components/atoms/Typography'
import tokens from '@/styles/tokens.json'

const { base: { spacing }, semantic: { border, color } } = tokens

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${border.default};

  @media (min-width: ${tokens.base.breakpoint.md}) {
    justify-content: flex-start;
  }
`

const MobileNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[4]} 0;
  width: 100%;
  z-index: ${tokens.base.zIndex[6]};

  @media (min-width: ${tokens.base.breakpoint.md}) {
    display: none;
  }
`

const NavigationWrapperDefault = styled.div`
  background-color: ${color.background.default};
  transition: all 0.3s ease-in-out;
  display: none;
  z-index: ${tokens.base.zIndex[8]};
  width: 100%;

  @media (min-width: ${tokens.base.breakpoint.md}) {
    display: flex;
  }
`

const LogoLink = styled(Link)<{ $isActive: boolean }>`
  margin-right: auto;
  text-decoration: ${props => props.$isActive ? 'underline' : 'none'};
  
  @media (max-width: calc(${tokens.base.breakpoint.md} - 1px)) {
    margin-right: 0;
  }
`

const LogoImage = styled.img`
  height: auto;
  width: auto;
`

const DesktopNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`

const DesktopNavMenu = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`

const DesktopNavLink = styled(Link)<{ $isActive: boolean }>`
  padding: ${spacing[6]} ${spacing[12]};
  border-left: ${border.default};
  background-color: ${color.background.default};
  transition: background-color 0.15s ease-in-out;
  text-decoration: ${props => props.$isActive ? 'underline' : 'none'};

  &:last-child {
    border-right: ${border.default};
  }

  &:hover {
    background-color: ${color.background.surface};
  }
`

const MobileNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  z-index: ${tokens.base.zIndex[6]};
`

const SidePanel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100vw;
  background-color: ${color.background.default};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.15s ease-in-out;
  z-index: ${tokens.base.zIndex[6]};

  @media (min-width: ${tokens.base.breakpoint.md}) {
    display: none;
  }
`

const MobileMenuItems = styled.nav`
  display: flex;
  flex-direction: column;
  position: relative;
`

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  padding: ${spacing[2]} 0;
  margin-bottom: ${spacing[4]};
  text-decoration: ${props => props.$isActive ? 'underline' : 'none'};
  color: ${color.text.default};

  &:hover {
    text-decoration: underline;
  }
`

const MobileCloseButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: ${spacing[4]};
`

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { asPath } = router

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <NavigationWrapper>
      <MobileNavWrapper>
        <Container>
          <MobileNav>
            <LogoLink href="/" $isActive={asPath === '/'}>
              <LogoImage src="/assets/logo/co-logo.svg" alt="Common Origin Logo" />
            </LogoLink>
            <IconButton onClick={toggleMenu} iconName="menu" variant="naked" size="large" aria-label="Toggle navigation menu" />
          </MobileNav>
        </Container>
      </MobileNavWrapper>
      <SidePanel $isOpen={isMenuOpen}>
        <Container>
          <MobileMenuItems>
            <MobileCloseButton onClick={toggleMenu} iconName="close" variant="naked" size="large" aria-label="Close navigation menu" />
            <LogoLink href="/" $isActive={asPath === '/'}>
              <LogoImage src="/assets/logo/co-logo.svg" alt="Common Origin Logo" />
            </LogoLink>
            <MobileNavLink href="/components" $isActive={asPath === '/components'}>
              <Typography variant="h6" color="default">Components</Typography>
            </MobileNavLink>
            <MobileNavLink href="/patterns" $isActive={asPath === '/patterns'}>
              <Typography variant="h6" color="default">Patterns</Typography>
            </MobileNavLink>
            <MobileNavLink href="/tokens" $isActive={asPath === '/tokens'}>
              <Typography variant="h6" color="default">Tokens</Typography>
            </MobileNavLink>
            <MobileNavLink href="/releases" $isActive={asPath === '/releases'}>
              <Typography variant="h6" color="default">Releases</Typography>
            </MobileNavLink>
          </MobileMenuItems>
        </Container>
      </SidePanel>
      <NavigationWrapperDefault>
        <Container>
          <DesktopNav>
            <LogoLink href="/" $isActive={asPath === '/'}>
              <LogoImage src="/assets/logo/co-logo.svg" alt="Common Origin Logo" />
            </LogoLink>
            <DesktopNavMenu>
              <DesktopNavLink href="/components" $isActive={asPath === '/components'}>
                <Typography variant="subtitle" color={asPath === '/components' ? 'default' : 'subdued'}>Components</Typography>
              </DesktopNavLink>
              <DesktopNavLink href="/patterns" $isActive={asPath === '/patterns'}>
                <Typography variant="subtitle" color={asPath === '/patterns' ? 'default' : 'subdued'}>Patterns</Typography>
              </DesktopNavLink>
              <DesktopNavLink href="/tokens" $isActive={asPath === '/tokens'}>
                <Typography variant="subtitle" color={asPath === '/tokens' ? 'default' : 'subdued'}>Tokens</Typography>
              </DesktopNavLink>
              <DesktopNavLink href="/releases" $isActive={asPath === '/releases'}>
                <Typography variant="subtitle" color={asPath === '/releases' ? 'default' : 'subdued'}>Releases</Typography>
              </DesktopNavLink>
            </DesktopNavMenu>
          </DesktopNav>
        </Container>
      </NavigationWrapperDefault>
    </NavigationWrapper>
  )
}
