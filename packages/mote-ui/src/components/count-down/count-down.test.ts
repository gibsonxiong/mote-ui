import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import MtCountDown from './count-down.vue'

afterEach(() => {
  vi.useRealTimers()
})

describe('MtCountDown', () => {
  it('renders the formatted remaining time', () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
    const wrapper = mount(MtCountDown, { props: { time: 90_000 } })
    expect(wrapper.text()).toBe('00:01:30')
  })

  it('rolls higher tokens down when omitted from the format', () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
    const wrapper = mount(MtCountDown, { props: { time: 5_400_000, format: 'mm:ss' } })
    expect(wrapper.text()).toBe('90:00')
  })

  it('counts down and emits change on every tick', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
    const wrapper = mount(MtCountDown, { props: { time: 3000, format: 'ss' } })
    expect(wrapper.text()).toBe('03')
    vi.advanceTimersByTime(1050)
    await nextTick()
    expect(wrapper.text()).toBe('01')
    expect(wrapper.emitted('change')!.length).toBeGreaterThanOrEqual(1)
  })

  it('emits finish and stops at zero', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
    const wrapper = mount(MtCountDown, { props: { time: 2500, format: 'ss' } })
    vi.advanceTimersByTime(3000)
    await nextTick()
    expect(wrapper.text()).toBe('00')
    expect(wrapper.emitted('finish')).toHaveLength(1)
    const ticks = wrapper.emitted('change')!.length
    vi.advanceTimersByTime(500)
    expect(wrapper.emitted('change')!.length).toBe(ticks)
  })

  it('does not start automatically when autoStart is false', () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
    const wrapper = mount(MtCountDown, { props: { time: 2000, format: 'ss', autoStart: false } })
    vi.advanceTimersByTime(1000)
    expect(wrapper.text()).toBe('02')
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('exposes start, pause and reset controls', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
    const wrapper = mount(MtCountDown, { props: { time: 2000, format: 'ss', autoStart: false } })
    const api = wrapper.vm as unknown as { start: () => void; pause: () => void; reset: () => void }
    api.start()
    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.text()).toBe('01')
    api.pause()
    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.text()).toBe('01')
    api.reset()
    await nextTick()
    expect(wrapper.text()).toBe('02')
  })

  it('resets when the time prop changes', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
    const wrapper = mount(MtCountDown, { props: { time: 1000, format: 'ss' } })
    vi.advanceTimersByTime(600)
    await wrapper.setProps({ time: 5000 })
    await nextTick()
    expect(wrapper.text()).toBe('05')
  })

  it('provides the parsed time through the default slot', () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
    const wrapper = mount(MtCountDown, {
      props: { time: 61_000 },
      slots: {
        default: ({ time }: { time: { seconds: number } }) =>
          h('b', {}, `${time.seconds}s`),
      },
    })
    expect(wrapper.find('b').text()).toBe('1s')
  })
})
