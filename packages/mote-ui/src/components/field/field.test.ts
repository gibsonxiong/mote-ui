import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtField from './field.vue'

describe('MtField', () => {
  it('renders label and input', () => {
    const wrapper = mount(MtField, { props: { label: '用户名', placeholder: '请输入' } })
    expect(wrapper.find('.mt-field__label').text()).toContain('用户名')
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(MtField)
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('filters non-digit characters for digit type', async () => {
    const wrapper = mount(MtField, { props: { type: 'digit' } })
    const input = wrapper.find('input')
    await input.setValue('a1b2')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['12'])
  })

  it('renders textarea for textarea type', () => {
    const wrapper = mount(MtField, { props: { type: 'textarea' } })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('shows required mark', () => {
    const wrapper = mount(MtField, { props: { label: '姓名', required: true } })
    expect(wrapper.find('.mt-field__required').exists()).toBe(true)
  })

  it('shows word limit with maxlength', () => {
    const wrapper = mount(MtField, {
      props: { modelValue: 'ab', maxlength: 10, showWordLimit: true },
    })
    expect(wrapper.find('.mt-field__word-limit').text()).toBe('2/10')
  })

  it('emits clear and resets value', async () => {
    const wrapper = mount(MtField, { props: { modelValue: 'abc', clearable: true } })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('.mt-field__clear').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('applies error class', () => {
    const wrapper = mount(MtField, { props: { error: true } })
    expect(wrapper.classes()).toContain('mt-field--error')
  })
})
