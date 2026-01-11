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
  // Boolean chips with selected state get special background
  if ($selected) {
    return `
      background-color: ${tokens.semantic.color.background['interactive-subtle']};
      color: ${chip.default.textColor};
      
      &:hover {
        background-color: ${$disabled ? tokens.semantic.color.background['interactive-subtle'] : ($clickable ? '#CAE8FF' : tokens.semantic.color.background['interactive-subtle'])};
      }
      
      &:active {
        background-color: ${$disabled ? tokens.semantic.color.background['interactive-subtle'] : ($clickable ? '#B5DEFF' : tokens.semantic.color.background['interactive-subtle'])};
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

// Export chip tokens for reuse
export { chip as chipTokens }
