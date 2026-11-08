import React, { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import tokens from '@/lib/cssTokens'
import { exitAnimation, forcedColorsEdge, interactiveRow, reducedMotion } from '../../../lib/styleUtils'
import { usePresence } from '../../../lib/usePresence'
import { laidOutElement, type FloatingAlign, type FloatingSide } from '../../../lib/floatingPosition'
import { ANCHOR_WIDTH_VAR, useFloatingLayer, useIsomorphicLayoutEffect } from '../../../lib/useFloatingLayer'
import { Icon } from '../../atoms/Icon'

const { semantic } = tokens
const { space, color, motion, radius, size, elevation, border, typography } = semantic

// Typeahead keeps typed characters together for this long. An input timing, not a motion value.
const TYPEAHEAD_RESET_MS = 500

const ITEM_SELECTOR = '[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]'

interface MenuContextValue {
  close: (options?: { returnFocus?: boolean }) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

const useMenu = (component: string) => {
  const context = useContext(MenuContext)
  if (!context) throw new Error(`${component} must be used inside a Menu`)
  return context
}

export type MenuSide = FloatingSide
export type MenuAlign = FloatingAlign

export interface MenuProps {
  /**
   * The element that opens the menu, such as a Button or IconButton. Menu gives it
   * `aria-haspopup`, `aria-expanded` and `aria-controls`, and the menu takes its name from it.
   */
  trigger: React.ReactElement
  /** `MenuItem`, `MenuItemRadio`, `MenuItemCheckbox`, `MenuGroup` and `MenuDivider` */
  children: React.ReactNode
  /** Whether the menu is open (controlled). Use with `onOpenChange`. */
  open?: boolean
  /**
   * Whether the menu starts open (uncontrolled).
   * @default false
   */
  defaultOpen?: boolean
  /** Called when the menu opens or closes */
  onOpenChange?: (open: boolean) => void
  /**
   * The side of the trigger it opens on. It flips when there's no room.
   * @default 'bottom'
   */
  side?: MenuSide
  /**
   * Where it lines up along the trigger's edge.
   * @default 'start'
   */
  align?: MenuAlign
  /**
   * Makes the menu at least as wide as its trigger, for a full-width trigger such as
   * WorkspaceSwitcher's, so the two line up. It still grows with its content, up to the usual
   * maximum, and never goes below the usual minimum for a small trigger.
   * @default false
   */
  matchTriggerWidth?: boolean
  /** Test identifier for the menu */
  'data-testid'?: string
}

const enter = keyframes`
  from {
    opacity: 0;
    transform: translateY(calc(-1 * ${motion.distance.sm}));
  }
`

const fade = keyframes`
  from { opacity: 0; }
`

// Dropdown's panel (P5): the raised surface with a decorative outline and floating elevation,
// dropping in over duration.fast (0037); under reduced motion it only fades (0015)
const Panel = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $exiting: boolean }>`
  position: fixed;
  inset: auto;
  top: 0;
  left: 0;
  margin: 0;
  box-sizing: border-box;
  /* At least the trigger's width when matchTriggerWidth sets the variable, within the usual range */
  min-width: min(max(${size[4500]}, var(${ANCHOR_WIDTH_VAR}, 0px)), ${size[7500]});
  max-width: ${size[7500]};
  max-height: ${size.menu.maxHeight};
  overflow-y: auto;
  padding: ${space[100]} 0;
  background-color: ${semantic.surface.raised};
  color: ${color.text.default};
  border: ${border.default};
  border-radius: ${radius.md};
  box-shadow: ${elevation.floating};
  animation: ${enter} ${motion.duration.fast} ${motion.easing.decelerate}
    ${({ $exiting }) => ($exiting ? exitAnimation : css``)};

  ${reducedMotion} {
    animation: ${fade} ${motion.duration.fast} ${motion.easing.decelerate}
      ${({ $exiting }) => ($exiting ? exitAnimation : css``)};
  }

  ${forcedColorsEdge}

  &:focus {
    outline: none;
  }
`

// The trigger's wrapper takes no box of its own
const Anchor = styled.span`
  display: contents;
`

const focusItem = (menu: HTMLElement | null, which: 'first' | 'last') => {
  const items = menu ? Array.from(menu.querySelectorAll<HTMLElement>(ITEM_SELECTOR)) : []
  ;(which === 'first' ? items[0] : items[items.length - 1])?.focus()
}

/**
 * A menu of actions and choices that opens from a trigger (#329), following the WAI-ARIA menu
 * button pattern. Not a select: for choosing a form value, use Dropdown.
 */
export const Menu = ({
  trigger,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  matchTriggerWidth = false,
  'data-testid': dataTestId,
}: MenuProps) => {
  const menuId = useId()
  const triggerId = useId()
  const anchorRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  // Which item to focus once the menu has opened
  const initialFocus = useRef<'first' | 'last'>('first')
  const openedFromTrigger = useRef(false)
  const typeahead = useRef({ text: '', timer: undefined as ReturnType<typeof setTimeout> | undefined })

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const isOpen = isControlled ? openProp : uncontrolledOpen
  const { isPresent, isExiting } = usePresence(isOpen)

  const triggerElement = () => laidOutElement(anchorRef.current) as HTMLElement | null

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const close = useCallback(
    ({ returnFocus = true }: { returnFocus?: boolean } = {}) => {
      setOpen(false)
      if (returnFocus) triggerElement()?.focus()
    },
    [setOpen]
  )

  const openWith = (focus: 'first' | 'last') => {
    initialFocus.current = focus
    openedFromTrigger.current = true
    setOpen(true)
  }

  // The trigger's ARIA is set on the element itself, so it reaches the real control even when the
  // trigger is wrapped (a Tooltip inside the trigger, for example)
  useEffect(() => {
    const element = triggerElement()
    if (!element) return
    if (!element.id) element.id = triggerId
    element.setAttribute('aria-haspopup', 'menu')
    element.setAttribute('aria-expanded', String(isOpen))
    if (isOpen) element.setAttribute('aria-controls', menuId)
    else element.removeAttribute('aria-controls')
  })

  // The menu is named by its trigger, whose own id is kept if it has one
  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current
    const element = triggerElement()
    if (!isPresent || !panel || !element) return
    if (!element.id) element.id = triggerId
    panel.setAttribute('aria-labelledby', element.id)
  }, [isPresent])

  // In the top layer beside the trigger; scrolling or resizing closes it, since the trigger moves
  const detach = useCallback(() => close({ returnFocus: false }), [close])
  useFloatingLayer({
    isPresent,
    floatingRef: panelRef,
    anchorRef,
    side,
    align,
    matchAnchorWidth: matchTriggerWidth,
    onDetach: detach,
  })

  // Opening from the trigger focuses the first or last item. An open that didn't come from the
  // trigger (defaultOpen, or a controlled open) leaves focus where it is
  useEffect(() => {
    if (!isOpen || !openedFromTrigger.current) return
    openedFromTrigger.current = false
    focusItem(panelRef.current, initialFocus.current)
  }, [isOpen])

  // A press outside the trigger and the menu closes it, leaving focus where the press put it
  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || anchorRef.current?.contains(target)) return
      close({ returnFocus: false })
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [isOpen, close])

  useEffect(() => () => clearTimeout(typeahead.current.timer), [])

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (panelRef.current?.contains(event.target as Node)) return
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openWith('first')
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      openWith('last')
    }
  }

  const onTriggerClick = (event: React.MouseEvent) => {
    if (panelRef.current?.contains(event.target as Node)) return
    // A keyboard click (Enter, Space) is handled on keydown
    if (event.detail === 0) return
    if (isOpen) close({ returnFocus: false })
    else openWith('first')
  }

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(ITEM_SELECTOR))
    const current = items.indexOf(document.activeElement as HTMLElement)
    const move = (index: number) => {
      event.preventDefault()
      items[(index + items.length) % items.length]?.focus()
    }
    switch (event.key) {
      case 'ArrowDown': return move(current + 1)
      case 'ArrowUp': return move(current - 1)
      case 'Home': return move(0)
      case 'End': return move(items.length - 1)
      case 'Escape':
        event.preventDefault()
        event.stopPropagation()
        return close()
      case 'Tab':
        // Focus moves on to the next element after the trigger, and the menu closes
        return close({ returnFocus: false })
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== ' ') {
          const state = typeahead.current
          clearTimeout(state.timer)
          state.text += event.key.toLowerCase()
          state.timer = setTimeout(() => { state.text = '' }, TYPEAHEAD_RESET_MS)
          // The label alone: not a leading Avatar's initials, the description or the shortcut
          const label = (item: HTMLElement) =>
            (item.dataset.label ?? item.querySelector('[data-menu-label]')?.textContent ?? '').trim().toLowerCase()
          const ordered = [...items.slice(current + 1), ...items.slice(0, current + 1)]
          const search = state.text.length > 1 ? [items[current], ...ordered] : ordered
          search.find((item) => item && label(item).startsWith(state.text))?.focus()
        }
    }
  }

  return (
    <MenuContext.Provider value={{ close }}>
      <Anchor ref={anchorRef} onKeyDown={onTriggerKeyDown} onClick={onTriggerClick}>
        {trigger}
        {isPresent && (
          <Panel
            ref={panelRef}
            id={menuId}
            role="menu"
            tabIndex={-1}
            $exiting={isExiting}
            onKeyDown={onMenuKeyDown}
            data-testid={dataTestId}
          >
            {children}
          </Panel>
        )}
      </Anchor>
    </MenuContext.Provider>
  )
}

