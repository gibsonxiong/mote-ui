# Tag

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const tags = ref(['Tag One', 'Tag Two', 'Tag Three'])

function handleClose(index) {
  tags.value.splice(index, 1)
}
</script>

Small tags for marking and categorization, with an API aligned to Element Plus.

## Basic Usage

`type` sets the color and `effect` sets the style (`light` / `dark` / `plain`):

<PhonePreview>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <MtTag>primary</MtTag>
    <MtTag type="success">success</MtTag>
    <MtTag type="warning">warning</MtTag>
    <MtTag type="danger">danger</MtTag>
    <MtTag type="info">info</MtTag>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px">
    <MtTag effect="dark">dark</MtTag>
    <MtTag effect="plain">plain</MtTag>
  </div>
</PhonePreview>

```vue
<MtTag type="success">success</MtTag>
<MtTag effect="dark">dark</MtTag>
<MtTag effect="plain">plain</MtTag>
```

## Sizes and Rounded Corners

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 8px">
    <MtTag size="small">Small</MtTag>
    <MtTag>Default</MtTag>
    <MtTag size="large">Large</MtTag>
    <MtTag round>Round</MtTag>
  </div>
</PhonePreview>

```vue
<MtTag size="small">Small</MtTag>
<MtTag size="large">Large</MtTag>
<MtTag round>Round</MtTag>
```

## Closable

`closable` shows a close icon; listen to the `close` event to remove the tag:

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtTag v-for="(tag, index) in tags" :key="tag" closable @close="handleClose(index)">
      {{ tag }}
    </MtTag>
  </div>
</PhonePreview>

```vue
<script setup>
const tags = ref(['Tag One', 'Tag Two', 'Tag Three'])

function handleClose(index) {
  tags.value.splice(index, 1)
}
</script>

<template>
  <MtTag v-for="(tag, index) in tags" :key="tag" closable @close="handleClose(index)">
    {{ tag }}
  </MtTag>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Color type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| size | Size | `'small' \| 'default' \| 'large'` | `'default'` |
| effect | Style | `'light' \| 'dark' \| 'plain'` | `'light'` |
| closable | Whether it is closable | `boolean` | `false` |
| round | Whether corners are rounded | `boolean` | `false` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| close | Emitted when the close icon is tapped | `(event: MouseEvent)` |

### Slots

| Slot | Description |
| --- | --- |
| default | Tag content |
