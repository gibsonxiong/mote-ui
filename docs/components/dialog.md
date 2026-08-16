# Dialog 对话框

<script setup>
import { ref } from 'vue'
import { confirmDialog, alertDialog } from 'mote-ui'

const show = ref(false)
const showCustom = ref(false)
const showNoCancel = ref(false)
const showCustomText = ref(false)
const showAlign = ref(false)
const showWide = ref(false)
const showEvent = ref(false)
const lastAction = ref('')
const result = ref('')

async function handleConfirm() {
  try {
    await confirmDialog({ title: '确认删除', message: '删除后不可恢复，确定继续吗？' })
    result.value = '已确认'
  } catch {
    result.value = '已取消'
  }
}

async function handleAlert() {
  await alertDialog({ title: '提示', message: '操作已完成' })
  result.value = '已确认'
}
</script>

模态对话框，支持组件式与函数式两种用法。

## 组件式用法

`title` 标题、`message` 内容文案：

<PhonePreview>
  <MtButton @click="show = true">打开对话框</MtButton>
  <MtDialog v-model="show" title="提示" message="确定要执行该操作吗？" />
</PhonePreview>

```vue
<template>
  <MtButton @click="show = true">打开对话框</MtButton>
  <MtDialog v-model="show" title="提示" message="确定要执行该操作吗？" />
</template>
```

## 自定义内容

默认插槽自定义内容（优先于 `message`）：

<PhonePreview>
  <MtButton @click="showCustom = true">自定义内容</MtButton>
  <MtDialog v-model="showCustom" title="自定义标题">
    <p style="text-align: left">这里是自定义内容，可以放任意组件。</p>
  </MtDialog>
</PhonePreview>

```vue
<MtDialog v-model="show" title="自定义标题">
  <p style="text-align: left">这里是自定义内容，可以放任意组件。</p>
</MtDialog>
```

## 按钮配置

`show-cancel-button="false"` 只保留确认按钮；`confirm-button-text` / `cancel-button-text` 自定义文案：

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtButton size="small" @click="showNoCancel = true">无取消按钮</MtButton>
    <MtButton size="small" @click="showCustomText = true">自定义文案</MtButton>
  </div>
  <MtDialog v-model="showNoCancel" title="提示" message="只有一个确认按钮" :show-cancel-button="false" />
  <MtDialog v-model="showCustomText" title="提示" message="自定义按钮文案" confirm-button-text="好的" cancel-button-text="算了" />
</PhonePreview>

```vue
<MtDialog v-model="show" title="提示" message="只有一个确认按钮" :show-cancel-button="false" />
<MtDialog v-model="show" title="提示" message="自定义按钮文案" confirm-button-text="好的" cancel-button-text="算了" />
```

## 对齐与宽度

`message-align` 内容对齐，`width` 自定义宽度：

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtButton size="small" @click="showAlign = true">左对齐</MtButton>
    <MtButton size="small" @click="showWide = true">加宽</MtButton>
  </div>
  <MtDialog v-model="showAlign" title="左对齐" message="这段文字左对齐显示，适合较长内容。" message-align="left" />
  <MtDialog v-model="showWide" title="加宽" message="自定义宽度" :width="320" />
</PhonePreview>

```vue
<MtDialog v-model="show" title="左对齐" message="这段文字左对齐显示。" message-align="left" />
<MtDialog v-model="show" title="加宽" message="自定义宽度" :width="320" />
```

## 事件

点击确认触发 `confirm`，点击取消触发 `cancel`：

<PhonePreview>
  <MtButton @click="showEvent = true">打开对话框</MtButton>
  <div style="margin-top: 12px; color: var(--mt-text-color-secondary)">动作：{{ lastAction || '-' }}</div>
  <MtDialog v-model="showEvent" title="提示" message="点击按钮触发事件" @confirm="lastAction = 'confirm'" @cancel="lastAction = 'cancel'" />
</PhonePreview>

```vue
<MtDialog
  v-model="show"
  title="提示"
  message="点击按钮触发事件"
  @confirm="lastAction = 'confirm'"
  @cancel="lastAction = 'cancel'"
/>
```

## 函数式调用

`confirmDialog` 确认时 resolve、取消时 reject；`alertDialog` 只有确认按钮，始终 resolve：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtButton @click="handleConfirm">confirmDialog</MtButton>
    <MtButton @click="handleAlert">alertDialog</MtButton>
    <div style="color: var(--mt-text-color-secondary)">结果：{{ result || '-' }}</div>
  </div>
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

## 交互说明

- 默认点击遮罩不关闭（`close-on-click-overlay` 默认 `false`）
- 确认/取消按钮点击后都会关闭对话框
- 函数式 `confirmDialog` 取消时 reject，需 `try/catch` 捕获

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
