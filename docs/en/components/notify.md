# Notify

<script setup>
import { ref } from 'vue'
import { MtNotify } from 'mote-ui'

const showComponent = ref(false)
</script>

A notification sliding in from the top, invoked via functions — suited for system-level messages. Only one notify is shown at a time; repeated calls replace it.

## Basic Usage

The default type is `danger`:

<PhonePreview>
  <MtButton @click="MtNotify.show('Network error, please retry later')">Show notify</MtButton>
</PhonePreview>

```js
import { MtNotify, showNotify } from 'mote-ui'

MtNotify.show('Network error, please retry later')
showNotify('Equivalent call')
```

## Notify Types

<PhonePreview>
  <MtButton @click="MtNotify.primary('New messages: 3 unread')">primary</MtButton>
  <MtButton @click="MtNotify.success('Saved')">success</MtButton>
  <MtButton @click="MtNotify.warning('Network is unstable')">warning</MtButton>
  <MtButton @click="MtNotify.danger('Deletion failed')">danger</MtButton>
</PhonePreview>

```js
MtNotify.primary('New messages: 3 unread')
MtNotify.success('Saved')
MtNotify.warning('Network is unstable')
MtNotify.danger('Deletion failed')
```

## Manual Close

With `duration` set to `0` it never auto-closes; call `MtNotify.close()` instead:

```js
MtNotify.show({ message: 'Waiting for the server...', duration: 0 })
// ... later
MtNotify.close()
```

## Component Form

The `MtNotifyComponent` component can also be controlled with `v-model`:

<PhonePreview>
  <MtButton @click="showComponent = true">Component form</MtButton>
  <MtNotifyComponent v-model="showComponent" message="A notify from the component" type="success" />
</PhonePreview>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
setTimeout(() => (show.value = false), 3000)
</script>

<template>
  <MtNotifyComponent v-model="show" message="A notify from the component" type="success" />
</template>
```

::: tip Breaking change
Since `1.0.0`, the component form uses `v-model` instead of the `visible` prop, consistent with Popup/Dialog.
:::

## API

### MtNotifyComponent Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Whether the notify is shown | `boolean` | `false` |
| message | Notify content | `string` | `''` |
| type | Notify type | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'danger'` |
| z-index | Stacking order | `number` | `3000` |

### MtNotify Methods

| Method | Description |
| --- | --- |
| MtNotify.show(options) | Shows a notify; see Options |
| MtNotify.primary(message) | Primary notify |
| MtNotify.success(message) | Success notify |
| MtNotify.warning(message) | Warning notify |
| MtNotify.danger(message) | Danger notify |
| MtNotify.close() | Closes the current notify |

The named exports `showNotify(options | string)` and `closeNotify()` are also available.

### Options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| message | Notify content | `string` | `''` |
| type | Notify type | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'danger'` |
| duration | Auto-close delay (ms); `0` disables auto-close | `number` | `3000` |
| z-index | Stacking order | `number` | `3000` |
