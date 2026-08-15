# Switch

<script setup>
import { reactive } from 'vue'

const switchDemo = reactive({
  basic: true,
  custom: 'on',
  disabled: true,
  loading: true,
  small: true,
  large: true,
})
</script>

Toggles between on and off states — commonly used in settings forms.

## Basic Usage

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.basic" />
    <MtSwitch v-model="switchDemo.custom" active-value="on" inactive-value="off" />
  </div>
</PhonePreview>

```vue
<template>
  <MtSwitch v-model="checked" />
  <!-- Custom switch values -->
  <MtSwitch v-model="state" active-value="on" inactive-value="off" />
</template>
```

## Sizes

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.small" size="small" />
    <MtSwitch v-model="switchDemo.basic" />
    <MtSwitch v-model="switchDemo.large" size="large" />
  </div>
</PhonePreview>

## Disabled and Loading

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.disabled" disabled />
    <MtSwitch v-model="switchDemo.loading" loading />
  </div>
</PhonePreview>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `boolean \| string \| number` | `false` |
| active-value | Value when on | `boolean \| string \| number` | `true` |
| inactive-value | Value when off | `boolean \| string \| number` | `false` |
| size | Size | `'small' \| 'normal' \| 'large'` | `'normal'` |
| disabled | Disables the switch | `boolean` | `false` |
| loading | Loading state (cannot be toggled) | `boolean` | `false` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the value changes | `(value)` |
