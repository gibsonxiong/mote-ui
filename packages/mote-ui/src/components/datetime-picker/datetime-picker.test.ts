import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtDatetimePicker from './datetime-picker.vue'

const minDate = new Date(2026, 0, 1)
const maxDate = new Date(2026, 11, 31)

function columnsOf(wrapper: ReturnType<typeof mount>) {
  return wrapper.findAll('.mt-picker-column')
}

describe('MtDatetimePicker', () => {
  it('renders year/month/day columns for date type', () => {
    const wrapper = mount(MtDatetimePicker, {
      props: { modelValue: new Date(2026, 7, 15), minDate, maxDate },
    })
    expect(columnsOf(wrapper)).toHaveLength(3)
    const selected = wrapper.findAll('.mt-picker-column__option.is-selected')
    expect(selected.map((node) => node.text())).toEqual(['2026', '08', '15'])
  })

  it('emits the selected Date on confirm', async () => {
    const wrapper = mount(MtDatetimePicker, {
      props: { modelValue: new Date(2026, 7, 15), minDate, maxDate },
    })
    await wrapper.find('.mt-picker__confirm').trigger('click')
    const value = wrapper.emitted('confirm')?.[0]?.[0]
    expect(value).toEqual(new Date(2026, 7, 15))
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([new Date(2026, 7, 15)])
  })

  it('clamps the day when switching to a shorter month', async () => {
    const wrapper = mount(MtDatetimePicker, {
      props: { modelValue: new Date(2026, 0, 31), minDate, maxDate },
    })
    const monthOptions = columnsOf(wrapper)[1].findAll('.mt-picker-column__option')
    await monthOptions[1].trigger('click') // February
    await wrapper.find('.mt-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')?.[0]?.[0]).toEqual(new Date(2026, 1, 28))
  })

  it('renders hour/minute columns for time type', async () => {
    const wrapper = mount(MtDatetimePicker, {
      props: { modelValue: '09:30', type: 'time', minHour: 8, maxHour: 20 },
    })
    expect(columnsOf(wrapper)).toHaveLength(2)
    expect(columnsOf(wrapper)[0].findAll('.mt-picker-column__option')).toHaveLength(13)
    const hourOptions = columnsOf(wrapper)[0].findAll('.mt-picker-column__option')
    await hourOptions[2].trigger('click') // 10
    await wrapper.find('.mt-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')?.[0]?.[0]).toBe('10:30')
  })

  it('renders five columns for datetime type', () => {
    const wrapper = mount(MtDatetimePicker, {
      props: { modelValue: new Date(2026, 7, 15, 9, 30), type: 'datetime', minDate, maxDate },
    })
    expect(columnsOf(wrapper)).toHaveLength(5)
  })

  it('renders two columns for year-month type', async () => {
    const wrapper = mount(MtDatetimePicker, {
      props: { modelValue: new Date(2026, 7, 15), type: 'year-month', minDate, maxDate },
    })
    expect(columnsOf(wrapper)).toHaveLength(2)
    await wrapper.find('.mt-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')?.[0]?.[0]).toEqual(new Date(2026, 7, 1))
  })

  it('applies the formatter to option texts', () => {
    const wrapper = mount(MtDatetimePicker, {
      props: {
        modelValue: new Date(2026, 7, 15),
        minDate,
        maxDate,
        formatter: (type: string, value: number) => (type === 'year' ? `${value}年` : `${value}`),
      },
    })
    const selected = wrapper.findAll('.mt-picker-column__option.is-selected')
    expect(selected[0].text()).toBe('2026年')
    expect(selected[1].text()).toBe('8')
  })

  it('applies the filter to candidate values', () => {
    const wrapper = mount(MtDatetimePicker, {
      props: {
        modelValue: new Date(2026, 7, 15),
        minDate,
        maxDate,
        filter: (type: string, values: number[]) =>
          type === 'month' ? values.filter((value) => value % 2 === 0) : values,
      },
    })
    expect(columnsOf(wrapper)[1].findAll('.mt-picker-column__option')).toHaveLength(6)
  })

  it('emits cancel and resets the selection', async () => {
    const wrapper = mount(MtDatetimePicker, {
      props: { modelValue: new Date(2026, 7, 15), minDate, maxDate },
    })
    await wrapper.find('.mt-picker__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})
