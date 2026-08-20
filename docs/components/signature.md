# Signature 签名

<script setup>
import { ref } from 'vue'

const sigRef = ref()
</script>

用于手写签名的画板，支持笔迹绘制与图片导出。

## 基础用法

默认提供清除与确认按钮，`confirm` 时可通过 `submit` 事件拿到画布与图片数据：

<PhonePreview>
  <div style="padding: 16px">
    <MtSignature ref="sigRef" tips="请在白色区域内签名" />
  </div>
</PhonePreview>

```vue
<template>
  <MtSignature ref="sigRef" @submit="onSubmit" />
</template>

<script setup>
import { ref } from 'vue'

const onSubmit = ({ image }) => {
  console.log(image)
}
<\/script>
```

## 自定义笔触

`pen-color`、`line-width`、`background-color` 自定义笔迹与画布：

<PhonePreview>
  <div style="padding: 16px">
    <MtSignature pen-color="#409eff" :line-width="4" background-color="#f5f7fa" />
  </div>
</PhonePreview>

```vue
<MtSignature pen-color="#409eff" :line-width="4" />
```

## 自定义按钮文案

`clear-button-text`、`confirm-button-text` 覆盖默认文案；不传时读取当前语言包：

<PhonePreview>
  <div style="padding: 16px">
    <MtSignature clear-button-text="重写" confirm-button-text="完成" />
  </div>
</PhonePreview>

```vue
<MtSignature clear-button-text="重写" confirm-button-text="完成" />
```

## 通过方法操作

通过 ref 调用 `resize`、`clear`、`submit` 方法：

<PhonePreview>
  <div style="padding: 16px">
    <MtSignature ref="sigRef" />
    <div style="display: flex; gap: 8px; margin-top: 12px">
      <MtButton size="small" @click="sigRef?.clear()">清空</MtButton>
      <MtButton size="small" @click="sigRef?.submit()">确认</MtButton>
    </div>
  </div>
</PhonePreview>

```vue
<template>
  <MtSignature ref="sigRef" />
  <MtButton @click="sigRef?.clear()">清空</MtButton>
</template>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 导出图片类型 | `'png' \| 'jpg'` | `'png'` |
| pen-color | 笔迹颜色 | `string` | `'#000'` |
| line-width | 笔迹宽度 | `number` | `3` |
| background-color | 画布背景色 | `string` | `''` |
| tips | 提示文案 | `string` | - |
| clear-button-text | 清除按钮文案 | `string` | 语言包 `signature.clear` |
| confirm-button-text | 确认按钮文案 | `string` | 语言包 `common.confirm` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始签名时触发 | `(event: PointerEvent)` |
| end | 结束签名时触发 | - |
| signing | 签名过程中触发 | `(signing: boolean)` |
| submit | 点击确认按钮时触发 | `(content: { canvas, image })` |
| clear | 点击清除按钮时触发 | - |

### Methods

| 名称 | 说明 |
| --- | --- |
| resize | 调整画布尺寸以填满容器 |
| clear | 清空签名内容 |
| submit | 导出画布并触发 `submit` 事件 |