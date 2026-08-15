# Cascader

<script setup>
import { ref } from 'vue'

const areaValue = ref([])
const customValue = ref([])

const areas = [
  {
    label: 'Zhejiang',
    value: 'zj',
    children: [
      { label: 'Hangzhou', value: 'hz' },
      { label: 'Ningbo', value: 'nb' },
    ],
  },
  {
    label: 'Jiangsu',
    value: 'js',
    children: [
      { label: 'Nanjing', value: 'nj' },
      { label: 'Suzhou', value: 'sz', disabled: true },
    ],
  },
]

const categories = [
  {
    name: 'Electronics',
    code: 'digital',
    items: [
      { name: 'Phones', code: 'phone' },
      { name: 'Computers', code: 'computer' },
    ],
  },
]
</script>

Selects from multi-level related data using the level-tab pattern common on mobile. The bound value is the full path array from root to leaf, matching Element Plus Cascader.

## Basic Usage

<PhonePreview>
  <MtCascader v-model="areaValue" :options="areas" title="Choose area" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    label: 'Zhejiang',
    value: 'zj',
    children: [
      { label: 'Hangzhou', value: 'hz' },
      { label: 'Ningbo', value: 'nb' },
    ],
  },
]
<\/script>

<template>
  <MtCascader v-model="value" :options="options" title="Choose area" />
</template>
```

## Custom Field Names

Configure field name mapping via `props` (aligned with Element Plus's `props` option):

<PhonePreview>
  <MtCascader
    v-model="customValue"
    :options="categories"
    :props="{ value: 'code', label: 'name', children: 'items' }"
    title="Choose category"
  />
</PhonePreview>

```vue
<template>
  <MtCascader
    v-model="value"
    :options="categories"
    :props="{ value: 'code', label: 'name', children: 'items' }"
    title="Choose category"
  />
</template>
```

## Interaction Notes

- Selecting a branch option drills into the next level; selecting a leaf finishes and emits `update:modelValue` and `change`
- Top tabs show the selection at each level — tap any tab to go back and reselect
- The bound value is the full path array (e.g. `['zj', 'hz']`); assigning it externally restores the selection
- Options with `disabled` are not selectable

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Selected value: full path array from root to leaf | `Array<string \| number>` | `[]` |
| options | Cascading option data | `MtCascaderOption[]` | `[]` |
| props | Field name mapping (value / label / children / disabled) | `MtCascaderFieldNames` | - |
| title | Title above the tabs | `string` | - |
| placeholder | Placeholder text of the pending tab | `string` | Locale |
| disabled | Whether disabled | `boolean` | `false` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| change | Fired when a leaf is selected | `(value, selectedOptions)` |
