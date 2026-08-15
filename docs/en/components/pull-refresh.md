# PullRefresh

<script setup>
import { ref } from 'vue'

const refreshing = ref(false)
const refreshCount = ref(0)

function onRefresh() {
  setTimeout(() => {
    refreshCount.value += 1
    refreshing.value = false
  }, 1000)
}
</script>

Pull down at the top of a list to trigger a refresh. Usually combined with the infinite-scroll List.

## Basic Usage

Bind the refresh state with `v-model:loading`. Releasing after pulling past the head height fires `refresh`:

<PhonePreview>
  <MtPullRefresh v-model:loading="refreshing" @refresh="onRefresh">
    <div style="padding: 16px; text-align: center; color: var(--mt-text-color-secondary)">
      Pull down to try (refreshed {{ refreshCount }} times)
    </div>
  </MtPullRefresh>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)

async function onRefresh() {
  await reloadFirstPage()
  loading.value = false
}
<\/script>

<template>
  <MtPullRefresh v-model:loading="loading" @refresh="onRefresh">
    <!-- list content -->
  </MtPullRefresh>
</template>
```

## Combined With List

```vue
<template>
  <MtPullRefresh v-model:loading="refreshing" @refresh="onRefresh">
    <MtList v-model:loading="loading" :finished="finished" @load="onLoad">
      <!-- ... -->
    </MtList>
  </MtPullRefresh>
</template>
```

## Interaction

- Pulling only works while the container is scrolled to the top
- Once the pull distance exceeds `head-height` the hint switches to "release to refresh"; releasing starts loading
- When loading settles (`loading` turns `false`), a success hint flashes before collapsing; tune it with `success-duration`, or set it to 0 to skip
- The `head` slot customizes the whole hint area; the slot prop `status` exposes the current state

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| loading / v-model:loading | Whether a refresh round is in progress | `boolean` | `false` |
| head-height | Distance from the top (px) that triggers a refresh | `number` | `50` |
| success-duration | How long the success hint stays visible (ms); hidden when not positive | `number` | `500` |
| success-text | Custom success text | `string` | locale |
| disabled | Whether pulling is disabled | `boolean` | `false` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| refresh | Emitted when a release triggers the refresh | - |

### Slots

| Name | Description |
| --- | --- |
| default | Content area |
| head | Custom hint area; slot prop: `status` (`pulling` / `loosing` / `loading` / `success`) |
