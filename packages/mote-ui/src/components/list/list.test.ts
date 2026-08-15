import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MtList from './list.vue'

let observerCallback: IntersectionObserverCallback | undefined
let observeTarget: Element | undefined

beforeEach(() => {
  observerCallback = undefined
  observeTarget = undefined
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback
      }

      observe(target: Element) {
        observeTarget = target
      }

      disconnect() {}
    },
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function intersect() {
  observerCallback?.(
    [{ isIntersecting: true }] as unknown as IntersectionObserverEntry[],
    {} as IntersectionObserver,
  )
}

describe('MtList', () => {
  it('fires an immediate load check on mount by default', () => {
    const wrapper = mount(MtList)
    expect(wrapper.emitted('update:loading')?.[0]).toEqual([true])
    expect(wrapper.emitted('load')).toHaveLength(1)
  })

  it('skips the initial check when immediateCheck is false', () => {
    const wrapper = mount(MtList, { props: { immediateCheck: false } })
    expect(wrapper.emitted('load')).toBeUndefined()
  })

  it('does not load when finished', () => {
    const wrapper = mount(MtList, { props: { finished: true } })
    expect(wrapper.emitted('load')).toBeUndefined()
    expect(wrapper.find('.mt-list__finished').text()).toBe('没有更多了')
  })

  it('loads when the sentinel intersects the viewport', () => {
    const wrapper = mount(MtList, { props: { immediateCheck: false } })
    expect(observeTarget).toBe(wrapper.find('.mt-list__sentinel').element)
    intersect()
    expect(wrapper.emitted('load')).toHaveLength(1)
  })

  it('ignores intersections while loading', () => {
    const wrapper = mount(MtList, { props: { loading: true, immediateCheck: false } })
    intersect()
    expect(wrapper.emitted('load')).toBeUndefined()
    expect(wrapper.find('.mt-list__loading').text()).toBe('正在加载...')
  })

  it('keeps loading after a round settles while the sentinel stays visible', async () => {
    const wrapper = mount(MtList, { props: { loading: true, immediateCheck: false } })
    await wrapper.setProps({ loading: false })
    expect(wrapper.emitted('load')).toHaveLength(1)
  })

  it('shows the error text and retries on tap', async () => {
    const wrapper = mount(MtList, { props: { error: true, immediateCheck: false } })
    const errorEl = wrapper.find('.mt-list__error')
    expect(errorEl.text()).toBe('加载失败，点击重试')
    await errorEl.trigger('click')
    expect(wrapper.emitted('update:error')?.[0]).toEqual([false])
    // Once the parent clears the error flag the list re-checks itself
    await wrapper.setProps({ error: false })
    expect(wrapper.emitted('load')).toHaveLength(1)
  })

  it('prefers custom status texts over locale messages', () => {
    const wrapper = mount(MtList, {
      props: { loading: true, loadingText: 'Fetching…', immediateCheck: false },
    })
    expect(wrapper.find('.mt-list__loading').text()).toBe('Fetching…')
  })
})
