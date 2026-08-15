# Image

<script setup>
const brokenSrc = 'https://example.com/not-exist.png'
const demoSrc = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#409eff"/><text x="100" y="106" font-size="20" fill="#fff" text-anchor="middle">Mote UI</text></svg>')
</script>

An enhanced image component with loading/error placeholders, fit modes, radius and lazy loading.

## Basic Usage

Shows a loading icon while loading and a "Load failed" placeholder on error:

<PhonePreview>
  <div style="display: flex; gap: 12px">
    <MtImage :src="demoSrc" width="80" height="80" />
    <MtImage :src="brokenSrc" width="80" height="80" />
  </div>
</PhonePreview>

```vue
<MtImage src="https://example.com/a.png" width="80" height="80" />
```

## Fit Modes

`fit` maps to the five values of CSS `object-fit`:

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtImage v-for="fit in ['contain', 'cover', 'fill', 'none', 'scale-down']" :key="fit" :src="demoSrc" :fit="fit" width="56" height="56" />
  </div>
</PhonePreview>

```vue
<MtImage src="..." fit="contain" />
```

## Radius and Circle

<PhonePreview>
  <div style="display: flex; gap: 12px">
    <MtImage :src="demoSrc" width="80" height="80" radius="8" />
    <MtImage :src="demoSrc" width="80" height="80" round />
  </div>
</PhonePreview>

```vue
<MtImage src="..." radius="8" />
<MtImage src="..." round />
```

## Lazy Loading

`lazy-load` is based on IntersectionObserver — the image starts loading when it enters the viewport (50px ahead). It falls back to immediate loading when the API is unavailable:

```vue
<MtImage src="..." lazy-load />
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| src | Image source | `string` | - |
| alt | Alternative text | `string` | - |
| fit | Fit mode | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| block | Renders as a block element | `boolean` | `false` |
| width | Width; numbers get `px` appended | `number \| string` | - |
| height | Height; numbers get `px` appended | `number \| string` | - |
| radius | Border radius; numbers get `px` appended | `number \| string` | - |
| round | Renders as a circle | `boolean` | `false` |
| lazy-load | Lazy loading | `boolean` | `false` |
| show-loading | Shows the loading placeholder | `boolean` | `true` |
| show-error | Shows the error placeholder | `boolean` | `true` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| load | Emitted when the image loads | `(event: Event)` |
| error | Emitted when the image fails to load | `(event: Event)` |

### Slots

| Slot | Description |
| --- | --- |
| loading | Custom loading placeholder |
| error | Custom error placeholder |
