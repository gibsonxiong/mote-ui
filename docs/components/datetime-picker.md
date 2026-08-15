# DatetimePicker 时间选择

<script setup>
import { ref } from 'vue'

const dateValue = ref(new Date())
const timeValue = ref('12:00')
const datetimeValue = ref(new Date())
const yearMonthValue = ref(new Date())

function filterMinutes(type, values) {
  if (type === 'minute') return values.filter((v) => v % 15 === 0)
  return values
}

function formatOption(type, value) {
  if (type === 'hour') return `${value} 点`
  return `${value} 分`
}
</script>

基于 Picker 的时间日期选择器，支持日期、时间、完整日期时间与年月四种模式。

## 日期选择

<PhonePreview>
  <MtDatetimePicker v-model="dateValue" type="date" title="选择日期" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value = ref(new Date())
<\/script>

<template>
  <MtDatetimePicker v-model="value" type="date" title="选择日期" />
</template>
```

## 时间选择

`time` 模式的绑定值为 `'HH:mm'` 字符串：

<PhonePreview>
  <MtDatetimePicker v-model="timeValue" type="time" title="选择时间" />
</PhonePreview>

```vue
<template>
  <MtDatetimePicker v-model="time" type="time" title="选择时间" />
</template>
```

## 完整日期时间与年月

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MtDatetimePicker v-model="datetimeValue" type="datetime" title="选择日期时间" />
    <MtDatetimePicker v-model="yearMonthValue" type="year-month" title="选择年月" />
  </div>
</PhonePreview>

```vue
<template>
  <MtDatetimePicker v-model="value" type="datetime" title="选择日期时间" />
  <MtDatetimePicker v-model="month" type="year-month" title="选择年月" />
</template>
```

## 范围与过滤

通过 `min-date` / `max-date` 限制日期范围，`min-hour` / `max-hour` 等限制时间范围；`filter` 与 `formatter` 可分别裁剪候选值与定制展示文案：

<PhonePreview>
  <MtDatetimePicker
    type="time"
    title="营业时间"
    :min-hour="9"
    :max-hour="21"
    :filter="filterMinutes"
    :formatter="formatOption"
  />
</PhonePreview>

```vue
<script setup>
function filterMinutes(type, values) {
  if (type === 'minute') return values.filter((v) => v % 15 === 0)
  return values
}

function formatOption(type, value) {
  if (type === 'hour') return `${value} 点`
  return `${value} 分`
}
<\/script>

<template>
  <MtDatetimePicker
    type="time"
    title="营业时间"
    :min-hour="9"
    :max-hour="21"
    :filter="filterMinutes"
    :formatter="formatOption"
  />
</template>
```

## 交互说明

- 各模式绑定值：日期类为 `Date`，`time` 为 `'HH:mm'` 字符串
- 切换年/月时自动收敛到合法日期（如 2 月 30 日收敛到月末）
- 点击「确认」提交当前选中值（触发 `update:modelValue` 与 `confirm`）

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 选中值；日期类为 `Date`，time 为 `'HH:mm'` | `Date \| string` | 当前时间 |
| type | 选择器模式 | `'date' \| 'time' \| 'datetime' \| 'year-month'` | `'date'` |
| min-date | 最小可选日期 | `Date` | 十年前 1 月 1 日 |
| max-date | 最大可选日期 | `Date` | 十年后 12 月 31 日 |
| min-hour | 最小时（time / datetime） | `number` | `0` |
| max-hour | 最大时（time / datetime） | `number` | `23` |
| min-minute | 最小分（time / datetime） | `number` | `0` |
| max-minute | 最大分（time / datetime） | `number` | `59` |
| title | 标题 | `string` | - |
| confirm-button-text | 确认按钮文案 | `string` | 语言包 |
| cancel-button-text | 取消按钮文案 | `string` | 语言包 |
| filter | 过滤某列候选值 | `(type, values) => number[]` | - |
| formatter | 定制选项展示文案 | `(type, value) => string` | - |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击确认 | `(value: Date \| string)` |
| cancel | 点击取消 | - |
| change | 滚动切换选项 | - |
