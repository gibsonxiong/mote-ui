import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Circle from './circle.vue'

describe('MtCircle', () => {
  it('renders the percentage text by default', () => {
    const wrapper = mount(Circle)
    expect(wrapper.find('.mt-circle__text').text()).toBe('100%')
  })

  it('uses rate for the progress dash offset and text', () => {
    const wrapper = mount(Circle, { props: { rate: 50 } })
    expect(wrapper.find('.mt-circle__text').text()).toBe('50%')
    const progress = wrapper.find('.mt-circle__progress').element as SVGElement
    const dash = progress.style.strokeDasharray
    const offset = Number.parseFloat(progress.style.strokeDashoffset)
    expect(dash).toBeTruthy()
    // At 50% the offset is half the circumference.
    expect(offset).toBeCloseTo(Number.parseFloat(dash) / 2, 1)
  })

  it('clamps the rate into 0-100', () => {
    const over = mount(Circle, { props: { rate: 150 } })
    expect(over.find('.mt-circle__text').text()).toBe('100%')
    const under = mount(Circle, { props: { rate: -10 } })
    expect(under.find('.mt-circle__text').text()).toBe('0%')
  })

  it('applies the color and layer color', () => {
    const wrapper = mount(Circle, {
      props: { rate: 30, color: 'rgb(0, 128, 0)', layerColor: 'rgb(1, 1, 1)' },
    })
    const progress = wrapper.find('.mt-circle__progress').attributes('stroke')
    const layer = wrapper.find('.mt-circle__layer').attributes('stroke')
    expect(progress).toBe('rgb(0, 128, 0)')
    expect(layer).toBe('rgb(1, 1, 1)')
  })

  it('renders a custom text over the percentage', () => {
    const wrapper = mount(Circle, { props: { rate: 42, text: '完成' } })
    expect(wrapper.find('.mt-circle__text').text()).toBe('完成')
  })

  it('renders the default slot over the text', () => {
    const wrapper = mount(Circle, { props: { rate: 42 }, slots: { default: '42/100' } })
    expect(wrapper.find('.mt-circle__text').text()).toBe('42/100')
  })

  it('rotates clockwise progress to start at 12 o\'clock', () => {
    const wrapper = mount(Circle)
    const progress = wrapper.find('.mt-circle__progress').element as SVGElement
    expect(progress.style.transform).toBe('rotate(-90deg)')
  })

  it('mirrors counter-clockwise progress along the vertical axis', () => {
    const wrapper = mount(Circle, { props: { clockwise: false } })
    const progress = wrapper.find('.mt-circle__progress').element as SVGElement
    expect(progress.style.transform).toBe('rotate(-90deg) scaleY(-1)')
  })
})