# Field

<script setup>
import { reactive } from 'vue'

const fieldDemo = reactive({
  username: '',
  password: '',
  phone: '',
  intro: '',
})
</script>

Mobile form input with a Cell-like layout — label on the left, input on the right. Supports textarea, password and numeric keyboard types.

## Basic Usage

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.username" label="Username" placeholder="Enter username" clearable />
    <MtField v-model="fieldDemo.password" label="Password" type="password" placeholder="Enter password" />
  </div>
</PhonePreview>

```vue
<template>
  <MtField v-model="username" label="Username" placeholder="Enter username" clearable />
  <MtField v-model="password" label="Password" type="password" placeholder="Enter password" />
</template>
```

## Numeric Keyboard

`type="digit"` opens the numeric keyboard and filters out non-digit characters:

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.phone" label="Phone" type="digit" placeholder="Enter phone number" maxlength="11" show-word-limit />
  </div>
</PhonePreview>

## Textarea

<PhonePreview>
  <div style="background: #fff">
    <MtField v-model="fieldDemo.intro" label="Bio" type="textarea" rows="3" placeholder="Tell us about yourself" maxlength="50" show-word-limit />
  </div>
</PhonePreview>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `string \| number` | `''` |
| label | Left-side label | `string` | - |
| type | Input type | `'text' \| 'textarea' \| 'password' \| 'number' \| 'tel' \| 'digit'` | `'text'` |
| placeholder | Placeholder text | `string` | - |
| clearable | Shows a clear button | `boolean` | `false` |
| required | Shows a required asterisk | `boolean` | `false` |
| maxlength | Maximum length | `number \| string` | - |
| show-word-limit | Shows a word counter (works with maxlength) | `boolean` | `false` |
| rows | Textarea rows | `number \| string` | `2` |
| disabled | Disables the field | `boolean` | `false` |
| readonly | Makes the field read-only | `boolean` | `false` |
| error | Applies the error style | `boolean` | `false` |
| border | Shows the bottom border | `boolean` | `true` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| input | Emitted while typing | `(value)` |
| change | Emitted when the value is committed | `(value)` |
| focus / blur | On focus / blur | `(event)` |
| clear | Emitted when the clear button is clicked | - |

### Slots

| Slot | Description |
| --- | --- |
| label | Custom label content |
| right | Custom content on the right side |
