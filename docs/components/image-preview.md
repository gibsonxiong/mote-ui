# ImagePreview 图片预览

全屏预览一组图片，基于 [Swipe](/components/swipe) 实现左右滑动切换。

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

## 基础用法

`v-model` 控制显隐，点击遮罩层即可关闭：

<PhonePreview>
  <MtButton size="small" @click="showBasic = true">预览图片</MtButton>
  <MtImagePreview v-model="showBasic" :images="images" />
</PhonePreview>

```vue
<script setup>
const show = ref(false)
const images = ['https://example.com/a.jpg', 'https://example.com/b.jpg']
</script>

<template>
  <MtButton size="small" @click="show = true">预览图片</MtButton>
  <MtImagePreview v-model="show" :images="images" />
</template>
```

## 指定初始位置

`start-position` 设置首次打开时展示的图片索引：

<PhonePreview>
  <MtButton size="small" @click="openStart">从第二张开始</MtButton>
  <MtImagePreview v-model="startAtSecond" :images="images" :start-position="1" />
</PhonePreview>

```vue
<MtImagePreview v-model="show" :images="images" :start-position="1" />
```

## 关闭按钮

`closeable` 在右上角显示关闭按钮：

<PhonePreview>
  <MtButton size="small" @click="showCloseable = true">带关闭按钮</MtButton>
  <MtImagePreview v-model="showCloseable" :images="images" closeable />
</PhonePreview>

```vue
<MtImagePreview v-model="show" :images="images" closeable />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示预览 | `boolean` | `false` |
| images | 图片地址数组 | `string[]` | `[]` |
| start-position | 初始展示的图片索引 | `number` | `0` |
| show-index | 是否显示 `1 / n` 索引指示 | `boolean` | `true` |
| closeable | 是否显示关闭按钮 | `boolean` | `false` |
| close-on-overlay | 点击遮罩层是否关闭 | `boolean` | `true` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| close | 关闭预览时触发 | `(index: number)` 关闭时的图片索引 |
| change | 切换图片时触发 | `(index: number)` |
