# Button 按钮

用于触发一个操作，是最基础的基础组件。

## 基础用法

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
<template>
  <MtButton type="primary">主要按钮</MtButton>
  <MtButton type="success">成功按钮</MtButton>
  <MtButton>默认按钮</MtButton>
</template>
```

## 朴素按钮

<PhonePreview>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <MtButton type="primary" plain>主要按钮</MtButton>
    <MtButton type="danger" plain>危险按钮</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" plain>主要按钮</MtButton>
```

## 尺寸与形状

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtButton type="primary" size="small">小型按钮</MtButton>
    <MtButton type="primary" round>圆角按钮</MtButton>
    <MtButton type="primary" block>块级按钮</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" size="small">小型按钮</MtButton>
<MtButton type="primary" round>圆角按钮</MtButton>
<MtButton type="primary" block>块级按钮</MtButton>
```

## 状态

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtButton type="primary" disabled>禁用状态</MtButton>
    <MtButton type="primary" loading>加载中</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" disabled>禁用状态</MtButton>
<MtButton type="primary" loading>加载中</MtButton>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'normal' \| 'large'` | `'normal'` |
| plain | 是否为朴素按钮 | `boolean` | `false` |
| round | 是否为圆角按钮 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
