# BackTop

A floating button that appears after scrolling past a given distance and smoothly scrolls back to the top when tapped.

## Basic Usage

Tracks window scrolling by default and appears once the scroll distance exceeds `visibility-height`:

```vue
<template>
  <MtBackTop />
</template>
```

## Custom Scroll Target

Pass a CSS selector or an element to `target` to track a local scroll container:

<div
  id="backtop-demo"
  style="position: relative; height: 200px; overflow-y: auto; border: 1px solid var(--mt-border-color); border-radius: 8px; padding: 12px 16px"
>
  <p v-for="index in 20" :key="index" style="margin: 0 0 8px">Row {{ index }}, keep scrolling down</p>
  <MtBackTop target="#backtop-demo" :right="12" :bottom="12" />
</div>

```vue
<template>
  <div id="scroller" style="height: 300px; overflow-y: auto; position: relative">
    <!-- long content -->
    <MtBackTop target="#scroller" :right="12" :bottom="12" />
  </div>
</template>
```

## Custom Content

The default content is an up-arrow icon; replace it through the default slot:

```vue
<template>
  <MtBackTop>Back to top</MtBackTop>
</template>
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| target | Scrolling element to track: CSS selector or element; defaults to window | `string \| HTMLElement` | - |
| visibility-height | Scroll distance (px) needed to show the button | `number` | `200` |
| right | Offset from the right edge of the viewport (px) | `number` | `24` |
| bottom | Offset from the bottom edge of the viewport (px) | `number` | `48` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| click | Emitted when the button is tapped | `(event: MouseEvent)` |

### Slots

| Name | Description |
| --- | --- |
| default | Custom button content |
