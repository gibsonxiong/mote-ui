# Uploader 文件上传

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
    entry.message = '上传中...'
    await new Promise((resolve) => setTimeout(resolve, 1000))
    entry.status = 'done'
    entry.message = ''
  }
}
</script>

用于将本地文件读取到待上传列表，图片自动生成本地预览；实际的上传请求由 `after-read` 钩子接管。

## 基础用法

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

## 数量与大小限制

<PhonePreview>
  <div style="padding: 16px">
    <MtUploader v-model="limitFiles" :max-count="2" :max-size="512 * 1024" multiple @oversize="handleOversize" />
  </div>
</PhonePreview>

```vue
<template>
  <!-- 超出 max-size 的文件会被跳过并触发 oversize 事件 -->
  <MtUploader v-model="files" :max-count="2" :max-size="512 * 1024" multiple @oversize="onOversize" />
</template>
```

## 自定义上传

<PhonePreview>
  <div style="padding: 16px">
    <MtUploader v-model="customFiles" :after-read="uploadFile" />
  </div>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])

// 文件被读取进列表后调用，可在此发起真实上传请求。
// Promise 被 reject 时，对应条目会被标记为 failed。
async function uploadFile(item) {
  const entries = Array.isArray(item) ? item : [item]
  for (const entry of entries) {
    entry.status = 'uploading'
    entry.message = '上传中...'
    await pushToServer(entry.file) // 你的上传逻辑
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

### MtUploaderFile 结构

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| file | 原始 File 对象 | `File` |
| url | 预览内容（data URL 或远程地址） | `string` |
| name | 文件名（非图片文件展示用） | `string` |
| status | 状态 | `'pending' \| 'uploading' \| 'done' \| 'failed'` |
| message | 状态遮罩文案（如失败原因） | `string` |

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 文件列表 | `MtUploaderFile[]` | `[]` |
| accept | 文件类型限制 | `string` | `'image/*'` |
| multiple | 允许多选 | `boolean` | `false` |
| max-count | 最大文件数量 | `number` | `Infinity` |
| max-size | 单文件大小上限（字节） | `number` | `Infinity` |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读（隐藏删除按钮） | `boolean` | `false` |
| before-read | 读取前钩子，返回 `false` 取消，返回 File / File[] 替换选择 | `(file) => boolean \| File \| File[] \| Promise` | - |
| after-read | 读取后钩子，用于自定义上传；Promise reject 会标记失败 | `(files) => void \| Promise` | - |
| capture | 透传给文件选择的 capture 属性（`'user'` 前置 / `'environment'` 后置摄像头） | `'user' \| 'environment'` | - |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| oversize | 文件超过大小时触发 | `(file: File)` |
| delete | 删除文件时触发 | `(file: MtUploaderFile, index: number)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义上传触发区内容 |
