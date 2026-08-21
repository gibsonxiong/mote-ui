# LazyLoad

Uses `IntersectionObserver` to defer rendering until the content enters the viewport, ideal for long lists and image lazy loading.

## Basic Usage

The default slot is the real content, and the `placeholder` slot is the placeholder shown before loading:

<PhonePreview>
  <div style="height: 240px; overflow: auto; color: var(--mt-text-color-secondary)">
    <div style="height: 400px; line-height: 200px; text-align: center">Scroll down to load</div>
    <MtLazyLoad>
      <div style="line-height: 48px; text-align: center">Content loaded</div>
      <template #placeholder>
        <div style="line-height: 48px; text-align: center">Loading...</div>
      </template>
    </MtLazyLoad>
  </div>
</PhonePreview>

```vue
<MtLazyLoad>
  <div>Content loaded</div>
  <template #placeholder>Loading...</template>
</MtLazyLoad>
```

## Disabled

When `disabled` is `true`, the content renders immediately:

<PhonePreview>
  <MtLazyLoad disabled>
    <div>Rendered immediately</div>
    <template #placeholder>Placeholder</template>
  </MtLazyLoad>
</PhonePreview>

```vue
<MtLazyLoad disabled>
  <div>Rendered immediately</div>
</MtLazyLoad>
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| root | The scroll container (element or selector) | `HTMLElement \| string` | - |
| root-margin | Viewport margin, same as IntersectionObserver | `string` | `'0px'` |
| threshold | Intersection ratio threshold | `number \| number[]` | `0` |
| disabled | Whether to disable lazy loading | `boolean` | `false` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| load | Emitted when content first enters the viewport | `(entry: IntersectionObserverEntry)` |

### Slots

| Name | Description |
| --- | --- |
| default | Content shown after loading |
| placeholder | Placeholder shown before loading |