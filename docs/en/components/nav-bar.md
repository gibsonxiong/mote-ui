# NavBar

<script setup>
import { showToast } from 'mote-ui'
</script>

A top navigation bar with title, back control and a right-side action area.

## Basic Usage

<PhonePreview>
  <MtNavBar
    title="Title"
    left-text="Back"
    left-arrow
    right-text="More"
    @click-left="showToast('Back clicked')"
    @click-right="showToast('More clicked')"
  />
</PhonePreview>

```vue
<template>
  <MtNavBar
    title="Title"
    left-text="Back"
    left-arrow
    right-text="More"
    @click-left="onBack"
    @click-right="onMore"
  />
</template>
```

## Custom Slots

The `left` / `title` / `right` slots fully customize each area:

<PhonePreview>
  <MtNavBar>
    <template #left>
      <MtIcon name="close" />
    </template>
    <template #title>
      <span style="color: var(--mt-color-primary)">Custom title</span>
    </template>
    <template #right>
      <MtIcon name="arrow-right" />
    </template>
  </MtNavBar>
</PhonePreview>

```vue
<MtNavBar>
  <template #left>
    <MtIcon name="close" />
  </template>
  <template #title>Custom title</template>
  <template #right>
    <MtIcon name="arrow-right" />
  </template>
</MtNavBar>
```

## Fixed Positioning

`fixed` pins the bar to the top of the page; `placeholder` renders a placeholder element so content is not covered; `safe-area-inset-top` adapts to notched screens:

```vue
<MtNavBar title="Fixed nav" fixed placeholder safe-area-inset-top />
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title text | `string` | - |
| left-text | Left button text | `string` | - |
| right-text | Right button text | `string` | - |
| left-arrow | Shows the left arrow | `boolean` | `false` |
| right-arrow | Shows the right arrow | `boolean` | `false` |
| border | Shows the bottom border | `boolean` | `true` |
| fixed | Pins to the top of the page | `boolean` | `false` |
| placeholder | Renders a placeholder when fixed | `boolean` | `false` |
| safe-area-inset-top | Adapts to the top safe area | `boolean` | `false` |
| z-index | Custom z-index | `number` | - |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| click-left | Emitted when the left area is clicked | `(event: MouseEvent)` |
| click-right | Emitted when the right area is clicked | `(event: MouseEvent)` |

### Slots

| Slot | Description |
| --- | --- |
| title | Custom title |
| left | Custom left area |
| right | Custom right area |
