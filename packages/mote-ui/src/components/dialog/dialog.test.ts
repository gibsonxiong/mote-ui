import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MtDialog from './dialog.vue'
import { confirmDialog, alertDialog } from './dialog'

describe('MtDialog', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('renders title and message when visible', () => {
    const wrapper = mount(MtDialog, {
      props: { modelValue: true, title: '提示', message: '确定删除吗？' },
    })
    expect(document.body.textContent).toContain('提示')
    expect(document.body.textContent).toContain('确定删除吗？')
    wrapper.unmount()
  })

  it('emits confirm and closes on confirm click', async () => {
    const wrapper = mount(MtDialog, { props: { modelValue: true, message: 'ok?' } })
    await (document.body.querySelector('.mt-dialog__confirm') as HTMLButtonElement).click()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('emits cancel and closes on cancel click', async () => {
    const wrapper = mount(MtDialog, { props: { modelValue: true, message: 'ok?' } })
    await (document.body.querySelector('.mt-dialog__cancel') as HTMLButtonElement).click()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('hides cancel button when showCancelButton is false', () => {
    const wrapper = mount(MtDialog, {
      props: { modelValue: true, message: 'ok?', showCancelButton: false },
    })
    expect(document.body.querySelector('.mt-dialog__cancel')).toBeNull()
    wrapper.unmount()
  })

  it('confirmDialog resolves on confirm', async () => {
    const promise = confirmDialog({ message: 'sure?' })
    await nextTick()
    ;(document.body.querySelector('.mt-dialog__confirm') as HTMLButtonElement).click()
    await expect(promise).resolves.toBeUndefined()
  })

  it('confirmDialog rejects on cancel', async () => {
    const promise = confirmDialog('sure?')
    await nextTick()
    ;(document.body.querySelector('.mt-dialog__cancel') as HTMLButtonElement).click()
    await expect(promise).rejects.toBe('cancel')
  })

  it('alertDialog renders a single confirm button and resolves', async () => {
    const promise = alertDialog('note')
    await nextTick()
    expect(document.body.querySelector('.mt-dialog__cancel')).toBeNull()
    ;(document.body.querySelector('.mt-dialog__confirm') as HTMLButtonElement).click()
    await expect(promise).resolves.toBeUndefined()
  })
})
