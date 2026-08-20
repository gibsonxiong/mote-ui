import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtSticky from './sticky.vue'

describe('MtSticky', () => {
  it('renders the default slot', () => {
    const wrapper = mount(MtSticky, { slots: { default: 'content' } })
    expect(wrapper.find('.mt-sticky__inner').text()).toBe('content')
  })

  it('applies top offset by default', () => {
    const wrapper = mount(MtSticky, { props: { offset: 10 } })
    expect(wrapper.find('.mt-sticky__inner').attributes('style')).toContain('top: 10px')
  })

  it('applies bottom when position is bottom', () => {
    const wrapper = mount(MtSticky, { props: { position: 'bottom', offset: 20 } })
    expect(wrapper.find('.mt-sticky__inner').attributes('style')).toContain('bottom: 20px')
  })

  it('applies the default z-index', () => {
    const wrapper = mount(MtSticky)
    expect(wrapper.find('.mt-sticky__inner').attributes('style')).toContain('z-index: 100')
  })

  it('emits scroll on scroll', () => {
    const wrapper = mount(MtSticky)
    window.dispatchEvent(new Event('scroll'))
    expect(wrapper.emitted('scroll')).toBeTruthy()
    wrapper.unmount()
  })
})