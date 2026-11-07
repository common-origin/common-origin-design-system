import Head from 'next/head'
import { Button, Menu, MenuDivider, MenuGroup, MenuItem, MenuItemRadio } from '../../src/components'

// Test fixture for e2e/menu.spec.ts (#329): a menu at the bottom of the page, which has to flip
// above its trigger, inside a compact density region. Not part of the docs navigation, and not
// indexed.
export default function MenuFixture() {
  return (
    <>
      <Head>
        <title>Menu fixture</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main data-co-density="compact">
        <div style={{ position: 'fixed', bottom: 8, left: 200 }}>
          <Menu trigger={<Button variant="secondary">Options</Button>} data-testid="menu">
            <MenuGroup label="Workspaces">
              <MenuItemRadio checked>Creamery Ops</MenuItemRadio>
              <MenuItemRadio checked={false}>Flavour Lab</MenuItemRadio>
            </MenuGroup>
            <MenuDivider />
            <MenuItem>Rename</MenuItem>
            <MenuItem destructive>Delete</MenuItem>
          </Menu>
        </div>
      </main>
    </>
  )
}
