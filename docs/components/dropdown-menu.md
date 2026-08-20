# DropdownMenu 下拉菜单

<script setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref('a')
const value3 = ref(0)

const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
]
const option2 = [
  { text: '综合排序', value: 'a' },
  { text: '销量排序', value: 'b' },
  { text: '价格排序', value: 'c', disabled: true },
]
const option3 = [
  { text: '默认筛选', value: 0 },
  { text: '只看有货', value: 1 },
  { text: '只看特价', value: 2 },
]
</script>

用于筛选的下拉菜单，由 `MtDropdownMenu` 容器与若干 `MtDropdownItem` 组成，点击标题展开对应的选项列表。

## 基础用法

<PhonePreview>
  <MtDropdownMenu>
    <MtDropdownItem v-model="value1" :options="option1" />
    <MtDropdownItem v-model="value2" :options="option2" />
    <MtDropdownItem v-model="value3" title="筛选" :options="option3" />
  </MtDropdownMenu>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value1 = ref(0)
const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
]
</script>

<template>
  <MtDropdownMenu>
    <MtDropdownItem v-model="value1" :options="option1" />
  </MtDropdownMenu>
</template>
```

每个 `MtDropdownItem` 通过 `v-model` 绑定当前选中值，选中后标题会显示对应选项的文字。

## 自定义方向与颜色

`direction` 控制下拉的展开方向，`active-color` 自定义选中态的高亮颜色：

<PhonePreview>
  <MtDropdownMenu direction="up" active-color="#f44">
    <MtDropdownItem v-model="value1" :options="option1" />
    <MtDropdownItem v-model="value2" :options="option2" />
  </MtDropdownMenu>
</PhonePreview>

```vue
<MtDropdownMenu direction="up" active-color="#f44">
  <MtDropdownItem v-model="value1" :options="option1" />
  <MtDropdownItem v-model="value2" :options="option2" />
</MtDropdownMenu>
```

## 交互说明

- 每次只有一个下拉项处于展开状态，点击已展开的标题会收起
- 选项中的 `disabled` 不响应点击
- `close-on-click-overlay` 控制点击遮罩是否收起下拉
- `change` 在选择变化时触发，参数为所选 `value`

## API

### DropdownMenu Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active-color | 选中态高亮颜色 | `string` | `var(--mt-color-primary)` |
| close-on-click-overlay | 点击遮罩是否收起 | `boolean` | `true` |
| duration | 遮罩 / 下拉过渡时长（ms） | `number` | `300` |
| overlay | 是否显示遮罩 | `boolean` | `true` |
| direction | 下拉展开方向 | `'down' \| 'up'` | `'down'` |
| z-index | 基础层级（遮罩用该值，下拉在其上） | `number` | - |

### DropdownItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前选中值 | `number \| string` | - |
| title | 未选中时显示的标题 | `string` | - |
| options | 选项列表 | `MtDropdownOption[]` | `[]` |
| disabled | 是否禁用 | `boolean` | `false` |

### Option 数据结构

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| text | 显示文字 | `string` |
| value | 选项值 | `number \| string` |
| icon | 内置图标名 | `string` |
| disabled | 是否禁用 | `boolean` |

### DropdownItem Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选择变化 | `(value: number \| string)` |
| open | 展开时触发 | - |
| close | 收起时触发 | - |
| opened | 展开过渡结束时触发 | - |
| closed | 收起过渡结束时触发 | - |