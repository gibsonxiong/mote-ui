# Highlight

Highlights specified keywords within text, with support for multiple keywords and custom styles.

## Basic Usage

`text` is the full text and `keywords` the keywords to highlight:

<PhonePreview>
  <MtHighlight text="mote-ui is a mobile Vue 3 component library" keywords="component" />
</PhonePreview>

```vue
<MtHighlight text="mote-ui is a mobile Vue 3 component library" keywords="component" />
```

## Multiple Keywords

`keywords` accepts an array to highlight several keywords at once:

<PhonePreview>
  <MtHighlight text="mote-ui is a mobile Vue 3 component library" :keywords="['mote-ui', 'Vue']" />
</PhonePreview>

```vue
<MtHighlight
  text="mote-ui is a mobile Vue 3 component library"
  :keywords="['mote-ui', 'Vue']"
/>
```

## Custom Styles

`highlight-style` and `highlight-class` customize the highlighted snippets:

<PhonePreview>
  <MtHighlight
    text="Custom highlight style"
    keywords="highlight"
    :highlight-style="{ color: 'var(--mt-color-danger)' }"
  />
</PhonePreview>

```vue
<MtHighlight
  text="Custom highlight style"
  keywords="highlight"
  :highlight-style="{ color: 'var(--mt-color-danger)' }"
/>
```

## Case Sensitivity

Matching is case-insensitive by default; enable `case-sensitive` for case-sensitive matching:

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtHighlight text="Hello World" keywords="hello" />
    <MtHighlight text="Hello World" keywords="hello" case-sensitive />
  </div>
</PhonePreview>

```vue
<MtHighlight text="Hello World" keywords="hello" />
<MtHighlight text="Hello World" keywords="hello" case-sensitive />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| text | The full text; ignored when the default slot is provided | `string` | - |
| keywords | Keywords to highlight | `string \| string[]` | - |
| highlight-style | Inline style applied to highlighted snippets | `CSSProperties` | - |
| highlight-class | Extra class applied to highlighted snippets | `string` | - |
| case-sensitive | Whether keyword matching is case-sensitive | `boolean` | `false` |

### Slots

| Name | Description |
| --- | --- |
| default | Custom content, overrides the text/keywords rendering |