import { Alert, Button, Checkbox, Stack, StatusLabel, TextField, Typography } from '../components'

// The same controls in one theme (decisions 0054 and 0056, #360), for the dark mode guide.
// Docs site only: not part of the package.
export function ThemePreview({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div
      data-co-theme={theme}
      style={{
        padding: 'var(--co-semantic-space-inset-lg)',
        background: 'var(--co-semantic-surface-base)',
        color: 'var(--co-semantic-color-text-default)',
        border: 'var(--co-semantic-border-default)',
        borderRadius: 'var(--co-semantic-radius-md)',
      }}
    >
      <Stack direction="column" gap="md">
        <Typography variant="h6">{theme === 'light' ? 'Light' : 'Dark'}</Typography>
        <Stack direction="row" gap="sm" wrap>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
        </Stack>
        <TextField label="Payee" placeholder="Name or account" />
        <Checkbox label="Remember this payee" checked onChange={() => undefined} />
        <Stack direction="row" gap="sm" wrap>
          <StatusLabel status="completed" />
          <StatusLabel status="failed" />
        </Stack>
        <Alert variant="info" title="Statement ready">Your November statement is ready to download.</Alert>
      </Stack>
    </div>
  )
}
