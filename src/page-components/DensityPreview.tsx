import { useState } from 'react'
import { Button, Dropdown, IconButton, Stack, TextField, Typography } from '../components'

// The same controls in one density context (decision 0032, #191), for the density guide and its
// browser test. Docs site only: not part of the package.
export type Density = 'compact' | 'default' | 'comfortable'

const options = [
  { id: 'all', label: 'All accounts' },
  { id: 'everyday', label: 'Everyday' },
]

export function DensityPreview({ density }: { density: Density }) {
  const [account, setAccount] = useState('all')
  return (
    <div data-co-density={density} data-density-preview={density}>
      <Stack direction="column" gap="md">
        <Typography variant="h6">{density}</Typography>
        <Stack direction="row" gap="sm" alignItems="center" wrap>
          <Button size="small" variant="secondary">Small</Button>
          <Button size="medium" variant="secondary">Medium</Button>
          <Button size="large">Large</Button>
          <IconButton variant="secondary" size="small" iconName="search" aria-label="Search" />
        </Stack>
        <TextField label="Payee" placeholder="Name or account" />
        <Dropdown label="Account" options={options} value={account} onChange={setAccount} />
      </Stack>
    </div>
  )
}
