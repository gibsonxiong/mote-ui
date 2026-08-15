# Calendar 日历

<script setup>
import { ref } from 'vue'

const singleValue = ref(null)
const rangeValue = ref(null)

const minDate = new Date(2026, 0, 1)
const maxDate = new Date(2026, 3, 30)
</script>

用于选择日期或日期区间，按月份分组纵向滚动展示。

## 单选日期

点击日期后点击底部确认按钮完成选择：

<PhonePreview>
  <MtCalendar v-model="singleValue" :min-date="minDate" :max-date="maxDate" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value = ref(null)
<\/script>

<template>
  <MtCalendar v-model="value" />
</template>
```

## 选择日期区间

`type="range"` 时绑定值为 `[开始日期, 结束日期]` 元组，两次点击确定区间：

<PhonePreview>
  <MtCalendar v-model="rangeValue" type="range" :min-date="minDate" :max-date="maxDate" />
</PhonePreview>

```vue
<template>
  <MtCalendar v-model="value" type="range" />
</template>
```

## 免确认模式

`show-confirm` 设为 `false` 时隐藏底部按钮，选中即提交：

<PhonePreview>
  <MtCalendar :min-date="minDate" :max-date="maxDate" :show-confirm="false" />
</PhonePreview>

```vue
<template>
  <MtCalendar v-model="value" :show-confirm="false" />
</template>
```

## 交互说明

- 单选模式绑定 `Date`，区间模式绑定 `[Date, Date]` 元组
- 区间模式第二次点击早于起点时重新开始选择
- 超出 `min-date` / `max-date` 的日期置灰不可选
- 确认时触发 `update:modelValue` 与 `confirm`；免确认模式在选中时直接触发

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 选中值；单选为 `Date`，区间为 `[Date, Date]` | `Date \| [Date, Date] \| null` | `null` |
| type | 选择模式 | `'single' \| 'range'` | `'single'` |
| min-date | 最小可选日期 | `Date` | 当天 |
| max-date | 最大可选日期 | `Date` | 六个月后 |
| title | 标题 | `string` | 语言包 |
| confirm-text | 确认按钮文案 | `string` | 语言包 |
| show-confirm | 是否显示确认按钮 | `boolean` | `true` |
| readonly | 只读，禁止选择 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| select | 选中完成时触发（区间模式为区间补齐时） | `(value)` |
| confirm | 点击确认提交 | `(value)` |
