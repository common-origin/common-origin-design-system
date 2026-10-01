// "Which label do I use?" (decision 0018). Shared by the Badge, StatusLabel, CategoryLabel, Tag
// and Chip docs pages so the guidance can't drift between them.
export const labelGuideNotes: string[] = [
  'Which label do I use? Badge: a count or dot anchored to another element (a button, tab or icon). StatusLabel: the status of something (pending, completed, failed…), always with an icon. CategoryLabel: colour-codes an item\'s category, such as a transaction\'s; category colours carry no status meaning. Tag: a small non-interactive label in dense compositions. Chip: a static label; use InputChip for a removable value and BooleanChip (FilterChip in 3.0) for a filter toggle (decisions 0016 and 0018).',
  'Label sizes share one scale: small 20px, medium 24px, large 32px (semantic.size.label). StatusLabel takes small and medium; CategoryLabel takes medium and large. Tag moves onto this scale, with small and medium, in #104.'
]
