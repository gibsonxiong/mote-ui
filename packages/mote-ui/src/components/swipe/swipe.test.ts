import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import MtSwipe from './swipe.vue'

function mountSwipe(props: Record<string, unknown> = {}, slideCount = 3) {
  return mount(MtSwipe, {
    props,
    slots: {
      default: () =>
        Array.from({ length: slideCount }, (_, index) =>
          h('div', { class: 'slide' }, `slide-${index}`),
        ),
    },
  })
}

function mockSize(wrapper: ReturnType<typeof mount>, width = 300, height = 200) {
  const root = wrapper.find('.mt-swipe').element as HTMLElement
  Object.defineProperty(root, 'offsetWidth', { value: width, configurable: true })
  Object.defineProperty(root, 'offsetHeight', { value: height, configurable: true })
}

async function swipe(wrapper: ReturnType<typeof mount>, from: number, to: number) {
  await wrapper.find('.mt-swipe').trigger('touchstart', { touches: [{ clientX: from, clientY: 0 }] })
  await wrapper.find('.mt-swipe').trigger('touchmove', { touches: [{ clientX: to, clientY: 0 }] })
  await wrapper.find('.mt-swipe').trigger('touchend', { changedTouches: [{ clientX: to, clientY: 0 }] })
}

describe('MtSwipe', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders slides and indicators', async () => {
    const wrapper = mountSwipe()
    // slideCount is measured from the DOM after mount, so the indicators
    // need one render pass
    await nextTick()
    expect(wrapper.findAll('.slide')).toHaveLength(3)
    expect(wrapper.findAll('.mt-swipe__indicator')).toHaveLength(3)
    expect(wrapper.find('.mt-swipe__indicator').classes()).toContain('is-active')
  })

  it('swipes to the next slide on a left drag', async () => {
    const wrapper = mountSwipe()
    mockSize(wrapper)
    await swipe(wrapper, 280, 40)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
    expect(wrapper.emitted('change')?.[0]).toEqual([1])
  })

  it('swipes to the previous slide on a right drag', async () => {
    const wrapper = mountSwipe({ modelValue: 1 })
    mockSize(wrapper)
    await swipe(wrapper, 20, 260)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it('ignores a drag shorter than the threshold', async () => {
    const wrapper = mountSwipe()
    mockSize(wrapper)
    await swipe(wrapper, 280, 250)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('clamps at the edges without loop', async () => {
    const wrapper = mountSwipe({ modelValue: 2, loop: false })
    mockSize(wrapper)
    await swipe(wrapper, 280, 40)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('wraps around with loop', async () => {
    const wrapper = mountSwipe({ modelValue: 2, loop: true })
    mockSize(wrapper)
    await swipe(wrapper, 280, 40)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it('switches slides when clicking an indicator', async () => {
    const wrapper = mountSwipe()
    await nextTick()
    await wrapper.findAll('.mt-swipe__indicator')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('advances automatically while autoplaying', () => {
    vi.useFakeTimers()
    const wrapper = mountSwipe({ autoplay: 100 })
    mockSize(wrapper)
    vi.advanceTimersByTime(300)
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(3)
    expect(emitted?.[2]).toEqual([3 % 3])
    wrapper.unmount()
  })

  it('swipes vertically with clientY', async () => {
    const wrapper = mountSwipe({ vertical: true })
    mockSize(wrapper)
    await wrapper.find('.mt-swipe').trigger('touchstart', { touches: [{ clientX: 0, clientY: 180 }] })
    await wrapper.find('.mt-swipe').trigger('touchmove', { touches: [{ clientX: 0, clientY: 20 }] })
    await wrapper
      .find('.mt-swipe')
      .trigger('touchend', { changedTouches: [{ clientX: 0, clientY: 20 }] })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })
})
