# Icon 图标

基于 `@mote-ui/icons` 的图标组件，支持内置图标名与自定义插槽内容。

## 基础用法

<PhonePreview>
  <div style="display: flex; gap: 16px; font-size: 24px">
    <MtIcon name="arrow-left" />
    <MtIcon name="arrow-right" />
    <MtIcon name="arrow-up" />
    <MtIcon name="arrow-down" />
    <MtIcon name="close" />
    <MtIcon name="success" color="var(--mt-color-success)" />
    <MtIcon name="loading" />
  </div>
</PhonePreview>

```vue
<MtIcon name="success" color="var(--mt-color-success)" />
<MtIcon name="loading" />
```

`loading` 图标默认旋转；其他图标可通过 `spin` 开启。

## 尺寸与自定义

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 16px">
    <MtIcon name="success" size="16" color="var(--mt-color-success)" />
    <MtIcon name="success" size="28" color="var(--mt-color-success)" />
    <MtIcon name="success" size="40" color="var(--mt-color-success)" spin />
  </div>
</PhonePreview>

```vue
<MtIcon name="success" size="28" />
```

## 自定义插槽

未指定 `name` 时渲染默认插槽内容：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 16px">
    <MtIcon>
      <span style="font-size: 20px">🎉</span>
    </MtIcon>
    <MtIcon>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    </MtIcon>
  </div>
</PhonePreview>

```vue
<MtIcon>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
</MtIcon>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 内置图标名 | `'arrow-left' \| 'arrow-right' \| 'arrow-up' \| 'arrow-down' \| 'close' \| 'success' \| 'loading'` | - |
| size | 图标尺寸 | `string \| number` | `'1em'` |
| color | 图标颜色 | `string` | `'currentColor'` |
| spin | 是否旋转（loading 默认旋转） | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 未指定 name 时渲染自定义内容 |
