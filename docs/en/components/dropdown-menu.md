# DropdownMenu

<script setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref('a')
const value3 = ref(0)

const option1 = [
  { text: 'All products', value: 0 },
  { text: 'New products', value: 1 },
  { text: 'On sale', value: 2 },
]
const option2 = [
  { text: 'Comprehensive', value: 'a' },
  { text: 'Sales', value: 'b' },
  { text: 'Price', value: 'c', disabled: true },
]
const option3 = [
  { text: 'Default', value: 0 },
  { text: 'In stock', value: 1 },
  { text: 'On sale', value: 2 },
]
</script>

A dropdown menu for filtering, composed of an `MtDropdownMenu` container and several `MtDropdownItem` items. Tapping a title expands its option list.

## Basic Usage

<PhonePreview>
  <MtDropdownMenu>
    <MtDropdownItem v-model="value1" :options="option1" />
    <MtDropdownItem v-model="value2" :options="option2" />
    <MtDropdownItem v-model="value3" title="Filter" :options="option3" />
  </MtDropdownMenu>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value1 = ref(0)
const option1 = [
  { text: 'All products', value: 0 },
  { text: 'New products', value: 1 },
  { text: 'On sale', value: 2 },
]
</script>

<template>
  <MtDropdownMenu>
    <MtDropdownItem v-model="value1" :options="option1" />
  </MtDropdownMenu>
</template>
```

Each `MtDropdownItem` binds the current value through `v-model`. After selection, the title shows the text of the selected option.

## Direction and Color

`direction` controls the expand direction, and `active-color` sets the highlight color of the active state:

<PhonePreview>
  <MtDropdownMenu direction="up" active-color="#f44">
    <MtDropdownItem v-model="value1" :options="option1" />
    <MtDropdownItem v-model="value2" :options="option2" />
  </MtDropdownMenu>
</PhonePreview>

```vue
<MtDropdownMenu direction="up" active-color="#f44">
  <MtDropdownItem v-model="value1" :options="option1" />
  <MtDropdownItem v-model="value2" :options="option2" />
</MtDropdownMenu>
```

## Interaction Notes

- Only one dropdown item is expanded at a time; tapping the expanded title collapses it
- Options with `disabled` do not respond to taps
- `close-on-click-overlay` controls whether tapping the mask collapses the dropdown
- `change` is emitted when the selection changes, with the selected `value` as the parameter

## API

### DropdownMenu Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| active-color | Highlight color of the active state | `string` | `var(--mt-color-primary)` |
| close-on-click-overlay | Whether tapping the mask collapses it | `boolean` | `true` |
| duration | Transition duration of the mask / dropdown (ms) | `number` | `300` |
| overlay | Whether the mask is shown | `boolean` | `true` |
| direction | Expand direction | `'down' \| 'up'` | `'down'` |
| z-index | Base z-index (the mask uses it, the dropdown is above it) | `number` | - |

### DropdownItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Current selected value | `number \| string` | - |
| title | Title shown when nothing is selected | `string` | - |
| options | Option list | `MtDropdownOption[]` | `[]` |
| disabled | Whether it is disabled | `boolean` | `false` |

### Option Structure

| Field | Description | Type |
| --- | --- | --- |
| text | Display text | `string` |
| value | Option value | `number \| string` |
| icon | Built-in icon name | `string` |
| disabled | Whether it is disabled | `boolean` |

### DropdownItem Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the selection changes | `(value: number \| string)` |
| open | Emitted when it expands | - |
| close | Emitted when it collapses | - |
| opened | Emitted when the expand transition ends | - |
| closed | Emitted when the collapse transition ends | - |