# SwipeCell

<script setup>
import { ref } from 'vue'

const cellPosition = ref('none')
</script>

A cell that reveals action areas on both sides when swiped. Commonly used for quick actions like delete or pin in lists.

## Basic Usage

Put the action areas into the `left` / `right` slots. Swiping past half of a side's width opens it:

<PhonePreview>
  <MtSwipeCell v-model="cellPosition">
    <template #left>
      <div style="display: flex; align-items: center; padding: 0 16px; height: 44px; color: #fff; background-color: var(--mt-color-primary)">Pin</div>
    </template>
    <div style="display: flex; align-items: center; height: 44px; padding: 0 16px">Swipe left to delete, right to pin</div>
    <template #right>
      <div style="display: flex; align-items: center; padding: 0 16px; height: 44px; color: #fff; background-color: var(--mt-color-danger)">Delete</div>
    </template>
  </MtSwipeCell>
</PhonePreview>

```vue
<template>
  <MtSwipeCell>
    <template #left>
      <div class="action action--primary">Pin</div>
    </template>
    <div class="content">Swipe left to delete, right to pin</div>
    <template #right>
      <div class="action action--danger">Delete</div>
    </template>
  </MtSwipeCell>
</template>
```

## Controlled Open State

`v-model` binds the opened side (`none` / `left` / `right`). You can also call `open` / `close` through a ref:

```vue
<script setup>
import { ref } from 'vue'

const cellRef = ref()
const position = ref('none')

function openRight() {
  cellRef.value?.open('right')
}
<\/script>

<template>
  <MtSwipeCell ref="cellRef" v-model="position">
    <!-- ... -->
  </MtSwipeCell>
</template>
```

## Interaction

- Dragging past half of a side's width opens that side; otherwise it snaps back
- Clicking outside the cell while it is open closes it
- Drag gestures are ignored when `disabled`

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Which side is opened | `'none' \| 'left' \| 'right'` | `'none'` |
| disabled | Whether dragging is disabled | `boolean` | `false` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| open | Emitted when a side opens | `(position: 'left' \| 'right')` |
| close | Emitted when the cell closes | - |

### Slots

| Name | Description |
| --- | --- |
| default | Cell content |
| left | Left action area (revealed by swiping right) |
| right | Right action area (revealed by swiping left) |

### Methods

| Name | Description |
| --- | --- |
| open(position) | Open the given side |
| close() | Close the cell |
