import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtDivider from './divider.vue'

describe('MtDivider', () => {
  it('renders text content', () => {
    const wrapper = mount(MtDivider, { slots: { default: 'or' } })
    expect(wrapper.text()).toContain('or')
  })

  it('applies dashed modifier', () => {
    const wrapper = mount(MtDivider, { props: { dashed: true } })
    expect(wrapper.classes()).toContain('mt-divider--dashed')
  })

  it('supports content positions', () => {
    const left = mount(MtDivider, { props: { contentPosition: 'left' } })
    expect(left.classes()).toContain('mt-divider--left')
    const right = mount(MtDivider, { props: { contentPosition: 'right' } })
    expect(right.classes()).toContain('mt-divider--right')
  })

  it('renders as pure separator without content', () => {
    const wrapper = mount(MtDivider)
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.text()).toBe('')
  })
})
