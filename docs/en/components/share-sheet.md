# ShareSheet

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const show = ref(false)
const showRows = ref(false)

const options = [
  { name: 'WeChat' },
  { name: 'Moments' },
  { name: 'Weibo' },
  { name: 'QQ' },
]

const rowOptions = [
  [
    { name: 'WeChat', icon: 'success', description: 'Friends' },
    { name: 'Moments', icon: 'success' },
    { name: 'Weibo', icon: 'success' },
    { name: 'QQ', icon: 'success' },
  ],
  [
    { name: 'Copy link', icon: 'arrow-up' },
    { name: 'QR code', icon: 'arrow-down' },
    { name: 'Favorite', icon: 'arrow-left', description: 'Favorited', disabled: true },
  ],
]

function onSelect(option) {
  showToast(`Selected: ${option.name}`)
}
</script>

A bottom sheet that offers a set of share or action options. Built on top of `MtPopup`, and supports a title, description and multi-row layouts.

## Basic Usage

<PhonePreview>
  <MtButton @click="show = true">Open share sheet</MtButton>
  <MtShareSheet v-model="show" title="Share to" :options="options" cancel-text="Cancel" @select="onSelect" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const show = ref(false)
const options = [
  { name: 'WeChat' },
  { name: 'Moments' },
  { name: 'Weibo' },
  { name: 'QQ' },
]
</script>

<template>
  <MtShareSheet v-model="show" title="Share to" :options="options" cancel-text="Cancel" />
</template>
```

## Title, Description and Multi-row Options

Pass a nested array to `options` to render multiple rows, and use `description` to show text under the title:

<PhonePreview>
  <MtButton @click="showRows = true">Multi-row share</MtButton>
  <MtShareSheet
    v-model="showRows"
    title="Share to"
    description="Choose a share method"
    :options="rowOptions"
    cancel-text="Cancel"
    @select="onSelect"
  />
</PhonePreview>

```vue
<MtShareSheet
  v-model="show"
  title="Share to"
  description="Choose a share method"
  :options="[
    [
      { name: 'WeChat', icon: 'success' },
      { name: 'Moments', icon: 'success' },
    ],
    [
      { name: 'Copy link', icon: 'arrow-up' },
      { name: 'Favorite', icon: 'arrow-left', description: 'Favorited', disabled: true },
    ],
  ]"
  cancel-text="Cancel"
/>
```

## Interaction Notes

- Tapping an option emits `select` with `(option, index)`, where `index` is the flattened position across all rows
- Options in `disabled` state do not respond to taps
- Setting `cancel-text` shows the cancel button, which emits `cancel` and closes the sheet
- `overlay` controls whether the mask is shown, and `close-on-click-overlay` controls whether tapping the mask closes it

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Whether it is visible | `boolean` | `false` |
| title | Title | `string` | - |
| description | Description under the title | `string` | - |
| options | Share options; a nested array renders multiple rows | `MtShareSheetOption[] \| MtShareSheetOption[][]` | `[]` |
| cancel-text | Cancel button text; shows the cancel button when set | `string` | - |
| close-on-click-overlay | Whether clicking the overlay closes it | `boolean` | `true` |
| overlay | Whether the mask is shown | `boolean` | `true` |
| safe-area-inset-bottom | Whether to adapt to the bottom safe area | `boolean` | `true` |

### Option Structure

| Field | Description | Type |
| --- | --- | --- |
| name | Option name | `string` |
| icon | Built-in icon name | `string` |
| description | Description under the name | `string` |
| color | Description text color | `string` |
| disabled | Whether it is disabled | `boolean` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| select | Emitted when an option is tapped | `(option, index)` |
| cancel | Emitted when cancel is tapped | - |

### Slots

| Name | Description |
| --- | --- |
| description | Custom description content |