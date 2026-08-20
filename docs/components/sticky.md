# Sticky 粘性布局

用于将元素在滚动时固定在屏幕顶部或底部。

## 基础用法

默认吸附在顶部，`offset` 设置吸附后的偏移距离：

<PhonePreview>
  <div style="height: 240px; overflow: auto">
    <MtSticky :offset="0">
      <div style="background: var(--mt-color-primary); color: #fff; text-align: center; line-height: 44px">吸顶标题</div>
    </MtSticky>
    <div style="line-height: 32px; padding: 0 16px; color: var(--mt-text-color-secondary)">向下滚动时，上面的标题会固定在顶部。</div>
  </div>
</PhonePreview>

```vue
<MtSticky :offset="10">
  <div>吸顶内容</div>
</MtSticky>
```

## 底部吸附

`position="bottom"` 吸附在容器底部：

<PhonePreview>
  <div style="height: 240px; overflow: auto">
    <div style="line-height: 32px; padding: 0 16px; color: var(--mt-text-color-secondary)">内容区域</div>
    <MtSticky position="bottom" :offset="0">
      <div style="background: var(--mt-color-primary); color: #fff; text-align: center; line-height: 44px">吸底按钮</div>
    </MtSticky>
  </div>
</PhonePreview>

```vue
<MtSticky position="bottom" :offset="10">
  <div>吸底内容</div>
</MtSticky>
```

## 事件监听

`change` 在吸附状态变化时触发，`scroll` 在滚动时触发并携带滚动位置：

<PhonePreview>
  <div style="height: 240px; overflow: auto">
    <MtSticky @change="(fixed) => fixed && console.log('fixed')" @scroll="(top) => console.log(top)">
      <div style="background: var(--mt-color-primary); color: #fff; text-align: center; line-height: 44px">吸顶标题</div>
    </MtSticky>
    <div style="line-height: 32px; padding: 0 16px">滚动观察控制台事件。</div>
  </div>
</PhonePreview>

```vue
<MtSticky @change="onChange" @scroll="onScroll">
  <div>吸顶内容</div>
</MtSticky>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 吸附距离，`position` 为 `top` 时距离顶部、`bottom` 时距离底部 | `number` | `0` |
| position | 吸附位置 | `'top' \| 'bottom'` | `'top'` |
| target | 滚动容器选择器，不传时监听 `window` | `string` | `''` |
| z-index | 层级 | `number` | `100` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 吸附状态变化时触发 | `(fixed: boolean)` |
| scroll | 滚动时触发 | `(scrollTop: number, fixed: boolean)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 需要吸附的内容 |