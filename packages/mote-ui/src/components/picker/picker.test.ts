import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtPicker from './picker.vue'
import { resolveColumns, normalizeOption } from './columns'

const flatColumns = [
  { text: '杭州', value: 'hz' },
  { text: '宁波', value: 'nb' },
  { text: '温州', value: 'wz' },
]

describe('MtPicker', () => {
  it('renders toolbar and one wheel column', () => {
    const wrapper = mount(MtPicker, { props: { columns: flatColumns, title: '选择城市' } })
    expect(wrapper.find('.mt-picker__title').text()).toBe('选择城市')
    expect(wrapper.findAll('.mt-picker-column__option')).toHaveLength(3)
  })

  it('marks the option matching modelValue as selected', () => {
    const wrapper = mount(MtPicker, { props: { columns: flatColumns, modelValue: 'nb' } })
    const selected = wrapper.find('.mt-picker-column__option.is-selected')
    expect(selected.text()).toBe('宁波')
  })

  it('emits confirm with the selected value', async () => {
    const wrapper = mount(MtPicker, { props: { columns: flatColumns, modelValue: 'hz' } })
    await wrapper.find('.mt-picker__confirm').trigger('click')
    const emitted = wrapper.emitted('confirm')?.[0]
    expect(emitted?.[0]).toBe('hz')
  })

  it('emits cancel', async () => {
    const wrapper = mount(MtPicker, { props: { columns: flatColumns } })
    await wrapper.find('.mt-picker__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  it('selects an option by clicking it', async () => {
    const wrapper = mount(MtPicker, { props: { columns: flatColumns, modelValue: 'hz' } })
    await wrapper.findAll('.mt-picker-column__option')[2].trigger('click')
    await wrapper.find('.mt-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')?.[0]?.[0]).toBe('wz')
  })

  it('renders multiple columns', () => {
    const wrapper = mount(MtPicker, {
      props: { columns: [['a', 'b'], ['x', 'y']], modelValue: ['b', 'y'] },
    })
    expect(wrapper.findAll('.mt-picker-column')).toHaveLength(2)
    const selected = wrapper.findAll('.mt-picker-column__option.is-selected')
    expect(selected.map((node) => node.text())).toEqual(['b', 'y'])
    expect(wrapper.emitted()).toBeDefined()
  })
})

describe('picker column helpers', () => {
  it('normalizes primitive options', () => {
    expect(normalizeOption('a')).toEqual({ text: 'a', value: 'a' })
    expect(normalizeOption(1)).toEqual({ text: '1', value: 1 })
  })

  it('resolves cascade columns along the selected path', () => {
    const cascade = [
      {
        text: '浙江',
        value: 'zj',
        children: [
          { text: '杭州', value: 'hz' },
          { text: '宁波', value: 'nb' },
        ],
      },
      {
        text: '江苏',
        value: 'js',
        children: [{ text: '南京', value: 'nj' }],
      },
    ]
    const first = resolveColumns(cascade, [])
    expect(first).toHaveLength(2)
    expect(first[1].map((option) => option.value)).toEqual(['hz', 'nb'])

    const switched = resolveColumns(cascade, [1, 0])
    expect(switched[1].map((option) => option.value)).toEqual(['nj'])
  })
})
