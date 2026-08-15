# Rate 评分

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

用于对事物进行评级操作，常用于评价类表单。

## 基础用法

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

## 半星与自定义数量

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

## 只读与禁用

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtRate v-model="rateDemo.readonly" readonly />
    <MtRate v-model="rateDemo.disabled" disabled />
  </div>
</PhonePreview>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `number` | `0` |
| max | 最大分值（星星数量） | `number` | `5` |
| allow-half | 允许选择半星 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'normal' \| 'large'` | `'normal'` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 分值变化时触发 | `(value: number)` |
