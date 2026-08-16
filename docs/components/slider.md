# Slider 滑块

<script setup>
import { reactive, ref } from 'vue'

const sliderDemo = reactive({
  basic: 40,
  step: 30,
  range: 60,
  disabled: 20,
})

const sliderEvent = ref(40)
</script>

用于在给定区间内滑动选择数值，支持触摸拖动与键盘方向键。

## 基础用法

<PhonePreview>
  <div style="padding: 16px">
    <MtSlider v-model="sliderDemo.basic" />
  </div>
</PhonePreview>

```vue
<MtSlider v-model="value" />
```

## 步长与范围

`step` 步长，`min` / `max` 自定义区间：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 20px; padding: 16px">
    <MtSlider v-model="sliderDemo.step" :step="10" />
    <MtSlider v-model="sliderDemo.range" :min="50" :max="100" />
  </div>
</PhonePreview>

```vue
<MtSlider v-model="value" :step="10" />
<MtSlider v-model="value" :min="50" :max="100" />
```

## 禁用与隐藏气泡

`disabled` 禁用，`show-tooltip="false"` 拖动时不显示数值气泡：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 20px; padding: 16px">
    <MtSlider v-model="sliderDemo.disabled" disabled />
    <MtSlider v-model="sliderDemo.basic" :show-tooltip="false" />
  </div>
</PhonePreview>

```vue
<MtSlider v-model="value" disabled />
<MtSlider v-model="value" :show-tooltip="false" />
```

## 滑动事件

拖动结束或键盘操作后触发 `change`：

<PhonePreview>
  <div style="padding: 16px">
    <MtSlider v-model="sliderEvent" @change="(value) => sliderEvent = value" />
    <div style="margin-top: 8px; font-size: 12px; color: var(--mt-text-color-secondary)">当前值：{{ sliderEvent }}</div>
  </div>
</PhonePreview>

```vue
<MtSlider v-model="value" @change="onChange" />
```

## 交互说明

- 支持触摸拖动与键盘方向键
- `change` 在拖动结束或键盘操作后触发
- 在 `MtFormItem` 内会自动触发对应表单校验

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
