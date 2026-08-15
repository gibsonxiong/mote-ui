import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, h } from 'vue'
import MtRadio from './radio.vue'
import MtRadioGroup from './radio-group.vue'
import type { MtRadioValue } from './types'

describe('MtRadioGroup', () => {
  const Host = defineComponent({
    setup() {
      const value = ref<string>('a')
      return () =>
        h(
          MtRadioGroup,
          { modelValue: value.value, 'onUpdate:modelValue': (v: MtRadioValue) => (value.value = v as string) },
          () => [
            h(MtRadio, { value: 'a' }, () => 'A'),
            h(MtRadio, { value: 'b' }, () => 'B'),
          ],
        )
    },
  })

  it('marks the matching radio as checked', () => {
    const wrapper = mount(Host)
    const radios = wrapper.findAll('.mt-radio')
    expect(radios[0].classes()).toContain('is-checked')
    expect(radios[1].classes()).not.toContain('is-checked')
  })

  it('selects a new value on click', async () => {
    const wrapper = mount(Host)
    await wrapper.findAll('.mt-radio')[1].trigger('click')
    expect(wrapper.findAll('.mt-radio')[1].classes()).toContain('is-checked')
    expect(wrapper.findAll('.mt-radio')[0].classes()).not.toContain('is-checked')
  })

  it('emits change on the group', async () => {
    const onChange = vi.fn()
    const wrapper = mount(MtRadioGroup, {
      props: { modelValue: 'a', onChange },
      slots: {
        default: () => [h(MtRadio, { value: 'a' }), h(MtRadio, { value: 'b' })],
      },
    })
    await wrapper.findAll('.mt-radio')[1].trigger('click')
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('ignores clicks when disabled', async () => {
    const wrapper = mount(MtRadioGroup, {
      props: { modelValue: 'a', disabled: true },
      slots: { default: () => h(MtRadio, { value: 'b' }) },
    })
    await wrapper.find('.mt-radio').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
