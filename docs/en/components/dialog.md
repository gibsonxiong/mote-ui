# Dialog

<script setup>
import { ref } from 'vue'
import { confirmDialog, alertDialog } from 'mote-ui'

const show = ref(false)
const result = ref('')

async function handleConfirm() {
  try {
    await confirmDialog({ title: 'Confirm deletion', message: 'This cannot be undone. Continue?' })
    result.value = 'Confirmed'
  } catch {
    result.value = 'Canceled'
  }
}
</script>

A modal dialog supporting both component-style and imperative usage.

## Component Usage

<PhonePreview>
  <MtButton @click="show = true">Open dialog</MtButton>
  <MtDialog v-model="show" title="Notice" message="Are you sure you want to proceed?" />
</PhonePreview>

```vue
<template>
  <MtButton @click="show = true">Open dialog</MtButton>
  <MtDialog v-model="show" title="Notice" message="Are you sure you want to proceed?" @confirm="onConfirm" />
</template>
```

The default slot accepts custom content:

```vue
<MtDialog v-model="show" title="Custom content">
  <p>Any content goes here</p>
</MtDialog>
```

## Imperative Usage

`confirmDialog` returns a Promise: resolves on confirm, rejects on cancel; `alertDialog` has a single confirm button and always resolves.

<PhonePreview>
  <MtButton @click="handleConfirm">confirmDialog</MtButton>
  <div style="margin-top: 12px; color: var(--mt-text-color-secondary)">Result: {{ result || '-' }}</div>
</PhonePreview>

```js
import { confirmDialog, alertDialog } from 'mote-ui'

try {
  await confirmDialog({ title: 'Confirm deletion', message: 'This cannot be undone' })
  // User confirmed
} catch {
  // User canceled
}

await alertDialog('All done')
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Whether it is visible | `boolean` | `false` |
| title | Title | `string` | - |
| message | Message text | `string` | - |
| message-align | Message alignment | `'left' \| 'center' \| 'right'` | `'center'` |
| confirm-button-text | Confirm button text | `string` | locale |
| cancel-button-text | Cancel button text | `string` | locale |
| show-cancel-button | Whether the cancel button is shown | `boolean` | `true` |
| close-on-click-overlay | Whether clicking the overlay closes it | `boolean` | `false` |
| width | Width (375px design base) | `number \| string` | `280` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| confirm | Emitted on confirm | - |
| cancel | Emitted on cancel | - |

### Slots

| Slot | Description |
| --- | --- |
| default | Custom content (takes precedence over message) |
| title | Custom title |

### Imperative Options

`confirmDialog(options | string)` / `alertDialog(options | string)`, accepting `title`, `message`, `confirmButtonText`, `cancelButtonText` and `showCancelButton`.
