import styled from 'styled-components'
import tokens from '@/lib/cssTokens'
import { statusShapes, type StatusShape as StatusShapeName } from '../../../lib/statusShapes'

// The shape indicator: at least 12px (decision 0045), filled with the current text colour, which is
// the label's role colour at 5.3:1 or more on its tint, so it needs no edge. Decorative: the text
// beside it names the status. Internal to the status family (#264): not exported from the package.
const Mark = styled.svg`
  flex: none;
  width: ${tokens.semantic.size.icon.xs};
  height: ${tokens.semantic.size.icon.xs};
  fill: currentColor;
`

export const StatusShape = ({ shape }: { shape: StatusShapeName }) => (
  <Mark viewBox="0 0 24 24" aria-hidden="true" focusable="false" data-shape={shape}>
    <path d={statusShapes[shape]} />
  </Mark>
)
