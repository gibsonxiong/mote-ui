import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtLoading from './loading.vue'

describe('MtLoading', () => {
  it('renders a circular spinner by default', () => {
    const wrapper = mount(MtLoading)
    expect(wrapper.find('.mt-loading__spinner--circular').exists()).toBe(true)
    expect(wrapper.find('.mt-loading__text').exists()).toBe(false)
  })

  it('renders eight bars for the spinner type', () => {
    const wrapper = mount(MtLoading, { props: { type: 'spinner' } })
    expect(wrapper.findAll('.mt-loading__bar')).toHaveLength(8)
  })

  it('renders the description text', () => {
    const wrapper = mount(MtLoading, { props: { text: '加载中' } })
    expect(wrapper.find('.mt-loading__text').text()).toBe('加载中')
  })

  it('prefers slot content over the text prop', () => {
    const wrapper = mount(MtLoading, { slots: { default: '马上就好' } })
    expect(wrapper.find('.mt-loading__text').text()).toBe('马上就好')
  })

  it('applies the size to the spinner', () => {
    const wrapper = mount(MtLoading, { props: { size: 40 } })
    const style = (wrapper.find('.mt-loading__spinner').element as HTMLElement).style
    expect(style.width).toBe('40px')
    expect(style.height).toBe('40px')
  })

  it('stacks vertically and applies a custom color', () => {
    const wrapper = mount(MtLoading, {
      props: { vertical: true, color: 'rgb(255, 0, 0)', text: '请稍候' },
    })
    expect(wrapper.classes()).toContain('mt-loading--vertical')
    expect(wrapper.attributes('style')).toContain('color: rgb(255, 0, 0)')
  })
})
