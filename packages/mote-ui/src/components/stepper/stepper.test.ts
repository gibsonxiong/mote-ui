import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtStepper from './stepper.vue'

describe('MtStepper', () => {
  it('renders the bound value', () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 5 } })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('5')
  })

  it('emits increase on plus click', async () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 5 } })
    await wrapper.find('.mt-stepper__plus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([6])
    expect(wrapper.emitted('change')?.[0]).toEqual([6])
  })

  it('emits decrease on minus click', async () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 5 } })
    await wrapper.find('.mt-stepper__minus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('respects the step size', async () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 5, step: 3 } })
    await wrapper.find('.mt-stepper__plus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([8])
  })

  it('clamps at max and disables plus', async () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 10, max: 10 } })
    const plus = wrapper.find('.mt-stepper__plus')
    expect((plus.element as HTMLButtonElement).disabled).toBe(true)
    await plus.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('clamps at min and disables minus', async () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 1, min: 1 } })
    const minus = wrapper.find('.mt-stepper__minus')
    expect((minus.element as HTMLButtonElement).disabled).toBe(true)
    await minus.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('normalizes input on blur', async () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 5, max: 10 } })
    const input = wrapper.find('input')
    await input.setValue('99')
    await input.trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([10])
    expect((input.element as HTMLInputElement).value).toBe('10')
  })

  it('restores the last value when input is not a number', async () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 5 } })
    const input = wrapper.find('input')
    await input.setValue('abc')
    await input.trigger('blur')
    expect((input.element as HTMLInputElement).value).toBe('5')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('supports precision', async () => {
    const wrapper = mount(MtStepper, {
      props: { modelValue: 1, step: 0.2, precision: 1 },
    })
    await wrapper.find('.mt-stepper__plus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1.2])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 5, disabled: true } })
    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.find('.mt-stepper__plus').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('disables the input with disable-input', () => {
    const wrapper = mount(MtStepper, { props: { modelValue: 5, disableInput: true } })
    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true)
  })
})
