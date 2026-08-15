import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtNavBar from './nav-bar.vue'

describe('MtNavBar', () => {
  it('renders the title', () => {
    const wrapper = mount(MtNavBar, { props: { title: '标题' } })
    expect(wrapper.find('.mt-nav-bar__title').text()).toBe('标题')
  })

  it('renders left and right text with arrows', () => {
    const wrapper = mount(MtNavBar, {
      props: { leftText: '返回', leftArrow: true, rightText: '更多', rightArrow: true },
    })
    expect(wrapper.find('.mt-nav-bar__left').text()).toContain('返回')
    expect(wrapper.find('.mt-nav-bar__right').text()).toContain('更多')
    expect(wrapper.findAll('.mt-nav-bar__arrow')).toHaveLength(2)
  })

  it('emits clickLeft and clickRight', async () => {
    const wrapper = mount(MtNavBar, { props: { leftText: '返回', rightText: '更多' } })
    await wrapper.find('.mt-nav-bar__left').trigger('click')
    await wrapper.find('.mt-nav-bar__right').trigger('click')
    expect(wrapper.emitted('clickLeft')).toHaveLength(1)
    expect(wrapper.emitted('clickRight')).toHaveLength(1)
  })

  it('renders bottom border by default and can disable it', () => {
    const wrapper = mount(MtNavBar)
    expect(wrapper.find('.mt-nav-bar').classes()).toContain('mt-nav-bar--border')

    const noBorder = mount(MtNavBar, { props: { border: false } })
    expect(noBorder.find('.mt-nav-bar').classes()).not.toContain('mt-nav-bar--border')
  })

  it('renders a placeholder when fixed with placeholder enabled', () => {
    const wrapper = mount(MtNavBar, { props: { fixed: true, placeholder: true } })
    expect(wrapper.find('.mt-nav-bar__placeholder').exists()).toBe(true)
    expect(wrapper.find('.mt-nav-bar').classes()).toContain('mt-nav-bar--fixed')

    const without = mount(MtNavBar, { props: { fixed: true } })
    expect(without.find('.mt-nav-bar__placeholder').exists()).toBe(false)
  })

  it('supports custom slots', () => {
    const wrapper = mount(MtNavBar, {
      slots: {
        title: '<span class="custom-title">自定义</span>',
        left: '<span class="custom-left">L</span>',
        right: '<span class="custom-right">R</span>',
      },
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-left').exists()).toBe(true)
    expect(wrapper.find('.custom-right').exists()).toBe(true)
  })
})
