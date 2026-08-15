import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { DOMWrapper } from '@vue/test-utils'
import MtCalendar from './calendar.vue'

const minDate = new Date(2026, 0, 15)
const maxDate = new Date(2026, 2, 10)

function mountCalendar(props: Record<string, unknown> = {}) {
  return mount(MtCalendar, { props: { minDate, maxDate, ...props } })
}

function findDay(
  wrapper: ReturnType<typeof mount>,
  day: number,
  monthIndex = 0,
): DOMWrapper<Element> {
  const month = wrapper.findAll('.mt-calendar__month')[monthIndex]
  const found = month
    .findAll('.mt-calendar__day')
    .find((item) => item.find('.mt-calendar__day-number').text() === String(day))
  if (!found) throw new Error(`day ${day} not found in month ${monthIndex}`)
  return found
}

describe('MtCalendar', () => {
  it('renders every month between min and max date', () => {
    const wrapper = mountCalendar()
    const titles = wrapper.findAll('.mt-calendar__month-title').map((item) => item.text())
    expect(titles).toEqual(['2026 年 1 月', '2026 年 2 月', '2026 年 3 月'])
    expect(wrapper.findAll('.mt-calendar__weekday')).toHaveLength(7)
  })

  it('disables days outside the allowed range', () => {
    const wrapper = mountCalendar()
    expect((findDay(wrapper, 10).element as HTMLButtonElement).disabled).toBe(true)
    expect((findDay(wrapper, 20).element as HTMLButtonElement).disabled).toBe(false)
  })

  it('selects a date and confirms in single mode', async () => {
    const wrapper = mountCalendar()
    expect(
      (wrapper.find('.mt-calendar__footer button').element as HTMLButtonElement).disabled,
    ).toBe(true)
    await findDay(wrapper, 20).trigger('click')
    expect(wrapper.emitted('select')?.[0]?.[0]).toBeInstanceOf(Date)
    await wrapper.find('.mt-calendar__footer button').trigger('click')
    const emitted = wrapper.emitted('update:modelValue')?.[0]?.[0] as Date
    expect(emitted.getFullYear()).toBe(2026)
    expect(emitted.getMonth()).toBe(0)
    expect(emitted.getDate()).toBe(20)
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('echoes the bound value as selected', () => {
    const wrapper = mountCalendar({ modelValue: new Date(2026, 1, 8) })
    expect(findDay(wrapper, 8, 1).classes()).toContain('is-selected')
  })

  it('builds a range across two clicks', async () => {
    const wrapper = mountCalendar({ type: 'range' })
    await findDay(wrapper, 20).trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(findDay(wrapper, 20).classes()).toContain('is-start')
    await findDay(wrapper, 25).trigger('click')
    const [start, end] = wrapper.emitted('select')?.[0]?.[0] as [Date, Date]
    expect(start.getDate()).toBe(20)
    expect(end.getDate()).toBe(25)
    expect(findDay(wrapper, 22).classes()).toContain('is-middle')
    await wrapper.find('.mt-calendar__footer button').trigger('click')
    const [confirmedStart, confirmedEnd] = wrapper.emitted('update:modelValue')?.[0]
      ?.[0] as [Date, Date]
    expect(confirmedStart.getDate()).toBe(20)
    expect(confirmedEnd.getDate()).toBe(25)
  })

  it('restarts the range when clicking an earlier day', async () => {
    const wrapper = mountCalendar({ type: 'range', modelValue: [new Date(2026, 0, 25), new Date(2026, 0, 28)] })
    await findDay(wrapper, 20).trigger('click')
    expect(findDay(wrapper, 20).classes()).toContain('is-start')
    expect(findDay(wrapper, 25).classes()).not.toContain('is-start')
  })

  it('emits directly without the confirm button', async () => {
    const wrapper = mountCalendar({ showConfirm: false })
    expect(wrapper.find('.mt-calendar__footer').exists()).toBe(false)
    await findDay(wrapper, 20).trigger('click')
    const emitted = wrapper.emitted('update:modelValue')?.[0]?.[0] as Date
    expect(emitted.getDate()).toBe(20)
  })

  it('ignores clicks while readonly', async () => {
    const wrapper = mountCalendar({ readonly: true })
    await findDay(wrapper, 20).trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })
})
