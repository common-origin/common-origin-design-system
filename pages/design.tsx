import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../interfaces/post'
import styled from 'styled-components'
import Link from 'next/link'
import { 
  Box,
  Breadcrumbs,
  Container,
  DesignGrid,
  Grid,
  GridCol,
  Icon,
  Layout,
  Navigation,
  SectionSeparator,
  Stack,
  Typography,
} from '../components'
import tokens from '@/styles/tokens.json'

const { base: { breakpoint }, semantic: { color, spacing } } = tokens

const DesignSystemCard = styled(Link)`
  display: block;
  background-color: ${color.background.emphasis};
  border-radius: ${tokens.base.border.radius[4]};
  padding: ${spacing.layout['2xl']};
  text-decoration: none;
  transition: ${tokens.semantic.motion.hover};

  &:hover {
    background-color: ${tokens.component.button.hover.backgroundColor};
  }
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${spacing.layout.lg};
  }
`

type Props = {
  allPosts: Post[]
}

export default function Design({ allPosts }: Props) {
  const morePosts = allPosts
  return (
    <>
      <Layout>
        <Head>
          <title>{`Common Origin website`}</title>
        </Head>
        <Navigation/>
        <Breadcrumbs breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Design', url: '/design' }]} />
        <section>
          <Container>
            <Box my="4xl">
              <Typography variant="h1">Design</Typography>
            </Box>
            <SectionSeparator />
            <Box bg="surface" p='2xl' borderRadius='4'>              
              <Grid cols={3} gap="6">
                <GridCol span={3} spanMd={1}>
                  <Typography variant="h2">Common Origin</Typography>
                  <Typography variant="h4" color="subdued">Design System</Typography>
                </GridCol>
                <GridCol span={3} spanMd={1}>
                  <DesignSystemCard href="/design/components">
                    <Stack direction="row" gap="sm" alignItems="center" justifyContent="space-between">
                      <Typography color="inverse" variant="h4">Components</Typography>
                      <Icon name="directionRight" size="xl" />
                    </Stack>
                  </DesignSystemCard>
                </GridCol>
                
                <GridCol span={3} spanMd={1}>
                  <DesignSystemCard href="/design/tokens">
                    <Stack direction="row" gap="sm" alignItems="center" justifyContent="space-between">
                      <Typography color="inverse" variant="h4">Design tokens</Typography>
                      <Icon name="directionRight" size="xl" />
                    </Stack>
                  </DesignSystemCard>
                </GridCol>
                
              </Grid>
            </Box>
          </Container>
        </section>
        <SectionSeparator />
        {morePosts.length > 0 && <DesignGrid posts={morePosts} />}
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'labels',
    'tag',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
