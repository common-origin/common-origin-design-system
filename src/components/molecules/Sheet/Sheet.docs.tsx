import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Sheet } from './Sheet'
import { useState } from 'react'
import { Button, Typography, Stack } from '@/components'

export const sheetDocs: ComponentDocumentation = {
  id: 'sheet',
  name: 'Sheet',
  description: 'A sliding panel overlay component that can appear from any edge of the viewport, ideal for navigation menus, filters, forms, or additional content.',
  category: 'Molecules',
  
  props: [
    {
      name: 'isOpen',
      type: 'boolean',
      required: true,
      description: 'Controls whether the sheet is visible. Required to be controlled by parent component.',
    },
    {
      name: 'onClose',
      type: '() => void',
      required: true,
      description: 'Callback fired when the sheet should close (overlay click, ESC key, etc.).',
    },
    {
      name: 'position',
      type: "'top' | 'right' | 'bottom' | 'left'",
      required: false,
      default: "'right'",
      description: 'Which edge of the viewport the sheet slides in from. Determines animation direction and layout.',
    },
    {
      name: 'variant',
      type: "'sheet' | 'drawer'",
      required: false,
      default: "'sheet'",
      description: "Visual variant: 'sheet' is edge-to-edge, 'drawer' has margins and rounded corners for a floating effect.",
    },
    {
      name: 'width',
      type: 'string',
      required: false,
      default: "'400px'",
      description: 'Width of the sheet (applies to left and right positions). Can be px, rem, %, or any valid CSS width.',
    },
    {
      name: 'height',
      type: 'string',
      required: false,
      default: "'400px'",
      description: 'Height of the sheet (applies to top and bottom positions). Can be px, rem, %, or any valid CSS height.',
    },
    {
      name: 'children',
      type: 'ReactNode',
      required: false,
      description: 'Content to display inside the sheet. Can be any valid React elements.',
    },
    {
      name: 'closeOnOverlayClick',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether clicking the overlay backdrop should close the sheet. Set to false to require explicit close action.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether pressing the ESC key should close the sheet. Set to false to prevent keyboard closing.',
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'Title for the sheet, used as the aria-label for screen readers if aria-label is not provided.',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessible label for screen readers. Overrides the title prop if both are provided.',
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      description: 'ID of an element that describes the sheet for screen readers.',
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for the sheet element. Also creates a {value}-overlay testid for the backdrop.',
    },
  ],
  
  tokens: [
    // Colors
    'semantic.color.background.default',
    
    // Shadows
    'base.shadow[4]',
    
    // Spacing
    'base.spacing[2]',
    'base.spacing[4]',
    'base.spacing[6]',
    
    // Border
    'base.border.radius[3]',
    
    // Colors for scrollbar
    'semantic.color.border.default',
    'semantic.color.background.tertiary',
  ],
  
  examples: [
    {
      name: 'Basic Sheet from Right',
      description: 'Default sheet sliding in from the right side, common for navigation or settings panels.',
      code: `const SheetExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Sheet
      </Button>
      
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings">
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Settings</h2>
          <p>Sheet content goes here</p>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Sheet>
    </>
  )
}`,
      renderComponent: () => {
        const SheetExample = () => {
          const [isOpen, setIsOpen] = useState(false)
          
          return (
            <>
              <Button onClick={() => setIsOpen(true)}>
                Open Sheet
              </Button>
              
              <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings">
                <div style={{ padding: '24px' }}>
                  <h2 style={{ margin: '0 0 16px 0' }}>Settings</h2>
                  <p>Sheet content goes here</p>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              </Sheet>
            </>
          )
        }
        return <SheetExample />
      },
    },
    {
      name: 'All Positions',
      description: 'Sheets can slide in from any edge: top, right, bottom, or left.',
      code: `const AllPositionsExample = () => {
  const [position, setPosition] = useState<'top' | 'right' | 'bottom' | 'left' | null>(null)
  
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button onClick={() => setPosition('top')}>Top</Button>
      <Button onClick={() => setPosition('right')}>Right</Button>
      <Button onClick={() => setPosition('bottom')}>Bottom</Button>
      <Button onClick={() => setPosition('left')}>Left</Button>
      
      {position && (
        <Sheet 
          isOpen={true} 
          onClose={() => setPosition(null)} 
          position={position}
          title={\`Sheet from \${position}\`}
        >
          <div style={{ padding: '24px' }}>
            <h2 style={{ margin: '0 0 16px 0' }}>From {position}</h2>
            <p>This sheet slides in from the {position}.</p>
            <Button onClick={() => setPosition(null)}>Close</Button>
          </div>
        </Sheet>
      )}
    </div>
  )
}`,
      renderComponent: () => {
        const AllPositionsExample = () => {
          const [position, setPosition] = useState<'top' | 'right' | 'bottom' | 'left' | null>(null)
          
          return (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button onClick={() => setPosition('top')}>Top</Button>
              <Button onClick={() => setPosition('right')}>Right</Button>
              <Button onClick={() => setPosition('bottom')}>Bottom</Button>
              <Button onClick={() => setPosition('left')}>Left</Button>
              
              {position && (
                <Sheet 
                  isOpen={true} 
                  onClose={() => setPosition(null)} 
                  position={position}
                  title={`Sheet from ${position}`}
                >
                  <div style={{ padding: '24px' }}>
                    <h2 style={{ margin: '0 0 16px 0', textTransform: 'capitalize' }}>From {position}</h2>
                    <p>This sheet slides in from the {position}.</p>
                    <Button onClick={() => setPosition(null)}>Close</Button>
                  </div>
                </Sheet>
              )}
            </div>
          )
        }
        return <AllPositionsExample />
      },
    },
    {
      name: 'Drawer Variant',
      description: 'The drawer variant adds margins and rounded corners for a floating panel effect.',
      code: `const DrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
      
      <Sheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        variant="drawer"
        position="bottom"
        height="300px"
        title="Bottom Drawer"
      >
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Mobile Menu</h2>
          <p>Drawer variant with rounded corners and margins</p>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Sheet>
    </>
  )
}`,
      renderComponent: () => {
        const DrawerExample = () => {
          const [isOpen, setIsOpen] = useState(false)
          
          return (
            <>
              <Button onClick={() => setIsOpen(true)}>
                Open Drawer
              </Button>
              
              <Sheet 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                variant="drawer"
                position="bottom"
                height="300px"
                title="Bottom Drawer"
              >
                <div style={{ padding: '24px' }}>
                  <h2 style={{ margin: '0 0 16px 0' }}>Mobile Menu</h2>
                  <p>Drawer variant with rounded corners and margins</p>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              </Sheet>
            </>
          )
        }
        return <DrawerExample />
      },
    },
    {
      name: 'Custom Sizes',
      description: 'Width (for left/right) and height (for top/bottom) can be customized.',
      code: `const CustomSizeExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Wide Sheet (600px)
      </Button>
      
      <Sheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        width="600px"
        title="Wide Sheet"
      >
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Wide Sheet</h2>
          <p>This sheet is 600px wide instead of the default 400px.</p>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Sheet>
    </>
  )
}`,
      renderComponent: () => {
        const CustomSizeExample = () => {
          const [isOpen, setIsOpen] = useState(false)
          
          return (
            <>
              <Button onClick={() => setIsOpen(true)}>
                Wide Sheet (600px)
              </Button>
              
              <Sheet 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                width="600px"
                title="Wide Sheet"
              >
                <div style={{ padding: '24px' }}>
                  <h2 style={{ margin: '0 0 16px 0' }}>Wide Sheet</h2>
                  <p>This sheet is 600px wide instead of the default 400px.</p>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              </Sheet>
            </>
          )
        }
        return <CustomSizeExample />
      },
    },
    {
      name: 'Navigation Menu',
      description: 'Common use case: mobile navigation menu from the left.',
      code: `const NavMenuExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Menu
      </Button>
      
      <Sheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        position="left"
        width="280px"
        title="Navigation Menu"
      >
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 24px 0' }}>Menu</h2>
          <nav>
            <div style={{ marginBottom: '12px' }}>
              <a href="#home">Home</a>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <a href="#about">About</a>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <a href="#products">Products</a>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <a href="#contact">Contact</a>
            </div>
          </nav>
        </div>
      </Sheet>
    </>
  )
}`,
      renderComponent: () => {
        const NavMenuExample = () => {
          const [isOpen, setIsOpen] = useState(false)
          
          return (
            <>
              <Button onClick={() => setIsOpen(true)}>
                Open Menu
              </Button>
              
              <Sheet 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                position="left"
                width="280px"
                title="Navigation Menu"
              >
                <div style={{ padding: '24px' }}>
                  <h2 style={{ margin: '0 0 24px 0' }}>Menu</h2>
                  <nav>
                    <div style={{ marginBottom: '12px' }}>
                      <a href="#home" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a href="#products" style={{ textDecoration: 'none', color: 'inherit' }}>Products</a>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a>
                    </div>
                  </nav>
                </div>
              </Sheet>
            </>
          )
        }
        return <NavMenuExample />
      },
    },
    {
      name: 'Filter Panel',
      description: 'Using a sheet for filters that slide in from the right.',
      code: `const FilterExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Show Filters
      </Button>
      
      <Sheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        position="right"
        title="Filter Options"
      >
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 24px 0' }}>Filters</h2>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              Category
            </label>
            <select style={{ width: '100%', padding: '8px' }}>
              <option>All</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              Price Range
            </label>
            <input type="range" style={{ width: '100%' }} />
          </div>
          
          <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
            <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
            <Button variant="secondary">Reset</Button>
          </div>
        </div>
      </Sheet>
    </>
  )
}`,
      renderComponent: () => {
        const FilterExample = () => {
          const [isOpen, setIsOpen] = useState(false)
          
          return (
            <>
              <Button onClick={() => setIsOpen(true)}>
                Show Filters
              </Button>
              
              <Sheet 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                position="right"
                title="Filter Options"
              >
                <div style={{ padding: '24px' }}>
                  <h2 style={{ margin: '0 0 24px 0' }}>Filters</h2>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      Category
                    </label>
                    <select style={{ width: '100%', padding: '8px' }}>
                      <option>All</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Books</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      Price Range
                    </label>
                    <input type="range" style={{ width: '100%' }} />
                  </div>
                  
                  <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
                    <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
                    <Button variant="secondary">Reset</Button>
                  </div>
                </div>
              </Sheet>
            </>
          )
        }
        return <FilterExample />
      },
    },
    {
      name: 'Disable Close on Overlay Click',
      description: 'Prevent closing when clicking the overlay, requiring explicit close action.',
      code: `const NoOverlayCloseExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Sheet
      </Button>
      
      <Sheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        closeOnOverlayClick={false}
        closeOnEscape={false}
        title="Important Sheet"
      >
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Important Information</h2>
          <p>Click the overlay or press ESC - this sheet won't close!</p>
          <p>You must click the Close button.</p>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Sheet>
    </>
  )
}`,
      renderComponent: () => {
        const NoOverlayCloseExample = () => {
          const [isOpen, setIsOpen] = useState(false)
          
          return (
            <>
              <Button onClick={() => setIsOpen(true)}>
                Open Sheet
              </Button>
              
              <Sheet 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                closeOnOverlayClick={false}
                closeOnEscape={false}
                title="Important Sheet"
              >
                <div style={{ padding: '24px' }}>
                  <h2 style={{ margin: '0 0 16px 0' }}>Important Information</h2>
                  <p>Click the overlay or press ESC - this sheet won't close!</p>
                  <p>You must click the Close button.</p>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              </Sheet>
            </>
          )
        }
        return <NoOverlayCloseExample />
      },
    },
    {
      name: 'With Form Content',
      description: 'Sheet can contain forms with proper focus management.',
      code: `const FormExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Add Item
      </Button>
      
      <Sheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Add New Item"
      >
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 24px 0' }}>Add New Item</h2>
          
          <form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                Name
              </label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '8px' }}
                placeholder="Enter item name"
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                Description
              </label>
              <textarea 
                style={{ width: '100%', padding: '8px', minHeight: '100px' }}
                placeholder="Enter description"
              />
            </div>
            
            <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
              <Button type="submit">Save</Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Sheet>
    </>
  )
}`,
      renderComponent: () => {
        const FormExample = () => {
          const [isOpen, setIsOpen] = useState(false)
          
          return (
            <>
              <Button onClick={() => setIsOpen(true)}>
                Add Item
              </Button>
              
              <Sheet 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                title="Add New Item"
              >
                <div style={{ padding: '24px' }}>
                  <h2 style={{ margin: '0 0 24px 0' }}>Add New Item</h2>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '8px' }}>
                        Name
                      </label>
                      <input 
                        type="text" 
                        style={{ width: '100%', padding: '8px' }}
                        placeholder="Enter item name"
                      />
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '8px' }}>
                        Description
                      </label>
                      <textarea 
                        style={{ width: '100%', padding: '8px', minHeight: '100px' }}
                        placeholder="Enter description"
                      />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                      <Button type="submit">Save</Button>
                      <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </Sheet>
            </>
          )
        }
        return <FormExample />
      },
    },
  ],
  
  accessibility: {
    notes: [
      'Uses semantic dialog role with aria-modal="true" to indicate modal behavior',
      'Focus is automatically moved to the sheet when opened',
      'Focus is trapped within the sheet - Tab cycles through focusable elements',
      'Focus is restored to the triggering element when the sheet closes',
      'ESC key closes the sheet by default (configurable with closeOnEscape)',
      'Background content is inert while sheet is open (via aria-modal)',
      'Keyboard navigation: Tab/Shift+Tab to cycle focus, ESC to close',
      'Body scroll is prevented while sheet is open to maintain context',
      'Proper ARIA labeling via title prop or aria-label prop',
      'Support for aria-describedby for additional context',
      'Overlay has sufficient color contrast (rgba(0,0,0,0.5))',
    ],
    keyboardNavigation: 'Tab to move forward through focusable elements, Shift+Tab to move backward. Focus wraps from last to first element and vice versa. Press ESC to close the sheet (if closeOnEscape is true).',
    screenReader: 'Announces as "dialog" with the provided label. Screen readers are informed this is a modal dialog via aria-modal="true". Focus management ensures users stay within the sheet context.',
  },
  
  anatomy: {
    description: 'Sheet consists of an overlay backdrop and a sliding panel with configurable position and styling.',
    diagram: `
┌─────────────────────────────────────────────┐
│ Overlay (semi-transparent backdrop)        │
│                                             │
│                    ┌────────────────────┐  │
│                    │ Sheet Panel        │  │
│                    │ ┌────────────────┐ │  │
│                    │ │ Content Area   │ │  │
│                    │ │                │ │  │
│                    │ │  (children)    │ │  │
│                    │ │                │ │  │
│                    │ └────────────────┘ │  │
│                    └────────────────────┘  │
│                     (slides from edge)     │
└─────────────────────────────────────────────┘

Position Variants:
- top: slides down from top edge
- right: slides left from right edge (default)
- bottom: slides up from bottom edge
- left: slides right from left edge

Visual Variants:
- sheet: edge-to-edge, no margin
- drawer: floating with margin and border-radius
    `,
    parts: [
      {
        name: 'Overlay',
        description: 'Fixed-position backdrop that covers the entire viewport with semi-transparent black background. Fades in with 200ms animation. Clicking it closes the sheet by default.',
        tokens: ['semantic.color.background (via rgba)'],
      },
      {
        name: 'Sheet Panel',
        description: 'The main sliding panel that contains content. Fixed position with slide animation from the configured edge. Has elevated shadow and scrollable overflow.',
        tokens: [
          'semantic.color.background.default',
          'base.shadow[4]',
          'base.border.radius[3]',
          'base.spacing[2]',
          'base.spacing[4]',
          'base.spacing[6]',
        ],
      },
      {
        name: 'Content Area',
        description: 'Inner wrapper for children with padding. Inherits sheet dimensions and can scroll if content exceeds available space.',
        tokens: ['base.spacing[6]'],
      },
    ],
  },
}
