import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import styled from 'styled-components'
import tokens from '@/lib/cssTokens'
import { forcedColors } from '../../../lib/styleUtils'

const { semantic } = tokens

/**
 * Individual tab configuration
 */
export interface Tab {
  /**
   * Unique identifier for the tab
   */
  id: string
  
  /**
   * Tab label text
   */
  label: string
  
  /**
   * Optional badge count to display
   */
  badge?: number
  
  /**
   * Whether this tab is disabled
   * @default false
   */
  disabled?: boolean
}

/**
 * Props for the TabBar component
 */
export interface TabBarProps {
  /**
   * Array of tab configurations
   */
  tabs: Tab[]
  
  /**
   * Currently active tab ID
   */
  activeTab: string
  
  /**
   * Callback when tab changes
   */
  onTabChange: (tabId: string) => void
  
  /**
   * Accessible label for the tab list
   */
  'aria-label'?: string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
}

interface StyledTabProps {
  $isActive: boolean
  $disabled: boolean
}

const StyledTabList = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${semantic.border.width.thin} solid ${semantic.color.border.default};
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: ${tokens.component.tabBar.scrollbar.height};
  }
  
  &::-webkit-scrollbar-track {
    background: ${semantic.surface.raised};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${semantic.color.border.default};
    border-radius: ${semantic.radius.sm};
  }
`

const StyledTab = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledTabProps>`
  display: inline-flex;
  align-items: center;
  gap: ${semantic.space[200]};
  padding: ${semantic.space[300]} ${semantic.space[400]};
  font: ${tokens.component.button.sizes.medium.font};
  white-space: nowrap;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  border: none;
  background: transparent;
  transition: ${semantic.motion.transition.feedback};
  position: relative;
  
  /* Selected tab: the light-blue selected treatment plus a blue underline (decisions 0016, 0020).
     The text darkens with the fill on hover and press so every state stays at least 4.5:1. */
  border-radius: ${semantic.radius.sm} ${semantic.radius.sm} 0 0;
  background-color: ${props => props.$isActive
    ? semantic.color.fill['accent-muted']
    : 'transparent'
  };
  color: ${props => props.$isActive
    ? semantic.color.text.accent
    : semantic.color.text.muted
  };

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: ${semantic.border.width.thick};
    background-color: ${props => props.$isActive
      ? semantic.color.fill.accent
      : 'transparent'
    };
    transition: ${semantic.motion.transition.feedback};
  }

  /* Forced colours drop the fill, so the selected tab's underline carries its state in the
     system selection colour (decision 0038) */
  ${forcedColors} {
    &::after {
      forced-color-adjust: none;
      background-color: ${props => props.$isActive ? 'Highlight' : 'transparent'};
    }
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.$isActive
      ? semantic.color.fill['accent-muted-hover']
      : 'transparent'
    };
    color: ${props => props.$isActive
      ? semantic.color.text.accent
      : semantic.color.text.default
    };
  }

  &:active:not(:disabled) {
    background-color: ${props => props.$isActive
      ? semantic.color.fill['accent-muted-pressed']
      : 'transparent'
    };
    color: ${props => props.$isActive
      ? semantic.color.text.accent
      : semantic.color.text.default
    };
  }

  /* Disabled state */
  opacity: ${props => props.$disabled ? '0.5' : '1'};
  
  /* Focus state */
  &:focus-visible {
    outline: ${semantic.border.focus};
    outline-offset: ${semantic.border.focusOffset};
    z-index: 1;
  }

`

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${tokens.component.tabBar.badge.size};
  height: ${tokens.component.tabBar.badge.size};
  padding: 0 ${semantic.space[100]};
  font: ${tokens.component.tabBar.badge.typography};
  font-weight: ${tokens.component.tabBar.badge.fontWeight};
  border-radius: ${semantic.radius.full};
  background-color: ${semantic.color.fill.accent};
  color: ${semantic.color.text.inverse};
`

/**
 * TabBar component for tabbed navigation
 * 
 * Provides accessible tab navigation with an underline style, keyboard support,
 * and optional badge counts. Follows ARIA tablist pattern.
 * 
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('all')
 * 
 * <TabBar
 *   tabs={[
 *     { id: 'all', label: 'All', badge: 42 },
 *     { id: 'pending', label: 'Pending', badge: 5 },
 *     { id: 'completed', label: 'Completed' }
 *   ]}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 * ```
 */
export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  'aria-label': ariaLabel = 'Tab navigation',
  'data-testid': dataTestId
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number>(() => 
    tabs.findIndex(tab => tab.id === activeTab)
  )
  
  // Update focused index when active tab changes externally
  useEffect(() => {
    const newIndex = tabs.findIndex(tab => tab.id === activeTab)
    if (newIndex !== -1) {
      setFocusedIndex(newIndex)
    }
  }, [activeTab, tabs])
  
  const handleTabClick = (tab: Tab, index: number) => {
    if (!tab.disabled) {
      onTabChange(tab.id)
      setFocusedIndex(index)
    }
  }
  
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        // Find previous non-disabled tab
        newIndex = index - 1
        while (newIndex >= 0 && tabs[newIndex].disabled) {
          newIndex--
        }
        if (newIndex < 0) {
          // Wrap to last non-disabled tab
          newIndex = tabs.length - 1
          while (newIndex > index && tabs[newIndex].disabled) {
            newIndex--
          }
        }
        break
        
      case 'ArrowRight':
        event.preventDefault()
        // Find next non-disabled tab
        newIndex = index + 1
        while (newIndex < tabs.length && tabs[newIndex].disabled) {
          newIndex++
        }
        if (newIndex >= tabs.length) {
          // Wrap to first non-disabled tab
          newIndex = 0
          while (newIndex < index && tabs[newIndex].disabled) {
            newIndex++
          }
        }
        break
        
      case 'Home':
        event.preventDefault()
        // Focus first non-disabled tab
        newIndex = 0
        while (newIndex < tabs.length && tabs[newIndex].disabled) {
          newIndex++
        }
        break
        
      case 'End':
        event.preventDefault()
        // Focus last non-disabled tab
        newIndex = tabs.length - 1
        while (newIndex >= 0 && tabs[newIndex].disabled) {
          newIndex--
        }
        break
        
      default:
        return
    }
    
    if (newIndex !== index && newIndex >= 0 && newIndex < tabs.length) {
      setFocusedIndex(newIndex)
      tabRefs.current[newIndex]?.focus()
    }
  }
  
  return (
    <StyledTabList
      role="tablist"
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {tabs.map((tab, index) => (
        <StyledTab
          key={tab.id}
          ref={el => { tabRefs.current[index] = el }}
          $isActive={tab.id === activeTab}
          $disabled={tab.disabled || false}
          role="tab"
          aria-selected={tab.id === activeTab}
          aria-disabled={tab.disabled || false}
          tabIndex={index === focusedIndex ? 0 : -1}
          disabled={tab.disabled}
          onClick={() => handleTabClick(tab, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          data-testid={`${dataTestId}-tab-${tab.id}`}
        >
          {tab.label}
          {typeof tab.badge === 'number' && tab.badge > 0 && (
            <StyledBadge 
              aria-label={`${tab.badge} items`}
            >
              {tab.badge > 99 ? '99+' : tab.badge}
            </StyledBadge>
          )}
        </StyledTab>
      ))}
    </StyledTabList>
  )
}

TabBar.displayName = 'TabBar'
