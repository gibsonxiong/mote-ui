import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MtShareSheet from './share-sheet.vue'
import type { MtShareSheetOption } from './types'

const options: MtShareSheetOption[] = [
  { name: '微信', icon: 'star' },
  { name: '朋友圈', icon: 'star' },
  { name: '复制链接', description: '已复制', color: '#f56c6c' },
]

describe('MtShareSheet', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('renders title, description and option names', () => {
    const wrapper = mount(MtShareSheet, {
      props: { modelValue: true, title: '分享', description: '分享到', options },
    })
    const text = document.body.textContent as string
    expect(text).toContain('分享')
    expect(text).toContain('分享到')
    expect(text).toContain('微信')
    expect(text).toContain('已复制')
    wrapper.unmount()
  })

  it('emits select with option and flat index, then closes', () => {
    const wrapper = mount(MtShareSheet, { props: { modelValue: true, options } })
    const buttons = document.body.querySelectorAll('.mt-share-sheet__option')
    ;(buttons[1] as HTMLButtonElement).click()
    expect(wrapper.emitted('select')?.[0]).toEqual([options[1], 1])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('does not emit select for disabled option', () => {
    const wrapper = mount(MtShareSheet, {
      props: { modelValue: true, options: [{ name: '禁用', disabled: true }] },
    })
    const button = document.body.querySelector('.mt-share-sheet__option') as HTMLButtonElement
    button.click()
    expect(wrapper.emitted('select')).toBeUndefined()
    wrapper.unmount()
  })

  it('flattens index across multiple rows', () => {
    const wrapper = mount(MtShareSheet, {
      props: {
        modelValue: true,
        options: [
          [{ name: 'A' }, { name: 'B' }],
          [{ name: 'C' }],
        ],
      },
    })
    const buttons = document.body.querySelectorAll('.mt-share-sheet__option')
    ;(buttons[2] as HTMLButtonElement).click()
    expect(wrapper.emitted('select')?.[0]?.[1]).toBe(2)
    wrapper.unmount()
  })

  it('emits cancel and closes on cancel click', () => {
    const wrapper = mount(MtShareSheet, {
      props: { modelValue: true, options, cancelText: '取消' },
    })
    const cancel = document.body.querySelector('.mt-share-sheet__cancel') as HTMLButtonElement
    cancel.click()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('hides cancel button without cancelText', () => {
    const wrapper = mount(MtShareSheet, { props: { modelValue: true, options } })
    expect(document.body.querySelector('.mt-share-sheet__cancel')).toBeNull()
    wrapper.unmount()
  })
})