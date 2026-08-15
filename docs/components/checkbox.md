# Checkbox 复选框

<script setup>
import { reactive } from 'vue'

const checkboxDemo = reactive({
  single: true,
  group: ['apple'],
})
</script>

用于在一组选项中进行多选，也可单独使用表示布尔开关。

## 基础用法

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckbox v-model="checkboxDemo.single">同意用户协议</MtCheckbox>
  </div>
</PhonePreview>

```vue
<template>
  <MtCheckbox v-model="checked">同意用户协议</MtCheckbox>
</template>
```

## 复选框组

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckboxGroup v-model="checkboxDemo.group">
      <MtCheckbox value="apple">苹果</MtCheckbox>
      <MtCheckbox value="banana">香蕉</MtCheckbox>
      <MtCheckbox value="orange">橘子</MtCheckbox>
    </MtCheckboxGroup>
  </div>
</PhonePreview>

```vue
<template>
  <MtCheckboxGroup v-model="fruits">
    <MtCheckbox value="apple">苹果</MtCheckbox>
    <MtCheckbox value="banana">香蕉</MtCheckbox>
  </MtCheckboxGroup>
</template>
```

## 半选状态

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckbox indeterminate>全选</MtCheckbox>
  </div>
</PhonePreview>

## API

### Checkbox Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 单独使用时的绑定值 | `boolean` | `false` |
| value | 在复选框组中的标识值 | `string \| number \| boolean` | - |
| disabled | 禁用 | `boolean` | `false` |
| indeterminate | 半选状态（仅视觉） | `boolean` | `false` |

### Checkbox Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发（单独使用） | `(checked: boolean)` |

### CheckboxGroup Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 已勾选的值数组 | `Array<string \| number \| boolean>` | `[]` |
| disabled | 整组禁用 | `boolean` | `false` |

### CheckboxGroup Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发 | `(values)` |
