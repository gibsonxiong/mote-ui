# Overlay

<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

Creates a covering layer to emphasize an element or block interaction, often used as the base of floating layers.

## Basic Usage

`v-model` controls visibility; clicking the overlay emits `click`:

<PhonePreview>
  <div style="padding: 16px">
    <MtButton @click="show = true">Show Overlay</MtButton>
    <MtOverlay v-model="show" @click="show = false" />
  </div>
</PhonePreview>

```vue
<template>
  <MtButton @click="show = true">Show Overlay</MtButton>
  <MtOverlay v-model="show" @click="show = false" />
</template>
```

## Custom z-index

When `z-index` is omitted the value auto-increments; it can also be set manually:

<PhonePreview>
  <div style="padding: 16px">
    <MtButton @click="show = true">Show Overlay</MtButton>
    <MtOverlay v-model="show" :z-index="3000" @click="show = false" />
  </div>
</PhonePreview>

```vue
<MtOverlay v-model="show" :z-index="3000" />
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Whether the overlay is visible | `boolean` | `false` |
| z-index | z-index | `number` | auto-incremented |
| duration | Fade transition duration in ms | `number` | `300` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| click | Emitted when the overlay is clicked | `(event: MouseEvent)` |