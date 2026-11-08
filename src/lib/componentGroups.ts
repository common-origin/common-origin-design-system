import type { ComponentGroup } from './docgen/types'

/**
 * The docs site's component groups in sidebar order (decision 0057). Each component goes in the
 * group for the job someone uses it for, not how it works.
 */
export const COMPONENT_GROUPS: readonly ComponentGroup[] = [
  'Actions',
  'Inputs',
  'Navigation',
  'Feedback',
  'Overlays',
  'Labels',
  'Data display',
  'Content',
  'Layout',
]
