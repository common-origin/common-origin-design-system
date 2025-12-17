import { ReactNode, useState, useRef, useEffect, KeyboardEvent, MouseEvent } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

/**
 * Tab variant options for TabBar
 */
export type TabVariant = 'default' | 'pills' | 'underline'

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
   * Visual variant of the tabs
   * @default 'default'
   */
  variant?: TabVariant
  
  /**
   * Accessible label for the tab list
   */
  'aria-label'?: string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
}

interface StyledTabListProps {
  $variant: TabVariant
}

interface StyledTabProps {
  $variant: TabVariant
  $isActive: boolean
  $disabled: boolean
}

const StyledTabList = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledTabListProps>`
  display: flex;
  align-items: center;
  gap: ${props => props.$variant === 'pills' ? base.spacing[2] : '0'};
  border-bottom: ${props => 
    props.$variant === 'underline' 
      ? `${base.border.width[1]} solid ${semantic.color.border.subtle}` 
      : 'none'
  };
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${semantic.color.background.subtle};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${semantic.color.border.default};
    border-radius: ${base.border.radius[2]};
  }
`

const StyledTab = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledTabProps>`
  display: inline-flex;
  align-items: center;
  gap: ${base.spacing[2]};
  padding: ${base.spacing[3]} ${base.spacing[4]};
  font: ${semantic.typography.button2};
  white-space: nowrap;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  border: none;
  background: transparent;
  transition: ${semantic.motion.hover};
  position: relative;
  
  /* Variant-specific styles */
  ${props => {
    if (props.$variant === 'pills') {
      return `
        border-radius: ${base.border.radius.circle};
        background-color: ${props.$isActive 
          ? semantic.color.background.interactive 
          : semantic.color.background.subtle
        };
        color: ${props.$isActive 
          ? semantic.color.text.inverse 
          : semantic.color.text.default
        };
        
        &:hover:not(:disabled) {
          background-color: ${props.$isActive 
            ? semantic.color.background['interactive-hover']
            : semantic.color.background.surface
          };
        }
      `
    }
    
    if (props.$variant === 'underline') {
      return `
        color: ${props.$isActive 
          ? semantic.color.text.interactive 
          : semantic.color.text.subdued
        };
        
        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: ${base.border.width[2]};
          background-color: ${props.$isActive 
            ? semantic.color.background.interactive 
            : 'transparent'
          };
          transition: ${semantic.motion.hover};
        }
        
        &:hover:not(:disabled) {
          color: ${semantic.color.text.interactive};
        }
      `
    }
    
    // default variant
    return `
      border-radius: ${base.border.radius[2]} ${base.border.radius[2]} 0 0;
      background-color: ${props.$isActive 
        ? semantic.color.background.subtle 
        : semantic.color.background.default
      };
      color: ${props.$isActive 
        ? semantic.color.text.default 
        : semantic.color.text.subdued
      };
      border: ${base.border.width[1]} solid ${semantic.color.border.default};
      border-bottom: ${props.$isActive ? 'none' : `${base.border.width[1]} solid ${semantic.color.border.default}`};
      margin-bottom: ${props.$isActive ? '-1px' : '0'};
      
      &:hover:not(:disabled) {
        background-color: ${semantic.color.background.surface};
        color: ${semantic.color.text.default};
      }
    `
  }}
  
  /* Disabled state */
  opacity: ${props => props.$disabled ? '0.5' : '1'};
  
  /* Focus state */
  &:focus-visible {
    outline: ${base.border.width[2]} solid ${semantic.color.border.strong};
    outline-offset: ${base.spacing[1]};
    z-index: 1;
  }
  
  /* Active/pressed state */
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`

const StyledBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $variant: TabVariant; $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 ${base.spacing[1]};
  font: ${semantic.typography.caption};
  font-weight: ${base.fontWeight[5]};
  border-radius: ${base.border.radius.circle};
  background-color: ${props => {
    if (props.$variant === 'pills') {
      return props.$isActive 
        ? 'rgba(255, 255, 255, 0.2)'
        : semantic.color.background.interactive
    }
    return semantic.color.background.interactive
  }};
  color: ${props => props.$variant === 'pills' && props.$isActive 
    ? semantic.color.text.inverse
    : semantic.color.text.inverse
  };
`

/**
 * TabBar component for tabbed navigation
 * 
 * Provides accessible tab navigation with 3 visual variants, keyboard support,
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
 *   variant="pills"
 * />
 * ```
 */
export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
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
      $variant={variant}
      role="tablist"
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {tabs.map((tab, index) => (
        <StyledTab
          key={tab.id}
          ref={el => { tabRefs.current[index] = el }}
          $variant={variant}
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
              $variant={variant}
              $isActive={tab.id === activeTab}
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
