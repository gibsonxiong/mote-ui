# ShareSheet 分享面板

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const show = ref(false)
const showRows = ref(false)

const options = [
  { name: '微信' },
  { name: '朋友圈' },
  { name: '微博' },
  { name: 'QQ' },
]

const rowOptions = [
  [
    { name: '微信', icon: 'success', description: '好友' },
    { name: '朋友圈', icon: 'success' },
    { name: '微博', icon: 'success' },
    { name: 'QQ', icon: 'success' },
  ],
  [
    { name: '复制链接', icon: 'arrow-up' },
    { name: '二维码', icon: 'arrow-down' },
    { name: '收藏', icon: 'arrow-left', description: '已收藏', disabled: true },
  ],
]

function onSelect(option) {
  showToast(`选择了：${option.name}`)
}
</script>

底部弹出的分享面板，用于提供一组分享或操作选项。基于 `MtPopup` 实现，支持标题、描述与多行布局。

## 基础用法

<PhonePreview>
  <MtButton @click="show = true">打开分享面板</MtButton>
  <MtShareSheet v-model="show" title="分享到" :options="options" cancel-text="取消" @select="onSelect" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const show = ref(false)
const options = [
  { name: '微信' },
  { name: '朋友圈' },
  { name: '微博' },
  { name: 'QQ' },
]
</script>

<template>
  <MtShareSheet v-model="show" title="分享到" :options="options" cancel-text="取消" />
</template>
```

## 标题、描述与多行选项

`options` 传入嵌套数组可渲染多行选项，`description` 显示标题下的描述：

<PhonePreview>
  <MtButton @click="showRows = true">多行分享</MtButton>
  <MtShareSheet
    v-model="showRows"
    title="分享到"
    description="选择分享方式"
    :options="rowOptions"
    cancel-text="取消"
    @select="onSelect"
  />
</PhonePreview>

```vue
<MtShareSheet
  v-model="show"
  title="分享到"
  description="选择分享方式"
  :options="[
    [
      { name: '微信', icon: 'success' },
      { name: '朋友圈', icon: 'success' },
    ],
    [
      { name: '复制链接', icon: 'arrow-up' },
      { name: '收藏', icon: 'arrow-left', description: '已收藏', disabled: true },
    ],
  ]"
  cancel-text="取消"
/>
```

## 交互说明

- 点击选项触发 `select`，参数为 `(option, index)`，`index` 为所有行摊平后的位置
- `disabled` 的选项不响应点击
- 设置 `cancel-text` 后显示取消按钮，点击触发 `cancel` 并关闭面板
- `overlay` 控制是否显示遮罩，`close-on-click-overlay` 控制点击遮罩是否关闭

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | - |
| description | 标题下的描述 | `string` | - |
| options | 分享选项，嵌套数组渲染多行 | `MtShareSheetOption[] \| MtShareSheetOption[][]` | `[]` |
| cancel-text | 取消按钮文案，设置后显示取消按钮 | `string` | - |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean` | `true` |
| overlay | 是否显示遮罩 | `boolean` | `true` |
| safe-area-inset-bottom | 底部安全区适配 | `boolean` | `true` |

### Option 数据结构

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| name | 选项名称 | `string` |
| icon | 内置图标名 | `string` |
| description | 名称下的描述 | `string` |
| color | 描述文字颜色 | `string` |
| disabled | 是否禁用 | `boolean` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| select | 点击选项 | `(option, index)` |
| cancel | 点击取消 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| description | 自定义描述内容 |