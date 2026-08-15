# DatetimePicker

<script setup>
import { ref } from 'vue'

const dateValue = ref(new Date())
const timeValue = ref('12:00')
const datetimeValue = ref(new Date())
const yearMonthValue = ref(new Date())

function filterMinutes(type, values) {
  if (type === 'minute') return values.filter((v) => v % 15 === 0)
  return values
}

function formatOption(type, value) {
  if (type === 'hour') return `${value} h`
  return `${value} min`
}
</script>

A date and time picker built on Picker — supports date, time, full datetime and year-month modes.

## Date

<PhonePreview>
  <MtDatetimePicker v-model="dateValue" type="date" title="Choose date" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value = ref(new Date())
<\/script>

<template>
  <MtDatetimePicker v-model="value" type="date" title="Choose date" />
</template>
```

## Time

The bound value of the `time` mode is an `'HH:mm'` string:

<PhonePreview>
  <MtDatetimePicker v-model="timeValue" type="time" title="Choose time" />
</PhonePreview>

```vue
<template>
  <MtDatetimePicker v-model="time" type="time" title="Choose time" />
</template>
```

## Full Datetime and Year-Month

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MtDatetimePicker v-model="datetimeValue" type="datetime" title="Choose datetime" />
    <MtDatetimePicker v-model="yearMonthValue" type="year-month" title="Choose month" />
  </div>
</PhonePreview>

```vue
<template>
  <MtDatetimePicker v-model="value" type="datetime" title="Choose datetime" />
  <MtDatetimePicker v-model="month" type="year-month" title="Choose month" />
</template>
```

## Range and Filtering

Use `min-date` / `max-date` to bound the date range and `min-hour` / `max-hour` etc. for the time range; `filter` prunes candidate values while `formatter` customizes the display text:

<PhonePreview>
  <MtDatetimePicker
    type="time"
    title="Opening hours"
    :min-hour="9"
    :max-hour="21"
    :filter="filterMinutes"
    :formatter="formatOption"
  />
</PhonePreview>

```vue
<script setup>
function filterMinutes(type, values) {
  if (type === 'minute') return values.filter((v) => v % 15 === 0)
  return values
}

function formatOption(type, value) {
  if (type === 'hour') return `${value} h`
  return `${value} min`
}
<\/script>

<template>
  <MtDatetimePicker
    type="time"
    title="Opening hours"
    :min-hour="9"
    :max-hour="21"
    :filter="filterMinutes"
    :formatter="formatOption"
  />
</template>
```

## Interaction Notes

- Bound value per mode: a `Date` for date types, an `'HH:mm'` string for `time`
- Switching year/month automatically converges to a valid day (e.g. Feb 30 snaps to month end)
- Confirming emits `update:modelValue` and `confirm` with the selected value

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Selected value; `Date` for date types, `'HH:mm'` for time | `Date \| string` | Current time |
| type | Picker mode | `'date' \| 'time' \| 'datetime' \| 'year-month'` | `'date'` |
| min-date | Minimum selectable date | `Date` | Jan 1, ten years ago |
| max-date | Maximum selectable date | `Date` | Dec 31, ten years ahead |
| min-hour | Minimum hour (time / datetime) | `number` | `0` |
| max-hour | Maximum hour (time / datetime) | `number` | `23` |
| min-minute | Minimum minute (time / datetime) | `number` | `0` |
| max-minute | Maximum minute (time / datetime) | `number` | `59` |
| title | Toolbar title | `string` | - |
| confirm-button-text | Confirm button text | `string` | Locale |
| cancel-button-text | Cancel button text | `string` | Locale |
| filter | Filters candidate values of a column | `(type, values) => number[]` | - |
| formatter | Formats the display text of an option | `(type, value) => string` | - |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| confirm | Fired on confirm | `(value: Date \| string)` |
| cancel | Fired on cancel | - |
| change | Fired when the selection scrolls | - |
