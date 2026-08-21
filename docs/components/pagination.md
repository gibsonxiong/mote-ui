# Pagination 分页

<script setup>
import { ref } from 'vue'

const page = ref(1)
</script>

数据量过多时，使用分页分解数据。

## 基础用法

通过 `v-model` 绑定当前页，`total-items` 与 `items-per-page` 自动计算总页数：

<PhonePreview>
  <MtPagination v-model="page" :total-items="60" :items-per-page="10" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <MtPagination v-model="page" :total-items="60" :items-per-page="10" />
</template>
```

## 指定页数

直接通过 `page-count` 指定总页数：

<PhonePreview>
  <MtPagination v-model="page" :page-count="8" />
</PhonePreview>

```vue
<MtPagination v-model="page" :page-count="8" />
```

## 简单模式

`mode="simple"` 仅显示当前页与总页数：

<PhonePreview>
  <MtPagination v-model="page" mode="simple" :total-items="60" :items-per-page="10" />
</PhonePreview>

```vue
<MtPagination v-model="page" mode="simple" :total-items="60" :items-per-page="10" />
```

## 自定义按钮文字

`prev-text` / `next-text` 自定义上一页、下一页按钮文字，为空时显示箭头图标：

<PhonePreview>
  <MtPagination v-model="page" :total-items="60" prev-text="上一页" next-text="下一页" />
</PhonePreview>

```vue
<MtPagination v-model="page" :total-items="60" prev-text="上一页" next-text="下一页" />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前页码 | `number` | `1` |
| mode | 分页模式 | `'multi' \| 'simple'` | `'multi'` |
| prev-text | 上一页按钮文字，为空时显示箭头 | `string` | - |
| next-text | 下一页按钮文字，为空时显示箭头 | `string` | - |
| page-count | 总页数，省略时由 total-items/items-per-page 计算 | `number` | - |
| total-items | 总条目数 | `number` | `0` |
| items-per-page | 每页条目数 | `number` | `10` |
| show-page-size | 显示页码按钮的数量 | `number` | `5` |
| force-ellipses | 始终显示首尾省略号 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 页码变化时触发 | `(value: number)` |
| change | 页码变化时触发 | `(value: number)` |