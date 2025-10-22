import React, { useState } from 'react'

// This will test importing from the local built package
// We'll use a relative path to the built dist folder for now
import { 
  Button,
  Chip, 
  Stack,
  Typography,
  Container,
  DateFormatter,
  tokens
} from '../../dist/index.esm.js'

const ConsumptionTest: React.FC = () => {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div>
      <h2>Component Tests</h2>
      
      <section style={{ marginBottom: '2rem' }}>
        <h3>Typography Component</h3>
        <Typography variant="h1">Heading 1 Typography</Typography>
        <Typography variant="h2">Heading 2 Typography</Typography>
        <Typography variant="body1">Body text typography component</Typography>
        <Typography variant="caption">Caption text typography</Typography>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Button Component</h3>
        <Stack direction="row" gap="md">
          <Button 
            variant="primary"
            onClick={() => setClickCount(c => c + 1)}
          >
            Primary Button (Clicked: {clickCount})
          </Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button disabled>Disabled Button</Button>
        </Stack>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Chip Component</h3>
        <Stack direction="row" gap="sm" wrap>
          <Chip variant="default">Default Chip</Chip>
          <Chip variant="emphasis">Emphasis Chip</Chip>
          <Chip variant="subtle">Subtle Chip</Chip>
          <Chip 
            variant="interactive" 
            onClick={() => alert('Chip clicked!')}
          >
            Interactive Chip
          </Chip>
          <Chip disabled>Disabled Chip</Chip>
        </Stack>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Stack Layout Component</h3>
        <Stack direction="column" gap="md">
          <div style={{ background: '#f0f0f0', padding: '1rem' }}>Stack Item 1</div>
          <div style={{ background: '#e0e0e0', padding: '1rem' }}>Stack Item 2</div>
          <div style={{ background: '#d0d0d0', padding: '1rem' }}>Stack Item 3</div>
        </Stack>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Container Component</h3>
        <Container maxWidth="md">
          <div style={{ background: '#f9f9f9', padding: '2rem', textAlign: 'center' }}>
            Content inside a Container with maxWidth="md"
          </div>
        </Container>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>DateFormatter Component</h3>
        <p>Current date: <DateFormatter dateString={new Date().toISOString()} /></p>
        <p>Formatted date: <DateFormatter dateString="2023-12-25T10:30:00.000Z" formatString="MMM dd, yyyy" /></p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Design Tokens</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <h4>Semantic Colors</h4>
            <p>Text Default: {tokens.semantic.color.text.default}</p>
            <p>Background Default: {tokens.semantic.color.background.default}</p>
          </div>
          <div>
            <h4>Typography</h4>
            <p>H1 Font: {tokens.semantic.typography.h1}</p>
            <p>Body Font: {tokens.semantic.typography.body}</p>
          </div>
          <div>
            <h4>Spacing</h4>
            <p>Layout Small: {tokens.semantic.spacing.layout.sm}</p>
            <p>Layout Medium: {tokens.semantic.spacing.layout.md}</p>
            <p>Layout Large: {tokens.semantic.spacing.layout.lg}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ConsumptionTest