# Picker 选择器

<script setup>
import { reactive } from 'vue'

const pickerDemo = reactive({
  city: 'hz',
  cities: [
    { text: '杭州', value: 'hz' },
    { text: '宁波', value: 'nb' },
    { text: '温州', value: 'wz' },
    { text: '绍兴', value: 'sx' },
    { text: '嘉兴', value: 'jx' },
  ],
  area: ['zj', 'hz'],
  areas: [
    {
      text: '浙江',
      value: 'zj',
      children: [
        { text: '杭州', value: 'hz' },
        { text: '宁波', value: 'nb' },
      ],
    },
    {
      text: '江苏',
      value: 'js',
      children: [
        { text: '南京', value: 'nj' },
        { text: '苏州', value: 'sz' },
      ],
    },
  ],
})
</script>

滚轮式选择器，支持单列、多列与级联数据。通常配合底部弹层使用（阶段 3 提供 Popup 集成）。

## 单列选择

<PhonePreview>
  <MtPicker v-model="pickerDemo.city" :columns="pickerDemo.cities" title="选择城市" />
</PhonePreview>

```vue
<template>
  <MtPicker v-model="city" :columns="cities" title="选择城市" />
</template>
```

## 级联选择

选项带 `children` 时自动识别为级联结构，切换上级会自动重置下级：

<PhonePreview>
  <MtPicker v-model="pickerDemo.area" :columns="pickerDemo.areas" title="选择地区" />
</PhonePreview>

```vue
<script setup>
const areas = [
  {
    text: '浙江',
    value: 'zj',
    children: [
      { text: '杭州', value: 'hz' },
      { text: '宁波', value: 'nb' },
    ],
  },
]
<\/script>

<template>
  <MtPicker v-model="area" :columns="areas" title="选择地区" />
</template>
```

## 交互说明

- 滚轮支持手指拖动（含惯性滑动）与鼠标拖动
- 点击任意选项可直接定位到该选项
- 点击「确认」提交当前选中值（触发 `update:modelValue` 与 `confirm`）
- 绑定值：单列为单个值，多列/级联为值数组

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 选中值；多列为数组 | `string \| number \| Array` | - |
| columns | 列数据：扁平、级联或多列 | `MtPickerColumns` | `[]` |
| title | 标题 | `string` | - |
| confirm-button-text | 确认按钮文案 | `string` | 语言包 |
| cancel-button-text | 取消按钮文案 | `string` | 语言包 |
| option-height | 选项行高（375 设计稿 px） | `number` | `44` |
| visible-option-num | 可见行数 | `number` | `6` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击确认 | `(value, options)` |
| cancel | 点击取消 | - |
| change | 滚动切换选项 | `(columnIndex, index)` |

### Methods

| 名称 | 说明 |
| --- | --- |
| getSelectedOptions | 获取当前选中的选项对象数组 |
| getSelectedValues | 获取当前选中的值 |
