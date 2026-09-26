import { render, screen } from '@testing-library/react'
import tokens from '@/styles/tokens.json'
import { effectiveFontWeight } from '@/test-utils/effectiveFontWeight'
import { TextField } from './TextField'
import { PasswordField } from './PasswordField'
import { NumberInput } from './NumberInput'
import { Dropdown } from './Dropdown'
import { Checkbox } from './Checkbox'

// The field family shares its label, required indicator and helper text through
// component.field (decision 0014)
const { field } = tokens.component
const fontSize = (typography: string) => typography.split(' ')[1].split('/')[0]

describe('field family', () => {
  const labelled = [
    ['TextField', () => render(<TextField label="Name" required helperText="Hint" />)],
    ['PasswordField', () => render(<PasswordField label="Name" required helperText="Hint" />)],
    ['NumberInput', () => render(<NumberInput label="Name" required helperText="Hint" />)],
  ] as const

  it.each(labelled)('%s uses the field label and required-indicator tokens', (_, renderField) => {
    renderField()
    const label = screen.getByText('Name').closest('label')!
    expect(label).toHaveStyle({ color: field.label.color, fontSize: fontSize(field.label.typography) })
    const asterisk = screen.getByText('*')
    expect(asterisk).toHaveStyle({ color: field.requiredIndicator.color })
    expect(effectiveFontWeight(asterisk)).toBe(field.requiredIndicator.fontWeight)
  })

  const withHelper = [
    ...labelled,
    ['Dropdown', () => render(<Dropdown label="Name" helperText="Hint" value="" options={[{ id: 'a', label: 'A' }]} onChange={() => {}} />)],
    ['Checkbox', () => render(<Checkbox label="Name" helperText="Hint" />)],
  ] as const

  it.each(withHelper)('%s uses the field helper-text tokens', (_, renderField) => {
    renderField()
    expect(screen.getByText('Hint')).toHaveStyle({
      color: field.helperText.color,
      fontSize: fontSize(field.helperText.typography),
    })
  })
})
