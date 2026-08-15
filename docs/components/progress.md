# Progress 进度条

用于展示操作的当前进度。

## 基础用法

`percentage` 设置进度百分比（0-100，超出会被裁剪）：

<PhonePreview>
  <MtProgress :percentage="50" />
</PhonePreview>

```vue
<MtProgress :percentage="50" />
```

## 状态色

`status` 提供语义化颜色：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MtProgress :percentage="100" status="success" />
    <MtProgress :percentage="30" status="danger" />
  </div>
</PhonePreview>

```vue
<MtProgress :percentage="100" status="success" />
<MtProgress :percentage="30" status="danger" />
```

## 自定义样式

`color` 自定义进度条颜色（优先于 `status`），`stroke-width` 调整高度，`show-text` 隐藏百分比文案：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MtProgress :percentage="60" color="var(--mt-color-warning)" />
    <MtProgress :percentage="40" :stroke-width="10" :show-text="false" />
  </div>
</PhonePreview>

```vue
<MtProgress :percentage="60" color="var(--mt-color-warning)" />
<MtProgress :percentage="40" :stroke-width="10" :show-text="false" />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 进度百分比（0-100） | `number` | `0` |
| stroke-width | 进度条高度（px） | `number` | `4` |
| color | 进度条颜色，优先于 `status` | `string` | - |
| status | 语义化状态 | `'success' \| 'danger'` | - |
| show-text | 是否显示百分比文案 | `boolean` | `true` |
