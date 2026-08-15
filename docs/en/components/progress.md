# Progress

Displays the current progress of an operation.

## Basic Usage

`percentage` sets the completion percentage (0-100, values are clamped):

<PhonePreview>
  <MtProgress :percentage="50" />
</PhonePreview>

```vue
<MtProgress :percentage="50" />
```

## Status Colors

`status` provides semantic colors:

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MtProgress :percentage="100" status="success" />
    <MtProgress :percentage="30" status="danger" />
  </div>
</PhonePreview>

```vue
<MtProgress :percentage="100" status="success" />
<MtProgress :percentage="30" status="danger" />
```

## Custom Styles

`color` overrides the bar color (takes precedence over `status`), `stroke-width` adjusts the height, and `show-text` hides the percentage label:

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MtProgress :percentage="60" color="var(--mt-color-warning)" />
    <MtProgress :percentage="40" :stroke-width="10" :show-text="false" />
  </div>
</PhonePreview>

```vue
<MtProgress :percentage="60" color="var(--mt-color-warning)" />
<MtProgress :percentage="40" :stroke-width="10" :show-text="false" />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| percentage | Completion percentage (0-100) | `number` | `0` |
| stroke-width | Track height (px) | `number` | `4` |
| color | Bar color, overrides `status` | `string` | - |
| status | Semantic status | `'success' \| 'danger'` | - |
| show-text | Show the percentage label | `boolean` | `true` |
