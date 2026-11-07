import Head from 'next/head'
import { SidebarNav, SidebarNavItem, SidebarNavSection } from '../../src/components'

// Test fixture for e2e/sidebar-nav.spec.ts (#331): a SidebarNav at default density and one in a
// compact region. Not part of the docs navigation, and not indexed.
function Items() {
  return (
    <>
      <SidebarNavItem label="New chat" icon="edit" onClick={() => {}} />
      <SidebarNavItem label="Home" icon="home" url="#home" current />
      <SidebarNavItem label="Invite users" icon="userBox" url="#invite" meta="3/10" />
      <SidebarNavSection label="Chats" collapsible>
        <SidebarNavItem label="Supplier records" url="#chat-1" />
        <SidebarNavItem label="Flavour page ticket" icon="message" url="#chat-2" />
      </SidebarNavSection>
    </>
  )
}

export default function SidebarNavFixture() {
  return (
    <>
      <Head>
        <title>SidebarNav fixture</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{ display: 'flex', height: 480 }}>
        <SidebarNav label="Default">
          <Items />
        </SidebarNav>
        <div data-co-density="compact" style={{ display: 'flex', marginLeft: 40 }}>
          <SidebarNav label="Compact">
            <Items />
          </SidebarNav>
        </div>
      </main>
    </>
  )
}
