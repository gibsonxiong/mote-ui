import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LazyLoad from './lazy-load.vue'

class FakeObserver {
  static instances: FakeObserver[] = []

  callback: IntersectionObserverCallback

  options: IntersectionObserverInit | undefined

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback
    this.options = options
    FakeObserver.instances.push(this)
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as unknown as IntersectionObserver)
  }
}

afterEach(() => {
  FakeObserver.instances = []
  vi.unstubAllGlobals()
})

describe('MtLazyLoad', () => {
  it('renders the placeholder until the target intersects', () => {
    vi.stubGlobal('IntersectionObserver', FakeObserver)
    const wrapper = mount(LazyLoad, {
      slots: {
        default: '<p class="content">Loaded</p>',
        placeholder: '<p class="ph">Loading</p>',
      },
    })
    expect(wrapper.find('.ph').text()).toBe('Loading')
    expect(wrapper.find('.content').exists()).toBe(false)
    FakeObserver.instances[0].trigger([{ isIntersecting: true } as IntersectionObserverEntry])
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.content').text()).toBe('Loaded')
      expect(wrapper.find('.ph').exists()).toBe(false)
    })
  })

  it('renders content immediately when IntersectionObserver is unavailable', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const wrapper = mount(LazyLoad, { slots: { default: '<p class="content">Loaded</p>' } })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  it('renders content immediately when disabled', async () => {
    vi.stubGlobal('IntersectionObserver', FakeObserver)
    const wrapper = mount(LazyLoad, {
      props: { disabled: true },
      slots: { default: '<p class="content">Loaded</p>' },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(FakeObserver.instances).toHaveLength(0)
  })
})