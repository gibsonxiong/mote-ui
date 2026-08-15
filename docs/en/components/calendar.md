# Calendar

<script setup>
import { ref } from 'vue'

const singleValue = ref(null)
const rangeValue = ref(null)

const minDate = new Date(2026, 0, 1)
const maxDate = new Date(2026, 3, 30)
</script>

Selects a single date or a date range, rendered as vertically scrolling month sections.

## Single Date

Tap a date, then confirm with the bottom button:

<PhonePreview>
  <MtCalendar v-model="singleValue" :min-date="minDate" :max-date="maxDate" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value = ref(null)
<\/script>

<template>
  <MtCalendar v-model="value" />
</template>
```

## Date Range

With `type="range"` the bound value is a `[start, end]` tuple picked across two taps:

<PhonePreview>
  <MtCalendar v-model="rangeValue" type="range" :min-date="minDate" :max-date="maxDate" />
</PhonePreview>

```vue
<template>
  <MtCalendar v-model="value" type="range" />
</template>
```

## Without Confirm Button

Set `show-confirm` to `false` to hide the footer and commit on selection:

<PhonePreview>
  <MtCalendar :min-date="minDate" :max-date="maxDate" :show-confirm="false" />
</PhonePreview>

```vue
<template>
  <MtCalendar v-model="value" :show-confirm="false" />
</template>
```

## Interaction Notes

- Single mode binds a `Date`; range mode binds a `[Date, Date]` tuple
- In range mode, tapping a day before the start restarts the selection
- Days outside `min-date` / `max-date` are disabled
- Confirming emits `update:modelValue` and `confirm`; without the confirm button both fire on selection

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Selected value; `Date` for single, `[Date, Date]` for range | `Date \| [Date, Date] \| null` | `null` |
| type | Selection mode | `'single' \| 'range'` | `'single'` |
| min-date | First selectable date | `Date` | Today |
| max-date | Last selectable date | `Date` | Six months ahead |
| title | Header title | `string` | Locale |
| confirm-text | Confirm button text | `string` | Locale |
| show-confirm | Whether to show the confirm button | `boolean` | `true` |
| readonly | Display only, selection disabled | `boolean` | `false` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| select | Fired when a selection is completed (range complete in range mode) | `(value)` |
| confirm | Fired when confirming | `(value)` |
