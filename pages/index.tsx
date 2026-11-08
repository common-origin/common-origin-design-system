import Head from 'next/head'
import styled from 'styled-components'
import { Button, Stack, Typography } from '../src/page-components'
import tokens from '@/lib/cssTokens'


const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${tokens.semantic.space[500]};
  background-color: ${tokens.semantic.surface.base};
`

const ContentCard = styled.div`
  text-align: center;
  max-width: 600px;
  padding: ${tokens.semantic.space[600]};
  background-color: ${tokens.semantic.surface.raised};
  border-radius: ${tokens.base.border.radius[4]};
  box-shadow: ${tokens.base.shadow[3]};
`

export default function Home() {

  return (
    <>
      <Head>
        <title>Common Origin Design System</title>
        <meta name="description" content="A production-ready React design system: components and tokens built to WCAG 2.2 AA" />
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
                React components and design tokens, built to WCAG 2.2 AA
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
                url="/patterns" 
                variant="secondary" 
                size="large"
              >
                Design Patterns
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