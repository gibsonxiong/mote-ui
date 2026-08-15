# Loading 加载

加载图标，用于表示加载中的过渡状态。

## 基础用法

默认渲染圆形加载动画：

<PhonePreview>
  <MtLoading />
</PhonePreview>

```vue
<MtLoading />
```

## 加载类型

`type` 支持 `circular`（默认）与 `spinner` 两种样式：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 24px">
    <MtLoading />
    <MtLoading type="spinner" />
  </div>
</PhonePreview>

```vue
<MtLoading type="circular" />
<MtLoading type="spinner" />
```

## 文案与垂直排列

通过 `text` 设置描述文案，`vertical` 让文案位于图标下方：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 24px">
    <MtLoading text="加载中..." />
    <MtLoading vertical text="加载中...">
    </MtLoading>
  </div>
</PhonePreview>

```vue
<MtLoading text="加载中..." />
<MtLoading vertical text="加载中..." />
```

## 自定义颜色与大小

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 24px">
    <MtLoading :size="40" />
    <MtLoading color="var(--mt-color-success)" text="绿色加载" />
  </div>
</PhonePreview>

```vue
<MtLoading :size="40" />
<MtLoading color="var(--mt-color-success)" text="绿色加载" />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 加载图标类型 | `'circular' \| 'spinner'` | `'circular'` |
| size | 图标大小（px） | `number` | `30` |
| text | 描述文案 | `string` | - |
| vertical | 文案是否位于图标下方 | `boolean` | `false` |
| color | 图标与文案颜色 | `string` | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义描述文案，优先于 `text` |
