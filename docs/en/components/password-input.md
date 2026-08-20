# PasswordInput

<script setup>
import { ref } from 'vue'

const basic = ref('123')
const hint = ref('')
const shown = ref('1288')
const error = ref('')
</script>

Displays a digit-by-digit password input, usually paired with a number keyboard.

## Basic Usage

`v-model` binds the value, masked as dots by default:

<PhonePreview>
  <div style="padding: 16px">
    <MtPasswordInput v-model="basic" />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" />
```

## Plain Text

`mask="false"` shows the entered characters directly:

<PhonePreview>
  <div style="padding: 16px">
    <MtPasswordInput v-model="shown" :mask="false" />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" :mask="false" />
```

## Hint and Error

`info` shows a hint while `error-info` takes precedence for errors:

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 16px">
    <MtPasswordInput v-model="hint" info="Enter a 6-digit password" />
    <MtPasswordInput :model-value="'12'" :length="4" :error-info="'Password too short'" />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" info="Enter a 6-digit password" />
<MtPasswordInput v-model="value" :error-info="'Password too short'" />
```

## Custom Length and Gutter

`length` sets the number of cells, `gutter` the gap between them:

<PhonePreview>
  <div style="padding: 16px">
    <MtPasswordInput v-model="basic" :length="4" :gutter="12" />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" :length="4" :gutter="12" />
```

## Focus Cursor

`focused` shows a blinking cursor on the next empty cell:

<PhonePreview>
  <div style="padding: 16px">
    <MtPasswordInput v-model="basic" focused />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" focused />
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Bound value | `string` | `''` |
| info | Hint text below the cells | `string` | - |
| error-info | Error text, takes precedence over `info` | `string` | - |
| length | Number of cells | `number` | `6` |
| gutter | Gap between cells; a number is px, a string passes through | `number \| string` | `0` |
| mask | Mask the value as dots | `boolean` | `true` |
| focused | Show a blinking cursor on the next empty cell | `boolean` | `false` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| focus | Emitted when the container is focused | `(event: FocusEvent)` |