Menu.displayName = 'Menu'

// ---------------------------------------------------------------------------------------------
// Items

interface ItemBaseProps {
  /** The item's label */
  children: React.ReactNode
  /** A leading Icon or Avatar. Decorative: the label names the item (decision 0028). */
  icon?: React.ReactNode
  /** Secondary text under the label, such as a workspace's plan */
  description?: React.ReactNode
  /**
   * A keyboard shortcut shown at the end of the item: `label` is shown (such as "⌘K") and `keys` is
   * exposed as `aria-keyshortcuts` (such as "Meta+K"). Display only: Menu doesn't bind the keys.
   */
  shortcut?: { label: string; keys: string }
  /** Whether the item can be activated. A disabled item can still be focused (WAI-ARIA). */
  disabled?: boolean
  /** Text for typeahead, when the label isn't plain text */
  textValue?: string
  /** Test identifier for the item */
  'data-testid'?: string
}

export interface MenuItemProps extends ItemBaseProps {
  /** Called when the item is activated. The menu then closes. */
  onSelect?: () => void
  /**
   * A destructive action, shown in the danger colour as ActionSheet's are.
   * @default false
   */
  destructive?: boolean
}

export interface MenuItemRadioProps extends ItemBaseProps {
  /** Whether this is the chosen item of its group */
  checked: boolean
  /** Called when the item is chosen. The menu then closes. */
  onSelect?: () => void
}

