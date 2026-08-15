# Popup

<script setup>
import { ref } from 'vue'

const showCenter = ref(false)
const showBottom = ref(false)
const showRound = ref(false)
</script>

The overlay primitive: handles teleport mounting, the overlay mask, enter/leave transitions and background scroll locking. Dialog, ActionSheet and Picker overlays are all built on top of it.

## Basic Usage

Popup content is teleported to `body`, displayed centered, with a translucent overlay:

<PhonePreview>
  <MtButton @click="showCenter = true">Open centered popup</MtButton>
  <MtPopup v-model="showCenter" round>
    <div style="padding: 24px 32px">Popup content</div>
  </MtPopup>
</PhonePreview>

```vue
<template>
  <MtButton @click="show = true">Open popup</MtButton>
  <MtPopup v-model="show" round>
    <div style="padding: 24px 32px">Popup content</div>
  </MtPopup>
</template>
```

## Positions

`position` supports `center` / `top` / `bottom` / `left` / `right`; non-centered positions slide in:

<PhonePreview>
  <MtButton @click="showBottom = true">Open from bottom</MtButton>
  <MtPopup v-model="showBottom" position="bottom">
    <div style="padding: 24px; text-align: center">Bottom popup content</div>
  </MtPopup>
</PhonePreview>

```vue
<MtPopup v-model="show" position="bottom">...</MtPopup>
```

## Rounded Corners

`round` adds rounded corners on the side facing the screen center:

<PhonePreview>
  <MtButton @click="showRound = true">Rounded bottom popup</MtButton>
  <MtPopup v-model="showRound" position="bottom" round>
    <div style="padding: 24px; text-align: center">Rounded popup</div>
  </MtPopup>
</PhonePreview>

```vue
<MtPopup v-model="show" position="bottom" round>...</MtPopup>
```

## Interaction Notes

- Background scrolling is locked while open (reference counted, safe with stacked popups)
- Clicking the overlay closes it by default; disable with `close-on-click-overlay`
- Set `overlay` to `false` to hide the overlay mask

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Whether it is visible | `boolean` | `false` |
| position | Popup position | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` |
| overlay | Whether the overlay mask is shown | `boolean` | `true` |
| close-on-click-overlay | Whether clicking the overlay closes it | `boolean` | `true` |
| round | Rounds the side facing the screen center | `boolean` | `false` |
| teleport | Teleport target | `string` | `'body'` |
| z-index | Base z-index (popup uses +1) | `number` | `2000` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| open | Before the enter transition starts | - |
| opened | After the enter transition ends | - |
| close | Before the leave transition starts | - |
| closed | After the leave transition ends | - |
| click-overlay | Emitted when the overlay is clicked | `(event: MouseEvent)` |

### Slots

| Slot | Description |
| --- | --- |
| default | Popup content |
