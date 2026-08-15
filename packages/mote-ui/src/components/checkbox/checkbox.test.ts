import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, h } from 'vue'
import MtCheckbox from './checkbox.vue'
import MtCheckboxGroup from './checkbox-group.vue'
import type { MtCheckboxValue } from './types'

describe('MtCheckbox', () => {
  it('toggles standalone value', async () => {
    const wrapper = mount(MtCheckbox, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(MtCheckbox, { props: { modelValue: false, disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('shows indeterminate dash', () => {
    const wrapper = mount(MtCheckbox, { props: { indeterminate: true } })
    expect(wrapper.find('.mt-checkbox__dash').exists()).toBe(true)
    expect(wrapper.classes()).toContain('is-indeterminate')
  })
})

describe('MtCheckboxGroup', () => {
  const Host = defineComponent({
    setup() {
      const values = ref<string[]>(['a'])
      return () =>
        h(
          MtCheckboxGroup,
          { modelValue: values.value, 'onUpdate:modelValue': (v: MtCheckboxValue[]) => (values.value = v as string[]) },
          () => [
            h(MtCheckbox, { value: 'a' }, () => 'A'),
            h(MtCheckbox, { value: 'b' }, () => 'B'),
          ],
        )
    },
  })

  it('reflects group value on children', () => {
    const wrapper = mount(Host)
    const boxes = wrapper.findAll('.mt-checkbox')
    expect(boxes[0].classes()).toContain('is-checked')
    expect(boxes[1].classes()).not.toContain('is-checked')
  })

  it('toggles values through the group', async () => {
    const wrapper = mount(Host)
    await wrapper.findAll('.mt-checkbox')[1].trigger('click')
    expect(wrapper.findAll('.mt-checkbox')[1].classes()).toContain('is-checked')
    await wrapper.findAll('.mt-checkbox')[0].trigger('click')
    expect(wrapper.findAll('.mt-checkbox')[0].classes()).not.toContain('is-checked')
  })

  it('disables all children when group is disabled', async () => {
    const wrapper = mount(MtCheckboxGroup, {
      props: { modelValue: [], disabled: true },
      slots: { default: () => h(MtCheckbox, { value: 'a' }, () => 'A') },
    })
    await wrapper.find('.mt-checkbox').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
