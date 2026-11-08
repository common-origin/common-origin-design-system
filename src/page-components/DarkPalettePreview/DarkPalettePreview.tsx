import { useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  CategoryLabel,
  Checkbox,
  IconButton,
  ProgressBar,
  Slider,
  Stack,
  StatusLabel,
  TabBar,
  Tag,
  TextField,
  Typography,
} from '../../components'
import baseTokens from '../../tokens/base/index.json'
import darkTokens from '../../tokens/modes/theme/dark.json'
import { contrastRatio } from './contrast'
import { darkPreviewCss, darkPreviewSelector } from './darkPreviewCss'

// The review page for the dark palette (#357, decision 0054): the generated dark ramps beside the
// light ones, and the same components in a light and a dark region. Docs site only: not part of
// the package. Replaced by the docs site's real theme toggle in #360.

const STEPS = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200'] as const
const RAMPS = ['gray', 'accent', 'success', 'warning', 'serious', 'danger', 'ai', 'olive', 'periwinkle', 'rose', 'magenta'] as const
const FILL_RAMPS = ['accent', 'success', 'warning', 'serious', 'danger'] as const

type Step = (typeof STEPS)[number]
type Ramp = (typeof RAMPS)[number]
type TokenLeaf = { $value: string; $description?: string }
type RampTokens = Record<Step, TokenLeaf> & { $extensions?: { 'studio.commonorigin'?: { fillStep?: Step; fillStepContrast?: number } } }

const light = baseTokens.base.color as unknown as Record<string, RampTokens>
const dark = darkTokens.base.color as unknown as Record<string, RampTokens>
const white = (baseTokens.base.color.white as TokenLeaf).$value
const darkSelectorValue = darkPreviewSelector.match(/"(.*)"/)?.[1] ?? 'dark'

const mono = { fontFamily: 'var(--co-semantic-font-family-mono, monospace)', fontSize: 11 }

function Swatch({ hex, label, page }: { hex: string; label: string; page: string }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ background: hex, height: 40, borderRadius: 4, outline: '1px solid rgba(128, 128, 128, 0.25)' }} />
      <div style={{ ...mono, marginTop: 4, color: 'var(--co-semantic-color-text-muted)' }}>
        {label} {hex}
        <br />
        {contrastRatio(hex, page).toFixed(2)}:1
      </div>
    </div>
  )
}

function RampRow({ ramp, theme }: { ramp: Ramp; theme: 'light' | 'dark' }) {
  const tokens = theme === 'light' ? light : dark
  const page = theme === 'light' ? white : dark.gray['100'].$value
  return (
    <div
      {...(theme === 'dark' ? { 'data-co-preview-theme': darkSelectorValue } : {})}
      style={{ padding: 12, background: theme === 'light' ? white : page }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(56px, 1fr))', gap: 6 }}>
        {STEPS.map((step) => (
          <Swatch key={step} hex={tokens[ramp][step].$value} label={step} page={page} />
        ))}
      </div>
    </div>
  )
}

function Region({ theme, children }: { theme: 'light' | 'dark'; children: React.ReactNode }) {
  return (
    <div
      {...(theme === 'dark' ? { 'data-co-preview-theme': darkSelectorValue } : {})}
      style={{
        flex: '1 1 360px',
        padding: 24,
        background: 'var(--co-semantic-surface-base)',
        color: 'var(--co-semantic-color-text-default)',
        borderRadius: 8,
        outline: '1px solid var(--co-semantic-color-border-default)',
      }}
    >
      {children}
    </div>
  )
}

