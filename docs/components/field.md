# Field 输入框

<script setup>
import { reactive } from 'vue'

const fieldDemo = reactive({
  username: '',
  password: '',
  phone: '',
  intro: '',
})
</script>

移动端表单输入框，左侧标签、右侧输入的 Cell 形态，支持文本域、密码、数字键盘等类型。

## 基础用法

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.username" label="用户名" placeholder="请输入用户名" clearable />
    <MtField v-model="fieldDemo.password" label="密码" type="password" placeholder="请输入密码" />
  </div>
</PhonePreview>

```vue
<template>
  <MtField v-model="username" label="用户名" placeholder="请输入用户名" clearable />
  <MtField v-model="password" label="密码" type="password" placeholder="请输入密码" />
</template>
```

## 数字键盘

`type="digit"` 时唤起数字键盘并过滤非数字字符：

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.phone" label="手机号" type="digit" placeholder="请输入手机号" maxlength="11" show-word-limit />
  </div>
</PhonePreview>

## 文本域

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.intro" label="简介" type="textarea" rows="3" placeholder="请输入个人简介" maxlength="50" show-word-limit />
  </div>
</PhonePreview>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string \| number` | `''` |
| label | 左侧标签 | `string` | - |
| type | 输入类型 | `'text' \| 'textarea' \| 'password' \| 'number' \| 'tel' \| 'digit'` | `'text'` |
| placeholder | 占位文本 | `string` | - |
| clearable | 显示清除按钮 | `boolean` | `false` |
| required | 显示必填星号 | `boolean` | `false` |
| maxlength | 最大长度 | `number \| string` | - |
| show-word-limit | 显示字数统计（配合 maxlength） | `boolean` | `false` |
| rows | 文本域行数 | `number \| string` | `2` |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读 | `boolean` | `false` |
| error | 错误样式 | `boolean` | `false` |
| border | 显示底部分割线 | `boolean` | `true` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| input | 输入时触发 | `(value)` |
| change | 值确认时触发 | `(value)` |
| focus / blur | 聚焦 / 失焦 | `(event)` |
| clear | 点击清除按钮 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| label | 自定义标签内容 |
| right | 输入框右侧自定义内容 |
