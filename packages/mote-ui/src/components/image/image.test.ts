import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MtImage from './image.vue'

const SRC = 'https://example.com/image.png'

describe('MtImage', () => {
  it('renders an img with src, alt and object-fit', () => {
    const wrapper = mount(MtImage, { props: { src: SRC, alt: '示例', fit: 'contain' } })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(SRC)
    expect(img.attributes('alt')).toBe('示例')
    expect(img.attributes('style')).toContain('object-fit: contain')
  })

  it('shows the loading placeholder and hides it after load', async () => {
    const wrapper = mount(MtImage, { props: { src: SRC } })
    expect(wrapper.find('.mt-image__placeholder').exists()).toBe(true)

    await wrapper.find('img').trigger('load')
    expect(wrapper.emitted('load')).toHaveLength(1)
    expect(wrapper.find('.mt-image__placeholder').exists()).toBe(false)
  })

  it('shows the error placeholder and hides the img on error', async () => {
    const wrapper = mount(MtImage, { props: { src: SRC } })
    await wrapper.find('img').trigger('error')
    expect(wrapper.emitted('error')).toHaveLength(1)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.mt-image__error-text').text()).toBe('加载失败')
  })

  it('can hide built-in placeholders', async () => {
    const loading = mount(MtImage, { props: { src: SRC, showLoading: false } })
    expect(loading.find('.mt-image__placeholder').exists()).toBe(false)

    const error = mount(MtImage, { props: { src: SRC, showError: false } })
    await error.find('img').trigger('error')
    expect(error.find('.mt-image__placeholder').exists()).toBe(false)
  })

  it('supports loading and error slots', async () => {
    const wrapper = mount(MtImage, {
      props: { src: SRC },
      slots: { loading: '<span class="custom-loading">l</span>' },
    })
    expect(wrapper.find('.custom-loading').exists()).toBe(true)

    await wrapper.find('img').trigger('error')
  })

  it('converts numeric sizes to px and applies round', () => {
    const wrapper = mount(MtImage, {
      props: { src: SRC, width: 100, height: 80, radius: 8, round: true },
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('width: 100px')
    expect(style).toContain('height: 80px')
    expect(style).toContain('border-radius: 8px')
    expect(wrapper.classes()).toContain('mt-image--round')
  })

  it('falls back to immediate loading without IntersectionObserver', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const wrapper = mount(MtImage, { props: { src: SRC, lazyLoad: true } })
    await nextTick()
    expect(wrapper.find('img').attributes('src')).toBe(SRC)
  })

  it('defers loading until intersecting with lazyLoad', async () => {
    let callback: IntersectionObserverCallback | undefined
    const disconnect = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          callback = cb
        }

        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = disconnect
        takeRecords = () => []
      },
    )
    const wrapper = mount(MtImage, { props: { src: SRC, lazyLoad: true } })
    await nextTick()
    expect(wrapper.find('img').exists()).toBe(false)

    callback?.(
      [{ isIntersecting: true }] as unknown as IntersectionObserverEntry[],
      {} as IntersectionObserver,
    )
    await nextTick()
    expect(wrapper.find('img').attributes('src')).toBe(SRC)
    expect(disconnect).toHaveBeenCalled()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })
})
