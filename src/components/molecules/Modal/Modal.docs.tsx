import React, { useState } from 'react'
import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Modal, type ModalAction } from './Modal'
import { Typography } from '../../atoms/Typography'
import { Stack } from '../../atoms/Stack'
import { Button } from '../../atoms/Button'

// ---------------------------------------------------------------------------
// Example wrapper components (defined outside so hooks work)
// ---------------------------------------------------------------------------

const BasicConfirmationExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  const actions: ModalAction[] = [
    { label: 'Cancel', onClick: () => setIsOpen(false), variant: 'secondary' },
    { label: 'Delete', onClick: () => { alert('Deleted'); setIsOpen(false) }, variant: 'danger' },
  ]
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirmation</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm deletion" actions={actions}>
        <Typography>Are you sure you want to delete this item? This action cannot be undone.</Typography>
      </Modal>
    </>
  )
}

const InformationalExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>View Account Details</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Account details" size="large">
        <Stack direction="column" gap="md">
          <Typography variant="h4">Savings Account</Typography>
          <Typography>Account number: •••• 4829</Typography>
          <Typography>Balance: $12,450.00</Typography>
        </Stack>
      </Modal>
    </>
  )
}

const SmallSizeExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Quick prompt"
        size="small"
        actions={[{ label: 'OK', onClick: () => setIsOpen(false), variant: 'primary' }]}
      >
        <Typography>Session will expire in 5 minutes.</Typography>
      </Modal>
    </>
  )
}

const DisabledActionExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Create Form</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create account"
        actions={[
          { label: 'Cancel', onClick: () => setIsOpen(false), variant: 'secondary' },
          { label: 'Create', onClick: () => {}, variant: 'primary', disabled: true },
        ]}
      >
        <Typography>Fill in the form fields above to enable the Create button.</Typography>
      </Modal>
    </>
  )
}

