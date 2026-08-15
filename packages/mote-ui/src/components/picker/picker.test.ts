import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtPicker from './picker.vue'
import { resolveColumns, normalizeOption } from './columns'
import { settleIndex } from './momentum'

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

  it('restores cascade selection from a non-first branch', () => {
    const areas = [
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
        children: [
          { text: '南京', value: 'nj' },
          { text: '苏州', value: 'sz' },
        ],
      },
    ]
    const wrapper = mount(MtPicker, { props: { columns: areas, modelValue: ['js', 'sz'] } })
    const selected = wrapper.findAll('.mt-picker-column__option.is-selected')
    expect(selected.map((node) => node.text())).toEqual(['江苏', '苏州'])
  })

  it('skips disabled options when selecting', async () => {
    const columns = [
      { text: 'a', value: 'a' },
      { text: 'b', value: 'b', disabled: true },
      { text: 'c', value: 'c' },
    ]
    const wrapper = mount(MtPicker, { props: { columns, modelValue: 'a' } })
    await wrapper.findAll('.mt-picker-column__option')[1].trigger('click')
    await wrapper.find('.mt-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')?.[0]?.[0]).toBe('c')
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

describe('picker momentum', () => {
  const optionHeight = 44

  it('flicking up (negative velocity) settles on a higher index', () => {
    const next = settleIndex(5, -20, -1.0, optionHeight)
    expect(next).toBeGreaterThan(5)
  })

  it('flicking down (positive velocity) settles on a lower index', () => {
    const next = settleIndex(5, 20, 1.0, optionHeight)
    expect(next).toBeLessThan(5)
  })

  it('slow drag without momentum maps offset to index delta', () => {
    // 88px down = 2 rows down = 2 earlier options
    expect(settleIndex(5, 88, 0, optionHeight)).toBe(3)
    // 88px up = 2 rows up = 2 later options
    expect(settleIndex(5, -88, 0, optionHeight)).toBe(7)
  })

  it('clamps momentum to the configured limit', () => {
    const huge = settleIndex(50, 0, 10, optionHeight)
    // velocity 10 px/ms → raw momentum 3333px, clamped to 15 rows = 660px
    expect(huge).toBe(50 - Math.round((15 * optionHeight) / optionHeight))
  })
})
