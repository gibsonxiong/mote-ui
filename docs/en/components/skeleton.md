# Skeleton

<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>

A placeholder skeleton shown before content loads, with a shimmer animation.

## Basic Usage

<PhonePreview>
  <MtSkeleton />
</PhonePreview>

```vue
<MtSkeleton />
```

## With Avatar and Title

<PhonePreview>
  <MtSkeleton title avatar :rows="4" />
</PhonePreview>

```vue
<MtSkeleton title avatar :rows="4" />
```

## Reveal Content When Loaded

When `loading` is `false`, the slot content is rendered instead:

<PhonePreview>
  <MtButton style="margin-bottom: 12px" @click="loading = !loading">Toggle loading state</MtButton>
  <MtSkeleton :loading="loading" title avatar>
    <div style="padding: 12px 0">
      <strong>Real content</strong>
      <p style="margin: 8px 0 0; color: var(--mt-text-color-regular)">Body text shown once the data has loaded.</p>
    </div>
  </MtSkeleton>
</PhonePreview>

```vue
<script setup>
const loading = ref(true)
</script>

<template>
  <MtSkeleton :loading="loading" title avatar>
    <div>Real content...</div>
  </MtSkeleton>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| loading | Shows the skeleton; renders the slot content when `false` | `boolean` | `true` |
| rows | Number of paragraph rows | `number` | `3` |
| title | Shows a title row | `boolean` | `false` |
| avatar | Shows an avatar placeholder | `boolean` | `false` |
| round | Rounds the paragraph rows | `boolean` | `false` |
| animate | Shimmer animation | `boolean` | `true` |

### Slots

| Slot | Description |
| --- | --- |
| default | Real content after loading |
