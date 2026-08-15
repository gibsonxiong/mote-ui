# ActionSheet

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const show = ref(false)
const showAdvanced = ref(false)

const actions = [
  { name: 'Copy' },
  { name: 'Forward' },
  { name: 'Delete', color: 'var(--mt-color-danger)' },
]

const advancedActions = [
  { name: 'Save draft', subname: 'Visible only to you' },
  { name: 'Publish', subname: 'Visible to all followers' },
  { name: 'Archive', disabled: true },
]

function onSelect(action) {
  showToast(`Selected: ${action.name}`)
}
</script>

A bottom sheet that offers a set of actions relevant to the current context.

## Basic Usage

<PhonePreview>
  <MtButton @click="show = true">Open action sheet</MtButton>
  <MtActionSheet v-model="show" :actions="actions" cancel-text="Cancel" @select="onSelect" />
</PhonePreview>

```vue
<script setup>
const show = ref(false)
const actions = [
  { name: 'Copy' },
  { name: 'Forward' },
  { name: 'Delete', color: 'var(--mt-color-danger)' },
]
</script>

<template>
  <MtActionSheet v-model="show" :actions="actions" cancel-text="Cancel" @select="onSelect" />
</template>
```

## Title, Description and States

<PhonePreview>
  <MtButton @click="showAdvanced = true">With title and states</MtButton>
  <MtActionSheet
    v-model="showAdvanced"
    title="Publish Content"
    description="Choose how to publish"
    :actions="advancedActions"
    cancel-text="Cancel"
  />
</PhonePreview>

```vue
<MtActionSheet
  v-model="show"
  title="Publish Content"
  description="Choose how to publish"
  :actions="[
    { name: 'Save draft', subname: 'Visible only to you' },
    { name: 'Archive', disabled: true },
    { name: 'Submitting', loading: true },
  ]"
  cancel-text="Cancel"
/>
```

## Interaction Notes

- Selecting an action emits `select` and closes the sheet by default (`close-on-click-action` disables this, useful for handling loading states)
- Actions in `disabled` / `loading` state do not respond to taps

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Whether it is visible | `boolean` | `false` |
| actions | Action list | `MtActionSheetAction[]` | `[]` |
| title | Title | `string` | - |
| description | Description under the title | `string` | - |
| cancel-text | Cancel button text; shows the cancel button when set | `string` | - |
| close-on-click-action | Whether it closes after selecting an action | `boolean` | `true` |
| close-on-click-overlay | Whether clicking the overlay closes it | `boolean` | `true` |
| round | Whether corners are rounded | `boolean` | `true` |

### Action Structure

| Field | Description | Type |
| --- | --- | --- |
| name | Button text | `string` |
| subname | Secondary description | `string` |
| color | Custom text color | `string` |
| disabled | Whether it is disabled | `boolean` |
| loading | Whether it is loading | `boolean` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| select | Emitted when an action is tapped | `(action, index)` |
| cancel | Emitted when cancel is tapped | - |
