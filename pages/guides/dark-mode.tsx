import Head from 'next/head'
import styled from 'styled-components'
import { Box, Breadcrumbs, CodeBlock, Container, Layout, Navigation, Stack, Typography } from '../../src/page-components'
import { ThemePreview } from '../../src/page-components/ThemePreview'

const PageWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

// Two columns side by side, stacking on narrow screens
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`

const setup = `// Once, at the root of the app: the CSS variables the modes switch
import '@common-origin/design-system/tokens.css'

// Then on any element: everything inside it takes the dark theme
<html data-co-theme="dark">`

const followSystem = `// tokens.css never turns dark by itself. To follow the device setting,
// set the attribute in <head>, before the page paints, so there's no flash:
<script>
  document.documentElement.setAttribute(
    'data-co-theme',
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
</script>`

export default function DarkModeGuidePage() {
  return (
    <>
      <Head>
        <title>Dark mode | Common Origin Design System</title>
        <meta
          name="description"
          content="How the Common Origin Design System's dark theme works, and how a product turns it on with data-co-theme."
        />
      </Head>
      <Layout>
        <Navigation />
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Home', url: '/' },
            { label: 'Tokens', url: '/tokens' },
            { label: 'Dark mode', url: '/guides/dark-mode' },
          ]}
        />
        <section>
          <Container>
            <PageWrapper>
              <Box my="4xl">
                <Stack direction="column" gap="lg">
                  <Typography variant="h1">Dark mode</Typography>
                  <Typography variant="body" color="subdued">
                    Dark mode is a theme, not a prop. Set it on any element and everything inside it takes the dark
                    colours: a whole app, or one region. Components don&apos;t change; the tokens they read do. This site
                    uses it: pick a theme from the menu in the header.
                  </Typography>

                  <Columns>
                    <ThemePreview theme="light" />
                    <ThemePreview theme="dark" />
                  </Columns>

                  <Typography variant="h3">Set it up</Typography>
                  <CodeBlock>{setup}</CodeBlock>
                  <Typography variant="body" color="subdued">
                    Without <code>tokens.css</code>, or without the attribute, everything renders light. Themes nest: a{' '}
                    <code>data-co-theme=&quot;light&quot;</code> inside a dark region resets it. Density and theme can be
                    set on the same element.
                  </Typography>
                  <CodeBlock>{followSystem}</CodeBlock>

                  <Typography variant="h3">How it works</Typography>
                  <Typography variant="body" color="subdued">
                    Each colour step keeps its job in both themes: step 100 is the page and 1200 is primary text, light
                    or dark. One set of rules gives both themes the rest. Solid fills sit where their label reads at the
                    contrast secondary text has with the page. Fills on a surface are translucent, so they show on the
                    page, a card or a dialog. Surfaces get lighter as they rise. The theme supplies only its grey scale,
                    how strongly the scrim dims the page, and how strong shadows are.
                  </Typography>

                  <Typography variant="h3">Accessibility</Typography>
                  <Typography variant="body" color="subdued">
                    Every pairing meets WCAG 2.2 AA in both themes: text at 4.5:1 or more on every surface and fill,
                    including hover and pressed states, and control edges at 3:1. The tokens page shows each colour&apos;s
                    light and dark value.
                  </Typography>

                  <Typography variant="h3">Status</Typography>
                  <Typography variant="body" color="subdued">
                    The docs site is the first to use it. Browser checks of every component in both themes are still to
                    come, so products shouldn&apos;t turn it on yet.
                  </Typography>

                  <Typography variant="caption" color="subdued">
                    Decisions 0054 (the theme mode) and 0056 (one set of colour rules) in the design system foundation.
                  </Typography>
                </Stack>
              </Box>
            </PageWrapper>
          </Container>
        </section>
      </Layout>
    </>
  )
}
