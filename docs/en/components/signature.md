# Signature

<script setup>
import { ref } from 'vue'

const sigRef = ref()
</script>

A canvas for handwriting signatures, supporting stroke drawing and image export.

## Basic Usage

Clear and confirm buttons are provided by default. On confirm, the `submit` event carries the canvas and image data:

<PhonePreview>
  <div style="padding: 16px">
    <MtSignature ref="sigRef" tips="Sign in the white area" />
  </div>
</PhonePreview>

```vue
<template>
  <MtSignature ref="sigRef" @submit="onSubmit" />
</template>

<script setup>
import { ref } from 'vue'

const onSubmit = ({ image }) => {
  console.log(image)
}
<\/script>
```

## Custom Stroke

`pen-color`, `line-width`, and `background-color` customize the stroke and canvas:

<PhonePreview>
  <div style="padding: 16px">
    <MtSignature pen-color="#409eff" :line-width="4" background-color="#f5f7fa" />
  </div>
</PhonePreview>

```vue
<MtSignature pen-color="#409eff" :line-width="4" />
```

## Custom Button Text

`clear-button-text` and `confirm-button-text` override the default labels; when omitted they read from the current locale:

<PhonePreview>
  <div style="padding: 16px">
    <MtSignature clear-button-text="Rewrite" confirm-button-text="Done" />
  </div>
</PhonePreview>

```vue
<MtSignature clear-button-text="Rewrite" confirm-button-text="Done" />
```

## Method Access

Call `resize`, `clear`, and `submit` via a ref:

<PhonePreview>
  <div style="padding: 16px">
    <MtSignature ref="sigRef" />
    <div style="display: flex; gap: 8px; margin-top: 12px">
      <MtButton size="small" @click="sigRef?.clear()">Clear</MtButton>
      <MtButton size="small" @click="sigRef?.submit()">Confirm</MtButton>
    </div>
  </div>
</PhonePreview>

```vue
<template>
  <MtSignature ref="sigRef" />
  <MtButton @click="sigRef?.clear()">Clear</MtButton>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Exported image type | `'png' \| 'jpg'` | `'png'` |
| pen-color | Stroke color | `string` | `'#000'` |
| line-width | Stroke width | `number` | `3` |
| background-color | Canvas background color | `string` | `''` |
| tips | Hint text | `string` | - |
| clear-button-text | Clear button label | `string` | locale `signature.clear` |
| confirm-button-text | Confirm button label | `string` | locale `common.confirm` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| start | Emitted when signing starts | `(event: PointerEvent)` |
| end | Emitted when signing ends | - |
| signing | Emitted during signing | `(signing: boolean)` |
| submit | Emitted when the confirm button is clicked | `(content: { canvas, image })` |
| clear | Emitted when the clear button is clicked | - |

### Methods

| Method | Description |
| --- | --- |
| resize | Resize the canvas to fill its container |
| clear | Clear the signature content |
| submit | Export the canvas and emit the `submit` event |