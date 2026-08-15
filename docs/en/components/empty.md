# Empty

<script setup>
import { showToast } from 'mote-ui'
</script>

A placeholder shown when a list or page has no data.

## Basic Usage

<PhonePreview>
  <MtEmpty />
</PhonePreview>

```vue
<MtEmpty />
```

## Custom Description

<PhonePreview>
  <MtEmpty description="No matching content found" />
</PhonePreview>

```vue
<MtEmpty description="No matching content found" />
```

## Footer Actions

The default slot renders an action area under the description:

<PhonePreview>
  <MtEmpty description="No messages yet">
    <MtButton type="primary" @click="showToast('Refreshing')">Try refreshing</MtButton>
  </MtEmpty>
</PhonePreview>

```vue
<MtEmpty description="No messages yet">
  <MtButton type="primary">Try refreshing</MtButton>
</MtEmpty>
```

## Custom Image

`image` accepts an image URL and `image-size` controls its width; the `image` slot fully customizes it:

<PhonePreview>
  <MtEmpty :image-size="120" description="Illustration via the image slot">
    <template #image>
      <span style="font-size: 48px">📭</span>
    </template>
  </MtEmpty>
</PhonePreview>

```vue
<MtEmpty description="Illustration via the image slot">
  <template #image>
    <span style="font-size: 48px">📭</span>
  </template>
</MtEmpty>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| image | Custom image URL; a built-in illustration is used by default | `string` | - |
| image-size | Image width; numbers get `px` appended | `number \| string` | `160px` |
| description | Description text | `string` | `locale` |

### Slots

| Slot | Description |
| --- | --- |
| default | Footer action area |
| image | Custom image |
| description | Custom description |
