# Circle

<script setup>
import { ref } from 'vue'

const rate = ref(70)
</script>

Displays the current progress as a ring, with animation and customizable center text.

## Basic Usage

`rate` is the target progress (0-100), and `v-model` binds the real-time progress during the animation:

<PhonePreview>
  <MtCircle v-model="rate" :rate="rate" :speed="40" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const rate = ref(70)
</script>

<template>
  <MtCircle v-model="rate" :rate="rate" :speed="40" />
</template>
```

## Custom Styles

`size` sets the diameter, `stroke-width` the stroke width, `color` the progress color, and `layer-color` the track color:

<PhonePreview>
  <div style="display: flex; gap: 16px; align-items: center">
    <MtCircle :rate="100" :size="80" :stroke-width="10" color="var(--mt-color-success)" />
    <MtCircle :rate="60" :size="80" :stroke-width="6" color="var(--mt-color-warning)" />
  </div>
</PhonePreview>

```vue
<MtCircle :rate="100" :size="80" :stroke-width="10" color="var(--mt-color-success)" />
<MtCircle :rate="60" :size="80" :stroke-width="6" color="var(--mt-color-warning)" />
```

## Custom Text

Customize the center text via the default slot or the `text` prop:

<PhonePreview>
  <MtCircle :rate="80" text="Good" />
</PhonePreview>

```vue
<MtCircle :rate="80" text="Good" />
```

## Counter-clockwise

Set `clockwise` to `false` to grow the progress counter-clockwise:

<PhonePreview>
  <MtCircle :rate="50" :clockwise="false" />
</PhonePreview>

```vue
<MtCircle :rate="50" :clockwise="false" />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Current progress (0-100), the real-time value during animation | `number` | `0` |
| rate | Target progress (0-100) the ring animates toward | `number` | `100` |
| speed | Animation speed in percentage points per second; 0 disables animation | `number` | `0` |
| size | Diameter (px) | `number` | `100` |
| stroke-width | Stroke width of the ring | `number` | `6` |
| color | Progress stroke color | `string` | Theme color |
| layer-color | Track (background) stroke color | `string` | Page background |
| fill | Fill color of the circle | `string` | - |
| clockwise | Whether progress grows clockwise | `boolean` | `true` |
| stroke-linecap | Shape of the progress line cap | `'butt' \| 'round' \| 'square'` | `'round'` |
| text | Text shown in the center; defaults to the percentage | `string` | Percentage |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| update:modelValue | Emitted as the real-time progress changes during animation | `(value: number)` |

### Slots

| Name | Description |
| --- | --- |
| default | Custom center content |