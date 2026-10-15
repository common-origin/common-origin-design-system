import tokens from '../../../../lib/cssTokens'
import { forcedColors } from '../../../../lib/styleUtils'
import { ChipVariant } from './types'

const { component: { chip }, semantic } = tokens

interface StyledChipProps {
  $variant: ChipVariant
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

    const { fill, text } = tokens.semantic.color
    const interactiveStates = $clickable
    return `
      background-color: ${fill['accent-muted']};
      color: ${text.accent};
      
      &:hover {
        background-color: ${interactiveStates ? fill['accent-muted-hover'] : fill['accent-muted']};
        color: ${interactiveStates ? text['accent-hover'] : text.accent};
      }
      
      &:active {
        background-color: ${interactiveStates ? fill['accent-muted-pressed'] : fill['accent-muted']};
        color: ${interactiveStates ? text['accent-pressed'] : text.accent};
      }

      /* Forced colours drop the fill, so a selected chip takes the system selection colours
         (decision 0038); its checkmark follows the text colour */
      ${forcedColors} {
        forced-color-adjust: none;
        background-color: Highlight;
        border-color: Highlight;
        color: HighlightText;
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

// Chips have one size: 24px from the label scale as a minimum, with the content centred
// and no vertical padding (decisions 0034 and 0035). Horizontal padding comes from the
// semantic spacing scale (decision 0022).
export const sizeStyles = `
  font: ${chip.sizes.medium.font};
  min-height: ${semantic.size.label.medium};
  padding: 0 ${semantic.space.inset.sm};
`

