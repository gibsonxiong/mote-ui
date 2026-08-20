# NumberKeyboard

<script setup>
import { reactive } from 'vue'

const keyboardDemo = reactive({
  show: false,
  value: '',
  limitShow: false,
  limit: '',
  customShow: false,
  custom: '',
})
</script>

A bottom keyboard for entering numbers. Use `v-model` to bind the input value and `v-model:show` to control visibility.

## Basic Usage

`MtNumberKeyboard` controls visibility via `v-model:show`, and `v-model` receives the typed number string:

<PhonePreview>
  <div style="padding: 16px">
    <MtCell title="Input" :value="keyboardDemo.value || 'empty'" />
    <MtButton block @click="keyboardDemo.show = true">Show Keyboard</MtButton>
    <MtNumberKeyboard
      v-model="keyboardDemo.value"
      v-model:show="keyboardDemo.show"
      title="Number Keyboard"
    />
  </div>
</PhonePreview>

```vue
<template>
  <MtNumberKeyboard v-model="value" v-model:show="show" />
</template>
```

## Limit Length

Use `maxlength` to cap the number of characters:

<PhonePreview>
  <div style="padding: 16px">
    <MtCell title="Code" :value="keyboardDemo.limit || 'empty'" />
    <MtButton block @click="keyboardDemo.limitShow = true">Show Keyboard</MtButton>
    <MtNumberKeyboard
      v-model="keyboardDemo.limit"
      v-model:show="keyboardDemo.limitShow"
      :maxlength="4"
    />
  </div>
</PhonePreview>

```vue
<MtNumberKeyboard v-model="value" v-model:show="show" :maxlength="4" />
```

## Custom Extra Key

`extra-key` sets the label of the bottom-left key. Clicking it emits `input` but does not modify the bound value:

<PhonePreview>
  <div style="padding: 16px">
    <MtButton block @click="keyboardDemo.show = true">Show Keyboard</MtButton>
    <MtNumberKeyboard
      v-model="keyboardDemo.value"
      v-model:show="keyboardDemo.show"
      extra-key="."
    />
  </div>
</PhonePreview>

```vue
<MtNumberKeyboard v-model="value" v-model:show="show" extra-key="." />
```

## Custom Theme

With `theme="custom"` the default slot renders custom keys:

<PhonePreview>
  <div style="padding: 16px">
    <MtButton block @click="keyboardDemo.customShow = true">Show Custom Keyboard</MtButton>
    <MtNumberKeyboard v-model:show="keyboardDemo.customShow" theme="custom" title="Custom">
      <div style="padding: 16px; text-align: center">Custom key content</div>
    </MtNumberKeyboard>
  </div>
</PhonePreview>

```vue
<MtNumberKeyboard v-model:show="show" theme="custom">
  <div>Custom key content</div>
</MtNumberKeyboard>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `string` | `''` |
| show / v-model:show | Whether the keyboard is visible | `boolean` | `false` |
| title | Keyboard title | `string` | - |
| theme | Keyboard theme | `'default' \| 'custom'` | `'default'` |
| maxlength | Maximum input length | `number` | `Infinity` |
| extra-key | Label of the bottom-left extra key | `string` | `''` |
| close-button-text | Text of the close button in the top-left | `string` | - |
| show-delete-key | Show the delete key | `boolean` | `true` |
| hide-on-click-outside | Hide when tapping outside | `boolean` | `true` |
| safe-area-inset-bottom | Add bottom safe-area padding | `boolean` | `true` |
| teleport | Teleport target | `string` | `'body'` |
| z-index | z-index | `number` | auto-incremented |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| input | Emitted when a key (except delete) is pressed | `(key: string)` |
| delete | Emitted when the delete key is pressed | - |
| close | Emitted when the close button is pressed | - |
| update:modelValue | Bound value changes | `(value: string)` |
| update:show | Visibility changes | `(value: boolean)` |

### Slots

| Name | Description |
| --- | --- |
| default | Key content when `theme="custom"` |
| title | Custom title content |
| title-left | Custom top-left close area |
| extra-key | Custom bottom-left key |
| delete | Custom delete key content |