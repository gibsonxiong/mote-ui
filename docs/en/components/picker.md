# Picker

<script setup>
import { reactive } from 'vue'

const pickerDemo = reactive({
  city: 'hz',
  cities: [
    { text: 'Hangzhou', value: 'hz' },
    { text: 'Ningbo', value: 'nb' },
    { text: 'Wenzhou', value: 'wz' },
    { text: 'Shaoxing', value: 'sx' },
    { text: 'Jiaxing', value: 'jx' },
  ],
  area: ['zj', 'hz'],
  areas: [
    {
      text: 'Zhejiang',
      value: 'zj',
      children: [
        { text: 'Hangzhou', value: 'hz' },
        { text: 'Ningbo', value: 'nb' },
      ],
    },
    {
      text: 'Jiangsu',
      value: 'js',
      children: [
        { text: 'Nanjing', value: 'nj' },
        { text: 'Suzhou', value: 'sz' },
      ],
    },
  ],
})
</script>

A wheel-style picker supporting single column, multi-column and cascading data. Usually used together with a bottom popup (see Popup).

## Single Column

<PhonePreview>
  <MtPicker v-model="pickerDemo.city" :columns="pickerDemo.cities" title="Choose a city" />
</PhonePreview>

```vue
<template>
  <MtPicker v-model="city" :columns="cities" title="Choose a city" />
</template>
```

## Cascading

Options with `children` are automatically treated as a cascade structure; changing a parent column resets the columns below it:

<PhonePreview>
  <MtPicker v-model="pickerDemo.area" :columns="pickerDemo.areas" title="Choose a region" />
</PhonePreview>

```vue
<script setup>
const areas = [
  {
    text: 'Zhejiang',
    value: 'zj',
    children: [
      { text: 'Hangzhou', value: 'hz' },
      { text: 'Ningbo', value: 'nb' },
    ],
  },
]
<\/script>

<template>
  <MtPicker v-model="area" :columns="areas" title="Choose a region" />
</template>
```

## Interaction Notes

- The wheel supports finger dragging (with inertia) and mouse dragging
- Tapping any option snaps to it directly
- Tapping "Confirm" commits the current selection (emits `update:modelValue` and `confirm`)
- Bound value: a single value for one column, an array of values for multi-column / cascade
- Confirm / Cancel button texts follow the locale (see [Internationalization](/en/guide/i18n))

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Selected value; array for multiple columns | `string \| number \| Array` | - |
| columns | Column data: flat, cascading or multi-column | `MtPickerColumns` | `[]` |
| title | Title | `string` | - |
| confirm-button-text | Confirm button text | `string` | locale |
| cancel-button-text | Cancel button text | `string` | locale |
| option-height | Option row height (375px design base) | `number` | `44` |
| visible-option-num | Number of visible rows | `number` | `6` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| confirm | Emitted on confirm | `(value, options)` |
| cancel | Emitted on cancel | - |
| change | Emitted when scrolling switches an option | `(columnIndex, index)` |

### Methods

| Method | Description |
| --- | --- |
| getSelectedOptions | Returns the currently selected option objects |
| getSelectedValues | Returns the currently selected values |
