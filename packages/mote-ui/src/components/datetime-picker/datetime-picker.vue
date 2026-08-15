<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { MtPicker } from '../picker'
import { clamp, daysInMonth, padZero, range } from './datetime'
import type { MtPickerOption } from '../picker/types'
import type { MtDatetimePickerColumnType, MtDatetimePickerProps } from './types'

defineOptions({
  name: 'MtDatetimePicker',
})

const props = withDefaults(defineProps<MtDatetimePickerProps>(), {
  modelValue: undefined,
  type: 'date',
  minDate: () => new Date(new Date().getFullYear() - 10, 0, 1),
  maxDate: () => new Date(new Date().getFullYear() + 10, 11, 31),
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  title: undefined,
  confirmButtonText: undefined,
  cancelButtonText: undefined,
  filter: undefined,
  formatter: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | string]
  confirm: [value: Date | string]
  cancel: []
  change: []
}>()

interface CurrentSelection {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

const columnTypes = computed<MtDatetimePickerColumnType[]>(() => {
  switch (props.type) {
    case 'time':
      return ['hour', 'minute']
    case 'year-month':
      return ['year', 'month']
    case 'datetime':
      return ['year', 'month', 'day', 'hour', 'minute']
    default:
      return ['year', 'month', 'day']
  }
})

function clampTime(hour: number, minute: number) {
  let nextHour = clamp(hour, props.minHour, props.maxHour)
  let nextMinute = minute
  if (nextHour === props.minHour) nextMinute = Math.max(nextMinute, props.minMinute)
  if (nextHour === props.maxHour) nextMinute = Math.min(nextMinute, props.maxMinute)
  return { hour: nextHour, minute: clamp(nextMinute, props.minMinute, props.maxMinute) }
}

function selectionFromValue(): CurrentSelection {
  const now = new Date()
  if (props.type === 'time') {
    const [hour, minute] = String(props.modelValue ?? '')
      .split(':')
      .map((part) => Number.parseInt(part, 10))
    const time = clampTime(
      Number.isNaN(hour) ? now.getHours() : hour,
      Number.isNaN(minute) ? now.getMinutes() : minute,
    )
    return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate(), ...time }
  }

  const date = props.modelValue instanceof Date ? props.modelValue : now
  const clamped = new Date(
    clamp(date.getTime(), props.minDate.getTime(), props.maxDate.getTime()),
  )
  return {
    year: clamped.getFullYear(),
    month: clamped.getMonth() + 1,
    day: clamped.getDate(),
    hour: clampTime(clamped.getHours(), clamped.getMinutes()).hour,
    minute: clampTime(clamped.getHours(), clamped.getMinutes()).minute,
  }
}

const current = ref<CurrentSelection>(selectionFromValue())

watch(
  () => props.modelValue,
  () => {
    current.value = selectionFromValue()
  },
)

function applyFilter(type: MtDatetimePickerColumnType, values: number[]) {
  return props.filter ? props.filter(type, values) : values
}

function toColumn(type: MtDatetimePickerColumnType, values: number[]): MtPickerOption[] {
  return applyFilter(type, values).map((value) => ({
    text: props.formatter ? props.formatter(type, value) : padZero(value),
    value: padZero(value),
  }))
}

const columns = computed<MtPickerOption[][]>(() => {
  const { year, month } = current.value
  const minYear = props.minDate.getFullYear()
  const maxYear = props.maxDate.getFullYear()
  const result: MtPickerOption[][] = []

  for (const type of columnTypes.value) {
    if (type === 'year') {
      result.push(toColumn('year', range(minYear, maxYear)))
    } else if (type === 'month') {
      const start = year === minYear ? props.minDate.getMonth() + 1 : 1
      const end = year === maxYear ? props.maxDate.getMonth() + 1 : 12
      result.push(toColumn('month', range(start, end)))
    } else if (type === 'day') {
      const start =
        year === minYear && month === props.minDate.getMonth() + 1
          ? props.minDate.getDate()
          : 1
      const end =
        year === maxYear && month === props.maxDate.getMonth() + 1
          ? props.maxDate.getDate()
          : daysInMonth(year, month)
      result.push(toColumn('day', range(start, end)))
    } else if (type === 'hour') {
      result.push(toColumn('hour', range(props.minHour, props.maxHour)))
    } else {
      result.push(toColumn('minute', range(props.minMinute, props.maxMinute)))
    }
  }
  return result
})

const currentValues = computed(() =>
  columnTypes.value.map((type) => padZero(current.value[type])),
)

function handleColumnChange(columnIndex: number, index: number) {
  const type = columnTypes.value[columnIndex]
  const column = columns.value[columnIndex]
  const value = Number(column[Math.min(index, column.length - 1)]?.value ?? 0)
  const next = { ...current.value, [type]: value }
  // Keep the day valid when the year/month shrinks the month length
  if (type === 'year' || type === 'month') {
    next.day = Math.min(next.day, daysInMonth(next.year, next.month))
  }
  current.value = next
  emit('change')
}

function buildResult(): Date | string {
  const { year, month, day, hour, minute } = current.value
  if (props.type === 'time') return `${padZero(hour)}:${padZero(minute)}`
  const includeTime = props.type === 'datetime'
  return new Date(
    year,
    month - 1,
    props.type === 'year-month' ? 1 : day,
    includeTime ? hour : 0,
    includeTime ? minute : 0,
  )
}

function handleConfirm() {
  const value = buildResult()
  emit('update:modelValue', value)
  emit('confirm', value)
}

function handleCancel() {
  current.value = selectionFromValue()
  emit('cancel')
}
</script>

<template>
  <MtPicker
    class="mt-datetime-picker"
    :columns="columns"
    :model-value="currentValues"
    :title="title"
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText"
    @change="handleColumnChange"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>
