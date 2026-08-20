# Sticky

Fixes an element to the top or bottom of the screen while scrolling.

## Basic Usage

Sticks to the top by default; `offset` sets the distance after sticking:

<PhonePreview>
  <div style="height: 240px; overflow: auto">
    <MtSticky :offset="0">
      <div style="background: var(--mt-color-primary); color: #fff; text-align: center; line-height: 44px">Sticky Title</div>
    </MtSticky>
    <div style="line-height: 32px; padding: 0 16px; color: var(--mt-text-color-secondary)">Scroll down and the title sticks to the top.</div>
  </div>
</PhonePreview>

```vue
<MtSticky :offset="10">
  <div>Sticky content</div>
</MtSticky>
```

## Sticky Bottom

`position="bottom"` sticks to the bottom of the container:

<PhonePreview>
  <div style="height: 240px; overflow: auto">
    <div style="line-height: 32px; padding: 0 16px; color: var(--mt-text-color-secondary)">Content area</div>
    <MtSticky position="bottom" :offset="0">
      <div style="background: var(--mt-color-primary); color: #fff; text-align: center; line-height: 44px">Sticky Button</div>
    </MtSticky>
  </div>
</PhonePreview>

```vue
<MtSticky position="bottom" :offset="10">
  <div>Sticky content</div>
</MtSticky>
```

## Events

`change` fires when the sticky state changes, `scroll` fires on scroll with the scroll position:

<PhonePreview>
  <div style="height: 240px; overflow: auto">
    <MtSticky @change="(fixed) => fixed && console.log('fixed')" @scroll="(top) => console.log(top)">
      <div style="background: var(--mt-color-primary); color: #fff; text-align: center; line-height: 44px">Sticky Title</div>
    </MtSticky>
    <div style="line-height: 32px; padding: 0 16px">Scroll and watch the console.</div>
  </div>
</PhonePreview>

```vue
<MtSticky @change="onChange" @scroll="onScroll">
  <div>Sticky content</div>
</MtSticky>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| offset | Sticking distance — from the top when `position` is `top`, from the bottom when `bottom` | `number` | `0` |
| position | Sticking position | `'top' \| 'bottom'` | `'top'` |
| target | Scroll container selector; listens to `window` when omitted | `string` | `''` |
| z-index | z-index | `number` | `100` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the sticky state changes | `(fixed: boolean)` |
| scroll | Emitted on scroll | `(scrollTop: number, fixed: boolean)` |

### Slots

| Name | Description |
| --- | --- |
| default | The content to stick |