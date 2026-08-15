import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtCascader from './cascader.vue'
import type { MtCascaderOption } from './types'

const options: MtCascaderOption[] = [
  {
    text: '浙江',
    id: 'zj',
    children: [
      { text: '杭州', id: 'hz' },
      { text: '宁波', id: 'nb', invalid: true },
    ],
  },
  {
    text: '江苏',
    id: 'js',
    children: [{ text: '南京', id: 'nj' }],
  },
]

const fieldNames = { value: 'id', label: 'text', disabled: 'invalid' }

function mountCascader(props: Record<string, unknown> = {}) {
  return mount(MtCascader, {
    props: { options, props: fieldNames, ...props },
  })
}

describe('MtCascader', () => {
  it('renders first-level options and a pending tab', () => {
    const wrapper = mountCascader()
    expect(wrapper.findAll('.mt-cascader__option')).toHaveLength(2)
    expect(wrapper.find('.mt-cascader__tab').text()).toBe('请选择')
  })

  it('descends into children when selecting a branch option', async () => {
    const wrapper = mountCascader()
    await wrapper.findAll('.mt-cascader__option')[0].trigger('click')
    expect(wrapper.findAll('.mt-cascader__option')).toHaveLength(2)
    expect(wrapper.findAll('.mt-cascader__option')[0].text()).toContain('杭州')
    // The pending tab becomes active after descending into a branch
    expect(wrapper.find('.mt-cascader__tab.is-active').text()).toBe('请选择')
  })

  it('emits the full path when selecting a leaf', async () => {
    const wrapper = mountCascader()
    await wrapper.findAll('.mt-cascader__option')[0].trigger('click')
    await wrapper.findAll('.mt-cascader__option')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['zj', 'hz']])
    const [values, selectedOptions] = wrapper.emitted('change')?.[0] as [
      string[],
      MtCascaderOption[],
    ]
    expect(values).toEqual(['zj', 'hz'])
    expect(selectedOptions.map((option) => option.id)).toEqual(['zj', 'hz'])
  })

  it('initializes tabs and pane from the bound value', () => {
    const wrapper = mountCascader({ modelValue: ['zj', 'hz'] })
    const tabs = wrapper.findAll('.mt-cascader__tab')
    expect(tabs.map((tab) => tab.text())).toContain('浙江')
    expect(tabs.map((tab) => tab.text())).toContain('杭州')
    expect(wrapper.find('.mt-cascader__option.is-selected').text()).toContain('杭州')
  })

  it('switches levels by clicking tabs', async () => {
    const wrapper = mountCascader({ modelValue: ['zj', 'hz'] })
    await wrapper.findAll('.mt-cascader__tab')[0].trigger('click')
    expect(wrapper.findAll('.mt-cascader__option')).toHaveLength(2)
    expect(wrapper.findAll('.mt-cascader__option')[0].text()).toContain('浙江')
  })

  it('replaces deeper levels when reselecting a branch', async () => {
    const wrapper = mountCascader({ modelValue: ['zj', 'hz'] })
    await wrapper.findAll('.mt-cascader__tab')[0].trigger('click')
    await wrapper.findAll('.mt-cascader__option')[1].trigger('click')
    await wrapper.findAll('.mt-cascader__option')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['js', 'nj']])
  })

  it('ignores disabled options', async () => {
    const wrapper = mountCascader({ modelValue: ['zj'] })
    const disabledOption = wrapper.findAll('.mt-cascader__option')[1]
    expect(disabledOption.classes()).toContain('is-disabled')
    await disabledOption.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('ignores every interaction while disabled', async () => {
    const wrapper = mountCascader({ modelValue: ['zj'], disabled: true })
    await wrapper.findAll('.mt-cascader__option')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('uses default field names without a mapping', () => {
    const wrapper = mount(MtCascader, {
      props: {
        options: [{ label: '杭州', value: 'hz' }],
      },
    })
    expect(wrapper.find('.mt-cascader__option').text()).toContain('杭州')
  })
})
