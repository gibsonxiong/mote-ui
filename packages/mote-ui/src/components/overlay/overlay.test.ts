import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtOverlay from './overlay.vue'

describe('MtOverlay', () => {
  it('renders the mask when visible', () => {
    const wrapper = mount(MtOverlay, { props: { modelValue: true } })
    expect(wrapper.find('.mt-overlay').exists()).toBe(true)
  })

  it('renders nothing when hidden', () => {
    const wrapper = mount(MtOverlay, { props: { modelValue: false } })
    expect(wrapper.find('.mt-overlay').exists()).toBe(false)
  })

  it('auto-allocates a z-index when omitted', () => {
    const wrapper = mount(MtOverlay, { props: { modelValue: true } })
    const style = wrapper.find('.mt-overlay').attributes('style') ?? ''
    const zIndex = Number(style.match(/z-index:\s*(\d+)/)?.[1])
    expect(zIndex).toBeGreaterThan(2000)
  })

  it('respects an explicit z-index', () => {
    const wrapper = mount(MtOverlay, { props: { modelValue: true, zIndex: 3000 } })
    expect(wrapper.find('.mt-overlay').attributes('style') ?? '').toContain('z-index: 3000')
  })

  it('emits click when the mask is clicked', async () => {
    const wrapper = mount(MtOverlay, { props: { modelValue: true } })
    await wrapper.find('.mt-overlay').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})