# Popup 弹出层

<script setup>
import { ref } from 'vue'

const showCenter = ref(false)
const showBottom = ref(false)
const showTop = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
const showRound = ref(false)
const showCenterRound = ref(false)
const showNoOverlay = ref(false)
const showNoClose = ref(false)
const showEvent = ref(false)
const lastEvent = ref('')
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
  <div style="display: flex; gap: 8px">
    <MtButton size="small" @click="showTop = true">顶部</MtButton>
    <MtButton size="small" @click="showBottom = true">底部</MtButton>
    <MtButton size="small" @click="showLeft = true">左侧</MtButton>
    <MtButton size="small" @click="showRight = true">右侧</MtButton>
  </div>
  <MtPopup v-model="showTop" position="top">
    <div style="padding: 24px; text-align: center">顶部弹层</div>
  </MtPopup>
  <MtPopup v-model="showBottom" position="bottom">
    <div style="padding: 24px; text-align: center">底部弹层</div>
  </MtPopup>
  <MtPopup v-model="showLeft" position="left">
    <div style="padding: 24px; text-align: center">左侧弹层</div>
  </MtPopup>
  <MtPopup v-model="showRight" position="right">
    <div style="padding: 24px; text-align: center">右侧弹层</div>
  </MtPopup>
</PhonePreview>

```vue
<MtPopup v-model="show" position="top">顶部弹层</MtPopup>
<MtPopup v-model="show" position="bottom">底部弹层</MtPopup>
<MtPopup v-model="show" position="left">左侧弹层</MtPopup>
<MtPopup v-model="show" position="right">右侧弹层</MtPopup>
```

## 圆角

`round` 为朝向屏幕中心的一侧添加圆角：

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtButton size="small" @click="showRound = true">底部圆角</MtButton>
    <MtButton size="small" @click="showCenterRound = true">居中圆角</MtButton>
  </div>
  <MtPopup v-model="showRound" position="bottom" round>
    <div style="padding: 24px; text-align: center">底部圆角弹层</div>
  </MtPopup>
  <MtPopup v-model="showCenterRound" round>
    <div style="padding: 24px 32px; text-align: center">居中圆角弹层</div>
  </MtPopup>
</PhonePreview>

```vue
<MtPopup v-model="show" position="bottom" round>底部圆角弹层</MtPopup>
<MtPopup v-model="show" round>居中圆角弹层</MtPopup>
```

## 遮罩控制

`overlay="false"` 隐藏遮罩；`close-on-click-overlay="false"` 禁止点击遮罩关闭：

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtButton size="small" @click="showNoOverlay = true">无遮罩</MtButton>
    <MtButton size="small" @click="showNoClose = true">遮罩不关闭</MtButton>
  </div>
  <MtPopup v-model="showNoOverlay" position="bottom" :overlay="false">
    <div style="padding: 24px; text-align: center">无遮罩弹层</div>
  </MtPopup>
  <MtPopup v-model="showNoClose" position="bottom" :close-on-click-overlay="false" round>
    <div style="padding: 24px; text-align: center">点击遮罩不关闭</div>
    <MtButton block @click="showNoClose = false">关闭</MtButton>
  </MtPopup>
</PhonePreview>

```vue
<MtPopup v-model="show" position="bottom" :overlay="false">无遮罩弹层</MtPopup>
<MtPopup v-model="show" position="bottom" :close-on-click-overlay="false" round>
  点击遮罩不关闭
  <MtButton block @click="show = false">关闭</MtButton>
</MtPopup>
```

## 生命周期事件

`open` / `opened` / `close` / `closed` 对应动画前后，`click-overlay` 点击遮罩时触发：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtButton @click="showEvent = true">打开弹层</MtButton>
    <div style="font-size: 12px; color: var(--mt-text-color-secondary)">{{ lastEvent || '点击遮罩或按钮关闭，观察事件' }}</div>
    <MtPopup
      v-model="showEvent"
      @open="lastEvent = 'open'"
      @opened="lastEvent = 'opened'"
      @close="lastEvent = 'close'"
      @closed="lastEvent = 'closed'"
      @click-overlay="lastEvent = 'click-overlay'"
    >
      <div style="padding: 24px 32px">弹层内容</div>
    </MtPopup>
  </div>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const show = ref(false)
const lastEvent = ref('')
<\/script>

<template>
  <MtPopup
    v-model="show"
    @open="lastEvent = 'open'"
    @opened="lastEvent = 'opened'"
    @close="lastEvent = 'close'"
    @closed="lastEvent = 'closed'"
    @click-overlay="lastEvent = 'click-overlay'"
  >
    <div style="padding: 24px 32px">弹层内容</div>
  </MtPopup>
</template>
```

## 交互说明

- 打开时锁定背景滚动（引用计数，多弹层叠加安全）
- 默认点击遮罩关闭，可用 `close-on-click-overlay` 关闭该行为
- `overlay` 设为 `false` 可隐藏遮罩
- 未显式指定 `z-index` 时自动递增，后打开的弹层始终在上层

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
| z-index | 基础层级（弹层为其 +1） | `number` | 自动递增 |

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
