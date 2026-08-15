# NoticeBar 通知栏

用于循环播放展示一组消息通知。

## 基础用法

默认单行展示，超出部分省略：

<PhonePreview>
  <MtNoticeBar text="这是一条通知消息，文本过长时会以省略号截断。" />
</PhonePreview>

```vue
<MtNoticeBar text="这是一条通知消息，文本过长时会以省略号截断。" />
```

## 滚动播放

`scrollable` 开启横向滚动，`speed` 控制滚动速度（px/s）：

<PhonePreview>
  <MtNoticeBar scrollable :speed="40" text="开启滚动后文本会横向循环播放，适合展示较长的公告内容。" />
</PhonePreview>

```vue
<MtNoticeBar scrollable :speed="40" text="开启滚动后文本会横向循环播放，适合展示较长的公告内容。" />
```

## 多行展示

`wrapable` 关闭省略与滚动，允许文本换行：

<PhonePreview>
  <MtNoticeBar wrapable text="开启换行后，较长的通知文本会自动折行为多行展示，适合展示较长的公告内容。" />
</PhonePreview>

```vue
<MtNoticeBar wrapable text="开启换行后，较长的通知文本会自动折行为多行展示。" />
```

## 左侧图标与可关闭

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtNoticeBar left-icon="success" text="带左侧图标的通知" />
    <MtNoticeBar closeable text="点击右侧图标可关闭通知" />
  </div>
</PhonePreview>

```vue
<MtNoticeBar left-icon="success" text="带左侧图标的通知" />
<MtNoticeBar closeable text="点击右侧图标可关闭通知" />
```

## 自定义样式

<PhonePreview>
  <MtNoticeBar color="#fff" background="var(--mt-color-primary)" text="自定义颜色的通知栏" />
</PhonePreview>

```vue
<MtNoticeBar color="#fff" background="var(--mt-color-primary)" text="自定义颜色的通知栏" />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 通知文本 | `string` | - |
| scrollable | 是否开启横向滚动 | `boolean` | `false` |
| speed | 滚动速度（px/s） | `number` | `60` |
| left-icon | 左侧图标名称 | `MtIconName` | - |
| closeable | 是否显示关闭按钮 | `boolean` | `false` |
| wrapable | 是否允许文本换行 | `boolean` | `false` |
| color | 文本颜色 | `string` | - |
| background | 背景颜色 | `string` | - |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| close | 点击关闭按钮 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 通知内容，优先于 `text` |
| right-icon | 自定义右侧图标（默认关闭按钮） |
