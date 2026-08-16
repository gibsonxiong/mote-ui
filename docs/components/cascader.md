# Cascader 级联选择

<script setup>
import { ref } from 'vue'

const areaValue = ref([])
const customValue = ref([])
const disabledValue = ref([])
const cascaderEvent = ref('')

const areas = [
  {
    label: '浙江',
    value: 'zj',
    children: [
      { label: '杭州', value: 'hz' },
      { label: '宁波', value: 'nb' },
    ],
  },
  {
    label: '江苏',
    value: 'js',
    children: [
      { label: '南京', value: 'nj' },
      { label: '苏州', value: 'sz', disabled: true },
    ],
  },
]

const categories = [
  {
    name: '数码',
    code: 'digital',
    items: [
      { name: '手机', code: 'phone' },
      { name: '电脑', code: 'computer' },
    ],
  },
]
</script>

用于多级关联数据的选择，采用移动端常见的分层 tab 形态。绑定值为从根到叶的完整路径数组，与 Element Plus Cascader 一致。

## 基础用法

<PhonePreview>
  <MtCascader v-model="areaValue" :options="areas" title="选择地区" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    label: '浙江',
    value: 'zj',
    children: [
      { label: '杭州', value: 'hz' },
      { label: '宁波', value: 'nb' },
    ],
  },
]
<\/script>

<template>
  <MtCascader v-model="value" :options="options" title="选择地区" />
</template>
```

## 自定义字段名

通过 `props` 配置字段名映射（对齐 Element Plus 的 `props` 选项）：

<PhonePreview>
  <MtCascader
    v-model="customValue"
    :options="categories"
    :props="{ value: 'code', label: 'name', children: 'items' }"
    title="选择分类"
  />
</PhonePreview>

```vue
<template>
  <MtCascader
    v-model="value"
    :options="categories"
    :props="{ value: 'code', label: 'name', children: 'items' }"
    title="选择分类"
  />
</template>
```

## 禁用

`disabled` 禁用整个级联选择：

<PhonePreview>
  <MtCascader v-model="disabledValue" :options="areas" title="选择地区" disabled />
</PhonePreview>

```vue
<MtCascader v-model="value" :options="options" title="选择地区" disabled />
```

## 选择事件

选中叶子节点触发 `change`，参数为完整路径数组：

<PhonePreview>
  <div>
    <MtCascader v-model="areaValue" :options="areas" title="选择地区" @change="cascaderEvent = $event.join(' / ')" />
    <div style="padding: 8px 16px; font-size: 12px; color: var(--mt-text-color-secondary)">change：{{ cascaderEvent || '-' }}</div>
  </div>
</PhonePreview>

```vue
<MtCascader v-model="value" :options="options" title="选择地区" @change="onChange" />
```

## 交互说明

- 点击分支选项下钻到下一级，点击叶子选项完成选择并触发 `update:modelValue` 与 `change`
- 顶部 tab 展示各级已选项，点击任意 tab 可回退到该级重新选择
- 绑定值为完整路径数组（如 `['zj', 'hz']`），外部赋值可回显选中状态
- 带 `disabled` 的选项不可选

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 选中值：从根到叶的完整路径数组 | `Array<string \| number>` | `[]` |
| options | 级联选项数据 | `MtCascaderOption[]` | `[]` |
| props | 字段名映射（value / label / children / disabled） | `MtCascaderFieldNames` | - |
| title | 标题 | `string` | - |
| placeholder | 待选 tab 的占位文案 | `string` | 语言包 |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 选中叶子节点时触发 | `(value, selectedOptions)` |
