# Form 表单

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref(null)
const formDemo = reactive({
  name: '',
  email: '',
  subscribe: true,
})

const formRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 12, message: '姓名长度需在 2 到 12 之间', trigger: 'blur' },
  ],
  email: [{ type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }],
}

function handleSubmit() {
  formRef.value?.validate().then(() => {
    alert('校验通过，提交成功')
  }).catch(() => {
    // 错误信息已自动展示在对应表单项下方
  })
}

function handleReset() {
  formRef.value?.resetFields()
}

const asyncForm = reactive({ nickname: '' })

function checkNickname(rule, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'admin') reject(new Error('昵称已被占用'))
      else resolve()
    }, 500)
  })
}

const asyncRules = {
  nickname: [{ validator: checkNickname, trigger: 'blur' }],
}
</script>

由输入框、开关、选择器等控件组成的数据录入区域，内置轻量校验引擎，API 对齐 Element Plus（`model` / `rules` / `validate` / `resetFields`）。

## 完整示例

<PhonePreview>
  <div>
    <MtForm ref="formRef" :model="formDemo" :rules="formRules">
      <MtFormItem prop="name" label="姓名">
        <MtField v-model="formDemo.name" placeholder="请输入姓名" clearable />
      </MtFormItem>
      <MtFormItem prop="email" label="邮箱">
        <MtField v-model="formDemo.email" placeholder="请输入邮箱" clearable />
      </MtFormItem>
      <MtFormItem label="订阅通知">
        <div style="padding: 8px 16px">
          <MtSwitch v-model="formDemo.subscribe" />
        </div>
      </MtFormItem>
    </MtForm>
    <div style="display: flex; gap: 8px; padding: 16px">
      <MtButton type="primary" block @click="handleSubmit">提交</MtButton>
      <MtButton block @click="handleReset">重置</MtButton>
    </div>
  </div>
</PhonePreview>

```vue
<script setup>
import { reactive, ref } from 'vue'

const formRef = ref(null)
const model = reactive({ name: '', email: '' })

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 12, message: '姓名长度需在 2 到 12 之间', trigger: 'blur' },
  ],
  email: [{ type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }],
}

function handleSubmit() {
  formRef.value?.validate().catch(() => {
    // 错误信息已自动展示在对应表单项下方
  })
}
<\/script>

<template>
  <MtForm ref="formRef" :model="model" :rules="rules">
    <MtFormItem prop="name" label="姓名">
      <MtField v-model="model.name" placeholder="请输入姓名" clearable />
    </MtFormItem>
    <MtFormItem prop="email" label="邮箱">
      <MtField v-model="model.email" placeholder="请输入邮箱" clearable />
    </MtFormItem>
  </MtForm>
</template>
```

## 自定义校验器

`validator` 支持异步校验，返回 reject 或抛错即失败；失焦时自动触发：

<PhonePreview>
  <MtForm :model="asyncForm" :rules="asyncRules">
    <MtFormItem prop="nickname" label="昵称">
      <MtField v-model="asyncForm.nickname" placeholder="输入 admin 会校验失败" />
    </MtFormItem>
  </MtForm>
</PhonePreview>

```vue
<script setup>
import { reactive } from 'vue'

const model = reactive({ nickname: '' })

const rules = {
  nickname: [{
    validator: (rule, value) => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === 'admin') reject(new Error('昵称已被占用'))
        else resolve()
      }, 500)
    }),
    trigger: 'blur',
  }],
}
<\/script>

<template>
  <MtForm :model="model" :rules="rules">
    <MtFormItem prop="nickname" label="昵称">
      <MtField v-model="model.nickname" placeholder="输入 admin 会校验失败" />
    </MtFormItem>
  </MtForm>
</template>
```

## 必填与星号

`required` 显示必填星号并做非空校验；`hide-required-asterisk` 隐藏星号：

<PhonePreview>
  <div>
    <MtForm :model="formDemo">
      <MtFormItem prop="name" label="必填" required>
        <MtField v-model="formDemo.name" placeholder="失焦触发非空校验" />
      </MtFormItem>
    </MtForm>
    <MtForm :model="formDemo" hide-required-asterisk>
      <MtFormItem prop="name" label="必填（隐藏星号）" required>
        <MtField v-model="formDemo.name" placeholder="星号被隐藏" />
      </MtFormItem>
    </MtForm>
  </div>
</PhonePreview>

```vue
<MtForm :model="model">
  <MtFormItem prop="name" label="必填" required>
    <MtField v-model="model.name" placeholder="失焦触发非空校验" />
  </MtFormItem>
</MtForm>

<MtForm :model="model" hide-required-asterisk>
  <MtFormItem prop="name" label="必填（隐藏星号）" required>
    <MtField v-model="model.name" placeholder="星号被隐藏" />
  </MtFormItem>
</MtForm>
```

## 校验规则

内置零依赖的轻量校验器，支持的规则字段：

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| required | 必填 | `boolean` |
| message | 错误文案（省略时使用默认文案） | `string` |
| trigger | 触发时机 | `'change' \| 'blur' \| Array` |
| pattern | 正则校验 | `RegExp` |
| type | 类型校验 | `'string' \| 'number' \| 'boolean' \| 'array' \| 'email'` |
| min / max | 字符串/数组长度或数值范围 | `number` |
| validator | 自定义校验函数，抛错或 reject 即失败 | `(rule, value) => void \| boolean \| Promise` |

控件（Field / Switch / Checkbox / Radio / Picker）在 `MtFormItem` 内会自动上报 `change` / `blur` 触发对应校验。

## 交互说明

- 校验失败时错误文案显示在对应表单项下方，控件进入错误样式
- `validate` 成功 resolve `true`，失败 reject `{ prop: message }`
- `resetFields` 重置为初始值并清除校验状态；`clearValidate` 仅清除错误文案
- 异步校验带序号保护，慢的旧请求不会覆盖新结果

## API

### Form Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `Record<string, unknown>` | - |
| rules | 校验规则，key 为 FormItem 的 prop | `Record<string, Rule \| Rule[]>` | - |
| hide-required-asterisk | 隐藏必填星号 | `boolean` | `false` |

### Form Methods

| 名称 | 说明 | 签名 |
| --- | --- | --- |
| validate | 校验全部字段，失败时 reject `{ prop: message }` | `() => Promise<boolean>` |
| validateField | 校验单个字段 | `(prop: string) => Promise<boolean>` |
| resetFields | 重置为初始值并清除校验状态 | `() => void` |
| clearValidate | 仅清除校验状态 | `() => void` |

### FormItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 对应 model 中的字段名（支持点路径） | `string` | - |
| label | 标签文本 | `string` | - |
| rules | 表单项级规则（与表单级合并） | `Rule \| Rule[]` | - |
| required | 必填 | `boolean` | `false` |
