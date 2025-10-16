import React from 'react'
import styled from 'styled-components'
import { Meta } from './Meta'
import { ComponentErrorBoundary } from './ErrorBoundaries'
import { Footer } from './Footer'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const LayoutContainer = styled.div`
  min-height: 100vh;
`

const Main = styled.main`
  width: 100%;
`

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Meta />
      <LayoutContainer>
        <Main>{children}</Main>
      </LayoutContainer>
      <ComponentErrorBoundary componentName="Footer">
        <Footer />
      </ComponentErrorBoundary>
    </>
  )
}
