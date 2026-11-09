/**
 * The docs site's component groups in sidebar order (decision 0057). Each component goes in the
 * group for the job someone uses it for, not how it works. ComponentGroup is derived from this list,
 * so a group can't be typed in a docs page without appearing in the sidebar.
 */
export const COMPONENT_GROUPS = [
  'Actions',
  'Inputs',
  'Navigation',
  'Feedback',
  'Overlays',
  'Labels',
  'Data display',
  'Content',
  'Layout',
] as const

export type ComponentGroup = (typeof COMPONENT_GROUPS)[number]
