# Search 搜索

<script setup>
import { reactive } from 'vue'

const searchDemo = reactive({
  basic: '',
  round: '',
  action: '',
})

function handleSearch(value) {
  console.log('search', value)
}
</script>

用于搜索场景的输入框组件，支持回车搜索与取消操作。

## 基础用法

<PhonePreview>
  <MtSearch v-model="searchDemo.basic" @search="handleSearch" />
</PhonePreview>

```vue
<template>
  <MtSearch v-model="keyword" @search="onSearch" />
</template>
```

## 圆形与操作按钮

<PhonePreview>
  <div style="display: flex; flex-direction: column">
    <MtSearch v-model="searchDemo.round" shape="round" />
    <MtSearch v-model="searchDemo.action" show-action @search="handleSearch" />
  </div>
</PhonePreview>

```vue
<template>
  <MtSearch v-model="keyword" shape="round" />
  <!-- 右侧操作按钮默认文案为「取消」，点击触发 cancel 事件 -->
  <MtSearch v-model="keyword" show-action action-text="搜索" />
</template>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string` | `''` |
| placeholder | 占位提示，默认取语言包 `search.placeholder` | `string` | - |
| shape | 搜索框形状 | `'square' \| 'round'` | `'square'` |
| show-action | 显示右侧操作按钮 | `boolean` | `false` |
| action-text | 操作按钮文案，默认取语言包 `common.cancel` | `string` | - |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读 | `boolean` | `false` |
| clearable | 显示清除图标 | `boolean` | `true` |
| maxlength | 最大输入长度 | `number \| string` | - |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| search | 按下回车时触发 | `(value: string)` |
| change | 值变化并确认后触发 | `(value: string)` |
| clear | 点击清除图标时触发 | - |
| cancel | 点击操作按钮时触发 | - |
| focus | 聚焦时触发 | `(event: FocusEvent)` |
| blur | 失焦时触发 | `(event: FocusEvent)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| action | 自定义右侧操作区内容 |
