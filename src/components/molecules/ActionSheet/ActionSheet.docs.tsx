import type { ComponentDocumentation } from '@/lib/docgen/types'
import { ActionSheet } from './ActionSheet'
import { Button } from '../../atoms/Button/Button'
import { Typography } from '../../atoms/Typography/Typography'
import { useState } from 'react'
import type { Action } from './ActionSheet'

export const actionSheetDocs: ComponentDocumentation = {
  id: 'action-sheet',
  name: 'ActionSheet',
  description: 'A bottom sheet modal component for displaying a list of actions. Includes focus trap, keyboard navigation, and proper accessibility support.',
  category: 'Molecules',
  
  props: [
    {
      name: 'isOpen',
      type: 'boolean',
      required: true,
      description: 'Controls whether the action sheet is visible'
    },
    {
      name: 'onClose',
      type: '() => void',
      required: true,
      description: 'Callback when the action sheet should close'
    },
    {
      name: 'actions',
      type: 'Action[]',
      required: true,
      description: 'Array of action objects. Each has id, label, optional icon, destructive flag, disabled flag, and onSelect callback.'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'Optional title displayed at the top of the action sheet'
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: 'Optional description text shown below the title'
    },
    {
      name: 'closeOnOverlayClick',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether clicking the overlay backdrop closes the sheet'
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether pressing Escape key closes the sheet'
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to show the close button in the header'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for automated testing'
    }
  ],
  
  tokens: [
    'semantic.color.background.subtle',
    'semantic.color.background.surface',
    'semantic.color.background.interactive-subtle',
    'semantic.color.border.default',
    'semantic.color.border.strong',
    'semantic.color.text.default',
    'semantic.color.text.subdued',
    'semantic.color.text.error',
    'semantic.color.text.disabled',
    'semantic.color.icon.subdued',
    'semantic.color.icon.default',
    'base.spacing.2',
    'base.spacing.3',
    'base.spacing.4',
    'base.border.width.1',
    'base.border.width.2',
    'base.border.radius.2',
    'base.border.radius.4',
    'semantic.typography.h3',
    'semantic.typography.body',
    'semantic.motion.hover',
    'base.shadow.4'
  ],
  
  examples: [
    {
      name: 'Basic Action Sheet',
      description: 'Simple action sheet with icons and onSelect callbacks',
      code: `const [isOpen, setIsOpen] = useState(false)

const actions = [
  {
    id: 'edit',
    label: 'Edit',
    icon: 'edit' as const,
    onSelect: () => console.log('Edit clicked')
  },
  {
    id: 'share',
    label: 'Share',
    icon: 'share' as const,
    onSelect: () => console.log('Share clicked')
  }
]

<Button onClick={() => setIsOpen(true)}>
  Open Actions
</Button>

<ActionSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  actions={actions}
/>`,
      renderComponent: () => {
        const [isOpen, setIsOpen] = useState(false)
        
        const actions: Action[] = [
          {
            id: 'edit',
            label: 'Edit',
            icon: 'edit',
            onSelect: () => {
              alert('Edit clicked')
              setIsOpen(false)
            }
          },
          {
            id: 'share',
            label: 'Share',
            icon: 'export',
            onSelect: () => {
              alert('Share clicked')
              setIsOpen(false)
            }
          }
        ]
        
        return (
          <>
            <Button onClick={() => setIsOpen(true)}>
              Open Actions
            </Button>
            
            <ActionSheet
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              actions={actions}
            />
          </>
        )
      }
    },
    {
      name: 'With Title and Description',
      description: 'Action sheet with header content for context',
      code: `<ActionSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Choose an action"
  description="Select one of the following options to continue"
  actions={actions}
/>`,
      renderComponent: () => {
        const [isOpen, setIsOpen] = useState(false)
        
        const actions: Action[] = [
          {
            id: 'download',
            label: 'Download',
            icon: 'export',
            onSelect: () => setIsOpen(false)
          },
          {
            id: 'print',
            label: 'Print',
            onSelect: () => setIsOpen(false)
          }
        ]
        
        return (
          <>
            <Button onClick={() => setIsOpen(true)}>
              Open with Header
            </Button>
            
            <ActionSheet
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Choose an action"
              description="Select one of the following options to continue"
              actions={actions}
            />
          </>
        )
      }
    },
    {
      name: 'Destructive Action',
      description: 'Action sheet with destructive action styled in red with divider',
      code: `const actions = [
  {
    id: 'edit',
    label: 'Edit',
    icon: 'edit' as const,
    onSelect: () => console.log('Edit')
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: 'trash' as const,
    destructive: true,
    onSelect: () => console.log('Delete')
  }
]

<ActionSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Document Actions"
  actions={actions}
/>`,
      renderComponent: () => {
        const [isOpen, setIsOpen] = useState(false)
        
        const actions: Action[] = [
          {
            id: 'edit',
            label: 'Edit',
            icon: 'edit',
            onSelect: () => {
              alert('Edit clicked')
              setIsOpen(false)
            }
          },
          {
            id: 'duplicate',
            label: 'Duplicate',
            icon: 'copy',
            onSelect: () => {
              alert('Duplicate clicked')
              setIsOpen(false)
            }
          },
          {
            id: 'delete',
            label: 'Delete',
            icon: 'trash',
            destructive: true,
            onSelect: () => {
              alert('Delete clicked')
              setIsOpen(false)
            }
          }
        ]
        
        return (
          <>
            <Button onClick={() => setIsOpen(true)}>
              Open with Destructive Action
            </Button>
            
            <ActionSheet
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Document Actions"
              actions={actions}
            />
          </>
        )
      }
    },
    {
      name: 'Disabled Actions',
      description: 'Some actions can be disabled based on conditions',
      code: `const actions = [
  {
    id: 'copy',
    label: 'Copy',
    icon: 'copy' as const,
    onSelect: () => console.log('Copy')
  },
  {
    id: 'paste',
    label: 'Paste',
    icon: 'clipboard' as const,
    disabled: true, // No clipboard content
    onSelect: () => console.log('Paste')
  },
  {
    id: 'cut',
    label: 'Cut',
    icon: 'cut' as const,
    onSelect: () => console.log('Cut')
  }
]`,
      renderComponent: () => {
        const [isOpen, setIsOpen] = useState(false)
        
        const actions: Action[] = [
          {
            id: 'copy',
            label: 'Copy',
            icon: 'copy',
            onSelect: () => {
              alert('Copied!')
              setIsOpen(false)
            }
          },
          {
            id: 'paste',
            label: 'Paste (Disabled)',
            disabled: true,
            onSelect: () => {}
          },
          {
            id: 'cut',
            label: 'Cut',
            onSelect: () => {
              alert('Cut!')
              setIsOpen(false)
            }
          }
        ]
        
        return (
          <>
            <Button onClick={() => setIsOpen(true)}>
              Open with Disabled Actions
            </Button>
            
            <ActionSheet
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Edit Actions"
              actions={actions}
            />
          </>
        )
      }
    },
    {
      name: 'Custom Close Behavior',
      description: 'Control when and how the sheet closes',
      code: `<ActionSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  closeOnOverlayClick={false}  // Must use close button or action
  closeOnEscape={true}          // But Escape still works
  showCloseButton={true}
  actions={actions}
/>`,
      renderComponent: () => {
        const [isOpen, setIsOpen] = useState(false)
        
        const actions: Action[] = [
          {
            id: 'save',
            label: 'Save',
            icon: 'check',
            onSelect: () => {
              alert('Saved!')
              setIsOpen(false)
            }
          },
          {
            id: 'cancel',
            label: 'Cancel',
            onSelect: () => setIsOpen(false)
          }
        ]
        
        return (
          <>
            <Button onClick={() => setIsOpen(true)}>
              Custom Close Behavior
            </Button>
            
            <div style={{ marginTop: '8px' }}>
              <Typography variant="caption" color="subdued">
                Clicking overlay won't close (must use button or action)
              </Typography>
            </div>
            
            <ActionSheet
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Confirm Action"
              description="Click outside won't close this sheet"
              closeOnOverlayClick={false}
              closeOnEscape={true}
              showCloseButton={true}
              actions={actions}
            />
          </>
        )
      }
    }
  ],
  
  accessibility: {
    notes: [
      'Implements WAI-ARIA dialog pattern with role="dialog" and aria-modal="true"',
      'Uses aria-labelledby to reference title when provided',
      'Uses aria-describedby to reference description when provided',
      'Implements focus trap - focus stays within dialog when open',
      'Tab cycles through focusable elements, Shift+Tab cycles backwards',
      'First focusable element (usually first action) receives focus on open',
      'Focus returns to trigger element when closed',
      'Escape key closes dialog (when closeOnEscape=true)',
      'Prevents body scroll when open',
      'All action buttons have aria-label attributes',
      'Disabled actions have disabled attribute and cannot be activated',
      'Destructive actions visually distinct with red text color',
      'Portal rendering ensures proper z-index stacking'
    ],
    keyboardNavigation: 'Tab and Shift+Tab navigate actions, Enter/Space activate focused action, Escape closes dialog',
    screenReader: 'Announces "Choose an action dialog" with modal status, action count, and individual action labels including destructive warnings'
  },
  
  anatomy: {
    description: 'ActionSheet consists of an overlay backdrop and a bottom-aligned sheet container with header and action list.',
    parts: [
      {
        name: 'Overlay',
        description: 'Full-screen semi-transparent backdrop',
        tokens: ['rgba(0, 0, 0, 0.5)']
      },
      {
        name: 'Sheet Container',
        description: 'Bottom-aligned container with slide-up animation',
        tokens: [
          'semantic.color.background.subtle',
          'base.border.radius.4',
          'base.shadow.4'
        ]
      },
      {
        name: 'Header',
        description: 'Optional header with title, description, and close button',
        tokens: [
          'semantic.color.border.default',
          'base.spacing.4',
          'semantic.typography.h3'
        ]
      },
      {
        name: 'Close Button',
        description: 'Icon button to dismiss the sheet',
        tokens: [
          'semantic.color.icon.subdued',
          'base.border.radius.2'
        ]
      },
      {
        name: 'Actions List',
        description: 'Scrollable list of action buttons',
        tokens: ['base.spacing.2']
      },
      {
        name: 'Action Button',
        description: 'Individual action with optional icon, label, and hover state',
        tokens: [
          'semantic.color.background.interactive-subtle',
          'semantic.typography.body',
          'base.spacing.3'
        ]
      },
      {
        name: 'Destructive Action',
        description: 'Action styled in error color with divider above',
        tokens: [
          'semantic.color.text.error',
          'semantic.color.border.default'
        ]
      },
      {
        name: 'Disabled Action',
        description: 'Action with disabled styling and no interaction',
        tokens: ['semantic.color.text.disabled']
      }
    ]
  }
}
