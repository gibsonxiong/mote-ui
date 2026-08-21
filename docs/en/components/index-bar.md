# IndexBar

An alphabetical index for contacts, city lists, and similar scenarios. Clicking a letter on the right jumps to the corresponding anchor.

## Basic Usage

Uses `A-Z` as the default index list:

<PhonePreview>
  <MtIndexBar>
    <MtIndexAnchor index="A">Apple</MtIndexAnchor>
    <MtIndexAnchor index="B">Banana</MtIndexAnchor>
    <MtIndexAnchor index="C">Cherry</MtIndexAnchor>
    <MtIndexAnchor index="D">Durian</MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar>
  <MtIndexAnchor index="A">Apple</MtIndexAnchor>
  <MtIndexAnchor index="B">Banana</MtIndexAnchor>
  <MtIndexAnchor index="C">Cherry</MtIndexAnchor>
  <MtIndexAnchor index="D">Durian</MtIndexAnchor>
</MtIndexBar>
```

## Custom Index List

Use `index-list` to define custom index characters:

<PhonePreview>
  <MtIndexBar :index-list="['Hot', 'New', 'Top', 'Pick']">
    <MtIndexAnchor index="Hot">Hot Topics</MtIndexAnchor>
    <MtIndexAnchor index="New">New Arrivals</MtIndexAnchor>
    <MtIndexAnchor index="Top">Editor's Pick</MtIndexAnchor>
    <MtIndexAnchor index="Pick">For You</MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar :index-list="['Hot', 'New', 'Top', 'Pick']">
  <MtIndexAnchor index="Hot">Hot Topics</MtIndexAnchor>
  <MtIndexAnchor index="New">New Arrivals</MtIndexAnchor>
  <MtIndexAnchor index="Top">Editor's Pick</MtIndexAnchor>
  <MtIndexAnchor index="Pick">For You</MtIndexAnchor>
</MtIndexBar>
```

## Sticky and Offset

`sticky` controls whether anchor headers stick while scrolling, and `sticky-offset-top` sets the sticky offset:

<PhonePreview>
  <MtIndexBar :sticky="true" :sticky-offset-top="0">
    <MtIndexAnchor index="A">Apple</MtIndexAnchor>
    <MtIndexAnchor index="B">Banana</MtIndexAnchor>
    <MtIndexAnchor index="C">Cherry</MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar :sticky-offset-top="0">
  <MtIndexAnchor index="A">Apple</MtIndexAnchor>
  <MtIndexAnchor index="B">Banana</MtIndexAnchor>
  <MtIndexAnchor index="C">Cherry</MtIndexAnchor>
</MtIndexBar>
```

## Highlight Color

`highlight-color` customizes the color of the active index and anchor header:

<PhonePreview>
  <MtIndexBar highlight-color="#07c160">
    <MtIndexAnchor index="A">Apple</MtIndexAnchor>
    <MtIndexAnchor index="B">Banana</MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar highlight-color="#07c160">
  <MtIndexAnchor index="A">Apple</MtIndexAnchor>
  <MtIndexAnchor index="B">Banana</MtIndexAnchor>
</MtIndexBar>
```

## API

### IndexBar Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| index-list | Index character list | `(string \| number)[]` | `A-Z` |
| z-index | Stacking order of sidebar and sticky headers | `number` | `1` |
| sticky | Whether anchor headers stick while scrolling | `boolean` | `true` |
| sticky-offset-top | Sticky offset from the top (px) | `number` | `0` |
| highlight-color | Highlight color of the active index and anchor | `string` | - |

### IndexBar Events

| Name | Description | Arguments |
| --- | --- | --- |
| select | Emitted when an index is clicked | `(index: string \| number)` |
| change | Emitted when the active index changes | `(index: string \| number)` |

### IndexBar Methods

Available through the component instance:

| Method | Description | Arguments |
| --- | --- | --- |
| scrollTo | Scroll to the anchor of a given index | `(index: string \| number)` |

### IndexAnchor Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| index | Index character of the anchor | `string \| number` | - |