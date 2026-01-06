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
export const getVariantStyles = ({ $variant, $selected }: StyledChipProps) => {
  // Boolean chips with selected state get special background
  if ($selected) {
    return `
      background-color: ${tokens.semantic.color.background['interactive-subtle']};
      color: ${chip.default.textColor};
    `
  }
  
  switch ($variant) {
    case 'emphasis':
      return `
        background-color: ${chip.variants.emphasis.backgroundColor};
        color: ${chip.variants.emphasis.textColor};
      `
    case 'subtle':
      return `
        background-color: ${chip.variants.subtle.backgroundColor};
        color: ${chip.variants.subtle.textColor};
      `
    case 'interactive':
      return `
        background-color: ${chip.variants.interactive.backgroundColor};
        color: ${chip.variants.interactive.textColor};
      `
    case 'default':
    default:
      return `
        background-color: ${chip.default.backgroundColor};
        color: ${chip.default.textColor};
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
