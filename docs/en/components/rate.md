# Rate

<script setup>
import { reactive } from 'vue'

const rateDemo = reactive({
  basic: 3,
  half: 2.5,
  max: 3,
  readonly: 4,
  disabled: 2,
})
</script>

Rates something on a star scale — commonly used in review forms.

## Basic Usage

<PhonePreview>
  <div style="padding: 16px">
    <MtRate v-model="rateDemo.basic" />
  </div>
</PhonePreview>

```vue
<template>
  <MtRate v-model="score" />
</template>
```

## Half Stars and Custom Count

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtRate v-model="rateDemo.half" allow-half />
    <MtRate v-model="rateDemo.max" :max="8" />
  </div>
</PhonePreview>

```vue
<template>
  <MtRate v-model="score" allow-half />
  <MtRate v-model="score" :max="8" />
</template>
```

## Read-only and Disabled

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtRate v-model="rateDemo.readonly" readonly />
    <MtRate v-model="rateDemo.disabled" disabled />
  </div>
</PhonePreview>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `number` | `0` |
| max | Maximum score (star count) | `number` | `5` |
| allow-half | Allows selecting half stars | `boolean` | `false` |
| disabled | Disables interaction | `boolean` | `false` |
| readonly | Read only | `boolean` | `false` |
| size | Size | `'small' \| 'normal' \| 'large'` | `'normal'` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the score changes | `(value: number)` |
