// Shape indicators for the six coloured statuses (decision 0045): filled silhouettes on the
// 24px grid, each the same outline as its status icon. Internal: they aren't public icons, so a
// bare shape can't be shown without its label. The shape indicator (#264) and the small
// StatusLabel and InlineAlert sizes render them at 12px or more, with a darker edge.

export type StatusShape = 'error' | 'serious' | 'warning' | 'success' | 'info' | 'inProgress'

export const statusShapes: Record<StatusShape, string> = {
  error: 'M22.5 12L17.25 21.0933L6.75 21.0933L1.5 12L6.75 2.9067L17.25 2.9067Z',
  serious: 'M12 2L22 12L12 22L2 12Z',
  warning: 'M12 2.5L22 20.5L2 20.5Z',
  success: 'M12 2A10 10 0 1 1 12 22A10 10 0 1 1 12 2Z',
  info: 'M7 2H17A5 5 0 0 1 22 7V17A5 5 0 0 1 17 22H7A5 5 0 0 1 2 17V7A5 5 0 0 1 7 2Z',
  inProgress: 'M12 2A10 10 0 1 1 12 22A10 10 0 1 1 12 2ZM12 4A8 8 0 1 0 12 20A8 8 0 1 0 12 4ZM12 6A6 6 0 0 1 12 18Z',
}
