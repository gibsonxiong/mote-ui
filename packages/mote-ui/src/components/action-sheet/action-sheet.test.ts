import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MtActionSheet from './action-sheet.vue'
import type { MtActionSheetAction } from './types'

const actions: MtActionSheetAction[] = [
  { name: '选项一' },
  { name: '选项二', subname: '描述信息' },
  { name: '禁用项', disabled: true },
]

describe('MtActionSheet', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('renders title, actions and subname', () => {
    const wrapper = mount(MtActionSheet, {
      props: { modelValue: true, title: '请选择', actions },
    })
    expect(document.body.textContent).toContain('请选择')
    expect(document.body.textContent).toContain('选项一')
    expect(document.body.textContent).toContain('描述信息')
    wrapper.unmount()
  })

  it('emits select with action and index, then closes', async () => {
    const wrapper = mount(MtActionSheet, {
      props: { modelValue: true, actions },
    })
    const buttons = document.body.querySelectorAll('.mt-action-sheet__action')
    ;(buttons[1] as HTMLButtonElement).click()
    expect(wrapper.emitted('select')?.[0]).toEqual([actions[1], 1])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('keeps open when closeOnClickAction is false', () => {
    const wrapper = mount(MtActionSheet, {
      props: { modelValue: true, actions, closeOnClickAction: false },
    })
    const button = document.body.querySelector('.mt-action-sheet__action') as HTMLButtonElement
    button.click()
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('does not emit select for disabled action', () => {
    const wrapper = mount(MtActionSheet, {
      props: { modelValue: true, actions },
    })
    const buttons = document.body.querySelectorAll('.mt-action-sheet__action')
    ;(buttons[2] as HTMLButtonElement).click()
    expect(wrapper.emitted('select')).toBeUndefined()
    wrapper.unmount()
  })

  it('emits cancel and closes on cancel click', () => {
    const wrapper = mount(MtActionSheet, {
      props: { modelValue: true, actions, cancelText: '取消' },
    })
    const cancel = document.body.querySelector('.mt-action-sheet__cancel') as HTMLButtonElement
    cancel.click()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('hides cancel button without cancelText', () => {
    const wrapper = mount(MtActionSheet, { props: { modelValue: true, actions } })
    expect(document.body.querySelector('.mt-action-sheet__cancel')).toBeNull()
    wrapper.unmount()
  })

  it('applies custom action color', () => {
    const wrapper = mount(MtActionSheet, {
      props: { modelValue: true, actions: [{ name: '危险', color: '#f56c6c' }] },
    })
    const button = document.body.querySelector('.mt-action-sheet__action') as HTMLButtonElement
    expect(button.style.color).toBe('#f56c6c')
    wrapper.unmount()
  })
})
