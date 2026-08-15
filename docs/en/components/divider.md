# Divider

A horizontal rule that separates content.

## Basic Usage

<PhonePreview>
  <div style="background: #fff; padding: 16px">
    <div>Section one</div>
    <MtDivider />
    <div>Section two</div>
  </div>
</PhonePreview>

```vue
<MtDivider />
```

## With Text

<PhonePreview>
  <div style="background: #fff; padding: 16px">
    <MtDivider>Centered text</MtDivider>
    <MtDivider content-position="left">Left text</MtDivider>
    <MtDivider content-position="right">Right text</MtDivider>
  </div>
</PhonePreview>

```vue
<MtDivider>Centered text</MtDivider>
<MtDivider content-position="left">Left text</MtDivider>
<MtDivider content-position="right">Right text</MtDivider>
```

## Dashed

<PhonePreview>
  <div style="background: #fff; padding: 16px">
    <MtDivider dashed>Dashed style</MtDivider>
  </div>
</PhonePreview>

```vue
<MtDivider dashed>Dashed style</MtDivider>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| dashed | Whether it is dashed | `boolean` | `false` |
| content-position | Text position | `'left' \| 'center' \| 'right'` | `'center'` |

### Slots

| Slot | Description |
| --- | --- |
| default | Text on the divider |