function Components({ theme }: { theme: 'light' | 'dark' }) {
  const [tab, setTab] = useState('overview')
  const [checked, setChecked] = useState(true)
  const [amount, setAmount] = useState(40)
  return (
    <Region theme={theme}>
      <Stack direction="column" gap="lg">
        <Typography variant="h4">{theme === 'light' ? 'Light' : 'Dark'}</Typography>
        <Stack direction="row" gap="sm" wrap>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="naked">Naked</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="danger">Danger</Button>
          <IconButton variant="secondary" iconName="search" aria-label="Search" />
        </Stack>
        <TabBar
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'activity', label: 'Activity' },
            { id: 'settings', label: 'Settings' },
          ]}
          activeTab={tab}
          onTabChange={setTab}
        />
        <TextField label="Payee" placeholder="Name or account" />
        <Checkbox label="Remember this payee" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <Slider label="Amount" value={amount} onChange={setAmount} />
        <ProgressBar value={60} />
        <Stack direction="row" gap="sm" wrap alignItems="center">
          <StatusLabel status="completed" />
          <StatusLabel status="processing" />
          <StatusLabel status="failed" />
          <StatusLabel status="pending" />
          <Badge count={3} aria-label="3 new">
            <IconButton variant="naked" iconName="search" aria-label="Inbox" />
          </Badge>
          <Badge count={12} variant="accent" aria-label="12 new">
            <IconButton variant="naked" iconName="search" aria-label="Updates" />
          </Badge>
          <Tag>Default</Tag>
          <Tag variant="emphasis">Emphasis</Tag>
        </Stack>
        <Stack direction="row" gap="sm" wrap>
          {(['olive', 'periwinkle', 'rose', 'magenta', 'gray'] as const).map((c) => (
            <CategoryLabel key={c} color={c}>
              {c}
            </CategoryLabel>
          ))}
        </Stack>
        <Alert variant="info" title="Information">Your statement is ready.</Alert>
        <Alert variant="success" title="Saved">The payee was added.</Alert>
        <Alert variant="warning" title="Check this">The amount is higher than usual.</Alert>
        <Alert variant="error" title="Payment failed">Try again or use another account.</Alert>
        <Typography variant="body">
          Body text in the default colour, <a href="#ramps">a link</a>, and{' '}
          <span style={{ color: 'var(--co-semantic-color-text-muted)' }}>secondary text</span>.
        </Typography>
      </Stack>
    </Region>
  )
}

export function DarkPalettePreview() {
  const onFill = dark.gray['1200'].$value
  return (
    <>
      {/* Generated by scripts/generate-palette.mjs from the dark ramps */}
      <style dangerouslySetInnerHTML={{ __html: darkPreviewCss }} />
      <Stack direction="column" gap="xl">
        <section>
          <Typography variant="h3">Surfaces</Typography>
          <Typography variant="body" color="subdued">
            The dark page (gray.100), a raised card (gray.200) and, inside it, an overlay such as a menu (gray.300, #356).
          </Typography>
          <div data-co-preview-theme={darkSelectorValue} style={{ marginTop: 12, padding: 24, background: dark.gray['100'].$value, borderRadius: 8 }}>
            <div style={{ padding: 24, background: dark.gray['200'].$value, borderRadius: 8, maxWidth: 480 }}>
              <span style={{ color: dark.gray['1200'].$value }}>Raised</span>
              <div style={{ marginTop: 16, padding: 16, background: dark.gray['300'].$value, borderRadius: 8, border: `1px solid ${dark.gray['600'].$value}` }}>
                <span style={{ color: dark.gray['1200'].$value }}>Overlay</span>{' '}
                <span style={{ color: dark.gray['1100'].$value }}>with secondary text</span>
              </div>
            </div>
          </div>
        </section>

        <section id="ramps">
          <Typography variant="h3">Ramps</Typography>
          <Typography variant="body" color="subdued">
            Light (contrast on white) above dark (contrast on the dark page) for every ramp. Each step keeps its job in both themes (0054).
          </Typography>
          <Stack direction="column" gap="md">
            {RAMPS.map((ramp) => (
              <div key={ramp} style={{ marginTop: 16 }}>
                <Typography variant="h6">{ramp}</Typography>
                <RampRow ramp={ramp} theme="light" />
                <RampRow ramp={ramp} theme="dark" />
              </div>
            ))}
          </Stack>
        </section>

        <section>
          <Typography variant="h3">Coloured fills in dark</Typography>
          <Typography variant="body" color="subdued">
            Each role&apos;s fill uses its most saturated step where on-fill text (dark gray.1200) meets 4.5:1 (#355).
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12, padding: 24, background: dark.gray['100'].$value, borderRadius: 8 }}>
            {FILL_RAMPS.map((ramp) => {
              const info = dark[ramp].$extensions?.['studio.commonorigin']
              const step = info?.fillStep ?? '800'
              const fill = dark[ramp][step].$value
              return (
                <div key={ramp} style={{ background: fill, color: onFill, padding: '10px 16px', borderRadius: 6, ...mono, fontSize: 13 }}>
                  {ramp} {step} · {contrastRatio(fill, onFill).toFixed(2)}:1
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <Typography variant="h3">Components</Typography>
          <Typography variant="body" color="subdued">
            The dark region swaps the base ramps and makes raised surfaces gray.200. Not applied yet: on-fill text (#355), so accent, danger and checked controls still use
            text.inverse and show dark labels; the overlay surface, scrim and stronger shadows (#354, #356); and the semantic literals (#354).
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 16 }}>
            <Components theme="light" />
            <Components theme="dark" />
          </div>
        </section>
      </Stack>
    </>
  )
}