export const modalDocs: ComponentDocumentation = {
  id: 'modal',
  name: 'Modal',
  description:
    'A centred dialog overlay for focused tasks such as confirmations, forms, and detail views. Features a title, close button, scrollable body, and optional structured footer actions. Auto-fullscreen on mobile viewports (< 768 px).',
  category: 'Molecules',

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------
  props: [
    {
      name: 'isOpen',
      type: 'boolean',
      required: true,
      default: undefined,
      description: 'Controls whether the modal is visible. When false the component renders nothing and body scroll is restored.',
    },
    {
      name: 'onClose',
      type: '() => void',
      required: true,
      default: undefined,
      description: 'Callback invoked when the modal should close — triggered by the close button, overlay click, or Escape key.',
    },
    {
      name: 'title',
      type: 'string',
      required: true,
      default: undefined,
      description: 'Title displayed in the modal header. Also used as the default aria-label for the dialog.',
    },
    {
      name: 'children',
      type: 'ReactNode',
      required: true,
      default: undefined,
      description: 'Body content rendered inside the scrollable content area.',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      default: "'medium'",
      description:
        "Width preset: small (400 px), medium (560 px), large (720 px). All sizes auto-switch to fullscreen below the md breakpoint (768 px).",
    },
    {
      name: 'actions',
      type: 'ModalAction[]',
      required: false,
      default: undefined,
      description:
        'Array of action objects rendered as Button components in the footer. Each object accepts label, onClick, variant, icon, and disabled.',
    },
    {
      name: 'closeOnOverlayClick',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'When true, clicking the backdrop overlay calls onClose.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'When true, pressing the Escape key calls onClose.',
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: undefined,
      description:
        'Test identifier propagated to sub-elements: overlay (-overlay), close button (-close), body (-body), footer (-footer), and actions (-action-N).',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Custom accessible label for the dialog. Falls back to the title prop.',
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      default: undefined,
      description: 'ID of an element that describes the modal content for assistive technologies.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Tokens
  // ---------------------------------------------------------------------------
  tokens: [
    // Elevation
    'semantic.elevation.overlay',
    // Background
    'semantic.color.background.subtle',
    'semantic.color.background.surface',
    // Border
    'semantic.border.radius.xl',
    'semantic.color.border.default',
    'semantic.color.border.strong',
    // Spacing
    'semantic.spacing.layout.sm',
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.lg',
    // Breakpoint
    'base.breakpoint.md',
    // Motion
    'base.duration.normal',
    'base.easing.easeOut',
  ],

  // ---------------------------------------------------------------------------
  // Examples
  // ---------------------------------------------------------------------------
  examples: [
    {
      name: 'Basic confirmation',
      description: 'A simple confirmation dialog with primary and secondary actions.',
      code: `const [isOpen, setIsOpen] = useState(false)

<Button onClick={() => setIsOpen(true)}>Open Confirmation</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm deletion"
  actions={[
    { label: 'Cancel', onClick: () => setIsOpen(false), variant: 'secondary' },
    { label: 'Delete', onClick: handleDelete, variant: 'danger' },
  ]}
>
  <Typography>Are you sure you want to delete this item? This action cannot be undone.</Typography>
</Modal>`,
      renderComponent: () => <BasicConfirmationExample />,
    },
    {
      name: 'Informational — no actions',
      description: 'A modal without footer actions, useful for read-only detail views.',
      code: `const [isOpen, setIsOpen] = useState(false)

<Button onClick={() => setIsOpen(true)}>View Account Details</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Account details"
  size="large"
>
  <Stack direction="column" gap="md">
    <Typography variant="h4">Savings Account</Typography>
    <Typography>Account number: •••• 4829</Typography>
    <Typography>Balance: $12,450.00</Typography>
  </Stack>
</Modal>`,
      renderComponent: () => <InformationalExample />,
    },
    {
      name: 'Small size',
      description: 'A compact small-width modal for quick prompts.',
      code: `const [isOpen, setIsOpen] = useState(false)

<Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Quick prompt"
  size="small"
  actions={[
    { label: 'OK', onClick: () => setIsOpen(false), variant: 'primary' },
  ]}
>
  <Typography>Session will expire in 5 minutes.</Typography>
</Modal>`,
      renderComponent: () => <SmallSizeExample />,
    },
    {
      name: 'Disabled action',
      description: 'Actions can be disabled, e.g. while a form is invalid.',
      code: `const [isOpen, setIsOpen] = useState(false)

<Button onClick={() => setIsOpen(true)}>Open Create Form</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Create account"
  actions={[
    { label: 'Cancel', onClick: () => setIsOpen(false), variant: 'secondary' },
    { label: 'Create', onClick: handleCreate, variant: 'primary', disabled: true },
  ]}
>
  <Typography>Fill in the form fields above to enable the Create button.</Typography>
</Modal>`,
      renderComponent: () => <DisabledActionExample />,
    },
  ],

  // ---------------------------------------------------------------------------
  // Accessibility
  // ---------------------------------------------------------------------------
  accessibility: {
    notes: [
      'Renders with role="dialog" and aria-modal="true".',
      'aria-labelledby points to the title element; aria-label defaults to the title text.',
      'Close button uses IconButton with aria-label="Close modal".',
      'Focus is moved to the dialog on open and restored to the previously focused element on close.',
      'Focus is trapped inside the dialog — Tab and Shift+Tab cycle through focusable elements.',
      'Body scroll is locked while the modal is open.',
      'Escape key closes the modal by default (configurable via closeOnEscape).',
    ],
    keyboardNavigation:
      'Tab / Shift+Tab cycles through focusable elements within the dialog. Escape closes the modal.',
    screenReader:
      'Announced as a dialog with the title as its label. Actions are rendered as standard Button components with visible labels.',
    colorContrast:
      'Inherits contrast from Typography and Button atoms. Overlay uses 50 % opacity black backdrop.',
    focusManagement:
      'On open, focus moves to the dialog container. On close, focus returns to the element that triggered the modal.',
  },

  // ---------------------------------------------------------------------------
  // Anatomy
  // ---------------------------------------------------------------------------
  anatomy: {
    description:
      'The Modal is composed of a fixed backdrop overlay and a centred dialog panel split into header, body, and footer sections separated by Dividers.',
    diagram: `
┌─────────────────────────────────────┐
│          Overlay (backdrop)         │
│  ┌───────────────────────────────┐  │
│  │  Header: Title + IconButton   │  │
│  ├───────────────────────────────┤  │
│  │                               │  │
│  │  Body (children, scrollable)  │  │
│  │                               │  │
│  ├───────────────────────────────┤  │
│  │  Footer: [Button] [Button]    │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Overlay',
        description: 'Fixed fullscreen backdrop that dims the page. Clicking it can close the modal.',
        tokens: ['rgba(0,0,0,0.5)'],
      },
      {
        name: 'Dialog',
        description: 'Centred panel containing header, body, and footer. Sized by the size prop.',
        tokens: ['semantic.color.background.subtle', 'semantic.elevation.overlay', 'semantic.border.radius.xl'],
      },
      {
        name: 'Header',
        description: 'Flex row with the title (Typography h3) and a close IconButton.',
        tokens: ['semantic.spacing.layout.md', 'semantic.spacing.layout.lg'],
      },
      {
        name: 'Body',
        description: 'Scrollable content area that renders children.',
        tokens: ['semantic.spacing.layout.md', 'semantic.spacing.layout.lg'],
      },
      {
        name: 'Footer',
        description: 'Right-aligned row of Button components generated from the actions array.',
        tokens: ['semantic.spacing.layout.sm', 'semantic.spacing.layout.md', 'semantic.spacing.layout.lg'],
      },
      {
        name: 'Divider',
        description: 'Horizontal line separating header from body and body from footer.',
        tokens: ['semantic.color.border.default'],
      },
    ],
  },
}
