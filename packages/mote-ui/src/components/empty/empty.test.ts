import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtEmpty from './empty.vue'

describe('MtEmpty', () => {
  it('renders the default description and illustration', () => {
    const wrapper = mount(MtEmpty)
    expect(wrapper.find('.mt-empty__description').text()).toBe('暂无数据')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders a custom description', () => {
    const wrapper = mount(MtEmpty, { props: { description: '没有更多内容' } })
    expect(wrapper.find('.mt-empty__description').text()).toBe('没有更多内容')
  })

  it('renders a custom image with size', () => {
    const wrapper = mount(MtEmpty, { props: { image: 'https://example.com/empty.png', imageSize: 120 } })
    const img = wrapper.find('.mt-empty__img')
    expect(img.attributes('src')).toBe('https://example.com/empty.png')
    expect(wrapper.find('.mt-empty__image').attributes('style')).toContain('width: 120px')
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('renders footer slot only when provided', () => {
    const without = mount(MtEmpty)
    expect(without.find('.mt-empty__footer').exists()).toBe(false)

    const withFooter = mount(MtEmpty, { slots: { default: '<button>刷新</button>' } })
    expect(withFooter.find('.mt-empty__footer button').text()).toBe('刷新')
  })

  it('supports image and description slots', () => {
    const wrapper = mount(MtEmpty, {
      slots: {
        image: '<div class="custom-image" />',
        description: '<span class="custom-desc">自定义</span>',
      },
    })
    expect(wrapper.find('.custom-image').exists()).toBe(true)
    expect(wrapper.find('.custom-desc').exists()).toBe(true)
  })
})
