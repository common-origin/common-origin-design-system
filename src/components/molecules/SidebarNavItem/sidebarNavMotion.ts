import styled, { css } from 'styled-components'
import tokens from '@/lib/cssTokens'
import { reducedMotion } from '../../../lib/styleUtils'

// How SidebarNav's pieces move between expanded and the rail (issue 348), shared by the nav, its rows
// and its sections so they move as one: nothing unmounts or re-lays out mid-move.

const { semantic } = tokens
const { motion, space, size } = semantic

/**
 * SidebarNav sets this on itself: its expanded width. Content inside keeps that width while the nav
 * narrows, so the nav's edge clips it instead of it reflowing or ellipsising mid-move.
 */
export const EXPANDED_WIDTH_VAR = '--co-sidebar-nav-expanded'

/**
 * SidebarNav sets this to its body's scrollbar width (0 for overlay scrollbars), measured while
 * expanded, since a classic scrollbar narrows every row
 */
export const SCROLLBAR_VAR = '--co-sidebar-nav-scrollbar'

/** The nav's own side padding: the rail's inner width is the rail less twice this */
export const NAV_PADDING = space[200]

/**
 * The rail's width: a row as wide as it's tall (size.control.md, decision 0059), with the nav's padding
 * on each side, so it follows density: 48, 56 and 64px (decision 0060)
 */
export const RAIL_WIDTH = `calc(${size.control.md} + 2 * ${NAV_PADDING})`

/**
 * A row's left inset: centres an icon in the rail's square row, and stays the same expanded, so icons
 * never move. Follows density with the row: 8, 12 and 16px
 */
export const ROW_INSET = `calc((${size.control.md} - ${size.icon.sm}) / 2)`

/**
 * Fades content that the rail doesn't show (labels, meta text, the badge count, the header and
 * footer). Leaving is quick and accelerates; arriving decelerates over the width's duration (0037).
 * Hidden content also leaves the keyboard and screen readers once the fade ends.
 */
export const fade = (hidden: boolean) => css`
  opacity: ${hidden ? 0 : 1};
  /* Shown content inherits, so anything hidden around it (a folded section) still wins */
  visibility: ${hidden ? 'hidden' : 'inherit'};
  transition: ${hidden
    ? `opacity ${motion.duration.fast} ${motion.easing.accelerate}, visibility ${motion.duration.fast} ${motion.easing.accelerate}`
    : `opacity ${motion.duration.moderate} ${motion.easing.decelerate}, visibility ${motion.duration.moderate} ${motion.easing.decelerate}`};
`

/**
 * Folds something away (its height animates to nothing, with a fade), for what the rail leaves out:
 * a section's header, a section with nothing to show, an item without an icon. Under reduced motion
 * the height changes at once and only the fade remains (0015).
 */
export const Fold = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  ${({ $open }) => fade(!$open)}
  transition: grid-template-rows ${motion.duration.moderate} ${motion.easing.decelerate},
    ${({ $open }) =>
      $open
        ? `opacity ${motion.duration.moderate} ${motion.easing.decelerate}, visibility ${motion.duration.moderate} ${motion.easing.decelerate}`
        : `opacity ${motion.duration.fast} ${motion.easing.accelerate}, visibility ${motion.duration.moderate} ${motion.easing.accelerate}`};

  /* Clipped only while folded: once open, focus rings outside a control aren't cut off. A grid item
     won't shrink below its content unless told to, so without min-width a row would keep its
     expanded width in the rail and the nav's edge would cut off its right side */
  & > * {
    min-height: 0;
    min-width: 0;
    overflow: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  }

  ${reducedMotion} {
    transition: opacity ${motion.duration.fast} ${motion.easing.decelerate},
      visibility ${motion.duration.fast} ${motion.easing.decelerate};
  }
`
