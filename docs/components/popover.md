# Popover 气泡弹出菜单

点击触发元素后弹出的浮层菜单，常用于收纳一组操作。面板通过 Teleport 挂载到 body，靠近视口边缘时会自动翻转方向并约束在视口内。

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const showBasic = ref(false)
const showIcon = ref(false)

const actions = [
  { text: '选项一' },
  { text: '选项二' },
  { text: '选项三' },
]

const iconActions = [
  { text: '收藏', icon: 'success' },
  { text: '转发', icon: 'arrow-right' },
  { text: '删除', icon: 'close', disabled: true },
]

function handleSelect(action) {
  showToast(action.text)
}
</script>

## 基础用法

`actions` 定义菜单项，点击选项后触发 `select` 并自动关闭：

<PhonePreview>
  <div style="display: flex; justify-content: center; padding: 40px 0">
    <MtPopover v-model="showBasic" :actions="actions" @select="handleSelect">
      <template #reference>
        <MtButton size="small">打开菜单</MtButton>
      </template>
    </MtPopover>
  </div>
</PhonePreview>

```vue
<script setup>
const show = ref(false)
const actions = [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]

function handleSelect(action) {
  showToast(action.text)
}
</script>

<template>
  <MtPopover v-model="show" :actions="actions" @select="handleSelect">
    <template #reference>
      <MtButton size="small">打开菜单</MtButton>
    </template>
  </MtPopover>
</template>
```

## 带图标与禁用

<PhonePreview>
  <div style="display: flex; justify-content: center; padding: 40px 0">
    <MtPopover v-model="showIcon" :actions="iconActions" @select="handleSelect">
      <template #reference>
        <MtButton size="small">更多操作</MtButton>
      </template>
    </MtPopover>
  </div>
</PhonePreview>

```vue
const actions = [
  { text: '收藏', icon: 'success' },
  { text: '转发', icon: 'arrow-right' },
  { text: '删除', icon: 'close', disabled: true },
]
```

## 弹出位置与对齐

`placement` 支持 `top` / `bottom`（默认）/ `left` / `right`，空间不足时自动翻转。`align` 控制交叉轴对齐（`start` / `center` / `end`）：

```vue
<!-- 靠右对齐：面板右边缘与触发元素右边缘对齐 -->
<MtPopover placement="bottom" align="end" :actions="actions" />

<!-- 靠左对齐 -->
<MtPopover placement="bottom" align="start" :actions="actions" />
```

## 多选保持打开

默认点击选项后关闭，设置 `:close-on-select="false"` 可保持打开（适合多选场景）：

```vue
<MtPopover v-model="show" :actions="actions" :close-on-select="false" @select="handleSelect" />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示浮层 | `boolean` | `false` |
| placement | 浮层弹出方向，空间不足自动翻转 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| align | 交叉轴对齐方式 | `'start' \| 'center' \| 'end'` | `'center'` |
| actions | 菜单选项 | `MtPopoverAction[]` | `[]` |
| offset | 面板与触发元素的间距（px） | `number` | `8` |
| close-on-select | 点击选项后是否关闭 | `boolean` | `true` |
| overlay | 是否显示页面遮罩层 | `boolean` | `false` |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean` | `true` |
| teleport | Teleport 目标 | `string` | `'body'` |
| z-index | 自定义层级，缺省时自动分配 | `number` | - |
| duration | 过渡动画时长（ms） | `number` | `200` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 浮层开始打开时触发（transition 前） | - |
| opened | 浮层打开完成时触发（transition 后） | - |
| close | 浮层开始关闭时触发（transition 前） | - |
| closed | 浮层关闭完成时触发（transition 后） | - |
| select | 点击菜单项时触发 | `(action: MtPopoverAction, index: number)` |
| click-overlay | 点击遮罩层时触发 | `(event: MouseEvent)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| reference | 触发元素 |
| default | 自定义浮层内容，优先于 `actions` |

### MtPopoverAction

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| text | 选项文案 | `string` |
| icon | 选项图标名称 | `MtIconName` |
| disabled | 是否禁用 | `boolean` |
