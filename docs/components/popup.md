# Popup 弹出层

<script setup>
import { ref } from 'vue'

const showCenter = ref(false)
const showBottom = ref(false)
const showRound = ref(false)
</script>

弹层基础件：负责 teleport 挂载、遮罩、进出场动画与背景滚动锁。Dialog、ActionSheet、Picker 弹层等均基于它实现。

## 基础用法

弹层内容 teleport 到 `body`，居中显示，带半透明遮罩：

<PhonePreview>
  <MtButton @click="showCenter = true">打开居中弹层</MtButton>
  <MtPopup v-model="showCenter" round>
    <div style="padding: 24px 32px">弹层内容</div>
  </MtPopup>
</PhonePreview>

```vue
<template>
  <MtButton @click="show = true">打开弹层</MtButton>
  <MtPopup v-model="show" round>
    <div style="padding: 24px 32px">弹层内容</div>
  </MtPopup>
</template>
```

## 弹出位置

`position` 支持 `center` / `top` / `bottom` / `left` / `right`，非居中位置使用滑入动画：

<PhonePreview>
  <MtButton @click="showBottom = true">底部弹出</MtButton>
  <MtPopup v-model="showBottom" position="bottom">
    <div style="padding: 24px; text-align: center">底部弹层内容</div>
  </MtPopup>
</PhonePreview>

```vue
<MtPopup v-model="show" position="bottom">...</MtPopup>
```

## 圆角

`round` 为朝向屏幕中心的一侧添加圆角：

<PhonePreview>
  <MtButton @click="showRound = true">圆角底部弹层</MtButton>
  <MtPopup v-model="showRound" position="bottom" round>
    <div style="padding: 24px; text-align: center">圆角弹层</div>
  </MtPopup>
</PhonePreview>

```vue
<MtPopup v-model="show" position="bottom" round>...</MtPopup>
```

## 交互说明

- 打开时锁定背景滚动（引用计数，多弹层叠加安全）
- 默认点击遮罩关闭，可用 `close-on-click-overlay` 关闭该行为
- `overlay` 设为 `false` 可隐藏遮罩

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 是否显示 | `boolean` | `false` |
| position | 弹出位置 | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` |
| overlay | 是否显示遮罩 | `boolean` | `true` |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean` | `true` |
| round | 朝向屏幕中心一侧是否圆角 | `boolean` | `false` |
| teleport | teleport 挂载目标 | `string` | `'body'` |
| z-index | 基础层级（弹层为其 +1） | `number` | `2000` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开动画开始前 | - |
| opened | 打开动画结束后 | - |
| close | 关闭动画开始前 | - |
| closed | 关闭动画结束后 | - |
| click-overlay | 点击遮罩 | `(event: MouseEvent)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 弹层内容 |
