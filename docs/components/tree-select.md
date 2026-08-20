# TreeSelect 分类选择

<script setup>
import { ref } from 'vue'

const activeId = ref(1)
const mainActiveIndex = ref(0)

const items = [
  {
    text: '浙江',
    children: [
      { id: 1, text: '杭州' },
      { id: 2, text: '宁波' },
      { id: 3, text: '温州' },
    ],
  },
  {
    text: '江苏',
    children: [
      { id: 4, text: '南京' },
      { id: 5, text: '苏州' },
      { id: 6, text: '无锡' },
    ],
  },
  {
    text: '福建',
    badge: 3,
    children: [
      { id: 7, text: '福州' },
      { id: 8, text: '厦门' },
    ],
  },
]
</script>

左侧导航、右侧内容的分类选择组件，常用于电商的商品分类、地区分类等场景。

## 基础用法

`v-model:active-id` 绑定当前选中的内容项，`v-model:main-active-index` 绑定左侧导航的激活索引：

<PhonePreview>
  <MtTreeSelect
    :items="items"
    v-model:active-id="activeId"
    v-model:main-active-index="mainActiveIndex"
  />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const activeId = ref(1)
const mainActiveIndex = ref(0)

const items = [
  {
    text: '浙江',
    children: [
      { id: 1, text: '杭州' },
      { id: 2, text: '宁波' },
    ],
  },
  {
    text: '江苏',
    children: [
      { id: 4, text: '南京' },
      { id: 5, text: '苏州' },
    ],
  },
]
</script>

<template>
  <MtTreeSelect
    :items="items"
    v-model:active-id="activeId"
    v-model:main-active-index="mainActiveIndex"
  />
</template>
```

## 徽标与圆点

导航项支持 `badge` 数字徽标与 `dot` 圆点，配合 `max` 限制徽标显示上限：

<PhonePreview>
  <MtTreeSelect :items="items" :active-id="1" :main-active-index="0" :max="2" />
</PhonePreview>

```vue
<MtTreeSelect :items="items" :active-id="1" :main-active-index="0" :max="2" />
```

## 交互说明

- 点击左侧导航项触发 `click-nav`，参数为导航项索引；点击右侧内容项触发 `click-item`
- `disabled` 的导航项或内容项不响应点击
- 未传入 `main-active-index` 时默认激活第一项导航

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 树形数据，左侧导航项含嵌套内容 | `MtTreeSelectItem[]` | `[]` |
| activeId / v-model:active-id | 选中的内容项 id | `MtTreeSelectId` | - |
| mainActiveIndex / v-model:main-active-index | 左侧导航激活索引 | `number` | `0` |
| height | 高度，数字按 px 处理 | `number \| string` | `300` |
| max | 徽标超过该值时显示 `${max}+` | `number` | - |

### Item 数据结构（导航项）

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| text | 导航项文字 | `string` |
| badge | 数字徽标 | `number \| string` |
| dot | 显示圆点 | `boolean` |
| disabled | 是否禁用 | `boolean` |
| children | 对应的内容项列表 | `MtTreeSelectChild[]` |

### Child 数据结构（内容项）

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| id | 唯一标识 | `MtTreeSelectId` |
| text | 显示文字 | `string` |
| disabled | 是否禁用 | `boolean` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| click-item | 点击内容项 | `(item: MtTreeSelectChild)` |
| click-nav | 点击导航项 | `(index: number)` |