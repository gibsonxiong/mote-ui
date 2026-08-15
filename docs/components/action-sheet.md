# ActionSheet 动作面板

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const show = ref(false)
const showAdvanced = ref(false)

const actions = [
  { name: '复制' },
  { name: '转发' },
  { name: '删除', color: 'var(--mt-color-danger)' },
]

const advancedActions = [
  { name: '保存草稿', subname: '仅自己可见' },
  { name: '发布', subname: '所有关注者可见' },
  { name: '归档', disabled: true },
]

function onSelect(action) {
  showToast(`选择了：${action.name}`)
}
</script>

底部弹出的动作面板，用于提供一组与当前场景相关的操作。

## 基础用法

<PhonePreview>
  <MtButton @click="show = true">打开动作面板</MtButton>
  <MtActionSheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
</PhonePreview>

```vue
<script setup>
const show = ref(false)
const actions = [
  { name: '复制' },
  { name: '转发' },
  { name: '删除', color: 'var(--mt-color-danger)' },
]
</script>

<template>
  <MtActionSheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
</template>
```

## 标题、描述与状态

<PhonePreview>
  <MtButton @click="showAdvanced = true">带标题与状态</MtButton>
  <MtActionSheet
    v-model="showAdvanced"
    title="发布内容"
    description="选择发布方式"
    :actions="advancedActions"
    cancel-text="取消"
  />
</PhonePreview>

```vue
<MtActionSheet
  v-model="show"
  title="发布内容"
  description="选择发布方式"
  :actions="[
    { name: '保存草稿', subname: '仅自己可见' },
    { name: '归档', disabled: true },
    { name: '提交中', loading: true },
  ]"
  cancel-text="取消"
/>
```

## 交互说明

- 点击选项触发 `select`，默认随后自动关闭（`close-on-click-action` 可关闭该行为，便于 loading 态处理）
- `disabled` / `loading` 状态的选项不响应点击

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 是否显示 | `boolean` | `false` |
| actions | 选项列表 | `MtActionSheetAction[]` | `[]` |
| title | 标题 | `string` | - |
| description | 标题下的描述 | `string` | - |
| cancel-text | 取消按钮文案，设置后显示取消按钮 | `string` | - |
| close-on-click-action | 点击选项后是否自动关闭 | `boolean` | `true` |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean` | `true` |
| round | 是否圆角 | `boolean` | `true` |

### Action 数据结构

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| name | 按钮文字 | `string` |
| subname | 次级描述 | `string` |
| color | 自定义文字颜色 | `string` |
| disabled | 是否禁用 | `boolean` |
| loading | 是否加载中 | `boolean` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| select | 点击选项 | `(action, index)` |
| cancel | 点击取消 | - |
