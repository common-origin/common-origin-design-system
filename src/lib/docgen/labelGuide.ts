// "Which label do I use?" (decisions 0018 and 0029). Shared by the Badge, StatusLabel,
// CategoryLabel, Tag and Chip docs pages so the guidance can't drift between them. The full
// guide, with examples, is the docs site's /guides/labels page.
export const labelGuide = { label: 'Which label do I use?', href: '/guides/labels' }

export const labelGuideNotes: string[] = [
  'Which label do I use? Badge: a count or dot anchored to another element (a button, tab or icon). StatusLabel: the status of something (pending, completed, failed…), always with an icon. CategoryLabel: colour-codes an item\'s category, such as a transaction\'s; category colours carry no status meaning. Tag: neutral metadata in dense compositions, default or emphasis (its status and interactive variants are deprecated). Chip: a static label; use InputChip for a removable value and BooleanChip (FilterChip in 3.0) for a filter toggle (decisions 0016, 0018 and 0029).',
  'Label sizes share one scale: small 20px, medium 24px, large 32px (semantic.size.label). StatusLabel and Tag take small and medium; CategoryLabel takes medium and large.'
]
