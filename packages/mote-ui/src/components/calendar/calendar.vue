<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import MtButton from '../button/button.vue'
import { format, useLocale } from '../../locale'
import { formItemKey } from '../form/types'
import { daysInMonth } from '../datetime-picker/datetime'
import type { MtCalendarProps, MtCalendarValue } from './types'

defineOptions({
  name: 'MtCalendar',
})

const props = withDefaults(defineProps<MtCalendarProps>(), {
  modelValue: null,
  type: 'single',
  minDate: () => new Date(),
  maxDate: () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate())
  },
  title: undefined,
  confirmText: undefined,
  showConfirm: true,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtCalendarValue]
  select: [value: Date | [Date, Date]]
  confirm: [value: Date | [Date, Date]]
}>()

const { locale, t } = useLocale()

const formItem = inject(formItemKey, null)

/** Strips the time part so comparisons only care about the day. */
function dayStart(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

const minTimestamp = computed(() => dayStart(props.minDate))
const maxTimestamp = computed(() => dayStart(props.maxDate))

// `t` only resolves string messages; weekdays is an array so read it directly.
const weekdays = computed(() => locale.value.calendar.weekdays)

interface MonthInfo {
  year: number
  /** 1-based month */
  month: number
  title: string
  /** Empty cells before the first day of the month */
  offset: number
  days: number[]
}

const months = computed<MonthInfo[]>(() => {
  const result: MonthInfo[] = []
  const cursor = new Date(
    props.minDate.getFullYear(),
    props.minDate.getMonth(),
    1,
  )
  while (cursor.getTime() <= maxTimestamp.value) {
    const year = cursor.getFullYear()
    const month = cursor.getMonth() + 1
    result.push({
      year,
      month,
      title: format(t('calendar.monthTitle'), { year, month }),
      offset: new Date(year, month - 1, 1).getDay(),
      days: Array.from({ length: daysInMonth(year, month) }, (_, index) => index + 1),
    })
    cursor.setMonth(month)
  }
  return result
})

const selection = ref<number[]>(selectionFromValue())

function selectionFromValue(): number[] {
  const value = props.modelValue
  if (props.type === 'range' && Array.isArray(value)) {
    return value.map((date) => dayStart(date))
  }
  if (value instanceof Date) return [dayStart(value)]
  return []
}

watch(
  () => props.modelValue,
  () => {
    selection.value = selectionFromValue()
  },
)

function toDate(timestamp: number): Date {
  return new Date(timestamp)
}

function selectionValue(): Date | [Date, Date] | null {
  if (props.type === 'range') {
    return selection.value.length === 2
      ? [toDate(selection.value[0]), toDate(selection.value[1])]
      : null
  }
  return selection.value.length === 1 ? toDate(selection.value[0]) : null
}

const confirmDisabled = computed(
  () =>
    props.readonly ||
    (props.type === 'range' ? selection.value.length !== 2 : selection.value.length !== 1),
)

function isDisabled(timestamp: number): boolean {
  return timestamp < minTimestamp.value || timestamp > maxTimestamp.value
}

function isStart(timestamp: number): boolean {
  return props.type === 'range' && selection.value[0] === timestamp
}

function isEnd(timestamp: number): boolean {
  return props.type === 'range' && selection.value.length === 2 && selection.value[1] === timestamp
}

function isMiddle(timestamp: number): boolean {
  return (
    props.type === 'range' &&
    selection.value.length === 2 &&
    timestamp > selection.value[0] &&
    timestamp < selection.value[1]
  )
}

function isSelected(timestamp: number): boolean {
  return props.type === 'single' && selection.value[0] === timestamp
}

function dayLabel(timestamp: number): string {
  if (props.type !== 'range') return ''
  if (isStart(timestamp) && isEnd(timestamp)) return t('calendar.startEnd')
  if (isStart(timestamp)) return t('calendar.start')
  if (isEnd(timestamp)) return t('calendar.end')
  return ''
}

function handleDayClick(timestamp: number) {
  if (props.readonly || isDisabled(timestamp)) return
  if (props.type === 'range') {
    const [start] = selection.value
    if (selection.value.length !== 1 || timestamp < start) {
      selection.value = [timestamp]
    } else {
      selection.value = [start, timestamp]
    }
  } else {
    selection.value = [timestamp]
  }
  const value = selectionValue()
  if (value) emit('select', value)
  if (!props.showConfirm && value) {
    emit('update:modelValue', value)
    emit('confirm', value)
    formItem?.onFieldChange()
  }
}

function handleConfirm() {
  const value = selectionValue()
  if (!value || confirmDisabled.value) return
  emit('update:modelValue', value)
  emit('confirm', value)
  formItem?.onFieldChange()
}
</script>

<template>
  <div class="mt-calendar" :class="{ 'is-readonly': readonly }">
    <div class="mt-calendar__header">
      <div class="mt-calendar__title">{{ title ?? t('calendar.title') }}</div>
      <div class="mt-calendar__weekdays">
        <span v-for="weekday in weekdays" :key="weekday" class="mt-calendar__weekday">
          {{ weekday }}
        </span>
      </div>
    </div>
    <div class="mt-calendar__body">
      <section v-for="month in months" :key="`${month.year}-${month.month}`" class="mt-calendar__month">
        <div class="mt-calendar__month-title">{{ month.title }}</div>
        <div class="mt-calendar__days">
          <span v-for="offset in month.offset" :key="`blank-${offset}`" class="mt-calendar__day-blank" />
          <button
            v-for="day in month.days"
            :key="day"
            type="button"
            class="mt-calendar__day"
            :class="{
              'is-selected': isSelected(new Date(month.year, month.month - 1, day).getTime()),
              'is-start': isStart(new Date(month.year, month.month - 1, day).getTime()),
              'is-end': isEnd(new Date(month.year, month.month - 1, day).getTime()),
              'is-middle': isMiddle(new Date(month.year, month.month - 1, day).getTime()),
            }"
            :disabled="readonly || isDisabled(new Date(month.year, month.month - 1, day).getTime())"
            @click="handleDayClick(new Date(month.year, month.month - 1, day).getTime())"
          >
            <span class="mt-calendar__day-number">{{ day }}</span>
            <span v-if="dayLabel(new Date(month.year, month.month - 1, day).getTime())" class="mt-calendar__day-label">
              {{ dayLabel(new Date(month.year, month.month - 1, day).getTime()) }}
            </span>
          </button>
        </div>
      </section>
    </div>
    <div v-if="showConfirm" class="mt-calendar__footer">
      <MtButton type="primary" block :disabled="confirmDisabled" @click="handleConfirm">
        {{ confirmText ?? t('calendar.confirm') }}
      </MtButton>
    </div>
  </div>
