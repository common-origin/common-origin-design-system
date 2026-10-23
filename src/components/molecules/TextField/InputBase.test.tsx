import { render } from '@testing-library/react'
import tokens from '@/styles/tokens.json'
import { StyledInputBase, StyledTextAreaBase } from './InputBase'

const { component: { input }, semantic } = tokens

describe('InputBase', () => {
  it('gives the textarea the input border, font and its own minimum height', () => {
    const { container } = render(<StyledTextAreaBase aria-label="Notes" />)
    const style = getComputedStyle(container.querySelector('textarea')!)

    expect(style.border).toBe(`${input.default.borderWidth} solid rgb(144, 144, 144)`) // gray.800, the control edge (#190)
    expect(style.borderRadius).toBe(input.default.borderRadius)
    expect(style.font).toBe(`400 1rem / 1.5rem "Inter", sans-serif`)
    expect(style.minHeight).toBe(input.textarea.minHeight)
    expect(style.padding).toBe(`${semantic.space.inset.md} ${semantic.space.inset.lg}`)
    expect(style.resize).toBe('vertical')
  })

  it('shares the same base styles between the input and the textarea', () => {
    const { container } = render(
      <>
        <StyledInputBase aria-label="Name" />
        <StyledTextAreaBase aria-label="Notes" />
      </>
    )
    const inputStyle = getComputedStyle(container.querySelector('input')!)
    const textareaStyle = getComputedStyle(container.querySelector('textarea')!)

    for (const property of ['font', 'color', 'border', 'border-radius', 'background-color', 'transition']) {
      expect(textareaStyle.getPropertyValue(property)).toBe(inputStyle.getPropertyValue(property))
    }
  })
})
