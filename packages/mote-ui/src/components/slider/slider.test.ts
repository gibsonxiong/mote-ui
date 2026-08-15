import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtSlider from './slider.vue'

function mockTrackRect(wrapper: ReturnType<typeof mount>, left = 0, width = 100) {
  const track = wrapper.find('.mt-slider').element as HTMLElement
  track.getBoundingClientRect = () =>
    ({ left, width, top: 0, right: left + width, bottom: 24, height: 24 }) as DOMRect
}

describe('MtSlider', () => {
  it('positions bar and button by percent', () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 50 } })
    expect(wrapper.find('.mt-slider__bar').attributes('style')).toContain('width: 50%')
    expect(wrapper.find('.mt-slider__button').attributes('style')).toContain('left: 50%')
  })

  it('sets value when pressing the track', async () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 0 } })
    mockTrackRect(wrapper)
    await wrapper.find('.mt-slider').trigger('pointerdown', { clientX: 30 })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([30])
  })

  it('snaps to the step size', async () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 0, step: 10 } })
    mockTrackRect(wrapper)
    await wrapper.find('.mt-slider').trigger('pointerdown', { clientX: 24 })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([20])
  })

  it('clamps to the min/max range', async () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 0, min: 20, max: 40 } })
    mockTrackRect(wrapper)
    await wrapper.find('.mt-slider').trigger('pointerdown', { clientX: 100 })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([40])
  })

  it('emits change after drag ends', async () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 0 } })
    mockTrackRect(wrapper)
    await wrapper.find('.mt-slider').trigger('pointerdown', { clientX: 10 })
    await wrapper.setProps({ modelValue: 10 })
    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 80 }))
    await wrapper.setProps({ modelValue: 80 })
    window.dispatchEvent(new MouseEvent('pointerup'))
    expect(wrapper.emitted('update:modelValue')?.map((entry) => entry[0])).toEqual([10, 80])
    expect(wrapper.emitted('change')?.[0]).toEqual([80])
  })

  it('does not emit change when released at the start value', async () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 10 } })
    mockTrackRect(wrapper)
    await wrapper.find('.mt-slider').trigger('pointerdown', { clientX: 10 })
    window.dispatchEvent(new MouseEvent('pointerup'))
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('shows the tooltip while dragging', async () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 40 } })
    mockTrackRect(wrapper)
    expect(wrapper.find('.mt-slider__tooltip').exists()).toBe(false)
    await wrapper.find('.mt-slider').trigger('pointerdown', { clientX: 40 })
    expect(wrapper.find('.mt-slider__tooltip').exists()).toBe(true)
    window.dispatchEvent(new MouseEvent('pointerup'))
  })

  it('supports keyboard arrows', async () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 50 } })
    const track = wrapper.find('.mt-slider')
    await track.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([51])
    expect(wrapper.emitted('change')?.[0]).toEqual([51])
    await track.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([49])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(MtSlider, { props: { modelValue: 0, disabled: true } })
    mockTrackRect(wrapper)
    await wrapper.find('.mt-slider').trigger('pointerdown', { clientX: 50 })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
