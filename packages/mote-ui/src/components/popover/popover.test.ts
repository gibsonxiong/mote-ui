import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MtPopover from './popover.vue'
import type { MtPopoverAction } from './types'

const actions: MtPopoverAction[] = [
  { text: '选项一' },
  { text: '选项二', icon: 'success' },
  { text: '禁用项', disabled: true },
]

afterEach(() => {
  document.body.innerHTML = ''
})

describe('MtPopover', () => {
  it('keeps the panel hidden until modelValue is true', () => {
    mount(MtPopover, { props: { actions } })
    expect(document.body.querySelector('.mt-popover__panel')).toBeNull()
  })

  it('renders actions and applies the placement class', async () => {
    mount(MtPopover, {
      props: { modelValue: true, actions, placement: 'bottom' },
    })
    await nextTick()
    const panel = document.body.querySelector('.mt-popover__panel') as HTMLElement
    expect(panel).not.toBeNull()
    const items = panel.querySelectorAll('.mt-popover__action')
    expect(items).toHaveLength(3)
    expect(items[0].textContent).toContain('选项一')
    expect(items[1].querySelector('.mt-popover__action-icon.mt-icon')).not.toBeNull()
    expect(items[2].classList).toContain('mt-popover__action--disabled')
  })

  it('toggles visibility when the reference is clicked', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: false, actions } })
    await wrapper.find('.mt-popover__reference').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('emits select with the action and closes afterwards by default', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: true, actions } })
    await nextTick()
    const items = document.body.querySelectorAll('.mt-popover__action')
    ;(items[1] as HTMLElement).click()
    expect(wrapper.emitted('select')?.[0]).toEqual([actions[1], 1])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('keeps open when closeOnSelect is false', async () => {
    const wrapper = mount(MtPopover, {
      props: { modelValue: true, actions, closeOnSelect: false },
    })
    await nextTick()
    const items = document.body.querySelectorAll('.mt-popover__action')
    ;(items[1] as HTMLElement).click()
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('does not select a disabled action', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: true, actions } })
    await nextTick()
    const items = document.body.querySelectorAll('.mt-popover__action')
    ;(items[2] as HTMLElement).click()
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('closes when clicking outside', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: true, actions } })
    await nextTick()
    document.body.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not close when clicking inside the panel', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: true, actions } })
    await nextTick()
    const panel = document.body.querySelector('.mt-popover__panel') as HTMLElement
    panel.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('closes on Escape', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: true, actions } })
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('renders custom content through the default slot', async () => {
    mount(MtPopover, {
      props: { modelValue: true },
      slots: { default: '<div class="custom">自定义内容</div>' },
    })
    await nextTick()
    expect(document.body.querySelector('.mt-popover__panel .custom')).not.toBeNull()
    expect(document.body.querySelector('.mt-popover__action')).toBeNull()
  })

  it('auto-allocates a z-index when shown', async () => {
    mount(MtPopover, { props: { modelValue: true, actions } })
    await nextTick()
    const style = (document.body.querySelector('.mt-popover__panel') as HTMLElement).getAttribute(
      'style',
    ) ?? ''
    expect(Number(style.match(/z-index:\s*(\d+)/)?.[1])).toBeGreaterThan(2000)
  })

  it('respects an explicit z-index', async () => {
    mount(MtPopover, { props: { modelValue: true, actions, zIndex: 2000 } })
    await nextTick()
    const style = (document.body.querySelector('.mt-popover__panel') as HTMLElement).getAttribute(
      'style',
    ) ?? ''
    expect(style).toContain('z-index: 2001')
  })

  it('exposes aria attributes on the reference and panel', async () => {
    const wrapper = mount(MtPopover, { props: { modelValue: true, actions } })
    await nextTick()
    const reference = wrapper.find('.mt-popover__reference')
    expect(reference.attributes('role')).toBe('button')
    expect(reference.attributes('aria-haspopup')).toBe('menu')
    expect(reference.attributes('aria-expanded')).toBe('true')
    expect(document.body.querySelector('.mt-popover__panel')?.getAttribute('role')).toBe('menu')
  })
})
