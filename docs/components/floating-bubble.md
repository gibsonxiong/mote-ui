# FloatingBubble 悬浮气泡

悬浮在页面上的圆形按钮，支持拖拽与磁性吸附。

## 基础用法

默认吸附于右下角，拖拽松手后自动吸附到最近边缘：

<PhonePreview>
  <MtFloatingBubble>+</MtFloatingBubble>
</PhonePreview>

```vue
<MtFloatingBubble>+</MtFloatingBubble>
```

## 自由拖拽

`axis` 控制拖拽轴向，`xy` 允许任意方向拖拽：

<PhonePreview>
  <MtFloatingBubble axis="xy">↔</MtFloatingBubble>
</PhonePreview>

```vue
<MtFloatingBubble axis="xy">↔</MtFloatingBubble>
```

## 磁性吸附

`magnetic` 设置吸附轴向，`gap` 设置距屏幕边缘距离：

<PhonePreview>
  <MtFloatingBubble magnetic="y" :gap="16">Y</MtFloatingBubble>
</PhonePreview>

```vue
<MtFloatingBubble magnetic="y" :gap="16">Y</MtFloatingBubble>
```

## 自定义内容与偏移

通过默认插槽自定义内容，`offset` 设置相对右下角的初始偏移：

<PhonePreview>
  <MtFloatingBubble :offset="{ x: 40, y: 80 }">
    <span style="font-size: 12px">客服</span>
  </MtFloatingBubble>
</PhonePreview>

```vue
<MtFloatingBubble :offset="{ x: 40, y: 80 }">
  <span style="font-size: 12px">客服</span>
</MtFloatingBubble>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| axis | 拖拽轴向，`xy` 为自由移动 | `'x' \| 'y' \| 'xy'` | `'y'` |
| magnetic | 拖拽结束后磁性吸附的轴向 | `'x' \| 'y'` | `'x'` |
| gap | 距屏幕边缘距离（px） | `number` | `24` |
| offset | 相对默认右下角位置的初始偏移 | `{ x: number; y: number }` | `{ x: 0, y: 0 }` |
| teleport | 传送目标，默认挂载到 body | `string` | `'body'` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 未拖拽时点击触发 | `(event: MouseEvent)` |
| offsetChange | 拖拽结束偏移变化时触发 | `(offset: { x: number; y: number })` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义气泡内容，默认显示 `+` |