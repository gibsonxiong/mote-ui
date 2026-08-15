# Divider 分割线

区隔内容的水平分割线。

## 基础用法

<PhonePreview>
  <div style="background: #fff; padding: 16px">
    <div>内容区块一</div>
    <MtDivider />
    <div>内容区块二</div>
  </div>
</PhonePreview>

```vue
<MtDivider />
```

## 带文字

<PhonePreview>
  <div style="background: #fff; padding: 16px">
    <MtDivider>居中文字</MtDivider>
    <MtDivider content-position="left">左侧文字</MtDivider>
    <MtDivider content-position="right">右侧文字</MtDivider>
  </div>
</PhonePreview>

```vue
<MtDivider>居中文字</MtDivider>
<MtDivider content-position="left">左侧文字</MtDivider>
<MtDivider content-position="right">右侧文字</MtDivider>
```

## 虚线

<PhonePreview>
  <div style="background: #fff; padding: 16px">
    <MtDivider dashed>虚线样式</MtDivider>
  </div>
</PhonePreview>

```vue
<MtDivider dashed>虚线样式</MtDivider>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dashed | 是否为虚线 | `boolean` | `false` |
| content-position | 文字位置 | `'left' \| 'center' \| 'right'` | `'center'` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 分割线上的文字 |
