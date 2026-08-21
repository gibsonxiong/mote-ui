# LazyLoad 懒加载

通过 `IntersectionObserver` 监听可视区域，内容进入视口后才渲染，适合长列表与图片懒加载场景。

## 基础用法

默认插槽为实际内容，`placeholder` 插槽为加载前的占位：

<PhonePreview>
  <div style="height: 240px; overflow: auto; color: var(--mt-text-color-secondary)">
    <div style="height: 400px; line-height: 200px; text-align: center">向下滚动加载</div>
    <MtLazyLoad>
      <div style="line-height: 48px; text-align: center">内容已加载</div>
      <template #placeholder>
        <div style="line-height: 48px; text-align: center">加载中...</div>
      </template>
    </MtLazyLoad>
  </div>
</PhonePreview>

```vue
<MtLazyLoad>
  <div>内容已加载</div>
  <template #placeholder>加载中...</template>
</MtLazyLoad>
```

## 禁用懒加载

`disabled` 为 `true` 时立即渲染内容：

<PhonePreview>
  <MtLazyLoad disabled>
    <div>立即渲染的内容</div>
    <template #placeholder>占位</template>
  </MtLazyLoad>
</PhonePreview>

```vue
<MtLazyLoad disabled>
  <div>立即渲染的内容</div>
</MtLazyLoad>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| root | 指定滚动容器（元素或选择器） | `HTMLElement \| string` | - |
| root-margin | 视口边距，与 IntersectionObserver 一致 | `string` | `'0px'` |
| threshold | 触发比例阈值 | `number \| number[]` | `0` |
| disabled | 是否禁用懒加载 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| load | 内容首次进入视口时触发 | `(entry: IntersectionObserverEntry)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 加载后显示的内容 |
| placeholder | 加载前显示的占位内容 |