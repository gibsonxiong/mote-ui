# Dialog 对话框

<script setup>
import { ref } from 'vue'
import { confirmDialog, alertDialog } from 'mote-ui'

const show = ref(false)
const result = ref('')

async function handleConfirm() {
  try {
    await confirmDialog({ title: '确认删除', message: '删除后不可恢复，确定继续吗？' })
    result.value = '已确认'
  } catch {
    result.value = '已取消'
  }
}
</script>

模态对话框，支持组件式与函数式两种用法。

## 组件式用法

<PhonePreview>
  <MtButton @click="show = true">打开对话框</MtButton>
  <MtDialog v-model="show" title="提示" message="确定要执行该操作吗？" />
</PhonePreview>

```vue
<template>
  <MtButton @click="show = true">打开对话框</MtButton>
  <MtDialog v-model="show" title="提示" message="确定要执行该操作吗？" @confirm="onConfirm" />
</template>
```

默认插槽可自定义内容：

```vue
<MtDialog v-model="show" title="自定义内容">
  <p>这里可以放任意内容</p>
</MtDialog>
```

## 函数式调用

`confirmDialog` 返回 Promise：确认时 resolve，取消时 reject；`alertDialog` 只有确认按钮，始终 resolve。

<PhonePreview>
  <MtButton @click="handleConfirm">confirmDialog</MtButton>
  <div style="margin-top: 12px; color: var(--mt-text-color-secondary)">结果：{{ result || '-' }}</div>
</PhonePreview>

```js
import { confirmDialog, alertDialog } from 'mote-ui'

try {
  await confirmDialog({ title: '确认删除', message: '删除后不可恢复' })
  // 用户点击了确认
} catch {
  // 用户点击了取消
}

await alertDialog('操作已完成')
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | - |
| message | 内容文案 | `string` | - |
| message-align | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |
| confirm-button-text | 确认按钮文案 | `string` | 语言包 |
| cancel-button-text | 取消按钮文案 | `string` | 语言包 |
| show-cancel-button | 是否显示取消按钮 | `boolean` | `true` |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean` | `false` |
| width | 宽度（375 设计稿 px） | `number \| string` | `280` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击确认 | - |
| cancel | 点击取消 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容（优先于 message） |
| title | 自定义标题 |

### 函数式 Options

`confirmDialog(options | string)` / `alertDialog(options | string)`，支持 `title`、`message`、`confirmButtonText`、`cancelButtonText`、`showCancelButton`。
