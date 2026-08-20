import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtPasswordInput from './password-input.vue'

describe('MtPasswordInput', () => {
  it('renders the configured number of cells', () => {
    const wrapper = mount(MtPasswordInput, { props: { length: 4 } })
    expect(wrapper.findAll('.mt-password-input__cell').length).toBe(4)
  })

  it('masks entered characters as dots by default', () => {
    const wrapper = mount(MtPasswordInput, { props: { modelValue: '12' } })
    const dots = wrapper.findAll('.mt-password-input__dot')
    expect(dots.length).toBe(2)
    expect(wrapper.text()).not.toContain('1')
  })

  it('shows plain characters when mask is false', () => {
    const wrapper = mount(MtPasswordInput, { props: { modelValue: '12', mask: false } })
    expect(wrapper.findAll('.mt-password-input__char').length).toBe(2)
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
  })

  it('shows the cursor on the next empty cell when focused', () => {
    const wrapper = mount(MtPasswordInput, { props: { modelValue: '1', focused: true } })
    const cells = wrapper.findAll('.mt-password-input__cell')
    expect(cells[1].find('.mt-password-input__cursor').exists()).toBe(true)
  })

  it('does not show a cursor when not focused', () => {
    const wrapper = mount(MtPasswordInput, { props: { modelValue: '1', focused: false } })
    expect(wrapper.find('.mt-password-input__cursor').exists()).toBe(false)
  })

  it('applies a number gutter as px margin', () => {
    const wrapper = mount(MtPasswordInput, { props: { gutter: 12 } })
    const cell = wrapper.find('.mt-password-input__cell')
    expect(cell.attributes('style')).toContain('margin-right: 12px')
  })

  it('passes a string gutter through unchanged', () => {
    const wrapper = mount(MtPasswordInput, { props: { gutter: '1rem' } })
    expect(wrapper.find('.mt-password-input__cell').attributes('style')).toContain(
      'margin-right: 1rem',
    )
  })

  it('shows the info hint', () => {
    const wrapper = mount(MtPasswordInput, { props: { info: '6 digits' } })
    const hint = wrapper.find('.mt-password-input__hint')
    expect(hint.text()).toBe('6 digits')
    expect(hint.classes()).not.toContain('mt-password-input__hint--error')
  })

  it('prefers errorInfo over info and flags it as error', () => {
    const wrapper = mount(MtPasswordInput, {
      props: { info: '6 digits', errorInfo: 'Wrong length' },
    })
    const hint = wrapper.find('.mt-password-input__hint')
    expect(hint.text()).toBe('Wrong length')
    expect(hint.classes()).toContain('mt-password-input__hint--error')
  })

  it('emits focus when the container is focused', async () => {
    const wrapper = mount(MtPasswordInput)
    await wrapper.find('.mt-password-input__security').trigger('focus')
    expect(wrapper.emitted('focus')).toHaveLength(1)
  })
})