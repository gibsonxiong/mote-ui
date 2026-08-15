import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtSearch from './search.vue'

describe('MtSearch', () => {
  it('renders the localized default placeholder', () => {
    const wrapper = mount(MtSearch)
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入搜索关键词')
  })

  it('emits on input', async () => {
    const wrapper = mount(MtSearch)
    await wrapper.find('input').setValue('mote')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['mote'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['mote'])
  })

  it('emits search on Enter', async () => {
    const wrapper = mount(MtSearch, { props: { modelValue: 'mote' } })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('search')?.[0]).toEqual(['mote'])
  })

  it('shows the action button and emits cancel', async () => {
    const wrapper = mount(MtSearch, { props: { showAction: true } })
    const action = wrapper.find('.mt-search__action')
    expect(action.text()).toBe('取消')
    await action.trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  it('supports a custom action text', () => {
    const wrapper = mount(MtSearch, { props: { showAction: true, actionText: '搜索' } })
    expect(wrapper.find('.mt-search__action').text()).toBe('搜索')
  })

  it('clears the value via the clear icon', async () => {
    const wrapper = mount(MtSearch, { props: { modelValue: 'mote' } })
    await wrapper.find('.mt-search__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('hides the clear icon when disabled', () => {
    const wrapper = mount(MtSearch, { props: { modelValue: 'mote', disabled: true } })
    expect(wrapper.find('.mt-search__clear').exists()).toBe(false)
  })

  it('applies the round shape class', () => {
    const wrapper = mount(MtSearch, { props: { shape: 'round' } })
    expect(wrapper.classes()).toContain('mt-search--round')
  })
})
