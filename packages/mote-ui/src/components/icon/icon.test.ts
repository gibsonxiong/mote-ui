import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtIcon from './icon.vue'

describe('MtIcon', () => {
  it('renders an svg for a built-in name', () => {
    const wrapper = mount(MtIcon, { props: { name: 'close' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('applies spin class for the loading icon', () => {
    const wrapper = mount(MtIcon, { props: { name: 'loading' } })
    expect(wrapper.classes()).toContain('mt-icon--spin')
  })

  it('applies spin class when spin prop is set', () => {
    const wrapper = mount(MtIcon, { props: { name: 'success', spin: true } })
    expect(wrapper.classes()).toContain('mt-icon--spin')
  })

  it('falls back to slot content for unknown names', () => {
    const wrapper = mount(MtIcon, { props: { name: 'unknown' }, slots: { default: 'X' } })
    expect(wrapper.find('svg').exists()).toBe(false)
    expect(wrapper.text()).toContain('X')
  })

  it('renders slot content when no name is given', () => {
    const wrapper = mount(MtIcon, { slots: { default: 'Y' } })
    expect(wrapper.text()).toContain('Y')
  })
})
