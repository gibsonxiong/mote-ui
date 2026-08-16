# Picker 选择器

<script setup>
import { reactive, ref } from 'vue'

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => String(start + i).padStart(2, '0'))

const pickerDemo = reactive({
  city: 'hz',
  cities: [
    { text: '杭州', value: 'hz' },
    { text: '宁波', value: 'nb' },
    { text: '温州', value: 'wz' },
    { text: '绍兴', value: 'sx' },
    { text: '嘉兴', value: 'jx' },
  ],
  time: ['12', '30'],
  timeColumns: [
    range(0, 23).map((v) => ({ text: `${v} 时`, value: v })),
    range(0, 59).map((v) => ({ text: `${v} 分`, value: v })),
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
  cityDisabled: 'hz',
  citiesWithDisabled: [
    { text: '杭州', value: 'hz' },
    { text: '宁波', value: 'nb' },
    { text: '温州', value: 'wz', disabled: true },
    { text: '绍兴', value: 'sx' },
  ],
})

const showPicker = ref(false)
const pickerEvent = ref('')
</script>

滚轮式选择器，支持单列、多列与级联数据。

## 单列选择

<PhonePreview>
  <MtPicker v-model="pickerDemo.city" :columns="pickerDemo.cities" title="选择城市" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const city = ref('hz')
const cities = [
  { text: '杭州', value: 'hz' },
  { text: '宁波', value: 'nb' },
  { text: '温州', value: 'wz' },
]
<\/script>

<template>
  <MtPicker v-model="city" :columns="cities" title="选择城市" />
</template>
```

## 多列选择

传入列数组即可多列联动：

<PhonePreview>
  <MtPicker v-model="pickerDemo.time" :columns="pickerDemo.timeColumns" title="选择时间" />
</PhonePreview>

```vue
<script setup>
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => String(start + i).padStart(2, '0'))

const time = ref(['12', '30'])
const timeColumns = [
  range(0, 23).map((v) => ({ text: `${v} 时`, value: v })),
  range(0, 59).map((v) => ({ text: `${v} 分`, value: v })),
]
<\/script>

<template>
  <MtPicker v-model="time" :columns="timeColumns" title="选择时间" />
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
  {
    text: '江苏',
    value: 'js',
    children: [
      { text: '南京', value: 'nj' },
      { text: '苏州', value: 'sz' },
    ],
  },
]
<\/script>

<template>
  <MtPicker v-model="area" :columns="areas" title="选择地区" />
</template>
```

## 禁用选项

选项设置 `disabled: true` 后不可选中：

<PhonePreview>
  <MtPicker v-model="pickerDemo.cityDisabled" :columns="pickerDemo.citiesWithDisabled" title="选择城市" />
</PhonePreview>

```vue
const cities = [
  { text: '杭州', value: 'hz' },
  { text: '宁波', value: 'nb' },
  { text: '温州', value: 'wz', disabled: true },
  { text: '绍兴', value: 'sx' },
]
```

## 配合弹层

选择器本身不含弹层，配合 `MtPopup` 底部弹出：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 8px">
    <MtButton @click="showPicker = true">选择城市</MtButton>
    <span>已选：{{ pickerDemo.city }}</span>
  </div>
  <MtPopup v-model="showPicker" position="bottom" round>
    <MtPicker
      v-model="pickerDemo.city"
      :columns="pickerDemo.cities"
      title="选择城市"
      @confirm="showPicker = false"
      @cancel="showPicker = false"
    />
  </MtPopup>
</PhonePreview>

```vue
<MtButton @click="show = true">选择城市</MtButton>
<MtPopup v-model="show" position="bottom" round>
  <MtPicker
    v-model="city"
    :columns="cities"
    title="选择城市"
    @confirm="show = false"
    @cancel="show = false"
  />
</MtPopup>
```

## 事件

`confirm` 确认、`cancel` 取消、`change` 滚动切换：

<PhonePreview>
  <div>
    <MtPicker
      v-model="pickerDemo.city"
      :columns="pickerDemo.cities"
      title="选择城市"
      @confirm="pickerEvent = 'confirm: ' + $event"
      @cancel="pickerEvent = 'cancel'"
    />
    <div style="margin-top: 8px; font-size: 12px; color: var(--mt-text-color-secondary)">{{ pickerEvent || '滚动或点击确认/取消观察事件' }}</div>
  </div>
</PhonePreview>

```vue
<MtPicker
  v-model="city"
  :columns="cities"
  title="选择城市"
  @confirm="(value) => onConfirm(value)"
  @cancel="onCancel"
  @change="(columnIndex, index) => onChange(columnIndex, index)"
/>
```

## 交互说明

- 滚轮支持手指拖动（含惯性滑动）与鼠标拖动
- 点击任意选项可直接定位到该选项
- 点击「确认」提交当前选中值（触发 `update:modelValue` 与 `confirm`）
- 绑定值：单列为单个值，多列/级联为值数组
- 级联列切换上级时，下级自动重置到第一项

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

### Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题 |
| confirm | 自定义确认按钮 |
| cancel | 自定义取消按钮 |

### Methods

| 名称 | 说明 |
| --- | --- |
| getSelectedOptions | 获取当前选中的选项对象数组 |
| getSelectedValues | 获取当前选中的值 |
