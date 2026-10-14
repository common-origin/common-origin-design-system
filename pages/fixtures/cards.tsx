import Head from 'next/head'
import type { ReactNode } from 'react'
import { AccountCard, CardLarge, CardSmall, Picture, Stack, Typography } from '../../src/components'

// Test fixture for e2e/card-states.spec.ts (#185): every clickable card, and a CardLarge whose image
// isn't clickable, so the spec can check hover, pressed and focus in a browser. Each case is wrapped
// in a `data-card` element. Not part of the docs navigation, and not indexed.
const Case = ({ id, children }: { id: string; children: ReactNode }) => (
  <div data-card={id} style={{ width: 320 }}>{children}</div>
)

const image = '/assets/art/art-2.jpg'

export default function CardsFixture() {
  return (
    <>
      <Head>
        <title>Card states fixture</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{ padding: 32 }}>
        <Typography variant="h1">Card states fixture</Typography>
        <Stack direction="row" gap="lg" wrap alignItems="flex-start">
          <Case id="card-small">
            <CardSmall title="Small card" picture={image} meta="Meta" href="#small" />
          </Case>
          <Case id="card-large">
            <CardLarge title="Large card" excerpt="Its image is a link." picture={image} imageHref="#large" />
          </Case>
          <Case id="card-large-static">
            <CardLarge title="Static large card" excerpt="Its image is not a link." picture={image} />
          </Case>
          <Case id="picture-button">
            <Picture title="Clickable picture" src={image} onClick={() => undefined} />
          </Case>
          <Case id="account-card">
            <AccountCard accountType="checking" accountName="Everyday" balance={1250} onClick={() => undefined} />
          </Case>
        </Stack>
      </main>
    </>
  )
}
