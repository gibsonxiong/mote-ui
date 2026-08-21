# Button

Triggers an action — the most fundamental building block.

## Basic Usage

<PhonePreview>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <MtButton type="primary">Primary</MtButton>
    <MtButton type="success">Success</MtButton>
    <MtButton type="warning">Warning</MtButton>
    <MtButton type="danger">Danger</MtButton>
    <MtButton type="info">Info</MtButton>
    <MtButton>Default</MtButton>
  </div>
</PhonePreview>

```vue
<template>
  <MtButton type="primary">Primary</MtButton>
  <MtButton type="success">Success</MtButton>
  <MtButton>Default</MtButton>
</template>
```

## Plain Buttons

<PhonePreview>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <MtButton type="primary" plain>Primary</MtButton>
    <MtButton type="danger" plain>Danger</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" plain>Primary</MtButton>
```

## Sizes and Shapes

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtButton type="primary" size="small">Small</MtButton>
    <MtButton type="primary" round>Rounded</MtButton>
    <MtButton type="primary" block>Block</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" size="small">Small</MtButton>
<MtButton type="primary" round>Rounded</MtButton>
<MtButton type="primary" block>Block</MtButton>
```

## States

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtButton type="primary" disabled>Disabled</MtButton>
    <MtButton type="primary" loading>Loading</MtButton>
  </div>
</PhonePreview>

```vue
<MtButton type="primary" disabled>Disabled</MtButton>
<MtButton type="primary" loading>Loading</MtButton>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Button type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| native-type | Native button type | `'button' \| 'submit' \| 'reset'` | `'button'` |
| icon | Built-in icon before the content | `MtIconName` | - |
| size | Button size | `'small' \| 'normal' \| 'large'` | `'normal'` |
| plain | Whether it is a plain button | `boolean` | `false` |
| round | Whether it has rounded corners | `boolean` | `false` |
| block | Whether it spans the full width | `boolean` | `false` |
| disabled | Whether it is disabled | `boolean` | `false` |
| loading | Whether it shows a loading state | `boolean` | `false` |

### Events

| Event | Description | Type |
| --- | --- | --- |
| click | Emitted when the button is clicked | `(event: MouseEvent) => void` |

### Slots

| Slot | Description |
| --- | --- |
| default | Button content |
