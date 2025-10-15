import Link from 'next/link'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const HeaderTitle = styled.h2`
  font-size: ${tokens.base.fontSize[7]};
  color: ${tokens.base.color.neutral[700]};
  font-weight: ${tokens.base.fontWeight[5]};
  letter-spacing: ${tokens.base.letterSpacing[1]};
  line-height: ${tokens.base.lineHeight[5]};
  margin-bottom: ${tokens.base.spacing[20]};
  margin-top: ${tokens.base.spacing[8]};
  
  @media (min-width: ${tokens.base.breakpoint.md}) {
    font-size: ${tokens.base.fontSize[9]};
    letter-spacing: ${tokens.base.letterSpacing[0]};
  }
`

const HeaderLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`

export const Header = () => {
  return (
    <HeaderTitle>
      <Link href="/" passHref legacyBehavior>
        <HeaderLink>
          Home
        </HeaderLink>
      </Link>
      .
    </HeaderTitle>
  )
}