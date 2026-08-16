import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import MtPullRefresh from './pull-refresh.vue'

function mountRefresh(props: Record<string, unknown> = {}) {
  return mount(MtPullRefresh, {
    props,
    slots: { default: () => h('div', { class: 'content' }, 'list content') },
  })
}

async function pull(wrapper: ReturnType<typeof mount>, from: number, to: number) {
  await wrapper.find('.mt-pull-refresh').trigger('pointerdown', { clientX: 0, clientY: from })
  window.dispatchEvent(new MouseEvent('pointermove', { clientX: 0, clientY: to }))
  window.dispatchEvent(new MouseEvent('pointerup'))
}

function contentTransform(wrapper: ReturnType<typeof mount>): string {
  return (wrapper.find('.mt-pull-refresh__content').element as HTMLElement).style.transform
}

afterEach(() => {
  vi.useRealTimers()
})

describe('MtPullRefresh', () => {
  it('fires refresh after pulling past the head height', async () => {
    const wrapper = mountRefresh()
    await pull(wrapper, 0, 80)
    expect(wrapper.emitted('update:loading')?.[0]).toEqual([true])
    expect(wrapper.emitted('refresh')).toHaveLength(1)
    expect(wrapper.find('.mt-pull-refresh__head').text()).toBe('正在加载...')
  })

  it('snaps back when released below the threshold', async () => {
    const wrapper = mountRefresh()
    await pull(wrapper, 0, 30)
    expect(wrapper.emitted('refresh')).toBeUndefined()
    expect(contentTransform(wrapper)).toBe('translateY(0px)')
  })

  it('shows pulling and loosing hints while dragging', async () => {
    const wrapper = mountRefresh()
    const root = wrapper.find('.mt-pull-refresh')
    await root.trigger('pointerdown', { clientX: 0, clientY: 0 })
    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 0, clientY: 30 }))
    await nextTick()
    expect(wrapper.find('.mt-pull-refresh__head').text()).toBe('下拉即可刷新...')
    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 0, clientY: 90 }))
    await nextTick()
    expect(wrapper.find('.mt-pull-refresh__head').text()).toBe('释放即可刷新...')
    window.dispatchEvent(new MouseEvent('pointerup'))
  })

  it('ignores gestures while loading', async () => {
    const wrapper = mountRefresh({ loading: true })
    await pull(wrapper, 0, 80)
    expect(wrapper.emitted('refresh')).toBeUndefined()
    expect(contentTransform(wrapper)).toBe('translateY(0px)')
  })

  it('ignores gestures when disabled', async () => {
    const wrapper = mountRefresh({ disabled: true })
    await pull(wrapper, 0, 80)
    expect(wrapper.emitted('refresh')).toBeUndefined()
  })

  it('does not start a pull when the container is scrolled down', async () => {
    const wrapper = mountRefresh()
    const root = wrapper.find('.mt-pull-refresh')
    ;(root.element as HTMLElement).scrollTop = 120
    await pull(wrapper, 0, 80)
    expect(wrapper.emitted('refresh')).toBeUndefined()
    expect(contentTransform(wrapper)).toBe('translateY(0px)')
  })

  it('flashes the success hint after loading settles', async () => {
    vi.useFakeTimers()
    const wrapper = mountRefresh({ loading: true })
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.mt-pull-refresh__head').text()).toBe('刷新成功')
    vi.advanceTimersByTime(600)
    await nextTick()
    expect(contentTransform(wrapper)).toBe('translateY(0px)')
  })

  it('prefers a custom successText', async () => {
    const wrapper = mountRefresh({ loading: true, successText: '已更新' })
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.mt-pull-refresh__head').text()).toBe('已更新')
  })

  it('sets touch-action to pan-x for vertical dragging', async () => {
    const wrapper = mountRefresh()
    await nextTick()
    expect((wrapper.find('.mt-pull-refresh').element as HTMLElement).style.touchAction).toBe(
      'pan-x',
    )
  })
})
