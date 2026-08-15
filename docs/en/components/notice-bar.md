# NoticeBar

Displays a group of notifications, optionally scrolling them in a loop.

## Basic Usage

Single line by default; overflowing text is truncated with an ellipsis:

<PhonePreview>
  <MtNoticeBar text="This is a notification. Long text is truncated with an ellipsis." />
</PhonePreview>

```vue
<MtNoticeBar text="This is a notification. Long text is truncated with an ellipsis." />
```

## Scrolling

`scrollable` enables horizontal scrolling; `speed` sets the scroll speed (px/s):

<PhonePreview>
  <MtNoticeBar scrollable :speed="40" text="When scrolling is enabled, the text loops horizontally, which suits long announcements." />
</PhonePreview>

```vue
<MtNoticeBar scrollable :speed="40" text="When scrolling is enabled, the text loops horizontally, which suits long announcements." />
```

## Multi-line

`wrapable` disables ellipsis and scrolling so the text can wrap:

<PhonePreview>
  <MtNoticeBar wrapable text="When wrapping is enabled, long notification text automatically flows onto multiple lines, which suits long announcements." />
</PhonePreview>

```vue
<MtNoticeBar wrapable text="When wrapping is enabled, long notification text automatically flows onto multiple lines." />
```

## Left Icon and Closeable

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtNoticeBar left-icon="success" text="Notice with a left icon" />
    <MtNoticeBar closeable text="Click the right icon to close" />
  </div>
</PhonePreview>

```vue
<MtNoticeBar left-icon="success" text="Notice with a left icon" />
<MtNoticeBar closeable text="Click the right icon to close" />
```

## Custom Styles

<PhonePreview>
  <MtNoticeBar color="#fff" background="var(--mt-color-primary)" text="Notice bar with custom colors" />
</PhonePreview>

```vue
<MtNoticeBar color="#fff" background="var(--mt-color-primary)" text="Notice bar with custom colors" />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| text | Notice text | `string` | - |
| scrollable | Enable horizontal scrolling | `boolean` | `false` |
| speed | Scroll speed (px/s) | `number` | `60` |
| left-icon | Left icon name | `MtIconName` | - |
| closeable | Show a close button | `boolean` | `false` |
| wrapable | Allow the text to wrap | `boolean` | `false` |
| color | Text color | `string` | - |
| background | Background color | `string` | - |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| close | Emitted when the close button is clicked | - |

### Slots

| Name | Description |
| --- | --- |
| default | Notice content, takes precedence over `text` |
| right-icon | Custom right icon (defaults to the close button) |
