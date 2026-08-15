import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtRate from './rate.vue'

describe('MtRate', () => {
  it('renders five stars by default', () => {
    const wrapper = mount(MtRate)
    expect(wrapper.findAll('.mt-rate__item')).toHaveLength(5)
  })

  it('marks stars as full up to the bound value', () => {
    const wrapper = mount(MtRate, { props: { modelValue: 3 } })
    const items = wrapper.findAll('.mt-rate__item')
    expect(items[0].classes()).toContain('is-full')
    expect(items[2].classes()).toContain('is-full')
    expect(items[3].classes()).not.toContain('is-full')
  })

  it('emits on star click', async () => {
    const wrapper = mount(MtRate, { props: { modelValue: 0 } })
    await wrapper.findAll('.mt-rate__item')[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
    expect(wrapper.emitted('change')?.[0]).toEqual([4])
  })

  it('supports custom max', () => {
    const wrapper = mount(MtRate, { props: { max: 8 } })
    expect(wrapper.findAll('.mt-rate__item')).toHaveLength(8)
  })

  it('emits half value when clicking the half zone', async () => {
    const wrapper = mount(MtRate, { props: { modelValue: 0, allowHalf: true } })
    await wrapper.findAll('.mt-rate__half')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1.5])
  })

  it('marks a star as half', () => {
    const wrapper = mount(MtRate, { props: { modelValue: 2.5, allowHalf: true } })
    const items = wrapper.findAll('.mt-rate__item')
    expect(items[2].classes()).toContain('is-half')
    expect(items[1].classes()).toContain('is-full')
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(MtRate, { props: { modelValue: 1, disabled: true } })
    await wrapper.findAll('.mt-rate__item')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('does not emit when readonly', async () => {
    const wrapper = mount(MtRate, { props: { modelValue: 1, readonly: true } })
    await wrapper.findAll('.mt-rate__item')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('does not emit when selecting the current value', async () => {
    const wrapper = mount(MtRate, { props: { modelValue: 3 } })
    await wrapper.findAll('.mt-rate__item')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
