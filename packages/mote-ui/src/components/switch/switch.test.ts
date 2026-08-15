import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtSwitch from './switch.vue'

describe('MtSwitch', () => {
  it('renders unchecked by default', () => {
    const wrapper = mount(MtSwitch)
    expect(wrapper.classes()).not.toContain('is-checked')
  })

  it('reflects checked state from modelValue', () => {
    const wrapper = mount(MtSwitch, { props: { modelValue: true } })
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('emits update:modelValue and change on click', async () => {
    const wrapper = mount(MtSwitch, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('supports custom active/inactive values', async () => {
    const wrapper = mount(MtSwitch, {
      props: { modelValue: 'off', activeValue: 'on', inactiveValue: 'off' },
    })
    expect(wrapper.classes()).not.toContain('is-checked')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['on'])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(MtSwitch, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('does not emit when loading', async () => {
    const wrapper = mount(MtSwitch, { props: { loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
