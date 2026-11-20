import { useState } from 'react'
import Head from 'next/head'
import { List, ListItem } from '../../src/components'

// Test fixture for e2e/list-item.spec.ts (#390): an expandable ListItem whose content is taller
// than the old 1000px cap. Not part of the docs navigation, and not indexed.
export default function ListItemFixture() {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <Head>
        <title>ListItem fixture</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{ maxWidth: 480 }}>
        <List>
          <ListItem
            primary="Tall details"
            expandable
            expanded={expanded}
            onToggle={() => setExpanded((open) => !open)}
          >
            <div data-testid="tall-content" style={{ height: 1600 }}>
              Content taller than 1000px
            </div>
            <a href="#end" data-testid="last-link">Last link</a>
          </ListItem>
        </List>
      </main>
    </>
  )
}
