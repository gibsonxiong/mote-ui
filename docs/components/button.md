# Button 按钮

用于触发一个操作，是最基础的基础组件。

<script setup>
import { ref } from 'vue'

const clickCount = ref(0)
const submitting = ref(false)

function onSubmit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
  }, 2000)
}
</script>

## 基础用法

`type` 支持 `primary` / `success` / `warning` / `danger` / `info` / `default` 六种类型：

<PhonePreview>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <MtButton type="primary">主要按钮</MtButton>
    <MtButton type="success">成功按钮</MtButton>
    <MtButton type="warning">警告按钮</MtButton>
    <MtButton type="danger">危险按钮</MtButton>
    <MtButton type="info">信息按钮</MtButton>
    <MtButton>默认按钮</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary">主要按钮</MtButton>
<MtButton type="success">成功按钮</MtButton>
<MtButton type="warning">警告按钮</MtButton>
<MtButton type="danger">危险按钮</MtButton>
<MtButton type="info">信息按钮</MtButton>
<MtButton>默认按钮</MtButton>
```

## 朴素按钮

`plain` 将按钮变为白底、彩色文字与边框的朴素样式：

<PhonePreview>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <MtButton type="primary" plain>主要按钮</MtButton>
    <MtButton type="success" plain>成功按钮</MtButton>
    <MtButton type="danger" plain>危险按钮</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" plain>主要按钮</MtButton>
<MtButton type="success" plain>成功按钮</MtButton>
<MtButton type="danger" plain>危险按钮</MtButton>
```

## 链接按钮

`link` 去除底色与边框，只保留彩色文字，适合放在文本流中的轻量操作：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 16px">
    <MtButton type="primary" link>查看详情</MtButton>
    <MtButton type="danger" link>删除</MtButton>
    <MtButton type="success" link>查看协议</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" link>查看详情</MtButton>
<MtButton type="danger" link>删除</MtButton>
<MtButton type="success" link>查看协议</MtButton>
```

## 尺寸与形状

`size` 支持 `small` / `normal` / `large`；`round` 全圆角，`block` 占满父级宽度：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start">
    <div style="display: flex; gap: 8px; align-items: center">
      <MtButton type="primary" size="small">小型按钮</MtButton>
      <MtButton type="primary">常规按钮</MtButton>
      <MtButton type="primary" size="large">大型按钮</MtButton>
    </div>
    <MtButton type="primary" round>圆角按钮</MtButton>
    <MtButton type="primary" block>块级按钮</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" size="small">小型按钮</MtButton>
<MtButton type="primary">常规按钮</MtButton>
<MtButton type="primary" size="large">大型按钮</MtButton>
<MtButton type="primary" round>圆角按钮</MtButton>
<MtButton type="primary" block>块级按钮</MtButton>
```

## 状态

`disabled` 禁用按钮，`loading` 在内容前显示旋转图标：

<PhonePreview>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <MtButton type="primary" disabled>禁用状态</MtButton>
    <MtButton type="primary" loading>加载中</MtButton>
    <MtButton type="primary" plain disabled>朴素禁用</MtButton>
    <MtButton type="primary" link disabled>链接禁用</MtButton>
    <MtButton type="primary" link loading>链接加载</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" disabled>禁用状态</MtButton>
<MtButton type="primary" loading>加载中</MtButton>
<MtButton type="primary" plain disabled>朴素禁用</MtButton>
<MtButton type="primary" link disabled>链接禁用</MtButton>
<MtButton type="primary" link loading>链接加载</MtButton>
```

## 图标按钮

通过默认插槽自定义内容，组合 `MtIcon` 使用，也支持纯图标按钮：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px">
    <MtButton type="primary" round>
      <MtIcon name="arrow-down" />
    </MtButton>
    <MtButton round>
      <MtIcon name="close" />
    </MtButton>
    <MtButton type="success" plain>
      <span style="display: inline-flex; align-items: center; gap: 4px">
        <MtIcon name="success" />
        已通过
      </span>
    </MtButton>
    <MtButton type="primary" link>
      <span style="display: inline-flex; align-items: center; gap: 2px">
        查看更多
        <MtIcon name="arrow-right" />
      </span>
    </MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" round>
  <MtIcon name="arrow-down" />
</MtButton>
<MtButton round>
  <MtIcon name="close" />
</MtButton>
<MtButton type="success" plain>
  <MtIcon name="success" />
  已通过
</MtButton>
<MtButton type="primary" link>
  查看更多
  <MtIcon name="arrow-right" />
</MtButton>
```

## 点击事件

点击触发 `click` 事件；`disabled` 或 `loading` 状态下不会触发：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MtButton type="primary" @click="clickCount++">点击 +1</MtButton>
    <div>已点击 {{ clickCount }} 次</div>
    <MtButton type="primary" disabled @click="clickCount++">禁用按钮（点击无效）</MtButton>
  </div>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const clickCount = ref(0)
<\/script>

<template>
  <MtButton type="primary" @click="clickCount++">点击 +1</MtButton>
  <div>已点击 {{ clickCount }} 次</div>
  <MtButton type="primary" disabled @click="clickCount++">禁用按钮（点击无效）</MtButton>
</template>
```

## 受控加载

用响应式变量控制 `loading`，模拟异步提交；加载中自动拦截重复点击：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px">
    <MtButton type="primary" :loading="submitting" @click="onSubmit">
      {{ submitting ? '提交中...' : '提交' }}
    </MtButton>
  </div>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const submitting = ref(false)

function onSubmit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
  }, 2000)
}
<\/script>

<template>
  <MtButton type="primary" :loading="submitting" @click="onSubmit">
    {{ submitting ? '提交中...' : '提交' }}
  </MtButton>
</template>
```

## 交互说明

- `disabled` 或 `loading` 状态下，`click` 事件不会触发
- `loading` 会在内容前渲染旋转的 loading 图标
- 点击时有轻微透明度反馈

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| native-type | 原生 button 类型 | `'button' \| 'submit' \| 'reset'` | `'button'` |
| icon | 内容前的内置图标 | `MtIconName` | - |
| size | 按钮尺寸 | `'small' \| 'normal' \| 'large'` | `'normal'` |
| plain | 是否为朴素按钮 | `boolean` | `false` |
| round | 是否为圆角按钮 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| link | 是否为链接样式（无底色无边框） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| click | 点击按钮时触发（`disabled` / `loading` 时不触发） | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
