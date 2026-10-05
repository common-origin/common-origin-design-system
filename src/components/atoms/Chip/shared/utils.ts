import tokens from '../../../../styles/tokens.json'
import { ChipVariant, BaseChipProps } from './types'

const { component: { chip } } = tokens

interface StyledChipProps {
  $variant: ChipVariant
  $size: BaseChipProps['size']
  $disabled?: boolean
  $clickable?: boolean
  $selected?: boolean
}

// Helper function to get variant styles matching Button's approach
export const getVariantStyles = ({ $variant, $selected, $clickable, $disabled }: StyledChipProps) => {
  // Selected filter and input chips use the light-blue selected treatment (decision 0016).
  // The text darkens with the fill so every state stays at least 4.5:1.
  if ($selected) {
    // A selected disabled chip looks like any disabled chip; the checkmark keeps the
    // selected state visible (#110)
    if ($disabled) {
      const { disabled } = chip.variants.subtle
      return `
        background-color: ${disabled.backgroundColor};
        color: ${disabled.textColor};
      `
    }

    const { background, text } = tokens.semantic.color
    const interactiveStates = $clickable
    return `
      background-color: ${background['interactive-subtle']};
      color: ${text.interactive};
      
      &:hover {
        background-color: ${interactiveStates ? background['interactive-subtle-hover'] : background['interactive-subtle']};
        color: ${interactiveStates ? text['interactive-hover'] : text.interactive};
      }
      
      &:active {
        background-color: ${interactiveStates ? background['interactive-subtle-active'] : background['interactive-subtle']};
        color: ${interactiveStates ? text['interactive-active'] : text.interactive};
      }
    `
  }
  
  switch ($variant) {
    case 'emphasis':
      return `
        background-color: ${chip.variants.emphasis.backgroundColor};
        color: ${chip.variants.emphasis.textColor};
        
        &:hover {
          background-color: ${$disabled ? chip.variants.emphasis.disabled.backgroundColor : ($clickable ? chip.variants.emphasis.hover.backgroundColor : chip.variants.emphasis.backgroundColor)};
        }
        
        &:active {
          background-color: ${$disabled ? chip.variants.emphasis.disabled.backgroundColor : ($clickable ? chip.variants.emphasis.active.backgroundColor : chip.variants.emphasis.backgroundColor)};
        }
        
        ${$disabled ? `
          background-color: ${chip.variants.emphasis.disabled.backgroundColor};
          color: ${chip.variants.emphasis.disabled.textColor};
        ` : ''}
      `
    case 'subtle':
      return `
        background-color: ${chip.variants.subtle.backgroundColor};
        color: ${chip.variants.subtle.textColor};
        
        &:hover {
          background-color: ${$disabled ? chip.variants.subtle.disabled.backgroundColor : ($clickable ? chip.variants.subtle.hover.backgroundColor : chip.variants.subtle.backgroundColor)};
        }
        
        &:active {
          background-color: ${$disabled ? chip.variants.subtle.disabled.backgroundColor : ($clickable ? chip.variants.subtle.active.backgroundColor : chip.variants.subtle.backgroundColor)};
        }
        
        ${$disabled ? `
          background-color: ${chip.variants.subtle.disabled.backgroundColor};
          color: ${chip.variants.subtle.disabled.textColor};
        ` : ''}
      `
    case 'interactive':
      return `
        background-color: ${chip.variants.interactive.backgroundColor};
        color: ${chip.variants.interactive.textColor};
        
        &:hover {
          background-color: ${$disabled ? chip.variants.interactive.disabled.backgroundColor : ($clickable ? chip.variants.interactive.hover.backgroundColor : chip.variants.interactive.backgroundColor)};
        }
        
        &:active {
          background-color: ${$disabled ? chip.variants.interactive.disabled.backgroundColor : ($clickable ? chip.variants.interactive.active.backgroundColor : chip.variants.interactive.backgroundColor)};
        }
        
        ${$disabled ? `
          background-color: ${chip.variants.interactive.disabled.backgroundColor};
          color: ${chip.variants.interactive.disabled.textColor};
        ` : ''}
      `
    case 'default':
    default:
      return `
        background-color: ${chip.default.backgroundColor};
        color: ${chip.default.textColor};
        
        &:hover {
          background-color: ${$disabled ? chip.disabled.backgroundColor : ($clickable ? chip.hover.backgroundColor : chip.default.backgroundColor)};
        }
        
        &:active {
          background-color: ${$disabled ? chip.disabled.backgroundColor : ($clickable ? chip.active.backgroundColor : chip.default.backgroundColor)};
        }
        
        ${$disabled ? `
          background-color: ${chip.disabled.backgroundColor};
          color: ${chip.disabled.textColor};
        ` : ''}
      `
  }
}

// Helper function to get size styles matching Button's approach
export const getSizeStyles = ({ $size }: StyledChipProps) => {
  switch ($size) {
    case 'small':
      return `
        font: ${chip.sizes.small.font};
        // Off-grid 2px: keeps the deprecated token until #129 (decision 0022)
        padding: ${chip.sizes.small.padding};
      `
    case 'medium':
    default:
      return `
        font: ${chip.sizes.medium.font};
        padding: ${chip.sizes.medium.padding};
      `
  }
}

