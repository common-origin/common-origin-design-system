import Head from 'next/head'
import styled from 'styled-components'
import { Button, Stack, Typography } from '../src/components'
import tokens from '../src/styles/tokens.json'

const { semantic: { color, spacing } } = tokens

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${spacing.layout.xl};
  background-color: ${color.background.default};
`

const ContentCard = styled.div`
  text-align: center;
  max-width: 600px;
  padding: ${spacing.layout['2xl']};
  background-color: ${color.background.subtle};
  border-radius: ${tokens.base.border.radius[4]};
  box-shadow: ${tokens.base.shadow[3]};
`

export default function Home() {

  return (
    <>
      <Head>
        <title>Common Origin Design System</title>
        <meta name="description" content="A production-ready design system with atomic components and WCAG 2.2 AA accessibility compliance" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CenteredContainer>
        <ContentCard>
          <Stack direction="column" gap="xl" alignItems="center">
            <Stack direction="column" gap="md" alignItems="center">
              <Typography variant="h1" color="default">
                Common Origin Design System
              </Typography>
              <Typography variant="body" color="subdued">
                A comprehensive design system with atomic components and WCAG 2.2 AA accessibility compliance
              </Typography>
            </Stack>
            
            <Stack direction="row" gap="lg" alignItems="center">
              <Button 
                purpose="link" 
                url="/components" 
                variant="primary" 
                size="large"
              >
                View Components
              </Button>
              
              <Button 
                purpose="link" 
                url="/tokens" 
                variant="secondary" 
                size="large"
              >
                Design Tokens
              </Button>
            </Stack>
          </Stack>
        </ContentCard>
      </CenteredContainer>
    </>
  )
}