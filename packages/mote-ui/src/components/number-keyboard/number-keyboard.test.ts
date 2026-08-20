import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MtNumberKeyboard from './number-keyboard.vue'

function keyEls() {
  return Array.from(document.body.querySelectorAll<HTMLElement>('.mt-number-keyboard__key'))
}

describe('MtNumberKeyboard', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders nothing when hidden', () => {
    const wrapper = mount(MtNumberKeyboard)
    expect(document.body.querySelector('.mt-number-keyboard')).toBeNull()
    wrapper.unmount()
  })

  it('renders the default keypad when shown', () => {
    const wrapper = mount(MtNumberKeyboard, { props: { show: true } })
    const keys = document.body.querySelectorAll('.mt-number-keyboard__key')
    expect(keys.length).toBe(12)
    expect(document.body.textContent).toContain('1')
    expect(document.body.textContent).toContain('9')
    wrapper.unmount()
  })

  it('appends a digit and emits input', () => {
    const wrapper = mount(MtNumberKeyboard, { props: { show: true, modelValue: '12' } })
    const buttons = keyEls()
    const digitOne = buttons.find((el) => el.textContent === '1')!
    digitOne.click()
    expect(wrapper.emitted('input')?.[0]).toEqual(['1'])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['121'])
    wrapper.unmount()
  })

  it('respects maxlength', () => {
    const wrapper = mount(MtNumberKeyboard, {
      props: { show: true, modelValue: '123', maxlength: 3 },
    })
    const buttons = keyEls()
    const digitOne = buttons.find((el) => el.textContent === '1')!
    digitOne.click()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('input')?.[0]).toEqual(['1'])
    wrapper.unmount()
  })

  it('deletes the last character and emits delete', () => {
    const wrapper = mount(MtNumberKeyboard, { props: { show: true, modelValue: '12' } })
    const del = document.body.querySelector('.mt-number-keyboard__key--delete') as HTMLElement
    del.click()
    expect(wrapper.emitted('delete')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    wrapper.unmount()
  })

  it('emits input with the extra key without changing the value', () => {
    const wrapper = mount(MtNumberKeyboard, {
      props: { show: true, modelValue: '1', extraKey: '.' },
    })
    const extra = document.body.querySelector('.mt-number-keyboard__key--extra') as HTMLElement
    extra.click()
    expect(wrapper.emitted('input')?.[0]).toEqual(['.'])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('hides the delete key when showDeleteKey is false and stubs the cell', () => {
    const wrapper = mount(MtNumberKeyboard, { props: { show: true, showDeleteKey: false } })
    expect(document.body.querySelector('.mt-number-keyboard__key--delete')).toBeNull()
    expect(document.body.querySelector('.mt-number-keyboard__key--placeholder')).toBeTruthy()
    expect(keyEls().length).toBe(12)
    wrapper.unmount()
  })

  it('closes and emits close on the close button', () => {
    const wrapper = mount(MtNumberKeyboard, { props: { show: true } })
    const close = document.body.querySelector('.mt-number-keyboard__close') as HTMLElement
    close.click()
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('update:show')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('renders the custom theme through the default slot', () => {
    const wrapper = mount(MtNumberKeyboard, {
      props: { show: true, theme: 'custom' },
      slots: { default: '<div class="custom-keys">custom</div>' },
    })
    expect(document.body.querySelector('.custom-keys')).toBeTruthy()
    expect(document.body.querySelector('.mt-number-keyboard__keys')).toBeNull()
    wrapper.unmount()
  })

  it('hides when clicking outside by default', () => {
    const wrapper = mount(MtNumberKeyboard, { props: { show: true } })
    document.body.click()
    expect(wrapper.emitted('update:show')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('stays open when hideOnClickOutside is false', () => {
    const wrapper = mount(MtNumberKeyboard, {
      props: { show: true, hideOnClickOutside: false },
    })
    document.body.click()
    expect(wrapper.emitted('update:show')).toBeUndefined()
    wrapper.unmount()
  })

  it('auto-allocates a z-index above the popup base', () => {
    const wrapper = mount(MtNumberKeyboard, { props: { show: true } })
    const style = document.body.querySelector('.mt-number-keyboard')?.getAttribute('style') ?? ''
    const zIndex = Number(style.match(/z-index:\s*(\d+)/)?.[1])
    expect(zIndex).toBeGreaterThan(2000)
    wrapper.unmount()
  })
})