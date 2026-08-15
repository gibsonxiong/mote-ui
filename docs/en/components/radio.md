# Radio

<script setup>
import { reactive } from 'vue'

const radioDemo = reactive({
  value: 'male',
})
</script>

Selects a single value from a group of options.

## Basic Usage

<PhonePreview>
  <div style="padding: 16px">
    <MtRadioGroup v-model="radioDemo.value">
      <MtRadio value="male">Male</MtRadio>
      <MtRadio value="female">Female</MtRadio>
      <MtRadio value="secret" disabled>Prefer not to say</MtRadio>
    </MtRadioGroup>
  </div>
</PhonePreview>

```vue
<template>
  <MtRadioGroup v-model="gender">
    <MtRadio value="male">Male</MtRadio>
    <MtRadio value="female">Female</MtRadio>
  </MtRadioGroup>
</template>
```

## API

### Radio Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value | Option identifier (required) | `string \| number \| boolean` | - |
| disabled | Disables the radio | `boolean` | `false` |

### RadioGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `string \| number \| boolean` | - |
| disabled | Disables the whole group | `boolean` | `false` |

### RadioGroup Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the value changes | `(value)` |
