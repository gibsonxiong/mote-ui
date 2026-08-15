# ImagePreview

Previews a group of images fullscreen, with swipe navigation built on [Swipe](/en/components/swipe).

<script setup>
import { ref } from 'vue'

function svg(text, color) {
  return 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="${color}"/><text x="150" y="156" font-size="24" fill="#fff" text-anchor="middle">${text}</text></svg>`
  )
}

const images = [svg('1', '#409eff'), svg('2', '#67c23a'), svg('3', '#e6a23c')]

const showBasic = ref(false)
const showCloseable = ref(false)
const startAtSecond = ref(false)

function openStart() {
  startAtSecond.value = true
}
</script>

## Basic Usage

`v-model` controls visibility; tapping the overlay closes the preview:

<PhonePreview>
  <MtButton size="small" @click="showBasic = true">Preview Images</MtButton>
  <MtImagePreview v-model="showBasic" :images="images" />
</PhonePreview>

```vue
<script setup>
const show = ref(false)
const images = ['https://example.com/a.jpg', 'https://example.com/b.jpg']
</script>

<template>
  <MtButton size="small" @click="show = true">Preview Images</MtButton>
  <MtImagePreview v-model="show" :images="images" />
</template>
```

## Start Position

`start-position` sets the image shown when the preview opens:

<PhonePreview>
  <MtButton size="small" @click="openStart">Start at the second</MtButton>
  <MtImagePreview v-model="startAtSecond" :images="images" :start-position="1" />
</PhonePreview>

```vue
<MtImagePreview v-model="show" :images="images" :start-position="1" />
```

## Close Button

`closeable` shows a close button at the top-right corner:

<PhonePreview>
  <MtButton size="small" @click="showCloseable = true">With Close Button</MtButton>
  <MtImagePreview v-model="showCloseable" :images="images" closeable />
</PhonePreview>

```vue
<MtImagePreview v-model="show" :images="images" closeable />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Whether the preview is shown | `boolean` | `false` |
| images | Image URLs | `string[]` | `[]` |
| start-position | Index of the initially shown image | `number` | `0` |
| show-index | Show the `1 / n` index indicator | `boolean` | `true` |
| closeable | Show a close button | `boolean` | `false` |
| close-on-overlay | Close when tapping the overlay | `boolean` | `true` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| close | Emitted when the preview closes | `(index: number)` image index at close |
| change | Emitted when the image changes | `(index: number)` |
