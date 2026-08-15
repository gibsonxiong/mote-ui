# Stepper 步进器

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

用于在一定范围内增加、减少数量，常用于商品数量选择。

## 基础用法

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

## 步长与范围

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

## 小数与禁用

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtStepper v-model="stepperDemo.decimal" :step="0.5" :precision="1" />
    <MtStepper v-model="stepperDemo.disabled" disabled />
  </div>
</PhonePreview>

```vue
<template>
  <!-- step 为小数时请同时设置 precision，否则小数会被舍去 -->
  <MtStepper v-model="weight" :step="0.5" :precision="1" />
  <MtStepper v-model="count" disabled />
</template>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `number` | `1` |
| min | 最小值 | `number` | `1` |
| max | 最大值 | `number` | `Infinity` |
| step | 步长 | `number` | `1` |
| precision | 小数位数 | `number` | `0` |
| disabled | 禁用 | `boolean` | `false` |
| disable-input | 禁用中间输入框（按钮仍可用） | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'normal' \| 'large'` | `'normal'` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发 | `(value: number)` |
| focus | 输入框聚焦时触发 | `(event: FocusEvent)` |
| blur | 输入框失焦时触发 | `(event: FocusEvent)` |