export interface MenuItemCheckboxProps extends ItemBaseProps {
  /** Whether the item is on */
  checked: boolean
  /** Called with the new state when the item is toggled. The menu stays open. */
  onCheckedChange?: (checked: boolean) => void
}

const Row = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $checked: boolean; $focused: boolean; $disabled: boolean; $destructive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${space[200]};
  box-sizing: border-box;
  min-height: ${size.row.sm};
  padding: ${space.inset.xs} ${space.inset.md};
  font: ${typography.small};
  color: ${({ $destructive }) => ($destructive ? color.text.danger : color.text.default)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  transition: background-color ${motion.duration.fast} ${motion.easing.decelerate},
    color ${motion.duration.fast} ${motion.easing.decelerate};

  /* The shared row states (0030): focus shows the hover state (0029); only checked items are
     light blue, with the checkmark so the state isn't colour alone */
  ${({ $checked, $focused, $disabled }) => interactiveRow({ selected: $checked, focused: $focused, disabled: $disabled })}

  ${({ $disabled }) => $disabled && css`color: ${color.text.disabled};`}

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: ${border.focus};
    outline-offset: calc(-1 * ${border.focusOffset});
  }
`

const Leading = styled.span`
  display: inline-flex;
  flex-shrink: 0;
`

const Text = styled.span`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`

const Description = styled.span`
  font: ${typography.caption};
  color: ${color.text.muted};
`

const Shortcut = styled.span`
  flex-shrink: 0;
  font: ${typography.caption};
  color: ${color.text.muted};
