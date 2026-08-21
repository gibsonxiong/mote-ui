# Circle 环形进度条

<script setup>
import { ref } from 'vue'

const rate = ref(70)
</script>

以环形样式展示当前进度，支持动画过渡与自定义中心文本。

## 基础用法

`rate` 为目标进度（0-100），`v-model` 绑定动画过程中的实时进度：

<PhonePreview>
  <MtCircle v-model="rate" :rate="rate" :speed="40" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const rate = ref(70)
</script>

<template>
  <MtCircle v-model="rate" :rate="rate" :speed="40" />
</template>
```

## 自定义样式

`size` 设置直径、`stroke-width` 设置线条宽度、`color` 设置进度色、`layer-color` 设置轨道色：

<PhonePreview>
  <div style="display: flex; gap: 16px; align-items: center">
    <MtCircle :rate="100" :size="80" :stroke-width="10" color="var(--mt-color-success)" />
    <MtCircle :rate="60" :size="80" :stroke-width="6" color="var(--mt-color-warning)" />
  </div>
</PhonePreview>

```vue
<MtCircle :rate="100" :size="80" :stroke-width="10" color="var(--mt-color-success)" />
<MtCircle :rate="60" :size="80" :stroke-width="6" color="var(--mt-color-warning)" />
```

## 自定义文本

通过默认插槽自定义中心文本，或使用 `text` 属性：

<PhonePreview>
  <MtCircle :rate="80" text="良好" />
</PhonePreview>

```vue
<MtCircle :rate="80" text="良好" />
```

## 逆时针

`clockwise` 设为 `false` 时进度逆时针方向增长：

<PhonePreview>
  <MtCircle :rate="50" :clockwise="false" />
</PhonePreview>

```vue
<MtCircle :rate="50" :clockwise="false" />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前进度（0-100），动画过程中的实时值 | `number` | `0` |
| rate | 目标进度（0-100），环形动画的目标值 | `number` | `100` |
| speed | 动画速度（每秒百分比），0 表示无动画 | `number` | `0` |
| size | 直径（px） | `number` | `100` |
| stroke-width | 线条宽度 | `number` | `6` |
| color | 进度条颜色 | `string` | 主题色 |
| layer-color | 轨道背景色 | `string` | 页面背景色 |
| fill | 圆形填充色 | `string` | - |
| clockwise | 是否顺时针增长 | `boolean` | `true` |
| stroke-linecap | 进度条线帽形状 | `'butt' \| 'round' \| 'square'` | `'round'` |
| text | 中心文本，默认显示百分比 | `string` | 百分比 |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 动画过程中实时进度变化 | `(value: number)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义中心内容 |