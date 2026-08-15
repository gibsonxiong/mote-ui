# Search

<script setup>
import { reactive } from 'vue'

const searchDemo = reactive({
  basic: '',
  round: '',
  action: '',
})

function handleSearch(value) {
  console.log('search', value)
}
</script>

An input field for search scenarios — supports searching on Enter and a cancel action.

## Basic Usage

<PhonePreview>
  <MtSearch v-model="searchDemo.basic" @search="handleSearch" />
</PhonePreview>

```vue
<template>
  <MtSearch v-model="keyword" @search="onSearch" />
</template>
```

## Round Shape and Action Button

<PhonePreview>
  <div style="display: flex; flex-direction: column">
    <MtSearch v-model="searchDemo.round" shape="round" />
    <MtSearch v-model="searchDemo.action" show-action @search="handleSearch" />
  </div>
</PhonePreview>

```vue
<template>
  <MtSearch v-model="keyword" shape="round" />
  <!-- The action button defaults to the locale "Cancel" text and emits cancel -->
  <MtSearch v-model="keyword" show-action action-text="Search" />
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `string` | `''` |
| placeholder | Placeholder, defaults to the `search.placeholder` locale message | `string` | - |
| shape | Shape of the search box | `'square' \| 'round'` | `'square'` |
| show-action | Shows the action button on the right | `boolean` | `false` |
| action-text | Action button text, defaults to the `common.cancel` locale message | `string` | - |
| disabled | Disables the input | `boolean` | `false` |
| readonly | Read only | `boolean` | `false` |
| clearable | Shows a clear icon | `boolean` | `true` |
| maxlength | Maximum input length | `number \| string` | - |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| search | Emitted when Enter is pressed | `(value: string)` |
| change | Emitted when the value is committed | `(value: string)` |
| clear | Emitted when the clear icon is clicked | - |
| cancel | Emitted when the action button is clicked | - |
| focus | Emitted on focus | `(event: FocusEvent)` |
| blur | Emitted on blur | `(event: FocusEvent)` |

### Slots

| Slot | Description |
| --- | --- |
| action | Custom content for the right-side action area |
