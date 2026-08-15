import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import MtPopup from './popup.vue'

describe('MtPopup', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('teleports content to body when visible', () => {
    const wrapper = mount(MtPopup, {
      props: { modelValue: true },
      slots: { default: 'popup content' },
    })
    expect(document.body.textContent).toContain('popup content')
    expect(document.body.querySelector('.mt-popup--center')).toBeTruthy()
    wrapper.unmount()
  })

  it('renders nothing when hidden', () => {
    const wrapper = mount(MtPopup, { props: { modelValue: false } })
    expect(document.body.querySelector('.mt-popup')).toBeNull()
    wrapper.unmount()
  })

  it('applies position class', () => {
    const wrapper = mount(MtPopup, { props: { modelValue: true, position: 'bottom' } })
    expect(document.body.querySelector('.mt-popup--bottom')).toBeTruthy()
    wrapper.unmount()
  })

  it('emits update:modelValue on overlay click by default', async () => {
    const wrapper = mount(MtPopup, { props: { modelValue: true } })
    const overlay = document.body.querySelector('.mt-overlay') as HTMLElement
    overlay.click()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('keeps open when closeOnClickOverlay is false', () => {
    const wrapper = mount(MtPopup, {
      props: { modelValue: true, closeOnClickOverlay: false },
    })
    const overlay = document.body.querySelector('.mt-overlay') as HTMLElement
    overlay.click()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('hides overlay when overlay is false', () => {
    const wrapper = mount(MtPopup, { props: { modelValue: true, overlay: false } })
    expect(document.body.querySelector('.mt-overlay')).toBeNull()
    wrapper.unmount()
  })

  it('locks body scroll while open and restores it on close', async () => {
    const visible = ref(true)
    const wrapper = mount(
      defineComponent({
        render: () => h(MtPopup, { modelValue: visible.value }),
      }),
    )
    expect(document.body.style.overflow).toBe('hidden')
    visible.value = false
    await nextTick()
    expect(document.body.style.overflow).toBe('')
    wrapper.unmount()
  })
})
