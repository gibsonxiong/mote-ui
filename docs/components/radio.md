# Radio 单选框

<script setup>
import { reactive } from 'vue'

const radioDemo = reactive({
  value: 'male',
})
</script>

用于在一组选项中选择单个值。

## 基础用法

<PhonePreview>
  <div style="padding: 16px">
    <MtRadioGroup v-model="radioDemo.value">
      <MtRadio value="male">男</MtRadio>
      <MtRadio value="female">女</MtRadio>
      <MtRadio value="secret" disabled>保密</MtRadio>
    </MtRadioGroup>
  </div>
</PhonePreview>

```vue
<template>
  <MtRadioGroup v-model="gender">
    <MtRadio value="male">男</MtRadio>
    <MtRadio value="female">女</MtRadio>
  </MtRadioGroup>
</template>
```

## API

### Radio Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项标识值（必填） | `string \| number \| boolean` | - |
| disabled | 禁用 | `boolean` | `false` |

### RadioGroup Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string \| number \| boolean` | - |
| disabled | 整组禁用 | `boolean` | `false` |

### RadioGroup Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发 | `(value)` |
