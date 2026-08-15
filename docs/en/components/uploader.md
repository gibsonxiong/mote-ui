# Uploader

<script setup>
import { ref } from 'vue'

const basicFiles = ref([])
const limitFiles = ref([])
const customFiles = ref([])

function handleOversize() {
  console.log('file oversize')
}

async function uploadFile(item) {
  const entries = Array.isArray(item) ? item : [item]
  for (const entry of entries) {
    entry.status = 'uploading'
    entry.message = 'Uploading...'
    await new Promise((resolve) => setTimeout(resolve, 1000))
    entry.status = 'done'
    entry.message = ''
  }
}
</script>

Reads local files into a pending-upload list with automatic image previews; the real upload request is driven by the `after-read` hook.

## Basic Usage

<PhonePreview>
  <div style="padding: 16px">
    <MtUploader v-model="basicFiles" />
  </div>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <MtUploader v-model="files" />
</template>
```

## Count and Size Limits

<PhonePreview>
  <div style="padding: 16px">
    <MtUploader v-model="limitFiles" :max-count="2" :max-size="512 * 1024" multiple @oversize="handleOversize" />
  </div>
</PhonePreview>

```vue
<template>
  <!-- Files above max-size are skipped and trigger the oversize event -->
  <MtUploader v-model="files" :max-count="2" :max-size="512 * 1024" multiple @oversize="onOversize" />
</template>
```

## Custom Upload

<PhonePreview>
  <div style="padding: 16px">
    <MtUploader v-model="customFiles" :after-read="uploadFile" />
  </div>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])

// Called after files are read into the list — run your real upload here.
// A rejected Promise marks the affected entries as failed.
async function uploadFile(item) {
  const entries = Array.isArray(item) ? item : [item]
  for (const entry of entries) {
    entry.status = 'uploading'
    entry.message = 'Uploading...'
    await pushToServer(entry.file) // your upload logic
    entry.status = 'done'
    entry.message = ''
  }
}
</script>

<template>
  <MtUploader v-model="files" :after-read="uploadFile" />
</template>
```

## API

### MtUploaderFile Structure

| Field | Description | Type |
| --- | --- | --- |
| file | The original File object | `File` |
| url | Preview content (data URL or remote URL) | `string` |
| name | File name (shown for non-image files) | `string` |
| status | Status | `'pending' \| 'uploading' \| 'done' \| 'failed'` |
| message | Overlay message (e.g. the failure reason) | `string` |

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | File list | `MtUploaderFile[]` | `[]` |
| accept | File type restriction | `string` | `'image/*'` |
| multiple | Allows selecting multiple files | `boolean` | `false` |
| max-count | Maximum number of files | `number` | `Infinity` |
| max-size | Maximum size per file, in bytes | `number` | `Infinity` |
| disabled | Disables the uploader | `boolean` | `false` |
| readonly | Read only (hides delete buttons) | `boolean` | `false` |
| before-read | Hook before reading; return `false` to cancel or a File / File[] to replace the selection | `(file) => boolean \| File \| File[] \| Promise` | - |
| after-read | Hook after reading for custom uploads; a rejected Promise marks files as failed | `(files) => void \| Promise` | - |
| capture | Capture attribute passed to the file input (`'user'` front / `'environment'` back camera) | `'user' \| 'environment'` | - |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| oversize | Emitted when a file exceeds max-size | `(file: File)` |
| delete | Emitted when a file is deleted | `(file: MtUploaderFile, index: number)` |

### Slots

| Slot | Description |
| --- | --- |
| default | Custom content for the upload trigger area |
