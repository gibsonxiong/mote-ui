# Search 搜索

<script setup>
import { reactive, ref } from 'vue'

const searchDemo = reactive({
  basic: '',
  round: '',
  action: '',
})

const searchLog = ref('')

function handleSearch(value) {
  searchLog.value = `search: ${value}`
}
</script>

用于搜索场景的输入框组件，支持回车搜索与取消操作。

## 基础用法

<PhonePreview>
  <MtSearch v-model="searchDemo.basic" @search="handleSearch" />
</PhonePreview>

```vue
<MtSearch v-model="keyword" @search="onSearch" />
```

## 圆形与操作按钮

`shape="round"` 圆角形状，`show-action` 显示右侧操作按钮：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtSearch v-model="searchDemo.round" shape="round" />
    <MtSearch v-model="searchDemo.action" show-action @search="handleSearch" />
  </div>
</PhonePreview>

```vue
<MtSearch v-model="keyword" shape="round" />
<MtSearch v-model="keyword" show-action action-text="搜索" />
```

## 禁用与只读

`disabled` 禁用不可编辑，`readonly` 只读：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtSearch model-value="禁用状态" disabled />
    <MtSearch model-value="只读状态" readonly />
  </div>
</PhonePreview>

```vue
<MtSearch model-value="禁用状态" disabled />
<MtSearch model-value="只读状态" readonly />
```

## 事件

`search` 回车触发，`cancel` 点击操作按钮，`clear` 点击清除图标：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtSearch
      v-model="searchDemo.basic"
      show-action
      @search="handleSearch"
      @cancel="searchLog = 'cancel'"
      @clear="searchLog = 'clear'"
    />
    <div style="padding: 0 16px; font-size: 12px; color: var(--mt-text-color-secondary)">事件：{{ searchLog || '-' }}</div>
  </div>
</PhonePreview>

```vue
<MtSearch
  v-model="keyword"
  show-action
  @search="onSearch"
  @cancel="onCancel"
  @clear="onClear"
/>
```

## 交互说明

- `placeholder` 默认取语言包 `search.placeholder`，可通过 `MtConfigProvider` 切换
- `clearable` 默认开启，值非空时显示清除图标
- 在 `MtFormItem` 内会自动触发对应表单校验

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
