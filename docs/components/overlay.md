# Overlay 遮罩层

<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

创建一个覆盖层，用于强调特定元素或阻止用户操作，常作为弹层类组件的基础。

## 基础用法

`v-model` 控制显隐，点击遮罩触发 `click` 事件：

<PhonePreview>
  <div style="padding: 16px">
    <MtButton @click="show = true">显示遮罩</MtButton>
    <MtOverlay v-model="show" @click="show = false" />
  </div>
</PhonePreview>

```vue
<template>
  <MtButton @click="show = true">显示遮罩</MtButton>
  <MtOverlay v-model="show" @click="show = false" />
</template>
```

## 自定义层级

未指定 `z-index` 时自动递增；`z-index` 可手动指定：

<PhonePreview>
  <div style="padding: 16px">
    <MtButton @click="show = true">显示遮罩</MtButton>
    <MtOverlay v-model="show" :z-index="3000" @click="show = false" />
  </div>
</PhonePreview>

```vue
<MtOverlay v-model="show" :z-index="3000" />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 是否显示遮罩 | `boolean` | `false` |
| z-index | 层级 | `number` | 自动递增 |
| duration | 淡入淡出动画时长，单位 ms | `number` | `300` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击遮罩时触发 | `(event: MouseEvent)` |