import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtProgress from './progress.vue'

describe('MtProgress', () => {
  it('renders the bar width and percentage text', () => {
    const wrapper = mount(MtProgress, { props: { percentage: 42 } })
    const bar = wrapper.find('.mt-progress__bar').element as HTMLElement
    expect(bar.style.width).toBe('42%')
    expect(wrapper.find('.mt-progress__text').text()).toBe('42%')
  })

  it('clamps the percentage into 0-100', () => {
    const over = mount(MtProgress, { props: { percentage: 142 } })
    expect((over.find('.mt-progress__bar').element as HTMLElement).style.width).toBe('100%')
    const under = mount(MtProgress, { props: { percentage: -5 } })
    expect((under.find('.mt-progress__bar').element as HTMLElement).style.width).toBe('0%')
  })

  it('colors the bar from the status', () => {
    const wrapper = mount(MtProgress, { props: { percentage: 100, status: 'success' } })
    expect(wrapper.classes()).toContain('mt-progress--success')
    expect(wrapper.find('.mt-progress__bar').attributes('style')).toContain('var(--mt-color-success)')
  })

  it('prefers an explicit color over the status', () => {
    const wrapper = mount(MtProgress, {
      props: { percentage: 10, color: 'rgb(0, 128, 0)', status: 'danger' },
    })
    const bar = wrapper.find('.mt-progress__bar').element as HTMLElement
    expect(bar.style.backgroundColor).toBe('rgb(0, 128, 0)')
  })

  it('applies the stroke width and hides the text', () => {
    const wrapper = mount(MtProgress, {
      props: { percentage: 50, strokeWidth: 10, showText: false },
    })
    const track = wrapper.find('.mt-progress__track').element as HTMLElement
    expect(track.style.height).toBe('10px')
    expect(wrapper.find('.mt-progress__text').exists()).toBe(false)
  })

  it('exposes progressbar semantics', () => {
    const wrapper = mount(MtProgress, { props: { percentage: 66 } })
    expect(wrapper.attributes('role')).toBe('progressbar')
    expect(wrapper.attributes('aria-valuenow')).toBe('66')
  })
})
