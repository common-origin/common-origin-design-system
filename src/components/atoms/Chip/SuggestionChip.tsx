import React from 'react'
import styled from 'styled-components'
import tokens from '../../../lib/cssTokens'
import { forcedColors } from '../../../lib/styleUtils'
import { sizeStyles } from './shared/utils'

const { component: { chip }, semantic } = tokens
const { color } = semantic

export interface SuggestionChipProps {
  /** The suggestion. It's also the button's accessible name, so keep it short and self-explanatory. */
  children: React.ReactNode
  /** Called when the suggestion is picked. Put its text in the input; never send it (decision 0046). */
  onClick: () => void
  /** Disables the chip */
  disabled?: boolean
  /** Test identifier for automated testing */
  'data-testid'?: string
}

// Outlined, with the naked fill ladder on hover and press (decisions 0030, 0046): the edge keeps it
// visible on white, the page and AgentInput's docked band
const StyledSuggestionChip = styled.button`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  margin: 0;
  box-sizing: border-box;
  border: ${semantic.border.width.thin} solid ${color.border.input};
  border-radius: ${chip.default.borderRadius};
  background-color: ${color.fill.none};
  color: ${color.text.default};
  cursor: pointer;
  text-align: start;
  /* A long suggestion wraps inside the chip rather than being cut off (issue 279) */
  white-space: normal;
  overflow-wrap: anywhere;
  transition: ${semantic.motion.transition.feedback};
  ${sizeStyles}

  &:hover:not(:disabled) {
    background-color: ${color.fill['none-hover']};
  }

  &:active:not(:disabled) {
    background-color: ${color.fill['none-pressed']};
  }

  &:focus-visible {
    outline: ${chip.focus.outline};
    outline-offset: ${semantic.border.focusOffset};
  }

  &:disabled {
    border-color: ${color.border.emphasis};
    color: ${color.text.disabled};
    cursor: not-allowed;
  }

  /* Forced colours: a native button gets ButtonBorder and GrayText; keep the edge (decision 0038) */
  ${forcedColors} {
    border-color: ButtonBorder;

    &:disabled {
      border-color: GrayText;
    }
  }
`

/**
 * SuggestionChip - Offers text to put in the agent input
 *
 * The Suggestion chip type from decision 0046 (amending 0016): the one chip that acts on click.
 * Picking it fills the input so the user can edit before sending; it never sends or runs a command,
 * which is why it's a chip and not a Button. AgentInput renders these from its `suggestions` prop.
 *
 * Features:
 * - A native button: Enter and Space pick it, and its text is its accessible name
 * - Outlined, with the naked hover and pressed fills; no selected state
 * - One chip height (24px minimum, decision 0035); long text wraps instead of being cut off
 */
export const SuggestionChip: React.FC<SuggestionChipProps> = ({
  children,
  onClick,
  disabled = false,
  'data-testid': dataTestId,
}) => (
  <StyledSuggestionChip type="button" onClick={onClick} disabled={disabled} data-testid={dataTestId}>
    {children}
  </StyledSuggestionChip>
)

SuggestionChip.displayName = 'SuggestionChip'
