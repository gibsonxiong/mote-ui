# Switch 开关

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

用于在打开和关闭状态之间切换，常用于设置类表单。

## 基础用法

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.basic" />
    <MtSwitch v-model="switchDemo.custom" active-value="on" inactive-value="off" />
  </div>
</PhonePreview>

```vue
<template>
  <MtSwitch v-model="checked" />
  <!-- 自定义开关值 -->
  <MtSwitch v-model="state" active-value="on" inactive-value="off" />
</template>
```

## 尺寸

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.small" size="small" />
    <MtSwitch v-model="switchDemo.basic" />
    <MtSwitch v-model="switchDemo.large" size="large" />
  </div>
</PhonePreview>

## 禁用与加载中

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.disabled" disabled />
    <MtSwitch v-model="switchDemo.loading" loading />
  </div>
</PhonePreview>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `boolean \| string \| number` | `false` |
| active-value | 打开时的值 | `boolean \| string \| number` | `true` |
| inactive-value | 关闭时的值 | `boolean \| string \| number` | `false` |
| size | 尺寸 | `'small' \| 'normal' \| 'large'` | `'normal'` |
| disabled | 禁用 | `boolean` | `false` |
| loading | 加载中（不可切换） | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发 | `(value)` |
