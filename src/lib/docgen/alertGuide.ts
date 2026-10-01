// "When to use Alert vs InlineAlert" (decision 0019). Shared by the Alert and InlineAlert docs
// pages so the guidance can't drift between them.
export const alertGuideNotes: string[] = [
  'When to use Alert vs InlineAlert: use Alert for a block message at the top or bottom of a page or inside content, especially one that needs a title, longer copy, an action or a dismiss button. Use InlineAlert for a short, local message next to what it is about: between paragraphs, below a field or in a table cell. InlineAlert has only an icon and short text, with no background or border (decision 0019).',
  'Field feedback: TextField, NumberInput, Checkbox and Dropdown show their own errors and helper text through their error and helperText props; use those. For any other control, place an InlineAlert with an id next to it and reference that id from the control with aria-describedby, so the message is read when the control is focused.',
  'Alert\'s inline prop is deprecated: replace <Alert inline> with <InlineAlert> (same variant and text). An inline alert that needs a title, action or dismiss button stays an Alert. inline is removed in 3.0.'
]
