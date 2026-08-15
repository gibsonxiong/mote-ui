# Stepper

<script setup>
import { reactive } from 'vue'

const stepperDemo = reactive({
  basic: 1,
  step: 1,
  limit: 5,
  decimal: 1,
  disabled: 3,
})
</script>

Increases or decreases a quantity within a range — commonly used for picking item quantities.

## Basic Usage

<PhonePreview>
  <div style="padding: 16px">
    <MtStepper v-model="stepperDemo.basic" />
  </div>
</PhonePreview>

```vue
<template>
  <MtStepper v-model="count" />
</template>
```

## Step and Range

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtStepper v-model="stepperDemo.step" :step="2" />
    <MtStepper v-model="stepperDemo.limit" :min="2" :max="8" />
  </div>
</PhonePreview>

```vue
<template>
  <MtStepper v-model="count" :step="2" />
  <MtStepper v-model="count" :min="2" :max="8" />
</template>
```

## Decimals and Disabled

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtStepper v-model="stepperDemo.decimal" :step="0.5" :precision="1" />
    <MtStepper v-model="stepperDemo.disabled" disabled />
  </div>
</PhonePreview>

```vue
<template>
  <!-- Set precision together with a decimal step, or the fraction is dropped -->
  <MtStepper v-model="weight" :step="0.5" :precision="1" />
  <MtStepper v-model="count" disabled />
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `number` | `1` |
| min | Minimum value | `number` | `1` |
| max | Maximum value | `number` | `Infinity` |
| step | Step size | `number` | `1` |
| precision | Number of decimal places | `number` | `0` |
| disabled | Disables the stepper | `boolean` | `false` |
| disable-input | Disables the middle input, buttons stay usable | `boolean` | `false` |
| size | Size | `'small' \| 'normal' \| 'large'` | `'normal'` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the value changes | `(value: number)` |
| focus | Emitted when the input is focused | `(event: FocusEvent)` |
| blur | Emitted when the input is blurred | `(event: FocusEvent)` |
