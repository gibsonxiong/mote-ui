# Toast

<script setup>
import { showToast, MtToast } from 'mote-ui'
</script>

Lightweight feedback messages invoked via functions — ideal for short operation results. Only one toast is shown at a time; repeated calls replace the current content.

## Basic Usage

<PhonePreview>
  <MtButton @click="showToast('This is a toast')">Text toast</MtButton>
</PhonePreview>

```js
import { showToast } from 'mote-ui'

showToast('This is a toast')
```

## Success / Fail / Loading

<PhonePreview>
  <MtButton @click="MtToast.success('Done')">Success</MtButton>
  <MtButton @click="MtToast.fail('Failed')">Fail</MtButton>
  <MtButton @click="MtToast.loading('Loading...')">Loading</MtButton>
</PhonePreview>

```js
import { MtToast } from 'mote-ui'

MtToast.success('Done')
MtToast.fail('Failed')
MtToast.loading('Loading...') // never auto-closes
MtToast.clear() // close manually
```

## Custom Options

<PhonePreview>
  <MtButton @click="showToast({ message: 'Top toast', position: 'top' })">Top position</MtButton>
  <MtButton @click="showToast({ message: 'Closes in 5s', duration: 5000 })">Custom duration</MtButton>
</PhonePreview>

```js
showToast({ message: 'Top toast', position: 'top' })
showToast({ message: 'Closes in 5s', duration: 5000 })
showToast({ message: 'Blocked', overlay: true }) // transparent overlay blocks interaction
```

## API

### MtToast Methods

| Method | Description |
| --- | --- |
| MtToast.show(options) | Shows a toast; see Options |
| MtToast.text(message) | Text-only toast |
| MtToast.success(message) | Success toast |
| MtToast.fail(message) | Failure toast |
| MtToast.loading(message?) | Loading toast; never auto-closes |
| MtToast.clear() | Closes the current toast |

The named exports `showToast(options | string)` and `clearToast()` are also available.

### Options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| message | Toast content | `string` | `''` |
| type | Toast type | `'text' \| 'success' \| 'fail' \| 'loading'` | `'text'` |
| duration | Auto-close delay (ms); `0` disables auto-close | `number` | `2000` (`0` for loading) |
| position | Display position | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| overlay | Shows a transparent overlay that blocks page interaction | `boolean` | `false` |
| z-index | Stacking order | `number` | `3000` |
