# List

<script setup>
import { ref } from 'vue'

const items = ref([])
const loading = ref(false)
const finished = ref(false)
let page = 0

function onLoad() {
  setTimeout(() => {
    page += 1
    for (let index = 0; index < 6; index += 1) {
      items.value.push(`Page ${page} · Item ${index + 1}`)
    }
    loading.value = false
    if (page >= 3) finished.value = true
  }, 500)
}
</script>

An infinite-scroll list. When the bottom sentinel comes close to the viewport, `load` fires automatically until the content fills the screen or loading is marked finished.

## Basic Usage

Use `v-model:loading` and the `load` event to fetch pages, then set `finished` once everything is loaded:

<PhonePreview>
  <MtList v-model:loading="loading" :finished="finished" @load="onLoad">
    <div
      v-for="item in items"
      :key="item"
      style="padding: 12px 16px; border-bottom: 1px solid var(--mt-border-color)"
    >
      {{ item }}
    </div>
  </MtList>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const items = ref([])
const loading = ref(false)
const finished = ref(false)

async function onLoad() {
  const page = await fetchNextPage()
  items.value.push(...page.items)
  loading.value = false
  if (page.isLast) finished.value = true
}
<\/script>

<template>
  <MtList v-model:loading="loading" :finished="finished" @load="onLoad">
    <div v-for="item in items" :key="item.id">{{ item.title }}</div>
  </MtList>
</template>
```

## Error Retry

Set `error` to `true` when a request fails. The list shows the error text; tapping it clears the error via `update:error` and triggers the load again:

```vue
<template>
  <MtList v-model:loading="loading" v-model:error="error" :finished="finished" @load="onLoad">
    <!-- ... -->
  </MtList>
</template>
```

## Interaction

- The check fires when the bottom sentinel gets within `offset` of the viewport bottom
- An initial check runs right after mount (`immediate-check`); screens that are not filled yet keep loading until they are
- After a load round settles (`loading` turns `false`), the list re-checks itself
- `load` never fires twice while `loading` / `finished` / `error` is set

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| loading / v-model:loading | Whether a load round is in progress | `boolean` | `false` |
| finished | Whether all data has been loaded | `boolean` | `false` |
| error / v-model:error | Whether the last load failed | `boolean` | `false` |
| offset | Distance from the bottom (px) that triggers the check | `number` | `300` |
| immediate-check | Whether to run an initial check after mount | `boolean` | `true` |
| loading-text | Text shown while loading | `string` | locale |
| finished-text | Text shown when finished | `string` | locale |
| error-text | Text shown on error | `string` | locale |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| load | Emitted when more data should be loaded | - |

### Slots

| Name | Description |
| --- | --- |
| default | List content |
| loading | Custom loading hint |
| finished | Custom finished hint |
| error | Custom error hint |
