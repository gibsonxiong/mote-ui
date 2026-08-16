# ConfigProvider 全局配置

<script setup>
import { ref } from 'vue'
import { enUS, confirmDialog } from 'mote-ui'

const showEn = ref(false)
const confirmResult = ref('')

async function handleEnConfirm() {
  try {
    await confirmDialog({ title: 'Confirm', message: 'Delete this item?' })
    confirmResult.value = 'confirmed'
  } catch {
    confirmResult.value = 'canceled'
  }
}
</script>

为后代组件注入全局配置，目前支持语言包（`locale`）。默认语言为 `zh-CN`。

## 基础用法

`locale` 影响后代组件的内置文案（空态描述、对话框按钮、搜索占位等）：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtConfigProvider :locale="enUS">
      <MtButton @click="showEn = true">Open dialog (en-US)</MtButton>
      <MtEmpty />
      <MtDialog v-model="showEn" title="Confirm" message="Delete this item?" />
    </MtConfigProvider>
  </div>
</PhonePreview>

```vue
<script setup>
import { enUS } from 'mote-ui'
<\/script>

<template>
  <MtConfigProvider :locale="enUS">
    <MtEmpty />
    <!-- 空态描述显示 "No data"，对话框按钮显示 "Confirm" / "Cancel" -->
  </MtConfigProvider>
</template>
```

## 同步命令式 API

`locale` 会同步到全局，命令式 API（`confirmDialog`、`alertDialog` 等）也跟随最新配置：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px; padding: 16px">
    <MtConfigProvider :locale="enUS">
      <MtButton @click="handleEnConfirm">confirmDialog (en)</MtButton>
    </MtConfigProvider>
    <div style="color: var(--mt-text-color-secondary)">结果：{{ confirmResult || '-' }}</div>
  </div>
</PhonePreview>

```js
import { enUS, confirmDialog } from 'mote-ui'

// ConfigProvider 挂载后全局 locale 切到 en-US
try {
  await confirmDialog({ title: 'Confirm', message: 'Delete this item?' })
  // 确认
} catch {
  // 取消
}
```

## 交互说明

- 默认语言为 `zh-CN`，可通过 `locale` 注入 `enUS` 或自定义语言包
- 配置仅影响后代组件；`ConfigProvider` 之外的组件使用全局语言
- 也可直接调用 `setLocale()` 切换全局语言（不经过组件树）

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| locale | 语言包，作用于所有后代组件并同步全局 | `MtLocaleMessages` | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 需要被配置包裹的内容 |
