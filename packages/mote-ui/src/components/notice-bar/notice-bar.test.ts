import { nextTick } from 'vue'
import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MtNoticeBar from './notice-bar.vue'

let offsetWidthStubbed = false

function stubOffsetWidths(wrapWidth: number, textWidth: number) {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      if (this.classList?.contains('mt-notice-bar__wrap')) return wrapWidth
      if (this.classList?.contains('mt-notice-bar__text')) return textWidth
      return 0
    },
  })
  offsetWidthStubbed = true
}

afterEach(() => {
  if (offsetWidthStubbed) {
    Reflect.deleteProperty(HTMLElement.prototype, 'offsetWidth')
    offsetWidthStubbed = false
  }
})

describe('MtNoticeBar', () => {
  it('renders the text prop with an alert role', () => {
    const wrapper = mount(MtNoticeBar, { props: { text: '系统升级中' } })
    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.find('.mt-notice-bar__text').text()).toBe('系统升级中')
  })

  it('prefers slot content over the text prop', () => {
    const wrapper = mount(MtNoticeBar, { slots: { default: '插槽内容' } })
    expect(wrapper.find('.mt-notice-bar__text').text()).toBe('插槽内容')
  })

  it('keeps the text static when scrollable is off', () => {
    const wrapper = mount(MtNoticeBar, { props: { text: '通知' } })
    expect(wrapper.find('.mt-notice-bar__text').attributes('style')).toBeUndefined()
  })

  it('computes a scroll animation from measured widths and speed', async () => {
    stubOffsetWidths(100, 200)
    const wrapper = mount(MtNoticeBar, {
      props: { text: '很长的通知文本', scrollable: true, speed: 60 },
    })
    await nextTick()
    const style = wrapper.find('.mt-notice-bar__text').attributes('style')
    expect(style).toContain('animation: mt-notice-bar-scroll 5s linear infinite')
    expect(style).toContain('--mt-notice-bar-from: 100px')
    expect(style).toContain('--mt-notice-bar-to: -200px')
  })

  it('applies wrapable modifier and custom colors', () => {
    const wrapper = mount(MtNoticeBar, {
      props: { text: '多行通知', wrapable: true, color: '#fff', background: '#333' },
    })
    expect(wrapper.classes()).toContain('mt-notice-bar--wrapable')
    expect(wrapper.attributes('style')).toContain('color: #fff')
    expect(wrapper.attributes('style')).toContain('background-color: #333')
  })

  it('renders the left icon', () => {
    const wrapper = mount(MtNoticeBar, { props: { text: '通知', leftIcon: 'success' } })
    expect(wrapper.find('.mt-notice-bar__left-icon .mt-icon').exists()).toBe(true)
  })

  it('hides and emits close when the close icon is clicked', async () => {
    const wrapper = mount(MtNoticeBar, { props: { text: '通知', closeable: true } })
    expect(wrapper.find('.mt-notice-bar__close').exists()).toBe(true)
    await wrapper.find('.mt-notice-bar__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect((wrapper.element as HTMLElement).style.display).toBe('none')
  })
})
