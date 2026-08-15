import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtTag from './tag.vue'

describe('MtTag', () => {
  it('renders slot content with default modifiers', () => {
    const wrapper = mount(MtTag, { slots: { default: '标签' } })
    expect(wrapper.text()).toContain('标签')
    expect(wrapper.classes()).toContain('mt-tag--primary')
    expect(wrapper.classes()).toContain('mt-tag--light')
  })

  it('applies type, effect, size and round modifiers', () => {
    const wrapper = mount(MtTag, {
      props: { type: 'danger', effect: 'dark', size: 'large', round: true },
      slots: { default: '标签' },
    })
    expect(wrapper.classes()).toContain('mt-tag--danger')
    expect(wrapper.classes()).toContain('mt-tag--dark')
    expect(wrapper.classes()).toContain('mt-tag--large')
    expect(wrapper.classes()).toContain('mt-tag--round')

    const small = mount(MtTag, { props: { size: 'small' } })
    expect(small.classes()).toContain('mt-tag--small')
  })

  it('renders close icon when closable and emits close', async () => {
    const wrapper = mount(MtTag, { props: { closable: true } })
    const close = wrapper.find('.mt-tag__close')
    expect(close.exists()).toBe(true)
    await close.trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('does not render close icon by default', () => {
    const wrapper = mount(MtTag)
    expect(wrapper.find('.mt-tag__close').exists()).toBe(false)
  })
})
