import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MtBackTop from './back-top.vue'

function setWindowScroll(value: number) {
  Object.defineProperty(window, 'scrollY', { value, configurable: true })
  window.dispatchEvent(new Event('scroll'))
}

function isVisible(wrapper: ReturnType<typeof mount>): boolean {
  const style = (wrapper.find('.mt-back-top').element as HTMLElement).style
  return style.display !== 'none'
}

let scrollToSpy: ReturnType<typeof vi.fn>
let elementScrollToSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  scrollToSpy = vi.fn()
  vi.stubGlobal('scrollTo', scrollToSpy)
  // happy-dom's Element#scrollTo is a no-op; emulate the reset
  elementScrollToSpy = vi
    .spyOn(Element.prototype, 'scrollTo')
    .mockImplementation(function (this: Element, ...args: unknown[]) {
      const [options] = args
      this.scrollTop =
        typeof options === 'number' ? options : ((options as ScrollToOptions)?.top ?? 0)
    })
})

afterEach(() => {
  Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  elementScrollToSpy.mockRestore()
  vi.unstubAllGlobals()
})

describe('MtBackTop', () => {
  it('stays hidden while the page is near the top', () => {
    setWindowScroll(100)
    const wrapper = mount(MtBackTop)
    expect(isVisible(wrapper)).toBe(false)
  })

  it('appears once the scroll distance exceeds visibilityHeight', async () => {
    const wrapper = mount(MtBackTop)
    setWindowScroll(240)
    await nextTick()
    expect(isVisible(wrapper)).toBe(true)
    setWindowScroll(120)
    await nextTick()
    expect(isVisible(wrapper)).toBe(false)
  })

  it('scrolls back to the top on click', async () => {
    const wrapper = mount(MtBackTop)
    setWindowScroll(400)
    await nextTick()
    await wrapper.find('.mt-back-top').trigger('click')
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('tracks a custom scroll target element', async () => {
    const scroller = document.createElement('div')
    scroller.id = 'scroller'
    document.body.appendChild(scroller)
    const wrapper = mount(MtBackTop, { props: { target: '#scroller' } })
    scroller.scrollTop = 320
    scroller.dispatchEvent(new Event('scroll'))
    await nextTick()
    expect(isVisible(wrapper)).toBe(true)
    await wrapper.find('.mt-back-top').trigger('click')
    expect(scroller.scrollTop).toBe(0)
    scroller.remove()
  })

  it('applies custom offsets and renders slot content', () => {
    const wrapper = mount(MtBackTop, {
      props: { right: 10, bottom: 20 },
      slots: { default: 'TOP' },
    })
    const button = wrapper.find('.mt-back-top')
    expect(button.attributes('style')).toContain('right: 10px')
    expect(button.attributes('style')).toContain('bottom: 20px')
    expect(button.text()).toBe('TOP')
  })
})
