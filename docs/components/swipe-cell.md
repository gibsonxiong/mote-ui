# SwipeCell 滑动单元格

<script setup>
import { ref } from 'vue'

const cellPosition = ref('none')
</script>

左右滑动单元格，露出两侧的操作按钮，常用于列表项的删除、收藏等快捷操作。

## 基础用法

通过 `left` / `right` 插槽放置两侧操作区，向对应方向滑动超过一半宽度即可展开：

<PhonePreview>
  <MtSwipeCell v-model="cellPosition">
    <template #left>
      <div style="display: flex; align-items: center; padding: 0 16px; height: 44px; color: #fff; background-color: var(--mt-color-primary)">置顶</div>
    </template>
    <div style="display: flex; align-items: center; height: 44px; padding: 0 16px">左滑删除，右滑置顶</div>
    <template #right>
      <div style="display: flex; align-items: center; padding: 0 16px; height: 44px; color: #fff; background-color: var(--mt-color-danger)">删除</div>
    </template>
  </MtSwipeCell>
</PhonePreview>

```vue
<template>
  <MtSwipeCell>
    <template #left>
      <div class="action action--primary">置顶</div>
    </template>
    <div class="content">左滑删除，右滑置顶</div>
    <template #right>
      <div class="action action--danger">删除</div>
    </template>
  </MtSwipeCell>
</template>
```

## 受控开合

`v-model` 绑定展开方向（`none` / `left` / `right`），也可通过 ref 调用 `open` / `close`：

```vue
<script setup>
import { ref } from 'vue'

const cellRef = ref()
const position = ref('none')

function openRight() {
  cellRef.value?.open('right')
}
<\/script>

<template>
  <MtSwipeCell ref="cellRef" v-model="position">
    <!-- ... -->
  </MtSwipeCell>
</template>
```

## 交互说明

- 拖动超过侧边宽度一半即展开该侧，否则回弹
- 展开状态下点击单元格外部自动收起
- `disabled` 时不响应拖动

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 展开方向 | `'none' \| 'left' \| 'right'` | `'none'` |
| disabled | 是否禁用拖动 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 展开时触发 | `(position: 'left' \| 'right')` |
| close | 收起时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 单元格内容 |
| left | 左侧操作区（右滑露出） |
| right | 右侧操作区（左滑露出） |

### Methods

| 名称 | 说明 |
| --- | --- |
| open(position) | 展开指定方向 |
| close() | 收起 |
