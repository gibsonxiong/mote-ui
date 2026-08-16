import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtButton from './button.vue'

describe('MtButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(MtButton, { slots: { default: 'confirm' } })
    expect(wrapper.text()).toContain('confirm')
  })

  it('applies type and size classes', () => {
    const wrapper = mount(MtButton, { props: { type: 'primary', size: 'large' } })
    expect(wrapper.classes()).toContain('mt-button--primary')
    expect(wrapper.classes()).toContain('mt-button--large')
  })

  it('applies link class', () => {
    const wrapper = mount(MtButton, { props: { link: true } })
    expect(wrapper.classes()).toContain('mt-button--link')
  })

  it('emits click when enabled', async () => {
    const wrapper = mount(MtButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(MtButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(MtButton, { props: { loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
