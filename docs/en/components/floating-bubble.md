# FloatingBubble

A circular button floating above the page, with drag support and magnetic snapping.

## Basic Usage

Sits at the bottom-right by default and snaps to the nearest edge after dragging:

<PhonePreview>
  <MtFloatingBubble>+</MtFloatingBubble>
</PhonePreview>

```vue
<MtFloatingBubble>+</MtFloatingBubble>
```

## Free Dragging

`axis` controls the dragging axis; `xy` allows free movement in both directions:

<PhonePreview>
  <MtFloatingBubble axis="xy">↔</MtFloatingBubble>
</PhonePreview>

```vue
<MtFloatingBubble axis="xy">↔</MtFloatingBubble>
```

## Magnetic Snapping

`magnetic` sets the snapping axis and `gap` the distance from the screen edge:

<PhonePreview>
  <MtFloatingBubble magnetic="y" :gap="16">Y</MtFloatingBubble>
</PhonePreview>

```vue
<MtFloatingBubble magnetic="y" :gap="16">Y</MtFloatingBubble>
```

## Custom Content and Offset

Customize the content via the default slot and set an initial offset with `offset`:

<PhonePreview>
  <MtFloatingBubble :offset="{ x: 40, y: 80 }">
    <span style="font-size: 12px">Service</span>
  </MtFloatingBubble>
</PhonePreview>

```vue
<MtFloatingBubble :offset="{ x: 40, y: 80 }">
  <span style="font-size: 12px">Service</span>
</MtFloatingBubble>
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| axis | Dragging axis; `xy` allows free movement | `'x' \| 'y' \| 'xy'` | `'y'` |
| magnetic | Axis to magnetically snap after dragging | `'x' \| 'y'` | `'x'` |
| gap | Distance from the screen edge (px) | `number` | `24` |
| offset | Initial offset from the default bottom-right position | `{ x: number; y: number }` | `{ x: 0, y: 0 }` |
| teleport | Teleport target, defaults to body | `string` | `'body'` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| click | Emitted on click when not dragging | `(event: MouseEvent)` |
| offsetChange | Emitted when the offset changes after dragging | `(offset: { x: number; y: number })` |

### Slots

| Name | Description |
| --- | --- |
| default | Custom bubble content, defaults to `+` |