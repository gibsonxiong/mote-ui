# Slider

<script setup>
import { reactive } from 'vue'

const sliderDemo = reactive({
  basic: 40,
  step: 30,
  range: 60,
  disabled: 20,
})
</script>

Selects a value within a range by dragging — supports touch dragging and keyboard arrow keys.

## Basic Usage

<PhonePreview>
  <div style="padding: 16px">
    <MtSlider v-model="sliderDemo.basic" />
  </div>
</PhonePreview>

```vue
<template>
  <MtSlider v-model="value" />
</template>
```

## Step and Range

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 20px; padding: 16px">
    <MtSlider v-model="sliderDemo.step" :step="10" />
    <MtSlider v-model="sliderDemo.range" :min="50" :max="100" />
  </div>
</PhonePreview>

```vue
<template>
  <MtSlider v-model="value" :step="10" />
  <MtSlider v-model="value" :min="50" :max="100" />
</template>
```

## Disabled and Hidden Tooltip

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 20px; padding: 16px">
    <MtSlider v-model="sliderDemo.disabled" disabled />
    <MtSlider v-model="sliderDemo.basic" :show-tooltip="false" />
  </div>
</PhonePreview>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `number` | `0` |
| min | Minimum value | `number` | `0` |
| max | Maximum value | `number` | `100` |
| step | Step size | `number` | `1` |
| disabled | Disables the slider | `boolean` | `false` |
| show-tooltip | Shows the value bubble while dragging | `boolean` | `true` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted after dragging ends or keyboard interaction | `(value: number)` |
