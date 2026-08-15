# Cell

The basic building block for list items; composes settings pages, form groups and more.

## Basic Usage

<PhonePreview>
  <MtCellGroup>
    <MtCell title="Cell" value="Content" />
    <MtCell title="Cell" value="Content" label="Description" />
    <MtCell title="Cell" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCellGroup>
  <MtCell title="Cell" value="Content" />
  <MtCell title="Cell" value="Content" label="Description" />
</MtCellGroup>
```

## Links and Arrows

<PhonePreview>
  <MtCellGroup>
    <MtCell title="Cell" is-link />
    <MtCell title="Cell" value="Details" is-link />
    <MtCell title="Cell" is-link arrow-direction="down" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCell title="Cell" is-link />
<MtCell title="Cell" value="Details" is-link />
<MtCell title="Cell" is-link arrow-direction="down" />
```

## Icons and Form Markers

<PhonePreview>
  <MtCellGroup>
    <MtCell title="Cell" icon="success" value="Content" required />
    <MtCell title="Cell" value="Content" center label="Vertically centered" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCell title="Cell" icon="success" required />
<MtCell title="Cell" center label="Vertically centered" />
```

## Card Group

<PhonePreview>
  <MtCellGroup title="Group Title" inset>
    <MtCell title="Cell" value="Content" />
    <MtCell title="Cell" value="Content" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCellGroup title="Group Title" inset>
  <MtCell title="Cell" value="Content" />
</MtCellGroup>
```

## API

### Cell Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Left-side title | `string` | - |
| value | Right-side content | `string \| number` | - |
| label | Description below the title | `string` | - |
| icon | Left-side icon name | `string` | - |
| is-link | Shows an arrow and makes it clickable | `boolean` | `false` |
| arrow-direction | Arrow direction | `'left' \| 'right' \| 'up' \| 'down'` | `'right'` |
| center | Vertically centers content | `boolean` | `false` |
| border | Shows the bottom border | `boolean` | `true` |
| required | Shows a required asterisk before the title | `boolean` | `false` |

### Cell Events

| Event | Description | Type |
| --- | --- | --- |
| click | Emitted when the cell is clicked | `(event: MouseEvent) => void` |

### Cell Slots

| Slot | Description |
| --- | --- |
| default | Custom right-side content |
| title | Custom title |
| label | Custom description |
| icon | Custom left-side icon |
| right-icon | Custom right-side icon |

### CellGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Group title | `string` | - |
| inset | Rounded card style | `boolean` | `false` |
| border | Shows the outer border | `boolean` | `true` |
