# Swipe

<script setup>
import { ref } from 'vue'

const swipeIndex = ref(0)
const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
</script>

Cycles through a group of content. Supports touch gestures, autoplay and vertical mode.

## Basic Usage

Loop and indicators are enabled by default. Dragging more than a quarter of the width switches slides:

<PhonePreview>
  <MtSwipe style="height: 120px; border-radius: 8px; overflow: hidden">
    <div
      v-for="(color, index) in colors"
      :key="index"
      :style="{ height: '120px', lineHeight: '120px', textAlign: 'center', color: '#fff', backgroundColor: color }"
    >
      {{ index + 1 }}
    </div>
  </MtSwipe>
</PhonePreview>

```vue
<template>
  <MtSwipe>
    <div v-for="item in banners" :key="item.id">{{ item.title }}</div>
  </MtSwipe>
</template>
```

## Controlled Switching

Bind the active slide index with `v-model`; clicking an indicator keeps it in sync:

<PhonePreview>
  <MtSwipe v-model="swipeIndex" :autoplay="3000" style="height: 120px; border-radius: 8px; overflow: hidden">
    <div
      v-for="(color, index) in colors"
      :key="index"
      :style="{ height: '120px', lineHeight: '120px', textAlign: 'center', color: '#fff', backgroundColor: color }"
    >
      Slide {{ index + 1 }}
    </div>
  </MtSwipe>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const index = ref(0)
<\/script>

<template>
  <MtSwipe v-model="index" :autoplay="3000">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </MtSwipe>
</template>
```

## Interaction

- Dragging more than a quarter of the slide size switches to the previous/next slide
- Autoplay runs while `autoplay` is positive and pauses during a drag
- With `loop` set to `false`, the carousel stops wrapping at the edges
- With `vertical` set to `true` slides move vertically; the container needs an explicit height

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Index of the active slide | `number` | `0` |
| autoplay | Autoplay interval in ms; disabled when not positive | `number` | `0` |
| duration | Slide animation duration in ms | `number` | `300` |
| loop | Whether to wrap around at the edges | `boolean` | `true` |
| show-indicators | Whether to show the indicator dots | `boolean` | `true` |
| vertical | Vertical sliding direction | `boolean` | `false` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the slide changes | `(index: number)` |

### Slots

| Name | Description |
| --- | --- |
| default | Slide content; each direct child element is one slide |