`

const Check = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: inherit;
`

interface RowItemProps extends ItemBaseProps {
  role: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox'
  checked?: boolean
  destructive?: boolean
  onActivate: () => void
}

const RowItem = ({
  role,
  children,
  icon,
  description,
  shortcut,
  disabled = false,
  destructive = false,
  checked,
  textValue,
  onActivate,
  'data-testid': dataTestId,
}: RowItemProps) => {
  const [focused, setFocused] = useState(false)
  const checkable = role !== 'menuitem'

  const activate = () => {
    if (!disabled) onActivate()
  }

  return (
    <Row
      role={role}
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      aria-checked={checkable ? Boolean(checked) : undefined}
      aria-keyshortcuts={shortcut?.keys}
      data-label={textValue}
      data-testid={dataTestId}
      $checked={Boolean(checked)}
      $focused={focused}
      $disabled={disabled}
      $destructive={destructive}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPointerMove={(event) => {
        // The pointer moves focus, so hover and keyboard share one highlighted item
        if (document.activeElement !== event.currentTarget) event.currentTarget.focus()
      }}
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          activate()
        }
      }}
    >
      {icon && <Leading aria-hidden="true">{icon}</Leading>}
      <Text>
        <span data-menu-label="">{children}</span>
        {description && <Description>{description}</Description>}
      </Text>
      {shortcut && <Shortcut aria-hidden="true">{shortcut.label}</Shortcut>}
      {checkable && checked && (
        <Check>
          <Icon name="check" size="sm" iconColor="inherit" />
        </Check>
      )}
    </Row>
  )
}

/** An action. Activating it closes the menu. */
export const MenuItem = ({ onSelect, ...props }: MenuItemProps) => {
  const { close } = useMenu('MenuItem')
  return (
    <RowItem
      role="menuitem"
      {...props}
      onActivate={() => {
        close()
        onSelect?.()
      }}
    />
  )
}

/** One choice of a set, inside a MenuGroup. Choosing it closes the menu. */
export const MenuItemRadio = ({ onSelect, checked, ...props }: MenuItemRadioProps) => {
  const { close } = useMenu('MenuItemRadio')
  return (
    <RowItem
      role="menuitemradio"
      checked={checked}
      {...props}
      onActivate={() => {
        close()
        onSelect?.()
      }}
    />
  )
}

/** An on/off option, inside a MenuGroup. Toggling it keeps the menu open. */
export const MenuItemCheckbox = ({ onCheckedChange, checked, ...props }: MenuItemCheckboxProps) => {
  useMenu('MenuItemCheckbox')
  return <RowItem role="menuitemcheckbox" checked={checked} {...props} onActivate={() => onCheckedChange?.(!checked)} />
}

// ---------------------------------------------------------------------------------------------
// Structure

export interface MenuGroupProps {
  /** A visible label for the group, which also names it for assistive technology */
  label?: string
  /** The group's items */
  children: React.ReactNode
}

const GroupLabel = styled.div`
  padding: ${space.inset.xs} ${space.inset.md};
  font: ${typography.caption};
  color: ${color.text.muted};
`

/** Groups related items. Radio and checkbox items always sit in a group. */
export const MenuGroup = ({ label, children }: MenuGroupProps) => {
  const labelId = useId()
  return (
    <div role="group" aria-labelledby={label ? labelId : undefined}>
      {label && (
        <GroupLabel id={labelId} aria-hidden="true">
          {label}
        </GroupLabel>
      )}
      {children}
    </div>
  )
}

// Divider's smallest spacing (16px each side) is too loose between dense rows, so the menu draws
// its own 1px rule with the decorative border
const Separator = styled.div`
  margin: ${space[100]} 0;
  border-top: ${border.default};
`

/** Separates groups */
export const MenuDivider = () => <Separator role="separator" aria-orientation="horizontal" />

MenuItem.displayName = 'MenuItem'
MenuItemRadio.displayName = 'MenuItemRadio'
MenuItemCheckbox.displayName = 'MenuItemCheckbox'
MenuGroup.displayName = 'MenuGroup'
MenuDivider.displayName = 'MenuDivider'
