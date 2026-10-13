import Head from 'next/head'
import { useState, type ReactNode } from 'react'
import {
  Badge,
  BooleanChip,
  Button,
  CategoryLabel,
  Checkbox,
  Chip,
  Dropdown,
  IconButton,
  InputChip,
  List,
  ListItem,
  ProgressBar,
  SearchField,
  Slider,
  Stack,
  StatusLabel,
  TabBar,
  Tag,
  Typography,
} from '../../src/components'

// Test fixture for e2e/forced-colors.spec.ts (decision 0038): every control whose edge or state
// is drawn with a fill, in each state, so the forced-colours checks and screenshots cover them.
// Each case is wrapped in a `data-fc` element (display: contents, so layout is unaffected) for
// the spec to find. Not part of the docs navigation, and not indexed.
const Case = ({ id, children }: { id: string; children: ReactNode }) => (
  <span data-fc={id} style={{ display: 'contents' }}>{children}</span>
)

export default function ForcedColorsFixture() {
  const [tab, setTab] = useState('one')
  const [dropdown, setDropdown] = useState('apple')
  const [search, setSearch] = useState('')

  return (
    <>
      <Head>
        <title>Forced colours fixture</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{ padding: 24 }}>
        <Stack direction="column" gap="lg">
          <Typography variant="h2">Forced colours fixture</Typography>

          <section aria-label="Buttons">
            <Stack direction="row" gap="sm" wrap>
              <Case id="button-primary"><Button variant="primary">Primary</Button></Case>
              <Case id="button-secondary"><Button variant="secondary">Secondary</Button></Case>
              <Case id="button-accent"><Button variant="accent">Accent</Button></Case>
              <Case id="button-danger"><Button variant="danger">Danger</Button></Case>
              <Case id="button-naked"><Button variant="naked">Naked</Button></Case>
              <Case id="button-disabled"><Button variant="primary" disabled>Disabled primary</Button></Case>
            </Stack>
          </section>

          <section aria-label="Icon buttons">
            <Stack direction="row" gap="sm">
              <Case id="iconbutton-primary"><IconButton variant="primary" iconName="close" aria-label="Primary icon" /></Case>
              <Case id="iconbutton-secondary"><IconButton variant="secondary" iconName="close" aria-label="Secondary icon" /></Case>
              <Case id="iconbutton-naked"><IconButton variant="naked" iconName="close" aria-label="Naked icon" /></Case>
              <Case id="iconbutton-disabled"><IconButton variant="primary" iconName="close" aria-label="Disabled icon" disabled /></Case>
            </Stack>
          </section>

          <section aria-label="Chips">
            <Stack direction="row" gap="sm" wrap>
              <Case id="chip-static"><Chip>Static chip</Chip></Case>
              <Case id="chip-filter"><BooleanChip selected={false} onClick={() => {}}>Unselected filter</BooleanChip></Case>
              <Case id="chip-filter-selected"><BooleanChip selected onClick={() => {}}>Selected filter</BooleanChip></Case>
              <Case id="chip-input"><InputChip onDismiss={() => {}}>Removable value</InputChip></Case>
              <Case id="chip-input-selected"><InputChip selected onDismiss={() => {}}>Selected value</InputChip></Case>
            </Stack>
          </section>

          <section aria-label="Tabs">
            <Case id="tabs">
              <TabBar
                tabs={[{ id: 'one', label: 'First tab' }, { id: 'two', label: 'Second tab' }]}
                activeTab={tab}
                onTabChange={setTab}
              />
            </Case>
          </section>

          <section aria-label="Checkboxes">
            <Stack direction="column" gap="sm">
              <Case id="checkbox"><Checkbox label="Unchecked box" checked={false} onChange={() => {}} /></Case>
              <Case id="checkbox-checked"><Checkbox label="Checked box" checked onChange={() => {}} /></Case>
              <Case id="checkbox-indeterminate"><Checkbox label="Indeterminate box" indeterminate onChange={() => {}} /></Case>
              <Case id="checkbox-disabled"><Checkbox label="Disabled box" disabled checked={false} onChange={() => {}} /></Case>
              <Case id="checkbox-disabled-checked"><Checkbox label="Disabled checked box" disabled checked onChange={() => {}} /></Case>
            </Stack>
          </section>

          <section aria-label="Progress and slider">
            <Stack direction="column" gap="md">
              <Case id="progress"><ProgressBar value={60} /></Case>
              <Case id="slider"><Slider label="Volume" defaultValue={40} /></Case>
            </Stack>
          </section>

          <section aria-label="Indicators and labels">
            <Stack direction="row" gap="md" wrap alignItems="center">
              <Case id="badge-count"><Badge count={3}><Button variant="secondary">Inbox</Button></Badge></Case>
              <Case id="badge-dot"><Badge dot count={1}><Button variant="secondary">Updates</Button></Badge></Case>
              <Case id="status-label"><StatusLabel status="completed" /></Case>
              <Case id="tag"><Tag>Tag</Tag></Case>
              <Case id="category-label"><CategoryLabel color="blue">Category</CategoryLabel></Case>
            </Stack>
          </section>

          <section aria-label="Lists and fields">
            <Stack direction="column" gap="md">
              <List>
                <Case id="row"><ListItem primary="Unselected row" interactive onClick={() => {}} /></Case>
                <Case id="row-selected"><ListItem primary="Selected row" secondary="Secondary text" interactive selected onClick={() => {}} /></Case>
                <Case id="row-static"><ListItem primary="Static row" /></Case>
              </List>
              <Case id="dropdown">
                <Dropdown
                  label="Fruit"
                  value={dropdown}
                  onChange={setDropdown}
                  options={[{ id: 'apple', label: 'Apple' }, { id: 'pear', label: 'Pear' }]}
                />
              </Case>
              <Case id="search"><SearchField value={search} onChange={setSearch} placeholder="Search" /></Case>
            </Stack>
          </section>
        </Stack>
      </main>
    </>
  )
}
