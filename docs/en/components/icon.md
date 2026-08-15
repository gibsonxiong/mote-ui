# Icon

Icon component based on `@mote-ui/icons`, supporting built-in icon names and custom slot content.

## Basic Usage

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

The `loading` icon spins by default; other icons can opt in with `spin`.

## Sizes and Customization

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

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| name | Built-in icon name | `'arrow-left' \| 'arrow-right' \| 'arrow-up' \| 'arrow-down' \| 'close' \| 'success' \| 'loading'` | - |
| size | Icon size | `string \| number` | `'1em'` |
| color | Icon color | `string` | `'currentColor'` |
| spin | Whether it spins (loading spins by default) | `boolean` | `false` |

### Slots

| Slot | Description |
| --- | --- |
| default | Renders custom content when no name is given |
