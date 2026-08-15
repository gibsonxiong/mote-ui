# Popover 气泡弹出菜单

点击触发元素后弹出的浮层菜单，常用于收纳一组操作。

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

## 弹出位置

`placement` 支持 `top` / `bottom`（默认）/ `left` / `right`：

```vue
<MtPopover placement="top" :actions="actions" />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示浮层 | `boolean` | `false` |
| placement | 浮层弹出方向 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| actions | 菜单选项 | `MtPopoverAction[]` | `[]` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 浮层打开时触发 | - |
| close | 浮层关闭时触发 | - |
| select | 点击菜单项时触发 | `(action: MtPopoverAction, index: number)` |

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
