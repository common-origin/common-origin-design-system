import React from 'react'
import styled from 'styled-components'
import tokens from '../../../lib/cssTokens'
import { Icon } from '../Icon'

const { semantic } = tokens
const { color, typography, size } = semantic

export type AILabelKind = 'suggested' | 'removal'
export type AILabelSize = 'small' | 'medium'

export interface AILabelProps {
  /**
   * What the agent proposes for the item: a change or addition ("Suggested"), or its removal
   * ("Will be removed"). The wording is fixed so it reads the same in every product (decision 0046).
   * @default 'suggested'
   */
  kind?: AILabelKind
  /**
   * Size on the label scale (decision 0018): small (20px) for dense lists, medium (24px) elsewhere.
   * @default 'medium'
   */
  size?: AILabelSize
  /** Test identifier for automated testing */
  'data-testid'?: string
}

const labels: Record<AILabelKind, string> = {
  suggested: 'Suggested',
  removal: 'Will be removed',
}

const sizeConfig = {
  small: { font: typography.caption, gap: semantic.space[100], icon: 'xs' as const },
  medium: { font: typography.small, gap: semantic.space[200], icon: 'sm' as const },
}

const StyledAILabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $size: AILabelSize }>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  min-height: ${({ $size }) => size.label[$size]};
  gap: ${({ $size }) => sizeConfig[$size].gap};
  font: ${({ $size }) => sizeConfig[$size].font};
  color: ${color.text.ai};
  white-space: nowrap;
`

const StyledIcon = styled.span`
  display: inline-flex;
  color: ${color.icon.ai};
`

/**
 * AILabel marks content an agent has proposed but the user hasn't accepted (decision 0046): the AI
 * icon and a fixed label in the AI colour, never colour alone (decision 0043). It isn't a status
 * (use StatusLabel) or a category (use CategoryLabel), and it doesn't label AI features in general.
 *
 * @example
 * ```tsx
 * <AILabel />                  // "Suggested"
 * <AILabel kind="removal" />   // "Will be removed"
 * ```
 */
export const AILabel: React.FC<AILabelProps> = ({ kind = 'suggested', size: labelSize = 'medium', 'data-testid': dataTestId }) => (
  <StyledAILabel $size={labelSize} data-testid={dataTestId}>
    {/* Decorative: the label says it (decision 0028) */}
    <StyledIcon aria-hidden="true">
      <Icon name="ai" size={sizeConfig[labelSize].icon} iconColor="inherit" />
    </StyledIcon>
    {labels[kind]}
  </StyledAILabel>
)

AILabel.displayName = 'AILabel'
