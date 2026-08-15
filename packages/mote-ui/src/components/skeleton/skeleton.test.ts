import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtSkeleton from './skeleton.vue'

describe('MtSkeleton', () => {
  it('renders three rows with shimmer animation by default', () => {
    const wrapper = mount(MtSkeleton)
    expect(wrapper.findAll('.mt-skeleton__row')).toHaveLength(3)
    expect(wrapper.classes()).toContain('mt-skeleton--animate')
  })

  it('shortens the last row', () => {
    const wrapper = mount(MtSkeleton, { props: { rows: 4 } })
    const rows = wrapper.findAll('.mt-skeleton__row')
    expect(rows).toHaveLength(4)
    expect(rows[3].attributes('style')).toContain('width: 60%')
    expect(rows[0].attributes('style')).toBeUndefined()
  })

  it('renders title and avatar when enabled', () => {
    const wrapper = mount(MtSkeleton, { props: { title: true, avatar: true } })
    expect(wrapper.find('.mt-skeleton__title').exists()).toBe(true)
    expect(wrapper.find('.mt-skeleton__avatar').exists()).toBe(true)

    const plain = mount(MtSkeleton)
    expect(plain.find('.mt-skeleton__title').exists()).toBe(false)
    expect(plain.find('.mt-skeleton__avatar').exists()).toBe(false)
  })

  it('renders slot content when loading is false', () => {
    const wrapper = mount(MtSkeleton, {
      props: { loading: false },
      slots: { default: '<p class="real-content">真实内容</p>' },
    })
    expect(wrapper.find('.mt-skeleton').exists()).toBe(false)
    expect(wrapper.find('.real-content').text()).toBe('真实内容')
  })

  it('supports round modifier and disables animation', () => {
    const wrapper = mount(MtSkeleton, { props: { round: true, animate: false } })
    expect(wrapper.classes()).toContain('mt-skeleton--round')
    expect(wrapper.classes()).not.toContain('mt-skeleton--animate')
  })
})
