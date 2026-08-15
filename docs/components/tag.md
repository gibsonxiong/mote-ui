# Tag 标签

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const tags = ref(['标签一', '标签二', '标签三'])

function handleClose(index) {
  tags.value.splice(index, 1)
}
</script>

用于标记与分类的小标签，API 对齐 Element Plus。

## 基础用法

`type` 指定颜色，`effect` 指定风格（`light` / `dark` / `plain`）：

<PhonePreview>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <MtTag>primary</MtTag>
    <MtTag type="success">success</MtTag>
    <MtTag type="warning">warning</MtTag>
    <MtTag type="danger">danger</MtTag>
    <MtTag type="info">info</MtTag>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px">
    <MtTag effect="dark">dark</MtTag>
    <MtTag effect="plain">plain</MtTag>
  </div>
</PhonePreview>

```vue
<MtTag type="success">success</MtTag>
<MtTag effect="dark">dark</MtTag>
<MtTag effect="plain">plain</MtTag>
```

## 尺寸与圆角

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 8px">
    <MtTag size="small">小号</MtTag>
    <MtTag>默认</MtTag>
    <MtTag size="large">大号</MtTag>
    <MtTag round>圆角</MtTag>
  </div>
</PhonePreview>

```vue
<MtTag size="small">小号</MtTag>
<MtTag size="large">大号</MtTag>
<MtTag round>圆角</MtTag>
```

## 可关闭

`closable` 显示关闭图标，监听 `close` 事件移除标签：

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtTag v-for="(tag, index) in tags" :key="tag" closable @close="handleClose(index)">
      {{ tag }}
    </MtTag>
  </div>
</PhonePreview>

```vue
<script setup>
const tags = ref(['标签一', '标签二', '标签三'])

function handleClose(index) {
  tags.value.splice(index, 1)
}
</script>

<template>
  <MtTag v-for="(tag, index) in tags" :key="tag" closable @close="handleClose(index)">
    {{ tag }}
  </MtTag>
</template>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 颜色类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| effect | 风格 | `'light' \| 'dark' \| 'plain'` | `'light'` |
| closable | 是否可关闭 | `boolean` | `false` |
| round | 是否圆角 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| close | 点击关闭图标 | `(event: MouseEvent)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 标签内容 |