</template>

<style lang="scss">
.mt-calendar {
  display: flex;
  flex-direction: column;
  background-color: var(--mt-bg-color);

  &__header {
    flex-shrink: 0;
    border-bottom: 1px solid var(--mt-border-color);
  }

  &__title {
    padding: 16px;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-lg);
    font-weight: var(--mt-font-weight-bold);
    text-align: center;
  }

  &__weekdays {
    display: flex;
  }

  &__weekday {
    flex: 1;
    padding: 8px 0;
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-sm);
    text-align: center;
  }

  &__body {
    max-height: 380px;
    overflow-y: auto;
  }

  &__month-title {
    padding: 12px 0;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    font-weight: var(--mt-font-weight-bold);
    text-align: center;
  }

  &__days {
    display: flex;
    flex-wrap: wrap;
  }

  &__day,
  &__day-blank {
    width: calc(100% / 7);
  }

  &__day {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 56px;
    border: none;
    background: none;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    cursor: pointer;

    &:disabled {
      color: var(--mt-text-color-placeholder);
      cursor: not-allowed;
    }

    &.is-middle {
      background-color: rgba(64, 158, 255, 0.1);
      color: var(--mt-color-primary);
    }

    &.is-selected,
    &.is-start,
    &.is-end {
      background-color: var(--mt-color-primary);
      color: #fff;
      border-radius: var(--mt-radius-lg);
    }
  }

  &__day-label {
    font-size: var(--mt-font-size-sm);
    transform: scale(0.85);
  }

  &__footer {
    flex-shrink: 0;
    padding: 12px 16px;
  }
}
</style>
