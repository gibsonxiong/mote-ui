# Slider 滑块

<script setup>
import { reactive } from 'vue'

const sliderDemo = reactive({
  basic: 40,
  step: 30,
  range: 60,
  disabled: 20,
})
</script>

用于在给定区间内滑动选择数值，支持触摸拖动与键盘方向键。

## 基础用法

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

## 步长与范围

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

## 禁用与隐藏气泡

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 20px; padding: 16px">
    <MtSlider v-model="sliderDemo.disabled" disabled />
    <MtSlider v-model="sliderDemo.basic" :show-tooltip="false" />
  </div>
</PhonePreview>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `number` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| disabled | 禁用 | `boolean` | `false` |
| show-tooltip | 拖动时显示数值气泡 | `boolean` | `true` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 拖动结束或键盘操作后触发 | `(value: number)` |
