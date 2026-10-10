import Head from 'next/head'
import styled from 'styled-components'
import {
  Badge,
  BooleanChip,
  Box,
  Breadcrumbs,
  Button,
  CategoryLabel,
  Chip,
  Container,
  InputChip,
  Layout,
  Navigation,
  Stack,
  StatusLabel,
  Tag,
  Typography,
} from '../../src/page-components'
import tokens from '@/styles/tokens.json'

const { semantic } = tokens

const PageWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

// The table scrolls sideways on narrow screens instead of squeezing its columns
const TableScroll = styled.div`
  overflow-x: auto;
  /* A flex child: without these it grows to the table's width and gets clipped instead */
  min-width: 0;
  max-width: 100%;
`

const Table = styled.table`
  min-width: 640px;
  width: 100%;
  border-collapse: collapse;
  font: ${semantic.typography.small};
  color: ${semantic.color.text.default};

  th,
  td {
    text-align: left;
    vertical-align: middle;
    padding: ${semantic.spacing.layout.md} ${semantic.spacing.layout.sm};
    border-bottom: ${semantic.border.default};
  }

  th {
    font: ${semantic.typography.label};
    color: ${semantic.color.text.subdued};
  }
`

// One row per label-like component: what it's for, what it isn't for, and a live example.
// The guidance follows decisions 0016, 0018 and 0029.
const rows = [
  {
    name: 'Badge',
    use: 'A count or a dot anchored to another element, such as a button, tab or icon.',
    avoid: 'Standalone labels or status text. Use StatusLabel or Tag.',
    example: (
      <Badge count={3} aria-label="3 unread messages">
        <Button variant="secondary" size="small">Inbox</Button>
      </Badge>
    ),
  },
  {
    name: 'StatusLabel',
    use: 'The status of something: pending, completed, failed and so on. Always shows an icon, so status never relies on colour alone.',
    avoid: 'Categories or neutral metadata. Status colours mean status.',
    example: <StatusLabel status="completed" liveRegion={false} />,
  },
  {
    name: 'CategoryLabel',
    use: "Colour-codes an item's category, such as a transaction's, with an optional icon. Category colours carry no status meaning.",
    avoid: 'Status (use StatusLabel) or neutral metadata (use Tag).',
    example: <CategoryLabel color="blue">Groceries</CategoryLabel>,
  },
  {
    name: 'Tag',
    use: 'Neutral metadata in dense layouts: default, or emphasis (near-black) to make one stand out.',
    avoid: 'Status: its success, warning and error variants are deprecated, and so is interactive.',
    example: (
      <Stack direction="row" gap="sm" alignItems="center">
        <Tag>v2.17</Tag>
        <Tag variant="emphasis">New</Tag>
      </Stack>
    ),
  },
  {
    name: 'Chip',
    use: 'A static, chip-shaped label. Only the default look stays in 3.0.',
    avoid: 'Anything clickable. Use a Button, or one of the interactive chips below.',
    example: <Chip>Design</Chip>,
  },
  {
    name: 'BooleanChip (FilterChip in 3.0)',
    use: 'Toggles a filter on and off. Selected shows light blue with a checkmark.',
    avoid: 'Applied values the user can remove. Use InputChip.',
    example: (
      <BooleanChip selected onClick={() => {}}>
        Open now
      </BooleanChip>
    ),
  },
  {
    name: 'InputChip',
    use: 'A value the user has added and can remove, such as an applied filter.',
    avoid: 'On/off toggles. Use BooleanChip.',
    example: <InputChip onDismiss={() => {}}>Under $20</InputChip>,
  },
]

export default function LabelGuidePage() {
  return (
    <>
      <Head>
        <title>Which label do I use? | Common Origin Design System</title>
        <meta
          name="description"
          content="How to choose between Badge, StatusLabel, CategoryLabel, Tag and the chips in the Common Origin Design System."
        />
      </Head>
      <Layout>
        <Navigation />
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Home', url: '/' },
            { label: 'Components', url: '/components' },
            { label: 'Which label do I use?', url: '/guides/labels' },
          ]}
        />
        <section>
          <Container>
            <PageWrapper>
              <Box my="4xl">
                <Stack direction="column" gap="lg">
                  <Typography variant="h1">Which label do I use?</Typography>
                  <Typography variant="body" color="subdued">
                    Several components show a short piece of text or a number. Each has one job. Pick by what the
                    label means, not by how it looks.
                  </Typography>

                  <TableScroll>
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col">Component</th>
                        <th scope="col">Use for</th>
                        <th scope="col">Not for</th>
                        <th scope="col">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.name}>
                          <th scope="row">{row.name}</th>
                          <td>{row.use}</td>
                          <td>{row.avoid}</td>
                          <td>{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  </TableScroll>

                  <Typography variant="h3">Sizes</Typography>
                  <Typography variant="body" color="subdued">
                    Labels share one height scale: small 20px, medium 24px and large 32px. StatusLabel and Tag take
                    small and medium; CategoryLabel takes medium and large.
                  </Typography>

                  <Typography variant="caption" color="subdued">
                    Decisions 0016, 0018 and 0029 in the design system foundation.
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
