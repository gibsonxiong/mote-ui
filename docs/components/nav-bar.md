# NavBar 导航栏

<script setup>
import { showToast } from 'mote-ui'
</script>

页面顶部的导航栏，提供标题、返回与右侧操作区。

## 基础用法

<PhonePreview>
  <MtNavBar
    title="标题"
    left-text="返回"
    left-arrow
    right-text="更多"
    @click-left="showToast('点击了返回')"
    @click-right="showToast('点击了更多')"
  />
</PhonePreview>

```vue
<template>
  <MtNavBar
    title="标题"
    left-text="返回"
    left-arrow
    right-text="更多"
    @click-left="onBack"
    @click-right="onMore"
  />
</template>
```

## 自定义插槽

`left` / `title` / `right` 三个插槽可完全自定义各区域内容：

<PhonePreview>
  <MtNavBar>
    <template #left>
      <MtIcon name="close" />
    </template>
    <template #title>
      <span style="color: var(--mt-color-primary)">自定义标题</span>
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
  <template #title>自定义标题</template>
  <template #right>
    <MtIcon name="arrow-right" />
  </template>
</MtNavBar>
```

## 固定定位

`fixed` 固定在页面顶部，配合 `placeholder` 自动渲染占位元素避免内容被遮挡；`safe-area-inset-top` 适配刘海屏顶部安全区：

```vue
<MtNavBar title="固定导航" fixed placeholder safe-area-inset-top />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题文字 | `string` | - |
| left-text | 左侧按钮文字 | `string` | - |
| right-text | 右侧按钮文字 | `string` | - |
| left-arrow | 显示左侧箭头 | `boolean` | `false` |
| right-arrow | 显示右侧箭头 | `boolean` | `false` |
| border | 显示底部边框 | `boolean` | `true` |
| fixed | 固定在页面顶部 | `boolean` | `false` |
| placeholder | fixed 时渲染占位元素 | `boolean` | `false` |
| safe-area-inset-top | 顶部安全区适配 | `boolean` | `false` |
| z-index | 自定义层级 | `number` | - |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| click-left | 点击左侧区域 | `(event: MouseEvent)` |
| click-right | 点击右侧区域 | `(event: MouseEvent)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题 |
| left | 自定义左侧区域 |
| right | 自定义右侧区域 |
