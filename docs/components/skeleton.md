# Skeleton 骨架屏

<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>

内容加载完成前的占位骨架，带微光动画。

## 基础用法

<PhonePreview>
  <MtSkeleton />
</PhonePreview>

```vue
<MtSkeleton />
```

## 带头像与标题

<PhonePreview>
  <MtSkeleton title avatar :rows="4" />
</PhonePreview>

```vue
<MtSkeleton title avatar :rows="4" />
```

## 加载完成后展示内容

`loading` 为 `false` 时渲染插槽内容：

<PhonePreview>
  <MtButton style="margin-bottom: 12px" @click="loading = !loading">切换加载状态</MtButton>
  <MtSkeleton :loading="loading" title avatar>
    <div style="padding: 12px 0">
      <strong>真实内容</strong>
      <p style="margin: 8px 0 0; color: var(--mt-text-color-regular)">数据加载完成后展示的正文内容。</p>
    </div>
  </MtSkeleton>
</PhonePreview>

```vue
<script setup>
const loading = ref(true)
</script>

<template>
  <MtSkeleton :loading="loading" title avatar>
    <div>真实内容...</div>
  </MtSkeleton>
</template>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 显示骨架屏，`false` 时渲染插槽内容 | `boolean` | `true` |
| rows | 段落行数 | `number` | `3` |
| title | 显示标题行 | `boolean` | `false` |
| avatar | 显示头像占位 | `boolean` | `false` |
| round | 段落行圆角 | `boolean` | `false` |
| animate | 微光动画 | `boolean` | `true` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 加载完成后的真实内容 |
