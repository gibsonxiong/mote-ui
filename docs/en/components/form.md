# Form

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
    { required: true, message: 'Please enter a name', trigger: 'blur' },
    { min: 2, max: 12, message: 'Name length must be between 2 and 12', trigger: 'blur' },
  ],
  email: [{ type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }],
}

function handleSubmit() {
  formRef.value?.validate().then(() => {
    alert('Validation passed, submitted')
  }).catch(() => {
    // Error messages are already shown under the corresponding form items
  })
}

function handleReset() {
  formRef.value?.resetFields()
}
</script>

A data entry area composed of fields, switches, pickers and other controls. Ships with a lightweight zero-dependency validation engine and an API aligned with Element Plus (`model` / `rules` / `validate` / `resetFields`).

## Full Example

<PhonePreview>
  <div>
    <MtForm ref="formRef" :model="formDemo" :rules="formRules">
      <MtFormItem prop="name" label="Name">
        <MtField v-model="formDemo.name" placeholder="Enter name" clearable />
      </MtFormItem>
      <MtFormItem prop="email" label="Email">
        <MtField v-model="formDemo.email" placeholder="Enter email" clearable />
      </MtFormItem>
      <MtFormItem label="Subscribe">
        <div style="padding: 8px 16px">
          <MtSwitch v-model="formDemo.subscribe" />
        </div>
      </MtFormItem>
    </MtForm>
    <div style="display: flex; gap: 8px; padding: 16px">
      <MtButton type="primary" block @click="handleSubmit">Submit</MtButton>
      <MtButton block @click="handleReset">Reset</MtButton>
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
    { required: true, message: 'Please enter a name', trigger: 'blur' },
    { min: 2, max: 12, message: 'Name length must be between 2 and 12', trigger: 'blur' },
  ],
  email: [{ type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }],
}

function handleSubmit() {
  formRef.value?.validate().catch(() => {
    // Error messages are already shown under the corresponding form items
  })
}
<\/script>

<template>
  <MtForm ref="formRef" :model="model" :rules="rules">
    <MtFormItem prop="name" label="Name">
      <MtField v-model="model.name" placeholder="Enter name" clearable />
    </MtFormItem>
    <MtFormItem prop="email" label="Email">
      <MtField v-model="model.email" placeholder="Enter email" clearable />
    </MtFormItem>
  </MtForm>
</template>
```

## Validation Rules

The built-in lightweight, zero-dependency validator supports these rule fields:

| Field | Description | Type |
| --- | --- | --- |
| required | Required | `boolean` |
| message | Error message (falls back to built-in messages when omitted) | `string` |
| trigger | When validation runs | `'change' \| 'blur' \| Array` |
| pattern | RegExp validation | `RegExp` |
| type | Type validation | `'string' \| 'number' \| 'boolean' \| 'array' \| 'email'` |
| min / max | String/array length or numeric range | `number` |
| validator | Custom validator; throwing or rejecting means failure | `(rule, value) => void \| boolean \| Promise` |

Controls inside an `MtFormItem` (Field / Switch / Checkbox / Radio / Picker) automatically report `change` / `blur` events to trigger the matching validations.

## API

### Form Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model | Form data object | `Record<string, unknown>` | - |
| rules | Validation rules, keyed by FormItem prop | `Record<string, Rule \| Rule[]>` | - |
| hide-required-asterisk | Hides required asterisks | `boolean` | `false` |

### Form Methods

| Method | Description | Signature |
| --- | --- | --- |
| validate | Validates all fields; rejects with `{ prop: message }` on failure | `() => Promise<boolean>` |
| validateField | Validates a single field | `(prop: string) => Promise<boolean>` |
| resetFields | Resets to initial values and clears validation state | `() => void` |
| clearValidate | Clears validation state only | `() => void` |

### FormItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| prop | Field name in the model (dot paths supported) | `string` | - |
| label | Label text | `string` | - |
| rules | Item-level rules (merged with form-level rules) | `Rule \| Rule[]` | - |
| required | Required | `boolean` | `false` |
