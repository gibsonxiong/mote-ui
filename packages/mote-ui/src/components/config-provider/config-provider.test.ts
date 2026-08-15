import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import MtConfigProvider from './config-provider.vue'
import MtEmpty from '../empty/empty.vue'
import MtDialog from '../dialog/dialog.vue'
import { enUS, zhCN, getLocale, setLocale } from '../../locale'

describe('MtConfigProvider', () => {
  afterEach(() => {
    setLocale(zhCN)
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('provides the locale to descendant components', () => {
    const wrapper = mount(MtConfigProvider, {
      props: { locale: enUS },
      slots: { default: () => h(MtEmpty) },
    })
    expect(wrapper.find('.mt-empty__description').text()).toBe('No data')
  })

  it('syncs the global locale for imperative APIs', () => {
    mount(MtConfigProvider, { props: { locale: enUS } })
    expect(getLocale().name).toBe('en-US')
  })

  it('falls back to zh-CN without a provider', () => {
    const wrapper = mount(MtEmpty)
    expect(wrapper.find('.mt-empty__description').text()).toBe('暂无数据')
  })

  it('localizes dialog buttons', () => {
    const wrapper = mount(MtConfigProvider, {
      props: { locale: enUS },
      slots: { default: () => h(MtDialog, { modelValue: true }) },
    })
    expect(document.body.querySelector('.mt-dialog__cancel')?.textContent).toBe('Cancel')
    expect(document.body.querySelector('.mt-dialog__confirm')?.textContent).toBe('Confirm')
    wrapper.unmount()
  })

  it('lets component props override locale text', () => {
    const wrapper = mount(MtConfigProvider, {
      props: { locale: enUS },
      slots: { default: () => h(MtDialog, { modelValue: true, confirmButtonText: 'OK' }) },
    })
    expect(document.body.querySelector('.mt-dialog__confirm')?.textContent).toBe('OK')
    expect(document.body.querySelector('.mt-dialog__cancel')?.textContent).toBe('Cancel')
    wrapper.unmount()
  })
})
