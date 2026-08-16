# Field 输入框

<script setup>
import { reactive } from 'vue'

const fieldDemo = reactive({
  username: '',
  password: '',
  phone: '',
  intro: '',
  code: '',
})
</script>

移动端表单输入框，左侧标签、右侧输入的 Cell 形态，支持文本域、密码、数字键盘等类型。

## 基础用法

`label` 左侧标签，`clearable` 聚焦且非空时显示清除按钮：

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

`type="digit"` 唤起数字键盘并过滤非数字字符，`show-word-limit` 显示字数统计：

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.phone" label="手机号" type="digit" placeholder="请输入手机号" maxlength="11" show-word-limit />
  </div>
</PhonePreview>

```vue
<MtField v-model="phone" label="手机号" type="digit" placeholder="请输入手机号" maxlength="11" show-word-limit />
```

## 文本域

`type="textarea"` 多行文本，`rows` 控制行数：

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.intro" label="简介" type="textarea" rows="3" placeholder="请输入个人简介" maxlength="50" show-word-limit />
  </div>
</PhonePreview>

```vue
<MtField v-model="intro" label="简介" type="textarea" rows="3" placeholder="请输入个人简介" maxlength="50" show-word-limit />
```

## 禁用与只读

`disabled` 禁用不可编辑，`readonly` 只读：

<PhonePreview>
  <div style="background: #fff">
    <MtField label="禁用" model-value="禁用内容" disabled />
    <MtField label="只读" model-value="只读内容" readonly :border="false" />
  </div>
</PhonePreview>

```vue
<MtField label="禁用" model-value="禁用内容" disabled />
<MtField label="只读" model-value="只读内容" readonly />
```

## 必填与错误

`required` 标签前显示必填星号，`error` 错误样式（文字变红）：

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.username" label="用户名" placeholder="请输入" required />
    <MtField v-model="fieldDemo.username" label="用户名" placeholder="输入有误" error :border="false" />
  </div>
</PhonePreview>

```vue
<MtField v-model="username" label="用户名" placeholder="请输入" required />
<MtField v-model="username" label="用户名" placeholder="输入有误" error />
```

## 右侧插槽

`right` 插槽自定义输入框右侧内容，如验证码按钮：

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.code" label="验证码" type="digit" placeholder="请输入验证码">
      <template #right>
        <MtButton size="small" type="primary" plain>获取验证码</MtButton>
      </template>
    </MtField>
  </div>
</PhonePreview>

```vue
<MtField v-model="code" label="验证码" type="digit" placeholder="请输入验证码">
  <template #right>
    <MtButton size="small" type="primary" plain>获取验证码</MtButton>
  </template>
</MtField>
```

## 交互说明

- `type="digit"` 唤起数字键盘并自动过滤非数字字符
- `clearable` 仅在聚焦、非空、非禁用/只读时显示清除按钮
- `show-word-limit` 需配合 `maxlength` 使用
- `error` 与 `required` 通常由 `MtForm` 校验驱动，也可手动设置

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
