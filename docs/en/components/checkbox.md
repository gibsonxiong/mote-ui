# Checkbox

<script setup>
import { reactive } from 'vue'

const checkboxDemo = reactive({
  single: true,
  group: ['apple'],
})
</script>

Selects multiple options from a group; can also be used alone as a boolean toggle.

## Basic Usage

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckbox v-model="checkboxDemo.single">I agree to the terms of service</MtCheckbox>
  </div>
</PhonePreview>

```vue
<template>
  <MtCheckbox v-model="checked">I agree to the terms of service</MtCheckbox>
</template>
```

## Checkbox Group

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckboxGroup v-model="checkboxDemo.group">
      <MtCheckbox value="apple">Apple</MtCheckbox>
      <MtCheckbox value="banana">Banana</MtCheckbox>
      <MtCheckbox value="orange">Orange</MtCheckbox>
    </MtCheckboxGroup>
  </div>
</PhonePreview>

```vue
<template>
  <MtCheckboxGroup v-model="fruits">
    <MtCheckbox value="apple">Apple</MtCheckbox>
    <MtCheckbox value="banana">Banana</MtCheckbox>
  </MtCheckboxGroup>
</template>
```

## Indeterminate State

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckbox indeterminate>Select all</MtCheckbox>
  </div>
</PhonePreview>

## API

### Checkbox Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value when used alone | `boolean` | `false` |
| value | Identifier value inside a checkbox group | `string \| number \| boolean` | - |
| disabled | Disables the checkbox | `boolean` | `false` |
| indeterminate | Indeterminate state (visual only) | `boolean` | `false` |

### Checkbox Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the value changes (standalone usage) | `(checked: boolean)` |

### CheckboxGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Array of checked values | `Array<string \| number \| boolean>` | `[]` |
| disabled | Disables the whole group | `boolean` | `false` |

### CheckboxGroup Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the values change | `(values)` |
