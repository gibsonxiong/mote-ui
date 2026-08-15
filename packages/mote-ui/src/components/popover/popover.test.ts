import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MtPopover from './popover.vue'
import type { MtPopoverAction } from './types'

const actions: MtPopoverAction[] = [
  { text: '选项一' },
  { text: '选项二', icon: 'success' },
  { text: '禁用项', disabled: true },
]

describe('MtPopover', () => {
  it('keeps the panel hidden until modelValue is true', () => {
    const wrapper = mount(MtPopover, { props: { actions } })
    expect((wrapper.find('.mt-popover__panel').element as HTMLElement).style.display).toBe(
      'none',
    )
  })

  it('renders actions and applies the placement class', () => {
    const wrapper = mount(MtPopover, {
      props: { modelValue: true, actions, placement: 'top' },
    })
    const panel = wrapper.find('.mt-popover__panel')
    expect(panel.classes()).toContain('mt-popover__panel--top')
    const items = wrapper.findAll('.mt-popover__action')
    expect(items).toHaveLength(3)
    expect(items[0].text()).toBe('选项一')
    expect(items[1].find('.mt-popover__action-icon.mt-icon').exists()).toBe(true)
    expect(items[2].classes()).toContain('mt-popover__action--disabled')
  })

  it('toggles visibility when the reference is clicked', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: false, actions } })
    await wrapper.find('.mt-popover__reference').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('open')).toHaveLength(1)
  })

  it('emits select with the action and closes afterwards', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: true, actions } })
    await wrapper.findAll('.mt-popover__action')[1].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([actions[1], 1])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('does not select a disabled action', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: true, actions } })
    await wrapper.findAll('.mt-popover__action')[2].trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('closes when clicking outside', async () => {
    const wrapper = mount(MtPopover, {
      props: { modelValue: true, actions },
      attachTo: document.body,
    })
    document.body.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('does not close when clicking inside the popover', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(MtPopover, {
      props: { modelValue: true, actions, onSelect },
      attachTo: document.body,
    })
    await wrapper.findAll('.mt-popover__action')[0].trigger('click')
    // Only the select-triggered close should be emitted, no extra outside-close
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    wrapper.unmount()
  })

  it('renders custom content through the default slot', () => {
    const wrapper = mount(MtPopover, {
      props: { modelValue: true },
      slots: { default: '<div class="custom">自定义内容</div>' },
    })
    expect(wrapper.find('.mt-popover__panel .custom').text()).toBe('自定义内容')
    expect(wrapper.find('.mt-popover__action').exists()).toBe(false)
  })
})
