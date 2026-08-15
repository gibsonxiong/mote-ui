import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtBadge from './badge.vue'

describe('MtBadge', () => {
  it('renders the value', () => {
    const wrapper = mount(MtBadge, { props: { value: 8 } })
    expect(wrapper.find('.mt-badge__content').text()).toBe('8')
  })

  it('caps numeric values with max', () => {
    const wrapper = mount(MtBadge, { props: { value: 120, max: 99 } })
    expect(wrapper.find('.mt-badge__content').text()).toBe('99+')

    const under = mount(MtBadge, { props: { value: 9, max: 99 } })
    expect(under.find('.mt-badge__content').text()).toBe('9')
  })

  it('keeps string values untouched', () => {
    const wrapper = mount(MtBadge, { props: { value: 'new', max: 99 } })
    expect(wrapper.find('.mt-badge__content').text()).toBe('new')
  })

  it('renders a dot without content', () => {
    const wrapper = mount(MtBadge, { props: { isDot: true } })
    const content = wrapper.find('.mt-badge__content')
    expect(content.classes()).toContain('mt-badge__content--dot')
    expect(content.text()).toBe('')
  })

  it('hides the badge with hidden', () => {
    const wrapper = mount(MtBadge, { props: { value: 8, hidden: true } })
    expect(wrapper.find('.mt-badge__content').exists()).toBe(false)
  })

  it('fixes the badge position when wrapping content', () => {
    const withContent = mount(MtBadge, { props: { value: 8 }, slots: { default: '内容' } })
    expect(withContent.find('.mt-badge__content').classes()).toContain('mt-badge__content--fixed')

    const standalone = mount(MtBadge, { props: { value: 8 } })
    expect(standalone.find('.mt-badge__content').classes()).not.toContain('mt-badge__content--fixed')
  })
})
