# Loading

A loading indicator for transitional loading states.

## Basic Usage

Renders a circular spinner by default:

<PhonePreview>
  <MtLoading />
</PhonePreview>

```vue
<MtLoading />
```

## Types

`type` supports `circular` (default) and `spinner`:

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 24px">
    <MtLoading />
    <MtLoading type="spinner" />
  </div>
</PhonePreview>

```vue
<MtLoading type="circular" />
<MtLoading type="spinner" />
```

## Text and Vertical Layout

Use `text` for a description and `vertical` to stack it below the spinner:

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 24px">
    <MtLoading text="Loading..." />
    <MtLoading vertical text="Loading...">
    </MtLoading>
  </div>
</PhonePreview>

```vue
<MtLoading text="Loading..." />
<MtLoading vertical text="Loading..." />
```

## Custom Color and Size

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 24px">
    <MtLoading :size="40" />
    <MtLoading color="var(--mt-color-success)" text="Green loading" />
  </div>
</PhonePreview>

```vue
<MtLoading :size="40" />
<MtLoading color="var(--mt-color-success)" text="Green loading" />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| type | Spinner style | `'circular' \| 'spinner'` | `'circular'` |
| size | Spinner diameter (px) | `number` | `30` |
| text | Description text | `string` | - |
| vertical | Stack the text below the spinner | `boolean` | `false` |
| color | Spinner and text color | `string` | - |

### Slots

| Name | Description |
| --- | --- |
| default | Custom description, takes precedence over `text` |
